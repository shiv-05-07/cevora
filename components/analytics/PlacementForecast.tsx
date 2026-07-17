import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlacementForecast } from '@/types/analytics';
import { LineChart, Trophy, Phone, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlacementForecastProps {
  data: PlacementForecast;
}

export function PlacementForecastCard({ data }: PlacementForecastProps) {
  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md overflow-hidden relative">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
        <LineChart className="w-64 h-64 text-primary" />
      </div>

      <CardHeader className="border-b border-border/40 pb-4 relative z-10">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Placement Forecast
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 relative z-10">
        
        {/* Forecast Flow */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
            {data.timeline.map((point, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {point.label}
                  </span>
                  <div className={cn(
                    "flex items-center justify-center w-16 h-16 rounded-full border-2 shadow-sm font-bold text-xl",
                    i === data.timeline.length - 1 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-background border-border/80 text-foreground"
                  )}>
                    {point.value}%
                  </div>
                </div>
                {i < data.timeline.length - 1 && (
                  <div className="hidden sm:flex flex-col items-center justify-center text-muted-foreground/50">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
                {i < data.timeline.length - 1 && (
                  <div className="sm:hidden flex flex-col items-center justify-center text-muted-foreground/50 h-6">
                    <div className="w-px h-full bg-border" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/40">
          <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Phone className="w-4 h-4 text-blue-500" />
              <span>Expected Calls</span>
            </div>
            <p className="text-2xl font-semibold">{data.expectedInterviewCalls}</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <LineChart className="w-4 h-4 text-emerald-500" />
              <span>Probability</span>
            </div>
            <p className="text-2xl font-semibold text-emerald-500">{data.placementProbability}%</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Ranking</span>
            </div>
            <p className="text-2xl font-semibold">{data.currentRanking}</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Confidence</span>
            </div>
            <p className="text-2xl font-semibold">{data.confidence}</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
