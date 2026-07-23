import { RoadmapDifficulty, PlacementReadiness, DiagnosticStatus } from '@prisma/client';

export type DiagnosticCategory = 
  | 'DSA' 
  | 'Aptitude' 
  | 'DBMS' 
  | 'OS' 
  | 'CN' 
  | 'OOP' 
  | 'SQL' 
  | 'Behavioral' 
  | 'Communication';

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
  concept: string;
  category: string;
  score: number;
  severity: 'CRITICAL' | 'WEAK' | 'IMPROVING' | 'HEALTHY';
  recommendedAction: string;
}

export interface StrongConceptDetail {
  concept: string;
  category: string;
  score: number;
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
  score: number;
  accuracy: number;
  placementReadiness: PlacementReadiness;
  readinessScore: number;
  persona: LearningPersona;
  weakConcepts: WeakConceptDetail[];
  strongConcepts: StrongConceptDetail[];
  categoryScores: Record<DiagnosticCategory, CategoryScoreDetail>;
  aiExplanation: string;
  recommendedRoadmap: string;
}

export interface DiagnosticStatusResponse {
  status: DiagnosticStatus;
  completedAt: Date | null;
  attemptNumber: number;
  canRetake: boolean;
  activeAttemptId?: string | null;
}
