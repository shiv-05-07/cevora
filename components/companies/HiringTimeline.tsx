import * as React from 'react';
import { Company } from '@/types/company';

export function HiringTimeline({ company }: { company: Company }) {
  if (!company.timeline || company.timeline.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No specific timeline available yet.
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-border/40 ml-2 space-y-12 py-2">
      {company.timeline.map((item, index) => {
        // Map status logic exactly like Figma mockup
        const isCompleted = item.status === 'success' || item.status === 'neutral' || item.title.includes('Open');
        const isInProgress = item.status === 'warning' || item.title.includes('Interview');
        
        let statusBadge = 'Upcoming';
        let badgeColorClass = 'bg-muted/50 text-muted-foreground';
        let dotColorClass = 'bg-muted-foreground';

        if (isCompleted && index < 2) {
          statusBadge = 'Completed';
          badgeColorClass = 'bg-emerald-500/10 text-emerald-600';
          dotColorClass = 'bg-emerald-500';
        } else if (isInProgress && index === 2) {
          statusBadge = 'In Progress';
          badgeColorClass = 'bg-blue-500/10 text-blue-600';
          dotColorClass = 'bg-blue-500';
        }

        return (
          <div key={item.id} className="relative pl-8 flex items-center justify-between group">
            <div className={`absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${dotColorClass} ring-4 ring-background shadow-sm`} />
            
            <div className="flex flex-col space-y-0.5">
              <h4 className="font-extrabold text-sm text-foreground">{item.title}</h4>
              <p className="text-xs font-medium text-muted-foreground">{item.date || 'TBD'}</p>
            </div>
            
            <div className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${badgeColorClass}`}>
              {statusBadge}
            </div>
          </div>
        );
      })}
    </div>
  );
}
