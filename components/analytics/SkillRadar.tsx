'use client';

import * as React from 'react';
import { SkillMetric } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

export function SkillRadar({ data }: { data: SkillMetric[] }) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 border border-border p-3 rounded-lg shadow-md text-sm">
          <p className="font-semibold mb-1">{data.subject}</p>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Proficiency:</span>
            <span className="font-bold text-primary">{data.score} / {data.fullMark}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
      <CardHeader>
        <CardTitle>Skill Radar</CardTitle>
        <CardDescription>
          A multi-dimensional view of your technical and soft skills.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="h-[350px] w-full max-w-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid 
                stroke="var(--muted-foreground)" 
                strokeOpacity={0.35}
              />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'var(--foreground)', fontSize: 13, fontWeight: 700 }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={false} 
                axisLine={false} 
              />
              <Radar
                name="Proficiency"
                dataKey="score"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.4}
                strokeWidth={2.5}
                activeDot={{ r: 8, fill: 'var(--primary)', stroke: 'var(--background)', strokeWidth: 3 }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
