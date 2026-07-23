import { DiagnosticResultSummary } from '../types';

export class ResultEngine {
  /**
   * Generates actionable feedback and next steps based on diagnostic summary.
   */
  static formatResultAnalysis(summary: DiagnosticResultSummary) {
    return {
      ...summary,
      nextActionSteps: [
        `Focus daily missions on top weak areas: ${summary.weakConcepts.slice(0, 3).map(w => w.concept).join(', ') || 'Core Subjects'}`,
        `Explore targeted OA Practice sets for ${summary.categoryScores.DSA?.score < 70 ? 'DSA' : 'System Concepts'}`,
        `Review your personalized AI Readiness dashboard widget for daily recommendations`
      ]
    };
  }
}
