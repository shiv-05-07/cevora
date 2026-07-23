/**
 * Calculates consistency score (0 to 100) based on active learning streak and activity frequency.
 */
export function calculateConsistency(params: {
  currentStreak: number;
  activeDaysLast30Days: number;
}): number {
  const { currentStreak, activeDaysLast30Days } = params;
  const streakScore = Math.min(50, currentStreak * 5);
  const frequencyScore = Math.min(50, (activeDaysLast30Days / 30) * 50);
  return Math.round(streakScore + frequencyScore);
}
