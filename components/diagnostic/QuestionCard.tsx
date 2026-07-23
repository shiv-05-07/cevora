'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DiagnosticQuestion } from '@/features/diagnostic/types';
import { Code2, HelpCircle, FileText, BrainCircuit } from 'lucide-react';

interface QuestionCardProps {
  question: DiagnosticQuestion;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const getIcon = () => {
    switch (question.questionType) {
      case 'Code Output': return Code2;
      case 'Logical': return BrainCircuit;
      case 'Scenario': return FileText;
      default: return HelpCircle;
    }
  };

  const IconComponent = getIcon();

  return (
    <Card className="border-border/60 shadow-sm bg-card relative overflow-hidden">
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Concept: {question.concept}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs font-semibold">
            {question.questionType}
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold tracking-tight text-foreground pt-3 leading-snug">
          {question.question}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        {question.codeSnippet && (
          <div className="my-3 p-4 rounded-xl bg-slate-950 text-slate-100 dark:bg-zinc-950 dark:text-zinc-100 font-mono text-sm overflow-x-auto border border-slate-800 shadow-inner">
            <pre className="whitespace-pre-wrap">{question.codeSnippet}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
