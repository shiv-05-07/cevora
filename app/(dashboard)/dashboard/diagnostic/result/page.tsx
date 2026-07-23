'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDiagnosticStore } from '@/store/useDiagnosticStore';
import { useKnowledgeStore } from '@/store/useKnowledgeStore';
import { ResultSummary } from '@/components/diagnostic/ResultSummary';
import { SkillRadar } from '@/components/diagnostic/SkillRadar';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function DiagnosticResultPage() {
  const router = useRouter();
  const { result, isLoading, fetchStatus, fetchResult } = useDiagnosticStore();
  const { fetchDashboardInsights } = useKnowledgeStore();
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  useEffect(() => {
    fetchStatus();
    fetchDashboardInsights();
    fetchResult().finally(() => setHasAttemptedFetch(true));
  }, [fetchStatus, fetchDashboardInsights, fetchResult]);

  const handleGenerateLearningPath = () => {
    router.push('/dashboard');
  };

  if (isLoading || !hasAttemptedFetch) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="text-sm font-semibold text-muted-foreground">Loading placement diagnostic evaluation report...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-3xl mx-auto py-12 space-y-6">
        <PageHeader
          title="Diagnostic Report"
          description="No completed diagnostic assessment record was found for your account."
        />

        <Card className="border-amber-500/30 bg-amber-500/5 shadow-sm text-center">
          <CardContent className="p-8 space-y-4">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-foreground">Diagnostic Assessment Required</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                You have not completed your placement diagnostic assessment yet. Take the 15-question adaptive assessment to generate your personalized AI learner report.
              </p>
            </div>

            <Button
              onClick={() => router.push('/dashboard/diagnostic/start')}
              className="font-bold shadow-md shadow-primary/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Diagnostic Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const skillItems = Object.values(result.categoryScores).map(cs => ({
    category: cs.category,
    currentScore: cs.score,
    previousScore: cs.score - cs.trend
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <PageHeader
        title="Placement Readiness Diagnostic Report"
        description="Your AI Learner Model has evaluated your attempt. Here is your comprehensive skill analysis, persona classification, and target roadmap."
      />

      <ResultSummary
        result={result}
        onGenerateLearningPath={handleGenerateLearningPath}
      />

      <div className="pt-2">
        <SkillRadar skills={skillItems} title="Category Skill Breakdown" />
      </div>
    </div>
  );
}
