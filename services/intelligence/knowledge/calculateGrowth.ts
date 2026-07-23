/**
 * Calculates percentage growth rate between two snapshot values.
 */
export function calculateGrowth(current: number, previous: number): number {
  if (previous <= 0) return current > 0 ? 100 : 0;
  const growth = ((current - previous) / previous) * 100;
  return Math.round(growth * 10) / 10;
}
