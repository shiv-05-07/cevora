import { GoogleGenAI } from '@google/genai';

/**
 * Retrieves an instance of the Google GenAI client (Gemini).
 * Ensures environment variables are verified at instantiation time.
 */
export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable.');
  }

  return new GoogleGenAI({ apiKey });
}

// Single instance export for easy reuse in server actions/routes
export const ai = typeof window === 'undefined' && process.env.GEMINI_API_KEY 
  ? getGeminiClient() 
  : null;
