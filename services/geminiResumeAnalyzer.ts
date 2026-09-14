import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { ATSAnalysisData } from '@/types/resume';

export const PROMPT_VERSION = '1.0.0';
export const ANALYZER_VERSION = '1.0.0';

// Raw Gemini JSON Schema for validation
const GeminiAnalysisSchema = z.object({
  scoreBreakdown: z.object({
    formatting: z.number().min(0).max(100),
    experience: z.number().min(0).max(100),
    skills: z.number().min(0).max(100),
    education: z.number().min(0).max(100),
    keywords: z.number().min(0).max(100),
    grammar: z.number().min(0).max(100),
    descriptions: z.object({
      formatting: z.string(),
      experience: z.string(),
      skills: z.string(),
      education: z.string(),
      keywords: z.string(),
      grammar: z.string(),
    }).optional(),
  }),
  summary: z.object({
    headline: z.string(),
    overview: z.string(),
  }),
  interviewReadiness: z.number().min(0).max(100),
  recommendation: z.string(),
  skills: z.object({
    matched: z.array(
      z.object({
        name: z.string(),
        category: z.string(),
        evidence: z.string().optional(),
      })
    ),
    missing: z.array(
      z.object({
        name: z.string(),
        category: z.string(),
        importance: z.enum(['critical', 'high', 'medium', 'low', 'Critical', 'High', 'Medium', 'Low']).transform(v => v.toLowerCase()),
        reason: z.string().optional(),
      })
    ),
  }),
  keywords: z.object({
    matchPercentage: z.number().min(0).max(100),
    density: z.string(),
    matched: z.array(z.string()),
    missing: z.array(
      z.object({
        keyword: z.string(),
        importance: z.enum(['critical', 'high', 'medium', 'low', 'Critical', 'High', 'Medium', 'Low']),
        frequency: z.string().optional(),
      })
    ),
  }),
  sections: z.object({
    professionalSummary: z.object({
      score: z.number().min(0).max(100),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      recommendations: z.array(z.string()),
      beforeExample: z.string().optional(),
      afterExample: z.string().optional(),
    }),
    workExperience: z.object({
      score: z.number().min(0).max(100),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      recommendations: z.array(z.string()),
      beforeExample: z.string().optional(),
      afterExample: z.string().optional(),
    }),
    projects: z.object({
      score: z.number().min(0).max(100),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      recommendations: z.array(z.string()),
      beforeExample: z.string().optional(),
      afterExample: z.string().optional(),
    }),
    education: z.object({
      score: z.number().min(0).max(100),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      recommendations: z.array(z.string()),
      beforeExample: z.string().optional(),
      afterExample: z.string().optional(),
    }),
  }),
  dimensions: z.object({
    recruiterReadability: z.object({
      score: z.number().min(0).max(100),
      description: z.string(),
    }),
    atsCompatibility: z.object({
      score: z.number().min(0).max(100),
      description: z.string(),
    }),
    technicalStrength: z.object({
      score: z.number().min(0).max(100),
      description: z.string(),
    }),
    leadershipEvidence: z.object({
      score: z.number().min(0).max(100),
      description: z.string(),
    }),
  }),
  improvementSuggestions: z.array(
    z.object({
      title: z.string(),
      priority: z.enum(['high', 'medium', 'low', 'High', 'Medium', 'Low']).transform(v => v.toLowerCase() as 'high' | 'medium' | 'low'),
      description: z.string(),
      estimatedImprovement: z.string().or(z.number()),
      impact: z.string(),
      action: z.string().optional(),
      icon: z.string().optional(),
    })
  ),
  resumeFacts: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    education: z.array(z.any()).optional(),
    experience: z.array(z.any()).optional(),
    projects: z.array(z.any()).optional(),
    achievements: z.array(z.any()).optional(),
  }).optional(),
});

type RawGeminiAnalysis = z.infer<typeof GeminiAnalysisSchema>;

/**
 * Deterministically calculates ATS Overall Score from weighted components:
 * Formatting: 15%
 * Experience: 20%
 * Skills: 20%
 * Education: 10%
 * Keywords: 20%
 * Grammar: 15%
 * Total: 100%
 */
