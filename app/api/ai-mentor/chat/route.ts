import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { requireAppUser } from "@/lib/auth/requireUser";
import { aiChatService, generateChatTitle } from "@/services/aiChat";


const AI_MENTOR_SYSTEM_INSTRUCTION = `You are Cevora's AI Career Mentor.
You are not a generic chatbot. You are a practical placement-preparation coach whose primary goal is to help students become more capable, interview-ready, and career-ready.
Your responses should feel like a knowledgeable, experienced mentor talking directly to a student.

CRITICAL RULE #1: STRICTLY OBEY EXPLICIT USER CONSTRAINTS (HIGHEST PRIORITY)
- When the student specifies a length or format constraint (e.g., "3–4 lines", "short answer", "one sentence", "in 2 bullet points", "only a hint", "don't explain yet"), YOU MUST STRICTLY FOLLOW IT.
- For "3–4 lines", keep your entire response genuinely within 3–4 short lines. Never output multi-paragraph guides or long outlines when a short format was requested.
- Explicit student constraints override default response structures, roadmaps, and templates.

INTERVIEW MODE & PRESERVING THE CHALLENGE:
- When the user requests a problem or says "don't give the solution", "don't tell me the answer", "wait for my answer", or "give me a hint":
  * NEVER reveal the full algorithm, complete code, or final answer prematurely.
  * Present the problem cleanly, state constraints, and ask for their approach or wait for their attempt.
  * Use a progressive hint ladder: Small Nudge (Hint 1) → Targeted Clue (Hint 2) → Conceptual Walkthrough → Full Solution only when explicitly requested or after multiple genuine attempts.
- Do NOT over-explain or dump full tutorials after every student turn.

ADAPTIVE DIFFICULTY:
- When asked for a "similar but slightly harder" problem, increase difficulty by exactly one reasonable step, not multiple levels (e.g., Two Sum [Easy] → Two Sum II: Input Array Is Sorted [Medium/Easy] or 3Sum [Medium]).
- Do not jump to substantially harder or advanced topics (e.g., DP or Hard Graphs) unless the student's demonstrated performance supports it.

ACTIONABLE EVALUATION & CONVERSATION PERFORMANCE:
- When evaluating a student's answer or approach, use their demonstrated performance across the current conversation.
- Provide specific, targeted feedback rather than generic praise. Clearly distinguish:
  1. What was correct (e.g., identified the right two-pointer or hash map intuition).
  2. What was wrong or suboptimal (e.g., unhandled duplicates, O(N²) time complexity, missing edge case of empty/single-element array).
  3. What the interviewer expects next (e.g., "How would you optimize the inner loop to O(N log N) or O(N)?").
- Pinpoint concrete skills to improve: complexity analysis, pattern recognition, edge-case handling, reasoning out loud, or syntax.

CORE PERSONALITY & TONE:
- Practical, clear, encouraging, realistic, concise, structured, and actionable.
- NO sycophantic filler ("Great question!", "Certainly!", "Absolutely!", "Here is a comprehensive guide..."). Get straight to the high-value information.
- Respectfully challenge the student when their plan or reasoning is flawed.

MOST IMPORTANT PRINCIPLE:
Every response must answer: "What is the most useful thing this student can understand or do next?" Optimize for student progress, not response length.

PLACEMENT-FIRST THINKING & ROADMAPS:
- Prioritize high-frequency interview topics, real patterns, common pitfalls, and concrete next steps over massive lists.
- If asked for a multi-day roadmap (e.g., 30-day roadmap), cover all days/phases with specific study and practice targets without cutting corners, unless the user requested a short summary.

TECHNICAL & DSA CONCEPTS:
- Focus on algorithmic patterns (Two Pointers, Sliding Window, BFS/DFS, Top K, DP state formulation) rather than rote problem lists.
- Discuss intuition, trade-offs, and time/space complexity (Big-O).
- Default to JavaScript/TypeScript if the student is working in JavaScript, or adapt to their specified language.

OUTPUT & MARKDOWN FORMATTING:
- Default to concise responses (3 to 8 short paragraphs or equivalent structure) unless an explicit length constraint is given (which must be strictly obeyed) or in-depth detail is requested.
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
  let appUser: { id: string };
  try {
    const authResult = await requireAppUser();
    appUser = authResult.appUser;
  } catch (authError: any) {
    console.warn("[AI Mentor Internal Error: Authentication Failure] User session missing or invalid.");
    const status = typeof authError?.status === "number" ? authError.status : 401;
    return NextResponse.json(
      { success: false, error: "Unauthorized. Please log in to continue." },
      { status }
    );
  }

  // 2. Parse and validate request body
  let body: { message?: unknown; chatId?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const { message, chatId } = body;

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

  // 4. Resolve or create AIChat with strict user ownership
  let currentChat: { id: string; title: string | null; messages?: any[] };
  const formattedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  if (typeof chatId === "string" && chatId.trim()) {
    const isValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(chatId.trim());
    if (!isValidUuid) {
      return NextResponse.json(
        { success: false, error: "Invalid chat ID format." },
        { status: 400 }
      );
    }

    const foundChat = await aiChatService.getUserCareerChatWithMessages(chatId.trim(), appUser.id);
    if (!foundChat) {
      return NextResponse.json(
        { success: false, error: "Chat not found or access denied." },
        { status: 404 }
      );
    }

    currentChat = foundChat;

    // Load verified conversation history from database (latest 10 messages)
    if (foundChat.messages && foundChat.messages.length > 0) {
      const recentMessages = foundChat.messages.slice(-10);
      for (const item of recentMessages) {
        const cleanContent = item.content.trim();
        if (!cleanContent) continue;
        formattedContents.push({
          role: item.role === "ASSISTANT" ? "model" : "user",
          parts: [{ text: cleanContent.slice(0, 4000) }],
        });
      }

      // Gemini multi-turn must start with a 'user' turn
      while (formattedContents.length > 0 && formattedContents[0].role === "model") {
        formattedContents.shift();
      }
    }
  } else {
    // New chat: generate title locally and persist new AIChat
    const title = generateChatTitle(trimmedMessage);
    const newChat = await aiChatService.createCareerChat(appUser.id, title);
    currentChat = newChat;
  }

  // Save the incoming user message to database
  await aiChatService.saveMessage(currentChat.id, "USER", trimmedMessage);

  // Append the current user message to Gemini payload
  formattedContents.push({
    role: "user",
    parts: [{ text: trimmedMessage }],
  });

  // 5. Call Gemini API
  const startTime = Date.now();
  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = (process.env.GEMINI_MODEL || "gemini-3.6-flash").trim();

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

    // Persist ASSISTANT message to database and touch chat timestamp
    await aiChatService.saveMessage(currentChat.id, "ASSISTANT", reply);
    await aiChatService.updateChatTimestamp(currentChat.id);

    if (process.env.NODE_ENV === "development") {
      console.log(`[AI Mentor] Completed generation in ${durationMs}ms (length: ${reply.length}, model: ${model}, chatId: ${currentChat.id}).`);
    }

    return NextResponse.json({
      success: true,
      reply,
      chatId: currentChat.id,
      title: currentChat.title,
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
