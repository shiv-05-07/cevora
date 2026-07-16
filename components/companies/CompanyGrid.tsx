'use client';

import * as React from 'react';
import { Company } from '@/types/company';
import { CompanyCard } from './CompanyCard';

interface CompanyGridProps {
  companies: Company[];
  onViewDetails: (company: Company) => void;
}

export function CompanyGrid({ companies, onViewDetails }: CompanyGridProps) {
  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed rounded-xl bg-muted/10">
        <h3 className="text-lg font-bold tracking-tight mb-2">No companies found</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          We couldn&apos;t find any companies matching your current filters. Try adjusting your search criteria or resetting the filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
