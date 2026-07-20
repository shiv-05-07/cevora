import prisma from '@/lib/prisma';
import { logger } from '@/utils/logger';
import { AppError } from '@/lib/errors';
import { diagnosticQuestions } from '../data/diagnosticQuestions';
import { LearningEventType, LearningLevel, MasteryLevel, RoadmapDifficulty } from '@prisma/client';
import { DiagnosticAnswerPayload } from '../types';
import { learningProfileService } from '@/features/learning-profile/services/LearningProfileService';

const CONCEPTS = ['Variables', 'Loops', 'Arrays', 'Strings', 'Functions', 'Objects', 'Logic'];

export const diagnosticService = {
  /**
   * Starts a new diagnostic attempt.
   */
  async startDiagnostic(userId: string) {
    logger.info(`Starting diagnostic for user ${userId}`);
    
    // Create attempt
    const attempt = await prisma.diagnosticAttempt.create({
      data: {
        userId
      }
    });

    // Record Learning Event
    await prisma.learningEvent.create({
      data: {
        userId,
        eventType: LearningEventType.QUIZ_TAKEN, // mapped
        title: 'Diagnostic Started',
        source: 'System'
      }
    });

    return { attemptId: attempt.id };
  },

  /**
   * Submits an answer for a diagnostic question.
   */
  async submitAnswer(attemptId: string, answer: DiagnosticAnswerPayload, userId: string) {
    logger.debug(`Submitting answer for attempt ${attemptId}, question ${answer.questionId}`);
    
    const attempt = await prisma.diagnosticAttempt.findUnique({
      where: { id: attemptId }
    });

    if (!attempt || attempt.userId !== userId) {
      throw new AppError('Attempt not found or unauthorized', 'UNAUTHORIZED', 403);
    }

    if (attempt.completedAt !== null) {
      throw new AppError('Attempt is not in progress', 'INVALID_STATE', 400);
    }

    const question = diagnosticQuestions.find(q => q.id === answer.questionId);
    if (!question) {
      throw new AppError('Question not found', 'NOT_FOUND', 404);
    }

    const isCorrect = answer.selectedAnswer === question.correctAnswer;

    await prisma.diagnosticResponse.create({
      data: {
        attemptId,
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        timeTaken: answer.timeTaken
      }
    });

    // Calculate progress
    const responseCount = await prisma.diagnosticResponse.count({
      where: { attemptId }
    });
    
    const progress = Math.min((responseCount / diagnosticQuestions.length) * 100, 100);

    return { progress, isCorrect };
  },

  /**
   * Finishes the diagnostic attempt in a transaction.
   */
  async finishDiagnostic(attemptId: string, userId: string) {
    logger.info(`Finishing diagnostic for attempt ${attemptId}`);

    const attempt = await prisma.diagnosticAttempt.findUnique({
      where: { id: attemptId },
      include: { responses: true }
    });

    if (!attempt || attempt.userId !== userId) {
      throw new AppError('Attempt not found or unauthorized', 'UNAUTHORIZED', 403);
    }

    if (attempt.completedAt !== null) {
      throw new AppError('Attempt is not in progress', 'INVALID_STATE', 400);
    }

    // Calculate score
    const totalQuestions = diagnosticQuestions.length;
    const correctAnswers = attempt.responses.filter(r => r.isCorrect).length;
    const score = correctAnswers;
    const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    // Classification Engine (Deterministic)
    let learningLevel: LearningLevel = LearningLevel.BEGINNER;
    if (percentage >= 41 && percentage <= 75) {
      learningLevel = LearningLevel.INTERMEDIATE;
    } else if (percentage > 75) {
      learningLevel = LearningLevel.ADVANCED;
    }

    // Pre-create concepts if they don't exist to satisfy FK constraints
    for (const conceptName of CONCEPTS) {
      await prisma.concept.upsert({
        where: { name: conceptName },
        update: {},
        create: {
          name: conceptName,
          slug: conceptName.toLowerCase(),
          difficulty: RoadmapDifficulty.BEGINNER
        }
      });
    }

    const allConcepts = await prisma.concept.findMany({
      where: { name: { in: CONCEPTS } }
    });

    // Determine concept performance
    const conceptPerformance: Record<string, { total: number, correct: number }> = {};
    for (const c of CONCEPTS) {
      conceptPerformance[c] = { total: 0, correct: 0 };
    }

    attempt.responses.forEach(r => {
      const q = diagnosticQuestions.find(dq => dq.id === r.questionId);
      if (q && conceptPerformance[q.concept]) {
        conceptPerformance[q.concept].total += 1;
        if (r.isCorrect) conceptPerformance[q.concept].correct += 1;
      }
    });

    // Transactional updates
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update DiagnosticAttempt
      const updatedAttempt = await tx.diagnosticAttempt.update({
        where: { id: attemptId },
        data: {
          score: percentage,
          completedAt: new Date()
        }
      });

      // 2. Ensure profile exists and update it
      let profile = await tx.learningProfile.findUnique({ where: { userId } });
      if (!profile) {
        profile = await tx.learningProfile.create({ data: { userId } });
      }

      await tx.learningProfile.update({
        where: { userId },
        data: {
          learningLevel,
          diagnosticCompleted: true
        }
      });

      // 3. Initialize ConceptMastery
      for (const conceptName of CONCEPTS) {
        const perf = conceptPerformance[conceptName];
        const dbConcept = allConcepts.find(c => c.name === conceptName);
        
        if (dbConcept) {
          const masteryScore = perf.total > 0 ? perf.correct / perf.total : 0.0;
          let masteryLvl: MasteryLevel = MasteryLevel.NOVICE;
          if (masteryScore >= 0.5 && masteryScore < 0.8) masteryLvl = MasteryLevel.FAMILIAR;
          if (masteryScore >= 0.8 && masteryScore < 1.0) masteryLvl = MasteryLevel.PROFICIENT;
          if (masteryScore === 1.0) masteryLvl = MasteryLevel.MASTERED;

          await tx.conceptMastery.upsert({
            where: {
              userId_conceptId: { userId, conceptId: dbConcept.id }
            },
            update: {
              masteryScore,
              masteryLevel: masteryLvl,
              attempts: { increment: perf.total },
              lastPracticed: new Date()
            },
            create: {
              userId,
              conceptId: dbConcept.id,
              masteryScore,
              masteryLevel: masteryLvl,
              attempts: perf.total,
              lastPracticed: new Date()
            }
          });
        }
      }

      // 4. Create LearningEvents
      await tx.learningEvent.create({
        data: {
          userId,
          eventType: LearningEventType.DIAGNOSTIC_COMPLETED,
          title: 'Diagnostic Completed',
          source: 'System'
        }
      });

      await tx.learningEvent.create({
        data: {
          userId,
          eventType: LearningEventType.LESSON_COMPLETED, // mapped
          title: 'Learning Level Assigned',
          source: 'System',
          metadata: { level: learningLevel }
        }
      });

      return { score: percentage, learningLevel };
    });

    return {
      score,
      percentage: result.score,
      learningLevel: result.learningLevel
    };
  }
};
