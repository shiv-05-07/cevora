'use client';

import * as React from 'react';
import { TrendDataPoint } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function PerformanceTrend({ data }: { data: TrendDataPoint[] }) {
  // Use a custom tooltip for better UI
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border border-border p-3 rounded-lg shadow-md text-sm">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-bold">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>
          Track your readiness and skill progression over time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/30" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickMargin={10} 
                className="fill-muted-foreground"
                axisLine={false}
                tickLine={false}
                minTickGap={30}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }} 
                className="fill-muted-foreground"
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 500 }} 
                iconType="circle"
                iconSize={8}
              />
              
              <Line 
                type="basis" 
                dataKey="placement" 
                name="Overall Readiness" 
                stroke="var(--primary)" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, stroke: 'var(--background)', strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Line 
                type="basis" 
                dataKey="coding" 
                name="Coding (DSA)" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: 'var(--background)', strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Line 
                type="basis" 
                dataKey="resume" 
                name="Resume ATS" 
                stroke="#6366f1" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: 'var(--background)', strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Line 
                type="basis" 
                dataKey="interview" 
                name="Interview" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: 'var(--background)', strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
