export type SeverityLevel = 'CRITICAL' | 'WEAK' | 'IMPROVING' | 'HEALTHY';

export interface ConceptWeaknessAnalysis {
  conceptId: string;
  conceptName: string;
  masteryScore: number;
  severity: SeverityLevel;
  recommendedAction: string;
}

export function detectWeakConcepts(
  concepts: Array<{ id: string; name: string; masteryScore: number }>
): ConceptWeaknessAnalysis[] {
  return concepts
    .map(c => {
      const score = Math.round(c.masteryScore * 100);
      let severity: SeverityLevel = 'HEALTHY';
      let recommendedAction = 'Maintain consistency with periodic review.';

      if (score <= 30) {
        severity = 'CRITICAL';
        recommendedAction = `Urgent fundamental review required for ${c.name}. Open Study Assistant.`;
      } else if (score <= 55) {
        severity = 'WEAK';
        recommendedAction = `Practice targeted OA problems for ${c.name}.`;
      } else if (score <= 75) {
        severity = 'IMPROVING';
        recommendedAction = `Solve medium difficulty questions on ${c.name}.`;
      }

      return {
        conceptId: c.id,
        conceptName: c.name,
        masteryScore: score,
        severity,
        recommendedAction
      };
    })
    .filter(c => c.severity !== 'HEALTHY')
    .sort((a, b) => a.masteryScore - b.masteryScore);
}
