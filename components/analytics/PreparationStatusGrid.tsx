'use client';

import * as React from 'react';
import { PreparationStatusItem } from '@/features/analytics/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, FileText, MapPin, Code2, Video, ArrowRight, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PreparationStatusGridProps {
  items: PreparationStatusItem[];
}

const ICON_MAP: Record<PreparationStatusItem['id'], React.ElementType> = {
  resume: FileText,
  roadmap: MapPin,
  practice: Code2,
  interview: Video,
};

export function PreparationStatusGrid({ items }: PreparationStatusGridProps) {
  return (
    <Card className="border border-border/60 shadow-sm h-full flex flex-col justify-between">
      <div>
        <CardHeader className="pb-4 border-b border-border/40">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Preparation Status</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Cross-feature readiness status across core Cevora tools
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {items.map((item) => {
            const IconComp = ICON_MAP[item.id] || FileText;

            return (
              <div
                key={item.id}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                  item.hasData
                    ? "bg-card border-border/60 hover:border-border"
                    : "bg-muted/30 border-dashed border-border/60"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "p-2.5 rounded-xl shrink-0 mt-0.5 sm:mt-0",
                      item.hasData
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.title}
                      </h4>
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          item.hasData ? "bg-emerald-500" : "bg-amber-500/60"
                        )}
                      />
                    </div>
                    <p className="text-sm font-bold text-foreground mt-0.5">
                      {item.statusText}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {item.detailText}
                    </p>
                  </div>
                </div>

                <Link href={item.ctaHref} className="shrink-0 self-end sm:self-center">
                  <Button
                    variant={item.hasData ? "outline" : "default"}
                    size="sm"
                    className="text-xs h-8 gap-1.5 font-medium group"
                  >
                    {item.hasData ? (
                      <>
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Get Started</span>
                      </>
                    )}
                  </Button>
                </Link>
              </div>
            );
          })}
        </CardContent>
      </div>
    </Card>
  );
}
