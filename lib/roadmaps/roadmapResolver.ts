import { Roadmap, RoadmapDifficulty } from '@/types/roadmap';
import { roadmapsData as careerRoadmaps } from '@/data/roadmapsData';
import { SUBJECT_CURRICULA, getPrimarySubject, SubjectCurriculum } from '@/lib/learning/curriculum/subjectCurriculum';
import { SUBJECT_RESOURCE_MAP } from './subjectResourceMap';

const SUBJECT_DIFFICULTY_MAP: Record<string, RoadmapDifficulty> = {
  // BEGINNER: Starts from fundamentals, progressive, no prior experience assumed
  'aptitude': 'Beginner',
  'dbms': 'Beginner',
  'computer-networks': 'Beginner',

  // INTERMEDIATE: Assumes basic programming/CS, builds on fundamentals
  'dsa': 'Intermediate',
  'web-development': 'Intermediate',
  'app-development': 'Intermediate',
  'data-science': 'Intermediate',
  'operating-systems': 'Intermediate',

  // ADVANCED: Covers complex neural models, deep learning, cloud infrastructure
  'ai-ml': 'Advanced',
  'devops': 'Advanced',
};

const SUBJECT_PREREQUISITES_MAP: Record<string, string[]> = {
  'aptitude': ['None - suitable for absolute beginners and quantitative preparation'],
  'dbms': ['Basic computer literacy and introductory programming concepts'],
  'computer-networks': ['Basic computer literacy and understanding of operating environments'],
  'dsa': ['Basic proficiency in a programming language (C++, Java, Python, or JS)'],
  'web-development': ['Understanding of basic programming logic and web fundamentals'],
  'app-development': ['Fundamental JavaScript/TypeScript or Object-Oriented programming basics'],
  'data-science': ['Basic Python programming and high school algebra/statistics'],
  'operating-systems': ['Basic C/C++ or systems programming knowledge'],
  'ai-ml': ['Strong Python background, linear algebra, multivariable calculus, and statistics'],
  'devops': ['Linux command-line experience, networking basics, and scripting proficiency'],
};

/**
 * Converts a SubjectCurriculum into a full, standard Roadmap object.
 */
export function subjectCurriculumToRoadmap(curriculum: SubjectCurriculum): Roadmap {
  const difficulty = SUBJECT_DIFFICULTY_MAP[curriculum.key] || 'Intermediate';
  const prerequisites = SUBJECT_PREREQUISITES_MAP[curriculum.key] || ['Basic computer science and programming foundations'];

  return {
    id: curriculum.key,
    slug: curriculum.key,
    title: curriculum.roadmapTitle,
    role: `${curriculum.label} Learning Path`,
    difficulty,
    estimatedDuration: '8 weeks',
    description: curriculum.roadmapDescription,
    skills: [curriculum.label, 'Core Theory', 'Problem Solving', 'Technical Foundations'],
    prerequisites,
    learningOutcomes: curriculum.roadmapSteps.map(s => `Master ${s.title}: ${s.description}`),
    modules: curriculum.roadmapSteps.map((step, stepIdx) => {
      const matchedMission = curriculum.missions.find(
        m => m.topicKey === step.topicKey || m.title === step.title
      );

      const stepResources = SUBJECT_RESOURCE_MAP[curriculum.key]?.[step.id];

      const getResource = (order: number, fallbackType: 'official' | 'documentation' | 'article' | 'practice' | 'youtube', fallbackUrl: string) => {
        const item = stepResources?.[order];
        return {
          resourceType: item?.resourceType || fallbackType,
          resourceUrl: item?.resourceUrl || fallbackUrl
        };
      };

      const res1 = getResource(1, 'documentation', 'https://developer.mozilla.org/en-US/');
      const res2 = getResource(2, 'practice', 'https://leetcode.com/problemset/all/');
      const res3 = getResource(3, 'article', 'https://www.geeksforgeeks.org');
      const res4 = getResource(4, 'official', 'https://github.com');

      const lessons = [
        {
          id: `${curriculum.key}-${step.id}-l1`,
          title: `Concept Core: ${step.title}`,
          description: step.description,
          resourceType: res1.resourceType,
          resourceUrl: res1.resourceUrl,
          order: 1
        },
        {
          id: `${curriculum.key}-${step.id}-l2`,
          title: `Targeted Practice: ${step.title}`,
          description: matchedMission?.practice.question || `Solve core application problems on ${step.title}.`,
          resourceType: res2.resourceType,
          resourceUrl: res2.resourceUrl,
          order: 2
        },
        {
          id: `${curriculum.key}-${step.id}-l3`,
          title: `Common Pitfalls & Edge Cases: ${step.title}`,
          description: matchedMission?.review.keyTakeaway || `Analyze common architectural pitfalls and boundary conditions for ${step.title}.`,
          resourceType: res3.resourceType,
          resourceUrl: res3.resourceUrl,
          order: 3
        },
        {
          id: `${curriculum.key}-${step.id}-l4`,
          title: `Technical Viva & Trade-offs: ${step.title}`,
          description: matchedMission?.interview.question || `Articulate key trade-offs and concepts for ${step.title}.`,
          resourceType: res4.resourceType,
          resourceUrl: res4.resourceUrl,
          order: 4
        }
      ];

      return {
        id: `${curriculum.key}-mod-${stepIdx + 1}`,
        title: step.title,
        description: step.description,
        order: step.order || stepIdx + 1,
        lessons
      };
    })
  };
}

