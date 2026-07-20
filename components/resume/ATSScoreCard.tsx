import { Target, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface ATSScoreCardProps {
  score: number;
  rating: string;
  recommendation: string;
  percentile: string;
  interviewReadiness: number;
  onViewReport: () => void;
}

export function ATSScoreCard({ score, rating, recommendation, percentile, interviewReadiness, onViewReport }: ATSScoreCardProps) {
  const [displayScore, setDisplayScore] = React.useState(0);
  
  React.useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = score / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [score]);

  const getColorClass = (s: number) => {
    if (s >= 90) return 'text-emerald-500';
    if (s >= 70) return 'text-orange-500';
    return 'text-red-500';
  };

  const getStrokeClass = (s: number) => {
    if (s >= 90) return 'stroke-emerald-500';
    if (s >= 70) return 'stroke-orange-500';
    return 'stroke-red-500';
  };

  return (
    <div className="border border-border/60 rounded-2xl bg-card shadow-sm p-6 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
          <Target className="w-4 h-4" />
          ATS Score
        </div>
        <div className="text-xs font-bold text-muted-foreground px-2 py-1 bg-muted/50 rounded-md border border-border/40">
          {percentile}
        </div>
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center my-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="stroke-muted/30"
            strokeWidth="8"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className={cn("transition-all duration-1000 ease-out", getStrokeClass(score))}
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - displayScore / 100)}`}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={cn("text-5xl font-black tracking-tighter", getColorClass(score))}>
            {displayScore}
          </span>
          <span className="text-xs font-bold text-muted-foreground mt-1">/ 100</span>
        </div>
      </div>

      <div className="flex gap-1 my-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={cn("w-5 h-5", star <= (score >= 90 ? 5 : score >= 80 ? 4 : score >= 70 ? 3 : 2) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted")} />
        ))}
      </div>
      
      <div className="text-center space-y-1 mb-6 mt-2">
        <h4 className="font-extrabold text-foreground text-lg">{recommendation}</h4>
        <div className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
          Interview Chance: <span className={cn("font-bold", getColorClass(interviewReadiness))}>{interviewReadiness}%</span>
        </div>
      </div>

      <Button onClick={onViewReport} className="w-full font-bold shadow-sm" size="lg">
        View Full Report <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
