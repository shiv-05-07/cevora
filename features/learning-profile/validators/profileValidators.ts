import { z } from 'zod';
import { LearningLevel, LearningStyle, RoadmapDifficulty } from '@prisma/client';

export const updateProfileSchema = z.object({
  learningLevel: z.nativeEnum(LearningLevel).optional(),
  learningStyle: z.nativeEnum(LearningStyle).optional(),
  preferredDifficulty: z.nativeEnum(RoadmapDifficulty).optional(),
  dailyGoalMinutes: z.number().int().nonnegative().optional(),
  weeklyGoalMinutes: z.number().int().nonnegative().optional(),
  adaptiveEnabled: z.boolean().optional()
});
