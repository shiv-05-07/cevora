'use server';

import prisma from '@/lib/prisma';
import { evaluateEligibility } from './services/eligibilityEngine';
import { rankRecommendations } from './services/recommendationEngine';
import { getSemanticMatch } from './services/geminiMatcher';
import { parseSmartQuery } from './services/smartMatch';

export async function getCompanyRecommendations(userId: string, searchQuery?: string, includeMocks: boolean = true) {
  // 1. Fetch Student Profile
  const profile = await prisma.studentProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    return { profile: null, recommendations: [], parsedFilters: null };
  }

  // 2. Parse Smart Query if provided
  let structuredFilters = undefined;
  let virtualProfile = { ...profile } as typeof profile;

  if (searchQuery && searchQuery.trim() !== '') {
    structuredFilters = await parseSmartQuery(searchQuery);
    if (structuredFilters) {
      if (structuredFilters.minimumCgpa) virtualProfile.cgpa = structuredFilters.minimumCgpa;
      if (structuredFilters.minimumSgpa) virtualProfile.currentSgpa = structuredFilters.minimumSgpa;
      if (structuredFilters.branch) virtualProfile.branch = structuredFilters.branch;
      if (structuredFilters.skills && structuredFilters.skills.length > 0) {
        virtualProfile.skills = Array.from(new Set([...(virtualProfile.skills || []), ...structuredFilters.skills]));
      }
      if (structuredFilters.opportunityType && structuredFilters.opportunityType !== 'BOTH') {
        virtualProfile.opportunityTypePreference = structuredFilters.opportunityType;
      }
    }
  }

  // 3. Fetch active Opportunities from DB
  const whereClause: any = {
    status: { in: ['OPEN', 'UPCOMING'] },
    company: { active: true },
    isMock: includeMocks ? undefined : false,
  };

  const rawOpportunities = await prisma.opportunity.findMany({
    where: whereClause,
    include: {
      company: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  // Deduplicate by opportunity ID
  const uniqueOpportunitiesMap = new Map<string, typeof rawOpportunities[0]>();
  for (const opp of rawOpportunities) {
    if (!uniqueOpportunitiesMap.has(opp.id)) {
      uniqueOpportunitiesMap.set(opp.id, opp);
    }
  }
  const opportunities = Array.from(uniqueOpportunitiesMap.values());

  // 4. Evaluate deterministic eligibility for each
  const evaluations = opportunities.map((opp: any) => {
    const eligibility = evaluateEligibility(virtualProfile, opp);
    return {
      opportunity: opp,
      eligibility
    };
  });

  // 5. Enrich top eligible candidates with Gemini Semantic Match (limit to top candidates to stay within Gemini 5 RPM rate limit)
  const eligibleCandidates = evaluations.filter(
    (e) => e.eligibility.status !== 'not_eligible' || e.eligibility.failedCriteria.length <= 1
  );

  // Take top 3 eligible candidates for semantic AI match to prevent exceeding 5 RPM rate limit
  const topForAi = eligibleCandidates.slice(0, 3);
  const geminiScoreMap = new Map<string, any>();

  for (const evalObj of topForAi) {
    const geminiScores = await getSemanticMatch(virtualProfile, evalObj.opportunity);
    if (geminiScores) {
      geminiScoreMap.set(evalObj.opportunity.id, geminiScores);
    }
  }

  const enrichedEvaluations = evaluations.map((evalObj) => {
    const geminiScores = geminiScoreMap.get(evalObj.opportunity.id);
    return geminiScores ? { ...evalObj, geminiScores } : evalObj;
  });

  // 6. Rank recommendations
  const rankedResults = rankRecommendations(virtualProfile, enrichedEvaluations);

  // Filter based on specific query intent if requested
  let finalResults = rankedResults;
  if (structuredFilters?.queryType === 'ELIGIBLE_NOW') {
    finalResults = rankedResults.filter(r => r.eligibility.status === 'eligible');
  } else if (structuredFilters?.queryType === 'ALMOST_ELIGIBLE') {
    finalResults = rankedResults.filter(r => r.category === 'Almost Eligible');
  } else if (structuredFilters?.queryType === 'PREPARE_FIRST') {
    finalResults = rankedResults.filter(r => r.category === 'Prepare First' || r.category === 'Stretch Opportunities');
  }

  // Filter by location if explicitly extracted (location kept as search/ranking filter signal)
  if (structuredFilters?.location) {
    const targetLocation = structuredFilters.location.toLowerCase();
    finalResults = finalResults.filter(r => {
      const loc = (r.opportunity.location || '').toLowerCase();
      const mode = (r.opportunity.workMode || '').toLowerCase();
      return loc.includes(targetLocation) || mode.includes(targetLocation) || loc.includes('pan india');
    });
  }

  // Ensure final recommendations are deduplicated by opportunity.id
  const finalDeduplicatedMap = new Map<string, typeof finalResults[0]>();
  for (const item of finalResults) {
    if (!finalDeduplicatedMap.has(item.opportunity.id)) {
      finalDeduplicatedMap.set(item.opportunity.id, item);
    }
  }

  return {
    profile: virtualProfile,
    recommendations: Array.from(finalDeduplicatedMap.values()),
    parsedFilters: structuredFilters
  };
}

export async function getCompanyDetails(slug: string, userId: string) {
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      opportunities: {
        include: {
          company: true
        }
      }
    }
  });

  if (!company) return null;

  const profile = await prisma.studentProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    return { company, opportunities: company.opportunities, eligibility: null };
  }

  const opportunitiesWithEligibility = await Promise.all(
    company.opportunities.map(async (opp: any) => {
      const eligibility = evaluateEligibility(profile, opp);
      const geminiScores = await getSemanticMatch(profile, opp);
      return {
        ...opp,
        eligibility,
        geminiScores
      };
    })
  );

  return {
    company,
    opportunities: opportunitiesWithEligibility,
  };
}

export async function updateCompanyPreferences(userId: string, data: any) {
  const profile = await prisma.studentProfile.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ...data,
    },
  });

  return profile;
}
