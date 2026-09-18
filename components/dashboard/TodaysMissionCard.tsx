'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Code2,
  RotateCcw,
  Mic2,
  Info,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TodaysMissionData, MissionActivity } from '@/lib/dashboard/dashboardAdapter';
import { cn } from '@/lib/utils';

interface TodaysMissionCardProps {
  mission: TodaysMissionData;
}

export function TodaysMissionCard({ mission }: TodaysMissionCardProps) {
  const [activities, setActivities] = React.useState<MissionActivity[]>(mission.activities);

  React.useEffect(() => {
    setActivities(mission.activities);
  }, [mission.activities]);

  const toggleActivity = (id: string) => {
    setActivities((prev) =>
      prev.map((act) => (act.id === id ? { ...act, completed: !act.completed } : act))
    );
  };

  const completedCount = activities.filter((a) => a.completed).length;
  const progress = mission.status === 'COMPLETED' ? 100 : Math.round((completedCount / activities.length) * 100);

  const getActivityBadge = (type: MissionActivity['type']) => {
    switch (type) {
      case 'learn':
        return <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border-primary/20">Learn</Badge>;
      case 'practice':
        return <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Practice</Badge>;
      case 'review':
        return <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border-amber-500/20">Review</Badge>;
      case 'interview':
        return <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Interview</Badge>;
    }
  };

  return (
    <div className="border border-border/70 rounded-3xl bg-card shadow-sm overflow-hidden space-y-0">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent border-b border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Today's Mission
              </span>
              <Badge variant="outline" className="text-[11px] font-bold border-border/60">
                {mission.reasonTag}
              </Badge>
              {mission.status === 'COMPLETED' && (
                <Badge className="bg-emerald-500 text-white font-bold text-[11px] border-emerald-500/30">
                  Completed ✓
                </Badge>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {mission.title}
            </h2>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-muted-foreground pt-0.5">
              <span className="flex items-center gap-1 text-foreground font-bold">
                <Clock className="w-3.5 h-3.5 text-primary" /> {mission.estimatedMinutes} min session
              </span>
              <span>•</span>
              <span>{activities.length} sequential activities</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href={mission.primaryAction.href}>
              <Button size="lg" className="font-bold shadow-md shadow-primary/20 h-11 px-6 text-sm">
                {mission.primaryAction.label}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 2. WHY THIS MISSION Callout (High Signal & Explainable) */}
        <div className="mt-5 p-4 rounded-2xl bg-background/80 border border-border/60 text-xs sm:text-sm space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Info className="w-4 h-4 text-primary" />
            <span>Why this mission?</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed pl-5">
            {mission.whyThisMission}
          </p>
        </div>
      </div>

      {/* 3. Four Activities (One Coherent Learning Session) */}
      <div className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1">
          <span>Session Progress</span>
          <span className="font-bold text-foreground">
            {completedCount} of {activities.length} completed ({progress}%)
          </span>
        </div>
        <Progress value={progress} className="h-2 mb-6" />

        <div className="space-y-3">
          {activities.map((act, index) => (
            <div
              key={act.id}
              className={cn(
                "flex items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-200",
                act.completed
                  ? "border-emerald-500/20 bg-emerald-500/5 text-muted-foreground"
                  : "border-border/60 bg-card hover:border-primary/40 hover:bg-muted/5 shadow-xs"
              )}
            >
              <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleActivity(act.id)}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-colors cursor-pointer",
                    act.completed
                      ? "bg-emerald-500 text-white"
                      : "border border-border/80 text-muted-foreground/40 hover:border-primary"
                  )}
                  title={act.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {act.completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] font-bold text-muted-foreground">{index + 1}</span>}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    {getActivityBadge(act.type)}
                    <h4 className={cn("text-sm font-bold truncate", act.completed && "line-through text-muted-foreground")}>
                      {act.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                    {act.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Link href={act.href}>
                  <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold hover:text-primary">
                    Open <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