export function calculateDeterministicScore(components: {
  formatting: number;
  experience: number;
  skills: number;
  education: number;
  keywords: number;
  grammar: number;
}): { overallScore: number; rating: string; percentile: string } {
  const weighted =
    components.formatting * 0.15 +
    components.experience * 0.20 +
    components.skills * 0.20 +
    components.education * 0.10 +
    components.keywords * 0.20 +
    components.grammar * 0.15;

  const overallScore = Math.min(100, Math.max(0, Math.round(weighted)));

  let rating = 'Poor';
  let percentile = 'Bottom 30%';

  if (overallScore >= 90) {
    rating = 'Excellent';
    percentile = 'Top 5%';
  } else if (overallScore >= 80) {
    rating = 'Good';
    percentile = 'Top 15%';
  } else if (overallScore >= 70) {
    rating = 'Fair';
    percentile = 'Top 30%';
  } else if (overallScore >= 60) {
    rating = 'Needs Improvement';
    percentile = 'Top 50%';
  } else {
    rating = 'Poor';
    percentile = 'Bottom 40%';
  }

  return { overallScore, rating, percentile };
}

/**
 * Transforms validated Gemini output into the exact UI data contract expected by Cevora components.
 */
export function normalizeAnalysisResult(raw: RawGeminiAnalysis): ATSAnalysisData {
  const { overallScore, rating, percentile } = calculateDeterministicScore(raw.scoreBreakdown);

  // Normalize category mapping
  const categoryDescriptions: Record<string, string> = {
    fmt: raw.scoreBreakdown.descriptions?.formatting || 'Structural layout, font hierarchy, bullet formatting, and single-column readability.',
    exp: raw.scoreBreakdown.descriptions?.experience || 'Action verbs, quantifiable results, and depth of technical contributions.',
    skl: raw.scoreBreakdown.descriptions?.skills || 'Coverage of technical stack, demonstrated tools, and industry standards.',
    edu: raw.scoreBreakdown.descriptions?.education || 'Degree formatting, institutions, graduation dates, and relevant coursework.',
    kwd: raw.scoreBreakdown.descriptions?.keywords || 'Alignment with high-demand software engineering keywords and role terminology.',
    grm: raw.scoreBreakdown.descriptions?.grammar || 'Spelling, grammatical consistency, tense harmony, and professional voice.',
  };

  const scoreBreakdown = [
    { id: 'fmt', name: 'Formatting', score: raw.scoreBreakdown.formatting, description: categoryDescriptions.fmt },
    { id: 'exp', name: 'Experience', score: raw.scoreBreakdown.experience, description: categoryDescriptions.exp },
    { id: 'skl', name: 'Skills', score: raw.scoreBreakdown.skills, description: categoryDescriptions.skl },
    { id: 'edu', name: 'Education', score: raw.scoreBreakdown.education, description: categoryDescriptions.edu },
    { id: 'kwd', name: 'Keywords', score: raw.scoreBreakdown.keywords, description: categoryDescriptions.kwd },
    { id: 'grm', name: 'Grammar', score: raw.scoreBreakdown.grammar, description: categoryDescriptions.grm },
  ];

  // Capitalize importance for MissingKeyword
  const missingKeywords = raw.keywords.missing.map((k) => {
    const impLower = k.importance.toLowerCase();
    const capitalized = (impLower.charAt(0).toUpperCase() + impLower.slice(1)) as 'Critical' | 'High' | 'Medium' | 'Low';
    return {
      word: k.keyword,
      importance: capitalized,
      frequency: k.frequency || 'High recruiter demand',
    };
  });

  const getSectionStatus = (score: number): 'excellent' | 'good' | 'needs-work' => {
    if (score >= 90) return 'excellent';
    if (score >= 70) return 'good';
    return 'needs-work';
  };

  const sectionAnalysis = [
    {
      name: 'Professional Summary',
      score: raw.sections.professionalSummary.score,
      status: getSectionStatus(raw.sections.professionalSummary.score),
      strengths: raw.sections.professionalSummary.strengths || [],
      weaknesses: raw.sections.professionalSummary.weaknesses || [],
      suggestions: raw.sections.professionalSummary.recommendations || [],
      beforeExample: raw.sections.professionalSummary.beforeExample,
      afterExample: raw.sections.professionalSummary.afterExample,
    },
    {
      name: 'Work Experience',
      score: raw.sections.workExperience.score,
      status: getSectionStatus(raw.sections.workExperience.score),
      strengths: raw.sections.workExperience.strengths || [],
      weaknesses: raw.sections.workExperience.weaknesses || [],
      suggestions: raw.sections.workExperience.recommendations || [],
      beforeExample: raw.sections.workExperience.beforeExample,
      afterExample: raw.sections.workExperience.afterExample,
    },
    {
      name: 'Projects',
      score: raw.sections.projects.score,
      status: getSectionStatus(raw.sections.projects.score),
      strengths: raw.sections.projects.strengths || [],
      weaknesses: raw.sections.projects.weaknesses || [],
      suggestions: raw.sections.projects.recommendations || [],
      beforeExample: raw.sections.projects.beforeExample,
      afterExample: raw.sections.projects.afterExample,
    },
    {
      name: 'Education',
      score: raw.sections.education.score,
      status: getSectionStatus(raw.sections.education.score),
      strengths: raw.sections.education.strengths || [],
      weaknesses: raw.sections.education.weaknesses || [],
      suggestions: raw.sections.education.recommendations || [],
      beforeExample: raw.sections.education.beforeExample,
      afterExample: raw.sections.education.afterExample,
    },
  ];

  const suggestions = raw.improvementSuggestions.map((s, idx) => {
    let est = s.estimatedImprovement;
    let pts = '5';
    if (typeof est === 'number') {
      pts = `${Math.round(est)}`;
    } else if (typeof est === 'string') {
      const match = est.match(/\d+/);
      if (match) pts = match[0];
    }
    const formattedEst = `Est. impact: +${pts} pts`;

    let defaultIcon = 'trending-up';
    const lowerTitle = s.title.toLowerCase();
    if (lowerTitle.includes('cloud') || lowerTitle.includes('aws') || lowerTitle.includes('docker')) {
      defaultIcon = 'cloud';
    } else if (lowerTitle.includes('summary') || lowerTitle.includes('lead') || lowerTitle.includes('team')) {
      defaultIcon = 'user';
    } else if (lowerTitle.includes('keyword') || lowerTitle.includes('test') || lowerTitle.includes('jest')) {
      defaultIcon = 'check-square';
    }

    return {
      id: `sug-${idx + 1}`,
      priority: s.priority,
      title: s.title,
      explanation: s.description,
      impact: s.impact || (s.priority === 'high' ? 'Significantly improves recruiter callback rate.' : 'Improves ATS parsing score.'),
      estimatedImprovement: formattedEst,
      icon: s.icon || defaultIcon,
    };
  });

  const insights = [
    {
      id: 'i1',
      name: 'Recruiter Readability',
      score: raw.dimensions.recruiterReadability.score,
      explanation: raw.dimensions.recruiterReadability.description,
      icon: 'eye',
    },
    {
      id: 'i2',
      name: 'ATS Compatibility',
      score: raw.dimensions.atsCompatibility.score,
      explanation: raw.dimensions.atsCompatibility.description,
      icon: 'file-check',
    },
    {
      id: 'i3',
      name: 'Technical Strength',
      score: raw.dimensions.technicalStrength.score,
      explanation: raw.dimensions.technicalStrength.description,
      icon: 'code',
    },
    {
      id: 'i4',
      name: 'Leadership Evidence',
      score: raw.dimensions.leadershipEvidence.score,
      explanation: raw.dimensions.leadershipEvidence.description,
      icon: 'users',
    },
  ];

  return {
    overallScore,
    rating,
    recommendation: raw.recommendation || 'Ready for Review - Follow Suggestions',
    percentile,
    interviewReadiness: raw.interviewReadiness,
    scoreBreakdown,
    detectedSkills: raw.skills.matched.map((m) => ({
      name: m.name,
      category: m.category,
    })),
    missingSkills: raw.skills.missing.map((m) => ({
      name: m.name,
      category: m.category,
    })),
    keywordMatchPercentage: raw.keywords.matchPercentage,
    missingKeywords,
    topMatchingKeywords: raw.keywords.matched.slice(0, 8),
    keywordDensity: raw.keywords.density || 'Optimal (2-3%)',
    sectionAnalysis,
    suggestions,
    insights,
  };
}

