import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { requireAppUser } from "@/lib/auth/requireUser";

const AI_MENTOR_SYSTEM_INSTRUCTION = `You are Cevora's AI Career Mentor.
You are not a generic chatbot. You are a practical placement-preparation coach whose primary goal is to help students become more capable, interview-ready, and career-ready.
Your responses should feel like a knowledgeable, experienced mentor talking directly to a student.

CORE PERSONALITY & TONE:
- Practical, clear, encouraging, realistic, concise, structured, and actionable.
- Do NOT use excessive motivational filler or generic cheerleading.
- Do NOT use repetitive sycophantic greetings like "Great question!", "Certainly!", "Absolutely!", or "Here is a comprehensive guide...". Get straight to the high-value information.
- The mentor should sometimes respectfully challenge the student. If their plan is unrealistic (e.g., chasing another library when their DSA consistency or project depth is lacking), call it out directly and suggest a higher-leverage alternative.

MOST IMPORTANT PRINCIPLE:
Every response must answer: "What is the most useful thing this student can understand or do next?" Optimize for student progress, not response length.

CONVERSATIONAL CONTEXT & PERSONALIZATION:
- Seamlessly utilize context provided earlier in the conversation (tech stack, skill level, current challenges). Never ask for info the student already gave.
- If the student asks follow-ups like "What should I do next?" or "Explain the second one", resolve references immediately from the recent conversation.
- If a critical detail is missing and the answer genuinely depends on it, ask ONE concise clarifying question (e.g., "What role are you targeting — frontend, backend, full-stack, or general SDE?"). Otherwise, answer directly with sensible defaults.

PLACEMENT-FIRST THINKING:
- Prioritize high-frequency interview topics, real patterns, common pitfalls, practical code/exercises, and concrete next steps.
- Avoid dumping massive lists. Prefer "Focus on these 5 high-impact patterns/topics" over an overwhelming 30-item laundry list.

ROADMAPS & TIMELINES:
- Must be realistic and actionable, divided into clear phases/weeks/days with specific study targets, practice tasks, and expected outcomes.
- Distinguish "MUST DO" from "NICE TO HAVE".
- If the user explicitly asks for a 30-day roadmap, cover all 30 days thoroughly without cutting corners.

TECHNICAL CONCEPTS:
- Explain simply and intuitively.
- Provide a small, practical code/syntax snippet.
- Explain why it matters in real systems and how interviewers test it.
- Give a short practice check/task when useful. Don't turn every question into a giant textbook chapter.

DSA GUIDANCE:
- Focus on algorithmic patterns (Two Pointers, Sliding Window, BFS/DFS, Top K, DP state formulation) rather than random problem memorization.
- Explain intuition, trade-offs, and time/space complexity (Big-O).
- Default to JavaScript/TypeScript if the student is working in JavaScript, or adapt to their specified language.
- Provide interview-style problem solving steps: clarify constraints, test edge cases, articulate brute force vs optimal approach.

INTERVIEW PREPARATION:
- Clarify what the interviewer is specifically evaluating (scalability, edge cases, communication, architecture).
- Breakdown strong answers vs common candidate red flags.
- For behavioral rounds, guide using the STAR framework (Situation, Task, Action, Result) with emphasis on individual ownership ("I", not "we").

CAREER DECISIONS:
- Be realistic, objective, and present concrete trade-offs.
- Distinguish verified industry standards from opinion.
- NEVER guarantee placements, salaries, interview shortlists, or job offers.

OUTPUT & MARKDOWN FORMATTING:
- Keep responses concise and focused: 3 to 8 short paragraphs or structured sections for typical questions.
- For in-depth requests (like complete multi-week roadmaps), provide sufficient depth while omitting repetitive boilerplate.
- Use standard, clean Markdown: # headings, ## subheadings, bullet lists, numbered lists, **bold**, \`inline code\`, and \`\`\`code blocks\`\`\`.
- Use natural Markdown syntax without backslash escapes.

BOUNDARIES:
- CHAT ONLY: You provide guidance directly inside Cevora chat. Do not claim to generate downloadable files, PDFs, or doc attachments. Provide resume/ATS advice purely as conversational guidance.
- NO FABRICATION: Never invent company hiring criteria, fake interview statistics, or internal Cevora data. If uncertain, state it plainly.`;


interface HistoryItem {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  // 1. Verify user authentication
  try {
    await requireAppUser();
  } catch (authError: any) {
    console.warn("[AI Mentor Internal Error: Authentication Failure] User session missing or invalid.");
    const status = typeof authError?.status === "number" ? authError.status : 401;
    return NextResponse.json(
      { success: false, error: "Unauthorized. Please log in to continue." },
      { status }
    );
  }

