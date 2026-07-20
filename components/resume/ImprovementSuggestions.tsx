import { ImprovementSuggestion } from '@/types/resume';
import { Lightbulb, TrendingUp, Cloud, User, CheckSquare, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ImprovementSuggestions({ suggestions }: { suggestions: ImprovementSuggestion[] }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trending-up': return <TrendingUp className="w-5 h-5" />;
      case 'cloud': return <Cloud className="w-5 h-5" />;
      case 'user': return <User className="w-5 h-5" />;
      case 'check-square': return <CheckSquare className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high': return { badge: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20', icon: 'text-red-500 bg-red-500/10' };
      case 'medium': return { badge: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20', icon: 'text-orange-500 bg-orange-500/10' };
      case 'low': return { badge: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20', icon: 'text-blue-500 bg-blue-500/10' };
      default: return { badge: '', icon: '' };
    }
  };

  return (
    <div className="border border-border/60 rounded-2xl bg-card shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
        <Zap className="w-4 h-4 text-amber-500" />
        AI Improvement Suggestions
      </div>

      <div className="space-y-4">
        {suggestions.map(sug => {
          const styles = getPriorityStyles(sug.priority);
          return (
            <div key={sug.id} className="flex gap-4 p-4 border border-border/40 rounded-xl bg-muted/5 hover:bg-muted/10 transition-colors">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", styles.icon)}>
                {getIcon(sug.icon)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-bold text-sm text-foreground">{sug.title}</h4>
                  <Badge variant="secondary" className={cn("uppercase text-[10px] tracking-wider font-black", styles.badge)}>
                    {sug.priority}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  {sug.explanation}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Estimated ATS Improvement</span>
                    <span className="text-sm font-black text-emerald-500 flex items-center bg-emerald-500/10 w-fit px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {sug.estimatedImprovement}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                    <span className="text-[10px] font-semibold text-emerald-600">
                      Impact: {sug.impact}
                    </span>
                    <Button variant="outline" size="sm" className="text-xs h-7 shrink-0">Fix This</Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
