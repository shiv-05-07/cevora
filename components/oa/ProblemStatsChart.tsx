'use client';

import * as React from 'react';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Easy', value: 45, color: '#10b981' }, // emerald-500
  { name: 'Medium', value: 30, color: '#f59e0b' }, // amber-500
  { name: 'Hard', value: 10, color: '#ef4444' }, // red-500
];

export function ProblemStatsChart() {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col border-border/40 shadow-sm bg-card/50 backdrop-blur-sm w-full max-w-sm mx-auto aspect-square justify-center">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm font-semibold">Problems Solved</CardTitle>
        <CardDescription className="text-xs">By Difficulty Level</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4 flex flex-col justify-center">
        <div className="h-[180px] w-full mt-2 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold tracking-tight text-foreground">{total}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Total</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-4 text-xs font-medium">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
              <span className="text-foreground ml-0.5">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
