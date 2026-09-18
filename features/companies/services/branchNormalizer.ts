export type BranchCategory =
  | 'Computer / IT'
  | 'Electronics / Electrical'
  | 'Mechanical / Manufacturing'
  | 'Civil / Infrastructure'
  | 'Chemical / Process'
  | 'Aerospace'
  | 'Biotechnology / Life Sciences'
  | 'Materials / Metallurgy'
  | 'Other';

export interface NormalizedBranch {
  original: string;
  canonicalName: string;
  category: BranchCategory;
}

// Maps common branch aliases/acronyms to their canonical name and category
const BRANCH_MAP: Record<string, { canonicalName: string; category: BranchCategory }> = {
  // Computer / IT
  cse: { canonicalName: 'Computer Science and Engineering', category: 'Computer / IT' },
  cs: { canonicalName: 'Computer Science', category: 'Computer / IT' },
  it: { canonicalName: 'Information Technology', category: 'Computer / IT' },
  'information science': { canonicalName: 'Information Science', category: 'Computer / IT' },
  'computer engineering': { canonicalName: 'Computer Engineering', category: 'Computer / IT' },
  'ai': { canonicalName: 'Artificial Intelligence', category: 'Computer / IT' },
  'ml': { canonicalName: 'Machine Learning', category: 'Computer / IT' },
  'aiml': { canonicalName: 'Artificial Intelligence and Machine Learning', category: 'Computer / IT' },
  'data science': { canonicalName: 'Data Science', category: 'Computer / IT' },
  'cyber security': { canonicalName: 'Cyber Security', category: 'Computer / IT' },

  // Electronics / Electrical
  ece: { canonicalName: 'Electronics and Communication Engineering', category: 'Electronics / Electrical' },
  'electronics': { canonicalName: 'Electronics Engineering', category: 'Electronics / Electrical' },
  'electrical': { canonicalName: 'Electrical Engineering', category: 'Electronics / Electrical' },
  eee: { canonicalName: 'Electrical and Electronics Engineering', category: 'Electronics / Electrical' },
  'instrumentation': { canonicalName: 'Instrumentation and Control', category: 'Electronics / Electrical' },
  'electronics and telecommunication': { canonicalName: 'Electronics and Telecommunication', category: 'Electronics / Electrical' },
  'eie': { canonicalName: 'Electronics and Instrumentation', category: 'Electronics / Electrical' },

  // Mechanical / Manufacturing
  me: { canonicalName: 'Mechanical Engineering', category: 'Mechanical / Manufacturing' },
  'mechanical': { canonicalName: 'Mechanical Engineering', category: 'Mechanical / Manufacturing' },
  'production': { canonicalName: 'Production Engineering', category: 'Mechanical / Manufacturing' },
  'manufacturing': { canonicalName: 'Manufacturing Engineering', category: 'Mechanical / Manufacturing' },
  'industrial': { canonicalName: 'Industrial Engineering', category: 'Mechanical / Manufacturing' },
  'automobile': { canonicalName: 'Automobile Engineering', category: 'Mechanical / Manufacturing' },
  'mechatronics': { canonicalName: 'Mechatronics', category: 'Mechanical / Manufacturing' },
  'robotics': { canonicalName: 'Robotics', category: 'Mechanical / Manufacturing' },

  // Civil / Infrastructure
  ce: { canonicalName: 'Civil Engineering', category: 'Civil / Infrastructure' },
  'civil': { canonicalName: 'Civil Engineering', category: 'Civil / Infrastructure' },
  'construction': { canonicalName: 'Construction Engineering', category: 'Civil / Infrastructure' },
  'structural': { canonicalName: 'Structural Engineering', category: 'Civil / Infrastructure' },
  'environmental': { canonicalName: 'Environmental Engineering', category: 'Civil / Infrastructure' },
  'transportation': { canonicalName: 'Transportation Engineering', category: 'Civil / Infrastructure' },

  // Chemical / Process
  'chemical': { canonicalName: 'Chemical Engineering', category: 'Chemical / Process' },
  'petrochemical': { canonicalName: 'Petrochemical Engineering', category: 'Chemical / Process' },
  'polymer': { canonicalName: 'Polymer Engineering', category: 'Chemical / Process' },
  'process': { canonicalName: 'Process Engineering', category: 'Chemical / Process' },

  // Aerospace
  'aerospace': { canonicalName: 'Aerospace Engineering', category: 'Aerospace' },
  'aeronautical': { canonicalName: 'Aeronautical Engineering', category: 'Aerospace' },

  // Biotechnology / Life Sciences
  'biotechnology': { canonicalName: 'Biotechnology', category: 'Biotechnology / Life Sciences' },
  'bioengineering': { canonicalName: 'Bioengineering', category: 'Biotechnology / Life Sciences' },
  'biomedical': { canonicalName: 'Biomedical Engineering', category: 'Biotechnology / Life Sciences' },
  'biochemical': { canonicalName: 'Biochemical Engineering', category: 'Biotechnology / Life Sciences' },

  // Materials / Metallurgy
  'metallurgy': { canonicalName: 'Metallurgical Engineering', category: 'Materials / Metallurgy' },
  'metallurgical': { canonicalName: 'Metallurgical Engineering', category: 'Materials / Metallurgy' },
  'materials': { canonicalName: 'Materials Engineering', category: 'Materials / Metallurgy' },
  'materials science': { canonicalName: 'Materials Science', category: 'Materials / Metallurgy' },
};

