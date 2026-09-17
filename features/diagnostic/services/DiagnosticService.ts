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
import { getAllDiagnosticQuestions, getSubjectCurriculum, getPrimarySubject } from '@/lib/learning/curriculum/subjectCurriculum';
import { AdaptiveEngine } from './AdaptiveEngine';
import { ScoringEngine } from './ScoringEngine';
import { ResultEngine } from './ResultEngine';
import { KnowledgeStateEngine } from '@/services/intelligence/knowledge/updateKnowledgeState';
import { analyzeDiagnosticLearningSignal } from '@/services/intelligence/diagnosticGeminiService';

export const diagnosticService = {
  /**
   * Retrieves the current diagnostic lock status and retake eligibility for a student.
   * Checks status against the student's active onboarding subject.
   */
  async getDiagnosticStatus(userId: string): Promise<DiagnosticStatusResponse> {
    const profile = await prisma.learningProfile.findUnique({
      where: { userId }
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

    const activeSubjectKey = getPrimarySubject(profile.preferredSubjects);

    // Look for attempt associated with current active subject track
    const activeAttempt = await prisma.diagnosticAttempt.findFirst({
      where: {
        userId,
        completedAt: null,
        ...(activeSubjectKey ? { subjectKey: activeSubjectKey } : {})
      },
      orderBy: { startedAt: 'desc' }
    });

    const completedSubjectAttempt = await prisma.diagnosticAttempt.findFirst({
      where: {
        userId,
        completedAt: { not: null },
        ...(activeSubjectKey ? { subjectKey: activeSubjectKey } : {})
      },
      orderBy: { completedAt: 'desc' }
    });

    const isSubjectCompleted = Boolean(completedSubjectAttempt);

    return {
      status: isSubjectCompleted ? DiagnosticStatus.LOCKED : (profile.diagnosticStatus || DiagnosticStatus.PENDING),
      completedAt: completedSubjectAttempt?.completedAt || profile.completedAt,
      attemptNumber: profile.attemptNumber || 0,
      canRetake: !isSubjectCompleted,
      activeAttemptId: activeAttempt?.id || null
    };
  },

  /**
   * Returns the last completed diagnostic result summary for the user's locked attempt.
   */
  async getDiagnosticResult(userId: string): Promise<DiagnosticResultSummary | null> {
    const profile = await prisma.learningProfile.findUnique({
      where: { userId },
      select: { preferredSubjects: true }
    });

    const activeSubjectKey = getPrimarySubject(profile?.preferredSubjects);

    const lastCompletedAttempt = await prisma.diagnosticAttempt.findFirst({
      where: {
        userId,
        completedAt: { not: null },
        ...(activeSubjectKey ? { subjectKey: activeSubjectKey } : {})
      },
      include: { responses: true },
      orderBy: { completedAt: 'desc' }
    });

    if (!lastCompletedAttempt || lastCompletedAttempt.responses.length === 0) {
      return null;
    }

    const subjectKey = lastCompletedAttempt.subjectKey || activeSubjectKey || 'dsa';
    const summary = ScoringEngine.evaluateAttempt(
      lastCompletedAttempt.id,
      lastCompletedAttempt.responses,
      [subjectKey]
    );

    // Provide Gemini signal analysis or fallback for returned result
    const geminiAnalysis = await analyzeDiagnosticLearningSignal({
      subjectKey: summary.subjectKey || subjectKey,
      subjectLabel: summary.subjectLabel || 'General',
      conceptEvidence: summary.conceptEvidence,
      recommendedStartConcept: summary.recommendedStartConcept,
      recommendedStartTitle: summary.recommendedStartTitle,
      score: summary.score,
      totalQuestions: summary.totalQuestions,
      correctCount: summary.correctCount,
    });

    summary.geminiAnalysis = geminiAnalysis;
    summary.aiExplanation = geminiAnalysis.explanation;
    summary.isFallback = geminiAnalysis.isFallback;

    return ResultEngine.formatResultAnalysis(summary);
  },

  /**
   * Starts a new adaptive diagnostic attempt and LOCKS subjectKey on the DiagnosticAttempt record.
   */
  async startDiagnostic(userId: string) {
    logger.info(`Starting adaptive diagnostic for user ${userId}`);

    let profile = await prisma.learningProfile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await prisma.learningProfile.create({ data: { userId } });
    }

    const primarySubject = getPrimarySubject(profile.preferredSubjects);
    if (!primarySubject) {
      throw new AppError('No learning subject selected. Choose a subject during onboarding.', 'INVALID_STATE', 400);
    }

    // Check lock status for this specific subject track
    const completedAttemptForSubject = await prisma.diagnosticAttempt.findFirst({
      where: { userId, completedAt: { not: null }, subjectKey: primarySubject }
    });

    if (completedAttemptForSubject) {
      throw new AppError(`Diagnostic assessment for subject ${primarySubject} is already completed.`, 'LOCKED', 403);
    }

    // Reuse existing active attempt for this subject if available, or create a new one locked to primarySubject
    let attempt = await prisma.diagnosticAttempt.findFirst({
      where: { userId, completedAt: null, subjectKey: primarySubject },
      orderBy: { startedAt: 'desc' }
    });

    if (!attempt) {
      attempt = await prisma.diagnosticAttempt.create({
        data: {
          userId,
          subjectKey: primarySubject
        }
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
        source: 'System',
        metadata: { subjectKey: primarySubject, attemptId: attempt.id }
      }
    });

    // Generate Question Sequence explicitly using locked subject
    const initialQuestions = AdaptiveEngine.generateQuestionSequence([primarySubject]);

    return {
      attemptId: attempt.id,
      subjectKey: primarySubject,
      questions: initialQuestions,
      status: DiagnosticStatus.IN_PROGRESS
    };
  },

  /**
   * Submits an answer for a diagnostic question. Reads subjectKey directly from attempt.
   */
  async submitAnswer(attemptId: string, answer: DiagnosticAnswerPayload, userId: string) {
    const startTime = Date.now();
    logger.debug(`Submitting answer for attempt ${attemptId}, question ${answer.questionId}`);

    const attempt = await prisma.diagnosticAttempt.findUnique({
      where: { id: attemptId },
      select: { id: true, userId: true, subjectKey: true, completedAt: true, responses: { select: { id: true, questionId: true } } }
    });

    if (!attempt || attempt.userId !== userId) {
      throw new AppError('Attempt not found or unauthorized', 'UNAUTHORIZED', 403);
    }

    if (attempt.completedAt !== null) {
      throw new AppError('Attempt is already completed and locked', 'INVALID_STATE', 400);
    }

    // Read subjectKey locked on the attempt record
    const subjectKey = attempt.subjectKey || 'dsa';
    const curr = getSubjectCurriculum([subjectKey]);
    const allQuestions = curr?.diagnosticQuestions || [...diagnosticQuestions, ...getAllDiagnosticQuestions()];
    const question = (allQuestions as any[]).find(q => q.id === answer.questionId);
    if (!question) {
      throw new AppError('Question not found in question bank for this attempt subject', 'NOT_FOUND', 404);
    }

    const isCorrect = answer.selectedAnswer === question.correctAnswer;
    const conceptKey = question.conceptKey || question.concept.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Check if response already submitted for this question in this attempt
    const existingResp = attempt.responses.find(r => r.questionId === answer.questionId);
    if (existingResp) {
      await prisma.diagnosticResponse.update({
        where: { id: existingResp.id },
        data: {
          conceptKey,
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
          conceptKey,
          selectedAnswer: answer.selectedAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect,
          timeTaken: answer.timeTaken || 30
        }
      });
    }

    const responseCount = await prisma.diagnosticResponse.count({
      where: { attemptId }
    });

    const totalSubjectQuestions = allQuestions.length || 8;
    const progress = Math.min(Math.round((responseCount / totalSubjectQuestions) * 100), 100);

    logger.info(`[PERF] submitAnswer took ${Date.now() - startTime}ms`);

    return {
      progress,
      isCorrect,
      responseCount,
      isCompleted: responseCount >= totalSubjectQuestions
    };
  },

  /**
   * Finishes the diagnostic attempt using attempt.subjectKey.
   * Updates LearningProfile, updates KnowledgeState & Snapshots.
   * Runs Gemini interpretation service over deterministic evidence.
   */
  async finishDiagnostic(attemptId: string, userId: string) {
    const startTime = Date.now();
    logger.info(`Finishing diagnostic assessment for attempt ${attemptId}`);

    const attempt = await prisma.diagnosticAttempt.findUnique({
      where: { id: attemptId },
      include: { responses: true }
    });

    if (!attempt || attempt.userId !== userId) {
      throw new AppError('Attempt not found or unauthorized', 'UNAUTHORIZED', 403);
    }

    const lockedSubjectKey = attempt.subjectKey || 'dsa';

    if (attempt.completedAt !== null) {
      const existingSummary = ScoringEngine.evaluateAttempt(attemptId, attempt.responses, [lockedSubjectKey]);
      const geminiAnalysis = await analyzeDiagnosticLearningSignal({
        subjectKey: existingSummary.subjectKey || lockedSubjectKey,
        subjectLabel: existingSummary.subjectLabel || 'General',
        conceptEvidence: existingSummary.conceptEvidence,
        recommendedStartConcept: existingSummary.recommendedStartConcept,
        recommendedStartTitle: existingSummary.recommendedStartTitle,
        score: existingSummary.score,
        totalQuestions: existingSummary.totalQuestions,
        correctCount: existingSummary.correctCount,
      });
      existingSummary.geminiAnalysis = geminiAnalysis;
      existingSummary.aiExplanation = geminiAnalysis.explanation;
      existingSummary.isFallback = geminiAnalysis.isFallback;
      return ResultEngine.formatResultAnalysis(existingSummary);
    }

    // 1. Evaluate Attempt using attempt.subjectKey deterministically (1ms)
    const summary = ScoringEngine.evaluateAttempt(attemptId, attempt.responses, [lockedSubjectKey]);

    // 2. Concurrently run Gemini learning signal analysis AND DB concept seeding in parallel!
    const curr = getSubjectCurriculum([lockedSubjectKey]);
    const subjectQuestions = curr?.diagnosticQuestions || [...diagnosticQuestions, ...getAllDiagnosticQuestions()];

    const uniqueConceptsMap = new Map<string, string>();
    for (const dq of subjectQuestions) {
      uniqueConceptsMap.set(dq.concept, (dq as any).category || curr?.label || 'General');
    }

    const geminiPromise = analyzeDiagnosticLearningSignal({
      subjectKey: summary.subjectKey || lockedSubjectKey,
      subjectLabel: summary.subjectLabel || 'General',
      conceptEvidence: summary.conceptEvidence,
      recommendedStartConcept: summary.recommendedStartConcept,
      recommendedStartTitle: summary.recommendedStartTitle,
      score: summary.score,
      totalQuestions: summary.totalQuestions,
      correctCount: summary.correctCount,
    });

    const conceptSeedPromise = (async () => {
      const existingConcepts = await prisma.concept.findMany({
        where: { subjectKey: lockedSubjectKey },
        select: { name: true }
      });
      const existingNames = new Set(existingConcepts.map(c => c.name));

      const newConceptsData = [];
      for (const [name, category] of uniqueConceptsMap.entries()) {
        if (!existingNames.has(name)) {
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          newConceptsData.push({
            subjectKey: lockedSubjectKey,
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

      return prisma.concept.findMany({
        where: { subjectKey: lockedSubjectKey }
      });
    })();

    const [geminiAnalysis, allDbConcepts] = await Promise.all([geminiPromise, conceptSeedPromise]);

    summary.geminiAnalysis = geminiAnalysis;
    summary.aiExplanation = geminiAnalysis.explanation;
    summary.isFallback = geminiAnalysis.isFallback;

    // Snapshot analysis payload for persistent historical record
    const analysisSnapshot = {
      strengths: summary.strongConcepts.map(s => s.concept),
      developing: summary.weakConcepts.filter(w => w.severity !== 'CRITICAL').map(w => w.concept),
      needsWork: summary.weakConcepts.filter(w => w.severity === 'CRITICAL').map(w => w.concept),
      notAssessed: (summary.notAssessedConcepts || []).map(n => n.concept),
      recommendedStart: summary.recommendedStartConcept,
      gemini: {
        rationale: geminiAnalysis.startingPointRationale,
        isFallback: geminiAnalysis.isFallback
      }
    };

    // Classification mapping
    let learningLevel: LearningLevel = LearningLevel.BEGINNER;
    if (summary.score >= 45 && summary.score < 75) {
      learningLevel = LearningLevel.INTERMEDIATE;
    } else if (summary.score >= 75) {
      learningLevel = LearningLevel.ADVANCED;
    }

    // 4. Transactional update for attempt, profile lock & masteries (EXCLUSIVELY assessed concepts)
    await prisma.$transaction(
      async (tx) => {
        await tx.diagnosticAttempt.update({
          where: { id: attemptId },
          data: {
            score: summary.score,
            subjectKey: lockedSubjectKey,
            recommendedStartConcept: summary.recommendedStartConcept,
            diagnosticVersion: "1.0",
            analysis: analysisSnapshot as any,
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

        // Clear existing concept masteries for clean baseline reset
        await tx.conceptMastery.deleteMany({
          where: {
            userId,
            concept: { subjectKey: lockedSubjectKey }
          }
        });

        // Create masteries ONLY for assessed concepts
        const answeredQuestionIds = attempt.responses.map(r => r.questionId);
        const assessedConceptNames = new Set(
          subjectQuestions
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

        if (masteriesToCreate.length > 0) {
          await tx.conceptMastery.createMany({
            data: masteriesToCreate,
            skipDuplicates: true
          });
        }

        // Record Baseline Diagnostic Learning Event
        await tx.learningEvent.create({
          data: {
            userId,
            eventType: LearningEventType.DIAGNOSTIC_COMPLETED,
            title: 'BASELINE_DIAGNOSTIC',
            source: 'System',
            metadata: {
              subjectKey: lockedSubjectKey,
              conceptKey: summary.recommendedStartConcept,
              source: 'diagnostic',
              score: summary.score,
              recommendedStart: summary.recommendedStartConcept,
              geminiUsed: !geminiAnalysis.isFallback
            }
          }
        });
      },
      { timeout: 15000 }
    );

    // 5. Persist KnowledgeState & Snapshots
    await KnowledgeStateEngine.updateKnowledgeState(userId, summary);

    logger.info(`[PERF] finishDiagnostic total execution time: ${Date.now() - startTime}ms`);

    return ResultEngine.formatResultAnalysis(summary);
  }
};
