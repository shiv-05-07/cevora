'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { useProfileStore } from '@/store/useProfileStore';
import { CheckCircle2, Loader2, Target, BookOpen, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function CompletePage() {
  const router = useRouter();
  const { state, clearState } = useOnboarding();
  const { setProfile } = useProfileStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const primaryGoal = state.primaryGoal || (state.goals.length > 0 ? state.goals[0] : 'Get Internship');
  const primarySubject = state.primarySubject || (state.subjects.length > 0 ? state.subjects[0] : 'DSA');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        goals: [primaryGoal],
        primaryGoal,
        subjects: [primarySubject],
        primarySubject,
      };

      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save onboarding data.');
      }

      // Sync local profile store so dashboard immediately has access to preferredSubjects & learningGoals
      setProfile({
        onboardingCompleted: true,
        learningGoals: [primaryGoal],
        preferredSubjects: [primarySubject],
      });

      clearState();

      // Navigate to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error('Onboarding submit error:', err);
      setError(err.message || 'An error occurred while saving your onboarding setup.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full pt-8 pb-20 space-y-8 text-center sm:text-left">
      {/* Header */}
      <div className="space-y-3 flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          You&apos;re all set!
        </h1>
        <p className="text-sm sm:text-base font-medium text-muted-foreground leading-relaxed max-w-md">
          We&apos;ve configured your Cevora learning journey around your primary goal and focus subject.
        </p>
      </div>

      {/* Summary Card - ONLY Relevant Info */}
      <Card className="p-6 bg-card border-border/80 shadow-2xs space-y-5 rounded-2xl">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            Your Initial Setup
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" /> Ready
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-muted-foreground">
              <Target className="w-4 h-4 text-primary shrink-0" />
              <span>Primary Goal</span>
            </div>
            <span className="font-extrabold text-sm sm:text-base text-foreground text-right">
              {primaryGoal}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-muted-foreground">
              <BookOpen className="w-4 h-4 text-primary shrink-0" />
              <span>Focus Subject</span>
            </div>
            <span className="font-extrabold text-sm sm:text-base text-foreground text-right">
              {primarySubject}
            </span>
          </div>
        </div>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold animate-in fade-in">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push('/onboarding/subjects')}
          disabled={isSubmitting}
          className="w-full sm:w-auto font-bold text-xs sm:text-sm h-11 px-5 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Subject</span>
        </Button>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto font-extrabold text-xs sm:text-sm h-11 px-8 gap-2 shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Configuring Journey...</span>
            </>
          ) : (
            <>
              <span>Enter Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

    </div>
  );
}
