'use client';

import * as React from 'react';
import { Roadmap, Lesson } from '@/types/roadmap';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Bookmark,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Trash2,
  Database,
  Network,
  Cpu,
  Code,
  Globe,
  Smartphone,
  Brain,
  BarChart3,
  Server,
  Calculator,
  Briefcase,
  Building,
  GraduationCap
} from 'lucide-react';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface RoadmapCardProps {
  roadmap: Roadmap;
  isSaved: boolean;
  isStarted: boolean;
  completedLessonIds: string[];
  nextIncompleteLesson: { moduleTitle: string; lesson: Lesson } | null;
  onViewDetails: () => void;
  onToggleSave: (roadmapId: string) => void;
  onContinue: () => void;
  onRemoveProgress?: (roadmapId: string) => void;
}

// Derive a clean visual icon and category label for each roadmap
function getRoadmapVisualMeta(roadmap: Roadmap) {
  const id = roadmap.id.toLowerCase();
  if (id.includes('dbms') || id.includes('database')) {
    return {
      category: 'DATABASE',
      icon: Database,
      accentBg: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
      topBorder: 'hover:border-indigo-500/40'
    };
  }
  if (id.includes('network')) {
    return {
      category: 'NETWORKING',
      icon: Network,
      accentBg: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
      topBorder: 'hover:border-cyan-500/40'
    };
  }
  if (id.includes('operating') || id.includes('os')) {
    return {
      category: 'SYSTEMS',
      icon: Cpu,
      accentBg: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      topBorder: 'hover:border-purple-500/40'
    };
  }
  if (id.includes('dsa') || id.includes('algorithm')) {
    return {
      category: 'INTERVIEW PREP',
      icon: Code,
      accentBg: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      topBorder: 'hover:border-blue-500/40'
    };
  }
  if (id.includes('web')) {
    return {
      category: 'WEB DEVELOPMENT',
      icon: Globe,
      accentBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      topBorder: 'hover:border-emerald-500/40'
    };
  }
  if (id.includes('app') || id.includes('mobile')) {
    return {
      category: 'MOBILE DEV',
      icon: Smartphone,
      accentBg: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
      topBorder: 'hover:border-teal-500/40'
    };
  }
  if (id.includes('ai') || id.includes('ml') || id.includes('machine')) {
    return {
      category: 'AI & ML',
      icon: Brain,
      accentBg: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
      topBorder: 'hover:border-violet-500/40'
    };
  }
  if (id.includes('data')) {
    return {
      category: 'DATA SCIENCE',
      icon: BarChart3,
      accentBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      topBorder: 'hover:border-amber-500/40'
    };
  }
  if (id.includes('devops') || id.includes('cloud')) {
    return {
      category: 'DEVOPS & CLOUD',
      icon: Server,
      accentBg: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
      topBorder: 'hover:border-sky-500/40'
    };
  }
  if (id.includes('aptitude') || id.includes('quant')) {
    return {
      category: 'APTITUDE',
      icon: Calculator,
      accentBg: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      topBorder: 'hover:border-rose-500/40'
    };
  }

  // Fallback for Career Roadmaps
  if (roadmap.company) {
    return {
      category: 'CAREER PATH',
      icon: Building,
      accentBg: 'bg-primary/10 text-primary border-primary/20',
      topBorder: 'hover:border-primary/40'
    };
  }

  return {
    category: 'CAREER PATH',
    icon: Briefcase,
    accentBg: 'bg-primary/10 text-primary border-primary/20',
    topBorder: 'hover:border-primary/40'
  };
}

