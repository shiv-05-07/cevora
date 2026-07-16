'use client';

import * as React from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  onClear?: () => void;
  containerClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, isLoading, onClear, value, onChange, ...props }, ref) => {
    return (
      <div className={cn('relative w-full select-none', containerClassName)}>
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          ref={ref}
          value={value}
          onChange={onChange}
          className={cn(
            'pl-8 pr-8 h-8.5 text-xs bg-background/50 border border-border/80 rounded-lg placeholder:text-muted-foreground/80 focus-visible:ring-1 focus-visible:ring-ring dark:border-input/50 dark:bg-input/10',
            className
          )}
          {...props}
        />
        {isLoading ? (
          <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground animate-spin" />
        ) : (
          value && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
