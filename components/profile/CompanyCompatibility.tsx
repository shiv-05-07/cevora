'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CompanyReadiness } from '@/types/analytics';
import { Building2, Target, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CompanyCompatibilityProps {
  companies: CompanyReadiness[];
}

export function CompanyCompatibility({ companies }: CompanyCompatibilityProps) {
  if (!companies || companies.length === 0) {
    return (
      <Card className="bg-card border-border/50 shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
        <Target className="w-10 h-10 text-muted-foreground/60 mb-2" />
        <h3 className="font-bold text-base text-foreground">No Target Companies</h3>
        <p className="text-xs text-muted-foreground">Add companies to your target list in Analytics to calculate match compatibility.</p>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Company Target & Compatibility
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {companies.map((company) => {
            const isReady = company.status === 'Ready';
            const isAlmostReady = company.status === 'Almost Ready';

            return (
              <Card 
                key={company.id} 
                className="bg-muted/10 border border-border/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-border/80"
              >
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center border border-border/50">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">{company.name}</h4>
                        <span className="text-[10px] text-muted-foreground">{company.overallReadiness}% Compatibility Match</span>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[9px] px-1.5 py-0.5",
                        isReady ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                        isAlmostReady ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                        "bg-destructive/10 text-destructive border-destructive/20"
                      )}
                    >
                      {company.status}
                    </Badge>
                  </div>

                  {/* Compatibility Bar */}
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000 ease-out",
                          isReady ? "bg-emerald-500" : isAlmostReady ? "bg-amber-500" : "bg-primary"
                        )}
                        style={{ width: `${company.overallReadiness}%` }}
                      />
                    </div>
                  </div>

                  {/* Missing Skills list */}
                  <div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                      {company.missingSkills.length > 0 ? 'Remaining Skills To Target' : 'All Requirements Met'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {company.missingSkills.length > 0 ? (
                        company.missingSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-[9px] px-1.5 py-0">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="secondary" className="text-[9px] bg-emerald-500/10 text-emerald-500 border-none px-1.5 py-0">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Ready to Apply
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Expected prep time */}
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground bg-muted/40 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Expected Prep Time
                    </span>
                    <span className="font-semibold text-foreground">{company.estimatedPrepTime}</span>
                  </div>
                </div>

                <div className="border-t border-border/40 bg-muted/20">
                  <Link 
                    href={company.nextAction.href}
                    className="flex items-center justify-between p-3 text-[10px] hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="text-[8px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">Recommended Next Action</span>
                      <span className="font-bold text-primary">{company.nextAction.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
