'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, PlayCircle, FilterX, Search } from 'lucide-react';

interface RoadmapEmptyStateProps {
  type: 'saved' | 'in-progress' | 'search';
  searchQuery?: string;
  onReset: () => void;
}

export function RoadmapEmptyState({ type, searchQuery, onReset }: RoadmapEmptyStateProps) {
  if (type === 'saved') {
    return (
      <div className="py-16 px-6 text-center bg-card/60 backdrop-blur-xs rounded-2xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
          <Bookmark className="w-7 h-7" />
        </div>
        <h3 className="font-extrabold text-lg text-foreground">Your saved paths will appear here</h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md font-medium leading-relaxed">
          Bookmark any roadmap to keep it within reach for easy reference and quick access anytime.
        </p>
        <Button
          variant="outline"
          className="mt-3 font-bold text-xs shadow-xs px-5 h-9"
          onClick={onReset}
        >
          Explore Roadmaps
        </Button>
      </div>
    );
  }

  if (type === 'in-progress') {
    return (
      <div className="py-16 px-6 text-center bg-card/60 backdrop-blur-xs rounded-2xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-1">
          <PlayCircle className="w-7 h-7" />
        </div>
        <h3 className="font-extrabold text-lg text-foreground">Your learning path starts here</h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md font-medium leading-relaxed">
          Choose a roadmap and click &quot;Start Roadmap&quot; or complete any lesson to track your learning journey.
        </p>
        <Button
          variant="outline"
          className="mt-3 font-bold text-xs shadow-xs px-5 h-9"
          onClick={onReset}
        >
          Explore Roadmaps
        </Button>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 text-center bg-card/60 backdrop-blur-xs rounded-2xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-muted border border-border/60 flex items-center justify-center text-muted-foreground mb-1">
        <FilterX className="w-7 h-7" />
      </div>
      <h3 className="font-extrabold text-lg text-foreground">
        Nothing matches {searchQuery ? `"${searchQuery}"` : 'your active filters'}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-md font-medium leading-relaxed">
        Try adjusting your search query, switching category tabs, or clearing difficulty filters.
      </p>
      <Button
        variant="outline"
        className="mt-3 font-bold text-xs shadow-xs px-5 h-9"
        onClick={onReset}
      >
        Clear Filters & Search
      </Button>
    </div>
  );
}