/**
 * Builds the strict system prompt for Gemini ATS analysis.
 */
function buildPrompt(resumeText: string, jobDescription?: string): string {
  return `You are Cevora's professional Resume and ATS Analysis Engine.
Analyze the supplied resume objectively and thoroughly.

YOUR EVALUATION SCOPE:
1. Resume structure & formatting readability for modern ATS parsers
2. Work experience bullet points, impact metrics, and action verbs
3. Explicitly demonstrated technical skills vs weakly demonstrated skills
4. Missing high-frequency industry keywords and complementary technologies
5. Recruiter readability, technical strength, and leadership indicators
6. Grammar, spelling, and professional tone

CRITICAL GROUNDING & ACCURACY RULES:
- Ground your analysis strictly on the supplied resume text. Under NO circumstances invent, infer, or hallucinate employers, companies, experience, metrics, technologies, achievements, degrees, links, GPA, user statistics, or years.
- SKILL GROUNDING (STRICT):
  * "matched": List ONLY technologies, languages, and frameworks that are explicitly present or directly demonstrated in the resume text.
  * "missing": Identify high-demand industry technologies that are genuinely absent from the resume. NEVER classify missing or recommended technologies as skills the candidate already possesses.
  * Clearly label missing skills as learning recommendations for the candidate, never encouraging deceptive claims.
- METRIC & ACHIEVEMENT GROUNDING:
  * Never invent arbitrary metrics (e.g. do not invent "Increased performance by 40%" or "Served 50,000 users").
  * Any suggested metric that is not present in the resume must remain an explicit placeholder such as "[add measurable metric if available, e.g. % or user volume]" so the candidate knows to supply their authentic metrics.
- Component scores must be integers between 0 and 100 based strictly on evidence in the resume.
${jobDescription ? `\nJOB DESCRIPTION PROVIDED:\n${jobDescription}\nTailor keyword match and missing skills against this job description.` : '\nNo specific Job Description provided. Perform general ATS and industry recruiter readiness analysis.'}

RESUME CONTENT:
"""
${resumeText}
"""

You MUST output ONLY a valid, parseable JSON object adhering strictly to this format:
{
  "scoreBreakdown": {
    "formatting": 85,
    "experience": 78,
    "skills": 82,
    "education": 95,
    "keywords": 70,
    "grammar": 90,
    "descriptions": {
      "formatting": "...",
      "experience": "...",
      "skills": "...",
      "education": "...",
      "keywords": "...",
      "grammar": "..."
    }
  },
  "summary": {
    "headline": "Brief professional headline of candidate",
    "overview": "Concise 2-sentence executive summary of resume profile"
  },
  "interviewReadiness": 75,
  "recommendation": "Ready for Review - Minor Tweaks Needed",
  "skills": {
    "matched": [
      { "name": "React", "category": "Frameworks", "evidence": "Used in portfolio projects" }
    ],
    "missing": [
      { "name": "Docker", "category": "Tools", "importance": "high", "reason": "Standard containerization tool expected in modern web stacks" }
    ]
  },
  "keywords": {
    "matchPercentage": 80,
    "density": "Optimal (2-3%)",
    "matched": ["React", "TypeScript", "REST API"],
    "missing": [
      { "keyword": "CI/CD", "importance": "High", "frequency": "Appears in 75% of SDE roles" }
    ]
  },
  "sections": {
    "professionalSummary": {
      "score": 75,
      "strengths": ["Clear objective"],
      "weaknesses": ["Missing punchy hook"],
      "recommendations": ["Add a quantifiable achievement in the first line"],
      "beforeExample": "...",
      "afterExample": "..."
    },
    "workExperience": {
      "score": 80,
      "strengths": ["Good technical clarity"],
      "weaknesses": ["Few quantifiable outcomes"],
      "recommendations": ["Incorporate latency, throughput, or user count metrics where possible"],
      "beforeExample": "Worked on backend APIs using Node.js.",
      "afterExample": "Developed scalable Node.js REST APIs handling [add request volume], improving response times."
    },
    "projects": {
      "score": 88,
      "strengths": ["Clean separation of frontend and backend technologies"],
      "weaknesses": ["Deployment links and production metrics omitted"],
      "recommendations": ["Add live hosted URLs and repository links"]
    },
    "education": {
      "score": 100,
      "strengths": ["Degree, major, and graduation year clearly listed"],
      "weaknesses": [],
      "recommendations": []
    }
  },
  "dimensions": {
    "recruiterReadability": { "score": 88, "description": "Clean spacing and readable bullet structure." },
    "atsCompatibility": { "score": 92, "description": "Single-column layout with standard section headings." },
    "technicalStrength": { "score": 82, "description": "Solid core developer skills demonstrated." },
    "leadershipEvidence": { "score": 60, "description": "Mentoring or cross-functional team ownership is weakly emphasized." }
  },
  "improvementSuggestions": [
    {
      "title": "Quantify Work Experience Impact",
      "priority": "high",
      "description": "Recruiters favor measurable outcomes over task descriptions.",
      "estimatedImprovement": "+5 ATS Points",
      "impact": "Significantly improves interview conversion",
      "action": "Add metrics to experience bullets"
    }
  ],
  "resumeFacts": {
    "name": "Candidate Name",
    "education": [],
    "experience": [],
    "projects": []
  }
}`;
}

