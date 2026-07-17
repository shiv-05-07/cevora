import * as React from 'react';
import { PlacementReadiness } from '@/types/analytics';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';

export function PlacementReadinessCard({ data }: { data: PlacementReadiness }) {
  const categories = [
    { label: 'Coding (DSA)', score: data.coding, color: 'bg-emerald-500' },
    { label: 'System Design', score: data.systemDesign, color: 'bg-blue-500' },
    { label: 'Resume & Portfolio', score: data.resume, color: 'bg-indigo-500' },
    { label: 'Projects', score: data.projects, color: 'bg-purple-500' },
    { label: 'Behavioral (STAR)', score: data.behavioral, color: 'bg-amber-500' },
    { label: 'Communication', score: data.communication, color: 'bg-pink-500' },
  ];

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px]">
      <CardHeader>
        <CardTitle>Readiness Breakdown</CardTitle>
        <CardDescription>
          Detailed analysis of your competency across key placement dimensions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {categories.map((cat, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{cat.label}</span>
                <span className="font-bold text-muted-foreground">
                  <AnimatedCounter value={cat.score} />%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${cat.color}`} 
                  style={{ width: `${cat.score}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
