import * as React from 'react';
import { RoadmapModule, Lesson } from '@/types/roadmap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, PlayCircle, BookOpen, PenTool, Lock, HelpCircle, FileText, Code2 } from 'lucide-react';
import { StatusBadge } from '@/components/dashboard/StatusBadge';

export function ModuleCard({ module }: { module: RoadmapModule }) {
  const totalLessons = module.lessons.length;
  const completedLessons = module.lessons.filter(l => l.isCompleted).length;
  const progress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
  
  // Auto-determine status based on actual progress if it was hardcoded wrong, or just use the derived progress
  const status = progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started';
  const isLocked = status === 'Not Started';

  return (
    <div className={`border border-border/40 rounded-2xl bg-card shadow-sm overflow-hidden ${isLocked ? 'opacity-70' : ''}`}>
      <Accordion className="w-full">
        <AccordionItem value={module.id} className="border-b-0">
          <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted/30">
            <div className="flex flex-col md:flex-row md:items-center w-full gap-4 pr-4">
              
              {/* Module Header Info */}
              <div className="flex-1 text-left space-y-1.5">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-base flex items-center gap-2">
                    {isLocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                    {module.title}
                  </h4>
                  <StatusBadge 
                    status={status === 'Completed' ? 'success' : status === 'In Progress' ? 'info' : 'neutral'}
                    className="text-[10px] py-0.5"
                  >
                    {status}
                  </StatusBadge>
                </div>
                <p className="text-sm font-medium text-muted-foreground line-clamp-1">
                  {module.description}
                </p>
              </div>

              {/* Module Stats */}
              <div className="flex flex-col md:items-end shrink-0 w-48 space-y-2">
                <div className="flex items-center justify-between w-full text-xs font-bold">
                  <span className="text-muted-foreground">{completedLessons}/{totalLessons} Lessons</span>
                  <span className="text-primary">{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="px-6 pb-6 pt-2">
            <div className="space-y-3">
              {module.lessons.length > 0 ? (
                module.lessons.map(lesson => (
                  <div key={lesson.id} className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {lesson.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      ) : lesson.type === 'video' ? (
                        <PlayCircle className="w-5 h-5 text-blue-500 shrink-0" />
                      ) : lesson.type === 'reading' ? (
                        <BookOpen className="w-5 h-5 text-orange-500 shrink-0" />
                      ) : lesson.type === 'quiz' ? (
                        <HelpCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                      ) : lesson.type === 'assignment' ? (
                        <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                      ) : lesson.type === 'project' ? (
                        <Code2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <PenTool className="w-5 h-5 text-purple-500 shrink-0" />
                      )}
                      <span className={`font-semibold text-sm ${lesson.isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground px-2 py-1 bg-background rounded-md border border-border/60">
                      {lesson.duration}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm font-medium text-muted-foreground italic py-2">
                  No lessons available yet.
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
