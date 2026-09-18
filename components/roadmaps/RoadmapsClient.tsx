'use client';

import * as React from 'react';
import { getAllRoadmaps } from '@/lib/roadmaps/roadmapResolver';
import { Roadmap, Lesson, UserRoadmapMeta } from '@/types/roadmap';
import { RoadmapCard } from './RoadmapCard';
import { RoadmapDetailsDialog } from './RoadmapDetailsDialog';
import { RoadmapsHero } from './RoadmapsHero';
import { LearningMomentum } from './LearningMomentum';
import { RoadmapEmptyState } from './RoadmapEmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Bookmark, PlayCircle, Layers, SlidersHorizontal, Sparkles } from 'lucide-react';

export function RoadmapsClient() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('All');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [activeTab, setActiveTab] = React.useState<'all' | 'saved' | 'in-progress'>('all');
  const [selectedRoadmap, setSelectedRoadmap] = React.useState<Roadmap | null>(null);

  // Persistence state
  const [isLoading, setIsLoading] = React.useState(true);
  const [savedRoadmapIds, setSavedRoadmapIds] = React.useState<string[]>([]);
  const [userRoadmaps, setUserRoadmaps] = React.useState<Record<string, UserRoadmapMeta>>({});
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Fetch user roadmap state from database
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

  // Helper to compute next incomplete lesson for a roadmap
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
      return null; // All lessons completed
    },
    [userRoadmaps]
  );

  // Save Toggle with Optimistic UI & API persistence
  const handleToggleSave = async (roadmapId: string) => {
    const wasSaved = savedRoadmapIds.includes(roadmapId);
    setSavedRoadmapIds(prev =>
      wasSaved ? prev.filter(id => id !== roadmapId) : [...prev, roadmapId]
    );

    try {
      const res = await fetch('/api/roadmaps/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roadmapId })
      });
      if (!res.ok) throw new Error('Failed to persist save');
    } catch (err) {
      console.error('Save error:', err);
      setSavedRoadmapIds(prev =>
        wasSaved ? [...prev, roadmapId] : prev.filter(id => id !== roadmapId)
      );
      setErrorMessage("Couldn't save your roadmap. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Start Roadmap with Optimistic UI & API persistence
  const handleStartRoadmap = async (roadmapId: string) => {
    if (userRoadmaps[roadmapId]) return; // Already started

    const now = new Date().toISOString();
    setUserRoadmaps(prev => ({
      ...prev,
      [roadmapId]: {
        roadmapId,
        startedAt: now,
        lastAccessedAt: now,
        completedLessonIds: []
      }
    }));

    try {
      const res = await fetch('/api/roadmaps/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roadmapId })
      });
      if (!res.ok) throw new Error('Failed to start roadmap');
    } catch (err) {
      console.error('Start roadmap error:', err);
      setUserRoadmaps(prev => {
        const copy = { ...prev };
        delete copy[roadmapId];
        return copy;
      });
      setErrorMessage("Couldn't start your roadmap. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Lesson Progress Toggle with Optimistic UI & API persistence
  const handleToggleLesson = async (
    roadmapId: string,
    lessonId: string,
    completed: boolean,
    totalLessonsInRoadmap: number
  ) => {
    const now = new Date().toISOString();
    const currentMeta = userRoadmaps[roadmapId] || {
      roadmapId,
      startedAt: now,
      lastAccessedAt: now,
      completedLessonIds: []
    };

    const currentCompleted = currentMeta.completedLessonIds || [];
    const nextCompleted = completed
      ? Array.from(new Set([...currentCompleted, lessonId]))
      : currentCompleted.filter(id => id !== lessonId);

    const updatedMeta: UserRoadmapMeta = {
      ...currentMeta,
      lastAccessedAt: now,
      lastAccessedLessonId: lessonId,
      completedLessonIds: nextCompleted,
      completedAt: nextCompleted.length >= totalLessonsInRoadmap ? now : null
    };

    setUserRoadmaps(prev => ({
      ...prev,
      [roadmapId]: updatedMeta
    }));

    try {
      const res = await fetch('/api/roadmaps/lesson-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roadmapId,
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
          [roadmapId]: {
            roadmapId,
            startedAt: json.data.startedAt || now,
            lastAccessedAt: json.data.lastAccessedAt || now,
            lastAccessedLessonId: json.data.lastAccessedLessonId,
            completedLessonIds: json.data.completedLessonIds || nextCompleted,
            completedAt: json.data.completedAt
          }
        }));
      }
    } catch (err) {
      console.error('Lesson progress error:', err);
      setUserRoadmaps(prev => ({
        ...prev,
        [roadmapId]: currentMeta
      }));
      setErrorMessage("Couldn't save your progress. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Remove Progress with Optimistic UI & API persistence
  const handleRemoveProgress = async (roadmapId: string) => {
    const previousMeta = userRoadmaps[roadmapId];
    if (!previousMeta) return;

    setUserRoadmaps(prev => {
      const copy = { ...prev };
      delete copy[roadmapId];
      return copy;
    });

    try {
      const res = await fetch('/api/roadmaps/remove-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roadmapId })
      });
      if (!res.ok) throw new Error('Failed to remove roadmap progress');
    } catch (err) {
      console.error('Remove progress error:', err);
      setUserRoadmaps(prev => ({
        ...prev,
        [roadmapId]: previousMeta
      }));
      setErrorMessage("Couldn't remove this roadmap. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const allRoadmaps = React.useMemo(() => getAllRoadmaps(), []);

  // Filter roadmaps by search, difficulty, category, and active tab
  const filteredRoadmaps = React.useMemo(() => {
    return allRoadmaps.filter(r => {
      const userMeta = userRoadmaps[r.id];
      const isInProgress = Boolean(userMeta);

      // 1. Tab filter
      if (activeTab === 'saved' && !savedRoadmapIds.includes(r.id)) {
        return false;
      }
      if (activeTab === 'in-progress' && !isInProgress) {
        return false;
      }

      // 2. Difficulty filter
      if (selectedDifficulty !== 'All' && r.difficulty !== selectedDifficulty) {
        return false;
      }

      // 3. Category filter
      if (selectedCategory === 'Career Paths' && !r.company && !r.id.includes('interview')) {
        // Career roadmaps or specific role roadmaps
        if (!['amazon-sde-1', 'frontend-developer', 'backend-developer', 'full-stack-developer', 'ai-engineer', 'data-engineer', 'python-developer', 'devops-cloud', 'dsa-interview', 'react-developer'].includes(r.id)) {
          return false;
        }
      }
      if (selectedCategory === 'Subject Tracks' && ['amazon-sde-1', 'frontend-developer', 'backend-developer', 'full-stack-developer', 'ai-engineer', 'data-engineer', 'python-developer', 'devops-cloud', 'dsa-interview', 'react-developer'].includes(r.id)) {
        return false;
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = r.title.toLowerCase().includes(query);
        const matchesRole = r.role.toLowerCase().includes(query);
        const matchesCompany = r.company?.toLowerCase().includes(query) || false;
        const matchesDescription = r.description.toLowerCase().includes(query);
        const matchesSkills = r.skills.some(s => s.toLowerCase().includes(query));

        if (!matchesTitle && !matchesRole && !matchesCompany && !matchesDescription && !matchesSkills) {
          return false;
        }
      }

      return true;
    });
  }, [allRoadmaps, searchQuery, selectedDifficulty, selectedCategory, activeTab, savedRoadmapIds, userRoadmaps]);

  // Tab counts
  const savedCount = savedRoadmapIds.length;
  const inProgressCount = Object.keys(userRoadmaps).length;

  const handleResetFilters = () => {
    setActiveTab('all');
    setSelectedDifficulty('All');
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Error notification banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold animate-in fade-in">
          {errorMessage}
        </div>
      )}

      {/* Hero Header */}
      <RoadmapsHero />

      {/* Learning Momentum Widget */}
      {!isLoading && (
        <LearningMomentum
          userRoadmaps={userRoadmaps}
          allRoadmaps={allRoadmaps}
          savedRoadmapIds={savedRoadmapIds}
          getNextIncompleteLesson={getNextIncompleteLesson}
          onSelectRoadmap={r => setSelectedRoadmap(r)}
          onContinueRoadmap={r => {
            setSelectedRoadmap(r);
            if (!userRoadmaps[r.id]) {
              handleStartRoadmap(r.id);
            }
          }}
        />
      )}

      {/* Discovery & Search Filter Section */}
      <div className="space-y-5">
        {/* Prominent Search Control */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search roadmaps, roles, technologies, or skills..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-11 h-12 bg-card border-border/70 rounded-2xl text-sm shadow-2xs focus-visible:ring-2 focus-visible:ring-primary/40 font-medium"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-2.5 text-xs font-bold text-muted-foreground hover:text-foreground"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </Button>
          )}
        </div>

        {/* Tab & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1 border-b border-border/40 pb-5">
          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-muted/40 rounded-2xl border border-border/50 self-start flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${activeTab === 'all'
                ? 'bg-card text-foreground shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              All Roadmaps
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'saved'
                ? 'bg-card text-foreground shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {savedCount > 0 && (
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-bold bg-primary/10 text-primary">
                  {savedCount}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'in-progress'
                ? 'bg-card text-foreground shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <PlayCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>In Progress</span>
              {inProgressCount > 0 && (
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {inProgressCount}
                </Badge>
              )}
            </button>
          </div>

          {/* Difficulty & Category Filter Pills */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Track Type Filters */}
            <div className="flex items-center gap-1">
              {['All', 'Career Paths', 'Subject Tracks'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat
                    ? 'bg-secondary text-secondary-foreground shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {cat === 'All' ? 'All Tracks' : cat}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-border/60 hidden sm:block" />

            {/* Difficulty Pills */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-muted-foreground mr-1 hidden sm:inline">Difficulty:</span>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 px-3 text-xs font-extrabold rounded-lg shadow-2xs"
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff}
                </Button>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Grid of Roadmap Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="p-6 rounded-3xl border border-border/50 bg-card space-y-4">
              <Skeleton className="h-6 w-3/4 rounded-xl" />
              <Skeleton className="h-4 w-1/2 rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-9 w-full rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredRoadmaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRoadmaps.map(roadmap => {
            const userMeta = userRoadmaps[roadmap.id];
            const isSaved = savedRoadmapIds.includes(roadmap.id);
            const isStarted = Boolean(userMeta);
            const completedLessonIds = userMeta?.completedLessonIds || [];
            const nextLesson = getNextIncompleteLesson(roadmap);

            return (
              <RoadmapCard
                key={roadmap.id}
                roadmap={roadmap}
                isSaved={isSaved}
                isStarted={isStarted}
                completedLessonIds={completedLessonIds}
                nextIncompleteLesson={nextLesson}
                onViewDetails={() => setSelectedRoadmap(roadmap)}
                onToggleSave={handleToggleSave}
                onContinue={() => {
                  setSelectedRoadmap(roadmap);
                  if (!isStarted) {
                    handleStartRoadmap(roadmap.id);
                  }
                }}
                onRemoveProgress={handleRemoveProgress}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <RoadmapEmptyState
          type={activeTab === 'saved' ? 'saved' : activeTab === 'in-progress' ? 'in-progress' : 'search'}
          searchQuery={searchQuery}
          onReset={handleResetFilters}
        />
      )}

      {/* Details Dialog */}
      {selectedRoadmap && (
        <RoadmapDetailsDialog
          roadmap={selectedRoadmap}
          isOpen={!!selectedRoadmap}
          isSaved={savedRoadmapIds.includes(selectedRoadmap.id)}
          isStarted={Boolean(userRoadmaps[selectedRoadmap.id])}
          completedLessonIds={userRoadmaps[selectedRoadmap.id]?.completedLessonIds || []}
          nextIncompleteLesson={getNextIncompleteLesson(selectedRoadmap)}
          onClose={() => setSelectedRoadmap(null)}
          onToggleSave={handleToggleSave}
          onStartRoadmap={handleStartRoadmap}
          onToggleLesson={handleToggleLesson}
          onRemoveProgress={handleRemoveProgress}
        />
      )}
    </div>
  );
}
