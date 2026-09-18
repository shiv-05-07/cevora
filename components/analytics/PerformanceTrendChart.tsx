'use client';

import * as React from 'react';
import { PerformanceTrendPoint } from '@/features/analytics/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from './EmptyState';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface PerformanceTrendChartProps {
  data: PerformanceTrendPoint[];
}

type SeriesMetricKey = 'questionsSolved' | 'accuracyPct' | 'overallMastery';

const METRIC_CONFIG: Record<SeriesMetricKey, { label: string; stroke: string; fill: string; unit: string }> = {
  questionsSolved: {
    label: 'Questions Solved',
    stroke: '#3b82f6', // blue-500
    fill: 'rgba(59, 130, 246, 0.15)',
    unit: '',
  },
  accuracyPct: {
    label: 'Practice Accuracy',
    stroke: '#10b981', // emerald-500
    fill: 'rgba(16, 185, 129, 0.15)',
    unit: '%',
  },
  overallMastery: {
    label: 'Overall Mastery',
    stroke: '#8b5cf6', // purple-500
    fill: 'rgba(139, 92, 246, 0.15)',
    unit: '%',
  },
};

export function PerformanceTrendChart({ data }: PerformanceTrendChartProps) {
  const [activeMetric, setActiveMetric] = React.useState<SeriesMetricKey>('questionsSolved');

  // Filter valid data points for selected metric
  const filteredData = React.useMemo(() => {
    return data.filter((item) => item[activeMetric] !== undefined);
  }, [data, activeMetric]);

  const config = METRIC_CONFIG[activeMetric];

  return (
    <Card className="border border-border/60 shadow-sm overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>Performance Over Time</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Actual progress recorded from your activity history
          </CardDescription>
        </div>

        {/* Series Metric Selector */}
        <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-lg border border-border/50 self-start sm:self-auto">
          {(['questionsSolved', 'accuracyPct', 'overallMastery'] as SeriesMetricKey[]).map((key) => (
            <Button
              key={key}
              variant={activeMetric === key ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                "h-7 px-2.5 text-xs font-medium rounded-md transition-all",
                activeMetric === key
                  ? "bg-background text-foreground shadow-xs hover:bg-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveMetric(key)}
            >
              {METRIC_CONFIG[key].label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {filteredData.length < 2 ? (
          <EmptyState
            icon={BarChart2}
            title="No historical data yet"
            description="Continue practicing coding problems and completing roadmap steps to build your performance timeline."
            actionLabel="Start Practice"
            actionHref="/oa-practice"
            className="border-none shadow-none"
          />
        ) : (
          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.stroke} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={config.stroke} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.15)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  className="text-muted-foreground"
                  tickFormatter={(val) => {
                    const parts = val.split('-');
                    return parts.length === 3 ? `${parts[1]}/${parts[2]}` : val;
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  className="text-muted-foreground"
                  domain={[0, 'auto']}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const val = payload[0].value;
                      return (
                        <div className="bg-popover text-popover-foreground border border-border px-3 py-2 rounded-lg shadow-md text-xs space-y-1">
                          <p className="font-semibold">{label}</p>
                          <p className="text-muted-foreground">
                            {config.label}: <span className="font-bold text-foreground">{val}{config.unit}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  stroke={config.stroke}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill={`url(#gradient-${activeMetric})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
