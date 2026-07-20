'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Play, Upload, Settings, Layout, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { cn } from '@/lib/utils';

interface SolveHeaderProps {
  title: string;
  difficulty: string;
  onRun: () => void;
  onSubmit: () => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
}

export function SolveHeader({
  title,
  difficulty,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
}: SolveHeaderProps) {
  const router = useRouter();

  // Basic mock timer
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getDifficultyStatus = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div className="flex items-center justify-between h-14 px-4 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      
      {/* Left: Back & Title */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon-sm" 
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-sm tracking-tight">{title}</h1>
          <StatusBadge status={getDifficultyStatus(difficulty)} className="px-1.5 py-0 text-[10px] uppercase">
            {difficulty}
          </StatusBadge>
        </div>
      </div>

      {/* Center: Timer & Controls (Optional) */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5" />
          <span className="tabular-nums">{formatTime(timeElapsed)}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hidden sm:flex">
          <Layout className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border/60 mx-1 hidden sm:block" />
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRun} 
          disabled={isRunning || isSubmitting}
          className="h-8 font-semibold text-xs"
        >
          {isRunning ? (
            <span className="flex items-center"><span className="animate-pulse mr-1">Running</span>...</span>
          ) : (
            <span className="flex items-center"><Play className="w-3.5 h-3.5 mr-1.5" /> Run</span>
          )}
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={onSubmit}
          disabled={isRunning || isSubmitting}
          className="h-8 font-semibold text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {isSubmitting ? (
            <span className="flex items-center"><span className="animate-pulse mr-1">Submitting</span>...</span>
          ) : (
            <span className="flex items-center"><Upload className="w-3.5 h-3.5 mr-1.5" /> Submit</span>
          )}
        </Button>
      </div>

    </div>
  );
}
