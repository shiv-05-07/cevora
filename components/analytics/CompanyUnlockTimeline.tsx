import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UnlockMilestone } from '@/types/analytics';
import { Map, Lock, Unlock, Calendar, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CompanyUnlockTimelineProps {
  data: UnlockMilestone[];
}

export function CompanyUnlockTimeline({ data }: CompanyUnlockTimelineProps) {
  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Map className="w-5 h-5 text-primary" />
          Roadmap to Tech Giants
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="relative border-l-2 border-muted pl-6 ml-3 space-y-10">
          {data.map((milestone, index) => {
            const isUnlocked = milestone.currentProgress >= 100;
            const isNext = !isUnlocked && (index === 0 || data[index - 1].currentProgress >= 100);

            return (
              <div key={milestone.id} className="relative">
                {/* Timeline Dot */}
                <div className={cn(
                  "absolute -left-[35px] top-1 w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center transition-colors",
                  isUnlocked ? "border-emerald-500 bg-emerald-500/20" : 
                  isNext ? "border-primary bg-primary/20 ring-4 ring-primary/10" : 
                  "border-muted-foreground bg-muted"
                )}>
                  {isUnlocked && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
                  {isNext && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
                </div>

                <div className={cn(
                  "p-5 rounded-xl border transition-all",
                  isUnlocked ? "bg-emerald-500/5 border-emerald-500/20" : 
                  isNext ? "bg-primary/5 border-primary/30 shadow-sm" : 
                  "bg-muted/10 border-border/40 opacity-70"
                )}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-base">{milestone.tier}</h3>
                        {isUnlocked ? (
                          <Unlock className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {isUnlocked ? 'Unlocked' : `Expected: ${milestone.expectedDate}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg">{milestone.currentProgress}%</span>
                    </div>
                  </div>

                  <Progress value={milestone.currentProgress} className={cn("h-2 mb-4 [&_[data-slot=progress-indicator]]:bg-emerald-500", isUnlocked ? "" : "[&_[data-slot=progress-indicator]]:bg-primary")} 
                  />

                  {!isUnlocked && milestone.remainingSkills.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" />
                        Remaining Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {milestone.remainingSkills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-[10px] font-medium border-border/60">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
