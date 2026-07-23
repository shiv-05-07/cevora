/**
 * Pure deterministic formula for calculating concept mastery score (0.0 to 1.0 or 0 to 100).
 * Mastery = 0.35 * Accuracy + 0.25 * AttemptsNorm + 0.20 * DiffWeight + 0.10 * Consistency + 0.10 * TimeEfficiency
 */
export function calculateMastery(params: {
  accuracy: number; // 0 to 100
  attempts: number;
  difficultyWeight?: number; // 1.0 (Beginner), 1.2 (Intermediate), 1.5 (Advanced)
  consistencyScore?: number; // 0 to 100
  avgTimeSeconds?: number;
  expectedTimeSeconds?: number;
}): number {
  const {
    accuracy,
    attempts,
    difficultyWeight = 1.0,
    consistencyScore = 70,
    avgTimeSeconds = 45,
    expectedTimeSeconds = 60
  } = params;

  const normalizedAccuracy = Math.min(100, Math.max(0, accuracy));
  const normalizedAttempts = Math.min(100, (attempts / 10) * 100);
  const diffFactor = Math.min(100, (difficultyWeight / 1.5) * 100);
  
  const timeEfficiency = expectedTimeSeconds > 0 
    ? Math.min(100, Math.max(0, (expectedTimeSeconds / Math.max(15, avgTimeSeconds)) * 70))
    : 70;

  const rawMastery = 
    (0.35 * normalizedAccuracy) +
    (0.25 * normalizedAttempts) +
    (0.20 * diffFactor) +
    (0.10 * consistencyScore) +
    (0.10 * timeEfficiency);

  return Math.round(Math.min(100, Math.max(0, rawMastery)) * 10) / 10;
}