/**
 * Normalizes a branch string (e.g., 'cse', 'Mechanical') to its canonical name and category.
 */
export function normalizeBranch(branch: string): NormalizedBranch {
  if (!branch) {
    return {
      original: branch,
      canonicalName: branch,
      category: 'Other',
    };
  }

  const cleanBranch = branch.trim().toLowerCase();

  // Try exact match in map
  if (BRANCH_MAP[cleanBranch]) {
    return {
      original: branch,
      ...BRANCH_MAP[cleanBranch],
    };
  }

  // Handle common variations
  for (const [key, value] of Object.entries(BRANCH_MAP)) {
    if (
      cleanBranch.includes(key) ||
      cleanBranch === key ||
      cleanBranch.replace(/[^a-z]/g, '') === key.replace(/[^a-z]/g, '') // strip special chars
    ) {
       // Only return if it's a very strong match.
       if (cleanBranch.includes('computer') || cleanBranch.includes('it ') || cleanBranch.includes('information tech')) {
         return { original: branch, canonicalName: branch, category: 'Computer / IT' };
       }
       if (cleanBranch.includes('electronics') || cleanBranch.includes('electrical')) {
         return { original: branch, canonicalName: branch, category: 'Electronics / Electrical' };
       }
       if (cleanBranch.includes('mechanical') || cleanBranch.includes('production') || cleanBranch.includes('manufacturing')) {
         return { original: branch, canonicalName: branch, category: 'Mechanical / Manufacturing' };
       }
       if (cleanBranch.includes('civil') || cleanBranch.includes('construction')) {
         return { original: branch, canonicalName: branch, category: 'Civil / Infrastructure' };
       }
       // Fallback logic
       return {
         original: branch,
         canonicalName: value.canonicalName,
         category: value.category,
       };
    }
  }

  return {
    original: branch,
    canonicalName: branch,
    category: 'Other',
  };
}

/**
 * Checks if two branches are semantically similar (e.g., CSE and Computer Science).
 * Note: This is for soft matching / sorting, NOT hard eligibility.
 * Hard eligibility requires the branch to exactly match one of the opportunity's eligibleBranches.
 */
export function areBranchesRelated(branchA: string, branchB: string): boolean {
  if (!branchA || !branchB) return false;
  
  const normA = normalizeBranch(branchA);
  const normB = normalizeBranch(branchB);

  return (
    normA.canonicalName === normB.canonicalName ||
    normA.category === normB.category
  );
}
