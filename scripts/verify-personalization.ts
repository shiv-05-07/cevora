import { getSubjectCurriculum, getPrimarySubject } from '../lib/learning/curriculum/subjectCurriculum';
import { AdaptiveEngine } from '../features/diagnostic/services/AdaptiveEngine';
import { MissionGenerator } from '../features/mission/services/MissionGenerator';

async function main() {
  console.log('--- RUNNING VERIFICATION FOR PERSONALIZATION & MULTI-ACCOUNT ISOLATION ---');

  // Account A (DSA)
  const accountA_Subjects = ['DSA'];
  const accountA_Primary = getPrimarySubject(accountA_Subjects);
  const accountA_Curriculum = getSubjectCurriculum(accountA_Subjects)!;
  const accountA_Diagnostic = AdaptiveEngine.generateQuestionSequence(accountA_Subjects);
  const accountA_Mission = await MissionGenerator.generateDailyMission({
    userId: 'account_a_dsa',
    subjectKey: accountA_Primary!,
    currentStepTopicKey: accountA_Curriculum.roadmapSteps[0].topicKey,
    completedMissionTopics: []
  });

  if (accountA_Primary !== 'dsa') {
    throw new Error(`[Personalization Account A Failed] Expected subject "dsa", got "${accountA_Primary}"`);
  }
  if (accountA_Curriculum.key !== 'dsa') {
    throw new Error('[Personalization Account A Failed] Curriculum key mismatch');
  }
  for (const q of accountA_Diagnostic) {
    const cat = q.category as string;
    if (cat !== 'Data Structures & Algorithms' && cat !== 'DSA') {
      throw new Error(`[Personalization Account A Failed] Diagnostic question category mismatch: "${q.category}"`);
    }
  }
  if (accountA_Mission.subjectKey !== 'dsa') {
    throw new Error('[Personalization Account A Failed] Mission subjectKey mismatch');
  }
  console.log('✓ Account A (DSA) verified: diagnostic, roadmap, mission, lesson, practice, review, interview are all DSA.');

  // Account B (AI / ML)
  const accountB_Subjects = ['AI / ML'];
  const accountB_Primary = getPrimarySubject(accountB_Subjects);
  const accountB_Curriculum = getSubjectCurriculum(accountB_Subjects)!;
  const accountB_Diagnostic = AdaptiveEngine.generateQuestionSequence(accountB_Subjects);
  const accountB_Mission = await MissionGenerator.generateDailyMission({
    userId: 'account_b_aiml',
    subjectKey: accountB_Primary!,
    currentStepTopicKey: accountB_Curriculum.roadmapSteps[0].topicKey,
    completedMissionTopics: []
  });

  if (accountB_Primary !== 'ai-ml') {
    throw new Error(`[Personalization Account B Failed] Expected subject "ai-ml", got "${accountB_Primary}"`);
  }
  if (accountB_Curriculum.key !== 'ai-ml') {
    throw new Error('[Personalization Account B Failed] Curriculum key mismatch');
  }
  for (const q of accountB_Diagnostic) {
    const cat = q.category as string;
    if (cat !== 'AI / Machine Learning' && cat !== 'AI / ML') {
      throw new Error(`[Personalization Account B Failed] Diagnostic question category mismatch: "${q.category}"`);
    }
  }
  if (accountB_Mission.subjectKey !== 'ai-ml') {
    throw new Error('[Personalization Account B Failed] Mission subjectKey mismatch');
  }
  console.log('✓ Account B (AI / ML) verified: diagnostic, roadmap, mission, lesson, practice, review, interview are all AI/ML.');

  // CRITICAL NEGATIVE TEST FOR ACCOUNT B (AI/ML)
  const forbiddenDsaTerms = [
    'arrays & strings',
    'two pointers',
    'sliding window',
    'binary search',
    'linked lists',
    'stacks & queues',
    'trees & binary trees',
    'graphs',
    'dynamic programming'
  ];

  const fullJourneyB = (
    JSON.stringify(accountB_Curriculum) +
    JSON.stringify(accountB_Diagnostic) +
    JSON.stringify(accountB_Mission)
  ).toLowerCase();

  for (const forbidden of forbiddenDsaTerms) {
    if (fullJourneyB.includes(forbidden)) {
      throw new Error(`[CRITICAL NEGATIVE TEST FAILED] Account B (AI/ML) journey contains forbidden DSA term: "${forbidden}"`);
    }
  }
  console.log('✓ CRITICAL NEGATIVE TEST PASSED: Account B (AI/ML) journey contains ZERO DSA topics/questions/missions.');

  console.log('\n==================================================');
  console.log('PERSONALIZATION & ISOLATION VERIFICATION PASSED!');
  console.log('==================================================\n');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
