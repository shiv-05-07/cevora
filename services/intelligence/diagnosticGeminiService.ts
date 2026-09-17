import { GoogleGenAI } from '@google/genai';
import { logger } from '@/utils/logger';
import { ConceptStatus } from '@/features/diagnostic/types';

export interface DiagnosticGeminiInput {
  subjectKey: string;
  subjectLabel: string;
  conceptEvidence: Record<string, ConceptStatus>;
  recommendedStartConcept: string;
  recommendedStartTitle: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
}

export interface GeminiDiagnosticAnalysis {
  explanation: string;
  strengthsText: string;
  needsAttentionText: string;
  startingPointRationale: string;
  learningRecommendation: string;
  isFallback: boolean;
}

/**
 * Generates a deterministic, subject-accurate fallback analysis when Gemini is unavailable,
 * timed out, or returns invalid output.
 */
export function generateDeterministicFallbackAnalysis(
  input: DiagnosticGeminiInput
): GeminiDiagnosticAnalysis {
  const strongConcepts = Object.entries(input.conceptEvidence)
    .filter(([_, status]) => status === 'strong')
    .map(([concept]) => concept);

  const needsWorkConcepts = Object.entries(input.conceptEvidence)
    .filter(([_, status]) => status === 'needs_work' || status === 'developing')
    .map(([concept]) => concept);

  const strengthsText =
    strongConcepts.length > 0
      ? `Solid baseline understanding demonstrated in ${strongConcepts.join(', ')}.`
      : `Initial baseline readiness established across assessed ${input.subjectLabel} questions.`;

  const needsAttentionText =
    needsWorkConcepts.length > 0
      ? `Target focus areas identified for revision: ${needsWorkConcepts.join(', ')}.`
      : `Continued practice recommended to expand your baseline concept coverage.`;

  const startingPointRationale = `Starting at "${input.recommendedStartTitle}" addresses core ${input.subjectLabel} concept requirements before advancing to downstream topics.`;

  const learningRecommendation = `Begin daily missions targeting "${input.recommendedStartTitle}". Your ongoing practice will continuously update concept mastery over time.`;

  const explanation = `Your ${input.subjectLabel} starting point is ready (${input.score}% baseline accuracy). Cevora recommends starting your learning path at "${input.recommendedStartTitle}". Note: This initial signal is based on an 8–10 question baseline diagnostic.`;

  return {
    explanation,
    strengthsText,
    needsAttentionText,
    startingPointRationale,
    learningRecommendation,
    isFallback: true,
  };
}

/**
 * Server-side Gemini integration function that generates personalized learning analysis
 * based strictly on deterministic concept evidence.
 * NEVER exposes API key to client; falls back gracefully to deterministic analysis on any failure.
 */
export async function analyzeDiagnosticLearningSignal(
  input: DiagnosticGeminiInput
): Promise<GeminiDiagnosticAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || typeof window !== 'undefined') {
    logger.warn('Gemini API key missing or invoked on client side; using deterministic fallback analysis.');
    return generateDeterministicFallbackAnalysis(input);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const modelName = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

    const prompt = `You are Cevora's server-side diagnostic analysis engine.
You are interpreting the results of an 8-10 question diagnostic baseline assessment for a student in the subject "${input.subjectLabel}".

CRITICAL SAFETY & TRUTH RULES:
1. Do NOT invent new concepts, scores, or roadmap steps.
2. Rely ONLY on the provided concept evidence map.
3. Treat 'not_assessed' concepts as UNTESTED/UNKNOWN — do NOT claim the student is weak or strong in unassessed concepts.
4. Keep the tone encouraging, factual, and objective.
5. Emphasize that this is an INITIAL BASELINE SIGNAL from an 8–10 question diagnostic, not a final course grade.
6. Return strictly valid raw JSON without markdown codeblocks or surrounding commentary.

DIAGNOSTIC RESULT SUMMARY:
Subject: ${input.subjectLabel} (${input.subjectKey})
Score: ${input.score}% (${input.correctCount}/${input.totalQuestions} correct)
Concept Evidence Map:
${JSON.stringify(input.conceptEvidence, null, 2)}
Recommended Starting Concept: ${input.recommendedStartTitle} (${input.recommendedStartConcept})

OUTPUT FORMAT (JSON OBJECT ONLY):
{
  "explanation": "<2-3 sentence overview of baseline result and recommended starting point>",
  "strengthsText": "<concise summary of strong concepts based strictly on evidence>",
  "needsAttentionText": "<concise summary of concepts needing work or developing>",
  "startingPointRationale": "<why starting at recommendedStartTitle makes sense for this user>",
  "learningRecommendation": "<personalized, encouraging actionable recommendation>"
}`;

    // Race Gemini request against a 7-second hard timeout
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API timeout (7s)')), 7000)
    );

    const apiCallPromise = ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    const response = await Promise.race([apiCallPromise, timeoutPromise]);
    const responseText = response.text || '';

    // Clean JSON response (strip markdown wrappers if model included them)
    const cleanedJson = responseText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);

    // Validate all required fields are non-empty strings
    if (
      typeof parsed.explanation === 'string' &&
      typeof parsed.strengthsText === 'string' &&
      typeof parsed.needsAttentionText === 'string' &&
      typeof parsed.startingPointRationale === 'string' &&
      typeof parsed.learningRecommendation === 'string' &&
      parsed.explanation.trim().length > 0
    ) {
      return {
        explanation: parsed.explanation.trim(),
        strengthsText: parsed.strengthsText.trim(),
        needsAttentionText: parsed.needsAttentionText.trim(),
        startingPointRationale: parsed.startingPointRationale.trim(),
        learningRecommendation: parsed.learningRecommendation.trim(),
        isFallback: false,
      };
    }

    logger.warn('Gemini response failed JSON schema validation; using deterministic fallback.');
    return generateDeterministicFallbackAnalysis(input);
  } catch (err: any) {
    logger.warn(`Gemini diagnostic signal analysis fallback triggered: ${err.message}`);
    return generateDeterministicFallbackAnalysis(input);
  }
}
