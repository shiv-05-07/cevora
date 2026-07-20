import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { DashboardHero } from '@/types/analytics';
import { TrendingUp, Target, Building2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AnalyticsHero({ data }: { data: DashboardHero }) {
  return (
    <Card className="relative overflow-hidden bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px] group">
      {/* Subtle background flair */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50 transition-opacity group-hover:opacity-100" />
      
      <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
        
        {/* Left: Score & Ring */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <ProgressRing 
            value={data.readinessScore} 
            size={140} 
            strokeWidth={10} 
            indicatorClassName={data.readinessScore > 80 ? 'stroke-emerald-500' : 'stroke-primary'}
            trackClassName="stroke-muted/30"
            label={<><AnimatedCounter value={data.readinessScore} />%</>}
            subtitle={<span className="text-[10px] font-bold uppercase tracking-wider">Readiness</span>}
          />
          
          <Badge variant="outline" className={cn(
            "px-3 py-1 font-semibold",
            data.trend > 0 ? "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" : "text-muted-foreground"
          )}>
            <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
            <AnimatedCounter value={data.trend} prefix="+" />% this month
          </Badge>
        </div>

        {/* Right: Insights */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {data.careerLevel}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Based on your current trajectory, you have <span className="font-semibold text-foreground">{data.confidence}</span> estimated placement confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/40">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Current Focus</p>
                <p className="text-sm font-semibold">{data.focus}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/40">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Eligible Companies</p>
                <p className="text-sm font-semibold"><AnimatedCounter value={data.eligibleCompanies} /> roles available</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 mb-1">AI Recommendation</p>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                {data.recommendation}
              </p>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
