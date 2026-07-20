import { LearningLevel, LearningStyle, RoadmapDifficulty } from '@prisma/client';

export interface UpdateProfilePayload {
  learningLevel?: LearningLevel;
  learningStyle?: LearningStyle;
  preferredDifficulty?: RoadmapDifficulty;
  dailyGoalMinutes?: number;
  weeklyGoalMinutes?: number;
  adaptiveEnabled?: boolean;
}
