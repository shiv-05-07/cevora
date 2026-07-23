'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, AlertTriangle, TrendingUp, Users, ArrowRight } from 'lucide-react';

interface StudentInterventionItem {
  id: string;
  name: string;
  batch: string;
  readinessScore: number;
  weakestTopic: string;
}

interface TeacherCohortSummaryProps {
  avgMastery?: number;
  weakestTopic?: string;
  strongestTopic?: string;
  studentsNeedingHelp?: StudentInterventionItem[];
  onSelectStudent?: (studentId: string) => void;
}

export function TeacherCohortSummary({
  avgMastery = 74,
  weakestTopic = 'Operating Systems (Paging)',
  strongestTopic = 'SQL & Data Modeling',
  studentsNeedingHelp = [
    { id: 'usr_1', name: 'Rohan Gupta', batch: 'CSE 2026', readinessScore: 42, weakestTopic: 'Graph Algorithms' },
    { id: 'usr_2', name: 'Sneha Patel', batch: 'ECE 2026', readinessScore: 48, weakestTopic: 'DBMS Normalization' },
    { id: 'usr_3', name: 'Amit Verma', batch: 'IT 2026', readinessScore: 51, weakestTopic: 'OS Memory Management' }
  ],
  onSelectStudent
}: TeacherCohortSummaryProps) {
  return (
    <div className="space-y-6">
      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/60 shadow-sm bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Cohort Avg. Mastery</span>
              <p className="text-2xl font-extrabold text-primary">{avgMastery}%</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Weakest Cohort Topic</span>
              <p className="text-sm font-bold text-rose-600 dark:text-rose-400 truncate max-w-[160px]">{weakestTopic}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Strongest Topic</span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[160px]">{strongestTopic}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Needs Intervention</span>
              <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{studentsNeedingHelp.length} Students</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Requiring Intervention List */}
      <Card className="border-border/60 shadow-sm bg-card">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Students Requiring Intervention
            </h3>
            <Badge variant="outline" className="text-xs font-semibold">
              Action Priority
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studentsNeedingHelp.map((st) => (
              <div
                key={st.id}
                onClick={() => onSelectStudent?.(st.id)}
                className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 transition-colors cursor-pointer space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{st.name}</span>
                  <Badge variant="outline" className="text-[10px] font-bold bg-amber-500/10 text-amber-600 border-amber-500/30">
                    {st.batch}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Readiness:</span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">{st.readinessScore}%</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-amber-500/20">
                  <span className="text-muted-foreground text-[11px] truncate max-w-[140px]">
                    Weak: {st.weakestTopic}
                  </span>
                  <span className="text-primary font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View Panel <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
