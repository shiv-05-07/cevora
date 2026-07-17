import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KanbanTask, WeeklyPlan } from '@/types/analytics';
import { CalendarDays, Clock, TrendingUp, AlertCircle, CheckCircle2, CircleDashed, LayoutGrid } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WeeklyPlannerProps {
  data: WeeklyPlan;
}

export function WeeklyPlanner({ data }: WeeklyPlannerProps) {
  const columns = [
    { id: 'Planned', title: 'Planned', icon: CircleDashed, color: 'text-muted-foreground' },
    { id: 'In Progress', title: 'In Progress', icon: LayoutGrid, color: 'text-blue-500' },
    { id: 'Completed', title: 'Completed', icon: CheckCircle2, color: 'text-emerald-500' }
  ] as const;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20';
      case 'Hard': return 'bg-destructive/10 text-destructive hover:bg-destructive/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPriorityColor = (prio: string) => {
    switch (prio) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" />
          Today's Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((col) => {
            const columnTasks = data.tasks.filter(t => t.status === col.id);
            const Icon = col.icon;
            
            return (
              <div key={col.id} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                  <Icon className={cn("w-4 h-4", col.color)} />
                  <h3 className="font-semibold text-sm">{col.title}</h3>
                  <span className="ml-auto text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {columnTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 border border-dashed border-border/60 rounded-xl text-center px-4 bg-muted/10">
                      <Icon className="w-8 h-8 text-muted-foreground/30 mb-3" />
                      <p className="text-sm font-medium text-muted-foreground">No tasks</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">Enjoy your free time</p>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <div 
                        key={task.id} 
                        className="group relative p-4 bg-muted/20 border border-border/60 rounded-xl shadow-sm hover:border-border/80 transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden"
                      >
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <h4 className="text-sm font-medium leading-tight">{task.title}</h4>
                          <Badge variant="outline" className="shrink-0 text-[10px] uppercase tracking-wider font-semibold py-0.5 px-2 bg-background">
                            {task.module}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge variant="secondary" className={cn("text-[10px] border-none font-medium", getDifficultyColor(task.difficulty))}>
                            {task.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium" title={`Priority: ${task.priority}`}>
                            <AlertCircle className={cn("w-3.5 h-3.5", getPriorityColor(task.priority))} />
                            {task.priority}
                          </div>
                        </div>

                        {/* Hidden stats revealed on hover */}
                        <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300">
                          <div className="overflow-hidden">
                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 mt-2 border-t border-border/40">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {task.time}
                              </div>
                              <div className="flex items-center gap-1.5 font-medium text-emerald-500">
                                <TrendingUp className="w-3.5 h-3.5" />
                                {task.gain}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
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
