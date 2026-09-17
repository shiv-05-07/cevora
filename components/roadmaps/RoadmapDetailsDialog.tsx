'use client';

import * as React from 'react';
import { Roadmap, Lesson } from '@/types/roadmap';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion } from '@/components/ui/accordion';
import { ModuleCard } from './ModuleCard';
import {
  Target,
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen,
  Award,
  ArrowRight,
  Trash2,
  Clock,
  Layers,
  Compass,
  PlayCircle
} from 'lucide-react';

interface RoadmapDetailsDialogProps {
  roadmap: Roadmap | null;
  isOpen: boolean;
  isSaved: boolean;
  isStarted: boolean;
  completedLessonIds: string[];
  nextIncompleteLesson: { moduleTitle: string; lesson: Lesson } | null;
  onClose: () => void;
  onToggleSave: (roadmapId: string) => void;
  onStartRoadmap: (roadmapId: string) => void;
  onToggleLesson: (roadmapId: string, lessonId: string, completed: boolean, totalLessons: number) => void;
  onRemoveProgress?: (roadmapId: string) => void;
}

export function RoadmapDetailsDialog({
  roadmap,
  isOpen,
  isSaved,
  isStarted,
  completedLessonIds,
  nextIncompleteLesson,
  onClose,
  onToggleSave,
  onStartRoadmap,
  onToggleLesson,
  onRemoveProgress,
}: RoadmapDetailsDialogProps) {
  const [openAccordionValues, setOpenAccordionValues] = React.useState<string[]>([]);
  const [showRemoveConfirm, setShowRemoveConfirm] = React.useState(false);
  const prevIsOpenRef = React.useRef(false);
  const prevRoadmapIdRef = React.useRef<string | null>(null);

  // Calculate totals and percentage dynamically from lesson progress source of truth
  const allLessons = React.useMemo(
    () => (roadmap ? roadmap.modules.flatMap(m => m.lessons) : []),
    [roadmap]
  );
  const totalLessons = allLessons.length;
  const completedCount = React.useMemo(
    () => allLessons.filter(l => completedLessonIds.includes(l.id)).length,
    [allLessons, completedLessonIds]
  );
  const progressPercentage = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
  const isCompleted = progressPercentage === 100 && totalLessons > 0;
  const hasProgress = completedCount > 0 || isStarted;

  // Auto-expand module containing next incomplete lesson ONLY when dialog first opens or roadmap changes
  React.useEffect(() => {
    const isNewOpen = isOpen && (!prevIsOpenRef.current || prevRoadmapIdRef.current !== roadmap?.id);
    if (isNewOpen && roadmap) {
      if (nextIncompleteLesson) {
        const parentModule = roadmap.modules.find(m =>
          m.lessons.some(l => l.id === nextIncompleteLesson.lesson.id)
        );
        if (parentModule) {
          setOpenAccordionValues([parentModule.id]);
        } else if (roadmap.modules.length > 0) {
          setOpenAccordionValues([roadmap.modules[0].id]);
        }
      } else if (roadmap.modules.length > 0) {
        setOpenAccordionValues([roadmap.modules[0].id]);
      }
    }
    prevIsOpenRef.current = isOpen;
    prevRoadmapIdRef.current = roadmap?.id || null;
  }, [isOpen, roadmap?.id, nextIncompleteLesson]);

  if (!roadmap) return null;

  const handleContinueClick = () => {
    if (!hasProgress) {
      onStartRoadmap(roadmap.id);
    }
    if (nextIncompleteLesson) {
      const parentModule = roadmap.modules.find(m =>
        m.lessons.some(l => l.id === nextIncompleteLesson.lesson.id)
      );
      if (parentModule) {
        setOpenAccordionValues(prev => Array.from(new Set([...prev, parentModule.id])));
        setTimeout(() => {
          const el = document.getElementById(`lesson-${nextIncompleteLesson.lesson.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[92vw] max-w-[1300px] h-[88vh] max-h-[900px] p-0 gap-0 rounded-3xl bg-background flex flex-col overflow-hidden border-border/80 shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{roadmap.title}</DialogTitle>
          <DialogDescription>Detailed view of {roadmap.title}</DialogDescription>
        </DialogHeader>

        {/* Top Header Workspace Banner */}
        <div className="bg-muted/30 border-b border-border/50 px-6 sm:px-10 py-6 shrink-0 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-full bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Title & Metadata */}
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-xs px-3 py-1">
                  {roadmap.difficulty}
                </Badge>
                {roadmap.company && (
                  <Badge variant="outline" className="border-border/80 font-bold text-foreground text-xs px-3 py-1">
                    {roadmap.company}
                  </Badge>
                )}
                <span className="text-xs font-semibold text-muted-foreground">
                  {roadmap.role}
                </span>
                {isCompleted && (
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-tight">
                {roadmap.title}
              </h1>

              <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed line-clamp-2">
                {roadmap.description}
              </p>

              <div className="flex items-center gap-5 text-xs font-bold text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {roadmap.estimatedDuration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  {roadmap.modules.length} modules · {totalLessons} lessons
                </span>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-xl border-border/80 hover:bg-muted"
                onClick={() => onToggleSave(roadmap.id)}
                title={isSaved ? 'Remove from saved' : 'Save roadmap'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary text-primary' : ''}`} />
              </Button>

              <Button
                size="lg"
                className="font-extrabold text-xs sm:text-sm shadow-sm h-11 px-6 gap-2"
                onClick={handleContinueClick}
              >
                <span>{hasProgress ? (isCompleted ? 'Review Roadmap' : 'Continue Learning') : 'Start Roadmap'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scrollable Main Workspace Grid (Left Content + Right Sidebar) */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 sm:py-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Outcomes & Modules */}
            <div className="lg:col-span-8 space-y-8">
              {/* WHAT YOU'LL ACHIEVE */}
              {roadmap.learningOutcomes && roadmap.learningOutcomes.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="font-extrabold text-lg text-foreground tracking-tight">What You&apos;ll Achieve</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {roadmap.learningOutcomes.map((outcome, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-card border border-border/60 flex items-start gap-3 shadow-2xs hover:border-border/90 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                          {outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LEARNING MODULES */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="font-extrabold text-lg text-foreground tracking-tight">Learning Modules</h3>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">
                    {completedCount} of {totalLessons} lessons completed
                  </span>
                </div>

                <Accordion
                  multiple
                  value={openAccordionValues}
                  onValueChange={(val) => setOpenAccordionValues(val as string[])}
                  className="space-y-3"
                >
                  {roadmap.modules.map(module => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      completedLessonIds={completedLessonIds}
                      nextIncompleteLessonId={nextIncompleteLesson?.lesson.id}
                      onToggleLesson={(lessonId, completed) =>
                        onToggleLesson(roadmap.id, lessonId, completed, totalLessons)
                      }
                    />
                  ))}
                </Accordion>
              </div>

            </div>

            {/* Right 4 Cols: Progress Panel & Meta */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-0">

              {/* YOUR PROGRESS PANEL */}
              <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-base text-foreground tracking-tight">Your Progress</h4>
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-xs">
                    {progressPercentage}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between text-xs font-bold text-muted-foreground pt-1">
                    <span>{completedCount} completed</span>
                    <span>{totalLessons - completedCount} remaining</span>
                  </div>
                </div>

                {/* NEXT UP CARD */}
                {nextIncompleteLesson && !isCompleted ? (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>Next Up in {nextIncompleteLesson.moduleTitle}</span>
                    </div>

                    <h5 className="font-bold text-sm text-foreground line-clamp-1">
                      {nextIncompleteLesson.lesson.title}
                    </h5>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {nextIncompleteLesson.lesson.description}
                    </p>

                    <Button
                      size="sm"
                      className="w-full font-bold text-xs h-9 gap-1.5 shadow-2xs"
                      onClick={handleContinueClick}
                    >
                      <span>{hasProgress ? 'Continue Lesson' : 'Start Lesson'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ) : isCompleted ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                    <Award className="w-7 h-7 text-emerald-500 mx-auto" />
                    <h5 className="font-extrabold text-sm text-foreground">Roadmap Completed!</h5>
                    <p className="text-xs text-muted-foreground font-medium">
                      You have completed all {totalLessons} lessons in this learning path. Great work!
                    </p>
                  </div>
                ) : null}

                {/* Remove from In Progress Option */}
                {hasProgress && !isCompleted && onRemoveProgress && (
                  <div className="pt-2 border-t border-border/40">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 gap-1.5"
                      onClick={() => setShowRemoveConfirm(true)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove from In Progress</span>
                    </Button>
                  </div>
                )}
              </div>

              {/* PREREQUISITES */}
              {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
                <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-3 shadow-2xs">
                  <h4 className="font-extrabold text-base text-foreground tracking-tight">Prerequisites</h4>
                  <ul className="space-y-2 text-xs font-medium text-muted-foreground">
                    {roadmap.prerequisites.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* SKILLS TAUGHT */}
              {roadmap.skills && roadmap.skills.length > 0 && (
                <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-3 shadow-2xs">
                  <h4 className="font-extrabold text-base text-foreground tracking-tight">Skills You&apos;ll Build</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {roadmap.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-secondary/50 text-secondary-foreground text-xs font-semibold px-2.5 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Remove Confirm Modal */}
        <Dialog open={showRemoveConfirm} onOpenChange={setShowRemoveConfirm}>
          <DialogContent className="sm:max-w-md p-6 rounded-2xl">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-lg font-extrabold text-foreground">
                Remove from In Progress?
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-muted-foreground leading-relaxed">
                This will reset your tracked progress for &quot;{roadmap.title}&quot;. You can restart this roadmap anytime.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="font-bold text-xs h-9 px-4"
                onClick={() => setShowRemoveConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="font-bold text-xs h-9 px-4 gap-1.5 shadow-2xs"
                onClick={() => {
                  setShowRemoveConfirm(false);
                  if (onRemoveProgress) {
                    onRemoveProgress(roadmap.id);
                  }
                }}
              >
                Remove
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
