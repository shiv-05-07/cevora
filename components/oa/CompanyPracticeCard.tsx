import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface CompanyPracticeCardProps {
  id: string;
  name: string;
  logoLetter: string;
  logoGradient: string;
  totalQuestions: number;
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  onPractice?: (id: string) => void;
}

export function CompanyPracticeCard({
  id,
  name,
  logoLetter,
  logoGradient,
  totalQuestions,
  difficulty,
  onPractice,
}: CompanyPracticeCardProps) {
  return (
    <Card className="group transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/30">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-inner select-none bg-gradient-to-br',
                logoGradient
              )}
            >
              {logoLetter}
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">
                {totalQuestions} Questions
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          {difficulty.easy > 0 && (
            <StatusBadge status="success" className="px-2 py-0.5 text-[10px]">
              {difficulty.easy} Easy
            </StatusBadge>
          )}
          {difficulty.medium > 0 && (
            <StatusBadge status="warning" className="px-2 py-0.5 text-[10px]">
              {difficulty.medium} Med
            </StatusBadge>
          )}
          {difficulty.hard > 0 && (
            <StatusBadge status="danger" className="px-2 py-0.5 text-[10px]">
              {difficulty.hard} Hard
            </StatusBadge>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full h-8 text-xs font-semibold group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
          onClick={() => onPractice?.(id)}
        >
          Practice {name}
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Button>
      </CardContent>
    </Card>
  );
}
