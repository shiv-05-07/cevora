import { useState, useEffect, useCallback } from 'react';
import { OnboardingState, INITIAL_ONBOARDING_STATE } from '../types';

const STORAGE_KEY = 'cevora_onboarding_progress';

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>(INITIAL_ONBOARDING_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  const updateState = useCallback((updates: Partial<OnboardingState>) => {
    setState(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const nextStep = useCallback(() => {
    updateState({ currentStep: state.currentStep + 1 });
  }, [state.currentStep, updateState]);

  const prevStep = useCallback(() => {
    updateState({ currentStep: Math.max(1, state.currentStep - 1) });
  }, [state.currentStep, updateState]);

  const clearState = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_ONBOARDING_STATE);
  }, []);

  return {
    state,
    isLoaded,
    updateState,
    nextStep,
    prevStep,
    clearState,
  };
}