export function RoadmapCard({
  roadmap,
  isSaved,
  isStarted,
  completedLessonIds,
  nextIncompleteLesson,
  onViewDetails,
  onToggleSave,
  onContinue,
  onRemoveProgress,
}: RoadmapCardProps) {
  const [showRemoveConfirm, setShowRemoveConfirm] = React.useState(false);

  const visualMeta = React.useMemo(() => getRoadmapVisualMeta(roadmap), [roadmap]);
  const CategoryIcon = visualMeta.icon;

  const allLessons = React.useMemo(() => roadmap.modules.flatMap(m => m.lessons), [roadmap]);
  const totalLessons = allLessons.length;
  const completedCount = React.useMemo(
    () => allLessons.filter(l => completedLessonIds.includes(l.id)).length,
    [allLessons, completedLessonIds]
  );
  const completion = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
  const isCompleted = completion === 100 && totalLessons > 0;

  return (
    <Card className={`border-border/60 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative overflow-hidden ${visualMeta.topBorder}`}>
      {/* Top Subtle Decorative Background Line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="p-6 flex flex-col h-full gap-4">

        {/* Top Meta Row: Category Icon/Badge + Difficulty + Save Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Subject/Category Icon */}
            <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider ${visualMeta.accentBg}`}>
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{visualMeta.category}</span>
            </div>

            {/* Difficulty Badge */}
            <StatusBadge
              status={
                roadmap.difficulty === 'Advanced'
                  ? 'danger'
                  : roadmap.difficulty === 'Intermediate'
                    ? 'warning'
                    : 'success'
              }
              className="text-[10px] font-bold"
            >
              {roadmap.difficulty}
            </StatusBadge>

            {/* Completed Badge */}
            {isCompleted && (
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] gap-1">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </Badge>
            )}
          </div>

          {/* Save / Bookmark Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full hover:bg-muted/80 shrink-0 text-muted-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(roadmap.id);
            }}
            title={isSaved ? 'Remove from saved' : 'Bookmark roadmap'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary text-primary' : ''}`} />
          </Button>
        </div>

        {/* Title & Role / Company */}
        <div className="space-y-1">
          <h3 className="font-extrabold text-lg sm:text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {roadmap.title}
          </h3>
          <p className="text-xs font-semibold text-muted-foreground line-clamp-1">
            {roadmap.company ? `${roadmap.company} · ` : ''}{roadmap.role}
          </p>
        </div>

        {/* Metadata Line */}
        <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary/80" />
            <span>{roadmap.estimatedDuration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-primary/80" />
            <span>{roadmap.modules.length} modules · {totalLessons} lessons</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs font-medium text-muted-foreground line-clamp-2 leading-relaxed">
          {roadmap.description}
        </p>

        {/* Dynamic Progress Section (When Started) */}
        {isStarted && (
          <div className="space-y-2 p-3 rounded-xl bg-muted/30 border border-border/50 my-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-muted-foreground">Progress ({completedCount}/{totalLessons})</span>
              <span className="text-primary font-extrabold">{completion}%</span>
            </div>
            <Progress value={completion} className="h-2" />

            {nextIncompleteLesson && !isCompleted && (
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-foreground line-clamp-1">
                <Sparkles className="w-3 h-3 text-primary shrink-0 animate-pulse" />
                <span className="text-muted-foreground font-semibold shrink-0">Next:</span>
                <span className="truncate">{nextIncompleteLesson.lesson.title}</span>
              </div>
            )}
          </div>
        )}

        {/* Tags / Skills */}
        <div className="flex flex-wrap gap-1.5 flex-1 items-start mt-1">
          {roadmap.skills.slice(0, 4).map(skill => (
            <Badge key={skill} variant="secondary" className="bg-secondary/50 hover:bg-secondary/70 text-secondary-foreground text-[10px] font-semibold transition-colors">
              {skill}
            </Badge>
          ))}
          {roadmap.skills.length > 4 && (
            <Badge variant="secondary" className="bg-secondary/30 text-muted-foreground text-[10px]">
              +{roadmap.skills.length - 4}
            </Badge>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-border/40 mt-auto">
          {isStarted ? (
            <>
              <Button
                className="flex-1 font-bold text-xs shadow-xs h-9 gap-1.5"
                onClick={onContinue}
              >
                <span>{isCompleted ? 'Review Roadmap' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                className="font-bold text-xs shadow-2xs h-9 px-3"
                onClick={onViewDetails}
              >
                Details
              </Button>
              {!isCompleted && onRemoveProgress && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl shrink-0 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRemoveConfirm(true);
                  }}
                  title="Remove from In Progress"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </>
          ) : (
            <Button
              className="w-full font-bold text-xs shadow-xs h-9 gap-1.5"
              variant={isSaved ? "default" : "secondary"}
              onClick={onViewDetails}
            >
              <span>{isSaved ? 'Start Saved Roadmap' : 'Start Roadmap'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>

      </CardContent>

      {/* Remove Progress Confirmation Dialog */}
      <Dialog open={showRemoveConfirm} onOpenChange={setShowRemoveConfirm}>
        <DialogContent
          className="sm:max-w-md p-6 rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
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
              onClick={(e) => {
                e.stopPropagation();
                setShowRemoveConfirm(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="font-bold text-xs h-9 px-4 gap-1.5 shadow-2xs"
              onClick={(e) => {
                e.stopPropagation();
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
    </Card>
  );
}
