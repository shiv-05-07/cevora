import * as React from 'react';
import { KPI } from '@/types/analytics';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { cn } from '@/lib/utils';
import { FileText, Code2, Users, Flame, Map, Building2, TrendingUp, TrendingDown } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  'file-text': FileText,
  'code-2': Code2,
  'users': Users,
  'flame': Flame,
  'map': Map,
  'building-2': Building2,
};

export function MetricsGrid({ kpis }: { kpis: KPI[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {kpis.map((kpi, idx) => {
        const Icon = iconMap[kpi.iconName] || FileText;
        // Determine if value contains non-numeric suffix
        const hasPercent = typeof kpi.value === 'string' && kpi.value.includes('%');
        const hasDays = typeof kpi.value === 'string' && kpi.value.toLowerCase().includes('days');
        const numericValue = typeof kpi.value === 'number' ? kpi.value : parseInt(kpi.value.toString().replace(/[^0-9.-]/g, ''), 10);
        
        const suffix = hasPercent ? '%' : hasDays ? ' Days' : '';

        return (
          <Card key={idx} className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px] relative overflow-hidden group">
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <CardContent className="p-5 flex flex-col h-full justify-between gap-4 relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <h3 className="text-2xl font-bold mt-1">
                    <AnimatedCounter value={numericValue} suffix={suffix} />
                  </h3>
                </div>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-4 border-t border-border/40">
                <div className="flex items-center gap-1.5">
                  {kpi.trend !== '0' && (
                    <span className={cn(
                      "text-xs font-semibold flex items-center",
                      kpi.isPositive ? "text-emerald-500" : "text-rose-500"
                    )}>
                      {kpi.isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                      {kpi.trend}
                    </span>
                  )}
                  {kpi.trend === '0' && (
                    <span className="text-xs font-semibold text-muted-foreground">-</span>
                  )}
                  <span className="text-xs text-muted-foreground font-medium line-clamp-1" title={kpi.insight}>
                    {kpi.insight}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
