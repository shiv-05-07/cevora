import * as React from 'react';
import { CompaniesHeader } from '@/components/companies/CompaniesHeader';
import { CompaniesClient } from '@/components/companies';
import { mockCompanies } from '@/data/mockCompanies';

export const metadata = {
  title: 'Companies | Cevora',
  description: 'Explore placement companies and hiring timelines.',
};

export default function CompaniesPage() {
  return (
    <div className="space-y-6 pb-12">
      <CompaniesHeader companies={mockCompanies} />
      
      {/* Main Orchestrator */}
      <CompaniesClient initialCompanies={mockCompanies} />
    </div>
  );
}
