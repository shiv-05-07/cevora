'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { GoalSelectionCard } from '@/features/onboarding/components/GoalSelectionCard';
import { ArrowRight, Target } from 'lucide-react';

export default function GoalPage() {
  const router = useRouter();
  const { state, updateState, nextStep } = useOnboarding();

  const primaryGoal = state.primaryGoal || (state.goals.length > 0 ? state.goals[0] : null);

  const handleNext = () => {
    if (!primaryGoal) return;
    updateState({
      primaryGoal,
      goals: [primaryGoal],
      currentStep: 1,
    });
    router.push('/onboarding/subjects');
  };

  return (
    <div className="max-w-2xl mx-auto w-full pt-6 pb-20 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
          <Target className="w-3.5 h-3.5" />
          <span>Step 1 of 2</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          What is your primary learning goal?
        </h1>
        <p className="text-sm sm:text-base font-medium text-muted-foreground leading-relaxed">
          Select the primary career outcome or target role you want Cevora to help you achieve.
        </p>
      </div>

      {/* Goal Selection Cards */}
      <GoalSelectionCard
        primaryGoal={primaryGoal}
        onChange={(goal) =>
          updateState({
            primaryGoal: goal,
            goals: [goal],
          })
        }
      />

      {/* Footer Navigation */}
      <div className="flex items-center justify-end pt-4 border-t border-border/40">
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!primaryGoal}
          className="font-extrabold text-xs sm:text-sm h-11 px-6 gap-2 shadow-xs"
        >
          <span>Continue to Subject Selection</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  );
}
