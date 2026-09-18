import { RoadmapDifficulty, PlacementReadiness, DiagnosticStatus } from '@prisma/client';
import { GeminiDiagnosticAnalysis } from '@/services/intelligence/diagnosticGeminiService';
export type { GeminiDiagnosticAnalysis };

export type DiagnosticCategory = 
  | 'DSA' 
  | 'Aptitude' 
  | 'DBMS' 
  | 'OS' 
  | 'CN' 
  | 'OOP' 
  | 'SQL' 
  | 'Behavioral' 
  | 'Communication'
  | string;

export type ConceptStatus = 'strong' | 'developing' | 'needs_work' | 'not_assessed';

export type QuestionType = 
  | 'MCQ' 
  | 'Code Output' 
  | 'Logical' 
  | 'Scenario' 
  | 'Technical';

export interface DiagnosticQuestionOption {
  id: string;
  text: string;
}

export interface DiagnosticQuestion {
  id: string;
  subjectKey?: string;
  conceptKey?: string;
  category: DiagnosticCategory;
  concept: string;
  difficulty: RoadmapDifficulty;
  questionType: QuestionType;
  question: string;
  codeSnippet?: string;
  options: DiagnosticQuestionOption[];
  correctAnswer: string;
  explanation: string;
}

export interface DiagnosticAnswerPayload {
  attemptId: string;
  questionId: string;
  selectedAnswer: string | null;
  correctAnswer?: string;
  timeTaken?: number;
}

export interface CategoryAdaptiveState {
  category: DiagnosticCategory;
  currentDifficulty: RoadmapDifficulty;
  streak: number;
  confidence: number;
  mistakes: number;
  questionsAnswered: number;
}

export type LearningPersona = 
  | 'Fast Learner' 
  | 'Consistent Learner' 
  | 'Practice Driven' 
  | 'Concept Strong' 
  | 'Needs Revision';

export interface WeakConceptDetail {
  conceptId?: string;
  conceptKey?: string;
  concept: string;
  category: string;
  score: number;
  severity: 'CRITICAL' | 'WEAK' | 'IMPROVING' | 'HEALTHY';
  recommendedAction: string;
}

export interface StrongConceptDetail {
  conceptKey?: string;
  concept: string;
  category: string;
  score: number;
}

export interface NotAssessedConceptDetail {
  conceptKey?: string;
  concept: string;
  category: string;
}

export interface CategoryScoreDetail {
  category: DiagnosticCategory;
  score: number;
  accuracy: number;
  total: number;
  correct: number;
  trend: number;
}

export interface DiagnosticResultSummary {
  attemptId: string;
  subjectKey?: string;
  subjectLabel?: string;
  score: number;
  accuracy: number;
  totalQuestions: number;
  correctCount: number;
  placementReadiness: PlacementReadiness;
  readinessScore: number;
  persona: LearningPersona;
  weakConcepts: WeakConceptDetail[];
  strongConcepts: StrongConceptDetail[];
  notAssessedConcepts: NotAssessedConceptDetail[];
  conceptEvidence: Record<string, ConceptStatus>;
  recommendedStartConcept: string;
  recommendedStartTitle: string;
  categoryScores: Record<string, CategoryScoreDetail>;
  aiExplanation: string;
  recommendedRoadmap: string;
  geminiAnalysis?: GeminiDiagnosticAnalysis | null;
  isFallback?: boolean;
}

export interface DiagnosticStatusResponse {
  status: DiagnosticStatus;
  completedAt: Date | null;
  attemptNumber: number;
  canRetake: boolean;
  activeAttemptId?: string | null;
}
