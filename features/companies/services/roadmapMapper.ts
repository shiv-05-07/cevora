/**
 * Maps failed criteria to existing Cevora Roadmap IDs.
 */

// These would ideally come from the database or constants.
// For now, mapping logical criteria strings to existing roadmap categories.
export const CRITERIA_TO_ROADMAP_CATEGORY: Record<string, string> = {
  'DSA': 'DSA',
  'SQL': 'WEB_DEVELOPMENT', // Or Data Science if available
  'React': 'WEB_DEVELOPMENT',
  'Aptitude': 'APTITUDE',
  'Interview': 'INTERVIEW_PREP', // Custom, if it exists
  'Java': 'WEB_DEVELOPMENT',
};

export function getRoadmapCategoryForCriterion(criterionKey: string): string | null {
  return CRITERIA_TO_ROADMAP_CATEGORY[criterionKey] || null;
}
