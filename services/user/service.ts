import { userQueries } from "./queries";
import { SyncUserPayload, UpdateProfilePayload } from "./types";

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
   * Creates the user if they do not exist.
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
    }
    
    return user;
  },

  /**
   * Updates a user's core profile and their student profile.
   */
  async updateProfile(id: string, payload: UpdateProfilePayload) {
    const { bio, avatarUrl, username, ...profileData } = payload;
    
    // Update core User fields if provided
    const userUpdateData: any = {};
    if (bio !== undefined) userUpdateData.bio = bio;
    if (avatarUrl !== undefined) userUpdateData.avatarUrl = avatarUrl;
    if (username !== undefined) userUpdateData.username = username;

    if (Object.keys(userUpdateData).length > 0) {
      await userQueries.updateUser(id, userUpdateData);
    }

    // Update StudentProfile fields if provided
    // Ensure undefined values are cleaned up or explicitly handled
    const cleanedProfileData = Object.fromEntries(
      Object.entries(profileData).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(cleanedProfileData).length > 0) {
      await userQueries.updateStudentProfile(id, cleanedProfileData);
    }

    return await userQueries.getUserById(id);
  }
};
