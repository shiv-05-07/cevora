import { GoogleGenAI } from '@google/genai';

let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.startsWith('AIzaSy')) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.warn('GoogleGenAI initialization skipped:', e);
}

export interface SmartFilters {
  opportunityType?: 'INTERNSHIP' | 'FULL_TIME' | 'BOTH';
  branch?: string;
  minimumCgpa?: number;
  minimumSgpa?: number;
  skills?: string[];
  location?: string;
  role?: string;
  queryType: 'NORMAL' | 'ELIGIBLE_NOW' | 'ALMOST_ELIGIBLE' | 'PREPARE_FIRST';
}

/**
 * Deterministic rule-based parser fallback for natural language queries.
 * Ensures Smart Match always works even if Gemini is unauthenticated or unavailable.
 */
function deterministicQueryParser(query: string): SmartFilters {
  const lower = query.toLowerCase();
  const filters: SmartFilters = {
    queryType: 'NORMAL'
  };

  // 1. Opportunity Type
  if (lower.includes('intern') || lower.includes('internship') || lower.includes('summer')) {
    filters.opportunityType = 'INTERNSHIP';
  } else if (lower.includes('placement') || lower.includes('full time') || lower.includes('full-time') || lower.includes('job')) {
    filters.opportunityType = 'FULL_TIME';
  }

  // 2. Branch
  if (lower.includes('mechanical') || lower.includes('mech')) {
    filters.branch = 'Mechanical';
  } else if (lower.includes('cse') || lower.includes('computer science') || lower.includes('software') || lower.includes('cs')) {
    filters.branch = 'CSE';
  } else if (lower.includes('ece') || lower.includes('electronics')) {
    filters.branch = 'ECE';
  } else if (lower.includes('eee') || lower.includes('electrical')) {
    filters.branch = 'EEE';
  } else if (lower.includes('civil')) {
    filters.branch = 'Civil';
  } else if (lower.includes('chemical')) {
    filters.branch = 'Chemical';
  } else if (lower.includes('biotech') || lower.includes('biotechnology')) {
    filters.branch = 'Biotechnology';
  }

  // 3. CGPA / SGPA extraction (e.g., "cgpa above 7", "above 8.5", "cgpa > 7.5", "7+ cgpa")
  const cgpaMatch = lower.match(/(?:cgpa|gpa|pointer)?\s*(?:above|greater than|>|>=|min|minimum|of)?\s*(\d(?:\.\d+)?)\s*(?:\+|cgpa|gpa)?/);
  if (cgpaMatch && parseFloat(cgpaMatch[1]) >= 5.0 && parseFloat(cgpaMatch[1]) <= 10.0) {
    filters.minimumCgpa = parseFloat(cgpaMatch[1]);
  }

  // 4. Skills extraction
  const skillKeywords = ['python', 'java', 'c++', 'c#', 'react', 'node', 'sql', 'dsa', 'aws', 'cloud', 'embedded', 'verilog', 'linux', 'ai', 'ml', 'machine learning', 'vision'];
  const extractedSkills: string[] = [];
  skillKeywords.forEach(skill => {
    if (lower.includes(skill)) {
      extractedSkills.push(skill.toUpperCase());
    }
  });
  if (extractedSkills.length > 0) {
    filters.skills = extractedSkills;
  }

  // 5. Location / Mode
  if (lower.includes('remote')) {
    filters.location = 'Remote';
  } else if (lower.includes('bangalore') || lower.includes('bengaluru')) {
    filters.location = 'Bangalore';
  } else if (lower.includes('hyderabad')) {
    filters.location = 'Hyderabad';
  } else if (lower.includes('pune')) {
    filters.location = 'Pune';
  } else if (lower.includes('noida') || lower.includes('delhi') || lower.includes('gurgaon') || lower.includes('gurugram')) {
    filters.location = 'Noida / Delhi NCR';
  }

  // 6. Query Intent
  if (lower.includes('right now') || lower.includes('apply now') || lower.includes('eligible now') || lower.includes('can i apply')) {
    filters.queryType = 'ELIGIBLE_NOW';
  } else if (lower.includes('almost') || lower.includes('close to')) {
    filters.queryType = 'ALMOST_ELIGIBLE';
  } else if (lower.includes('prepare') || lower.includes('future')) {
    filters.queryType = 'PREPARE_FIRST';
  }

  return filters;
}

export async function parseSmartQuery(query: string): Promise<SmartFilters> {
  const fallbackFilters = deterministicQueryParser(query);

  if (!ai) {
    return fallbackFilters;
  }

  try {
    const prompt = `
      You are an AI assistant parsing natural language search queries for a student placement portal.
      Convert the following user query into structured filters.
      
      Query: "${query}"
      
      Return ONLY a valid JSON object matching this schema:
      {
        "opportunityType": "INTERNSHIP" | "FULL_TIME" | "BOTH" | null,
        "branch": string | null (e.g. "CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "Chemical", "Biotechnology"),
        "minimumCgpa": number | null (e.g. 7.0, 7.5, 8.5),
        "minimumSgpa": number | null,
        "skills": string[] | null,
        "location": string | null,
        "queryType": "NORMAL" | "ELIGIBLE_NOW" | "ALMOST_ELIGIBLE" | "PREPARE_FIRST"
      }
    `;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text;
    if (!resultText) return fallbackFilters;

    const parsed = JSON.parse(resultText) as SmartFilters;
    return {
      opportunityType: parsed.opportunityType || fallbackFilters.opportunityType,
      branch: parsed.branch || fallbackFilters.branch,
      minimumCgpa: parsed.minimumCgpa ?? fallbackFilters.minimumCgpa,
      minimumSgpa: parsed.minimumSgpa ?? fallbackFilters.minimumSgpa,
      skills: parsed.skills && parsed.skills.length > 0 ? parsed.skills : fallbackFilters.skills,
      location: parsed.location || fallbackFilters.location,
      queryType: parsed.queryType || fallbackFilters.queryType
    };
  } catch (error) {
    console.warn('Gemini query parse failed, falling back to deterministic parser:', error);
    return fallbackFilters;
  }
}
