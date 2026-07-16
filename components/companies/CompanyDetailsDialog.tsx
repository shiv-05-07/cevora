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
import { Bookmark, ExternalLink, Users, Code, BarChart } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

import { CompanyOverview } from './CompanyOverview';
import { EligibilitySection } from './EligibilitySection';
import { RequiredSkills } from './RequiredSkills';
import { HiringTimeline } from './HiringTimeline';
import { PreparationResources } from './PreparationResources';
import { InterviewExperiencePreview } from './InterviewExperiencePreview';

interface CompanyDetailsDialogProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyDetailsDialog({ company, isOpen, onClose }: CompanyDetailsDialogProps) {
  if (!company) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[1400px] h-[90vh] sm:h-[90vh] max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-3xl bg-background flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>{company.companyName} Details</DialogTitle>
          <DialogDescription>Detailed view of {company.companyName}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 px-8 lg:px-12 py-12">
          {/* Main Content Grid: Strict 2-column layout top-to-bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT COLUMN (Main Content) */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              
              <CompanyOverview company={company} />
              
              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">About the Role</h3>
                <div className="text-[15px] text-foreground/80 leading-relaxed font-medium space-y-4 max-w-4xl">
                  {company.description.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
              
              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">Selection Process Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl border border-border/40 bg-card shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Total Rounds</p>
                      <p className="text-2xl font-extrabold">{company.interviewRounds}</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/40 bg-card shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                      <Code className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">OA Difficulty</p>
                      <p className="text-2xl font-extrabold">{company.oaDifficulty}</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl border border-border/40 bg-card shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <BarChart className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Interview Level</p>
                      <p className="text-2xl font-extrabold">{company.interviewDifficulty}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight">Interview Experience</h3>
                  <Button variant="link" className="text-primary font-bold px-0">
                    View all experiences <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <InterviewExperiencePreview company={company} />
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">Preparation Resources</h3>
                <PreparationResources />
              </section>

            </div>
            
            {/* RIGHT COLUMN (Sidebar) */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              
              <section className="space-y-4">
                <h3 className="text-lg font-bold tracking-tight">Eligibility</h3>
                <EligibilitySection company={company} />
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-bold tracking-tight">Required Skills</h3>
                <RequiredSkills company={company} />
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-bold tracking-tight">Hiring Timeline</h3>
                <HiringTimeline company={company} />
              </section>

              {/* Sticky Sidebar Actions */}
              <div className="sticky bottom-0 pt-6 mt-4 pb-2 bg-background border-t border-border/40 flex flex-col gap-3">
                <Button variant="outline" onClick={onClose} className="w-full font-bold h-12 text-sm shadow-sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Company
                </Button>
                <Button className="w-full font-bold h-12 text-sm shadow-sm">
                  Apply on Portal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

            </div>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
