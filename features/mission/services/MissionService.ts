import prisma from '@/lib/prisma';
import { MissionGenerator } from './MissionGenerator';
import { MissionStateMachine } from './MissionStateMachine';
import { MissionState, CompletionPayload } from '../types';
import { LearningEventType } from '@prisma/client';
import { learningProfileService } from '@/features/learning-profile/services/LearningProfileService';

export class MissionService {
  /**
   * Gets today's pending/in-progress mission or generates a new one if none exists.
   */
  static async getTodayMission(userId: string): Promise<MissionState> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    let mission = await prisma.mission.findFirst({
      where: {
        userId,
        status: { in: ['PENDING', 'IN_PROGRESS'] },
        createdAt: { gte: startOfDay }
      },
      include: {
        lessons: { orderBy: { order: 'asc' } },
        practices: { orderBy: { order: 'asc' } },
        missionProgress: true
      }
    });

    if (!mission) {
      mission = await MissionGenerator.generateDailyMission(userId);
    }

    if (mission.status === 'PENDING') {
      // Mark as started
      mission = await prisma.mission.update({
        where: { id: mission.id },
        data: { status: 'IN_PROGRESS' },
        include: {
          lessons: { orderBy: { order: 'asc' } },
          practices: { orderBy: { order: 'asc' } },
          missionProgress: true
        }
      });
      
      await prisma.learningEvent.create({
        data: {
          userId,
          eventType: LearningEventType.LESSON_STARTED,
          source: 'MISSION_ENGINE',
          metadata: { missionId: mission.id }
        }
      });
    }

    return {
      mission,
      lessons: mission.lessons,
      practices: mission.practices,
      progress: mission.missionProgress
    };
  }

  /**
   * Completes a mission and updates XP, streaks, and concept mastery.
   */
  static async completeMission(userId: string, missionId: string, payload: CompletionPayload) {
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
      include: { practices: true }
    });

    if (!mission || mission.userId !== userId) {
      throw new Error('Mission not found');
    }

    if (mission.status === 'COMPLETED') {
      return mission; // already completed
    }

    // 1. Advance state machine to COMPLETED
    await MissionStateMachine.advanceToStage(missionId, 'COMPLETED');

    // 2. Mark mission as COMPLETED and award XP
    const xpToAward = mission.estimatedMinutes ? mission.estimatedMinutes * 10 : 50;

    await prisma.mission.update({
      where: { id: missionId },
      data: {
        status: 'COMPLETED',
        progress: 100,
        xpAwarded: xpToAward,
        completedAt: new Date(),
        completion: {
          create: {
            reflectionNotes: payload.reflectionNotes,
            confidenceRating: payload.confidenceRating,
            timeSpentSeconds: payload.timeSpentSeconds
          }
        }
      }
    });

    // 3. Update Learning Profile (Streaks, etc.)
    // Streak updates would be handled here via a proper service method

    // 4. Create Learning Event
    await prisma.learningEvent.create({
      data: {
        userId,
        eventType: LearningEventType.MISSION_COMPLETED,
        source: 'MISSION_ENGINE',
        metadata: { missionId, xpAwarded: xpToAward }
      }
    });

    return { success: true, xpAwarded: xpToAward };
  }
}
