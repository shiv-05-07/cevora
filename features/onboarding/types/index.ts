import { LearningPace, LearningStyle, RoadmapDifficulty } from '@prisma/client';

export interface OnboardingState {
  currentStep: number;
  goals: string[];
  primaryGoal: string | null;
  learningStyle: LearningStyle | null;
  difficulty: RoadmapDifficulty | null;
  learningPace: LearningPace | null;
  dailyReminder: boolean;
  subjects: string[];
  dailyStudyTime: number; // minutes
  preferredStudyTime: string;
}

export const INITIAL_ONBOARDING_STATE: OnboardingState = {
  currentStep: 1,
  goals: [],
  primaryGoal: null,
  learningStyle: null,
  difficulty: null,
  learningPace: null,
  dailyReminder: false,
  subjects: [],
  dailyStudyTime: 30,
  preferredStudyTime: 'Morning',
};
