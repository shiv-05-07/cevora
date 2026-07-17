import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PlacementReadiness } from '@/types/analytics';
import { CheckCircle2, AlertTriangle, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CareerHealthProps {
  data: PlacementReadiness;
}

export function CareerHealth({ data }: CareerHealthProps) {
  const getStatus = (score: number) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    return 'warning';
  };

  const overallStatus = getStatus(data.overall);
  
  const pillars = [
    { label: 'Resume', score: data.resume },
    { label: 'Coding', score: data.coding },
    { label: 'Projects', score: data.projects },
    { label: 'Behavioral', score: data.behavioral },
  ];

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardContent className="p-5 flex flex-col sm:flex-row items-center gap-6">
        
        {/* Score Section */}
        <div className="flex flex-col items-center sm:items-start shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            <Activity className="w-4 h-4 text-primary" />
            Career Health
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-3xl font-bold leading-none">{data.overall}</span>
            <span className="text-sm text-muted-foreground mb-1">/100</span>
          </div>
          <div className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            overallStatus === 'excellent' ? "bg-emerald-500/10 text-emerald-500" :
            overallStatus === 'good' ? "bg-blue-500/10 text-blue-500" :
            "bg-amber-500/10 text-amber-500"
          )}>
            {overallStatus === 'excellent' ? 'Excellent' : overallStatus === 'good' ? 'On Track' : 'Needs Attention'}
          </div>
        </div>

        {/* Separator */}
        <div className="hidden sm:block w-px h-16 bg-border/50" />

        {/* Pillars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {pillars.map(pillar => {
            const status = getStatus(pillar.score);
            const isGood = status === 'excellent' || status === 'good';
            
            return (
              <div key={pillar.label} className="flex flex-col items-center justify-center p-3 bg-muted/20 rounded-lg border border-border/40">
                <span className="text-xs font-medium text-muted-foreground mb-2">{pillar.label}</span>
                {isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                )}
              </div>
            );
          })}
        </div>
        
      </CardContent>
    </Card>
  );
}
