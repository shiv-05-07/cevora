import prisma from '@/lib/prisma';
import { logger } from '@/utils/logger';
import { UpdateProfilePayload } from '../types';
import { LearningEventType, RoadmapDifficulty } from '@prisma/client';

export const learningProfileService = {
  /**
   * Fetches the user's learning profile.
   */
  async getProfile(userId: string) {
    logger.debug(`Fetching learning profile for user ${userId}`);
    return prisma.learningProfile.findUnique({
      where: { userId }
    });
  },

  /**
   * Idempotently creates a new learning profile for the user.
   */
  async createProfile(userId: string) {
    logger.debug(`Attempting to create learning profile for user ${userId}`);
    
    // Check if profile exists first (idempotent)
    const existingProfile = await this.getProfile(userId);
    if (existingProfile) {
      logger.info(`Learning profile already exists for user ${userId}`);
      return existingProfile;
    }

    const profile = await prisma.learningProfile.create({
      data: {
        userId
      }
    });
    
    logger.info(`Successfully created learning profile for user ${userId}`);
    return profile;
  },

  /**
   * Initializes default values for a learning profile and logs an event.
   */
  async initializeDefaults(userId: string) {
    logger.info(`Initializing default profile settings for user ${userId}`);
    
    // First ensure profile exists
    await this.createProfile(userId);

    const updatedProfile = await prisma.$transaction(async (tx) => {
      const profile = await tx.learningProfile.update({
        where: { userId },
        data: {
          adaptiveEnabled: true,
          diagnosticCompleted: false,
          onboardingCompleted: false,
          preferredDifficulty: RoadmapDifficulty.BEGINNER,
          currentStreak: 0,
          longestStreak: 0
        }
      });

      // Record learning event
      await tx.learningEvent.create({
        data: {
          userId,
          eventType: LearningEventType.LESSON_STARTED, // Mapped generic event since schema cannot change
          title: 'Learning Profile Initialized',
          source: 'System'
        }
      });

      return profile;
    });

    return updatedProfile;
  },

  /**
   * Updates user learning profile properties.
   */
  async updateProfile(userId: string, data: UpdateProfilePayload) {
    logger.debug(`Updating learning profile for user ${userId}`, data);
    
    const profile = await prisma.learningProfile.update({
      where: { userId },
      data
    });

    return profile;
  }
};
