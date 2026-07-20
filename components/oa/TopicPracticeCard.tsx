import * as React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { FolderCode } from 'lucide-react';

export interface TopicPracticeCardProps {
  name: string;
  completed: number;
  total: number;
  onClick?: () => void;
}

export function TopicPracticeCard({
  name,
  completed,
  total,
  onClick,
}: TopicPracticeCardProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex flex-col p-4 rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/40 hover:bg-muted/10',
        onClick && 'cursor-pointer hover:shadow-sm hover:-translate-y-0.5'
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <FolderCode className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold truncate text-foreground group-hover:text-primary transition-colors">
            {name}
          </h4>
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="flex justify-between items-center text-[10px] font-semibold mb-1.5 px-0.5">
          <span className="text-muted-foreground">{completed} / {total} Questions</span>
          <span className="text-primary">{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-1.5 w-full" />
      </div>
    </div>
  );
}
