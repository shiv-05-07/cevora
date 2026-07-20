'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { RecommendedLearningPath as RecommendedLearningPathType } from '@/types/analytics';
import { Milestone, ArrowRight, Play, Clock, Code2, Map, Users, FileText, Bot } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function RecommendedLearningPath({ data }: { data: RecommendedLearningPathType }) {
  if (!data || !data.nodes || data.nodes.length === 0) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Roadmap': return <Map className="w-4 h-4" />;
      case 'DSA': return <Code2 className="w-4 h-4" />;
      case 'Interview': return <Users className="w-4 h-4" />;
      case 'Resume': return <FileText className="w-4 h-4" />;
      case 'Mentor': return <Bot className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Roadmap': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'DSA': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Interview': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Resume': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Mentor': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-secondary text-muted-foreground border-border';
    }
  };

  return (
    <section className="space-y-4 mt-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Milestone className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">Today's Recommended Plan</h2>
        </div>
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-0">
          Est. Placement Gain: +{data.estimatedPlacementGain}%
        </Badge>
      </div>

      <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex-1 flex flex-col md:flex-row items-start md:items-center w-full relative">
              {/* Desktop Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-border -z-10 -translate-y-1/2" />
              {/* Mobile Connecting Line */}
              <div className="md:hidden absolute top-0 left-6 w-[2px] h-full bg-border -z-10" />

              {data.nodes.map((node, index) => (
                <div key={node.id} className="flex-1 flex flex-row md:flex-col items-center gap-4 md:gap-3 w-full mb-6 md:mb-0 relative group">
                  
                  {/* Icon Node */}
                  <div className={cn("w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-2 bg-background z-10 transition-transform group-hover:scale-110", getTypeColor(node.type))}>
                    {getTypeIcon(node.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 md:text-center">
                    <Badge variant="outline" className={cn("mb-2 text-[10px] uppercase tracking-wider", getTypeColor(node.type))}>
                      {node.type}
                    </Badge>
                    <h4 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{node.title}</h4>
                    <div className="text-xs text-muted-foreground flex items-center md:justify-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {node.durationMinutes} min
                    </div>
                  </div>
                  
                  {/* Arrow for Mobile (between items) */}
                  {index < data.nodes.length - 1 && (
                    <div className="md:hidden flex items-center justify-center w-12 text-muted-foreground/30">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="shrink-0 flex items-center justify-center pt-4 md:pt-0 md:pl-6 md:border-l border-border/40 w-full md:w-auto">
              <Link 
                href={data.nodes[0]?.href || '#'}
                className={cn(buttonVariants({ size: "lg" }), "w-full md:w-auto font-semibold")}
              >
                Start First Task
                <Play className="w-4 h-4 ml-2 fill-current" />
              </Link>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
