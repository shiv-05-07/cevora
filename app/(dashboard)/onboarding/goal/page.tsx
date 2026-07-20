'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { GoalSelectionCard } from '@/features/onboarding/components/GoalSelectionCard';

export default function GoalPage() {
  const router = useRouter();
  const { state, updateState, nextStep } = useOnboarding();

  const handleNext = () => {
    if (state.goals.length === 0 || !state.primaryGoal) return;
    nextStep();
    router.push('/onboarding/preferences');
  };

  return (
    <div className="max-w-2xl mx-auto w-full pt-10 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">What are your learning goals?</h1>
        <p className="text-muted-foreground mt-2">Select all that apply and pick a primary goal.</p>
      </div>

      <GoalSelectionCard 
        selectedGoals={state.goals} 
        primaryGoal={state.primaryGoal}
        onChange={(goals, primary) => updateState({ goals, primaryGoal: primary })}
      />

      <div className="mt-8 flex justify-end">
        <Button onClick={handleNext} disabled={state.goals.length === 0 || !state.primaryGoal}>
          Continue
        </Button>
      </div>
    </div>
  );
}
