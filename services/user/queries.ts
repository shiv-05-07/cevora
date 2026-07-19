import prisma from "@/lib/prisma";

export const userQueries = {
  /**
   * Retrieves a user by their ID, including their student profile.
   */
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: true,
      },
    });
  },

  /**
   * Creates a new user along with an empty student profile.
   */
  async createUser(data: {
    id: string;
    fullName: string;
    username: string;
    avatarUrl?: string | null;
  }) {
    return prisma.user.create({
      data: {
        id: data.id,
        fullName: data.fullName,
        username: data.username,
        avatarUrl: data.avatarUrl,
        studentProfile: {
          create: {}, // Create an empty student profile by default
        },
      },
      include: {
        studentProfile: true,
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
