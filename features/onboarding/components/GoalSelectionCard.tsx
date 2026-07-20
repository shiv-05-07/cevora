'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const GOALS = [
  'Crack DSA Interviews',
  'Get Internship',
  'FAANG Preparation',
  'Full Stack Development',
  'AI / ML',
  'Data Science',
  'DevOps',
  'Competitive Programming',
];

interface Props {
  selectedGoals: string[];
  primaryGoal: string | null;
  onChange: (goals: string[], primaryGoal: string | null) => void;
}

export function GoalSelectionCard({ selectedGoals, primaryGoal, onChange }: Props) {
  const toggleGoal = (goal: string) => {
    let next = [...selectedGoals];
    if (next.includes(goal)) {
      next = next.filter(g => g !== goal);
    } else {
      next.push(goal);
    }

    let nextPrimary = primaryGoal;
    if (!next.includes(primaryGoal || '')) {
      nextPrimary = next.length > 0 ? next[0] : null;
    }

    onChange(next, nextPrimary);
  };

  const setPrimary = (goal: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedGoals.includes(goal)) {
      onChange(selectedGoals, goal);
    }
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GOALS.map((goal) => {
          const isSelected = selectedGoals.includes(goal);
          const isPrimary = primaryGoal === goal;

          return (
            <div
              key={goal}
              onClick={() => toggleGoal(goal)}
              className={cn(
                'relative flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-muted/50',
                isSelected ? 'border-primary bg-primary/5' : 'border-border'
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleGoal(goal)}
                className="mt-0.5"
              />
              <div className="flex-1 space-y-1">
                <Label className="font-medium cursor-pointer">{goal}</Label>
                {isSelected && (
                  <div className="mt-2 flex items-center gap-2">
                    {isPrimary ? (
                      <Badge variant="default" className="text-[10px] uppercase">
                        Primary
                      </Badge>
                    ) : (
                      <Badge 
                        variant="secondary" 
                        className="text-[10px] uppercase cursor-pointer hover:bg-secondary/80"
                        onClick={(e) => setPrimary(goal, e)}
                      >
                        Set as Primary
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
