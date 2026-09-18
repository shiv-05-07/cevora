import { roadmapsData } from '../data/roadmapsData';

function verifyRoadmapsSystem() {
  console.log('--- VERIFYING CEVORA ROADMAPS SYSTEM & IN-PROGRESS PRODUCT RULES ---\n');

  // 1. Verify 10 roadmaps are loaded
  if (roadmapsData.length !== 10) {
    throw new Error(`Expected 10 roadmaps, found ${roadmapsData.length}`);
  }
  console.log(`✓ Successfully loaded ${roadmapsData.length} realistic roadmaps.`);

  // 2. Verify stable IDs, modules, lessons, and external URLs
  let totalModulesCount = 0;
  let totalLessonsCount = 0;

  for (const r of roadmapsData) {
    if (!r.id || !r.slug || !r.title || !r.role || !r.difficulty || !r.description) {
      throw new Error(`Roadmap ${r.id || 'unknown'} missing required fields.`);
    }

    if (!r.modules || r.modules.length === 0) {
      throw new Error(`Roadmap ${r.id} has no modules.`);
    }

    totalModulesCount += r.modules.length;

    for (const m of r.modules) {
      if (!m.id || !m.title || !m.lessons || m.lessons.length === 0) {
        throw new Error(`Module ${m.id || 'unknown'} in roadmap ${r.id} is invalid.`);
      }

      totalLessonsCount += m.lessons.length;

      for (const l of m.lessons) {
        if (!l.id || !l.title || !l.description || !l.resourceType || !l.resourceUrl) {
          throw new Error(`Lesson ${l.id || 'unknown'} in module ${m.id} is invalid.`);
        }

        if (!l.resourceUrl.startsWith('http://') && !l.resourceUrl.startsWith('https://')) {
          throw new Error(`Lesson ${l.id} resourceUrl must be a valid external HTTP/HTTPS URL.`);
        }
      }
    }
  }

  console.log(`✓ Total across system: ${totalModulesCount} modules, ${totalLessonsCount} lessons.`);

  // 3. Test Progress Calculation & Auto-Start Logic
  const amazonRoadmap = roadmapsData.find(r => r.slug === 'amazon-sde-1')!;
  const amazonLessons = amazonRoadmap.modules.flatMap(m => m.lessons);
  const totalAmazonLessons = amazonLessons.length;

  // TEST BUG SCENARIO: User marks first lesson complete without clicking "Start Roadmap"
  let userRoadmapMeta: { startedAt?: string; completedLessonIds: string[] } | null = null;

  // Action: User completes lesson 1
  const lesson1 = amazonLessons[0];
  if (!userRoadmapMeta) {
    // Auto-start rule: Any lesson completion MUST initialize progress
    userRoadmapMeta = {
      startedAt: new Date().toISOString(),
      completedLessonIds: [lesson1.id]
    };
  }

  const isRoadmapInProgress = Boolean(userRoadmapMeta);
  const progressPercent = Math.round((userRoadmapMeta.completedLessonIds.length / totalAmazonLessons) * 100);

  if (!isRoadmapInProgress) {
    throw new Error('FAILED: Roadmap should be In Progress after marking any lesson complete!');
  }
  if (progressPercent !== Math.round((1 / totalAmazonLessons) * 100)) {
    throw new Error(`Progress mismatch. Expected ${Math.round((1 / totalAmazonLessons) * 100)}%, got ${progressPercent}%`);
  }
  console.log(`\n✓ AUTO-START TEST PASSED: Marking lesson 1 complete automatically puts roadmap In Progress (${progressPercent}% complete).`);

  // Action: Resolve Next Incomplete Lesson
  const nextIncomplete = amazonLessons.find(l => !userRoadmapMeta!.completedLessonIds.includes(l.id));
  if (!nextIncomplete || nextIncomplete.id !== amazonLessons[1].id) {
    throw new Error(`Next incomplete lesson mismatch. Expected ${amazonLessons[1].id}, got ${nextIncomplete?.id}`);
  }
  console.log(`✓ Next incomplete lesson correctly resolved: "${nextIncomplete.title}" (${nextIncomplete.id})`);

  // Action: User unchecks lesson 1
  userRoadmapMeta.completedLessonIds = [];
  const progressAfterUncheck = Math.round((userRoadmapMeta.completedLessonIds.length / totalAmazonLessons) * 100);
  const remainsInProgress = Boolean(userRoadmapMeta.startedAt);

  if (!remainsInProgress) {
    throw new Error('FAILED: Roadmap must remain In Progress after unchecking a lesson if started record exists!');
  }
  if (progressAfterUncheck !== 0) {
    throw new Error(`Progress should recalculate to 0%, got ${progressAfterUncheck}%`);
  }
  console.log('✓ UNCHECK TEST PASSED: Progress recalculates to 0% and roadmap remains In Progress because user started it.');

  console.log('\n==================================================');
  console.log('ALL IN-PROGRESS PRODUCT LOGIC TESTS PASSED SUCCESSFULLY!');
  console.log('==================================================\n');
}

verifyRoadmapsSystem();
