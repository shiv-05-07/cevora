import { Opportunity, Company, StudentProfile } from '@prisma/client';
import { EligibilityResult } from './eligibilityEngine';

export type RecommendationCategory =
  | 'Best Matches'
  | 'Eligible Opportunities'
  | 'Almost Eligible'
  | 'Stretch Opportunities'
  | 'Prepare First';

export interface OpportunityWithRelations extends Opportunity {
  company: Company;
}

export interface GeminiScores {
  skillMatch: number;      // 0 to 1
  roleFit: number;         // 0 to 1
  branchRelevance: number; // 0 to 1
  matchedSkills?: string[];
  missingSkills?: string[];
  reason?: string;
}

export interface RecommendationResult {
  opportunity: OpportunityWithRelations;
  eligibility: EligibilityResult;
  matchScore: number;
  category: RecommendationCategory;
  geminiScores?: GeminiScores;
}

/**
 * Calculates a match score out of 100 based on deterministic eligibility and optional Gemini semantic scores.
 */
function calculateMatchScore(
  profile: StudentProfile,
  opportunity: OpportunityWithRelations,
  eligibility: EligibilityResult,
  geminiScores?: GeminiScores
): number {
  let score = 0;

  // 1. Eligibility Score (max 30)
  if (eligibility.status === 'eligible') {
    score += 30;
  } else if (eligibility.status === 'unknown') {
    score += 15;
  } else {
    score += Math.max(0, 15 - eligibility.failedCriteria.length * 5);
  }

  // 2. Academic Fit: CGPA & SGPA (max 30)
  let academicScore = 0;
  
  if (profile.cgpa !== null && opportunity.minimumCgpa !== null && opportunity.minimumCgpa > 0) {
    if (profile.cgpa >= opportunity.minimumCgpa) {
      const reward = (opportunity.minimumCgpa / 10.0) * 15;
      academicScore += Math.min(15, reward);
    } else {
      const gap = opportunity.minimumCgpa - profile.cgpa;
      academicScore += Math.max(0, 15 - gap * 15);
    }
  } else {
    academicScore += (profile.cgpa && profile.cgpa > 8.0) ? 15 : 10;
  }

  if (profile.currentSgpa !== null && opportunity.minimumSgpa !== null && opportunity.minimumSgpa > 0) {
    if (profile.currentSgpa >= opportunity.minimumSgpa) {
      const reward = (opportunity.minimumSgpa / 10.0) * 15;
      academicScore += Math.min(15, reward);
    } else {
      const gap = opportunity.minimumSgpa - profile.currentSgpa;
      academicScore += Math.max(0, 15 - gap * 15);
    }
  } else {
    academicScore += (profile.currentSgpa && profile.currentSgpa > 8.0) ? 15 : 10;
  }

  score += Math.min(30, academicScore);

  // 3. Skills & Role & Branch Intelligence (max 40)
  if (geminiScores) {
    score += Math.round(geminiScores.skillMatch * 25);
    score += Math.round(geminiScores.roleFit * 10);
    score += Math.round(geminiScores.branchRelevance * 5);
  } else {
    const oppSkills = opportunity.preferredSkills || [];
    if (oppSkills.length > 0 && profile.skills && profile.skills.length > 0) {
      const matchedSkills = oppSkills.filter(s => 
        profile.skills.some(ps => ps.toLowerCase() === s.toLowerCase())
      );
      const skillRatio = matchedSkills.length / oppSkills.length;
      score += Math.round(skillRatio * 20);
    } else {
      score += 10;
    }

    if (profile.targetRole && opportunity.role?.toLowerCase().includes(profile.targetRole.toLowerCase())) {
      score += 10;
    } else {
      score += 5;
    }

    score += 10;
  }

  return Math.min(100, Math.max(0, score));
}

export function rankRecommendations(
  profile: StudentProfile,
  evaluations: { opportunity: OpportunityWithRelations; eligibility: EligibilityResult; geminiScores?: GeminiScores }[]
): RecommendationResult[] {
  let filteredEvaluations = evaluations;
  const pref = profile.opportunityTypePreference?.toUpperCase();
  if (pref === 'INTERNSHIP') {
    filteredEvaluations = evaluations.filter(e => e.opportunity.type === 'INTERNSHIP');
  } else if (pref === 'PLACEMENT') {
    filteredEvaluations = evaluations.filter(e => e.opportunity.type === 'FULL_TIME');
  }

  const results: RecommendationResult[] = filteredEvaluations.map((evalObj) => {
    const matchScore = calculateMatchScore(profile, evalObj.opportunity, evalObj.eligibility, evalObj.geminiScores);

    let category: RecommendationCategory = 'Prepare First';

    if (evalObj.eligibility.status === 'eligible') {
      if (matchScore >= 80) {
        category = 'Best Matches';
      } else {
        category = 'Eligible Opportunities';
      }
    } else if (evalObj.eligibility.status === 'unknown') {
      category = 'Stretch Opportunities';
    } else if (evalObj.eligibility.status === 'not_eligible') {
      if (evalObj.eligibility.failedCriteria.length <= 2) {
        category = 'Almost Eligible';
      } else {
        category = 'Prepare First';
      }
    }

    return {
      opportunity: evalObj.opportunity,
      eligibility: evalObj.eligibility,
      matchScore,
      category,
      geminiScores: evalObj.geminiScores
    };
  });

  results.sort((a, b) => b.matchScore - a.matchScore);

  return results;
}
