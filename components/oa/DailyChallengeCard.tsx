import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Trophy, Clock, Star, Play } from 'lucide-react';

export interface DailyChallengeCardProps {
  title: string;
  company: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  estimatedTime: string;
  description: string;
  onStart?: () => void;
}

export function DailyChallengeCard({
  title,
  company,
  difficulty,
  points,
  estimatedTime,
  description,
  onStart,
}: DailyChallengeCardProps) {
  const getDifficultyStatus = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <Card className="relative overflow-hidden border-emerald-500/30 dark:border-emerald-500/20 shadow-sm transition-all hover:shadow-md">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none" />
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
            <Trophy className="w-3 h-3 mr-1" />
            Daily Challenge
          </Badge>
          <StatusBadge status={getDifficultyStatus(difficulty)} className="px-2 py-0.5 text-[10px]">
            {difficulty}
          </StatusBadge>
        </div>

        <h3 className="text-xl font-extrabold tracking-tight text-foreground mb-1.5">{title}</h3>
        
        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-orange-500" /> {company}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {estimatedTime}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="font-bold text-foreground">+{points} pts</span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>

        <Button 
          className="w-full sm:w-auto font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          onClick={onStart}
        >
          <Play className="w-4 h-4 mr-2" />
          Start Challenge
        </Button>
      </CardContent>
    </Card>
  );
}