  // 2. Parse and validate request body
  let body: { message?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const { message, history } = body;

  if (typeof message !== "string") {
    return NextResponse.json(
      { success: false, error: "Please enter a message." },
      { status: 400 }
    );
  }

  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    return NextResponse.json(
      { success: false, error: "Please enter a message." },
      { status: 400 }
    );
  }

  if (trimmedMessage.length > 2000) {
    return NextResponse.json(
      { success: false, error: "Message exceeds maximum length of 2000 characters." },
      { status: 400 }
    );
  }

  // 3. Verify server-side Gemini API key
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error("[AI Mentor Internal Error: Missing API Key] GEMINI_API_KEY environment variable is not defined or is empty.");
    return NextResponse.json(
      { success: false, error: "The AI Mentor is temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }

  // 4. Format multi-turn conversation history
  const formattedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  if (Array.isArray(history)) {
    // Only take the last 10 messages to maintain reasonable token usage
    const recentHistory = history.slice(-10) as HistoryItem[];

    for (const item of recentHistory) {
      if (
        item &&
        typeof item === "object" &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim().length > 0
      ) {
        const cleanContent = item.content.trim();
        // Skip previous error notices so they don't pollute the prompt
        if (
          item.role === "assistant" &&
          (cleanContent.startsWith("Sorry, I") ||
            cleanContent.startsWith("Unable to generate") ||
            cleanContent.startsWith("Too many requests") ||
            cleanContent.startsWith("The AI Mentor is temporarily unavailable"))
        ) {
          continue;
        }

        formattedContents.push({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: cleanContent.slice(0, 4000) }],
        });
      }
    }

    // Gemini multi-turn must start with a 'user' turn
    while (formattedContents.length > 0 && formattedContents[0].role === "model") {
      formattedContents.shift();
    }
  }

  // Append the current user message
  formattedContents.push({
    role: "user",
    parts: [{ text: trimmedMessage }],
  });

  // 5. Call Gemini API
  const startTime = Date.now();
  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = (process.env.GEMINI_MODEL || "gemini-2.5-flash").trim();

    const response = await ai.models.generateContent({
      model,
      contents: formattedContents,
      config: {
        systemInstruction: AI_MENTOR_SYSTEM_INSTRUCTION,
        maxOutputTokens: 1500,
        temperature: 0.7,
      },
    });

    const reply = response.text?.trim();
    const durationMs = Date.now() - startTime;

    if (!reply) {
      const finishReason = response.candidates?.[0]?.finishReason;
      console.error(`[AI Mentor Internal Error: Malformed Response] Empty text returned by Gemini after ${durationMs}ms (finishReason: ${finishReason}).`);
      return NextResponse.json(
        { success: false, error: "Unable to generate a response right now. Please try again." },
        { status: 500 }
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[AI Mentor] Completed generation in ${durationMs}ms (length: ${reply.length}, model: ${model}).`);
    }

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (apiError: any) {
    const durationMs = Date.now() - startTime;
    const errorMessage = String(apiError?.message || "").toLowerCase();
    const status = apiError?.status || apiError?.statusCode;

    if (
      status === 429 ||
      errorMessage.includes("429") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("rate limit") ||
      errorMessage.includes("resource_exhausted")
    ) {
      console.warn(`[AI Mentor Internal Error: Rate Limit / Quota] Hit Gemini rate limit or quota after ${durationMs}ms.`);
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    } else if (errorMessage.includes("timeout") || errorMessage.includes("deadline") || apiError?.code === "ETIMEDOUT") {
      console.error(`[AI Mentor Internal Error: Timeout] Gemini request timed out after ${durationMs}ms.`);
    } else if (
      apiError?.code === "ENOTFOUND" ||
      apiError?.code === "ECONNRESET" ||
      apiError?.code === "ECONNREFUSED" ||
      errorMessage.includes("fetch failed")
    ) {
      console.error(`[AI Mentor Internal Error: Network Failure] Network failure contacting Gemini endpoint after ${durationMs}ms.`);
    } else if (
      errorMessage.includes("api_key") ||
      errorMessage.includes("api key not valid") ||
      (status === 400 && errorMessage.includes("api key"))
    ) {
      console.error(`[AI Mentor Internal Error: Authentication Failure] Invalid or rejected GEMINI_API_KEY after ${durationMs}ms.`);
    } else {
      console.error(`[AI Mentor Internal Error: Gemini Error] Unhandled Gemini failure after ${durationMs}ms:`, apiError?.message || apiError);
    }

    return NextResponse.json(
      { success: false, error: "Unable to generate a response right now. Please try again." },
      { status: 500 }
    );
  }
}
