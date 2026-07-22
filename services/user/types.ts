import { z } from "zod";
import { UserRole } from "@prisma/client";

export const syncUserSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  role: z.nativeEnum(UserRole).optional(),
});

export const updateProfileSchema = z.object({
  fullName: z.string().optional(),
  bio: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
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
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  portfolio: z.string().optional().nullable(),

  // TeacherProfile fields
  institution: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  designation: z.string().optional().nullable(),
  facultyId: z.string().optional().nullable(),
  office: z.string().optional().nullable(),
});

export type SyncUserPayload = z.infer<typeof syncUserSchema>;
export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;
