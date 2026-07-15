import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const metricCardVariants = cva(
  'relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
  {
    variants: {
      colorVariant: {
        default: 'border-border/60 hover:border-border/80',
        primary: 'border-primary/20 hover:border-primary/40',
        success: 'border-green-500/20 hover:border-green-500/40',
        warning: 'border-orange-500/20 hover:border-orange-500/40',
        danger: 'border-red-500/20 hover:border-red-500/40',
      },
    },
    defaultVariants: {
      colorVariant: 'default',
    },
  }
);

export interface MetricCardProps extends VariantProps<typeof metricCardVariants> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  loading?: boolean;
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  colorVariant,
  loading = false,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn(metricCardVariants({ colorVariant }), className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {loading ? (
              <div className="h-8 flex items-center">
                <Spinner size="sm" />
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {value}
                </h3>
                {trend && trendValue && (
                  <span
                    className={cn(
                      'flex items-center text-xs font-medium',
                      trend === 'up' && 'text-green-500',
                      trend === 'down' && 'text-red-500',
                      trend === 'neutral' && 'text-muted-foreground'
                    )}
                  >
                    {trend === 'up' && <TrendingUp className="mr-1 h-3 w-3" />}
                    {trend === 'down' && <TrendingDown className="mr-1 h-3 w-3" />}
                    {trend === 'neutral' && <Minus className="mr-1 h-3 w-3" />}
                    {trendValue}
                  </span>
                )}
              </div>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