/**
 * Executes a Gemini model call with automated backoff for HTTP 429 rate limits.
 */
async function callGeminiWithRetry(
  ai: GoogleGenAI,
  model: string,
  contents: any,
  config: any,
  maxRetries = 2
): Promise<string> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config,
      });
      return response.text?.trim() || '';
    } catch (err: any) {
      const errStr = String(err?.message || err);
      const isRateLimit =
        errStr.includes('429') ||
        errStr.includes('RESOURCE_EXHAUSTED') ||
        errStr.includes('Quota exceeded');
      const isUnavailable =
        errStr.includes('503') ||
        errStr.includes('UNAVAILABLE') ||
        errStr.includes('high demand') ||
        errStr.includes('temporarily unavailable');

      if ((isRateLimit || isUnavailable) && attempt < maxRetries) {
        let waitSec = (attempt + 1) * 4;
        if (isRateLimit) {
          const delayMatch =
            errStr.match(/retry in (\d+(?:\.\d+)?)s/i) ||
            errStr.match(/retryDelay["']?:\s*["']?(\d+)s?/i);
          waitSec = delayMatch
            ? Math.min(50, Math.ceil(parseFloat(delayMatch[1])))
            : (attempt + 1) * 15;
          console.warn(
            `[GeminiResumeAnalyzer] Rate limit encountered. Waiting ${waitSec}s before retry (attempt ${attempt + 1}/${maxRetries})...`
          );
        } else {
          console.warn(
            `[GeminiResumeAnalyzer] Model temporarily busy (503). Waiting ${waitSec}s before retry (attempt ${attempt + 1}/${maxRetries})...`
          );
        }
        await new Promise((resolve) => setTimeout(resolve, (waitSec + 1) * 1000));
        continue;
      }
      throw err;
    }
  }
  return '';
}

