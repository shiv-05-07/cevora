import * as React from 'react';
import { SearchInput } from '@/components/shared/SearchInput';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, ArrowDownUp } from 'lucide-react';
import { ProblemFilterState, SortOption, Difficulty } from '@/lib/oa-practice/types';
import { PRIMARY_COMPANIES } from '@/lib/oa-practice/data/companies';
import { PRIMARY_TOPICS } from '@/lib/oa-practice/data/topics';

export interface ProblemFilterToolbarProps {
  filters: ProblemFilterState;
  onFilterChange: (updated: Partial<ProblemFilterState>) => void;
  onClearFilters: () => void;
  showCompanySelect?: boolean;
  showTopicSelect?: boolean;
  resultCount?: number;
}

export function ProblemFilterToolbar({
  filters,
  onFilterChange,
  onClearFilters,
  showCompanySelect = true,
  showTopicSelect = true,
  resultCount,
}: ProblemFilterToolbarProps) {
  const hasActiveFilters = Boolean(
    filters.searchQuery ||
      (showCompanySelect && filters.companySlug && filters.companySlug !== 'all') ||
      (showTopicSelect && filters.topicSlug && filters.topicSlug !== 'all') ||
      (filters.difficulty && filters.difficulty !== 'all') ||
      (filters.recency && filters.recency !== 'all')
  );

  return (
    <div className="space-y-3 bg-card border border-border/70 rounded-xl p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[220px]">
          <SearchInput
            placeholder="Search problems, topics, or companies..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            onClear={() => onFilterChange({ searchQuery: '' })}
            containerClassName="w-full"
          />
        </div>

        {/* Filters & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Company Select */}
          {showCompanySelect && (
            <Select
              value={filters.companySlug || 'all'}
              onValueChange={(val) => onFilterChange({ companySlug: val ?? 'all' })}
            >
              <SelectTrigger className="h-9 text-xs font-semibold w-[130px] sm:w-[150px] bg-background">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Companies</SelectItem>
                {PRIMARY_COMPANIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug} className="text-xs">
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Topic Select */}
          {showTopicSelect && (
            <Select
              value={filters.topicSlug || 'all'}
              onValueChange={(val) => onFilterChange({ topicSlug: val ?? 'all' })}
            >
              <SelectTrigger className="h-9 text-xs font-semibold w-[140px] sm:w-[160px] bg-background">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Topics</SelectItem>
                {PRIMARY_TOPICS.map((t) => (
                  <SelectItem key={t.slug} value={t.slug} className="text-xs">
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Difficulty Select */}
          <Select
            value={filters.difficulty || 'all'}
            onValueChange={(val) => onFilterChange({ difficulty: (val ?? 'all') as 'all' | Difficulty })}
          >
            <SelectTrigger className="h-9 text-xs font-semibold w-[110px] sm:w-[130px] bg-background">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Difficulties</SelectItem>
              <SelectItem value="Easy" className="text-xs">Easy</SelectItem>
              <SelectItem value="Medium" className="text-xs">Medium</SelectItem>
              <SelectItem value="Hard" className="text-xs">Hard</SelectItem>
            </SelectContent>
          </Select>

          {/* Recency Select */}
          <Select
            value={filters.recency || 'all'}
            onValueChange={(val) => onFilterChange({ recency: (val ?? 'all') as any })}
          >
            <SelectTrigger className="h-9 text-xs font-semibold w-[115px] sm:w-[135px] bg-background">
              <SelectValue placeholder="Recency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Time</SelectItem>
              <SelectItem value="30d" className="text-xs">Last 30 Days</SelectItem>
              <SelectItem value="90d" className="text-xs">Last 90 Days</SelectItem>
              <SelectItem value="180d" className="text-xs">Last 6 Months</SelectItem>
              <SelectItem value="365d" className="text-xs">Last 1 Year</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Select */}
          <Select
            value={filters.sortBy}
            onValueChange={(val) => onFilterChange({ sortBy: (val ?? 'frequency-desc') as SortOption })}
          >
            <SelectTrigger className="h-9 text-xs font-semibold w-[140px] sm:w-[170px] bg-background">
              <div className="flex items-center gap-1.5 truncate">
                <ArrowDownUp className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frequency-desc" className="text-xs">Most Frequently Reported</SelectItem>
              <SelectItem value="recency-desc" className="text-xs">Most Recently Reported</SelectItem>
              <SelectItem value="difficulty-asc" className="text-xs">Difficulty: Easy → Hard</SelectItem>
              <SelectItem value="difficulty-desc" className="text-xs">Difficulty: Hard → Easy</SelectItem>
              <SelectItem value="title-asc" className="text-xs">Problem Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filter Chips & Result Count */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {resultCount !== undefined && (
            <span className="text-muted-foreground font-medium text-[11px] mr-2">
              Showing <strong className="text-foreground font-bold">{resultCount}</strong> problem{resultCount === 1 ? '' : 's'}
            </span>
          )}

          {hasActiveFilters && (
            <>
              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted px-2 py-0.5 rounded-full border border-border/60">
                  Search: "{filters.searchQuery}"
                  <button onClick={() => onFilterChange({ searchQuery: '' })} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {showCompanySelect && filters.companySlug && filters.companySlug !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted px-2 py-0.5 rounded-full border border-border/60">
                  Company: {filters.companySlug}
                  <button onClick={() => onFilterChange({ companySlug: 'all' })} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {showTopicSelect && filters.topicSlug && filters.topicSlug !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted px-2 py-0.5 rounded-full border border-border/60">
                  Topic: {filters.topicSlug}
                  <button onClick={() => onFilterChange({ topicSlug: 'all' })} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.difficulty && filters.difficulty !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted px-2 py-0.5 rounded-full border border-border/60">
                  Difficulty: {filters.difficulty}
                  <button onClick={() => onFilterChange({ difficulty: 'all' })} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.recency && filters.recency !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted px-2 py-0.5 rounded-full border border-border/60">
                  Recency: {filters.recency}
                  <button onClick={() => onFilterChange({ recency: 'all' })} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </>
          )}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-6 text-[11px] font-semibold text-muted-foreground hover:text-foreground px-2"
          >
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  );
}
