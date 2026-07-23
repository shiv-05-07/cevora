import { PlacementReadiness } from '@prisma/client';
import { 
  DiagnosticCategory, 
  DiagnosticQuestion, 
  DiagnosticResultSummary, 
  LearningPersona, 
  WeakConceptDetail, 
  StrongConceptDetail, 
  CategoryScoreDetail 
} from '../types';
import { diagnosticQuestions } from '../data/diagnosticQuestions';

export class ScoringEngine {
  /**
   * Evaluates responses from a completed diagnostic attempt and computes detailed scoring breakdown.
   */
  static evaluateAttempt(
    attemptId: string,
    responses: Array<{ questionId: string; selectedAnswer: string | null; isCorrect: boolean; timeTaken?: number | null }>
  ): DiagnosticResultSummary {
    const totalQuestions = responses.length;
    const correctCount = responses.filter(r => r.isCorrect).length;
    const overallAccuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
    const overallScore = Math.round(overallAccuracy);

    // Initialize Category Aggregators
    const categoryStats: Record<string, { total: number; correct: number; timeSpent: number }> = {};
    const conceptStats: Record<string, { category: string; total: number; correct: number }> = {};

    responses.forEach(r => {
      const q = diagnosticQuestions.find(dq => dq.id === r.questionId);
      if (q) {
        if (!categoryStats[q.category]) {
          categoryStats[q.category] = { total: 0, correct: 0, timeSpent: 0 };
        }
        categoryStats[q.category].total += 1;
        if (r.isCorrect) categoryStats[q.category].correct += 1;
        categoryStats[q.category].timeSpent += r.timeTaken || 30;

        if (!conceptStats[q.concept]) {
          conceptStats[q.concept] = { category: q.category, total: 0, correct: 0 };
        }
        conceptStats[q.concept].total += 1;
        if (r.isCorrect) conceptStats[q.concept].correct += 1;
      }
    });

    // Compute Category Scores
    const categoryScores = {} as Record<DiagnosticCategory, CategoryScoreDetail>;
    const categories: DiagnosticCategory[] = [
      'DSA', 'Aptitude', 'DBMS', 'OS', 'CN', 'OOP', 'SQL', 'Behavioral', 'Communication'
    ];

    categories.forEach(cat => {
      const stat = categoryStats[cat] || { total: 0, correct: 0, timeSpent: 0 };
      const acc = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;
      categoryScores[cat] = {
        category: cat,
        score: Math.round(acc),
        accuracy: Math.round(acc),
        total: stat.total,
        correct: stat.correct,
        trend: Math.round(acc > 60 ? 5 : -3) // Initial baseline trend
      };
    });

    // Compute Placement Readiness Level
    let placementReadiness: PlacementReadiness = PlacementReadiness.NEEDS_FOUNDATION;
    if (overallAccuracy >= 85) {
      placementReadiness = PlacementReadiness.PLACEMENT_READY;
    } else if (overallAccuracy >= 70) {
      placementReadiness = PlacementReadiness.INTERVIEW_READY;
    } else if (overallAccuracy >= 45) {
      placementReadiness = PlacementReadiness.BUILDING_SKILLS;
    }

    // Determine Weak Concepts & Strong Concepts
    const weakConcepts: WeakConceptDetail[] = [];
    const strongConcepts: StrongConceptDetail[] = [];

    Object.entries(conceptStats).forEach(([conceptName, stat]) => {
      const conceptAcc = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;
      if (conceptAcc < 60) {
        let severity: 'CRITICAL' | 'WEAK' | 'IMPROVING' | 'HEALTHY' = 'WEAK';
        if (conceptAcc <= 30) severity = 'CRITICAL';
        else if (conceptAcc <= 55) severity = 'WEAK';
        else if (conceptAcc <= 75) severity = 'IMPROVING';

        weakConcepts.push({
          concept: conceptName,
          category: stat.category,
          score: Math.round(conceptAcc),
          severity,
          recommendedAction: `Revise ${conceptName} fundamentals via Study Assistant or practice OA problems.`
        });
      } else {
        strongConcepts.push({
          concept: conceptName,
          category: stat.category,
          score: Math.round(conceptAcc)
        });
      }
    });

    // Sort Weak Concepts by severity (CRITICAL first, then lowest score)
    weakConcepts.sort((a, b) => a.score - b.score);
    strongConcepts.sort((a, b) => b.score - a.score);

    // Determine Learning Persona
    const avgTimePerQuestion = responses.reduce((acc, r) => acc + (r.timeTaken || 30), 0) / (responses.length || 1);
    let persona: LearningPersona = 'Consistent Learner';

    if (overallAccuracy >= 80 && avgTimePerQuestion < 25) {
      persona = 'Fast Learner';
    } else if (overallAccuracy >= 75) {
      persona = 'Concept Strong';
    } else if (weakConcepts.length > 4) {
      persona = 'Needs Revision';
    } else if (avgTimePerQuestion > 45) {
      persona = 'Practice Driven';
    }

    // Generate AI Explanation
    const aiExplanation = `Based on your diagnostic performance (${overallScore}% overall accuracy across ${totalQuestions} questions), your baseline placement readiness is classified as "${placementReadiness.replace('_', ' ')}". Your strengths lie in ${strongConcepts.slice(0, 2).map(c => c.concept).join(', ') || 'foundational problem solving'}, while immediate target focus should be directed toward ${weakConcepts.slice(0, 2).map(w => w.concept).join(', ') || 'core concepts'}. Your learning persona is identified as "${persona}".`;

    // Recommended Roadmap
    let recommendedRoadmap = 'Complete CS Fundamentals Track';
    if (placementReadiness === PlacementReadiness.PLACEMENT_READY) {
      recommendedRoadmap = 'Advanced OA & System Design Fast Track';
    } else if (placementReadiness === PlacementReadiness.INTERVIEW_READY) {
      recommendedRoadmap = 'Amazon & Tier-1 SDE Placement Roadmap';
    } else if (placementReadiness === PlacementReadiness.BUILDING_SKILLS) {
      recommendedRoadmap = 'Core DSA & CS Core Placement Roadmap';
    }

    return {
      attemptId,
      score: overallScore,
      accuracy: overallAccuracy,
      placementReadiness,
      readinessScore: overallScore,
      persona,
      weakConcepts,
      strongConcepts,
      categoryScores,
      aiExplanation,
      recommendedRoadmap
    };
  }
}
