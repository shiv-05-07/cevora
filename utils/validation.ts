import { z } from 'zod';
import { ValidationError } from '@/lib/errors';

/**
 * Standard utility to run schema validations using Zod.
 * Maps validation errors to standard ValidationError arrays.
 */
export function validateSchema<T>(schema: z.Schema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorMap: Record<string, string[]> = {};
    result.error.issues.forEach((issue: z.ZodIssue) => {
      const path = issue.path.join('.') || 'root';
      if (!errorMap[path]) {
        errorMap[path] = [];
      }
      errorMap[path].push(issue.message);
    });
    throw new ValidationError('Input validation failed', errorMap);
  }
  return result.data;
}
