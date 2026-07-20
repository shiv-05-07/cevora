'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AggregatedProfile } from '@/types/profile';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillsShowcaseProps {
  profile: AggregatedProfile;
}

export function SkillsShowcase({ profile }: SkillsShowcaseProps) {
  const { analytics, settings } = profile;

  // Extract skills rating dynamically
  const readiness = analytics.readiness;
  const skillBars = [
    { name: 'Frontend', value: readiness.projects },
    { name: 'Backend', value: readiness.projects - 5 },
    { name: 'DSA & Algorithms', value: readiness.coding },
    { name: 'System Design', value: readiness.systemDesign },
    { name: 'Communication', value: readiness.communication }
  ];

  // Grouped skill chips
  const skillGroups = [
    {
      category: 'Frontend Development',
      skills: [
        { name: 'React', level: 'Expert' },
        { name: 'Next.js', level: 'Expert' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'TypeScript', level: 'Expert' }
      ]
    },
    {
      category: 'Backend & Databases',
      skills: [
        { name: 'Node.js', level: 'Advanced' },
        { name: 'Express', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'Redis', level: 'Intermediate' }
      ]
    },
    {
      category: 'Programming & Logic',
      skills: [
        { name: 'Go', level: 'Advanced' },
        { name: 'Python', level: 'Advanced' },
        { name: 'C++', level: 'Intermediate' }
      ]
    },
    {
      category: 'AI & Machine Learning',
      skills: [
        { name: 'Prompt Engineering', level: 'Advanced' },
        { name: 'LLMs Integration', level: 'Intermediate' }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5';
      case 'Advanced': return 'border-blue-500/30 text-blue-500 bg-blue-500/5';
      case 'Intermediate': return 'border-amber-500/30 text-amber-500 bg-amber-500/5';
      default: return 'border-muted-foreground/30 text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card border-border/50 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/60 hover:shadow-md">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary" />
          Skills Showcase
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Visual Skill Gauges */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Skill Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {skillBars.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-foreground">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.value}%</span>
                </div>
                <Progress value={skill.value} className="h-2 [&_[data-slot=progress-indicator]]:bg-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Grouped Skills */}
        <div className="space-y-4 pt-4 border-t border-border/40">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grouped Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillGroups.map((group) => (
              <div key={group.category} className="space-y-2 border border-border/40 rounded-xl p-3 bg-muted/10">
                <span className="text-xs font-bold text-foreground block">{group.category}</span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <Badge 
                      key={s.name} 
                      variant="outline" 
                      className={cn("text-[10px] px-2 py-0.5 font-medium transition-all duration-200 hover:-translate-y-[1px]", getLevelColor(s.level))}
                    >
                      {s.name} <span className="text-[8px] opacity-70 ml-1">({s.level})</span>
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
