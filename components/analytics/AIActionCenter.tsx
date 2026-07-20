import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { ActionRecommendation } from '@/types/analytics';
import { Zap, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AIActionCenterProps {
  data: ActionRecommendation;
}

export function AIActionCenter({ data }: AIActionCenterProps) {
  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          AI Action Center
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        
        {/* Highest ROI Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Highest ROI</h3>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl gap-4">
            <div>
              <h4 className="text-base font-semibold text-foreground mb-1">{data.highestRoi.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">{data.highestRoi.whyThisMatters}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium text-emerald-500">{data.highestRoi.gain}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{data.highestRoi.time}</span>
                </div>
              </div>
            </div>
            <Link 
              href={data.highestRoi.href} 
              className={cn(buttonVariants({ variant: 'default' }), "shrink-0")}
            >
              Start Action
            </Link>
          </div>
        </div>

        {/* Alternative Tasks */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Alternative Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.alternatives.map(task => (
              <div key={task.id} className="flex flex-col p-4 bg-muted/30 border border-border/50 rounded-xl">
                <h4 className="text-sm font-medium mb-1">{task.title}</h4>
                <p className="text-[11px] text-muted-foreground mb-4 line-clamp-2">{task.whyThisMatters}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      <span className="font-medium text-emerald-500">{task.gain}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{task.time}</span>
                    </div>
                  </div>
                  <Link 
                    href={task.href} 
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "h-7 text-xs px-3")}
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
