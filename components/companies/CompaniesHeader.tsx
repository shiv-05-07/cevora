'use client';

import * as React from 'react';
import { Building2, FileText, Send, Bookmark } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Company } from '@/types/company';

import { HiringCalendarDialog } from './HiringCalendarDialog';
import { UpcomingOAsDialog } from './UpcomingOAsDialog';
import { CompanyDetailsDialog } from './CompanyDetailsDialog';

interface CompaniesHeaderProps {
  companies: Company[];
}

export function CompaniesHeader({ companies }: CompaniesHeaderProps) {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [isOAsOpen, setIsOAsOpen] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);

  // We extract a small subset for Upcoming OAs
  const upcomingOAsCount = companies.filter(c => 
    c.timeline.some(t => t.title.toLowerCase().includes('assessment') && (t.status === 'warning' || t.status === 'info' || t.status === 'neutral'))
  ).length;

  return (
    <>
      <PageHeader
        title="Companies"
        description="Explore placement companies, hiring timelines, eligibility criteria, interview processes, and preparation resources."
        actions={
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved
            </Button>
            <Button className="w-full sm:w-auto" onClick={() => setIsCalendarOpen(true)}>
              Hiring Calendar
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          title="Total Companies" 
          value="124" 
          icon={Building2} 
        />
        <StatCard 
          title="Applications Open" 
          value="12" 
          trend={{ value: 'Active Now', isPositive: true }} 
          icon={Send} 
        />
        <StatCard 
          title="Upcoming OAs" 
          value={String(upcomingOAsCount)} 
          description="Amazon, Google, Adobe..."
          icon={FileText} 
          onClick={() => setIsOAsOpen(true)}
          className="cursor-pointer"
        />
        <StatCard 
          title="Saved Companies" 
          value="8" 
          icon={Bookmark} 
        />
      </div>

      <HiringCalendarDialog 
        companies={companies}
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onViewCompany={(company) => setSelectedCompany(company)}
      />

      <UpcomingOAsDialog
        companies={companies}
        isOpen={isOAsOpen}
        onClose={() => setIsOAsOpen(false)}
        onViewCompany={(company) => setSelectedCompany(company)}
      />

      <CompanyDetailsDialog 
        company={selectedCompany}
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </>
  );
}
