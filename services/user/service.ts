import prisma from "@/lib/prisma";
import { userQueries } from "./queries";
import { SyncUserPayload, UpdateProfilePayload } from "./types";
import { UserRole } from "@prisma/client";

export const userService = {
  /**
   * Retrieves the current user by ID.
   */
  async getCurrentUser(id: string) {
    return await userQueries.getUserById(id);
  },

  /**
   * Retrieves a user profile by ID.
   */
  async getProfile(id: string) {
    return await userQueries.getUserById(id);
  },

  /**
   * Synchronizes a user from Supabase to Prisma.
   * Creates the user (with StudentProfile + LearningProfile for students, or TeacherProfile for teachers).
   * Idempotently repairs legacy accounts missing their role profile.
   */
  async syncUser(payload: SyncUserPayload) {
    let user = await userQueries.getUserById(payload.id);

    if (!user) {
      user = await userQueries.createUser({
        id: payload.id,
        fullName: payload.fullName,
        username: payload.username,
        avatarUrl: payload.avatarUrl,
        role: payload.role,
      });
    } else if (user.role === UserRole.STUDENT && !user.learningProfile) {
      await prisma.learningProfile.upsert({
        where: { userId: user.id },
        create: { userId: user.id },
        update: {},
      });
      user = await userQueries.getUserById(payload.id);
    } else if ((user.role === UserRole.TEACHER || user.role === UserRole.ADMIN) && !user.teacherProfile) {
      await prisma.teacherProfile.upsert({
        where: { userId: user.id },
        create: { userId: user.id },
        update: {},
      });
      user = await userQueries.getUserById(payload.id);
    }

    return user;
  },

  /**
   * Updates a user's core profile and role-specific profile (StudentProfile OR TeacherProfile).
   * Student settings update StudentProfile ONLY.
   * Teacher settings update TeacherProfile ONLY.
   */
  async updateProfile(id: string, payload: UpdateProfilePayload) {
    const user = await userQueries.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const { fullName, bio, avatarUrl, username, ...profileData } = payload;
    
    // Update core User fields if provided
    const userUpdateData: any = {};
    if (fullName !== undefined) userUpdateData.fullName = fullName;
    if (bio !== undefined) userUpdateData.bio = bio;
    if (avatarUrl !== undefined) userUpdateData.avatarUrl = avatarUrl;
    if (username !== undefined) userUpdateData.username = username;

    if (Object.keys(userUpdateData).length > 0) {
      await userQueries.updateUser(id, userUpdateData);
    }

    const isTeacher = user.role === UserRole.TEACHER || user.role === UserRole.ADMIN;

    if (isTeacher) {
      // Teacher settings: update TeacherProfile ONLY
      const teacherFields: any = {};
      if (profileData.institution !== undefined) teacherFields.institution = profileData.institution;
      if (profileData.department !== undefined) teacherFields.department = profileData.department;
      if (profileData.designation !== undefined) teacherFields.designation = profileData.designation;
      if (profileData.facultyId !== undefined) teacherFields.facultyId = profileData.facultyId;
      if (profileData.office !== undefined) teacherFields.office = profileData.office;
      if (bio !== undefined) teacherFields.bio = bio;

      if (Object.keys(teacherFields).length > 0) {
        await userQueries.updateTeacherProfile(id, teacherFields);
      }
    } else {
      // Student settings: update StudentProfile ONLY
      const studentFields: any = {};
      if (profileData.college !== undefined) studentFields.college = profileData.college;
      if (profileData.degree !== undefined) studentFields.degree = profileData.degree;
      if (profileData.specialization !== undefined) studentFields.specialization = profileData.specialization;
      if (profileData.semester !== undefined) studentFields.semester = profileData.semester;
      if (profileData.graduationYear !== undefined) studentFields.graduationYear = profileData.graduationYear;
      if (profileData.cgpa !== undefined) studentFields.cgpa = profileData.cgpa;
      if (profileData.targetRole !== undefined) studentFields.targetRole = profileData.targetRole;
      if (profileData.targetCompany !== undefined) studentFields.targetCompany = profileData.targetCompany;
      if (profileData.github !== undefined) studentFields.github = profileData.github;
      if (profileData.linkedin !== undefined) studentFields.linkedin = profileData.linkedin;
      if (profileData.portfolio !== undefined) studentFields.portfolio = profileData.portfolio;

      if (Object.keys(studentFields).length > 0) {
        await userQueries.updateStudentProfile(id, studentFields);
      }
    }

    return await userQueries.getUserById(id);
  }
};
