import * as React from 'react';
import { Company } from '@/types/company';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { MapPin, Briefcase, IndianRupee, Clock } from 'lucide-react';

export function CompanyOverview({ company }: { company: Company }) {
  // Extract primary role and full description if available (e.g., "SDE 1 (Software Development Engineer)")
  const roleParts = company.role.split('(');
  const primaryRole = roleParts[0].trim();
  const secondaryRole = roleParts.length > 1 ? `(${roleParts[1]}` : null;

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full items-start">
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white border border-border/40 p-4 sm:p-6 flex items-center justify-center shrink-0 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={company.logo} alt={company.companyName} className="w-full h-full object-contain drop-shadow-sm" />
      </div>
      
      <div className="flex-1 space-y-4 pt-1 w-full">
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{company.companyName}</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold text-primary">{primaryRole}</span>
            <StatusBadge 
              status={
                company.hiringStatus === 'Active' ? 'success' :
                company.hiringStatus === 'Upcoming' ? 'warning' :
                company.hiringStatus === 'Pending' ? 'neutral' :
                company.hiringStatus === 'Shortlisted' ? 'info' : 'danger'
              }
              className="text-xs px-3 py-1 bg-warning/20 text-warning-foreground" // Force styling to closely match Figma "Upcoming" badge logic if needed
            >
              {company.hiringStatus}
            </StatusBadge>
          </div>
          
          {secondaryRole && (
            <p className="text-sm font-semibold text-muted-foreground">{secondaryRole}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-bold bg-muted/40 px-3 py-1.5 rounded-full border border-border/40">
            <IndianRupee className="w-3.5 h-3.5 text-primary" />
            {company.package}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold bg-muted/40 px-3 py-1.5 rounded-full border border-border/40">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {company.location}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold bg-muted/40 px-3 py-1.5 rounded-full border border-border/40">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            {company.workMode}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold bg-destructive/5 text-destructive px-3 py-1.5 rounded-full border border-destructive/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Deadline: {company.applicationDeadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
