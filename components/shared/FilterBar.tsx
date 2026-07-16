'use client';

import * as React from 'react';
import { SlidersHorizontal, X, Check, ArrowDownUp } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  filters?: FilterConfig[];
  activeFilters?: Record<string, string[]>;
  onFilterChange?: (filterId: string, values: string[]) => void;

  sortOptions?: FilterOption[];
  activeSort?: string;
  onSortChange?: (value: string) => void;

  onReset?: () => void;
  className?: string;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  activeFilters = {},
  onFilterChange,
  sortOptions = [],
  activeSort,
  onSortChange,
  onReset,
  className
}: FilterBarProps) {
  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0) || !!searchValue;

  const toggleFilter = (filterId: string, value: string) => {
    if (!onFilterChange) return;
    const current = activeFilters[filterId] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange(filterId, updated);
  };

  const removeFilter = (filterId: string, value: string) => {
    if (!onFilterChange) return;
    const current = activeFilters[filterId] || [];
    onFilterChange(filterId, current.filter(v => v !== value));
  };

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <SearchInput
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange('')}
            placeholder={searchPlaceholder}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
          {filters.map(filter => (
            <Popover key={filter.id}>
              <PopoverTrigger render={<Button variant="outline" size="sm" className="h-8.5 border-dashed bg-background/50 text-xs font-semibold" />}>
                <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
                {filter.label}
                {(activeFilters[filter.id]?.length ?? 0) > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal text-[10px]">
                    {activeFilters[filter.id]?.length}
                  </Badge>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder={`Filter ${filter.label}...`} className="h-9" />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {filter.options.map(option => {
                        const isSelected = activeFilters[filter.id]?.includes(option.value);
                        return (
                          <CommandItem
                            key={option.value}
                            onSelect={() => toggleFilter(filter.id, option.value)}
                          >
                            <div className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                            )}>
                              <Check className={cn("h-3 w-3")} />
                            </div>
                            {option.label}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          ))}

          {/* Sort */}
          {sortOptions.length > 0 && onSortChange && (
            <Select value={activeSort} onValueChange={(val) => val && onSortChange(val)}>
              <SelectTrigger className="h-8.5 w-[140px] text-xs font-semibold bg-background/50">
                <div className="flex items-center">
                  <ArrowDownUp className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value} className="text-xs">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Reset */}
          {hasActiveFilters && onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-8.5 text-xs text-muted-foreground hover:text-foreground px-2"
            >
              Reset
              <X className="w-3.5 h-3.5 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {Object.entries(activeFilters).some(([_, arr]) => arr.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium mr-1">Active Filters:</span>
          {Object.entries(activeFilters).map(([filterId, values]) => {
            const filterDef = filters.find(f => f.id === filterId);
            if (!filterDef) return null;
            return values.map(val => {
              const optionDef = filterDef.options.find(o => o.value === val);
              return (
                <Badge key={`${filterId}-${val}`} variant="secondary" className="px-2 py-0.5 text-xs font-medium bg-muted/50 border-border/50">
                  {filterDef.label}: {optionDef?.label || val}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => removeFilter(filterId, val)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            });
          })}
        </div>
      )}
    </div>
  );
}