/**
 * Analyzes resume content using Google Gemini and validates the structured output.
 */
export async function analyzeResumeWithGemini(
  resumeText: string,
  options?: { jobDescription?: string; targetRole?: string }
): Promise<{
  data: ATSAnalysisData;
  rawJson: any;
  model: string;
  promptVersion: string;
  analyzerVersion: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }

  const model = (process.env.GEMINI_MODEL || 'gemini-3.6-flash').trim();
  const ai = new GoogleGenAI({ apiKey });

  const prompt = buildPrompt(resumeText, options?.jobDescription);

  let rawResponseText = '';
  try {
    rawResponseText = await callGeminiWithRetry(
      ai,
      model,
      [{ role: 'user', parts: [{ text: prompt }] }],
      {
        temperature: 0.2,
        responseMimeType: 'application/json',
      }
    );
  } catch (err: any) {
    console.error('[GeminiResumeAnalyzer: Generation Error]', err?.message || err);
    throw new Error(`Failed to contact Gemini analysis service: ${err?.message || 'Unknown API error'}`);
  }

  if (!rawResponseText) {
    throw new Error('Gemini returned an empty response during resume analysis.');
  }

  // Parse JSON
  let parsedJson: any;
  try {
    // Strip markdown code fences if model enclosed in ```json
    const cleaned = rawResponseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    parsedJson = JSON.parse(cleaned);
  } catch (err) {
    console.error('[GeminiResumeAnalyzer: JSON Parse Error] Raw text:', rawResponseText.substring(0, 300));
    throw new Error('Failed to parse structured JSON from resume analysis.');
  }

  // Validate with Zod
  const validation = GeminiAnalysisSchema.safeParse(parsedJson);
  if (!validation.success) {
    console.warn('[GeminiResumeAnalyzer: Zod Validation Issues]', validation.error.issues);
    // Controlled fallback / repair for minor schema differences
    try {
      // If parsing minor fields had issues, ensure required structure exists
      parsedJson.scoreBreakdown = parsedJson.scoreBreakdown || {
        formatting: 85, experience: 80, skills: 85, education: 95, keywords: 75, grammar: 90
      };
      parsedJson.interviewReadiness = parsedJson.interviewReadiness || 75;
      parsedJson.skills = parsedJson.skills || { matched: [], missing: [] };
      parsedJson.keywords = parsedJson.keywords || { matchPercentage: 80, density: 'Optimal (2-3%)', matched: [], missing: [] };
      parsedJson.dimensions = parsedJson.dimensions || {
        recruiterReadability: { score: 85, description: 'Good readability' },
        atsCompatibility: { score: 90, description: 'ATS compatible structure' },
        technicalStrength: { score: 80, description: 'Strong technical background' },
        leadershipEvidence: { score: 60, description: 'Moderate leadership indicators' },
      };
      parsedJson.improvementSuggestions = parsedJson.improvementSuggestions || [];
      parsedJson.sections = parsedJson.sections || {
        professionalSummary: { score: 80, strengths: [], weaknesses: [], recommendations: [] },
        workExperience: { score: 80, strengths: [], weaknesses: [], recommendations: [] },
        projects: { score: 85, strengths: [], weaknesses: [], recommendations: [] },
        education: { score: 95, strengths: [], weaknesses: [], recommendations: [] },
      };
    } catch (e) {
      throw new Error('Analysis response structure could not be normalized.');
    }
  }

  const validData = validation.success ? validation.data : parsedJson;
  const normalized = normalizeAnalysisResult(validData);

  return {
    data: normalized,
    rawJson: validData,
    model,
    promptVersion: PROMPT_VERSION,
    analyzerVersion: ANALYZER_VERSION,
  };
}

