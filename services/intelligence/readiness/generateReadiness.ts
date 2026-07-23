import { PlacementReadiness } from '@prisma/client';

export interface ReadinessResult {
  readinessScore: number;
  placementReadiness: PlacementReadiness;
  label: string;
}

export function generateReadiness(overallMastery: number, accuracy: number): ReadinessResult {
  const readinessScore = Math.round((overallMastery * 0.6) + (accuracy * 0.4));
  
  let placementReadiness: PlacementReadiness = PlacementReadiness.NEEDS_FOUNDATION;
  let label = 'Needs Foundation';

  if (readinessScore >= 85) {
    placementReadiness = PlacementReadiness.PLACEMENT_READY;
    label = 'Placement Ready';
  } else if (readinessScore >= 70) {
    placementReadiness = PlacementReadiness.INTERVIEW_READY;
    label = 'Interview Ready';
  } else if (readinessScore >= 45) {
    placementReadiness = PlacementReadiness.BUILDING_SKILLS;
    label = 'Building Skills';
  }

  return {
    readinessScore,
    placementReadiness,
    label
  };
}
