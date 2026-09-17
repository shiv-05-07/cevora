'use client';

import * as React from 'react';
import { MapPin, Briefcase, IndianRupee, Clock, ArrowRight, Bookmark, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Company } from '@/types/company';
import { cn } from '@/lib/utils';

interface CompanyCardProps {
  company: any;
  onViewDetails: (company: Company) => void;
  className?: string;
}

export function CompanyCard({ company, onViewDetails, className }: CompanyCardProps) {
  const isClickable = !!onViewDetails;
  const [imgError, setImgError] = React.useState(false);

  // Helper to generate clean initials for logo fallback (e.g., "Google" -> "G", "TCS Digital" -> "TCS")
  const getInitials = (name: string) => {
    if (!name) return 'CO';
    const words = name.split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <Card 
      className={cn(
        'group overflow-hidden relative transition-all duration-300 border-border/60 bg-card flex flex-col h-full',
        isClickable && 'hover:border-primary/30 hover:shadow-md hover:-translate-y-1',
        className
      )}
    >
      <CardContent className="p-6 flex flex-col h-full flex-1 gap-5">
        {/* Header: Logo and Title */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-muted/40 border border-border/40 p-2 flex items-center justify-center shrink-0 overflow-hidden relative transition-colors duration-300 group-hover:bg-primary/5 group-hover:border-primary/20">
            {company.logo && !imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={company.logo} 
                alt={`${company.companyName} logo`} 
                onError={() => setImgError(true)}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-primary text-base select-none">
                {getInitials(company.companyName)}
              </div>
            )}
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base truncate tracking-tight text-foreground">{company.companyName}</h3>
                {company.isMock && (
                  <Badge variant="outline" className="text-[9px] uppercase tracking-wider text-amber-500 border-amber-500/30 bg-amber-500/10 h-4 px-1.5 leading-none">
                    Mock
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary shrink-0 -mr-2">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm font-semibold text-muted-foreground truncate">{company.role}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="flex items-center text-xs text-muted-foreground font-medium">
            <IndianRupee className="w-4 h-4 mr-1.5 shrink-0 text-primary/70" />
            <span className="truncate font-semibold text-foreground/90">{company.package}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground font-medium">
            <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-primary/70" />
            <span className="truncate">{company.location}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground font-medium">
            <Briefcase className="w-4 h-4 mr-1.5 shrink-0 text-primary/70" />
            <span className="truncate">{company.workMode}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground font-medium">
            <Clock className="w-4 h-4 mr-1.5 shrink-0 text-primary/70" />
            <span className="truncate">{company.applicationDeadline}</span>
          </div>
        </div>

        {/* Status & Eligibility */}
        <div className="flex items-center gap-2 mt-auto pt-1 flex-wrap">
          <StatusBadge 
            status={
              company.hiringStatus === 'Active' ? 'success' :
              company.hiringStatus === 'Upcoming' ? 'warning' :
              company.hiringStatus === 'Pending' ? 'neutral' :
              company.hiringStatus === 'Shortlisted' ? 'info' : 'danger'
            }
            className="text-[10px] px-2 py-0.5"
          >
            {company.hiringStatus}
          </StatusBadge>
          <Badge variant="secondary" className="text-[10px] font-normal px-2 py-0.5 rounded-sm">
            {company.cgpaCriteria}
          </Badge>
          <Badge variant="outline" className="text-[10px] font-normal px-2 py-0.5 border-dashed">
            {company.oaDifficulty} OA
          </Badge>
        </div>

        {/* Intelligence Insights */}
        {company.matchCategory === 'Prepare First' && company.eligibility?.failedCriteria?.length > 0 && (
          <div className="mt-2 bg-destructive/10 border border-destructive/20 rounded-lg p-2 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-destructive">Preparation Required</p>
              <p className="text-[10px] text-destructive/80 mt-0.5">Missing: {company.eligibility.failedCriteria.join(', ')}</p>
            </div>
          </div>
        )}

        {company.matchCategory === 'Best Matches' && (
          <div className="mt-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Excellent Fit ✨</p>
              {company.geminiScores?.reason && (
                <p className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5 leading-snug">{company.geminiScores.reason}</p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 mt-2 border-t border-border/40">
          <Button 
            className="w-full h-9 text-xs font-bold shadow-sm" 
            onClick={() => onViewDetails(company)}
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
