'use client';

import * as React from 'react';
import { Roadmap } from '@/types/roadmap';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bookmark, Play, Target, CheckCircle2, Zap, GraduationCap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ModuleCard } from './ModuleCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';

interface RoadmapDetailsDialogProps {
  roadmap: Roadmap | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RoadmapDetailsDialog({ roadmap, isOpen, onClose }: RoadmapDetailsDialogProps) {
  if (!roadmap) return null;

  const totalLessons = roadmap.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = roadmap.modules.reduce((acc, mod) => acc + mod.lessons.filter(l => l.isCompleted).length, 0);
  const completion = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[1400px] h-[90vh] sm:h-[90vh] max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-3xl bg-background flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>{roadmap.title} Details</DialogTitle>
          <DialogDescription>Detailed view of {roadmap.title}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 px-8 lg:px-12 py-12">
          {/* Main Content Grid: Strict 2-column layout top-to-bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT COLUMN (Main Content) */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              
              {/* Roadmap Banner */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
                    {roadmap.difficulty}
                  </Badge>
                  {roadmap.company && (
                    <Badge variant="outline" className="border-border/60">
                      {roadmap.company}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  {roadmap.title}
                </h1>
                <p className="text-lg font-medium text-muted-foreground max-w-3xl leading-relaxed">
                  {roadmap.description}
                </p>
              </div>

              {/* Learning Outcomes */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> What you will achieve
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {roadmap.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-foreground/90">{outcome}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Modules */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight">Learning Modules</h3>
                  <span className="text-sm font-bold text-muted-foreground">{roadmap.modules.length} Modules</span>
                </div>
                <div className="space-y-4">
                  {roadmap.modules.map(mod => (
                    <ModuleCard key={mod.id} module={mod} />
                  ))}
                </div>
              </section>

              {/* AI Mentor Tips */}
              {roadmap.mentorTips.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" /> AI Mentor Recommendations
                  </h3>
                  <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-4">
                    {roadmap.mentorTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <p className="text-sm font-medium text-amber-900 dark:text-amber-200/80 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Recommended Resources */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">Recommended Resources</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {roadmap.resources.map(res => (
                    <QuickActionCard 
                      key={res.id} 
                      title={res.title} 
                      description={res.type.charAt(0).toUpperCase() + res.type.slice(1)} 
                      icon={GraduationCap} 
                    />
                  ))}
                  {roadmap.resources.length === 0 && (
                    <div className="col-span-full text-sm font-medium text-muted-foreground italic">
                      No specific external resources required.
                    </div>
                  )}
                </div>
              </section>

            </div>
            
            {/* RIGHT COLUMN (Sidebar) */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              
              {/* Progress Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <h4 className="font-extrabold text-2xl">{completion}%</h4>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Completed</span>
                  </div>
                  <Progress value={completion} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Duration</span>
                    <p className="font-extrabold text-foreground">{roadmap.estimatedDuration}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Enrolled</span>
                    <p className="font-extrabold text-foreground">{(roadmap.studentsEnrolled/1000).toFixed(1)}k</p>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold tracking-tight">Prerequisites</h3>
                <ul className="space-y-3 p-5 rounded-2xl bg-muted/20 border border-border/40">
                  {roadmap.prerequisites.map((req, idx) => (
                    <li key={idx} className="flex items-start text-sm font-semibold text-foreground/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-3 mt-1.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Required Skills */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold tracking-tight">Skills Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {roadmap.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1.5 bg-secondary/40 text-secondary-foreground text-sm font-semibold">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Sticky Sidebar Actions */}
              <div className="sticky bottom-0 pt-6 mt-auto pb-2 bg-background border-t border-border/40 flex flex-col gap-3">
                <Button className="w-full font-bold h-12 text-sm shadow-sm" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  {completion > 0 ? 'Continue Learning' : 'Start Roadmap'}
                </Button>
                <Button variant="outline" className="w-full font-bold h-12 text-sm shadow-sm" size="lg">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save for Later
                </Button>
              </div>

            </div>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
