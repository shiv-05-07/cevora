'use client';

import * as React from 'react';
import { Roadmap, Lesson, UserRoadmapMeta } from '@/types/roadmap';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Sparkles, ArrowRight, Compass, CheckCircle2, Bookmark } from 'lucide-react';

interface LearningMomentumProps {
  userRoadmaps: Record<string, UserRoadmapMeta>;
  allRoadmaps: Roadmap[];
  savedRoadmapIds: string[];
  getNextIncompleteLesson: (roadmap: Roadmap) => { moduleTitle: string; lesson: Lesson } | null;
  onSelectRoadmap: (roadmap: Roadmap) => void;
  onContinueRoadmap: (roadmap: Roadmap) => void;
}

export function LearningMomentum({
  userRoadmaps,
  allRoadmaps,
  savedRoadmapIds,
  getNextIncompleteLesson,
  onSelectRoadmap,
  onContinueRoadmap,
}: LearningMomentumProps) {
  // Find the most recently accessed started roadmap that is NOT 100% complete
  const activeRoadmaps = React.useMemo(() => {
    return Object.values(userRoadmaps)
      .map(meta => {
        const roadmap = allRoadmaps.find(r => r.id === meta.roadmapId);
        if (!roadmap) return null;
        const totalLessons = roadmap.modules.flatMap(m => m.lessons).length;
        const completedCount = meta.completedLessonIds?.length || 0;
        const completion = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
        return {
          meta,
          roadmap,
          completion,
          isCompleted: completion === 100
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => new Date(b.meta.lastAccessedAt).getTime() - new Date(a.meta.lastAccessedAt).getTime());
  }, [userRoadmaps, allRoadmaps]);

  const topActive = activeRoadmaps.find(a => !a.isCompleted) || activeRoadmaps[0];

  if (!topActive) {
    // Discovery prompt state if no started roadmaps
    const savedCount = savedRoadmapIds.length;
    return (
      <Card className="border-border/60 bg-card/60 backdrop-blur-xs shadow-2xs overflow-hidden">
        <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
              <Compass className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-foreground">Find Your Next Learning Path</h3>
                {savedCount > 0 && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-bold gap-1">
                    <Bookmark className="w-3 h-3" /> {savedCount} saved
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                Choose a roadmap below and build your technical skills step by step with topic-specific resources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { roadmap, completion, isCompleted } = topActive;
  const nextLessonObj = getNextIncompleteLesson(roadmap);
  const totalLessons = roadmap.modules.flatMap(m => m.lessons).length;
  const completedCount = topActive.meta.completedLessonIds?.length || 0;

  return (
    <Card className="border-primary/30 bg-gradient-to-r from-card via-card to-primary/5 shadow-xs overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
      <CardContent className="p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
        {/* Left Info & Progress */}
        <div className="space-y-3 flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Continue Learning</span>
            </span>
            <Badge variant="outline" className="text-[10px] font-bold border-border/70">
              {roadmap.difficulty}
            </Badge>
          </div>

          <div>
            <h3 className="font-extrabold text-lg sm:text-xl text-foreground truncate">
              {roadmap.title}
            </h3>
            <p className="text-xs font-semibold text-muted-foreground line-clamp-1">
              {roadmap.role} · {completedCount} of {totalLessons} lessons completed
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 max-w-md">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="text-primary">{completion}%</span>
            </div>
            <Progress value={completion} className="h-2" />
          </div>

          {/* Next Lesson Preview */}
          {nextLessonObj && !isCompleted && (
            <div className="flex items-center gap-2 text-xs font-bold text-foreground bg-background/80 px-3 py-1.5 rounded-lg border border-border/50 max-w-md">
              <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-muted-foreground font-medium shrink-0">Next Up:</span>
              <span className="truncate">{nextLessonObj.lesson.title}</span>
            </div>
          )}
        </div>

        {/* Right CTA Buttons */}
        <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-border/40">
          <Button
            className="flex-1 lg:flex-none font-bold text-xs shadow-sm h-10 px-5 gap-2"
            onClick={() => onContinueRoadmap(roadmap)}
          >
            <span>{isCompleted ? 'Review Roadmap' : 'Continue Learning'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="font-bold text-xs h-10 px-4"
            onClick={() => onSelectRoadmap(roadmap)}
          >
            Details
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
