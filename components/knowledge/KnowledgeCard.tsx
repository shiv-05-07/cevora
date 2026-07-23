'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MasteryBar } from './MasteryBar';
import { ConceptMasteryItem } from '@/store/useKnowledgeStore';
import { ArrowRight, Clock, Target, TrendingUp, BookOpen, Code, Map } from 'lucide-react';

interface KnowledgeCardProps {
  item: ConceptMasteryItem;
}

export function KnowledgeCard({ item }: KnowledgeCardProps) {
  const normScore = item.masteryScore <= 1.0 ? Math.round(item.masteryScore * 100) : Math.round(item.masteryScore);

  // Dynamic Decision Tree for Practice CTA:
  // Concept -> Study Assistant (if score < 45) -> OA Practice (if score 45-75) -> Roadmap (if score > 75)
  let targetUrl = `/study-assistant?concept=${encodeURIComponent(item.concept.slug)}`;
  let targetLabel = 'Study Concept';
  let IconComponent = BookOpen;

  if (normScore >= 45 && normScore < 75) {
    targetUrl = `/oa-practice?topic=${encodeURIComponent(item.concept.slug)}`;
    targetLabel = 'Practice OA';
    IconComponent = Code;
  } else if (normScore >= 75) {
    targetUrl = `/roadmaps`;
    targetLabel = 'View Roadmap';
    IconComponent = Map;
  }

  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow bg-card flex flex-col justify-between">
      <CardHeader className="pb-3 border-b border-border/40 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
            {item.concept.category || 'Core CS'}
          </Badge>
          <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {item.attempts} attempts
          </span>
        </div>
        <CardTitle className="text-base font-bold text-foreground">
          {item.concept.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <MasteryBar score={normScore} level={item.masteryLevel} />

          <div className="grid grid-cols-2 gap-2 text-xs bg-muted/30 p-2.5 rounded-xl border border-border/40">
            <div>
              <span className="text-muted-foreground block text-[10px] font-semibold">Confidence</span>
              <span className="font-bold text-foreground">{Math.round(item.confidenceScore)}%</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] font-semibold">Status</span>
              <span className="font-bold text-foreground">{item.masteryLevel}</span>
            </div>
          </div>
        </div>

        <div className="pt-3">
          <Link href={targetUrl} className="w-full block">
            <Button variant="outline" size="sm" className="w-full font-bold text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
              <IconComponent className="w-3.5 h-3.5 mr-1.5" />
              {targetLabel}
              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
