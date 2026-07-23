import { z } from 'zod';

export const startDiagnosticSchema = z.object({});

export const submitAnswerSchema = z.object({
  attemptId: z.string().uuid(),
  questionId: z.string().min(1),
  selectedAnswer: z.string().nullable(),
  correctAnswer: z.string().optional(),
  timeTaken: z.number().int().nonnegative().optional()
});

export const finishDiagnosticSchema = z.object({
  attemptId: z.string().uuid()
});
