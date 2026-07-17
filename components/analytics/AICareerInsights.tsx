'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sparkles, ArrowRight, ShieldCheck, Zap, AlertTriangle, ChevronRight } from 'lucide-react';
import { AICareerInsight } from '@/types/analytics';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function AICareerInsights({ insights }: { insights: AICareerInsight[] }) {
  if (!insights || insights.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold tracking-tight">AI Career Insights</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const isHighPriority = insight.priority === 'High';
          
          return (
            <Card 
              key={insight.id}
              className={`relative overflow-hidden bg-card shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-[2px] ${isHighPriority ? 'border-primary/50 hover:border-primary/60' : 'border-border/50 hover:border-border/60'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {isHighPriority && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              )}
              
              <CardContent className="p-5 flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isHighPriority ? (
                      <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-0 font-medium">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        High Priority
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0 font-medium">
                        <Zap className="w-3 h-3 mr-1" />
                        {insight.priority} Priority
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center font-medium">
                      <ShieldCheck className="w-3 h-3 mr-1 text-emerald-500" />
                      {insight.confidence}% Confidence
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-semibold mb-2">{insight.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {insight.explanation}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {insight.affectedModules.map((mod) => (
                    <Badge key={mod} variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground border-border/50">
                      {mod}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                  <div className="text-sm font-semibold text-emerald-500">
                    Expected: {insight.estimatedImpact}
                  </div>
                  <Link 
                    href={insight.action.href}
                    className={cn(buttonVariants({ variant: isHighPriority ? "default" : "secondary", size: "sm" }), "h-8 text-xs group")}
                  >
                    {insight.action.label}
                    <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
