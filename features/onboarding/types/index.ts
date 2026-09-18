export interface OnboardingState {
  currentStep: number;
  goals: string[];
  primaryGoal: string | null;
  primarySubject: string | null;
  subjects: string[];
}

export const INITIAL_ONBOARDING_STATE: OnboardingState = {
  currentStep: 1,
  goals: [],
  primaryGoal: null,
  primarySubject: null,
  subjects: [],
};
