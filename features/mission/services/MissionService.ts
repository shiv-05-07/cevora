import prisma from '@/lib/prisma';
import { MissionGenerator } from './MissionGenerator';
import { MissionStateMachine } from './MissionStateMachine';
import { MissionState, CompletionPayload } from '../types';
import { LearningEventType, MasteryLevel } from '@prisma/client';
import { getSubjectCurriculum, getPrimarySubject } from '@/lib/learning/curriculum/subjectCurriculum';

export class MissionService {
  /**
   * Gets today's pending/in-progress mission or generates the next sequential mission from the roadmap.
   * Performs stale data reconciliation if an existing active mission belongs to a different subject track.
   */
  static async getTodayMission(userId: string): Promise<MissionState> {
    // Fetch profile preferredSubjects
    const profile = await prisma.learningProfile.findUnique({
      where: { userId },
      select: { preferredSubjects: true },
    });

    const preferredSubjects = profile?.preferredSubjects || [];
    const primarySubjectKey = getPrimarySubject(preferredSubjects);

    // 1. Check if user already has an active, incomplete mission (PENDING or IN_PROGRESS)
    let activeMission: any = await prisma.mission.findFirst({
      where: {
        userId,
        status: { in: ['PENDING', 'IN_PROGRESS'] },
      },
      include: {
        lessons: { orderBy: { order: 'asc' } },
        practices: { orderBy: { order: 'asc' } },
        missionProgress: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (activeMission) {
      const hasOldDisconnectedContent =
        activeMission.title === 'Daily Microlearning Mission' ||
        activeMission.practices[0]?.question.includes('typeof 42');

      const isSubjectMismatch =
        primarySubjectKey && activeMission.subjectKey && activeMission.subjectKey !== primarySubjectKey;

      if (hasOldDisconnectedContent || isSubjectMismatch) {
        await prisma.mission.delete({ where: { id: activeMission.id } });
        activeMission = null;
      }
    }

    // 2. If no incomplete mission exists, generate the next daily mission in sequence
    if (!activeMission) {
      activeMission = await MissionGenerator.generateDailyMission(userId);
    }

    if (!activeMission) {
      throw new Error('Failed to generate daily mission.');
    }

    if (activeMission.status === 'PENDING') {
      // Mark as started
      activeMission = await prisma.mission.update({
        where: { id: activeMission.id },
        data: { status: 'IN_PROGRESS' },
        include: {
          lessons: { orderBy: { order: 'asc' } },
          practices: { orderBy: { order: 'asc' } },
          missionProgress: true,
        },
      });

      await prisma.learningEvent.create({
        data: {
          userId,
          eventType: LearningEventType.LESSON_STARTED,
          source: 'MISSION_ENGINE',
          metadata: { missionId: activeMission.id },
        },
      });
    }

    return {
      mission: activeMission,
      lessons: activeMission.lessons,
      practices: activeMission.practices,
      progress: activeMission.missionProgress,
    };
  }

  /**
   * Completes a mission and updates XP, streaks, and concept mastery.
   */
  static async completeMission(userId: string, missionId: string, payload: CompletionPayload) {
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
      include: { practices: true, missionProgress: true }
    });

    if (!mission || mission.userId !== userId) {
      throw new Error('Mission not found');
    }

    if (mission.status === 'COMPLETED') {
      return { success: true, xpAwarded: mission.xpAwarded || 50, alreadyCompleted: true };
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
          upsert: {
            create: {
              reflectionNotes: payload.reflectionNotes || '',
              confidenceRating: payload.confidenceRating || 5,
              timeSpentSeconds: payload.timeSpentSeconds || 180
            },
            update: {
              reflectionNotes: payload.reflectionNotes || '',
              confidenceRating: payload.confidenceRating || 5,
              timeSpentSeconds: payload.timeSpentSeconds || 180
            }
          }
        }
      }
    });

    // 3. Update Concept Mastery for the mission topic to record evidence of real learning
    const profile = await prisma.learningProfile.findUnique({
      where: { userId },
      select: { preferredSubjects: true },
    });

    const subjectCurriculum = getSubjectCurriculum(profile?.preferredSubjects);
    const categoryLabel = subjectCurriculum ? subjectCurriculum.label : 'General';
    const topicName = (mission.content as any)?.topic || mission.title;
    try {
      let concept = await prisma.concept.findFirst({
        where: {
          OR: [
            { name: { contains: topicName, mode: 'insensitive' } },
            { slug: { contains: topicName.toLowerCase().replace(/\s+/g, '-'), mode: 'insensitive' } }
          ]
        }
      });

      if (!concept) {
        concept = await prisma.concept.create({
          data: {
            name: topicName,
            slug: topicName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            description: `Concept mastery for ${topicName}`,
            category: categoryLabel,
            difficulty: 'BEGINNER'
          }
        });
      }

      if (concept) {
        const existingMastery = await prisma.conceptMastery.findUnique({
          where: {
            userId_conceptId: {
              userId,
              conceptId: concept.id
            }
          }
        });

        if (existingMastery) {
          await prisma.conceptMastery.update({
            where: { id: existingMastery.id },
            data: {
              masteryScore: Math.min(1.0, existingMastery.masteryScore + 0.3),
              masteryLevel: MasteryLevel.FAMILIAR,
              confidenceScore: Math.max(existingMastery.confidenceScore, 0.8),
              attempts: { increment: 1 },
              lastPracticed: new Date(),
              lastReviewedAt: new Date()
            }
          });
        } else {
          await prisma.conceptMastery.create({
            data: {
              userId,
              conceptId: concept.id,
              masteryScore: 0.8,
              masteryLevel: MasteryLevel.FAMILIAR,
              confidenceScore: 0.85,
              attempts: 1,
              lastPracticed: new Date(),
              lastReviewedAt: new Date()
            }
          });
        }

        // If this concept was in WeakConcepts, resolve or remove it
        await prisma.weakConcept.deleteMany({
          where: {
            userId,
            conceptId: concept.id
          }
        });
      }
    } catch (conceptErr) {
      console.warn('Could not update concept mastery:', conceptErr);
    }

    // 4. Create Learning Event
    await prisma.learningEvent.create({
      data: {
        userId,
        eventType: LearningEventType.MISSION_COMPLETED,
        source: 'MISSION_ENGINE',
        metadata: { missionId, xpAwarded: xpToAward, topic: topicName }
      }
    });

    return { success: true, xpAwarded: xpToAward };
  }
}
