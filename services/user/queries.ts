import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export const userQueries = {
  /**
   * Retrieves a user by their ID, including their role-specific profiles.
   */
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: true,
        teacherProfile: true,
        learningProfile: true,
      },
    });
  },

  /**
   * Creates a new user.
   * For STUDENT role: atomically creates StudentProfile and LearningProfile.
   * For TEACHER or ADMIN role: atomically creates TeacherProfile ONLY.
   */
  async createUser(data: {
    id: string;
    fullName: string;
    username: string;
    avatarUrl?: string | null;
    role?: UserRole;
  }) {
    const isStudent = data.role === UserRole.STUDENT || !data.role;
    const isTeacherOrAdmin = data.role === UserRole.TEACHER || data.role === UserRole.ADMIN;

    return prisma.user.create({
      data: {
        id: data.id,
        fullName: data.fullName,
        username: data.username,
        avatarUrl: data.avatarUrl,
        ...(data.role ? { role: data.role } : {}),
        ...(isStudent
          ? {
              studentProfile: { create: {} },
              learningProfile: { create: {} }, // onboardingCompleted defaults to false
            }
          : {}),
        ...(isTeacherOrAdmin
          ? {
              teacherProfile: { create: {} },
            }
          : {}),
      },
      include: {
        studentProfile: true,
        teacherProfile: true,
        learningProfile: true,
      },
    });
  },

  /**
   * Updates a user's core data.
   */
  async updateUser(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        studentProfile: true,
        teacherProfile: true,
        learningProfile: true,
      },
    });
  },

  /**
   * Upserts a student profile for a given user.
   */
  async updateStudentProfile(userId: string, data: any) {
    return prisma.studentProfile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  },

  /**
   * Upserts a teacher profile for a given user.
   */
  async updateTeacherProfile(userId: string, data: any) {
    return prisma.teacherProfile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  },
};
