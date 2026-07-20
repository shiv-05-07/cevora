import { RoadmapDifficulty } from '@prisma/client';

export interface DiagnosticQuestionOption {
  id: string;
  text: string;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: DiagnosticQuestionOption[];
  correctAnswer: string;
  explanation: string;
  concept: string; // e.g., "Variables", "Loops"
  difficulty: RoadmapDifficulty;
}

export interface DiagnosticAnswerPayload {
  questionId: string;
  selectedAnswer: string | null;
  correctAnswer: string;
  timeTaken?: number;
}
