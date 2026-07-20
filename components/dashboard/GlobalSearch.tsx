'use client';

import * as React from 'react';
import { SearchInput } from '@/components/shared/SearchInput';

export function GlobalSearch() {
  const [value, setValue] = React.useState('');

  return (
    <SearchInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      placeholder="Search companies, roadmaps, resumes..."
      containerClassName="max-w-[200px] sm:max-w-xs md:max-w-sm"
    />
  );
}