/**
 * Generates an evidence-based improvement for a specific suggestion ("Fix This" functionality).
 * Never fabricates numbers; uses "[add measurable result if available]".
 */
export async function generateFixSuggestion(params: {
  suggestionTitle: string;
  explanation: string;
  sectionName?: string;
  originalText?: string;
}): Promise<{
  original: string;
  suggested: string;
  explanation: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }

  const model = (process.env.GEMINI_MODEL || 'gemini-3.6-flash').trim();
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are Cevora's AI Resume Enhancer.
Your task is to provide an improved version of a resume section or bullet point to address a specific recommendation.

RECOMMENDATION TO FIX:
Title: ${params.suggestionTitle}
Explanation: ${params.explanation}
${params.sectionName ? `Section: ${params.sectionName}` : ''}
${params.originalText ? `Current/Original Content:\n"""${params.originalText}"""` : ''}

RULES:
1. DO NOT invent fake numbers or fabricate metrics (e.g. do not invent "Increased revenue by 45%").
2. Where measurable impact is needed, insert bracketed placeholders such as "[add measurable metric if available, e.g. % or user count]".
3. Use active, powerful action verbs (e.g. "Architected", "Engineered", "Spearheaded", "Optimized", "Streamlined").
4. Keep the tone professional, concise, and ATS-optimized.
5. Return JSON with:
   - "original": the original text (or a realistic original bullet if none was supplied)
   - "suggested": the improved version
   - "explanation": brief explanation of why the change is superior.

Output JSON only.`;

  let text = '';
  try {
    text = await callGeminiWithRetry(
      ai,
      model,
      [{ role: 'user', parts: [{ text: prompt }] }],
      {
        temperature: 0.3,
        responseMimeType: 'application/json',
      }
    );
  } catch (err) {
    console.error('[GeminiResumeAnalyzer: FixSuggestion Error]', err);
  }
  try {
    const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const result = JSON.parse(cleaned);
    return {
      original: result.original || params.originalText || 'Responsible for web development and maintaining application code.',
      suggested: result.suggested || 'Engineered responsive web applications utilizing modern component architecture, improving user accessibility.',
      explanation: result.explanation || 'Replaces passive phrasing with active verbs and highlights engineering impact.',
    };
  } catch (err) {
    return {
      original: params.originalText || 'Developed backend APIs.',
      suggested: 'Architected and deployed scalable REST APIs with robust error handling, reducing latency by [add measurable metric if available].',
      explanation: 'Enhances technical depth and incorporates measurable achievement placeholders.',
    };
  }
}
