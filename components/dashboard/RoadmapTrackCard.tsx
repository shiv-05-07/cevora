'use client';

import * as React from 'react';
import Link from 'next/link';
import { Map, ArrowRight, CheckCircle2, Circle, Compass, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoadmapFocusData } from '@/lib/dashboard/dashboardAdapter';
import { cn } from '@/lib/utils';

interface RoadmapTrackCardProps {
  roadmap: RoadmapFocusData;
}

export function RoadmapTrackCard({ roadmap }: RoadmapTrackCardProps) {
  return (
    <div className="border border-border/70 rounded-3xl bg-card shadow-sm p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5" /> Learning Path
            </span>
            <span className="text-xs text-muted-foreground font-semibold">· Goal: {roadmap.goal}</span>
          </div>
          <h3 className="font-extrabold text-base sm:text-lg text-foreground">
            {roadmap.trackTitle}
          </h3>
        </div>

        <Link href={roadmap.personalizedRoadmapHref} className="shrink-0">
          <Button variant="outline" size="sm" className="font-bold text-xs h-9">
            <span>{roadmap.subjectKey ? 'View Your Roadmap' : 'Select Subject'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>

      {/* Sequential Progression Stepper */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {roadmap.steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isFocus = step.isFocus;

            return (
              <div
                key={step.id}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between min-h-[90px]",
                  isFocus
                    ? "border-primary/60 bg-primary/10 ring-2 ring-primary/20 shadow-sm"
                    : isCompleted
                    ? "border-emerald-500/30 bg-emerald-500/5 text-muted-foreground"
                    : "border-border/40 bg-muted/5 text-muted-foreground/80"
                )}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">
                    0{idx + 1}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : isFocus ? (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                    </span>
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                  )}
                </div>

                <div>
                  <span className={cn("text-xs font-bold leading-tight block", isFocus ? "text-foreground font-black" : isCompleted ? "text-foreground/80" : "text-muted-foreground")}>
                    {step.title}
                  </span>
                  {isFocus && (
                    <Badge variant="secondary" className="mt-1.5 text-[9px] uppercase font-black tracking-wider bg-primary text-primary-foreground px-1.5 py-0">
                      Current Focus
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground border-t border-border/30 gap-2">
        <span className="font-semibold text-foreground flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Today's Mission directly advances: <strong className="text-primary">{roadmap.currentModule}</strong>
        </span>
        <span>Next target track: <strong className="text-foreground">{roadmap.nextModule}</strong></span>
      </div>
    </div>
  );
}
