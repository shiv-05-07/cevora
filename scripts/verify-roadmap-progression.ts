import { SUBJECT_CURRICULA, getSubjectCurriculum, SubjectKey } from '../lib/learning/curriculum/subjectCurriculum';
import { deriveRoadmapFocus } from '../lib/dashboard/dashboardAdapter';
import { topicMatches } from '../lib/mission/roadmapTemplates';

function verifyAllRoadmapsProgression() {
  console.log('--- VERIFYING ROADMAP PROGRESSION FOR ALL 10 SUBJECTS ---\n');

  const subjects = Object.keys(SUBJECT_CURRICULA) as SubjectKey[];

  for (const subjectKey of subjects) {
    const curriculum = getSubjectCurriculum([subjectKey]);
    if (!curriculum) {
      throw new Error(`Curriculum not found for subject: ${subjectKey}`);
    }

    console.log(`\nTesting subject: [${curriculum.label}] (${subjectKey})`);
    const profile = { preferredSubjects: [subjectKey] };

    // 1. Check initial state (no missions completed yet)
    const initialFocus = deriveRoadmapFocus(profile, curriculum.missions[0].title, false);
    if (!initialFocus.steps[0].isFocus || initialFocus.steps[0].status !== 'current') {
      throw new Error(`[${subjectKey}] Initial step 01 should be current focus`);
    }
    console.log(`  ✓ Initial Step 01 "${initialFocus.steps[0].title}" is CURRENT FOCUS.`);

    // 2. Simulate completing mission 1 and moving to mission 2
    const mission1 = curriculum.missions[0];
    const mission2 = curriculum.missions[1] || curriculum.missions[0];

    // Case A: Mission 1 completed state
    const afterMission1Completed = deriveRoadmapFocus(profile, mission1.title, true);
    if (afterMission1Completed.steps[0].status !== 'completed') {
      throw new Error(`[${subjectKey}] Step 01 should be completed after finishing mission 1`);
    }
    if (curriculum.roadmapSteps.length > 1 && (!afterMission1Completed.steps[1].isFocus || afterMission1Completed.steps[1].status !== 'current')) {
      throw new Error(`[${subjectKey}] Step 02 should become current focus after finishing mission 1`);
    }
    console.log(`  ✓ After Mission 1 completed: Step 01 is COMPLETED, Step 02 "${afterMission1Completed.steps[1]?.title}" is CURRENT FOCUS.`);

    // Case B: Mission 2 in-progress state
    const afterMission2Started = deriveRoadmapFocus(profile, mission2.title, false);
    if (afterMission2Started.steps[0].status !== 'completed') {
      throw new Error(`[${subjectKey}] Step 01 should remain completed while mission 2 is in progress`);
    }
    if (curriculum.roadmapSteps.length > 1 && (!afterMission2Started.steps[1].isFocus || afterMission2Started.steps[1].status !== 'current')) {
      throw new Error(`[${subjectKey}] Step 02 should be current focus while mission 2 is in progress`);
    }
    console.log(`  ✓ While Mission 2 in-progress: Step 01 remains COMPLETED, Step 02 is CURRENT FOCUS.`);

    // Case C: Mission 2 completed state
    const afterMission2Completed = deriveRoadmapFocus(profile, mission2.title, true);
    if (afterMission2Completed.steps[0].status !== 'completed' || afterMission2Completed.steps[1].status !== 'completed') {
      throw new Error(`[${subjectKey}] Steps 01 and 02 should be completed after finishing mission 2`);
    }
    if (curriculum.roadmapSteps.length > 2 && (!afterMission2Completed.steps[2].isFocus || afterMission2Completed.steps[2].status !== 'current')) {
      throw new Error(`[${subjectKey}] Step 03 should become current focus after finishing mission 2`);
    }
    console.log(`  ✓ After Mission 2 completed: Steps 01 & 02 are COMPLETED, Step 03 "${afterMission2Completed.steps[2]?.title}" is CURRENT FOCUS.`);
  }

  console.log('\n==================================================');
  console.log('ALL 10 SUBJECT ROADMAP PROGRESSION TESTS PASSED SUCCESSFULLY!');
  console.log('==================================================\n');
}

verifyAllRoadmapsProgression();
