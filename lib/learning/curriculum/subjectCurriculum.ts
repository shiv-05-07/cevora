import { SubjectKey, SubjectCurriculum } from './types';
export type { SubjectKey, SubjectCurriculum };
import { dsaCurriculum } from './dsa';
import { webDevelopmentCurriculum } from './webDevelopment';
import { appDevelopmentCurriculum } from './appDevelopment';
import { aiMlCurriculum } from './aiMl';
import { dataScienceCurriculum } from './dataScience';
import { devopsCurriculum } from './devops';
import { dbmsCurriculum } from './dbms';
import { operatingSystemsCurriculum } from './operatingSystems';
import { computerNetworksCurriculum } from './computerNetworks';
import { aptitudeCurriculum } from './aptitude';

export const SUBJECT_CURRICULA: Record<SubjectKey, SubjectCurriculum> = {
  'dsa': dsaCurriculum,
  'web-development': webDevelopmentCurriculum,
  'app-development': appDevelopmentCurriculum,
  'ai-ml': aiMlCurriculum,
  'data-science': dataScienceCurriculum,
  'devops': devopsCurriculum,
  'dbms': dbmsCurriculum,
  'operating-systems': operatingSystemsCurriculum,
  'computer-networks': computerNetworksCurriculum,
  'aptitude': aptitudeCurriculum,
};

/**
  * Resolves the primary subject key from preferredSubjects array.
  * preferredSubjects[0] determines primary learning track.
  * Returns null if preferredSubjects is empty/undefined. NEVER defaults to DSA.
  */
export function getPrimarySubject(preferredSubjects?: string[] | null): SubjectKey | null {
  if (!preferredSubjects || preferredSubjects.length === 0) {
    return null;
  }

  const raw = preferredSubjects[0];
  if (!raw || typeof raw !== 'string' || !raw.trim()) {
    return null;
  }

  const normalized = raw.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalized.includes('aiml') || normalized.includes('machinelearning') || normalized.includes('artificialintelligence') || normalized === 'ai' || normalized === 'ml') {
    return 'ai-ml';
  }

  if (normalized.includes('web') || normalized.includes('frontend') || normalized.includes('fullstack')) {
    return 'web-development';
  }

  if (normalized.includes('app') || normalized.includes('mobile') || normalized.includes('reactnative') || normalized.includes('flutter')) {
    return 'app-development';
  }

  if (normalized.includes('datascience') || normalized.includes('dataanalytics') || normalized.includes('dataanalysis')) {
    return 'data-science';
  }

  if (normalized.includes('devops') || normalized.includes('cloud') || normalized.includes('sysadmin') || normalized.includes('infrastructure')) {
    return 'devops';
  }

  if (normalized.includes('dbms') || normalized.includes('database') || normalized.includes('sql')) {
    return 'dbms';
  }

  if (normalized.includes('operatingsystem') || normalized === 'os' || normalized.includes('operatingsystems')) {
    return 'operating-systems';
  }

  if (normalized.includes('computernetwork') || normalized === 'cn' || normalized.includes('computernetworks') || normalized === 'networking') {
    return 'computer-networks';
  }

  if (normalized.includes('aptitude') || normalized.includes('quant') || normalized.includes('reasoning')) {
    return 'aptitude';
  }

  if (normalized.includes('dsa') || normalized.includes('datastructure') || normalized.includes('algorithm') || normalized.includes('computerscience') || normalized === 'cs' || normalized.includes('softwareengineering')) {
    return 'dsa';
  }

  return null;
}

/**
  * Retrieves the complete mock curriculum for the resolved primary subject.
  * Returns null if no valid subject is selected.
  */
export function getSubjectCurriculum(preferredSubjects?: string[] | null): SubjectCurriculum | null {
  const primaryKey = getPrimarySubject(preferredSubjects);
  if (!primaryKey) {
    return null;
  }
  const raw = SUBJECT_CURRICULA[primaryKey];
  if (!raw) return null;

  return {
    ...raw,
    missions: raw.missions.map(m => ({
      ...m,
      subjectKey: raw.key
    }))
  };
}

/**
  * Developer safety assertion helper to detect subject cross-contamination.
  * Throws or logs loudly in development if a mission topic diverges from the user's primary subject.
  */
export function assertMissionMatchesSubject(
  missionTopicOrTitle: string,
  preferredSubjects?: string[] | null
): void {
  const curriculum = getSubjectCurriculum(preferredSubjects);
  if (!curriculum) {
    return;
  }

  const cleanInput = missionTopicOrTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
  const inputWords = missionTopicOrTitle.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);

  const matchesTopic = curriculum.roadmapSteps.some(step => {
    const cleanStepTitle = step.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTopicKey = step.topicKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    const stepWords = (step.title + ' ' + step.topicKey).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);

    const fullMatch = cleanInput.includes(cleanStepTitle) || cleanStepTitle.includes(cleanInput) ||
                      cleanInput.includes(cleanTopicKey) || cleanTopicKey.includes(cleanInput);

    const wordMatch = inputWords.some(w => stepWords.includes(w));
    return fullMatch || wordMatch;
  }) || curriculum.missions.some(m => m.title === missionTopicOrTitle || m.topicKey === missionTopicOrTitle);

  if (!matchesTopic) {
    const message = `[SUBJECT MISMATCH ASSERTION FAILED] Mission topic "${missionTopicOrTitle}" does not belong to subject track "${curriculum.label}" (${curriculum.key}).`;
    console.error(message);
    if (process.env.NODE_ENV === 'development') {
      throw new Error(message);
    }
  }
}

/**
 * Returns all diagnostic questions from all 10 subject curricula combined.
 */
export function getAllDiagnosticQuestions() {
  const allQuestions: Array<{
    id: string;
    subjectKey: SubjectKey;
    conceptKey: string;
    concept: string;
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    questionType?: string;
    question: string;
    options: { id: string; text: string }[];
    correctAnswer: string;
    explanation: string;
    category?: string;
  }> = [];

  for (const curriculum of Object.values(SUBJECT_CURRICULA)) {
    for (const q of curriculum.diagnosticQuestions) {
      allQuestions.push({
        ...q,
        category: curriculum.label
      });
    }
  }

  return allQuestions;
}
