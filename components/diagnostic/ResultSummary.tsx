'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DiagnosticResultSummary } from '@/features/diagnostic/types';
import { Award, Sparkles, Target, Zap, CheckCircle2, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface ResultSummaryProps {
  result: DiagnosticResultSummary;
  onGenerateLearningPath?: () => void;
}

export function ResultSummary({ result, onGenerateLearningPath }: ResultSummaryProps) {
  const getReadinessBadge = (readiness: string) => {
    switch (readiness) {
      case 'PLACEMENT_READY':
        return { label: 'Placement Ready', variant: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' };
      case 'INTERVIEW_READY':
        return { label: 'Interview Ready', variant: 'bg-blue-500/10 text-blue-600 border-blue-500/30' };
      case 'BUILDING_SKILLS':
        return { label: 'Building Skills', variant: 'bg-amber-500/10 text-amber-600 border-amber-500/30' };
      default:
        return { label: 'Needs Foundation', variant: 'bg-rose-500/10 text-rose-600 border-rose-500/30' };
    }
  };

  const badgeInfo = getReadinessBadge(result.placementReadiness);

  return (
    <div className="space-y-6">
      {/* Top Banner Result Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 shadow-md relative overflow-hidden">
        <CardContent className="p-6 sm:p-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={`font-bold text-xs ${badgeInfo.variant}`}>
                  <Award className="w-3.5 h-3.5 mr-1" />
                  {badgeInfo.label}
                </Badge>
                <Badge variant="secondary" className="font-semibold text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" /> Persona: {result.persona}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Diagnostic Assessment Complete
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {result.aiExplanation}
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-card border border-border/60 rounded-2xl shadow-sm text-center min-w-[140px]">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Overall Score</span>
              <span className="text-4xl font-extrabold text-primary my-1">{result.score}%</span>
              <span className="text-[11px] text-muted-foreground font-semibold">{result.accuracy}% Accuracy</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Target className="w-4 h-4 text-primary" />
              <span>Recommended Track: <strong className="text-primary">{result.recommendedRoadmap}</strong></span>
            </div>

            <Link href="/dashboard" onClick={onGenerateLearningPath}>
              <Button size="lg" className="font-bold shadow-md shadow-primary/20">
                Generate Learning Path
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Weak & Strong Concepts Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Concepts Card */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              Top Concepts Needing Revision ({result.weakConcepts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {result.weakConcepts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No major conceptual weaknesses detected!</p>
            ) : (
              result.weakConcepts.map((w, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">{w.concept}</span>
                    <Badge variant="outline" className="text-[10px] font-bold bg-rose-500/10 text-rose-600 border-rose-500/30">
                      {w.severity} ({w.score}%)
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{w.recommendedAction}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Strong Concepts Card */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Strong Foundational Concepts ({result.strongConcepts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {result.strongConcepts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">Keep practicing to build strong concepts!</p>
            ) : (
              result.strongConcepts.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-foreground block">{s.concept}</span>
                    <span className="text-xs text-muted-foreground">{s.category}</span>
                  </div>
                  <Badge variant="outline" className="text-[11px] font-bold bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                    {s.score}% Mastery
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
