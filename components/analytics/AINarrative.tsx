import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, AlertCircle, Building2, Target, CalendarDays } from 'lucide-react';
import { AIBrief } from '@/types/analytics';

interface AINarrativeProps {
  data: AIBrief;
}

export function AINarrative({ data }: AINarrativeProps) {
  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-border/40 pb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">AI Weekly Brief</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Placement Readiness</span>
            </div>
            <p className="text-lg font-medium text-emerald-500">{data.placementReadinessTrend}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <Target className="w-4 h-4 text-primary" />
              <span>Biggest Improvement</span>
            </div>
            <p className="text-lg font-medium">{data.biggestImprovement}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span>Primary Blocker</span>
            </div>
            <p className="text-lg font-medium">{data.primaryBlocker}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <Building2 className="w-4 h-4 text-primary/80" />
              <span>Newly Unlocked</span>
            </div>
            <p className="text-lg font-medium">
              {data.newlyUnlockedCompanies.length > 0 
                ? data.newlyUnlockedCompanies.join(', ')
                : 'None this week'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <Target className="w-4 h-4 text-primary" />
              <span>Today's Focus</span>
            </div>
            <p className="text-lg font-medium">{data.todaysFocus}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <CalendarDays className="w-4 h-4 text-blue-500" />
              <span>Expected Weekly Gain</span>
            </div>
            <p className="text-lg font-medium text-blue-500">{data.expectedWeeklyGain}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
