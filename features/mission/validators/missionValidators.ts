import { z } from 'zod';

export const practiceAnswerSchema = z.object({
  practiceId: z.string().uuid(),
  answer: z.any(),
});

export const missionCompletionSchema = z.object({
  reflectionNotes: z.string().optional(),
  confidenceRating: z.number().min(1).max(5),
  timeSpentSeconds: z.number().min(0),
});

export type PracticeAnswerPayload = z.infer<typeof practiceAnswerSchema>;
export type MissionCompletionPayload = z.infer<typeof missionCompletionSchema>;
