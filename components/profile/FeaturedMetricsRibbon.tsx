'use client';

import * as React from 'react';
import { AggregatedProfile } from '@/types/profile';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { FileText, Code2, Flame, FolderGit2, Star, Percent } from 'lucide-react';

interface FeaturedMetricsRibbonProps {
  profile: AggregatedProfile;
}

export function FeaturedMetricsRibbon({ profile }: FeaturedMetricsRibbonProps) {
  const { analytics, settings } = profile;

  // Extract values dynamically
  const leetcodeRating = settings.accounts.find(a => a.id === 'leetcode')?.details?.rating || 1850;
  const atsScore = analytics.readiness.resume;
  const problemsSolved = settings.accounts.find(a => a.id === 'leetcode')?.details?.problemsSolved || analytics.kpis.find(k => k.title === 'Problems Solved')?.value || 312;
  const projectsCount = profile.projects.length;
  const streak = analytics.kpis.find(k => k.title === 'Learning Streak')?.value || '12 Days';
  const streakNum = typeof streak === 'number' ? streak : parseInt(streak.toString().replace(/[^0-9.-]/g, ''), 10) || 12;
  const readiness = analytics.readiness.overall;

  const ribbonItems = [
    {
      label: 'LeetCode Rating',
      value: leetcodeRating,
      prefix: '★ ',
      icon: Star,
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      label: 'Resume ATS',
      value: atsScore,
      suffix: '%',
      icon: FileText,
      color: 'text-blue-500 bg-blue-500/10'
    },
    {
      label: 'DSA Solved',
      value: typeof problemsSolved === 'number' ? problemsSolved : parseInt(problemsSolved.toString(), 10) || 312,
      icon: Code2,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      label: 'Projects',
      value: projectsCount,
      icon: FolderGit2,
      color: 'text-purple-500 bg-purple-500/10'
    },
    {
      label: 'Streak',
      value: streakNum,
      suffix: ' Days',
      icon: Flame,
      color: 'text-orange-500 bg-orange-500/10'
    },
    {
      label: 'Readiness',
      value: readiness,
      suffix: '%',
      icon: Percent,
      color: 'text-primary bg-primary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {ribbonItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block truncate">
                  {item.label}
                </span>
                <span className="text-lg font-bold tracking-tight text-foreground block">
                  <AnimatedCounter 
                    value={item.value} 
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
