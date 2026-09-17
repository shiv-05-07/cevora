import {
  deriveTodaysMission,
  deriveRoadmapFocus,
  deriveLearningInsight
} from '../lib/dashboard/dashboardAdapter';

async function main() {
  console.log('--- RUNNING VERIFICATION FOR DASHBOARD ADAPTER LOGIC ---');

  // Test 1: AI/ML user
  const aiMlUser = {
    userId: 'test_user_aiml',
    preferredSubjects: ['AI / ML'],
    learningLevel: 'BEGINNER',
    name: 'AI Test User',
    email: 'ai@test.com'
  };

  const aiMission = deriveTodaysMission(aiMlUser as any);
  const aiRoadmap = deriveRoadmapFocus(aiMlUser as any);
  const aiInsight = deriveLearningInsight(aiMlUser as any);
  if (aiMission.subjectKey !== 'ai-ml') {
    throw new Error(`[Dashboard Test 1 Failed] Expected subjectKey "ai-ml", got "${aiMission.subjectKey}"`);
  }

  if (!aiInsight.observation.toLowerCase().includes('python') && !aiInsight.observation.toLowerCase().includes('machine')) {
    throw new Error(`[Dashboard Test 1 Failed] AI/ML learning insight unexpected: "${aiInsight.observation}"`);
  }

  if (!aiRoadmap.trackTitle.includes('AI') && !aiRoadmap.trackTitle.includes('Artificial Intelligence')) {
    throw new Error(`[Dashboard Test 1 Failed] AI/ML roadmap trackTitle unexpected: "${aiRoadmap.trackTitle}"`);
  }

  console.log('✓ Dashboard Test 1 Passed: AI/ML dashboard data is correctly personalized.');

  // Test 2: Empty subjects user
  const emptyUser = {
    userId: 'test_user_empty',
    preferredSubjects: [],
    learningLevel: 'BEGINNER',
    name: 'Empty User',
    email: 'empty@test.com'
  };

  const emptyInsight = deriveLearningInsight(emptyUser as any);
  const emptyMission = deriveTodaysMission(emptyUser as any);

  if (emptyMission.subjectKey !== undefined) {
    throw new Error('[Dashboard Test 2 Failed] Empty user should not have an active subjectKey');
  }

  if (!emptyInsight.observation.includes('Choose a learning subject')) {
    throw new Error(`[Dashboard Test 2 Failed] Expected setup message for empty subject, got "${emptyInsight.observation}"`);
  }

  console.log('✓ Dashboard Test 2 Passed: Empty subjects dashboard displays setup state without DSA fallback.');

  // Test 3: DSA user
  const dsaUser = {
    userId: 'test_user_dsa',
    preferredSubjects: ['DSA'],
    learningLevel: 'INTERMEDIATE',
    name: 'DSA User',
    email: 'dsa@test.com'
  };

  const dsaMission = deriveTodaysMission(dsaUser as any);

  if (dsaMission.subjectKey !== 'dsa') {
    throw new Error(`[Dashboard Test 3 Failed] Expected subjectKey "dsa", got "${dsaMission.subjectKey}"`);
  }

  console.log('✓ Dashboard Test 3 Passed: DSA dashboard data is correctly personalized.');

  console.log('\n==================================================');
  console.log('DASHBOARD LOGIC VERIFICATION PASSED SUCCESSFULLY!');
  console.log('==================================================\n');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
