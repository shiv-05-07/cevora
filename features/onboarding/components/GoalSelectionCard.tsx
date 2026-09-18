'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle2, Award, Sparkles, Code2, Brain, BarChart3, Server, Terminal, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GOAL_OPTIONS = [
  {
    id: 'Get Internship',
    title: 'Get Internship',
    description: 'Target campus placements and internship screening rounds.',
    icon: Target,
  },
  {
    id: 'Crack DSA Interviews',
    title: 'Crack DSA Interviews',
    description: 'Master data structures, algorithms, and coding assessments.',
    icon: Code2,
  },
  {
    id: 'FAANG Preparation',
    title: 'FAANG Preparation',
    description: 'High-bar problem solving, system design, and technical vivas.',
    icon: Award,
  },
  {
    id: 'Full Stack Development',
    title: 'Full Stack Development',
    description: 'Build production frontend, backend APIs, and web apps.',
    icon: Terminal,
  },
  {
    id: 'AI / ML',
    title: 'AI / ML',
    description: 'Machine learning algorithms, Python vectorization, and models.',
    icon: Brain,
  },
  {
    id: 'Data Science',
    title: 'Data Science',
    description: 'Data wrangling, analytics, SQL aggregations, and statistics.',
    icon: BarChart3,
  },
  {
    id: 'DevOps',
    title: 'DevOps',
    description: 'Cloud infrastructure, Docker containerization, and CI/CD pipelines.',
    icon: Server,
  },
  {
    id: 'Competitive Programming',
    title: 'Competitive Programming',
    description: 'Speed problem-solving and algorithmic contest optimization.',
    icon: Sparkles,
  },
];

interface Props {
  primaryGoal: string | null;
  onChange: (primaryGoal: string) => void;
}

export function GoalSelectionCard({ primaryGoal, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GOAL_OPTIONS.map((goal) => {
          const isSelected = primaryGoal === goal.title;
          const IconComponent = goal.icon;

          return (
            <Card
              key={goal.id}
              onClick={() => onChange(goal.title)}
              className={cn(
                'relative p-5 cursor-pointer transition-all duration-200 border flex flex-col justify-between gap-3 group hover:border-primary/50 hover:shadow-xs',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary/40'
                  : 'border-border/70 bg-card hover:bg-muted/30'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:text-foreground'
                )}>
                  <IconComponent className="w-5 h-5" />
                </div>

                {isSelected ? (
                  <Badge variant="default" className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Selected
                  </Badge>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-border/80 group-hover:border-primary/50 transition-colors" />
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                  {goal.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
