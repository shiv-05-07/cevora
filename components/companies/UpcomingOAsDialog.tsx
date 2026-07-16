'use client';

import * as React from 'react';
import { Company } from '@/types/company';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { MapPin, IndianRupee, ArrowRight } from 'lucide-react';

interface UpcomingOAsDialogProps {
  companies: Company[];
  isOpen: boolean;
  onClose: () => void;
  onViewCompany: (company: Company) => void;
}

export function UpcomingOAsDialog({ companies, isOpen, onClose, onViewCompany }: UpcomingOAsDialogProps) {
  // Filter for companies that have an upcoming OA (simplified mock logic)
  const upcomingOAs = companies.filter(c => 
    c.timeline.some(t => t.title.toLowerCase().includes('assessment') && (t.status === 'warning' || t.status === 'info' || t.status === 'neutral'))
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl">
        <DialogHeader className="p-6 pb-4 sticky top-0 bg-background/95 backdrop-blur z-10 border-b border-border/40">
          <DialogTitle className="text-lg font-bold tracking-tight">Upcoming Online Assessments</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            You have {upcomingOAs.length} assessments scheduled or approaching soon.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-4">
          {upcomingOAs.map(company => {
            const oaEvent = company.timeline.find(t => t.title.toLowerCase().includes('assessment'));
            
            return (
              <div key={company.id} className="p-4 rounded-xl border border-border/60 bg-muted/10 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-background border border-border/40 p-2 flex items-center justify-center shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={company.logo} alt={company.companyName} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base tracking-tight">{company.companyName}</h4>
                    <p className="text-xs font-medium text-muted-foreground">{company.role}</p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="flex items-center text-[10px] font-semibold text-muted-foreground">
                        <IndianRupee className="w-3 h-3 mr-1 text-primary/70" /> {company.package}
                      </span>
                      <span className="flex items-center text-[10px] font-semibold text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1 text-primary/70" /> {company.location}
                      </span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {company.oaDifficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <StatusBadge status="warning" className="text-[10px]">
                    {oaEvent?.date || 'Upcoming'}
                  </StatusBadge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs font-semibold px-2 -mr-2 text-primary"
                    onClick={() => {
                      onClose();
                      onViewCompany(company);
                    }}
                  >
                    View Details <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            );
          })}

          {upcomingOAs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No upcoming online assessments found.
            </div>
          )}
        </div>

        <div className="p-6 pt-4 sticky bottom-0 bg-background/95 backdrop-blur border-t border-border/40 mt-auto flex items-center justify-end z-10">
          <Button variant="outline" onClick={onClose} className="font-semibold">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
