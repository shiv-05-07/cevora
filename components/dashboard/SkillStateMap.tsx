'use client';

import * as React from 'react';
import { SubjectSkillGroup, SkillLevel } from '@/lib/dashboard/dashboardAdapter';
import { Badge } from '@/components/ui/badge';
import { Code2, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillStateMapProps {
  skillGroups: SubjectSkillGroup[];
}

export function SkillStateMap({ skillGroups }: SkillStateMapProps) {
  const getBadgeStyle = (status: SkillLevel) => {
    switch (status) {
      case 'Strong':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold';
      case 'Developing':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold';
      case 'Needs work':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20 font-bold';
      case 'Not assessed':
      default:
        return 'bg-muted/30 text-muted-foreground border-border/40 font-medium italic';
    }
  };

  return (
    <div className="border border-border/70 rounded-3xl bg-card shadow-sm p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-foreground flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            Current Skill State
          </h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">
            Qualitative concept mastery derived from your baseline and ongoing practice activities.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs">
          <span className="flex items-center gap-1 text-emerald-500 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Strong
          </span>
          <span className="flex items-center gap-1 text-blue-500 font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Developing
          </span>
          <span className="flex items-center gap-1 text-amber-500 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Needs work
          </span>
          <span className="flex items-center gap-1 text-muted-foreground font-medium">
            <span className="w-2 h-2 rounded-full bg-muted-foreground/40" /> Not assessed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillGroups.map((group) => (
          <div key={group.subject} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-foreground tracking-wider uppercase">
                {group.subject}
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground">
                {group.skills.filter((s) => s.status !== 'Not assessed').length} of {group.skills.length} assessed
              </span>
            </div>

            <div className="space-y-2">
              {group.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-2.5 rounded-xl border border-border/40 bg-muted/5 flex items-center justify-between gap-2 hover:bg-muted/10 transition-colors text-xs"
                >
                  <span className="font-medium text-foreground truncate">{skill.name}</span>
                  <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5 shrink-0 uppercase tracking-wider", getBadgeStyle(skill.status))}>
                    {skill.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
