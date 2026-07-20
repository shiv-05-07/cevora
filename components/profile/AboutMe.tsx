'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AggregatedProfile } from '@/types/profile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Edit3, Target, Briefcase, DollarSign, Languages, Star } from 'lucide-react';
import Link from 'next/link';

interface AboutMeProps {
  profile: AggregatedProfile;
  recruiterMode: boolean;
}

export function AboutMe({ profile, recruiterMode }: AboutMeProps) {
  const { settings } = profile;

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          About Me
        </CardTitle>
        {!recruiterMode && (
          <Link href="/settings">
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Edit3 className="w-3.5 h-3.5 mr-1" />
              Edit Settings
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Career Objectives</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Target Role</span>
                  <span className="text-sm font-semibold text-foreground">{settings.career.targetRole}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Dream Company</span>
                  <span className="text-sm font-semibold text-foreground">{settings.profile.dreamCompany}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Expected Package</span>
                  <span className="text-sm font-semibold text-foreground">{settings.career.expectedPackage}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preferences & Skills</h3>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-muted-foreground block font-medium mb-1">Languages Spoken</span>
                <div className="flex flex-wrap gap-1.5">
                  {settings.career.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-[10px]">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block font-medium mb-1">Core Tech Stack Interests</span>
                <div className="flex flex-wrap gap-1.5">
                  {settings.career.techStack.map((tech) => (
                    <Badge key={tech} variant="default" className="text-[10px] bg-primary/10 text-primary hover:bg-primary/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
