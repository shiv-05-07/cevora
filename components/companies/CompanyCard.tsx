'use client';

import * as React from 'react';
import { MapPin, Briefcase, IndianRupee, Clock, ArrowRight, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Company } from '@/types/company';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CompanyCardProps {
  company: Company;
  onViewDetails: (company: Company) => void;
  className?: string;
}

export function CompanyCard({ company, onViewDetails, className }: CompanyCardProps) {
  const isClickable = !!onViewDetails;

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
          <div className="w-14 h-14 rounded-xl bg-muted/30 border border-border/40 p-2.5 flex items-center justify-center shrink-0 overflow-hidden relative transition-colors duration-300 group-hover:bg-primary/5 group-hover:border-primary/20">
            {/* Fallback to simple img tag for mock logos, in real app use next/image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={company.logo} 
              alt={`${company.companyName} logo`} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-base truncate tracking-tight text-foreground">{company.companyName}</h3>
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
            <span className="truncate">{company.package}</span>
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
