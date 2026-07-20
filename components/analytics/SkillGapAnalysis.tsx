'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { SkillGap } from '@/types/analytics';
import { AlertTriangle, TrendingUp, Building, ArrowRight, ArrowDownToDot, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function SkillGapAnalysis({ skillGaps }: { skillGaps: SkillGap[] }) {
  if (!skillGaps || skillGaps.length === 0) return null;

  return (
    <section className="space-y-4 mt-8">
      <div className="flex items-center gap-2 mb-2">
        <ArrowDownToDot className="w-5 h-5 text-destructive" />
        <h2 className="text-xl font-bold tracking-tight">Critical Skill Gaps</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillGaps.map((gap, index) => {
          const isHighPriority = gap.priority === 'High';

          return (
            <Card 
              key={gap.id} 
              className={`bg-card shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-[2px] ${isHighPriority ? 'border-destructive/40 hover:border-destructive/50' : 'border-border/50 hover:border-border/60'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      {gap.skill}
                      {isHighPriority && (
                        <Badge variant="destructive" className="bg-destructive/10 text-destructive border-0 text-[10px] px-1.5 py-0">
                          <AlertTriangle className="w-3 h-3 mr-1" /> HIGH
                        </Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{gap.whyItMatters}</p>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <div className="text-2xl font-bold text-destructive">
                      -{gap.gap}%
                    </div>
                    <div className="text-xs text-muted-foreground">Gap to target</div>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-3 mb-4 flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-sm font-semibold">{gap.currentScore}%</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Current</div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground opacity-50" />
                  <div className="text-center">
                    <div className="text-sm font-semibold">{gap.requiredScore}%</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Required</div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center mb-2">
                    <Building className="w-3 h-3 mr-1" /> Blocking Companies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {gap.companiesAffected.map(company => (
                      <Badge key={company} variant="outline" className="text-[10px] text-muted-foreground border-border/50 bg-background/50">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Est. Time to Fix</span>
                    <span className="text-xs font-medium flex items-center text-foreground">
                      <Clock className="w-3 h-3 mr-1 text-primary" /> {gap.estimatedImprovementTime}
                    </span>
                  </div>
                  <Link 
                    href={gap.recommendedModule.href}
                    className={cn(buttonVariants({ variant: isHighPriority ? "default" : "secondary", size: "sm" }), "text-xs h-8 group")}
                  >
                    Open {gap.recommendedModule.name}
                    <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
