import prisma from '@/lib/prisma';
import { RecommendationResult } from '../types';
import { RoadmapDifficulty, MissionType } from '@prisma/client';

export class RecommendationEngine {
  /**
   * Generates a recommendation for the next mission based on the user's learning profile
   * and concept masteries.
   */
  static async recommendNextMission(userId: string): Promise<RecommendationResult> {
    const profile = await prisma.learningProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Learning profile not found');
    }

    // 1. Check for weak concepts (MasteryLevel = NOVICE or low masteryScore)
    const weakConcepts = await prisma.conceptMastery.findMany({
      where: {
        userId,
        masteryLevel: 'NOVICE',
      },
      include: {
        concept: true,
      },
      orderBy: {
        masteryScore: 'asc',
      },
      take: 1,
    });

    if (weakConcepts.length > 0) {
      const target = weakConcepts[0];
      return {
        priorityScore: 90,
        adaptiveDifficulty: target.concept.difficulty || RoadmapDifficulty.BEGINNER,
        estimatedMinutes: target.concept.estimatedMinutes || 15,
        confidence: 0.85,
        reason: `Focusing on ${target.concept.name} to strengthen your foundational understanding.`,
      };
    }

    // 2. Default recommendation if no weak concepts are found
    return {
      priorityScore: 50,
      adaptiveDifficulty: profile.preferredDifficulty || RoadmapDifficulty.BEGINNER,
      estimatedMinutes: 20,
      confidence: 0.6,
      reason: 'Continuing your standard learning path based on your preferred difficulty.',
    };
  }
}
