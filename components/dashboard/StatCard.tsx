import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn('overflow-hidden relative', className)} {...props}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">{title}</p>
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center border border-primary/10 shrink-0">
              <Icon className="w-4.5 h-4.5" />
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-extrabold text-foreground tracking-tight">{value}</span>
          {trend && (
            <span
              className={cn(
                'text-[10px] font-bold px-1.5 py-0.5 rounded-full select-none',
                trend.isPositive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-destructive/10 text-destructive'
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 select-none">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
