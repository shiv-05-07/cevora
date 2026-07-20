import { z } from "zod";

export const syncUserSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  username: z.string(),
  avatarUrl: z.string().url().optional().or(z.literal("")).nullable(),
});

export const updateProfileSchema = z.object({
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")).nullable(),
  username: z.string().optional(),
  
  // StudentProfile fields
  college: z.string().optional().nullable(),
  degree: z.string().optional().nullable(),
  specialization: z.string().optional().nullable(),
  semester: z.number().int().optional().nullable(),
  graduationYear: z.number().int().optional().nullable(),
  cgpa: z.number().optional().nullable(),
  targetRole: z.string().optional().nullable(),
  targetCompany: z.string().optional().nullable(),
  github: z.string().url().optional().or(z.literal("")).nullable(),
  linkedin: z.string().url().optional().or(z.literal("")).nullable(),
  portfolio: z.string().url().optional().or(z.literal("")).nullable(),
});

export type SyncUserPayload = z.infer<typeof syncUserSchema>;
export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;
