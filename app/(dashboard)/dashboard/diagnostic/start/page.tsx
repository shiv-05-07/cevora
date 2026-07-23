'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDiagnosticStore } from '@/store/useDiagnosticStore';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { 
  Sparkles, 
  Clock, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  BrainCircuit, 
  HelpCircle 
} from 'lucide-react';
import { DiagnosticStatus } from '@prisma/client';

export default function DiagnosticStartPage() {
  const router = useRouter();
  const { status, fetchStatus, startDiagnostic, isLoading } = useDiagnosticStore();

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    if (status === DiagnosticStatus.LOCKED || status === DiagnosticStatus.COMPLETED) {
      router.replace('/dashboard/diagnostic/result');
    }
  }, [status, router]);

  const handleBegin = async () => {
    const attemptId = await startDiagnostic();
    if (attemptId) {
      router.push('/dashboard/diagnostic/question');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <PageHeader
        title="Placement Diagnostic Assessment"
        description="Establish your placement readiness baseline, identify weak concepts across CS core subjects, and activate your AI Learner Model."
      />

      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card shadow-lg relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <CardContent className="p-6 sm:p-8 space-y-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Adaptive Assessment Engine
              </Badge>
              <Badge variant="outline" className="text-xs font-semibold">
                Version 2.0
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Why the Diagnostic Assessment Matters
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cevora uses deterministic adaptive testing to construct your continuous <strong>Knowledge State</strong>. Instead of static quizzes, question difficulty automatically adapts independently per subject category based on your answers.
            </p>
          </div>

          {/* Assessment Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-border/50 bg-card space-y-1.5">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-sm text-foreground">Estimated Time</h3>
              <p className="text-xs text-muted-foreground">15 Minutes • Auto-saved per answer</p>
            </div>

            <div className="p-4 rounded-xl border border-border/50 bg-card space-y-1.5">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-sm text-foreground">15 Questions</h3>
              <p className="text-xs text-muted-foreground">9 Categories (DSA, DBMS, OS, SQL, etc.)</p>
            </div>

            <div className="p-4 rounded-xl border border-border/50 bg-card space-y-1.5">
              <BrainCircuit className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-sm text-foreground">Adaptive Progression</h3>
              <p className="text-xs text-muted-foreground">Category-specific difficulty escalation</p>
            </div>

            <div className="p-4 rounded-xl border border-border/50 bg-card space-y-1.5">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-sm text-foreground">No Negative Marking</h3>
              <p className="text-xs text-muted-foreground">Select your best answer without penalty</p>
            </div>
          </div>

          {/* Instructions List */}
          <div className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border/40 text-xs text-muted-foreground">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Rules & Expectations
            </h4>
            <ul className="space-y-2 list-disc list-inside leading-relaxed font-medium">
              <li>Once started, you can navigate back and forth between questions before submitting.</li>
              <li>Your answers are saved continuously so progress is never lost.</li>
              <li>Upon completion, your diagnostic baseline is locked to prevent unauthorized retakes.</li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Target className="w-4 h-4 text-primary" />
              <span>Placement Baseline Readiness Assessment</span>
            </div>

            <Button
              size="lg"
              disabled={isLoading}
              onClick={handleBegin}
              className="w-full sm:w-auto font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              {isLoading ? 'Initializing Engine...' : 'Begin Assessment'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
