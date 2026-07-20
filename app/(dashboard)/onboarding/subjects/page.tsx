'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { SubjectSelection } from '@/features/onboarding/components/SubjectSelection';

export default function SubjectsPage() {
  const router = useRouter();
  const { state, updateState, nextStep, prevStep } = useOnboarding();

  const handleNext = () => {
    if (state.subjects.length === 0) return;
    nextStep();
    router.push('/onboarding/schedule');
  };

  const handleBack = () => {
    prevStep();
    router.push('/onboarding/preferences');
  };

  return (
    <div className="max-w-2xl mx-auto w-full pt-10 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">What do you want to learn?</h1>
        <p className="text-muted-foreground mt-2">Select the subjects you want to focus on.</p>
      </div>

      <SubjectSelection 
        selectedSubjects={state.subjects}
        onChange={(subjects) => updateState({ subjects })}
      />

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={state.subjects.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
