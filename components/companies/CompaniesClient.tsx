'use client';

import * as React from 'react';
import { Company } from '@/types/company';
import { FilterBar } from '@/components/shared/FilterBar';
import { CompanyGrid } from './CompanyGrid';
import { CompanyDetailsDialog } from './CompanyDetailsDialog';
import { getCompanyRecommendations } from '@/features/companies/actions';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CompaniesClientProps {
  initialCompanies: Company[];
  userId?: string;
}

const ITEMS_PER_PAGE = 9;

function formatCompensation(opp: any) {
  if (opp.salaryMax) {
    const lpa = (opp.salaryMax / 100000).toFixed(opp.salaryMax % 100000 === 0 ? 0 : 1);
    return `₹${lpa} LPA`;
  }
  if (opp.stipend) {
    return opp.stipend;
  }
  return 'Competitive';
}

function formatDeadline(deadline: Date | string | null) {
  if (!deadline) return 'Open Applications';
  try {
    const d = new Date(deadline);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Closing Soon';
  }
}

function deriveOaDifficulty(opp: any): 'Easy' | 'Medium' | 'Hard' {
  if ((opp.minimumCgpa && opp.minimumCgpa >= 8.0) || opp.skills?.some((s: string) => ['C++', 'DSA', 'Algorithms'].includes(s))) {
    return 'Hard';
  }
  if (opp.minimumCgpa && opp.minimumCgpa >= 7.0) {
    return 'Medium';
  }
  return 'Easy';
}

