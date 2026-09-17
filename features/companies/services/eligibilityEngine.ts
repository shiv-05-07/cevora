import { StudentProfile, Opportunity } from '@prisma/client';
import { normalizeBranch } from './branchNormalizer';

export type EligibilityStatus = 'eligible' | 'not_eligible' | 'unknown';

export type OpportunityWithAcademicCriteria = Opportunity & {
  minimumSgpa?: number | null;
  minimum10thPercentage?: number | null;
  minimum12thPercentage?: number | null;
};

export interface CriterionResult {
  key: string;
  required: string;
  actual: string | number | string[] | null;
  status: 'satisfied' | 'failed' | 'unknown' | 'not_applicable';
  mandatory: boolean;
}

export interface EligibilityResult {
  status: EligibilityStatus;
  criteria: CriterionResult[];
  failedCriteria: string[];
  unknownCriteria: string[];
}

export function evaluateEligibility(
  student: StudentProfile,
  opportunity: Opportunity
): EligibilityResult {
  const opp = opportunity as OpportunityWithAcademicCriteria;
  const criteriaResults: CriterionResult[] = [];
  let isEligible = true;
  let hasUnknowns = false;

  // 1. CGPA
  if (opp.minimumCgpa !== null && opp.minimumCgpa !== undefined && opp.minimumCgpa > 0) {
    if (student.cgpa !== null) {
      const satisfied = student.cgpa >= opp.minimumCgpa;
      criteriaResults.push({
        key: 'CGPA',
        required: `>= ${opp.minimumCgpa}`,
        actual: student.cgpa,
        status: satisfied ? 'satisfied' : 'failed',
        mandatory: true
      });
      if (!satisfied) isEligible = false;
    } else {
      criteriaResults.push({
        key: 'CGPA',
        required: `>= ${opp.minimumCgpa}`,
        actual: 'Not provided',
        status: 'unknown',
        mandatory: true
      });
      hasUnknowns = true;
    }
  } else {
    criteriaResults.push({
      key: 'CGPA',
      required: 'No Restriction',
      actual: student.cgpa ?? 'Not provided',
      status: 'not_applicable',
      mandatory: false
    });
  }

  // 2. SGPA
  if (opp.minimumSgpa !== null && opp.minimumSgpa !== undefined && opp.minimumSgpa > 0) {
    if (student.currentSgpa !== null) {
      const satisfied = student.currentSgpa >= opp.minimumSgpa;
      criteriaResults.push({
        key: 'SGPA',
        required: `>= ${opp.minimumSgpa}`,
        actual: student.currentSgpa,
        status: satisfied ? 'satisfied' : 'failed',
        mandatory: true
      });
      if (!satisfied) isEligible = false;
    } else {
      criteriaResults.push({
        key: 'SGPA',
        required: `>= ${opp.minimumSgpa}`,
        actual: 'Not provided',
        status: 'unknown',
        mandatory: true
      });
      hasUnknowns = true;
    }
  }

  // 3. Branch
  if (opp.eligibleBranches && opp.eligibleBranches.length > 0) {
    const rawBranch = student.branch || student.specialization;
    if (rawBranch) {
      const normalized = normalizeBranch(rawBranch);
      const branchMatch = opp.eligibleBranches.some(eb => {
        const ebLower = eb.toLowerCase();
        return ebLower === rawBranch.toLowerCase() ||
               ebLower === normalized.canonicalName.toLowerCase() ||
               ebLower === normalized.category.toLowerCase() ||
               ebLower === 'all' ||
               ebLower === 'all engineering';
      });

      criteriaResults.push({
        key: 'Branch',
        required: `IN [${opp.eligibleBranches.join(', ')}]`,
        actual: rawBranch,
        status: branchMatch ? 'satisfied' : 'failed',
        mandatory: true
      });
      if (!branchMatch) isEligible = false;
    } else {
      criteriaResults.push({
        key: 'Branch',
        required: `IN [${opp.eligibleBranches.join(', ')}]`,
        actual: 'Not provided',
        status: 'unknown',
        mandatory: true
      });
      hasUnknowns = true;
    }
  } else {
    criteriaResults.push({
      key: 'Branch',
      required: 'No Restriction',
      actual: student.branch || student.specialization || 'Not provided',
      status: 'not_applicable',
      mandatory: false
    });
  }

  // 4. Graduation Year
  if (opp.eligibleGraduationYears && opp.eligibleGraduationYears.length > 0) {
    if (student.graduationYear) {
      const yearMatch = opp.eligibleGraduationYears.includes(student.graduationYear);
      criteriaResults.push({
        key: 'Graduation Year',
        required: `IN [${opp.eligibleGraduationYears.join(', ')}]`,
        actual: student.graduationYear,
        status: yearMatch ? 'satisfied' : 'failed',
        mandatory: true
      });
      if (!yearMatch) isEligible = false;
    } else {
      criteriaResults.push({
        key: 'Graduation Year',
        required: `IN [${opp.eligibleGraduationYears.join(', ')}]`,
        actual: 'Not provided',
        status: 'unknown',
        mandatory: true
      });
      hasUnknowns = true;
    }
  } else {
    criteriaResults.push({
      key: 'Graduation Year',
      required: 'No Restriction',
      actual: student.graduationYear ?? 'Not provided',
      status: 'not_applicable',
      mandatory: false
    });
  }

  // 5. Backlogs
  if (opp.maximumBacklogs !== null && opp.maximumBacklogs !== undefined) {
    if (student.activeBacklogs !== null) {
      const backlogsMatch = student.activeBacklogs <= opp.maximumBacklogs;
      criteriaResults.push({
        key: 'Backlogs',
        required: `<= ${opp.maximumBacklogs}`,
        actual: student.activeBacklogs,
        status: backlogsMatch ? 'satisfied' : 'failed',
        mandatory: true
      });
      if (!backlogsMatch) isEligible = false;
    } else {
      criteriaResults.push({
        key: 'Backlogs',
        required: `<= ${opp.maximumBacklogs}`,
        actual: 'Not provided',
        status: 'unknown',
        mandatory: true
      });
      hasUnknowns = true;
    }
  } else {
    criteriaResults.push({
      key: 'Backlogs',
      required: 'No Restriction',
      actual: student.activeBacklogs ?? 'Not provided',
      status: 'not_applicable',
      mandatory: false
    });
  }

  // 6. 10th Percentage
  if (opp.minimum10thPercentage !== null && opp.minimum10thPercentage !== undefined && opp.minimum10thPercentage > 0) {
    if (student.tenthPercentage !== null) {
      const satisfied = student.tenthPercentage >= opp.minimum10thPercentage;
      criteriaResults.push({
        key: '10th Percentage',
        required: `>= ${opp.minimum10thPercentage}`,
        actual: student.tenthPercentage,
        status: satisfied ? 'satisfied' : 'failed',
        mandatory: true
      });
      if (!satisfied) isEligible = false;
    } else {
      criteriaResults.push({
        key: '10th Percentage',
        required: `>= ${opp.minimum10thPercentage}`,
        actual: 'Not provided',
        status: 'unknown',
        mandatory: true
      });
      hasUnknowns = true;
    }
  }

  // 7. 12th Percentage
  if (opp.minimum12thPercentage !== null && opp.minimum12thPercentage !== undefined && opp.minimum12thPercentage > 0) {
    if (student.twelfthPercentage !== null) {
      const satisfied = student.twelfthPercentage >= opp.minimum12thPercentage;
      criteriaResults.push({
        key: '12th Percentage',
        required: `>= ${opp.minimum12thPercentage}`,
        actual: student.twelfthPercentage,
        status: satisfied ? 'satisfied' : 'failed',
        mandatory: true
      });
      if (!satisfied) isEligible = false;
    } else {
      criteriaResults.push({
        key: '12th Percentage',
        required: `>= ${opp.minimum12thPercentage}`,
        actual: 'Not provided',
        status: 'unknown',
        mandatory: true
      });
      hasUnknowns = true;
    }
  }

  const failedCriteria = criteriaResults.filter(c => c.status === 'failed').map(c => c.key);
  const unknownCriteria = criteriaResults.filter(c => c.status === 'unknown').map(c => c.key);

  let finalStatus: EligibilityStatus = 'eligible';
  if (!isEligible) {
    finalStatus = 'not_eligible';
  } else if (hasUnknowns) {
    finalStatus = 'unknown';
  }

  return {
    status: finalStatus,
    criteria: criteriaResults,
    failedCriteria,
    unknownCriteria
  };
}
