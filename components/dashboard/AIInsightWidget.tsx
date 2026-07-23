'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { DashboardInsights } from '@/store/useKnowledgeStore';

interface AIInsightWidgetProps {
  insights: DashboardInsights | null;
}

export function AIInsightWidget({ insights }: AIInsightWidgetProps) {
  if (!insights) {
    return (
      <Card className="border-border/60 shadow-sm bg-card animate-pulse">
        <CardContent className="p-6 h-48 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Loading AI Insights...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card shadow-sm relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/15 rounded-full blur-2xl pointer-events-none" />
      <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-extrabold flex items-center gap-2 text-foreground">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Insight Engine
        </CardTitle>
        <Badge 
          variant="outline" 
          className={
            insights.diagnosticCompleted 
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px] font-bold flex items-center gap-1"
              : "bg-amber-500/10 text-amber-600 border-amber-500/30 text-[10px] font-bold"
          }
        >
          {insights.diagnosticCompleted ? (
            <>
              <ShieldCheck className="w-3 h-3" /> Locked
            </>
          ) : (
            'Diagnostic Pending'
          )}
        </Badge>
      </CardHeader>

      <CardContent className="p-5 space-y-4 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {/* Today's Focus */}
          <div className="p-3 rounded-xl bg-card border border-border/50 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3 h-3 text-primary" /> Today's Focus
            </span>
            <p className="font-bold text-xs text-foreground truncate">{insights.todaysFocus}</p>
          </div>

          {/* Weakest Skill */}
          <div className="p-3 rounded-xl bg-card border border-border/50 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-500" /> Weakest Skill
            </span>
            <p className="font-bold text-xs text-rose-600 dark:text-rose-400 truncate">{insights.weakestSkill}</p>
          </div>

          {/* Knowledge Growth */}
          <div className="p-3 rounded-xl bg-card border border-border/50 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" /> Knowledge Growth
            </span>
            <p className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">{insights.knowledgeGrowth}</p>
          </div>

          {/* Status */}
          <div className="p-3 rounded-xl bg-card border border-border/50 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-500" /> Readiness Status
            </span>
            <p className="font-bold text-xs text-foreground truncate">{insights.placementReadiness.replace('_', ' ')}</p>
          </div>
        </div>

        {/* Next Recommendation Action Card */}
        <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary flex items-center gap-1">
              <Compass className="w-3 h-3" /> Next Recommendation
            </span>
            <p className="text-xs font-bold text-foreground">{insights.nextRecommendation}</p>
          </div>

          <Link href="/dashboard/concepts" className="w-full sm:w-auto">
            <Button size="sm" className="w-full sm:w-auto text-xs font-bold shadow-sm">
              Explore Concept Mastery
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
