import { mockInsights } from '@/data/mockMentor';
import { Target, TrendingDown, TrendingUp, CheckSquare, Flame, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const iconMap = {
  Target: Target,
  TrendingDown: TrendingDown,
  TrendingUp: TrendingUp,
  CheckSquare: CheckSquare,
  Flame: Flame,
  Award: Award
};

export function MentorInsights() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold tracking-tight mb-4">Actionable Insights</h3>
      {mockInsights.map((insight) => {
        const Icon = iconMap[insight.icon as keyof typeof iconMap] || Target;
        return (
          <Card key={insight.id} className="p-3 border-border/60 shadow-sm flex items-center justify-between group hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 bg-muted rounded-md", insight.color, "group-hover:bg-primary/10 transition-colors")}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{insight.label}</span>
                <span className="text-sm font-semibold">{insight.value}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
