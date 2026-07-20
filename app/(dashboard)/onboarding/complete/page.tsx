'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function CompletePage() {
  const router = useRouter();
  const { state, clearState, prevStep } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save onboarding data.');
      }

      clearState();
      // Onboarding complete, redirect to dashboard.
      // RouteGuard will now allow access to dashboard since onboardingCompleted is true on the backend.
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full pt-16 pb-20 text-center">
      <div className="mb-8 flex flex-col items-center justify-center">
        <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">You're all set!</h1>
        <p className="text-muted-foreground mt-2">
          We've customized your learning profile based on your preferences.
        </p>
      </div>

      <Card className="p-6 bg-muted/50 border-border mb-8 text-left">
        <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">Your Plan</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between">
            <span className="text-muted-foreground">Primary Goal</span>
            <span className="font-medium text-right">{state.primaryGoal || 'Not set'}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Pace & Style</span>
            <span className="font-medium text-right">{state.learningPace || 'Normal'} / {state.learningStyle || 'Mixed'}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Subjects</span>
            <span className="font-medium text-right">{state.subjects.length} selected</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Commitment</span>
            <span className="font-medium text-right">{state.dailyStudyTime} min/day ({state.preferredStudyTime})</span>
          </li>
        </ul>
      </Card>

      {error && (
        <div className="mb-6 p-4 rounded-md bg-destructive/10 text-destructive text-sm text-left">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" onClick={() => { prevStep(); router.push('/onboarding/schedule'); }} disabled={isSubmitting} className="w-full sm:w-auto">
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enter Dashboard
        </Button>
      </div>
    </div>
  );
}
