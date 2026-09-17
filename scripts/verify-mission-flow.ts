import { MissionGenerator } from '../features/mission/services/MissionGenerator';
import { getSubjectCurriculum } from '../lib/learning/curriculum/subjectCurriculum';

async function main() {
  console.log('--- RUNNING VERIFICATION FOR MISSION FLOW & GENERATION ---');

  // Test 1: AI/ML Mission Generation
  const aiCurriculum = getSubjectCurriculum(['AI / ML'])!;
  const firstStep = aiCurriculum.roadmapSteps[0];

  const generatedMission = await MissionGenerator.generateDailyMission({
    userId: 'test_mission_user_1',
    subjectKey: 'ai-ml',
    currentStepTopicKey: firstStep.topicKey,
    completedMissionTopics: []
  });

  if (generatedMission.subjectKey !== 'ai-ml') {
    throw new Error(`[Mission Flow Test 1 Failed] Mission subjectKey "${generatedMission.subjectKey}" is not "ai-ml"`);
  }

  if (generatedMission.topicKey !== firstStep.topicKey) {
    throw new Error(`[Mission Flow Test 1 Failed] Mission topicKey "${generatedMission.topicKey}" does not match step topicKey "${firstStep.topicKey}"`);
  }

  const content = generatedMission.content as any;
  if (!content.lesson || !content.practice || !content.review || !content.interview) {
    throw new Error('[Mission Flow Test 1 Failed] Mission content is missing 4-stage structure');
  }

  console.log('✓ Mission Flow Test 1 Passed: AI/ML mission generation succeeds with valid subject & 4-stage content.');

  // Test 2: Sequential Mission Progression
  const secondStep = aiCurriculum.roadmapSteps[1];
  const nextMission = await MissionGenerator.generateDailyMission({
    userId: 'test_mission_user_1',
    subjectKey: 'ai-ml',
    currentStepTopicKey: secondStep.topicKey,
    completedMissionTopics: [firstStep.topicKey]
  });

  if (nextMission.topicKey !== secondStep.topicKey) {
    throw new Error(`[Mission Flow Test 2 Failed] Expected next mission to be step 2 topic "${secondStep.topicKey}", got "${nextMission.topicKey}"`);
  }

  console.log('✓ Mission Flow Test 2 Passed: Mission progression correctly moves to next step topic.');

  // Test 3: Negative check - AI/ML mission must NOT contain DSA topics
  const titleAndContentString = JSON.stringify(generatedMission).toLowerCase();
  const dsaForbidden = ['arrays & strings', 'two pointers', 'linked lists', 'binary search', 'trees & binary trees'];
  for (const forbidden of dsaForbidden) {
    if (titleAndContentString.includes(forbidden)) {
      throw new Error(`[Mission Flow Test 3 Failed] Generated AI/ML mission contains forbidden DSA term "${forbidden}"`);
    }
  }

  console.log('✓ Mission Flow Test 3 Passed: AI/ML mission does not contain any forbidden DSA topics.');

  console.log('\n==================================================');
  console.log('MISSION FLOW VERIFICATION PASSED SUCCESSFULLY!');
  console.log('==================================================\n');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