/**
 * Returns all subject-based roadmaps generated from Cevora's 10 subject curricula.
 */
export function getSubjectRoadmaps(): Roadmap[] {
  return Object.values(SUBJECT_CURRICULA).map(subjectCurriculumToRoadmap);
}

/**
 * Returns all career/interview preparation roadmaps.
 */
export function getCareerRoadmaps(): Roadmap[] {
  return careerRoadmaps;
}

/**
 * Returns all roadmaps in Cevora (Career roadmaps + Subject roadmaps combined).
 */
export function getAllRoadmaps(): Roadmap[] {
  const subjects = getSubjectRoadmaps();
  // Avoid duplicate IDs if any exist
  const careerIds = new Set(careerRoadmaps.map(r => r.id));
  const uniqueSubjects = subjects.filter(s => !careerIds.has(s.id));
  return [...careerRoadmaps, ...uniqueSubjects];
}

/**
 * Finds a roadmap by ID or Slug from either Career Roadmaps or Subject Roadmaps.
 */
export function getRoadmapById(idOrSlug: string): Roadmap | null {
  if (!idOrSlug) return null;
  const clean = idOrSlug.trim().toLowerCase();

  const all = getAllRoadmaps();
  const found = all.find(r => r.id.toLowerCase() === clean || r.slug.toLowerCase() === clean);
  if (found) return found;

  // Fallback check against subject keys
  const primaryKey = getPrimarySubject([idOrSlug]);
  if (primaryKey) {
    const subjectCurr = SUBJECT_CURRICULA[primaryKey];
    if (subjectCurr) {
      return subjectCurriculumToRoadmap(subjectCurr);
    }
  }

  return null;
}

/**
 * Resolves the student's personalized subject roadmap based on their onboarding preferences.
 */
export function getUserPersonalizedRoadmap(preferredSubjects?: string[] | null): Roadmap | null {
  const primaryKey = getPrimarySubject(preferredSubjects);
  if (!primaryKey) return null;

  const subjectCurr = SUBJECT_CURRICULA[primaryKey];
  if (!subjectCurr) return null;

  return subjectCurriculumToRoadmap(subjectCurr);
}

/**
 * Resolves the direct URL href for the student's personalized roadmap.
 */
export function getUserPersonalizedRoadmapHref(preferredSubjects?: string[] | null): string {
  const primaryKey = getPrimarySubject(preferredSubjects);
  if (!primaryKey) return '/onboarding/subjects';
  return `/roadmaps/${primaryKey}`;
}
