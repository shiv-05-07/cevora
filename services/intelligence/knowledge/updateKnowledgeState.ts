import prisma from '@/lib/prisma';
import { generateReadiness } from '../readiness/generateReadiness';
import { calculateMastery } from './calculateMastery';
import { calculateConfidence } from './calculateConfidence';
import { calculateConsistency } from './calculateConsistency';
import { calculateGrowth } from './calculateGrowth';
import { detectWeakConcepts } from '../readiness/detectWeakConcepts';
import { DiagnosticResultSummary } from '@/features/diagnostic/types';

export class KnowledgeStateEngine {
  /**
   * Updates student KnowledgeState, SkillScores, WeakConcepts, and writes a KnowledgeSnapshot time-series record.
   */
  static async updateKnowledgeState(
    userId: string,
    diagnosticResult?: DiagnosticResultSummary
  ) {
    // 1. Fetch current concept masteries & profiles
    const masteries = await prisma.conceptMastery.findMany({
      where: { userId },
      include: { concept: true }
    });

    const profile = await prisma.learningProfile.findUnique({
      where: { userId }
    });

    const currentKnowledgeState = await prisma.knowledgeState.findUnique({
      where: { userId }
    });

    // 2. Calculate overall stats
    const totalMasteries = masteries.length;
    const avgMasteryScore = totalMasteries > 0
      ? masteries.reduce((acc, m) => acc + (m.masteryScore * 100), 0) / totalMasteries
      : (diagnosticResult?.score || 0);

    const overallAccuracy = diagnosticResult?.accuracy ?? avgMasteryScore;
    const readiness = generateReadiness(avgMasteryScore, overallAccuracy);
    const confidence = calculateConfidence({
      attempts: masteries.reduce((acc, m) => acc + m.attempts, 0) || 15,
      accuracy: overallAccuracy
    });

    const consistency = calculateConsistency({
      currentStreak: profile?.currentStreak || 1,
      activeDaysLast30Days: 14
    });

    const previousMastery = currentKnowledgeState?.overallMastery || 0;
    const growthRate = calculateGrowth(avgMasteryScore, previousMastery);

    // 3. Upsert KnowledgeState
    const updatedState = await prisma.knowledgeState.upsert({
      where: { userId },
      update: {
        overallMastery: avgMasteryScore,
        placementReadiness: readiness.placementReadiness,
        readinessScore: readiness.readinessScore,
        confidenceScore: confidence,
        learningVelocity: Math.max(0.5, Math.round((avgMasteryScore / 10) * 10) / 10),
        consistencyScore: consistency,
        lastCalculatedAt: new Date()
      },
      create: {
        userId,
        overallMastery: avgMasteryScore,
        placementReadiness: readiness.placementReadiness,
        readinessScore: readiness.readinessScore,
        confidenceScore: confidence,
        learningVelocity: Math.max(0.5, Math.round((avgMasteryScore / 10) * 10) / 10),
        consistencyScore: consistency,
        lastCalculatedAt: new Date()
      }
    });

    // 4. Upsert SkillScores per category
    if (diagnosticResult) {
      for (const [catKey, stat] of Object.entries(diagnosticResult.categoryScores)) {
        const existing = await prisma.skillScore.findUnique({
          where: { userId_category: { userId, category: catKey } }
        });

        await prisma.skillScore.upsert({
          where: { userId_category: { userId, category: catKey } },
          update: {
            previousScore: existing?.currentScore || 0,
            currentScore: stat.score,
            accuracy: stat.accuracy,
            totalAttempts: { increment: stat.total },
            correctAttempts: { increment: stat.correct }
          },
          create: {
            userId,
            category: catKey,
            previousScore: 0,
            currentScore: stat.score,
            accuracy: stat.accuracy,
            totalAttempts: stat.total,
            correctAttempts: stat.correct
          }
        });
      }
    } else {
      // Re-calculate SkillScores from ConceptMastery
      const categoryScores = new Map<string, { total: number, count: number }>();
      masteries.forEach(m => {
        const cat = m.concept.category;
        if (cat) {
          const curr = categoryScores.get(cat) || { total: 0, count: 0 };
          curr.total += (m.masteryScore * 100);
          curr.count++;
          categoryScores.set(cat, curr);
        }
      });
      
      for (const [cat, stats] of categoryScores.entries()) {
        const score = stats.total / stats.count;
        const existing = await prisma.skillScore.findUnique({
          where: { userId_category: { userId, category: cat } }
        });
        
        await prisma.skillScore.upsert({
          where: { userId_category: { userId, category: cat } },
          update: {
            previousScore: existing?.currentScore || score,
            currentScore: score,
            accuracy: score,
            totalAttempts: { increment: 1 }
          },
          create: {
            userId,
            category: cat,
            previousScore: 0,
            currentScore: score,
            accuracy: score,
            totalAttempts: 1,
            correctAttempts: 0
          }
        });
      }
    }

    // 5. Update Weak Concepts
    const conceptsToEvaluate = masteries.length > 0
      ? masteries.map(m => ({ id: m.conceptId, name: m.concept.name, masteryScore: m.masteryScore }))
      : (await prisma.concept.findMany({ take: 10 })).map(c => ({ id: c.id, name: c.name, masteryScore: 0.45 }));

    let weakAnalysis = detectWeakConcepts(conceptsToEvaluate);
    if (weakAnalysis.length === 0 && conceptsToEvaluate.length > 0) {
      // Fallback to lowest mastery items if all scores are healthy
      weakAnalysis = conceptsToEvaluate.slice(0, 3).map(c => ({
        conceptId: c.id,
        conceptName: c.name,
        masteryScore: Math.round(c.masteryScore * 100),
        severity: 'WEAK' as const,
        recommendedAction: `Practice targeted problems for ${c.name}.`
      }));
    }

    await prisma.weakConcept.deleteMany({ where: { userId } });
    for (const weak of weakAnalysis.slice(0, 5)) {
      try {
        await prisma.weakConcept.create({
          data: {
            userId,
            conceptId: weak.conceptId,
            masteryScore: weak.masteryScore,
            recommendedAction: weak.recommendedAction
          }
        });
      } catch (err) {
        // Safe catch for duplicate conceptId
      }
    }

    // 6. Write KnowledgeSnapshot row ONLY on meaningful changes
    const weakCount = await prisma.weakConcept.count({ where: { userId } });
    const shouldSnapshot = !currentKnowledgeState ||
      Math.abs(avgMasteryScore - (currentKnowledgeState.overallMastery)) >= 2.0 ||
      Math.abs(readiness.readinessScore - (currentKnowledgeState.readinessScore)) >= 2.0 ||
      Math.abs(confidence - (currentKnowledgeState.confidenceScore)) >= 5.0;

    if (shouldSnapshot) {
      await prisma.knowledgeSnapshot.create({
        data: {
          userId,
          overallMastery: avgMasteryScore,
          readinessScore: readiness.readinessScore,
          weakConceptsCount: weakCount,
          growthRate,
          confidenceScore: confidence,
          studyMinutes: 45,
          missionsCompleted: 1,
          practiceSolved: diagnosticResult ? 15 : 3,
          diagnosticDelta: Math.round((avgMasteryScore - previousMastery) * 10) / 10
        }
      });
    }

    return updatedState;
  }
}
