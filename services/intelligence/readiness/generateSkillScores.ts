export interface SkillScoreSummary {
  category: string;
  previousScore: number;
  currentScore: number;
  accuracy: number;
  trend: number;
}

export function generateSkillScores(
  skills: Array<{ category: string; previousScore: number; currentScore: number; accuracy: number }>
): SkillScoreSummary[] {
  return skills.map(s => ({
    category: s.category,
    previousScore: s.previousScore,
    currentScore: s.currentScore,
    accuracy: s.accuracy,
    trend: Math.round((s.currentScore - s.previousScore) * 10) / 10
  }));
}
