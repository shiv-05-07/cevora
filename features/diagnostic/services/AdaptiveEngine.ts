import { RoadmapDifficulty } from '@prisma/client';
import { 
  DiagnosticCategory, 
  DiagnosticQuestion, 
  CategoryAdaptiveState 
} from '../types';
import { diagnosticQuestions } from '../data/diagnosticQuestions';

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

      // Adaptive upgrade logic per category
      if (nextState.currentDifficulty === 'BEGINNER' && nextState.streak >= 1) {
        nextState.currentDifficulty = 'INTERMEDIATE';
      } else if (nextState.currentDifficulty === 'INTERMEDIATE' && nextState.streak >= 2) {
        nextState.currentDifficulty = 'ADVANCED';
      }
    } else {
      nextState.streak = 0;
      nextState.mistakes += 1;
      nextState.confidence = Math.max(0, nextState.confidence - 10);

      // Adaptive downgrade logic per category
      if (nextState.currentDifficulty === 'ADVANCED') {
        nextState.currentDifficulty = 'INTERMEDIATE';
      } else if (nextState.currentDifficulty === 'INTERMEDIATE') {
        nextState.currentDifficulty = 'BEGINNER';
      }
    }

    return nextState;
  }

  /**
   * Generates a randomized, balanced 15-question adaptive sequence for a new assessment session.
   */
  static generateQuestionSequence(): DiagnosticQuestion[] {
    const questions: DiagnosticQuestion[] = [];
    const usedIds = new Set<string>();

    // Shuffle pool to ensure random presentation every diagnostic run
    const pool = shuffleArray(diagnosticQuestions);

    // Step 1: Include 1 beginner question for each of the 9 categories
    const shuffledCategories = shuffleArray(ALL_CATEGORIES);
    for (const cat of shuffledCategories) {
      const q = pool.find(
        dq => dq.category === cat && dq.difficulty === 'BEGINNER' && !usedIds.has(dq.id)
      );
      if (q) {
        questions.push(q);
        usedIds.add(q.id);
      }
    }

    // Step 2: Fill remaining 6 slots with Intermediate / Advanced questions across randomized core subjects
    for (const dq of pool) {
      if (questions.length >= 15) break;
      if (!usedIds.has(dq.id)) {
        questions.push(dq);
        usedIds.add(dq.id);
      }
    }

    return questions;
  }

  /**
   * Given existing answered questions and category states, selects the next adaptive question dynamically.
   */
  static selectNextAdaptiveQuestion(
    answeredQuestionIds: string[],
    categoryStates: Record<DiagnosticCategory, CategoryAdaptiveState>
  ): DiagnosticQuestion | null {
    const answeredSet = new Set(answeredQuestionIds);
    if (answeredQuestionIds.length >= 15) {
      return null;
    }

    const pool = shuffleArray(diagnosticQuestions);

    // Find category with fewest questions answered so far
    let targetCategory: DiagnosticCategory = ALL_CATEGORIES[0];
    let minCount = Infinity;

    for (const cat of ALL_CATEGORIES) {
      const count = categoryStates[cat]?.questionsAnswered || 0;
      if (count < minCount) {
        minCount = count;
        targetCategory = cat;
      }
    }

    const targetDifficulty = categoryStates[targetCategory]?.currentDifficulty || 'BEGINNER';

    // Try finding exact category + difficulty in randomized pool
    let candidate = pool.find(
      q => q.category === targetCategory && q.difficulty === targetDifficulty && !answeredSet.has(q.id)
    );

    // Fallback to any difficulty in target category
    if (!candidate) {
      candidate = pool.find(
        q => q.category === targetCategory && !answeredSet.has(q.id)
      );
    }

    // Ultimate fallback to any un-answered question in pool
    if (!candidate) {
      candidate = pool.find(q => !answeredSet.has(q.id));
    }

    return candidate || null;
  }
}
