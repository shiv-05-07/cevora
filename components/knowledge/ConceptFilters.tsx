'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConceptFiltersProps {
  selectedSubject: string;
  searchQuery: string;
  filterLevel: string;
  onSubjectChange: (subject: string) => void;
  onSearchChange: (query: string) => void;
  onFilterLevelChange: (level: string) => void;
}

const SUBJECT_TABS = [
  'ALL', 'DSA', 'DBMS', 'OS', 'CN', 'Aptitude', 'OOP', 'SQL', 'Behavioral', 'Communication'
];

const LEVEL_FILTERS = [
  { id: 'ALL', label: 'All Levels' },
  { id: 'WEAK', label: 'Weak Areas (<60%)' },
  { id: 'STRONG', label: 'Mastered (≥75%)' },
];

export function ConceptFilters({
  selectedSubject,
  searchQuery,
  filterLevel,
  onSubjectChange,
  onSearchChange,
  onFilterLevelChange
}: ConceptFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Top Search & Level Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search concept or topic..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-card border-border/60 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {LEVEL_FILTERS.map((lvl) => (
            <Button
              key={lvl.id}
              variant={filterLevel === lvl.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterLevelChange(lvl.id)}
              className="text-xs font-semibold shrink-0"
            >
              {lvl.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border/40 scrollbar-none">
        {SUBJECT_TABS.map((sub) => {
          const isActive = selectedSubject === sub;
          return (
            <button
              key={sub}
              type="button"
              onClick={() => onSubjectChange(sub)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {sub}
            </button>
          );
        })}
      </div>
    </div>
  );
}
