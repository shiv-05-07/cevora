import { PlacementReadiness } from '@prisma/client';
import { 
  DiagnosticCategory, 
  DiagnosticResultSummary, 
  LearningPersona, 
  WeakConceptDetail, 
  StrongConceptDetail, 
  NotAssessedConceptDetail,
  CategoryScoreDetail,
  ConceptStatus
} from '../types';
import { diagnosticQuestions } from '../data/diagnosticQuestions';
import { getAllDiagnosticQuestions, getSubjectCurriculum } from '@/lib/learning/curriculum/subjectCurriculum';

export class ScoringEngine {
  /**
   * Evaluates responses from a completed diagnostic attempt and computes detailed deterministic scoring breakdown.
   */
  static evaluateAttempt(
    attemptId: string,
    responses: Array<{ questionId: string; selectedAnswer: string | null; isCorrect: boolean; timeTaken?: number | null }>,
    preferredSubjects?: string[] | null
  ): DiagnosticResultSummary {
    const curriculum = getSubjectCurriculum(preferredSubjects);
    const allQuestions = curriculum?.diagnosticQuestions || [...diagnosticQuestions, ...getAllDiagnosticQuestions()];

    const totalQuestions = responses.length;
    const correctCount = responses.filter(r => r.isCorrect).length;
    const overallAccuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
    const overallScore = Math.round(overallAccuracy);

    // Concept & Category statistics aggregators
    const categoryStats: Record<string, { total: number; correct: number; timeSpent: number }> = {};
    const conceptStats: Record<string, { conceptKey?: string; category: string; total: number; correct: number }> = {};

    responses.forEach(r => {
      const q = (allQuestions as any[]).find(dq => dq.id === r.questionId);
      if (q) {
        const cat = q.category || curriculum?.label || 'General';
        if (!categoryStats[cat]) {
          categoryStats[cat] = { total: 0, correct: 0, timeSpent: 0 };
        }
        categoryStats[cat].total += 1;
        if (r.isCorrect) categoryStats[cat].correct += 1;
        categoryStats[cat].timeSpent += r.timeTaken || 30;

        const conceptName = q.concept;
        const conceptKey = q.conceptKey || conceptName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (!conceptStats[conceptName]) {
          conceptStats[conceptName] = { conceptKey, category: cat, total: 0, correct: 0 };
        }
        conceptStats[conceptName].total += 1;
        if (r.isCorrect) conceptStats[conceptName].correct += 1;
      }
    });

    // Compute Category Scores
    const categoryScores: Record<string, CategoryScoreDetail> = {};
    const categoriesToTrack = curriculum
      ? [curriculum.label]
      : ['DSA', 'Aptitude', 'DBMS', 'OS', 'CN', 'OOP', 'SQL', 'Behavioral', 'Communication'];

    categoriesToTrack.forEach(cat => {
      const stat = categoryStats[cat] || { total: 0, correct: 0, timeSpent: 0 };
      const acc = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;
      categoryScores[cat] = {
        category: cat,
        score: Math.round(acc),
        accuracy: Math.round(acc),
        total: stat.total,
        correct: stat.correct,
        trend: Math.round(acc > 60 ? 5 : -3)
      };
    });

    // Compute Concept Evidence Map and Categorized Lists
    const conceptEvidence: Record<string, ConceptStatus> = {};
    const weakConcepts: WeakConceptDetail[] = [];
    const strongConcepts: StrongConceptDetail[] = [];
    const notAssessedConcepts: NotAssessedConceptDetail[] = [];

    // Track assessed concepts
    Object.entries(conceptStats).forEach(([conceptName, stat]) => {
      const conceptAcc = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0;
      let status: ConceptStatus = 'needs_work';
      if (conceptAcc >= 70) {
        status = 'strong';
        strongConcepts.push({
          conceptKey: stat.conceptKey,
          concept: conceptName,
          category: stat.category,
          score: Math.round(conceptAcc)
        });
      } else if (conceptAcc >= 50) {
        status = 'developing';
        weakConcepts.push({
          conceptKey: stat.conceptKey,
          concept: conceptName,
          category: stat.category,
          score: Math.round(conceptAcc),
          severity: 'WEAK',
          recommendedAction: `Practice ${conceptName} fundamental exercises and daily missions.`
        });
      } else {
        status = 'needs_work';
        weakConcepts.push({
          conceptKey: stat.conceptKey,
          concept: conceptName,
          category: stat.category,
          score: Math.round(conceptAcc),
          severity: 'CRITICAL',
          recommendedAction: `Focus on ${conceptName} core concepts in your subject roadmap.`
        });
      }

      conceptEvidence[stat.conceptKey || conceptName] = status;
      conceptEvidence[conceptName] = status;
    });

    // Gather all concepts defined in subject curriculum (both diagnostic questions and roadmap steps)
    if (curriculum) {
      const allSubjectConceptNames = new Set<string>();
      curriculum.diagnosticQuestions.forEach(q => allSubjectConceptNames.add(q.concept));
      curriculum.roadmapSteps.forEach(s => allSubjectConceptNames.add(s.title));

      allSubjectConceptNames.forEach(cName => {
        if (!conceptStats[cName]) {
          const cKey = cName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          conceptEvidence[cKey] = 'not_assessed';
          conceptEvidence[cName] = 'not_assessed';
          notAssessedConcepts.push({
            conceptKey: cKey,
            concept: cName,
            category: curriculum.label
          });
        }
      });
    }

    // Determine Recommended Starting Concept from subject roadmap
    let recommendedStartConcept = 'foundation';
    let recommendedStartTitle = 'Curriculum Fundamentals';

    if (curriculum && curriculum.roadmapSteps.length > 0) {
      // Find first roadmap step that needs work or is developing
      const needsWorkStep = curriculum.roadmapSteps.find(step => {
        const status = conceptEvidence[step.topicKey] || conceptEvidence[step.title];
        return status === 'needs_work';
      });

      const developingStep = curriculum.roadmapSteps.find(step => {
        const status = conceptEvidence[step.topicKey] || conceptEvidence[step.title];
        return status === 'developing';
      });

      const targetStep = needsWorkStep || developingStep || curriculum.roadmapSteps[0];
      recommendedStartConcept = targetStep.topicKey;
      recommendedStartTitle = targetStep.title;
    }

    // Sort Weak & Strong concepts
    weakConcepts.sort((a, b) => a.score - b.score);
    strongConcepts.sort((a, b) => b.score - a.score);

    // Compute Placement Readiness Level
    let placementReadiness: PlacementReadiness = PlacementReadiness.NEEDS_FOUNDATION;
    if (overallAccuracy >= 85) {
      placementReadiness = PlacementReadiness.PLACEMENT_READY;
    } else if (overallAccuracy >= 70) {
      placementReadiness = PlacementReadiness.INTERVIEW_READY;
    } else if (overallAccuracy >= 45) {
      placementReadiness = PlacementReadiness.BUILDING_SKILLS;
    }

    // Determine Learning Persona
    const avgTimePerQuestion = responses.reduce((acc, r) => acc + (r.timeTaken || 30), 0) / (responses.length || 1);
    let persona: LearningPersona = 'Consistent Learner';
    if (overallAccuracy >= 80 && avgTimePerQuestion < 25) {
      persona = 'Fast Learner';
    } else if (overallAccuracy >= 75) {
      persona = 'Concept Strong';
    } else if (weakConcepts.length > 3) {
      persona = 'Needs Revision';
    } else if (avgTimePerQuestion > 45) {
      persona = 'Practice Driven';
    }

    const defaultExplanation = `Your ${curriculum?.label || 'Subject'} diagnostic starting point is ready (${overallScore}% overall baseline accuracy across ${totalQuestions} questions). Recommended starting topic: "${recommendedStartTitle}".`;

    return {
      attemptId,
      subjectKey: curriculum?.key || 'general',
      subjectLabel: curriculum?.label || 'General',
      score: overallScore,
      accuracy: Math.round(overallAccuracy * 10) / 10,
      totalQuestions,
      correctCount,
      placementReadiness,
      readinessScore: overallScore,
      persona,
      weakConcepts,
      strongConcepts,
      notAssessedConcepts,
      conceptEvidence,
      recommendedStartConcept,
      recommendedStartTitle,
      categoryScores,
      aiExplanation: defaultExplanation,
      recommendedRoadmap: curriculum?.roadmapTitle || 'Subject Placement Roadmap'
    };
  }
}
