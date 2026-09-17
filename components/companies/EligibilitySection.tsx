import * as React from 'react';
import { Company } from '@/types/company';
import { GraduationCap, Users, Calendar, Building } from 'lucide-react';

export function EligibilitySection({ company }: { company: any }) {
  const criteria = company.eligibility?.criteria || [];
  
  if (criteria.length === 0) {
    return <div className="text-sm text-muted-foreground">No eligibility criteria available.</div>;
  }

  return (
    <div className="border border-border/40 rounded-2xl bg-card shadow-sm p-2 flex flex-col">
      {criteria.map((c: any, idx: number) => (
        <div key={idx} className="flex items-start gap-4 p-4 border-b border-border/40 last:border-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            c.status === 'satisfied' ? 'bg-green-500/10 text-green-600' :
            c.status === 'failed' ? 'bg-red-500/10 text-red-600' :
            'bg-amber-500/10 text-amber-600'
          }`}>
            {c.status === 'satisfied' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : c.status === 'failed' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{c.key}</p>
            <p className="font-semibold text-sm text-foreground/90">
              Required: {c.required.replace('>=', '').replace('<=', '')} 
              <br/>
              <span className={c.status === 'satisfied' ? 'text-green-600 font-medium' : c.status === 'failed' ? 'text-red-600 font-medium' : 'text-amber-600 font-medium'}>
                Your profile: {c.actual}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
