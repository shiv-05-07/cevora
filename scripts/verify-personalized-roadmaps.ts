import {
  getRoadmapById,
  getAllRoadmaps,
  getCareerRoadmaps,
  getSubjectRoadmaps,
  getUserPersonalizedRoadmap,
  getUserPersonalizedRoadmapHref,
} from '../lib/roadmaps/roadmapResolver';
import { deriveRoadmapFocus } from '../lib/dashboard/dashboardAdapter';
import { getPrimarySubject } from '../lib/learning/curriculum/subjectCurriculum';

async function main() {
  console.log('--- Verifying Personalized Roadmaps & Routing System ---');

  // 1. Verify Career Roadmaps count (10)
  const careerRoadmaps = getCareerRoadmaps();
  console.log(`Career Roadmaps Count: ${careerRoadmaps.length}`);
  if (careerRoadmaps.length < 10) {
    throw new Error(`Expected at least 10 career roadmaps, got ${careerRoadmaps.length}`);
  }

  // 2. Verify Subject Roadmaps count (10)
  const subjectRoadmaps = getSubjectRoadmaps();
  console.log(`Subject Roadmaps Count: ${subjectRoadmaps.length}`);
  if (subjectRoadmaps.length < 10) {
    throw new Error(`Expected 10 subject roadmaps, got ${subjectRoadmaps.length}`);
  }

  // 3. Verify total combined roadmaps
  const allRoadmaps = getAllRoadmaps();
  console.log(`Total Combined Roadmaps Count: ${allRoadmaps.length}`);

  // 4. Test subject resolution for all supported subjects
  const testSubjects = [
    { input: ['DBMS'], expectedKey: 'dbms', expectedHref: '/roadmaps/dbms' },
    { input: ['Computer Networks'], expectedKey: 'computer-networks', expectedHref: '/roadmaps/computer-networks' },
    { input: ['Operating Systems'], expectedKey: 'operating-systems', expectedHref: '/roadmaps/operating-systems' },
    { input: ['Data Structures & Algorithms'], expectedKey: 'dsa', expectedHref: '/roadmaps/dsa' },
    { input: ['Computer Science'], expectedKey: 'dsa', expectedHref: '/roadmaps/dsa' },
    { input: ['AI / ML'], expectedKey: 'ai-ml', expectedHref: '/roadmaps/ai-ml' },
    { input: ['Web Development'], expectedKey: 'web-development', expectedHref: '/roadmaps/web-development' },
    { input: ['App Development'], expectedKey: 'app-development', expectedHref: '/roadmaps/app-development' },
    { input: ['Data Science'], expectedKey: 'data-science', expectedHref: '/roadmaps/data-science' },
    { input: ['DevOps'], expectedKey: 'devops', expectedHref: '/roadmaps/devops' },
    { input: ['Aptitude'], expectedKey: 'aptitude', expectedHref: '/roadmaps/aptitude' },
  ];

  console.log('\nTesting Subject Resolution & Personalized URLs:');
  for (const t of testSubjects) {
    const key = getPrimarySubject(t.input);
    const href = getUserPersonalizedRoadmapHref(t.input);
    const roadmap = getUserPersonalizedRoadmap(t.input);
    console.log(`  Input: ${JSON.stringify(t.input)} -> Key: "${key}", Href: "${href}", Title: "${roadmap?.title}"`);

    if (key !== t.expectedKey) throw new Error(`Expected key ${t.expectedKey} for ${t.input}, got ${key}`);
    if (href !== t.expectedHref) throw new Error(`Expected href ${t.expectedHref} for ${t.input}, got ${href}`);
    if (!roadmap) throw new Error(`Failed to resolve personalized roadmap for ${t.input}`);
  }

  // 5. Test Fallback for user without preferredSubjects
  console.log('\nTesting Fallback for User without Preferred Subjects:');
  const emptyKey = getPrimarySubject([]);
  const emptyHref = getUserPersonalizedRoadmapHref([]);
  const emptyRoadmap = getUserPersonalizedRoadmap([]);
  console.log(`  Empty Input -> Key: "${emptyKey}", Href: "${emptyHref}", Roadmap: ${emptyRoadmap}`);

  if (emptyKey !== null) throw new Error(`Expected null key for empty input, got ${emptyKey}`);
  if (emptyHref !== '/onboarding/subjects') throw new Error(`Expected /onboarding/subjects for empty input, got ${emptyHref}`);

  // 6. Test deriveRoadmapFocus Dashboard Adapter
  console.log('\nTesting Dashboard Adapter Integration:');
  const dbmsFocus = deriveRoadmapFocus({ preferredSubjects: ['DBMS'] }, 'Database Fundamentals');
  console.log(`  DBMS Focus Track Title: "${dbmsFocus.trackTitle}", Href: "${dbmsFocus.personalizedRoadmapHref}"`);
  if (dbmsFocus.personalizedRoadmapHref !== '/roadmaps/dbms') {
    throw new Error(`Expected /roadmaps/dbms for DBMS focus, got ${dbmsFocus.personalizedRoadmapHref}`);
  }

  // 7. Verify lookup for career and subject roadmap IDs
  console.log('\nTesting getRoadmapById:');
  const amazonRoadmap = getRoadmapById('amazon-sde-1');
  const dbmsRoadmap = getRoadmapById('dbms');
  console.log(`  Found amazon-sde-1: ${!!amazonRoadmap} (${amazonRoadmap?.title})`);
  console.log(`  Found dbms: ${!!dbmsRoadmap} (${dbmsRoadmap?.title})`);

  if (!amazonRoadmap) throw new Error('Failed to resolve amazon-sde-1 roadmap!');
  if (!dbmsRoadmap) throw new Error('Failed to resolve dbms roadmap!');

  console.log('\n✅ ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
