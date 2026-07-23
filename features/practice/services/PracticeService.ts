import prisma from '@/lib/prisma';
import { logger } from '@/utils/logger';
import { AppError } from '@/lib/errors';
import { KnowledgeStateEngine } from '@/services/intelligence/knowledge/updateKnowledgeState';

export interface PracticeSubmission {
  userId: string;
  problemId: string;
  status: string;
  runtime?: string;
  memory?: string;
  runtimeBeats?: number;
  memoryBeats?: number;
  conceptSlugs: string[];
}

export const practiceService = {
  /**
   * Processes a practice submission.
   * Logs the attempt and triggers the global KnowledgeStateEngine to handle the intelligence.
   */
  async submitPractice(data: PracticeSubmission) {
    logger.info(`Processing practice submission for user ${data.userId}, problem ${data.problemId}`);

    // 1. Create the Practice Attempt
    const attempt = await prisma.practiceAttempt.create({
      data: {
        userId: data.userId,
        problemId: data.problemId,
        status: data.status,
        runtime: data.runtime,
        memory: data.memory,
        runtimeBeats: data.runtimeBeats,
        memoryBeats: data.memoryBeats,
        concepts: data.conceptSlugs
      }
    });

    // 2. Ensure ConceptMastery records exist for all practiced concepts
    // (This guarantees that if they practice something new, it appears in their Mastery list)
    const dbConcepts = await prisma.concept.findMany({
      where: { slug: { in: data.conceptSlugs } }
    });

    if (dbConcepts.length > 0) {
      const now = new Date();
      for (const concept of dbConcepts) {
        await prisma.conceptMastery.upsert({
          where: {
            userId_conceptId: { userId: data.userId, conceptId: concept.id }
          },
          update: {
            attempts: { increment: 1 },
            lastPracticed: now
          },
          create: {
            userId: data.userId,
            conceptId: concept.id,
            masteryScore: 0.1, // starting baseline for a newly practiced concept
            confidenceScore: 10,
            attempts: 1,
            lastPracticed: now
          }
        });
      }
    }

    // 3. Delegate ALL intelligence recalculations to the single source of truth
    await KnowledgeStateEngine.updateKnowledgeState(data.userId);

    return attempt;
  }
};
