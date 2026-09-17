import prisma from '@/lib/prisma';
import { MissionStage } from '../types';

export class MissionStateMachine {
  /**
   * Advances the mission to the specified stage, verifying transitions.
   */
  static async advanceToStage(missionId: string, nextStage: MissionStage) {
    const progress = await prisma.missionProgress.findUnique({
      where: { missionId }
    });

    if (!progress) {
      throw new Error('Mission progress not found');
    }

    if (progress.currentStage === nextStage) {
      return progress;
    }

    // Flexible transition logic supporting the 4-step sequence:
    // LEARN -> PRACTICE -> REVIEW -> INTERVIEW -> COMPLETED
    const validTransitions: Record<string, string[]> = {
      'LEARN': ['PRACTICE', 'REVIEW', 'INTERVIEW', 'COMPLETED'],
      'LESSON': ['PRACTICE', 'REVIEW', 'INTERVIEW', 'COMPLETED'],
      'PRACTICE': ['REVIEW', 'INTERVIEW', 'COMPLETED'],
      'REVIEW': ['INTERVIEW', 'COMPLETED'],
      'REFLECTION': ['INTERVIEW', 'COMPLETED'],
      'INTERVIEW': ['COMPLETED'],
      'COMPLETED': []
    };

    const current = progress.currentStage;
    if (current !== nextStage && !validTransitions[current]?.includes(nextStage)) {
      console.warn(`Non-standard state transition from ${current} to ${nextStage}`);
    }

    // Map stage to numeric mission progress percentage
    let progressPercent = 0;
    if (nextStage === 'PRACTICE') progressPercent = 25;
    else if (nextStage === 'REVIEW') progressPercent = 50;
    else if (nextStage === 'INTERVIEW') progressPercent = 75;
    else if (nextStage === 'COMPLETED') progressPercent = 100;

    const [updatedMission, updatedProgress] = await Promise.all([
      prisma.mission.update({
        where: { id: missionId },
        data: {
          progress: progressPercent,
          ...(nextStage === 'COMPLETED' ? { status: 'COMPLETED', completedAt: new Date() } : {})
        }
      }),
      prisma.missionProgress.update({
        where: { missionId },
        data: {
          currentStage: nextStage,
          lastInteractedAt: new Date()
        }
      })
    ]);

    return updatedProgress;
  }

  static async markLessonCompleted(missionId: string, lessonId: string) {
    const progress = await prisma.missionProgress.findUnique({ where: { missionId } });
    if (!progress) throw new Error('Progress not found');

    const completedLessonIds = new Set(progress.completedLessonIds);
    completedLessonIds.add(lessonId);

    return prisma.missionProgress.update({
      where: { missionId },
      data: {
        completedLessonIds: Array.from(completedLessonIds),
        lastInteractedAt: new Date()
      }
    });
  }

  static async markPracticeCompleted(missionId: string, practiceId: string) {
    const progress = await prisma.missionProgress.findUnique({ where: { missionId } });
    if (!progress) throw new Error('Progress not found');

    const completedPracticeIds = new Set(progress.completedPracticeIds);
    completedPracticeIds.add(practiceId);

    return prisma.missionProgress.update({
      where: { missionId },
      data: {
        completedPracticeIds: Array.from(completedPracticeIds),
        lastInteractedAt: new Date()
      }
    });
  }
}
