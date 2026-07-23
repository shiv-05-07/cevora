'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MasteryBarProps {
  score: number; // 0 to 100 or 0.0 to 1.0
  level?: string;
  className?: string;
}

export function MasteryBar({ score, level, className }: MasteryBarProps) {
  const normScore = score <= 1.0 ? Math.round(score * 100) : Math.round(score);

  const getLevelBadge = (val: number, lvl?: string) => {
    if (lvl) {
      switch (lvl.toUpperCase()) {
        case 'MASTERED': return { text: 'Mastered', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' };
        case 'PROFICIENT': return { text: 'Proficient', color: 'bg-blue-500/10 text-blue-600 border-blue-500/30' };
        case 'FAMILIAR': return { text: 'Familiar', color: 'bg-amber-500/10 text-amber-600 border-amber-500/30' };
        default: return { text: 'Novice', color: 'bg-rose-500/10 text-rose-600 border-rose-500/30' };
      }
    }
    if (val >= 85) return { text: 'Mastered', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' };
    if (val >= 70) return { text: 'Proficient', color: 'bg-blue-500/10 text-blue-600 border-blue-500/30' };
    if (val >= 45) return { text: 'Familiar', color: 'bg-amber-500/10 text-amber-600 border-amber-500/30' };
    return { text: 'Novice', color: 'bg-rose-500/10 text-rose-600 border-rose-500/30' };
  };

  const badge = getLevelBadge(normScore, level);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex justify-between items-center text-xs font-semibold">
        <Badge variant="outline" className={`text-[10px] font-bold ${badge.color}`}>
          {badge.text}
        </Badge>
        <span className="font-extrabold text-foreground">{normScore}%</span>
      </div>
      <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            normScore >= 70 ? "bg-emerald-500" : normScore >= 45 ? "bg-blue-500" : "bg-rose-500"
          )}
          style={{ width: `${Math.min(100, Math.max(4, normScore))}%` }}
        />
      </div>
    </div>
  );
}
