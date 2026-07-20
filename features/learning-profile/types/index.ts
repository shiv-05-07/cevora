import { LearningLevel, LearningStyle, RoadmapDifficulty, LearningPace } from '@prisma/client';

export interface UpdateProfilePayload {
  learningLevel?: LearningLevel;
  learningStyle?: LearningStyle;
  preferredDifficulty?: RoadmapDifficulty;
  learningPace?: LearningPace;
  learningGoals?: string[];
  preferredSubjects?: string[];
  dailyGoalMinutes?: number;
  weeklyGoalMinutes?: number;
  adaptiveEnabled?: boolean;
  onboardingCompleted?: boolean;
}
