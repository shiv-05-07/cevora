import * as React from 'react';
import { Company } from '@/types/company';

// Mock logic to categorize skills
const categorizeSkills = (skills: string[]) => {
  const groups: Record<string, string[]> = {
    'Programming Languages': [],
    'Data Structures & Algorithms': [],
    'Core Subjects': [],
    'Frameworks & Tools': []
  };

  skills.forEach(skill => {
    const s = skill.toLowerCase();
    if (s.includes('java') || s.includes('c++') || s.includes('python') || s.includes('go') || s.includes('c#') || s === 'c') {
      groups['Programming Languages'].push(skill);
    } else if (s.includes('algorithms') || s.includes('data structures') || s.includes('arrays') || s.includes('dp') || s.includes('graphs')) {
      groups['Data Structures & Algorithms'].push(skill);
    } else if (s.includes('os') || s.includes('dbms') || s.includes('sql') || s.includes('network') || s.includes('system design') || s.includes('cn') || s.includes('oops')) {
      groups['Core Subjects'].push(skill);
    } else {
      groups['Frameworks & Tools'].push(skill);
    }
  });

  return groups;
};

export function RequiredSkills({ company }: { company: Company }) {
  const groupedSkills = categorizeSkills(company.requiredSkills);

  return (
    <div className="space-y-8">
      {Object.entries(groupedSkills).map(([category, skills]) => {
        if (skills.length === 0) return null;
        return (
          <div key={category} className="space-y-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{category}</span>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-lg bg-secondary/40 text-secondary-foreground text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