export function CompaniesClient({ initialCompanies, userId }: CompaniesClientProps) {
  const [companies, setCompanies] = React.useState<Company[]>(initialCompanies);

  React.useEffect(() => {
    setCompanies(initialCompanies);
  }, [initialCompanies]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string[]>>({});
  const [activeSort, setActiveSort] = React.useState<string>('recent');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const [isPending, startTransition] = React.useTransition();

  // Filter Configurations
  const filterConfigs = [
    {
      id: 'hiringStatus',
      label: 'Hiring Status',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Upcoming', value: 'Upcoming' },
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
      label: 'Assessment',
      options: [
        { label: 'Easy OA', value: 'Easy' },
        { label: 'Medium OA', value: 'Medium' },
        { label: 'Hard OA', value: 'Hard' }
      ]
    },
    {
      id: 'eligibleBranches',
      label: 'Branch',
      options: [
        { label: 'CSE', value: 'CSE' },
        { label: 'IT', value: 'IT' },
        { label: 'ECE', value: 'ECE' },
        { label: 'EEE', value: 'EEE' },
        { label: 'Mechanical', value: 'Mechanical' },
        { label: 'Civil', value: 'Civil' },
        { label: 'Chemical', value: 'Chemical' }
      ]
    },
    {
      id: 'minCgpa',
      label: 'My CGPA',
      options: [
        { label: '9.0+ CGPA', value: '9.0' },
        { label: '8.5+ CGPA', value: '8.5' },
        { label: '8.0+ CGPA', value: '8.0' },
        { label: '7.5+ CGPA', value: '7.5' },
        { label: '7.0+ CGPA', value: '7.0' },
        { label: '6.5+ CGPA', value: '6.5' }
      ]
    }
  ];

  const sortOptions = [
    { label: 'Best Match First', value: 'match_desc' },
    { label: 'Package: High to Low', value: 'package_desc' },
    { label: 'Deadline: Approaching', value: 'deadline_asc' },
  ];

  // Smart Match Trigger
  const handleSmartMatch = () => {
    if (!userId || !searchQuery.trim()) return;
    startTransition(async () => {
      try {
        const result = await getCompanyRecommendations(userId, searchQuery, true);
        if (result && result.recommendations) {
          const mappedCompanies = result.recommendations.map((rec: any) => {
            const opp = rec.opportunity;
            const company = opp.company;

            return {
              id: opp.id,
              companySlug: company.slug,
              logo: company.logoUrl || '',
              companyName: company.name,
              role: opp.title,
              package: formatCompensation(opp),
              location: opp.location || 'Pan India',
              workMode: opp.workMode || 'Hybrid',
              hiringStatus: opp.status === 'OPEN' ? 'Active' : (opp.status === 'UPCOMING' ? 'Upcoming' : 'Closed'),
              applicationDeadline: formatDeadline(opp.deadline),
              cgpaCriteria: opp.minimumCgpa ? `${opp.minimumCgpa}+ CGPA` : 'No CGPA Criteria',
              eligibleBranches: opp.eligibleBranches?.length > 0 ? opp.eligibleBranches : ['All Branches'],
              timeline: [
                { id: '1', title: 'Applications Open', date: 'Oct 2026', status: 'success' },
                { id: '2', title: 'Assessment Window', date: 'Nov 2026', status: 'warning' },
                { id: '3', title: 'Interview & Offers', date: 'Dec 2026', status: 'neutral' }
              ],
              requiredSkills: opp.skills || [],
              interviewRounds: opp.type === 'INTERNSHIP' ? 2 : 3,
              oaDifficulty: deriveOaDifficulty(opp),
              interviewDifficulty: opp.minimumCgpa && opp.minimumCgpa >= 8.0 ? 'Hard' : 'Medium',
              description: company.description || 'Global technology and engineering leader hiring early talent.',
              matchCategory: rec.category,
              matchScore: rec.matchScore,
              eligibility: rec.eligibility,
              geminiScores: rec.geminiScores,
              isMock: opp.isMock,
              applyUrl: opp.applyUrl || opp.officialSourceUrl || company.website || 'https://careers.google.com',
            };
          });

          // Deduplicate by opportunity ID
          const seenIds = new Set<string>();
          const deduplicated = mappedCompanies.filter((c: any) => {
            if (seenIds.has(c.id)) return false;
            seenIds.add(c.id);
            return true;
          });

          setCompanies(deduplicated as any);
        }
      } catch (e) {
        console.error('Smart match failed:', e);
      }
    });
  };

  const handleClearSmartMatch = () => {
    setSearchQuery('');
    setCompanies(initialCompanies);
  };

  // Client-side Filtering & Deduplication
  const filteredCompanies = React.useMemo(() => {
    let result = [...companies];

    // Local Search fallback if Smart Match hasn't been triggered yet
    if (searchQuery.trim() !== '' && companies === initialCompanies) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.companyName.toLowerCase().includes(q) || 
        c.role.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.requiredSkills.some(s => s.toLowerCase().includes(q))
      );
    }

    // Apply Filter Bar criteria
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter(c => {
          if (key === 'eligibleBranches') {
            return values.some(v => 
              c.eligibleBranches.includes(v) || 
              c.eligibleBranches.some(eb => eb.toLowerCase() === 'all branches' || eb.toLowerCase() === 'all engineering' || eb.toLowerCase() === 'all')
            );
          } else if (key === 'minCgpa') {
            const userCgpa = Math.max(...values.map(v => parseFloat(v)));
            const match = c.cgpaCriteria.match(/[\d.]+/);
            if (!match) return true; // 'No CGPA Criteria'
            const requiredCgpa = parseFloat(match[0]);
            return userCgpa >= requiredCgpa;
          }

          const companyVal = c[key as keyof Company];
          return values.includes(String(companyVal));
        });
      }
    });

    // Sorting
    if (activeSort === 'package_desc') {
      result.sort((a, b) => {
        const parsePkg = (val: string) => {
          if (val.includes('LPA')) return parseFloat(val.replace(/[^0-9.]/g, '')) * 100000;
          if (val.includes('/month')) return parseFloat(val.replace(/[^0-9.]/g, '')) * 12;
          return 0;
        };
        return parsePkg(b.package) - parsePkg(a.package);
      });
    } else if (activeSort === 'deadline_asc') {
      result.sort((a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime());
    } else if (activeSort === 'match_desc') {
      result.sort((a: any, b: any) => (b.matchScore || 0) - (a.matchScore || 0));
    }

    // Ensure strict uniqueness by ID
    const seen = new Set<string>();
    return result.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [companies, initialCompanies, searchQuery, activeFilters, activeSort]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const currentCompanies = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCompanies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCompanies, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilters, activeSort]);

  // Section categorization (Strict Mutual Exclusivity: each opportunity appears in ONE section only)
  const categorized = React.useMemo(() => {
    const map: Record<string, Company[]> = {
      'Recommended for You': [],
      'Eligible Opportunities': [],
      'Almost Eligible': [],
      'Stretch Opportunities': [],
      'Prepare First': []
    };

    const renderedIds = new Set<string>();

    currentCompanies.forEach((c: any) => {
      if (renderedIds.has(c.id)) return;
      renderedIds.add(c.id);

      const category = c.matchCategory;
      if (category === 'Best Matches') {
        map['Recommended for You'].push(c);
      } else if (category === 'Eligible Opportunities') {
        map['Eligible Opportunities'].push(c);
      } else if (category === 'Almost Eligible') {
        map['Almost Eligible'].push(c);
      } else if (category === 'Stretch Opportunities') {
        map['Stretch Opportunities'].push(c);
      } else {
        map['Prepare First'].push(c);
      }
    });

    return map;
  }, [currentCompanies]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="flex-1">
          <FilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Smart Match ✨ (e.g. Mechanical internships or CSE placement > 7.5 CGPA)"
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
        </div>
        <button 
          onClick={handleSmartMatch} 
          disabled={isPending || !searchQuery.trim()}
          className="h-[34px] px-4 rounded-md bg-indigo-600 text-white text-xs font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors shrink-0"
        >
          {isPending ? 'Matching...' : 'Smart Match ✨'}
        </button>
        {companies !== initialCompanies && (
          <button 
            onClick={handleClearSmartMatch} 
            className="h-[34px] px-4 rounded-md border text-xs font-semibold shadow-sm hover:bg-accent transition-colors shrink-0"
          >
            Reset
          </button>
        )}
      </div>

      {Object.entries(categorized).map(([category, comps]) => {
        if (comps.length === 0) return null;
        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-foreground">{category}</h2>
              <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border/40">
                {comps.length} {comps.length === 1 ? 'opportunity' : 'opportunities'}
              </span>
            </div>
            <CompanyGrid 
              companies={comps} 
              onViewDetails={setSelectedCompany} 
            />
          </div>
        );
      })}

      {currentCompanies.length === 0 && (
        <div className="text-center py-20 bg-card rounded-xl border border-border/50 shadow-sm">
          <h3 className="text-lg font-bold text-foreground">No opportunities match these filters</h3>
          <p className="text-sm text-muted-foreground mt-2 mb-4">Try clearing some filters or searching for another role/skill.</p>
          <button 
            className="text-sm text-primary font-bold hover:underline"
            onClick={() => {
              setActiveFilters({});
              setSearchQuery('');
              setCompanies(initialCompanies);
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

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
