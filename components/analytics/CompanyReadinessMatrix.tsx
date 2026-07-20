'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { CompanyReadiness } from '@/types/analytics';
import { Building2, Target, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { EmptyState } from './EmptyState';

export function CompanyReadinessMatrix({ companies }: { companies: CompanyReadiness[] }) {
  if (!companies || companies.length === 0) {
    return (
      <section className="space-y-4 mt-8">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">Target Company Readiness</h2>
        </div>
        <EmptyState 
          icon={Building2}
          title="No Target Companies"
          description="Add companies to your target list to track your readiness and missing skills."
          actionLabel="Browse Companies"
          actionHref="/companies"
        />
      </section>
    );
  }

  return (
    <section className="space-y-4 mt-8">
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold tracking-tight">Target Company Readiness</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {companies.map((company) => {
          const isReady = company.status === 'Ready';
          const isAlmostReady = company.status === 'Almost Ready';
          
          return (
            <Card key={company.id} className="group bg-card border-border/50 shadow-sm transition-all duration-300 ease-out hover:border-border/60 hover:shadow-md hover:-translate-y-[2px] overflow-hidden flex flex-col">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{company.name}</CardTitle>
                    <div className="text-sm font-semibold mt-0.5">{company.overallReadiness}% Match</div>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    isReady ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                    isAlmostReady ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                    "bg-destructive/10 text-destructive border-destructive/20"
                  )}
                >
                  {company.status}
                </Badge>
              </CardHeader>

              <CardContent className="pt-0 flex-grow">
                <div className="mb-4">
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        isReady ? "bg-emerald-500" : isAlmostReady ? "bg-amber-500" : "bg-primary"
                      )}
                      style={{ width: `${company.overallReadiness}%` }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {company.missingSkills.length > 0 ? 'Missing Skills' : 'All Requirements Met'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {company.missingSkills.length > 0 ? (
                      company.missingSkills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-[10px]">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Ready to Apply
                      </Badge>
                    )}
                  </div>
                </div>

                <Accordion className="w-full relative z-10">
                  <AccordionItem value="breakdown" className="border-border/40">
                    <AccordionTrigger className="text-sm py-2 hover:no-underline hover:text-primary">
                      View Detailed Breakdown
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="space-y-3 mb-4">
                        {[
                          { label: 'Coding (DSA)', value: company.breakdown.coding },
                          { label: 'System Design', value: company.requiredSkills.includes('System Design') ? 60 : 100 },
                          { label: 'Resume ATS', value: company.breakdown.resume },
                          { label: 'Behavioral', value: company.breakdown.behavioral },
                        ].map((metric) => (
                          <div key={metric.label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">{metric.label}</span>
                              <span className="font-medium">{metric.value}%</span>
                            </div>
                            <Progress value={metric.value} className="h-1 [&_[data-slot=progress-indicator]]:bg-primary" />
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs mb-4 text-muted-foreground bg-secondary/50 p-2 rounded-md">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Est. Prep Time
                        </span>
                        <span className="font-medium text-foreground">{company.estimatedPrepTime}</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>

              {/* Hover Footer */}
              <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300 bg-muted/40 border-t border-border/40 mt-auto">
                <div className="overflow-hidden">
                  <Link href={company.nextAction.href} className="flex items-center justify-between p-3 text-xs hover:bg-muted/80 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider mb-0.5">Recommended Next Step</span>
                      <span className="font-medium text-primary">{company.nextAction.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                </div>
              </div>

            </Card>
          );
        })}
      </div>
    </section>
  );
}
