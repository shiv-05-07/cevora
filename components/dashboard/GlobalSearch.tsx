'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function GlobalSearch() {
  const [value, setValue] = React.useState('');

  return (
    <div className="relative w-full max-w-[200px] sm:max-w-xs md:max-w-sm select-none">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search companies, roadmaps, resumes..."
        className="pl-8 h-8.5 text-xs bg-background/50 border border-border/80 rounded-lg placeholder:text-muted-foreground/80 focus-visible:ring-1 focus-visible:ring-ring dark:border-input/50 dark:bg-input/10"
      />
    </div>
  );
}
