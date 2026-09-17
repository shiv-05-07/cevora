import { Mission, MissionLesson, MissionPractice, MissionProgress, MissionStatus, RoadmapDifficulty } from '@prisma/client';

export type MissionStage = 'LEARN' | 'LESSON' | 'PRACTICE' | 'REVIEW' | 'REFLECTION' | 'INTERVIEW' | 'COMPLETED';

export interface MissionState {
  mission: Mission;
  lessons: MissionLesson[];
  practices: MissionPractice[];
  progress: MissionProgress | null;
}

export interface RecommendationResult {
  priorityScore: number;
  adaptiveDifficulty: RoadmapDifficulty;
  estimatedMinutes: number;
  confidence: number;
  reason: string;
}

export interface CompletionPayload {
  reflectionNotes?: string;
  confidenceRating: number;
  timeSpentSeconds: number;
}
