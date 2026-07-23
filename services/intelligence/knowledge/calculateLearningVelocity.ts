/**
 * Calculates learning velocity based on mastery points gained over time.
 */
export function calculateLearningVelocity(params: {
  currentMastery: number;
  previousMastery: number;
  daysElapsed: number;
}): number {
  const { currentMastery, previousMastery, daysElapsed } = params;
  if (daysElapsed <= 0) return 0;
  const delta = currentMastery - previousMastery;
  const pointsPerDay = delta / daysElapsed;
  return Math.round(pointsPerDay * 10) / 10;
}
