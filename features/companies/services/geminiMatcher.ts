import { GoogleGenAI } from '@google/genai';
import { StudentProfile } from '@prisma/client';
import { GeminiScores, OpportunityWithRelations } from './recommendationEngine';

let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.startsWith('AIzaSy')) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.warn('GoogleGenAI initialization skipped in geminiMatcher:', e);
}

const semanticCache = new Map<string, GeminiScores>();

export async function getSemanticMatch(
  profile: StudentProfile,
  opportunity: OpportunityWithRelations
): Promise<GeminiScores | undefined> {
  if (!ai) {
    return undefined;
  }

  const promptVersion = 'v3';
  const cacheKey = `${profile.id}-${profile.cgpa}-${profile.branch}-${(profile.skills || []).join(',')}-${opportunity.id}-${promptVersion}`;

  if (semanticCache.has(cacheKey)) {
    return semanticCache.get(cacheKey);
  }

  try {
    const prompt = `
      You are an expert technical recruiter matching a student to an opportunity.
      Evaluate the semantic match between the student's profile and the opportunity.
      
      Student Profile:
      - Branch/Degree: ${profile.branch || profile.specialization || 'General Engineering'}
      - Skills: ${(profile.skills || []).join(', ') || 'None specified'}
      
      Opportunity:
      - Title/Role: ${opportunity.title} (${opportunity.role || 'General'})
      - Target Branches: ${(opportunity.eligibleBranches || []).join(', ') || 'Any'}
      - Required Skills: ${(opportunity.skills || []).join(', ') || 'None'}
      - Preferred Skills: ${(opportunity.preferredSkills || []).join(', ') || 'None'}
      
      Return ONLY a valid JSON object:
      {
        "skillMatch": 0.0 to 1.0,
        "roleFit": 0.0 to 1.0,
        "branchRelevance": 0.0 to 1.0,
        "matchedSkills": ["skill1", "skill2"],
        "missingSkills": ["missing1", "missing2"],
        "reason": "Brief 1-sentence fit explanation"
      }
    `;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text;
    if (!resultText) return undefined;

    const parsed: GeminiScores = JSON.parse(resultText);
    parsed.skillMatch = Math.min(1, Math.max(0, parsed.skillMatch || 0));
    parsed.roleFit = Math.min(1, Math.max(0, parsed.roleFit || 0));
    parsed.branchRelevance = Math.min(1, Math.max(0, parsed.branchRelevance || 0));

    semanticCache.set(cacheKey, parsed);
    return parsed;
  } catch (error) {
    console.warn('Gemini Semantic Match skipped/failed, using deterministic scoring:', error);
    return undefined;
  }
}
