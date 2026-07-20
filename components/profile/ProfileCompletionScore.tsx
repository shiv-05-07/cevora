'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AggregatedProfile } from '@/types/profile';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface ProfileCompletionScoreProps {
  profile: AggregatedProfile;
  recruiterMode: boolean;
}

export function ProfileCompletionScore({ profile, recruiterMode }: ProfileCompletionScoreProps) {
  const { profileCompletionScore, remainingTasks } = profile;

  if (recruiterMode) return null; // Hide in recruiter mode

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Profile Completion
          </CardTitle>
          <span className="text-lg font-extrabold text-primary">{profileCompletionScore}%</span>
        </div>
        <Progress value={profileCompletionScore} className="h-2 mt-2 [&_[data-slot=progress-indicator]]:bg-primary" />
      </CardHeader>
      <CardContent className="pt-4">
        {remainingTasks.length > 0 ? (
          <div className="space-y-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Remaining Setup Tasks
            </span>
            <ul className="space-y-2">
              {remainingTasks.map((task, index) => (
                <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-emerald-500 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold">Your portfolio is fully optimized! Ready for recruiters.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
