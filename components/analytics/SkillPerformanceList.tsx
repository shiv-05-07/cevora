'use client';

import * as React from 'react';
import { SkillPerformanceItem } from '@/features/analytics/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { EmptyState } from './EmptyState';
import { Layers, ChevronRight, Calendar, Target } from 'lucide-react';
import Link from 'next/link';

interface SkillPerformanceListProps {
  skills: SkillPerformanceItem[];
}

export function SkillPerformanceList({ skills }: SkillPerformanceListProps) {
  return (
    <Card className="border border-border/60 shadow-sm h-full flex flex-col justify-between">
      <div>
        <CardHeader className="pb-4 border-b border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <span>Skill & Topic Performance</span>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Evaluated mastery scores derived from your practice history
              </CardDescription>
            </div>
            <Link href="/concepts">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-8 px-2.5">
                Explore Concepts
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {skills.length === 0 ? (
            <EmptyState
              icon={Layers}
              title="No skill data recorded yet"
              description="Complete diagnostic assessments or solve topic questions to start building your skill profile."
              actionLabel="Take Diagnostic"
              actionHref="/onboarding"
              className="border-none shadow-none"
            />
          ) : (
            <div className="space-y-5">
              {skills.map((skill) => (
                <Link
                  key={skill.id}
                  href={`/concepts`}
                  className="block group"
                >
                  <div className="space-y-2 p-3 rounded-xl transition-all duration-200 hover:bg-muted/40 border border-transparent hover:border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                          {skill.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-foreground">
                          {skill.score}%
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <Progress
                      value={skill.score}
                      className="h-2 bg-muted/60"
                    />

                    {/* Meta info row */}
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3 text-muted-foreground/70" />
                          {skill.attempts} attempt{skill.attempts === 1 ? '' : 's'}
                        </span>
                        <span>•</span>
                        <span>Accuracy: {skill.accuracy}%</span>
                      </div>
                      {skill.lastPracticed && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground/70" />
                          {new Date(skill.lastPracticed).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
