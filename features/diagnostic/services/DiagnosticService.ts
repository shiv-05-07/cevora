import prisma from '@/lib/prisma';
import { logger } from '@/utils/logger';
import { AppError } from '@/lib/errors';
import { 
  LearningEventType, 
  LearningLevel, 
  MasteryLevel, 
  RoadmapDifficulty, 
  DiagnosticStatus 
} from '@prisma/client';
import { 
  DiagnosticAnswerPayload, 
  DiagnosticStatusResponse, 
  DiagnosticResultSummary 
} from '../types';
import { diagnosticQuestions } from '../data/diagnosticQuestions';
import { AdaptiveEngine } from './AdaptiveEngine';
import { ScoringEngine } from './ScoringEngine';
import { ResultEngine } from './ResultEngine';
import { KnowledgeStateEngine } from '@/services/intelligence/knowledge/updateKnowledgeState';

export const diagnosticService = {
  /**
   * Retrieves the current diagnostic lock status and retake eligibility for a student.
   */
  async getDiagnosticStatus(userId: string): Promise<DiagnosticStatusResponse> {
    const profile = await prisma.learningProfile.findUnique({
      where: { userId }
    });

    const activeAttempt = await prisma.diagnosticAttempt.findFirst({
      where: { userId, completedAt: null },
      orderBy: { startedAt: 'desc' }
    });

    if (!profile) {
      return {
        status: DiagnosticStatus.PENDING,
        completedAt: null,
        attemptNumber: 0,
        canRetake: true,
        activeAttemptId: null
      };
    }

    return {
      status: profile.diagnosticStatus || (profile.diagnosticCompleted ? DiagnosticStatus.LOCKED : DiagnosticStatus.PENDING),
      completedAt: profile.completedAt,
      attemptNumber: profile.attemptNumber || 0,
      canRetake: profile.diagnosticStatus === DiagnosticStatus.PENDING,
      activeAttemptId: activeAttempt?.id || null
    };
  },

  /**
   * Returns the last completed diagnostic result summary for the user.
   */
  async getDiagnosticResult(userId: string): Promise<DiagnosticResultSummary | null> {
    const lastCompletedAttempt = await prisma.diagnosticAttempt.findFirst({
      where: { userId, completedAt: { not: null } },
      include: { responses: true },
      orderBy: { completedAt: 'desc' }
    });

    if (!lastCompletedAttempt || lastCompletedAttempt.responses.length === 0) {
      return null;
    }

    const summary = ScoringEngine.evaluateAttempt(lastCompletedAttempt.id, lastCompletedAttempt.responses);
    return ResultEngine.formatResultAnalysis(summary);
  },

  /**
   * Starts a new adaptive diagnostic attempt.
   */
  async startDiagnostic(userId: string) {
    logger.info(`Starting adaptive diagnostic for user ${userId}`);
    
    // Check lock status
    const statusInfo = await this.getDiagnosticStatus(userId);
    if (statusInfo.status === DiagnosticStatus.LOCKED && statusInfo.completedAt) {
      throw new AppError('Diagnostic assessment is locked and already completed.', 'LOCKED', 403);
    }

    // Check or create profile
    let profile = await prisma.learningProfile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await prisma.learningProfile.create({ data: { userId } });
    }

    // Reuse existing active attempt if available
    let attempt = await prisma.diagnosticAttempt.findFirst({
      where: { userId, completedAt: null },
      orderBy: { startedAt: 'desc' }
    });

    if (!attempt) {
      attempt = await prisma.diagnosticAttempt.create({
        data: { userId }
      });
    }

    // Update profile status to IN_PROGRESS
    await prisma.learningProfile.update({
      where: { userId },
      data: { diagnosticStatus: DiagnosticStatus.IN_PROGRESS }
    });

    // Record Learning Event
    await prisma.learningEvent.create({
      data: {
        userId,
        eventType: LearningEventType.QUIZ_TAKEN,
        title: 'Diagnostic Started',
        source: 'System'
      }
    });

    // Generate Randomized Adaptive Question Sequence
    const initialQuestions = AdaptiveEngine.generateQuestionSequence();

    return { 
      attemptId: attempt.id,
      questions: initialQuestions,
      status: DiagnosticStatus.IN_PROGRESS
    };
  },

  /**
   * Submits an answer for a diagnostic question with category-aware adaptivity.
   */
  async submitAnswer(attemptId: string, answer: DiagnosticAnswerPayload, userId: string) {
    logger.debug(`Submitting answer for attempt ${attemptId}, question ${answer.questionId}`);
    
    const attempt = await prisma.diagnosticAttempt.findUnique({
      where: { id: attemptId },
      include: { responses: true }
    });

    if (!attempt || attempt.userId !== userId) {
      throw new AppError('Attempt not found or unauthorized', 'UNAUTHORIZED', 403);
    }

    if (attempt.completedAt !== null) {
      throw new AppError('Attempt is already completed and locked', 'INVALID_STATE', 400);
    }

    const question = diagnosticQuestions.find(q => q.id === answer.questionId);
    if (!question) {
      throw new AppError('Question not found in question bank', 'NOT_FOUND', 404);
    }

    const isCorrect = answer.selectedAnswer === question.correctAnswer;

    // Check if response already submitted for this question in this attempt
    const existingResp = attempt.responses.find(r => r.questionId === answer.questionId);
    if (existingResp) {
      await prisma.diagnosticResponse.update({
        where: { id: existingResp.id },
        data: {
          selectedAnswer: answer.selectedAnswer,
          isCorrect,
          timeTaken: answer.timeTaken || 30
        }
      });
    } else {
      await prisma.diagnosticResponse.create({
        data: {
          attemptId,
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect,
          timeTaken: answer.timeTaken || 30
        }
      });
    }

    const updatedResponses = await prisma.diagnosticResponse.findMany({
      where: { attemptId }
    });

    const responseCount = updatedResponses.length;
    const progress = Math.min(Math.round((responseCount / 15) * 100), 100);

    return { 
      progress, 
      isCorrect,
      responseCount,
      isCompleted: responseCount >= 15
    };
  },

  /**
   * Finishes the diagnostic attempt, updates LearningProfile, updates KnowledgeState & Snapshots.
   */
  async finishDiagnostic(attemptId: string, userId: string) {
    logger.info(`Finishing diagnostic assessment for attempt ${attemptId}`);

    const attempt = await prisma.diagnosticAttempt.findUnique({
      where: { id: attemptId },
      include: { responses: true }
    });

    if (!attempt || attempt.userId !== userId) {
      throw new AppError('Attempt not found or unauthorized', 'UNAUTHORIZED', 403);
    }

    if (attempt.completedAt !== null) {
      const existingSummary = ScoringEngine.evaluateAttempt(attemptId, attempt.responses);
      return ResultEngine.formatResultAnalysis(existingSummary);
    }

    // Evaluate Attempt with Scoring Engine
    const summary = ScoringEngine.evaluateAttempt(attemptId, attempt.responses);

    // Classification mapping
    let learningLevel: LearningLevel = LearningLevel.BEGINNER;
    if (summary.score >= 45 && summary.score < 75) {
      learningLevel = LearningLevel.INTERMEDIATE;
    } else if (summary.score >= 75) {
      learningLevel = LearningLevel.ADVANCED;
    }

    // 1. Efficient Bulk Seed Concepts (1 query instead of 135)
    const uniqueConceptsMap = new Map<string, string>();
    for (const dq of diagnosticQuestions) {
      uniqueConceptsMap.set(dq.concept, dq.category);
    }

    const existingConcepts = await prisma.concept.findMany({ select: { name: true } });
    const existingNames = new Set(existingConcepts.map(c => c.name));

    const newConceptsData = [];
    for (const [name, category] of uniqueConceptsMap.entries()) {
      if (!existingNames.has(name)) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        newConceptsData.push({
          name,
          slug,
          category,
          difficulty: RoadmapDifficulty.BEGINNER
        });
      }
    }

    if (newConceptsData.length > 0) {
      await prisma.concept.createMany({
        data: newConceptsData,
        skipDuplicates: true
      });
    }

    const allDbConcepts = await prisma.concept.findMany();

    // 2. High-performance Transactional update for attempt, profile lock & masteries
    await prisma.$transaction(
      async (tx) => {
        await tx.diagnosticAttempt.update({
          where: { id: attemptId },
          data: {
            score: summary.score,
            completedAt: new Date()
          }
        });

        await tx.learningProfile.update({
          where: { userId },
          data: {
            learningLevel,
            diagnosticCompleted: true,
            diagnosticStatus: DiagnosticStatus.LOCKED,
            completedAt: new Date(),
            attemptNumber: { increment: 1 }
          }
        });

        // Delete existing concept masteries for this user to ensure clean diagnostic baseline update
        await tx.conceptMastery.deleteMany({
          where: { userId }
        });

        // Bulk create masteries for ONLY the explicitly assessed concepts
        const answeredQuestionIds = attempt.responses.map(r => r.questionId);
        const assessedConceptNames = new Set(
          diagnosticQuestions
            .filter(q => answeredQuestionIds.includes(q.id))
            .map(q => q.concept)
        );
        const assessedDbConcepts = allDbConcepts.filter(c => assessedConceptNames.has(c.name));

        const categoryScoresMap = summary.categoryScores as Record<string, any>;
        const masteriesToCreate = assessedDbConcepts.map(dbConcept => {
          const catScore = (dbConcept.category ? categoryScoresMap[dbConcept.category] : null) || 
            Object.values(categoryScoresMap).find((cs: any) => cs.category?.toLowerCase() === dbConcept.name?.toLowerCase());

          const masteryScore = catScore ? catScore.score / 100 : (summary.score / 100);
          let masteryLevel: MasteryLevel = MasteryLevel.NOVICE;
          if (masteryScore >= 0.85) masteryLevel = MasteryLevel.MASTERED;
          else if (masteryScore >= 0.70) masteryLevel = MasteryLevel.PROFICIENT;
          else if (masteryScore >= 0.45) masteryLevel = MasteryLevel.FAMILIAR;

          return {
            userId,
            conceptId: dbConcept.id,
            masteryScore,
            masteryLevel,
            confidenceScore: summary.score,
            attempts: 1,
            lastPracticed: new Date()
          };
        });

        await tx.conceptMastery.createMany({
          data: masteriesToCreate,
          skipDuplicates: true
        });

        await tx.learningEvent.create({
          data: {
            userId,
            eventType: LearningEventType.DIAGNOSTIC_COMPLETED,
            title: 'Diagnostic Completed',
            source: 'System',
            metadata: { score: summary.score, placementReadiness: summary.placementReadiness }
          }
        });
      },
      { timeout: 30000 }
    );

    // 3. Persist KnowledgeState, SkillScores, WeakConcepts & KnowledgeSnapshots
    await KnowledgeStateEngine.updateKnowledgeState(userId, summary);

    return ResultEngine.formatResultAnalysis(summary);
  }
};
