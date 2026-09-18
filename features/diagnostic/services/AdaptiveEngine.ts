import { RoadmapDifficulty } from '@prisma/client';
import { 
  DiagnosticCategory, 
  DiagnosticQuestion, 
  CategoryAdaptiveState 
} from '../types';
import { getSubjectCurriculum } from '@/lib/learning/curriculum/subjectCurriculum';

export const ALL_CATEGORIES: DiagnosticCategory[] = [
  'DSA',
  'Aptitude',
  'DBMS',
  'OS',
  'CN',
  'OOP',
  'SQL',
  'Behavioral',
  'Communication'
];

/**
 * Fisher-Yates array shuffle utility.
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export class AdaptiveEngine {
  /**
   * Initializes category adaptive states for a new diagnostic session.
   */
  static initializeCategoryStates(): Record<DiagnosticCategory, CategoryAdaptiveState> {
    const states = {} as Record<DiagnosticCategory, CategoryAdaptiveState>;
    for (const cat of ALL_CATEGORIES) {
      states[cat] = {
        category: cat,
        currentDifficulty: 'BEGINNER',
        streak: 0,
        confidence: 50,
        mistakes: 0,
        questionsAnswered: 0
      };
    }
    return states;
  }

  /**
   * Evaluates a submitted answer for a category and updates category difficulty trajectory.
   */
  static updateCategoryState(
    currentState: CategoryAdaptiveState,
    isCorrect: boolean
  ): CategoryAdaptiveState {
    const nextState: CategoryAdaptiveState = { ...currentState };
    nextState.questionsAnswered += 1;

    if (isCorrect) {
      nextState.streak += 1;
      nextState.confidence = Math.min(100, nextState.confidence + 12);

      if (nextState.currentDifficulty === 'BEGINNER' && nextState.streak >= 1) {
        nextState.currentDifficulty = 'INTERMEDIATE';
      } else if (nextState.currentDifficulty === 'INTERMEDIATE' && nextState.streak >= 2) {
        nextState.currentDifficulty = 'ADVANCED';
      }
    } else {
      nextState.streak = 0;
      nextState.mistakes += 1;
      nextState.confidence = Math.max(0, nextState.confidence - 10);

      if (nextState.currentDifficulty === 'ADVANCED') {
        nextState.currentDifficulty = 'INTERMEDIATE';
      } else if (nextState.currentDifficulty === 'INTERMEDIATE') {
        nextState.currentDifficulty = 'BEGINNER';
      }
    }

    return nextState;
  }

  /**
   * Generates a subject-aware sequence of diagnostic questions for a user session.
   * Uses preferredSubjects[0] to pick diagnostic questions from the central subject registry.
   */
  static generateQuestionSequence(preferredSubjects?: string[] | null): DiagnosticQuestion[] {
    const curriculum = getSubjectCurriculum(preferredSubjects);

    if (curriculum && curriculum.diagnosticQuestions && curriculum.diagnosticQuestions.length > 0) {
      return curriculum.diagnosticQuestions.map((q: any) => ({
        id: q.id,
        subjectKey: q.subjectKey || curriculum.key,
        conceptKey: q.conceptKey || q.concept.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: curriculum.label as DiagnosticCategory,
        concept: q.concept,
        difficulty: q.difficulty,
        questionType: (q.questionType as any) || 'MCQ',
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }));
    }

    return [];
  }
}
