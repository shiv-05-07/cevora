import { SkillMatch } from '@/types/resume';
import { Code, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SkillAnalysisProps {
  detected: SkillMatch[];
  missing: SkillMatch[];
}

export function SkillAnalysis({ detected, missing }: SkillAnalysisProps) {
  // Group skills by category for better display
  const groupSkills = (skills: SkillMatch[]) => {
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    }, {} as Record<string, string[]>);
  };

  const detectedGroups = groupSkills(detected);
  const missingGroups = groupSkills(missing);

  return (
    <div className="border border-border/60 rounded-2xl bg-card shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
          <Code className="w-4 h-4" />
          Skill Analysis
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Detected Skills */}
        <div className="space-y-4">
          <h4 className="font-bold text-emerald-500 text-sm flex items-center gap-1.5 border-b border-border/40 pb-2">
            Matched Skills ✅
          </h4>
          
          <div className="space-y-4">
            {Object.entries(detectedGroups).map(([category, skills]) => (
              <div key={category} className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{category}</span>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-600 border-emerald-500/20 font-semibold shadow-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="space-y-4">
          <h4 className="font-bold text-orange-500 text-sm flex items-center gap-1.5 border-b border-border/40 pb-2">
            Missing Skills ⚠️
          </h4>
          
          <div className="space-y-4">
            {Object.entries(missingGroups).map(([category, skills]) => (
              <div key={category} className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{category}</span>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <Badge key={skill} variant="outline" className="text-orange-500 border-orange-500/30 font-semibold border-dashed hover:bg-orange-500/10 cursor-pointer">
                      <PlusCircle className="w-3 h-3 mr-1" /> {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-medium text-muted-foreground pt-2">
            Clicking a missing skill will show you how to naturally incorporate it into your experience bullets.
          </p>
        </div>

      </div>
    </div>
  );
}
