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
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { StatCard } from '@/components/dashboard/StatCard';
import { CalendarDays, ArrowRight, Clock, FileText, Briefcase, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HiringCalendarDialogProps {
  companies: Company[];
  isOpen: boolean;
  onClose: () => void;
  onViewCompany: (company: Company) => void;
}

export function HiringCalendarDialog({ companies, isOpen, onClose, onViewCompany }: HiringCalendarDialogProps) {
  // Sort companies by application deadline for the right panel
  const sortedCompanies = React.useMemo(() => {
    return [...companies].sort((a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime());
  }, [companies]);

  const thisWeek = sortedCompanies.slice(0, 3);
  const later = sortedCompanies.slice(3, 7);

  // Mock Calendar Generation (Fixed 35 cells for a clean grid)
  const daysInMonth = 31;
  const startDayOffset = 3; // Starts on Wednesday
  const calendarCells = Array.from({ length: 35 }).map((_, i) => {
    const date = i - startDayOffset + 1;
    const isCurrentMonth = date > 0 && date <= daysInMonth;
    
    // Assign mock events based on modulo to distribute them
    let events = [];
    if (isCurrentMonth) {
      if (date === 5 || date === 12 || date === 26) events.push('deadline'); // Red
      if (date === 8 || date === 15 || date === 19) events.push('assessment'); // Orange
      if (date === 2 || date === 22 || date === 29) events.push('application'); // Green
    }
    
    return {
      date,
      isCurrentMonth,
      isToday: date === 15,
      events
    };
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[1400px] h-[90vh] max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl bg-background flex flex-col">
        <DialogHeader className="p-8 pb-6 sticky top-0 bg-background/95 backdrop-blur z-20 border-b border-border/40 flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-extrabold tracking-tight">Hiring Calendar</DialogTitle>
              <DialogDescription className="text-sm font-medium text-muted-foreground mt-1">
                July 2026 • Upcoming deadlines, assessments, and interviews.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 p-8 space-y-10">
          {/* Summary StatCards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Events" value="7" icon={CalendarIcon} className="shadow-none hover:shadow-none hover:-translate-y-0 cursor-default hover:border-border/60" />
            <StatCard title="Resume Deadlines" value="3" icon={Clock} className="shadow-none hover:shadow-none hover:-translate-y-0 cursor-default hover:border-border/60" />
            <StatCard title="Online Assessments" value="2" icon={FileText} className="shadow-none hover:shadow-none hover:-translate-y-0 cursor-default hover:border-border/60" />
            <StatCard title="Interviews" value="1" icon={Briefcase} className="shadow-none hover:shadow-none hover:-translate-y-0 cursor-default hover:border-border/60" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT: Monthly Calendar */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <h3 className="text-lg font-bold tracking-tight">July 2026</h3>
              
              <div className="border border-border/60 rounded-2xl bg-card overflow-hidden shadow-sm">
                <div className="grid grid-cols-7 bg-muted/30 border-b border-border/40">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7">
                  {calendarCells.map((cell, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "min-h-[100px] p-2 border-r border-b border-border/40 transition-colors hover:bg-muted/10 cursor-pointer relative",
                        !cell.isCurrentMonth && "bg-muted/5 opacity-50",
                        cell.isToday && "bg-primary/5"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <span className={cn(
                          "w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold",
                          cell.isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                        )}>
                          {cell.isCurrentMonth ? cell.date : ''}
                        </span>
                      </div>
                      
                      <div className="mt-2 space-y-1.5 px-1">
                        {cell.events.map((evt, idx) => (
                          <div 
                            key={idx} 
                            className={cn(
                              "w-full h-1.5 rounded-full",
                              evt === 'deadline' && "bg-destructive",
                              evt === 'assessment' && "bg-warning",
                              evt === 'application' && "bg-success"
                            )}
                            title={evt}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-6 pt-2 px-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><div className="w-2.5 h-2.5 rounded-full bg-success" /> Applications Open</div>
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><div className="w-2.5 h-2.5 rounded-full bg-warning" /> Assessments / Interviews</div>
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><div className="w-2.5 h-2.5 rounded-full bg-destructive" /> Deadlines</div>
              </div>
            </div>

            {/* RIGHT: Upcoming Events */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              <h3 className="text-lg font-bold tracking-tight">Upcoming Events</h3>
              
              <div className="space-y-4">
                {thisWeek.map(company => (
                  <div key={company.id} className="p-4 rounded-xl border border-border/60 bg-card shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col gap-3 group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted/30 border border-border/40 p-1.5 flex items-center justify-center shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={company.logo} alt={company.companyName} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h5 className="font-bold text-sm tracking-tight">{company.companyName}</h5>
                          <p className="text-xs font-medium text-muted-foreground">{company.role}</p>
                        </div>
                      </div>
                      <StatusBadge status="danger" className="text-[10px]">2 Days</StatusBadge>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/40 pt-3">
                      <div>
                        <p className="text-xs font-extrabold text-destructive">{company.applicationDeadline}</p>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Resume Deadline</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-primary px-2 opacity-0 group-hover:opacity-100 transition-opacity -mr-2" onClick={() => { onClose(); onViewCompany(company); }}>
                        View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        <div className="p-6 pt-4 sticky bottom-0 bg-background/95 backdrop-blur border-t border-border/40 mt-auto flex items-center justify-end gap-3 z-20">
          <Button variant="outline" onClick={onClose} className="font-semibold">
            Close Calendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
