'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  Map,
  FileSearch,
  Bot,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { UserProfile } from '@/store/useProfileStore';
import { getSubjectCurriculum } from '@/lib/learning/curriculum/subjectCurriculum';

interface PreBaselineDashboardProps {
  profile: Partial<UserProfile>;
  diagnosticStatus: string;
}

export function PreBaselineDashboard({ profile, diagnosticStatus }: PreBaselineDashboardProps) {
  const firstName = profile.name ? profile.name.split(' ')[0] : 'Student';
  const targetRole = profile.targetRole || profile.learningGoals?.[0] || 'Software Engineering Placement';
  const subjects = profile.preferredSubjects && profile.preferredSubjects.length > 0
    ? profile.preferredSubjects
    : ['DSA', 'DBMS', 'Operating Systems', 'System Design'];
  const dailyMinutes = profile.dailyGoalMinutes || 60;
  const pace = profile.learningPace || 'NORMAL';

  const isAttemptInProgress = diagnosticStatus === 'IN_PROGRESS';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
      {/* 1. Header & Progression Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome, {firstName}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-medium mt-1">
            Your onboarding profile is saved. Establish your baseline to unlock your daily learning missions.
          </p>
        </div>

        {/* Adaptive Loop Stepper */}
        <div className="p-3 sm:p-4 rounded-xl border border-border/50 bg-card/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-500 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Onboarding</span>
          </div>
          <span className="text-muted-foreground/40 hidden sm:inline">→</span>

          <div className="flex items-center gap-2 text-primary font-bold bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
            <Target className="w-3.5 h-3.5" />
            <span>2. Baseline Assessment (Action Required)</span>
          </div>
          <span className="text-muted-foreground/40 hidden sm:inline">→</span>

          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <Compass className="w-4 h-4" />
            <span>3. Personalized Roadmap</span>
          </div>
          <span className="text-muted-foreground/40 hidden sm:inline">→</span>

          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <Sparkles className="w-4 h-4" />
            <span>4. Daily Missions</span>
          </div>
        </div>
      </div>

      {/* 2. Dominant Hero CTA Card */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent shadow-md relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <CardContent className="p-6 sm:p-8 space-y-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider px-2.5 py-0.5">
                  Starting Point
                </Badge>
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> ~8–10 mins · Concept Baseline
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Your learning plan is ready.
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Complete a short baseline assessment so Cevora can understand your starting point and personalize your learning path. We evaluate core concept mastery to ensure you never waste time studying concepts you have already mastered.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link href="/dashboard/diagnostic/start" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto font-bold shadow-lg shadow-primary/20 text-sm h-12 px-6">
                  {isAttemptInProgress ? 'Resume Baseline' : 'Start Baseline'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Onboarding Goal & Commitment Recap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Goal Card */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Target className="w-4 h-4 text-primary" />
            Target Placement Goal
          </div>
          <div>
            <h3 className="text-base font-extrabold text-foreground">{targetRole}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Target Companies: {profile.targetCompany || 'Top Tech & Product Firms'}
            </p>
          </div>
        </div>

        {/* Selected Subjects */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            Curriculum Subjects
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {subjects.map((sub, i) => (
              <Badge key={i} variant="secondary" className="font-semibold text-xs py-0.5 px-2">
                {sub}
              </Badge>
            ))}
          </div>
        </div>

        {/* Commitment */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Clock className="w-4 h-4 text-amber-500" />
            Study Schedule
          </div>
          <div>
            <h3 className="text-base font-extrabold text-foreground">{dailyMinutes} mins / day</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Pace: {pace.charAt(0).toUpperCase() + pace.slice(1).toLowerCase()} · Daily microlearning sessions
            </p>
          </div>
        </div>
      </div>

      {/* 4. Curriculum Preview (Transparent & Honest - Dynamic from Active Subject) */}
      <div className="p-6 rounded-2xl border border-border/60 bg-card/40 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Target Curriculum Track</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Curriculum modules activate and adapt once your baseline results are recorded.
            </p>
          </div>
          <Badge variant="outline" className="w-fit text-xs text-muted-foreground border-border/60">
            Pending Baseline Assessment
          </Badge>
        </div>

        {(() => {
          const curriculum = getSubjectCurriculum(profile.preferredSubjects);
          const steps = curriculum?.roadmapSteps || [];

          if (steps.length === 0) {
            return null;
          }

          // Group steps into 3 preview columns
          const col1 = steps.slice(0, 3);
          const col2 = steps.slice(3, 6);
          const col3 = steps.slice(6, 9);
          const groups = [
            { track: `${curriculum?.label} - Part 1`, steps: col1 },
            { track: `${curriculum?.label} - Part 2`, steps: col2 },
            { track: `${curriculum?.label} - Part 3`, steps: col3 },
          ].filter(g => g.steps.length > 0);

          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {groups.map((g, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border/40 bg-muted/5 space-y-3">
                  <span className="font-bold text-sm text-foreground block">{g.track}</span>
                  <ul className="space-y-1.5">
                    {g.steps.map((step, j) => (
                      <li key={j} className="text-xs flex items-center justify-between text-muted-foreground font-medium">
                        <span className="truncate max-w-[180px]">{step.title}</span>
                        <span className="text-[10px] text-muted-foreground/60 italic shrink-0">Not assessed</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* 5. Quick Access Tools (Non-distracting secondary tools) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Platform Preparation Tools
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/resume" className="group">
            <div className="p-4 rounded-xl border border-border/50 bg-card hover:border-primary/40 transition-colors flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileSearch className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block truncate">
                  Resume Analyzer
                </span>
                <span className="text-[11px] text-muted-foreground block truncate">
                  ATS score & suggestions
                </span>
              </div>
            </div>
          </Link>

          <Link href="/roadmaps" className="group">
            <div className="p-4 rounded-xl border border-border/50 bg-card hover:border-primary/40 transition-colors flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Map className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block truncate">
                  Placement Roadmaps
                </span>
                <span className="text-[11px] text-muted-foreground block truncate">
                  Role-specific curricula
                </span>
              </div>
            </div>
          </Link>

          <Link href="/mentor" className="group">
            <div className="p-4 rounded-xl border border-border/50 bg-card hover:border-primary/40 transition-colors flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block truncate">
                  AI Study Mentor
                </span>
                <span className="text-[11px] text-muted-foreground block truncate">
                  Ask career questions
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
