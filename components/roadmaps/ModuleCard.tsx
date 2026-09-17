'use client';

import * as React from 'react';
import { RoadmapModule } from '@/types/roadmap';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle2, Sparkles, BookOpen, Code2, Video, FileText, Globe } from 'lucide-react';

interface ModuleCardProps {
  module: RoadmapModule;
  completedLessonIds: string[];
  nextIncompleteLessonId?: string | null;
  onToggleLesson: (lessonId: string, completed: boolean) => void;
}

export function ModuleCard({
  module,
  completedLessonIds,
  nextIncompleteLessonId,
  onToggleLesson,
}: ModuleCardProps) {
  const totalLessons = module.lessons.length;
  const completedCount = module.lessons.filter(l => completedLessonIds.includes(l.id)).length;
  const moduleProgress = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const getResourceTypeBadge = (type: string) => {
    switch (type) {
      case 'youtube':
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 text-xs py-0.5 px-2.5 font-bold gap-1">
            <Video className="w-3 h-3" /> YouTube
          </Badge>
        );
      case 'documentation':
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs py-0.5 px-2.5 font-bold gap-1">
            <FileText className="w-3 h-3" /> Docs
          </Badge>
        );
      case 'official':
        return (
          <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 text-xs py-0.5 px-2.5 font-bold gap-1">
            <Globe className="w-3 h-3" /> Official
          </Badge>
        );
      case 'practice':
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs py-0.5 px-2.5 font-bold gap-1">
            <Code2 className="w-3 h-3" /> Practice
          </Badge>
        );
      case 'article':
      default:
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs py-0.5 px-2.5 font-bold gap-1">
            <BookOpen className="w-3 h-3" /> Article
          </Badge>
        );
    }
  };

  const formattedOrder = String(module.order).padStart(2, '0');

  return (
    <AccordionItem
      value={module.id}
      className="border border-border/70 rounded-2xl bg-card shadow-2xs overflow-hidden mb-4"
    >
      <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 transition-colors">
        <div className="flex flex-row items-center w-full justify-between gap-4 pr-2">
          {/* Module Title & Number */}
          <div className="flex items-center gap-3.5 min-w-0 flex-1 text-left">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary font-black text-sm flex items-center justify-center shrink-0">
              {formattedOrder}
            </div>
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-base sm:text-lg text-foreground truncate">{module.title}</h4>
                {moduleProgress === 100 && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 font-normal">
                {module.description}
              </p>
            </div>
          </div>

          {/* Module Progress Bar */}
          <div className="flex flex-col items-end shrink-0 w-36 sm:w-48 space-y-1.5">
            <div className="flex items-center justify-between w-full text-xs sm:text-sm font-bold">
              <span className="text-muted-foreground text-xs font-semibold">{completedCount}/{totalLessons} lessons</span>
              <span className="text-primary font-extrabold text-sm">{moduleProgress}%</span>
            </div>
            <Progress value={moduleProgress} className="h-2 w-full" />
          </div>

        </div>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4 pt-1">
        <div className="divide-y divide-border/40 rounded-xl border border-border/40 overflow-hidden bg-background/60">
          {module.lessons.map(lesson => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isNextToLearn = lesson.id === nextIncompleteLessonId;

            return (
              <div
                key={lesson.id}
                id={`lesson-${lesson.id}`}
                className={`px-4 py-3.5 transition-all duration-300 flex flex-row items-center justify-between gap-3 ${isNextToLearn
                    ? 'bg-primary/10 border-l-4 border-l-primary'
                    : isCompleted
                      ? 'bg-muted/15 opacity-85'
                      : 'hover:bg-muted/30'
                  }`}
              >
                {/* Left: Checkbox + Title & Description */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={(checked) => onToggleLesson(lesson.id, Boolean(checked))}
                    aria-label={`Mark ${lesson.title} as completed`}
                    className="w-4 h-4 rounded shrink-0 cursor-pointer"
                  />

                  <div className="min-w-0 space-y-0.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`font-semibold text-sm sm:text-base truncate ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
                          }`}
                      >
                        {lesson.title}
                      </span>
                      {isNextToLearn && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                          <Sparkles className="w-3 h-3" /> Next up
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 leading-normal font-normal">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                {/* Right: Badge + Learn Button */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="hidden sm:inline-block">
                    {getResourceTypeBadge(lesson.resourceType)}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs font-bold gap-1.5 shadow-2xs hover:text-primary hover:border-primary/40"
                    onClick={() => window.open(lesson.resourceUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <span>Learn</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
