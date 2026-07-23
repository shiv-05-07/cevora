/**
 * Calculates confidence score (0 to 100) combining attempt volume and accuracy.
 */
export function calculateConfidence(params: {
  attempts: number;
  accuracy: number;
}): number {
  const { attempts, accuracy } = params;
  const volumeFactor = Math.min(50, (attempts / 5) * 50);
  const accuracyFactor = (accuracy / 100) * 50;
  return Math.round(volumeFactor + accuracyFactor);
}
