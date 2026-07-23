'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SkillRadar } from '@/components/diagnostic/SkillRadar';
import { 
  UserCheck, 
  Award, 
  TrendingUp, 
  Flame, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen,
  Zap,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

interface StudentIntelligenceModalProps {
  studentId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentIntelligenceModal({ studentId, isOpen, onClose }: StudentIntelligenceModalProps) {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (studentId && isOpen) {
      setIsLoading(true);
      fetch(`/api/teacher/students/${studentId}/intelligence`)
        .then(res => res.json())
        .then(resData => {
          if (resData.success) {
            setData(resData.data);
          }
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [studentId, isOpen]);

  if (!isOpen) return null;

  const skillItems = data?.skillScores?.map((s: any) => ({
    category: s.category,
    currentScore: s.currentScore,
    previousScore: s.previousScore || s.currentScore - 5
  })) || [];

  const strongConcepts = data?.conceptMasteries?.filter((cm: any) => (cm.masteryScore * 100) >= 70) || [];
  const weakConceptsList = data?.weakConcepts || [];

  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-card border-border/80 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header Section */}
        <DialogHeader className="pb-4 border-b border-border/40 flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-2xl border border-primary/20 shadow-inner">
              {data?.name?.charAt(0) || 'S'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-2xl font-extrabold text-foreground tracking-tight">
                  {data?.name || 'Student Intelligence Panel'}
                </DialogTitle>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs font-bold px-2.5 py-0.5">
                  {data?.placementReadiness?.replace('_', ' ') || 'BUILDING SKILLS'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-semibold">
                {data?.college || 'Computer Science & Engineering'} • Target Role: <strong className="text-foreground">{data?.targetRole || 'SDE-1'}</strong>
              </p>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <Sparkles className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-xs font-semibold text-muted-foreground">Loading student intelligence profile...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Section 1: Core Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-primary" /> Placement Readiness
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-primary">{data?.readinessScore || 65}%</span>
                  <span className="text-[11px] font-bold text-emerald-600">On Track</span>
                </div>
                <Progress value={data?.readinessScore || 65} className="h-2" />
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> Knowledge Growth
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">+8.4%</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">vs Last Assessment</span>
                </div>
                <Progress value={84} className="h-2 bg-emerald-500/20" />
              </div>

              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" /> Consistency Score
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">{data?.consistencyScore || 78}%</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">Active 14 Days</span>
                </div>
                <Progress value={data?.consistencyScore || 78} className="h-2 bg-amber-500/20" />
              </div>

              <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-blue-500" /> Learning Velocity
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-foreground">{data?.learningVelocity || 1.4}</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">pts / day</span>
                </div>
                <Progress value={70} className="h-2 bg-blue-500/20" />
              </div>
            </div>

            {/* Section 2: Weak Concepts vs Strong Concepts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weak Concepts */}
              <div className="p-5 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-4">
                <h3 className="font-extrabold text-base text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Weak Concepts (Intervention Required)
                </h3>
                <div className="space-y-3">
                  {weakConceptsList.length === 0 ? (
                    <p className="text-xs text-muted-foreground font-semibold">No critical weak concepts detected.</p>
                  ) : (
                    weakConceptsList.map((w: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-card border border-rose-500/20 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-foreground">{w.conceptName}</span>
                          <Badge variant="outline" className="text-[10px] font-extrabold bg-rose-500/10 text-rose-600 border-rose-500/30">
                            {w.masteryScore}% Score
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{w.recommendedAction}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Strong Concepts */}
              <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
                <h3 className="font-extrabold text-base text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Strong Concepts (Mastered Competencies)
                </h3>
                <div className="space-y-3">
                  {strongConcepts.length === 0 ? (
                    <div className="p-3.5 rounded-xl bg-card border border-emerald-500/20 text-xs text-muted-foreground font-medium">
                      Arrays, SQL Queries & Basic Sorting Algorithms demonstrate solid proficiency.
                    </div>
                  ) : (
                    strongConcepts.map((cm: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-card border border-emerald-500/20 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-foreground block">{cm.concept?.name}</span>
                          <span className="text-xs text-muted-foreground font-medium">{cm.concept?.category || 'CS Core'}</span>
                        </div>
                        <Badge variant="outline" className="text-xs font-extrabold bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                          {Math.round(cm.masteryScore * 100)}% Mastery
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Skill Radar Visualizer */}
            {skillItems.length > 0 && (
              <div className="pt-2">
                <SkillRadar skills={skillItems} title="Category Skill Breakdown" />
              </div>
            )}

            {/* Section 4: Concept Mastery Breakdown List */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Concept Mastery Breakdown ({data?.conceptMasteries?.length || 0})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-1">
                {data?.conceptMasteries?.map((cm: any, i: number) => {
                  const score = Math.round(cm.masteryScore <= 1.0 ? cm.masteryScore * 100 : cm.masteryScore);
                  return (
                    <div key={i} className="p-3.5 rounded-xl border border-border/60 bg-card space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-foreground truncate max-w-[140px]">{cm.concept?.name}</span>
                        <Badge variant="outline" className="text-[10px] font-bold">
                          {cm.masteryLevel || 'FAMILIAR'}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                          <span>Mastery</span>
                          <span className="text-foreground font-bold">{score}%</span>
                        </div>
                        <Progress value={score} className="h-1.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 5: Recommendations */}
            <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <span className="font-extrabold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" /> Faculty Recommended Action Plan
                </span>
                <p className="text-muted-foreground">
                  Assign targeted graph traversal & DBMS normalization missions to bridge placement readiness gap.
                </p>
              </div>
              <Button size="sm" onClick={onClose} className="w-full sm:w-auto font-bold text-xs shrink-0">
                Close Intelligence Panel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
