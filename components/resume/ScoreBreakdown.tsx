import { ScoreCategory } from '@/types/resume';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Paintbrush, Briefcase, Code, GraduationCap, Search, SpellCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScoreBreakdown({ categories }: { categories: ScoreCategory[] }) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'fmt': return <Paintbrush className="w-4 h-4 text-muted-foreground mr-1.5" />;
      case 'exp': return <Briefcase className="w-4 h-4 text-muted-foreground mr-1.5" />;
      case 'skl': return <Code className="w-4 h-4 text-muted-foreground mr-1.5" />;
      case 'edu': return <GraduationCap className="w-4 h-4 text-muted-foreground mr-1.5" />;
      case 'kwd': return <Search className="w-4 h-4 text-muted-foreground mr-1.5" />;
      case 'grm': return <SpellCheck className="w-4 h-4 text-muted-foreground mr-1.5" />;
      default: return null;
    }
  };

  return (
    <div className="border border-border/60 rounded-2xl bg-card shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
        <BarChart3 className="w-4 h-4" />
        Score Breakdown
      </div>

      <div className="space-y-5">
        {categories.map(cat => (
          <div key={cat.id} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="font-bold text-sm text-foreground flex items-center">
                {getIcon(cat.id)}
                {cat.name}
              </span>
              <span className={cn(
                "text-xs font-black",
                cat.score >= 90 ? "text-emerald-500" : cat.score >= 70 ? "text-orange-500" : "text-red-500"
              )}>
                {cat.score}%
              </span>
            </div>
            
            {/* Custom progress coloring */}
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
               <div 
                 className={cn(
                   "h-full rounded-full transition-all duration-1000 ease-out",
                   cat.score >= 90 ? "bg-emerald-500" : cat.score >= 70 ? "bg-orange-500" : "bg-red-500"
                 )} 
                 style={{ width: `${cat.score}%` }} 
               />
            </div>
            
            <p className="text-[11px] text-muted-foreground font-medium leading-tight">
              {cat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
