'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DiagnosticResultSummary } from '@/features/diagnostic/types';
import { Award, Sparkles, Target, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle, Compass, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

interface ResultSummaryProps {
  result: DiagnosticResultSummary;
  onGenerateLearningPath?: () => void;
}

export function ResultSummary({ result, onGenerateLearningPath }: ResultSummaryProps) {
  const subjectTitle = result.subjectLabel || 'Subject';
  const startConceptTitle = result.recommendedStartTitle || 'Curriculum Fundamentals';

  return (
    <div className="space-y-6">
      {/* Top Banner Result Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 shadow-md relative overflow-hidden">
        <CardContent className="p-6 sm:p-8 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="font-semibold text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" /> Subject: {subjectTitle}
                </Badge>
                <Badge variant="outline" className="font-semibold text-xs bg-primary/10 text-primary border-primary/30 flex items-center gap-1">
                  <Compass className="w-3 h-3" /> Baseline Complete
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Your {subjectTitle} starting point is ready.
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed font-medium">
                Based on your baseline responses, Cevora has identified where to begin your learning path.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-card border border-border/60 rounded-2xl shadow-sm text-center min-w-[150px]">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Baseline accuracy</span>
              <span className="text-4xl font-extrabold text-primary my-1">{result.score}%</span>
              <span className="text-[11px] text-muted-foreground font-semibold">{result.correctCount} of {result.totalQuestions} Correct</span>
            </div>
          </div>

          {/* Gemini Learning Signal Section */}
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              Learning signal
            </div>
            <p className="text-xs text-foreground leading-relaxed font-medium">
              {result.aiExplanation}
            </p>
          </div>

          {/* 5. RECOMMENDED STARTING POINT (Primary Action Area) */}
          <div className="p-5 rounded-xl border border-primary/30 bg-card shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-primary" />
                  Recommended starting point
                </span>
                <h3 className="text-xl font-extrabold text-foreground">{startConceptTitle}</h3>
                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                  {result.geminiAnalysis?.startingPointRationale || `Your responses suggest this concept is a useful starting point before moving deeper into the ${subjectTitle} roadmap.`}
                </p>
              </div>

              <Link href="/dashboard" onClick={onGenerateLearningPath} className="shrink-0">
                <Button size="lg" className="w-full sm:w-auto font-bold shadow-md shadow-primary/20">
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Concept Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Strong Concepts Card */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Strengths ({result.strongConcepts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {result.strongConcepts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">Initial practice will build baseline strengths!</p>
            ) : (
              result.strongConcepts.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-foreground block">{s.concept}</span>
                    <span className="text-[10px] text-muted-foreground">{s.category}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                    Strong ({s.score}%)
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Needs Attention / Developing Card */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              Areas Needing Attention ({result.weakConcepts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {result.weakConcepts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No major weaknesses detected in baseline questions!</p>
            ) : (
              result.weakConcepts.map((w, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-foreground">{w.concept}</span>
                    <Badge variant="outline" className="text-[10px] font-bold bg-amber-500/10 text-amber-600 border-amber-500/30">
                      {w.score < 50 ? 'Needs Work' : 'Developing'} ({w.score}%)
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">{w.recommendedAction}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Not Assessed Card */}
        <Card className="border-border/60 shadow-sm md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <HelpCircle className="w-4 h-4" />
              Not Assessed ({result.notAssessedConcepts?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {!result.notAssessedConcepts || result.notAssessedConcepts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">All major subject topics were covered in diagnostic.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.notAssessedConcepts.map((na, idx) => (
                  <Badge key={idx} variant="secondary" className="text-[11px] font-normal py-1 px-2 text-muted-foreground">
                    {na.concept}
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-[11px] text-muted-foreground italic pt-2 border-t border-border/30 mt-2">
              Unassessed concepts are not marked 0%. They will be evaluated as you progress through your daily missions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
