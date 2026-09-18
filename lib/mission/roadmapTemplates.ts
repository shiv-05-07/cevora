import { getSubjectCurriculum } from '../learning/curriculum/subjectCurriculum';

export interface RoadmapTemplate {
  trackKey: string;
  trackTitle: string;
  defaultGoal: string;
  topics: string[];
}

export function topicMatches(a?: string | null, b?: string | null): boolean {
  if (!a || !b) return false;
  const cleanA = a.toLowerCase().trim();
  const cleanB = b.toLowerCase().trim();
  if (cleanA === cleanB) return true;

  // Direct slug/key match (e.g. 'osi-tcpip-models' === 'osi-tcpip-models')
  const slugA = cleanA.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const slugB = cleanB.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  if (slugA === slugB) return true;

  // Alphanumeric sub-string inclusion
  const alphaA = cleanA.replace(/[^a-z0-9]/g, '');
  const alphaB = cleanB.replace(/[^a-z0-9]/g, '');
  if (alphaA && alphaB && (alphaA.includes(alphaB) || alphaB.includes(alphaA))) {
    return true;
  }

  // Key word overlap check (including 2-letter tech acronyms like ui, os, db, ip, ai, ml)
  const stopWords = new Set([
    'and', 'the', 'for', 'with', 'using', 'understanding', 'how', 'computers', 'models', 'track',
    'fundamentals', 'overview', 'mobile', 'web', 'data', 'system', 'systems', 'application',
    'development', 'building', 'introduction', 'basic', 'basics', 'foundations', 'advanced',
    'core', 'learning', 'programming', 'engineering', 'code', 'coding', 'computer', 'operating',
    'network', 'networks', 'security', 'database', 'databases', 'structures', 'algorithms'
  ]);
  const wordsA = cleanA.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length >= 2 && !stopWords.has(w));
  const wordsB = cleanB.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length >= 2 && !stopWords.has(w));

  const common = wordsA.filter(w => wordsB.includes(w));
  return common.length >= 1;
}

/**
 * Resolves a deterministic roadmap template based on the user's selected subjects during onboarding.
 * Delegates to the central Subject Curriculum Registry.
 */
export function getRoadmapTemplate(
  preferredSubjects: string[] = [],
  targetRole?: string
): RoadmapTemplate {
  const curriculum = getSubjectCurriculum(preferredSubjects);

  if (!curriculum) {
    return {
      trackKey: 'SETUP_REQUIRED',
      trackTitle: 'Choose a learning subject to build your learning path.',
      defaultGoal: targetRole || 'Placement Preparation',
      topics: [],
    };
  }

  return {
    trackKey: curriculum.key,
    trackTitle: curriculum.roadmapTitle,
    defaultGoal: targetRole || `${curriculum.label} Placement Track`,
    topics: curriculum.roadmapSteps.map((step: any) => step.title),
  };
}
