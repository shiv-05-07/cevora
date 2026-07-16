import * as React from 'react';
import { Company } from '@/types/company';
import { GraduationCap, Users, Calendar, Building } from 'lucide-react';

export function EligibilitySection({ company }: { company: Company }) {
  return (
    <div className="border border-border/40 rounded-2xl bg-card shadow-sm p-2 flex flex-col">
      <div className="flex items-start gap-4 p-4 border-b border-border/40 last:border-0">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
          <GraduationCap className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">CGPA Criteria</p>
          <p className="font-extrabold text-sm text-foreground">{company.cgpaCriteria}</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4 p-4 border-b border-border/40 last:border-0">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
          <Users className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Eligible Branches</p>
          <ul className="space-y-1.5">
            {company.eligibleBranches.map(branch => (
              <li key={branch} className="flex items-center text-sm font-semibold text-foreground/90">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2.5" />
                {branch}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex items-start gap-4 p-4 border-b border-border/40 last:border-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Batch</p>
          <p className="font-bold text-sm text-foreground/90">• 2023, 2024, 2025</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4 p-4 border-b border-border/40 last:border-0">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
          <Building className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Degree</p>
          <p className="font-bold text-sm text-foreground/90">• B.Tech / B.E</p>
        </div>
      </div>
    </div>
  );
}
