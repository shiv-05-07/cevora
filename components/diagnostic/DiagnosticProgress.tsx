'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, ShieldCheck, Zap } from 'lucide-react';
import { RoadmapDifficulty } from '@prisma/client';

interface DiagnosticProgressProps {
  currentStep: number;
  totalSteps: number;
  category: string;
  difficulty: RoadmapDifficulty;
  timeSpentSeconds: number;
  isAutoSaved?: boolean;
}

export function DiagnosticProgress({
  currentStep,
  totalSteps,
  category,
  difficulty,
  timeSpentSeconds,
  isAutoSaved = true
}: DiagnosticProgressProps) {
  const percentage = Math.min(Math.round((currentStep / totalSteps) * 100), 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: RoadmapDifficulty) => {
    switch (diff) {
      case 'BEGINNER': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30';
      case 'INTERMEDIATE': return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
      case 'ADVANCED': return 'bg-purple-500/10 text-purple-600 border-purple-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4 bg-card/60 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-sm text-foreground">
            Question {currentStep} of {totalSteps}
          </span>
          <Badge variant="outline" className="font-bold text-xs bg-primary/10 text-primary border-primary/20">
            {category}
          </Badge>
          <Badge variant="outline" className={`font-semibold text-xs ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full border border-border/40">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Timer: {formatTime(timeSpentSeconds)}</span>
          </div>

          {isAutoSaved && (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Auto-saved</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
          <span>Assessment Progress</span>
          <span>{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
    </div>
  );
}
