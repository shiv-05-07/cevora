import { Search, Percent, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MissingKeyword } from '@/types/resume';
import { cn } from '@/lib/utils';

interface KeywordAnalysisProps {
  match: number;
  missing: MissingKeyword[];
  top: string[];
  density: string;
}

export function KeywordAnalysis({ match, missing, top, density }: KeywordAnalysisProps) {
  const parseDensity = () => {
    // If it says "Optimal (2-3%)", we can mock a visual bar value like 85
    return 85; 
  };

  const getImportanceColor = (imp: string) => {
    switch (imp) {
      case 'Critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'High': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="border border-border/60 rounded-2xl bg-card shadow-sm p-6 space-y-6 flex flex-col justify-between">
      <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
        <Search className="w-4 h-4" />
        Keyword Optimization
      </div>

      <div className="space-y-6">
        {/* Match Percentage */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="font-bold text-sm text-foreground">Keyword Match</span>
            <span className="text-xl font-black text-primary">{match}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
             <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${match}%` }} />
          </div>
        </div>
        
        {/* Keyword Density */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="font-bold text-sm text-foreground">Keyword Density</span>
            <span className="text-sm font-bold text-foreground">{density}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
             <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${parseDensity()}%` }} />
          </div>
        </div>

        {/* Top Keywords */}
        <div className="space-y-3">
          <span className="text-[11px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5" /> Top Matched Keywords
          </span>
          <div className="flex flex-wrap gap-2">
            {top.map(kw => (
              <Badge key={kw} variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-semibold shadow-sm">
                {kw}
              </Badge>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="space-y-3">
          <span className="text-[11px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Top Missing Keywords
          </span>
          <div className="space-y-2">
            {missing.map((kw, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg border border-border/40 bg-muted/5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground">{kw.word}</span>
                  <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 uppercase font-bold tracking-wider", getImportanceColor(kw.importance))}>
                    {kw.importance}
                  </Badge>
                </div>
                {kw.frequency && (
                  <span className="text-[11px] font-medium text-muted-foreground">{kw.frequency}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
