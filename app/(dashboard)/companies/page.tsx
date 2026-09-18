import * as React from 'react';
import { CompaniesOrchestrator } from '@/features/companies/components/CompaniesOrchestrator';
import { getCompanyRecommendations } from '@/features/companies/actions';
import { requireAppUser } from '@/lib/auth/requireUser';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Companies Intelligence | Cevora',
  description: 'Explore placement companies, intelligent job matching, and hiring timelines.',
};

export default async function CompaniesPage() {
  let userId: string | null = null;
  try {
    const { appUser } = await requireAppUser();
    userId = appUser.id;
  } catch (e) {
    console.warn("User not authenticated, redirecting to login...");
    redirect('/login');
  }

  let profile = null;
  let recommendations: any[] = [];
  
  if (userId) {
    try {
      const result = await getCompanyRecommendations(userId, undefined, true);
      profile = result.profile;
      recommendations = result.recommendations;
    } catch (e) {
      console.error("Error fetching recommendations:", e);
    }
  }

  // Helper to format salary / stipend realistically
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

  // Helper to format deadline
  function formatDeadline(deadline: Date | string | null) {
    if (!deadline) return 'Open Applications';
    try {
      const d = new Date(deadline);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Closing Soon';
    }
  }

  // Helper to derive realistic OA difficulty
  function deriveOaDifficulty(opp: any): 'Easy' | 'Medium' | 'Hard' {
    if ((opp.minimumCgpa && opp.minimumCgpa >= 8.0) || (opp.preferredSkills || []).some((s: string) => ['C++', 'DSA', 'Algorithms'].includes(s))) {
      return 'Hard';
    }
    if (opp.minimumCgpa && opp.minimumCgpa >= 7.0) {
      return 'Medium';
    }
    return 'Easy';
  }

  // Map to frontend Company card type
  const mappedCompanies = recommendations.map((rec: any) => {
    const opp = rec.opportunity;
    const company = opp.company;

    return {
      id: opp.id, // Stable unique opportunity ID
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

  return (
    <div className="space-y-6 pb-12">
      <CompaniesOrchestrator 
        userId={userId || ''} 
        profile={profile} 
        companies={mappedCompanies as any} 
      />
    </div>
  );
}
