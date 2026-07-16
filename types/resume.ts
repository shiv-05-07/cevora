export type ResumeAnalysisState = 'Idle' | 'Uploading' | 'Analyzing' | 'Completed' | 'Error';

export interface ScoreCategory {
  id: string;
  name: string;
  score: number;
  description: string;
}

export interface SkillMatch {
  name: string;
  category: string;
}

export interface SectionAnalysis {
  name: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-work';
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  beforeExample?: string;
  afterExample?: string;
}

export interface ImprovementSuggestion {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  explanation: string;
  impact: string;
  estimatedImprovement: string;
  icon: string;
}

export interface ResumeInsight {
  id: string;
  name: string;
  score: number;
  explanation: string;
  icon: string;
}

export interface MissingKeyword {
  word: string;
  importance: 'Critical' | 'High' | 'Medium' | 'Low';
  frequency?: string;
}

export interface ATSAnalysisData {
  overallScore: number;
  rating: string;
  recommendation: string;
  percentile: string;
  interviewReadiness: number;
  
  scoreBreakdown: ScoreCategory[];
  
  detectedSkills: SkillMatch[];
  missingSkills: SkillMatch[];
  
  keywordMatchPercentage: number;
  missingKeywords: MissingKeyword[];
  topMatchingKeywords: string[];
  keywordDensity: string;
  
  sectionAnalysis: SectionAnalysis[];
  
  suggestions: ImprovementSuggestion[];
  
  insights: ResumeInsight[];
}
