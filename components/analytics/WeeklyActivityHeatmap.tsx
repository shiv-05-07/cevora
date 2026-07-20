'use client';

import * as React from 'react';
import { ActivityDay } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const INTENSITY_COLORS = {
  0: 'bg-muted/30 dark:bg-muted/10',
  1: 'bg-emerald-200 dark:bg-emerald-950',
  2: 'bg-emerald-400 dark:bg-emerald-800',
  3: 'bg-emerald-600 dark:bg-emerald-600',
  4: 'bg-emerald-800 dark:bg-emerald-400',
};

export function WeeklyActivityHeatmap({ data }: { data: ActivityDay[] }) {
  // Ensure data is sorted oldest to newest
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  if (sortedData.length === 0) return null;

  // We need to pad the beginning so the grid aligns with the correct day of the week
  const startDate = new Date(sortedData[0].date);
  const startDayOfWeek = startDate.getDay(); // 0 (Sun) to 6 (Sat)
  
  const paddedData = Array.from({ length: startDayOfWeek }).map(() => null);
  const fullData = [...paddedData, ...sortedData];
  
  // Calculate how many weeks (columns)
  const numWeeks = Math.ceil(fullData.length / 7);
  
  // Create a 2D array: [7 rows][numWeeks columns]
  const grid: (ActivityDay | null)[][] = Array.from({ length: 7 }, () => Array(numWeeks).fill(null));
  
  fullData.forEach((day, index) => {
    const col = Math.floor(index / 7);
    const row = index % 7;
    grid[row][col] = day as ActivityDay | null;
  });

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
      <CardHeader>
        <CardTitle>Activity Heatmap</CardTitle>
        <CardDescription>Consistency is key. Track your daily learning intensity.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-4">
          <div className="min-w-max flex gap-2">
            
            {/* Day Labels Column */}
            <div className="flex flex-col gap-1 pr-2 pt-5">
              {dayLabels.map((label, i) => (
                <div key={label} className="h-3.5 text-[10px] font-medium text-muted-foreground flex items-center justify-end w-6">
                  {i % 2 !== 0 ? label : ''}
                </div>
              ))}
            </div>

            {/* Grid Columns */}
            <TooltipProvider>
              <div className="flex gap-1 pt-5">
                {Array.from({ length: numWeeks }).map((_, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-1">
                    {grid.map((row, rowIndex) => {
                      const day = row[colIndex];
                      
                      if (!day) {
                        return <div key={rowIndex} className="w-3.5 h-3.5 rounded-sm bg-transparent" />;
                      }

                      return (
                        <Tooltip key={day.date}>
                          <TooltipTrigger 
                            className={cn(
                              "w-3.5 h-3.5 rounded-sm transition-colors hover:ring-2 hover:ring-primary/50 cursor-pointer",
                              INTENSITY_COLORS[day.intensity]
                            )}
                          />
                          <TooltipContent className="bg-background/95 border border-border shadow-md p-3 text-sm rounded-lg" side="top">
                            <p className="font-semibold mb-2">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                            <div className="space-y-1">
                              {day.summary.problems > 0 && <p className="text-muted-foreground"><span className="text-foreground font-medium">{day.summary.problems}</span> problems solved</p>}
                              {day.summary.studyHours > 0 && <p className="text-muted-foreground"><span className="text-foreground font-medium">{day.summary.studyHours}h</span> studied</p>}
                              {day.summary.interviews > 0 && <p className="text-muted-foreground"><span className="text-foreground font-medium">{day.summary.interviews}</span> mock interview</p>}
                              {day.summary.resume > 0 && <p className="text-muted-foreground">Resume updated</p>}
                              {day.intensity === 0 && <p className="text-muted-foreground italic">Rest day</p>}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                ))}
              </div>
            </TooltipProvider>

          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className={`w-3.5 h-3.5 rounded-sm ${INTENSITY_COLORS[0]}`} />
            <div className={`w-3.5 h-3.5 rounded-sm ${INTENSITY_COLORS[1]}`} />
            <div className={`w-3.5 h-3.5 rounded-sm ${INTENSITY_COLORS[2]}`} />
            <div className={`w-3.5 h-3.5 rounded-sm ${INTENSITY_COLORS[3]}`} />
            <div className={`w-3.5 h-3.5 rounded-sm ${INTENSITY_COLORS[4]}`} />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
