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

    // Example simple transition logic
    // LESSON -> PRACTICE -> REFLECTION -> COMPLETED
    const validTransitions: Record<string, string[]> = {
      'LESSON': ['PRACTICE'],
      'PRACTICE': ['REFLECTION', 'COMPLETED'],
      'REFLECTION': ['COMPLETED'],
      'COMPLETED': []
    };

    if (!validTransitions[progress.currentStage]?.includes(nextStage)) {
      throw new Error(`Invalid state transition from ${progress.currentStage} to ${nextStage}`);
    }

    return prisma.missionProgress.update({
      where: { missionId },
      data: {
        currentStage: nextStage,
        lastInteractedAt: new Date()
      }
    });
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
