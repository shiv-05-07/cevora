'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { PreferencesForm } from '@/features/onboarding/components/PreferencesForm';

export default function PreferencesPage() {
  const router = useRouter();
  const { state, updateState, nextStep, prevStep } = useOnboarding();

  const handleNext = () => {
    if (!state.learningStyle || !state.difficulty || !state.learningPace) return;
    nextStep();
    router.push('/onboarding/subjects');
  };

  const handleBack = () => {
    prevStep();
    router.push('/onboarding/goal');
  };

  return (
    <div className="max-w-2xl mx-auto w-full pt-10 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">How do you prefer to learn?</h1>
        <p className="text-muted-foreground mt-2">Customize your learning experience.</p>
      </div>

      <PreferencesForm 
        learningStyle={state.learningStyle}
        difficulty={state.difficulty}
        learningPace={state.learningPace}
        dailyReminder={state.dailyReminder}
        onChange={updateState}
      />

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!state.learningStyle || !state.difficulty || !state.learningPace}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
