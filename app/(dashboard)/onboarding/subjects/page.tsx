'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { SubjectSelection } from '@/features/onboarding/components/SubjectSelection';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

export default function SubjectsPage() {
  const router = useRouter();
  const { state, updateState } = useOnboarding();

  const primarySubject = state.primarySubject || (state.subjects.length > 0 ? state.subjects[0] : null);

  const handleNext = () => {
    if (!primarySubject) return;
    updateState({
      primarySubject,
      subjects: [primarySubject],
      currentStep: 2,
    });
    router.push('/onboarding/complete');
  };

  const handleBack = () => {
    router.push('/onboarding/goal');
  };

  return (
    <div className="max-w-2xl mx-auto w-full pt-6 pb-20 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Step 2 of 2</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          What do you want to focus on?
        </h1>
        <p className="text-sm sm:text-base font-medium text-muted-foreground leading-relaxed">
          Choose one subject to personalize your initial roadmap and daily missions.
        </p>
      </div>

      {/* Subject Selection Grid */}
      <SubjectSelection
        selectedSubject={primarySubject}
        onChange={(subject) =>
          updateState({
            primarySubject: subject,
            subjects: [subject],
          })
        }
      />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        <Button
          variant="outline"
          size="lg"
          onClick={handleBack}
          className="font-bold text-xs sm:text-sm h-11 px-5 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Goals</span>
        </Button>

        <Button
          size="lg"
          onClick={handleNext}
          disabled={!primarySubject}
          className="font-extrabold text-xs sm:text-sm h-11 px-6 gap-2 shadow-xs"
        >
          <span>Continue to Confirmation</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  );
}
