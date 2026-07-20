'use client';

import * as React from 'react';
import { Company } from '@/types/company';
import { FilterBar } from '@/components/shared/FilterBar';
import { CompanyGrid } from './CompanyGrid';
import { CompanyDetailsDialog } from './CompanyDetailsDialog';
import { SearchInput } from '@/components/shared/SearchInput';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CompaniesClientProps {
  initialCompanies: Company[];
}

const ITEMS_PER_PAGE = 9;

export function CompaniesClient({ initialCompanies }: CompaniesClientProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string[]>>({});
  const [activeSort, setActiveSort] = React.useState<string>('recent');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);

  // Filter Configurations
  const filterConfigs = [
    {
      id: 'hiringStatus',
      label: 'Hiring Status',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Upcoming', value: 'Upcoming' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Shortlisted', value: 'Shortlisted' },
        { label: 'Closed', value: 'Closed' }
      ]
    },
    {
      id: 'workMode',
      label: 'Work Mode',
      options: [
        { label: 'On-site', value: 'On-site' },
        { label: 'Hybrid', value: 'Hybrid' },
        { label: 'Remote', value: 'Remote' }
      ]
    },
    {
      id: 'oaDifficulty',
      label: 'OA Difficulty',
      options: [
        { label: 'Easy', value: 'Easy' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Hard', value: 'Hard' }
      ]
    }
  ];

  const sortOptions = [
    { label: 'Recently Added', value: 'recent' },
    { label: 'Deadline: Approaching', value: 'deadline_asc' },
    { label: 'Package: High to Low', value: 'package_desc' },
  ];

  // Filtering Logic
  const filteredCompanies = React.useMemo(() => {
    let result = [...initialCompanies];

    // Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.companyName.toLowerCase().includes(q) || 
        c.role.toLowerCase().includes(q) ||
        c.requiredSkills.some(s => s.toLowerCase().includes(q))
      );
    }

    // Filters
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter(c => {
          const companyVal = c[key as keyof Company];
          return values.includes(String(companyVal));
        });
      }
    });

    // Sorting (Mock implementations)
    if (activeSort === 'deadline_asc') {
      result.sort((a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime());
    } else if (activeSort === 'package_desc') {
      result.sort((a, b) => {
        const pA = parseInt(a.package) || 0;
        const pB = parseInt(b.package) || 0;
        return pB - pA;
      });
    }

    return result;
  }, [initialCompanies, searchQuery, activeFilters, activeSort]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const currentCompanies = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCompanies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCompanies, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1); // Reset page on filter change
  }, [searchQuery, activeFilters, activeSort]);

  return (
    <div className="space-y-6">
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filterConfigs}
        activeFilters={activeFilters}
        onFilterChange={(filterId, values) => {
          setActiveFilters(prev => ({ ...prev, [filterId]: values }));
        }}
        onReset={() => setActiveFilters({})}
        sortOptions={sortOptions}
        activeSort={activeSort}
        onSortChange={setActiveSort}
      />

      <CompanyGrid 
        companies={currentCompanies} 
        onViewDetails={setSelectedCompany} 
      />

      {totalPages > 1 && (
        <Pagination className="pt-6 border-t border-border/40">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {/* Simple pagination display for MVP */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <CompanyDetailsDialog 
        company={selectedCompany}
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}
