'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Roadmap, Lesson, UserRoadmapMeta } from '@/types/roadmap';
import { RoadmapDetailsDialog } from './RoadmapDetailsDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Map, Compass, Bookmark, CheckCircle2 } from 'lucide-react';

interface RoadmapDetailsPageClientProps {
  roadmapId: string;
  initialRoadmap: Roadmap;
}

export function RoadmapDetailsPageClient({
  roadmapId,
  initialRoadmap,
}: RoadmapDetailsPageClientProps) {
  const router = useRouter();

  // State
  const [savedRoadmapIds, setSavedRoadmapIds] = React.useState<string[]>([]);
  const [userRoadmaps, setUserRoadmaps] = React.useState<Record<string, UserRoadmapMeta>>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Load user progress and saved roadmaps from database
  React.useEffect(() => {
    async function loadUserState() {
      try {
        const res = await fetch('/api/roadmaps');
        if (!res.ok) throw new Error('Failed to load user state');
        const json = await res.json();
        if (json.success && json.data) {
          setSavedRoadmapIds(json.data.savedRoadmapIds || []);
          setUserRoadmaps(json.data.userRoadmaps || {});
        }
      } catch (err) {
        console.error('Failed to load user roadmap state:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadUserState();
  }, []);

  // Compute next incomplete lesson
  const getNextIncompleteLesson = React.useCallback(
    (roadmap: Roadmap): { moduleTitle: string; lesson: Lesson } | null => {
      const userMeta = userRoadmaps[roadmap.id];
      const completedIds = userMeta?.completedLessonIds || [];

      for (const module of roadmap.modules) {
        for (const lesson of module.lessons) {
          if (!completedIds.includes(lesson.id)) {
            return { moduleTitle: module.title, lesson };
          }
        }
      }
      return null;
    },
    [userRoadmaps]
  );

  // Save Toggle
  const handleToggleSave = async (id: string) => {
    const wasSaved = savedRoadmapIds.includes(id);
    setSavedRoadmapIds(prev => (wasSaved ? prev.filter(x => x !== id) : [...prev, id]));

    try {
      const res = await fetch('/api/roadmaps/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roadmapId: id })
      });
      if (!res.ok) throw new Error('Failed to persist save');
    } catch (err) {
      console.error('Save error:', err);
      setSavedRoadmapIds(prev => (wasSaved ? [...prev, id] : prev.filter(x => x !== id)));
      setErrorMessage("Couldn't save roadmap. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Start Roadmap
  const handleStartRoadmap = async (id: string) => {
    if (userRoadmaps[id]) return;

    const now = new Date().toISOString();
    setUserRoadmaps(prev => ({
      ...prev,
      [id]: {
        roadmapId: id,
        startedAt: now,
        lastAccessedAt: now,
        completedLessonIds: []
      }
    }));

    try {
      const res = await fetch('/api/roadmaps/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roadmapId: id })
      });
      if (!res.ok) throw new Error('Failed to start roadmap');
    } catch (err) {
      console.error('Start error:', err);
      setUserRoadmaps(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      setErrorMessage("Couldn't start roadmap. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Toggle Lesson Progress
  const handleToggleLesson = async (
    id: string,
    lessonId: string,
    completed: boolean,
    totalLessonsInRoadmap: number
  ) => {
    const now = new Date().toISOString();
    const currentMeta = userRoadmaps[id] || {
      roadmapId: id,
      startedAt: now,
      lastAccessedAt: now,
      completedLessonIds: []
    };

    const currentCompleted = currentMeta.completedLessonIds || [];
    const nextCompleted = completed
      ? Array.from(new Set([...currentCompleted, lessonId]))
      : currentCompleted.filter(x => x !== lessonId);

    const updatedMeta: UserRoadmapMeta = {
      ...currentMeta,
      lastAccessedAt: now,
      lastAccessedLessonId: lessonId,
      completedLessonIds: nextCompleted,
      completedAt: nextCompleted.length >= totalLessonsInRoadmap ? now : null
    };

    setUserRoadmaps(prev => ({ ...prev, [id]: updatedMeta }));

    try {
      const res = await fetch('/api/roadmaps/lesson-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roadmapId: id,
          lessonId,
          completed,
          totalLessonsInRoadmap
        })
      });
      if (!res.ok) throw new Error('Failed to persist lesson progress');
      const json = await res.json();
      if (json.success && json.data) {
        setUserRoadmaps(prev => ({
          ...prev,
          [id]: {
            roadmapId: id,
            startedAt: json.data.startedAt || now,
            lastAccessedAt: json.data.lastAccessedAt || now,
            lastAccessedLessonId: json.data.lastAccessedLessonId,
            completedLessonIds: json.data.completedLessonIds || nextCompleted,
            completedAt: json.data.completedAt
          }
        }));
      }
    } catch (err) {
      console.error('Lesson error:', err);
      setUserRoadmaps(prev => ({ ...prev, [id]: currentMeta }));
      setErrorMessage("Couldn't save progress. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Remove Progress
  const handleRemoveProgress = async (id: string) => {
    const previousMeta = userRoadmaps[id];
    if (!previousMeta) return;

    setUserRoadmaps(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    try {
      const res = await fetch('/api/roadmaps/remove-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roadmapId: id })
      });
      if (!res.ok) throw new Error('Failed to remove roadmap progress');
    } catch (err) {
      console.error('Remove progress error:', err);
      setUserRoadmaps(prev => ({ ...prev, [id]: previousMeta }));
      setErrorMessage("Couldn't remove roadmap. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const userMeta = userRoadmaps[initialRoadmap.id];
  const isSaved = savedRoadmapIds.includes(initialRoadmap.id);
  const isStarted = Boolean(userMeta);
  const completedLessonIds = userMeta?.completedLessonIds || [];
  const nextIncompleteLesson = getNextIncompleteLesson(initialRoadmap);

  return (
    <div className="space-y-6 pb-12">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold animate-in fade-in">
          {errorMessage}
        </div>
      )}

      {/* Top Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="font-bold text-xs gap-1.5 h-9">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-border/60 hidden sm:block" />
          <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
            <Map className="w-3.5 h-3.5 text-primary" />
            <span>Personalized Learning Path</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/roadmaps">
            <Button variant="ghost" size="sm" className="font-semibold text-xs gap-1.5 h-9 text-muted-foreground hover:text-foreground">
              <Compass className="w-3.5 h-3.5" />
              <span>Explore All Roadmaps</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary Roadmap Details View */}
      <RoadmapDetailsDialog
        roadmap={initialRoadmap}
        isOpen={true}
        isSaved={isSaved}
        isStarted={isStarted}
        completedLessonIds={completedLessonIds}
        nextIncompleteLesson={nextIncompleteLesson}
        onClose={() => router.push('/dashboard')}
        onToggleSave={handleToggleSave}
        onStartRoadmap={handleStartRoadmap}
        onToggleLesson={handleToggleLesson}
        onRemoveProgress={handleRemoveProgress}
      />
    </div>
  );
}
