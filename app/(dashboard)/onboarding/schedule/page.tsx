'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { StudyScheduleForm } from '@/features/onboarding/components/StudyScheduleForm';

export default function SchedulePage() {
  const router = useRouter();
  const { state, updateState, nextStep, prevStep } = useOnboarding();

  const handleNext = () => {
    if (!state.dailyStudyTime || !state.preferredStudyTime) return;
    nextStep();
    router.push('/onboarding/complete');
  };

  const handleBack = () => {
    prevStep();
    router.push('/onboarding/subjects');
  };

  return (
    <div className="max-w-2xl mx-auto w-full pt-10 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Set your study schedule</h1>
        <p className="text-muted-foreground mt-2">Consistency is the key to success.</p>
      </div>

      <StudyScheduleForm 
        dailyStudyTime={state.dailyStudyTime}
        preferredStudyTime={state.preferredStudyTime}
        onChange={updateState}
      />

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!state.dailyStudyTime || !state.preferredStudyTime}
        >
          Review & Complete
        </Button>
      </div>
    </div>
  );
}
