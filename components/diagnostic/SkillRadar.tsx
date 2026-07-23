'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';

interface SkillScoreItem {
  category: string;
  currentScore: number;
  previousScore?: number;
  accuracy?: number;
}

interface SkillRadarProps {
  skills: SkillScoreItem[];
  title?: string;
}

export function SkillRadar({ skills, title = 'Subject Skill Scores' }: SkillRadarProps) {
  return (
    <Card className="border-border/60 shadow-sm bg-card">
      <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
          <BarChart3 className="w-4 h-4 text-primary" />
          {title}
        </CardTitle>
        <Badge variant="outline" className="text-[10px] font-semibold">
          Live Competency
        </Badge>
      </CardHeader>
      <CardContent className="p-4 space-y-3.5">
        {skills.map((skill, i) => {
          const score = Math.round(skill.currentScore);
          const prev = skill.previousScore ? Math.round(skill.previousScore) : score - 5;
          const trend = score - prev;

          return (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-foreground flex items-center gap-1.5">
                  {skill.category}
                </span>
                <div className="flex items-center gap-2">
                  {trend !== 0 && (
                    <span className={`text-[10px] font-bold ${trend > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                      {trend > 0 ? `+${trend}%` : `${trend}%`}
                    </span>
                  )}
                  <span className="font-extrabold text-primary">{score}%</span>
                </div>
              </div>
              <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
