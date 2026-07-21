import { z } from 'zod';
import { LearningLevel, LearningStyle, RoadmapDifficulty, LearningPace } from '@prisma/client';

export const updateProfileSchema = z.object({
  learningLevel: z.nativeEnum(LearningLevel).optional(),
  learningStyle: z.nativeEnum(LearningStyle).optional(),
  preferredDifficulty: z.nativeEnum(RoadmapDifficulty).optional(),
  learningPace: z.nativeEnum(LearningPace).optional(),
  learningGoals: z.array(z.string()).optional(),
  preferredSubjects: z.array(z.string()).optional(),
  dailyGoalMinutes: z.number().int().nonnegative().optional(),
  weeklyGoalMinutes: z.number().int().nonnegative().optional(),
  adaptiveEnabled: z.boolean().optional(),
  onboardingCompleted: z.boolean().optional(),
});
