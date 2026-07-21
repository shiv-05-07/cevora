import { z } from 'zod';
import { LearningStyle, RoadmapDifficulty, LearningPace } from '@prisma/client';

export const goalSchema = z.object({
  goals: z.array(z.string()).min(1, "Select at least one goal"),
  primaryGoal: z.string().min(1, "Primary goal is required")
});

export const preferencesSchema = z.object({
  learningStyle: z.nativeEnum(LearningStyle, { message: "Select a valid learning style" }),
  difficulty: z.nativeEnum(RoadmapDifficulty, { message: "Select a valid difficulty" }),
  learningPace: z.nativeEnum(LearningPace, { message: "Select a valid learning pace" }),
  dailyReminder: z.boolean()
});

export const subjectsSchema = z.object({
  subjects: z.array(z.string()).min(1, "Select at least one subject")
});

export const studyScheduleSchema = z.object({
  dailyStudyTime: z.number().min(15, "Minimum study time is 15 minutes").max(240, "Maximum study time is 240 minutes"),
  preferredStudyTime: z.string().min(1, "Preferred study time is required")
});
