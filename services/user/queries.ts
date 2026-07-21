import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export const userQueries = {
  /**
   * Retrieves a user by their ID, including their student profile.
   */
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: true,
        learningProfile: true,
      },
    });
  },

  /**
   * Creates a new user. If the user is a STUDENT, creates an empty student profile.
   */
  async createUser(data: {
    id: string;
    fullName: string;
    username: string;
    avatarUrl?: string | null;
    role?: UserRole;
  }) {
    return prisma.user.create({
      data: {
        id: data.id,
        fullName: data.fullName,
        username: data.username,
        avatarUrl: data.avatarUrl,
        ...(data.role ? { role: data.role } : {}),
        ...(data.role === UserRole.STUDENT || !data.role
          ? {
              studentProfile: {
                create: {},
              },
            }
          : {}),
      },
      include: {
        studentProfile: true,
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
};
