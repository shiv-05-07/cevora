import {
  getPrimarySubject,
  getSubjectCurriculum,
  SUBJECT_CURRICULA,
  SubjectKey
} from '../lib/learning/curriculum/subjectCurriculum';

async function main() {
  console.log('--- RUNNING VERIFICATION FOR SUBJECT CURRICULUM ---');

  // A. All 10 subjects resolve correctly
  const subjectsToTest: Array<{ input: string[]; expected: SubjectKey }> = [
    { input: ['DSA'], expected: 'dsa' },
    { input: ['Web Development'], expected: 'web-development' },
    { input: ['App Development'], expected: 'app-development' },
    { input: ['AI / ML'], expected: 'ai-ml' },
    { input: ['Data Science'], expected: 'data-science' },
    { input: ['DevOps'], expected: 'devops' },
    { input: ['DBMS'], expected: 'dbms' },
    { input: ['Operating Systems'], expected: 'operating-systems' },
    { input: ['Computer Networks'], expected: 'computer-networks' },
    { input: ['Aptitude'], expected: 'aptitude' },
  ];

  for (const { input, expected } of subjectsToTest) {
    const resolved = getPrimarySubject(input);
    if (resolved !== expected) {
      throw new Error(`[Test A Failed] Expected "${input}" to resolve to "${expected}", got "${resolved}"`);
    }
  }
  console.log('✓ Test A Passed: All 10 subjects resolve correctly.');

  // B. AI/ML curriculum is actually AI/ML
  const aiCurriculum = getSubjectCurriculum(['AI / ML']);
  if (!aiCurriculum || aiCurriculum.key !== 'ai-ml' || !aiCurriculum.label.includes('AI')) {
    throw new Error('[Test B Failed] AI/ML curriculum resolution failed');
  }
  console.log('✓ Test B Passed: AI/ML curriculum is valid.');

  // C. DSA curriculum is actually DSA
  const dsaCurriculum = getSubjectCurriculum(['DSA']);
  if (!dsaCurriculum || dsaCurriculum.key !== 'dsa' || !dsaCurriculum.label.includes('Data Structures')) {
    throw new Error('[Test C Failed] DSA curriculum resolution failed');
  }
  console.log('✓ Test C Passed: DSA curriculum is valid.');

  // D. DBMS curriculum is actually DBMS
  const dbmsCurriculum = getSubjectCurriculum(['DBMS']);
  if (!dbmsCurriculum || dbmsCurriculum.key !== 'dbms') {
    throw new Error('[Test D Failed] DBMS curriculum resolution failed');
  }
  console.log('✓ Test D Passed: DBMS curriculum is valid.');

  // E. Web Development curriculum is actually Web Development
  const webCurriculum = getSubjectCurriculum(['Web Development']);
  if (!webCurriculum || webCurriculum.key !== 'web-development') {
    throw new Error('[Test E Failed] Web Development curriculum resolution failed');
  }
  console.log('✓ Test E Passed: Web Development curriculum is valid.');

  // F. No AI/ML curriculum contains DSA-only topics
  const dsaOnlyTopics = [
    'arrays & strings', 'two pointers', 'sliding window', 'linked lists',
    'stacks & queues', 'binary search', 'trees & binary trees', 'graphs', 'dynamic programming'
  ];
  for (const step of aiCurriculum.roadmapSteps) {
    const titleLower = step.title.toLowerCase();
    for (const dsaTopic of dsaOnlyTopics) {
      if (titleLower.includes(dsaTopic)) {
        throw new Error(`[Test F Failed] AI/ML contains DSA topic: "${step.title}"`);
      }
    }
  }
  console.log('✓ Test F Passed: No AI/ML curriculum contains DSA-only topics.');

  // G. No DSA curriculum contains AI/ML-only topics
  const aiOnlyTopics = ['numpy', 'pandas', 'supervised learning', 'unsupervised learning', 'model evaluation'];
  for (const step of dsaCurriculum.roadmapSteps) {
    const titleLower = step.title.toLowerCase();
    for (const aiTopic of aiOnlyTopics) {
      if (titleLower.includes(aiTopic)) {
        throw new Error(`[Test G Failed] DSA contains AI/ML topic: "${step.title}"`);
      }
    }
  }
  console.log('✓ Test G Passed: No DSA curriculum contains AI/ML-only topics.');

  // H. Each subject has at least 8 diagnostic questions
  // I. Each diagnostic question has subjectKey and conceptKey
  for (const [key, curr] of Object.entries(SUBJECT_CURRICULA)) {
    if (curr.diagnosticQuestions.length < 8) {
      throw new Error(`[Test H Failed] Subject "${key}" has fewer than 8 diagnostic questions (${curr.diagnosticQuestions.length})`);
    }
    for (const q of curr.diagnosticQuestions) {
      if (!q.subjectKey || !q.conceptKey || !q.id || !q.question || !q.correctAnswer) {
        throw new Error(`[Test I Failed] Diagnostic question in "${key}" missing required fields`);
      }
    }
  }
  console.log('✓ Test H & I Passed: Every subject has at least 8 valid diagnostic questions with subjectKey & conceptKey.');

  // J. Day 1 -> Day 2 -> Day 3 progression works
  if (aiCurriculum.roadmapSteps.length < 3) {
    throw new Error('[Test J Failed] Insufficient steps in AI/ML roadmap');
  }
  if (aiCurriculum.roadmapSteps[0].order !== 1 || aiCurriculum.roadmapSteps[1].order !== 2 || aiCurriculum.roadmapSteps[2].order !== 3) {
    throw new Error('[Test J Failed] Roadmap step ordering invalid');
  }
  console.log('✓ Test J Passed: Roadmap step ordering is 1 -> 2 -> 3 sequential.');

  // K. Today's Mission topic === Roadmap current focus (step 1 for fresh user)
  const firstStep = aiCurriculum.roadmapSteps[0];
  const firstMission = aiCurriculum.missions.find(m => m.topicKey === firstStep.topicKey);
  if (!firstMission || firstMission.topicKey !== firstStep.topicKey) {
    throw new Error('[Test K Failed] First step topic does not map to corresponding mission');
  }
  console.log('✓ Test K Passed: Today\'s mission topic matches current roadmap step focus.');

  // L. Empty subjects return setup state
  const emptyCurriculum = getSubjectCurriculum([]);
  const nullSubject = getPrimarySubject([]);
  if (emptyCurriculum !== null || nullSubject !== null) {
    throw new Error('[Test L Failed] Empty subjects should return null/setup state instead of fallback');
  }
  console.log('✓ Test L Passed: Empty subjects return null setup state (NO DSA FALLBACK).');

  // M. ["AI / ML", "DSA"] resolves primary subject as AI/ML
  if (getPrimarySubject(['AI / ML', 'DSA']) !== 'ai-ml') {
    throw new Error('[Test M Failed] Multi-subject ordering AI/ML first failed');
  }
  console.log('✓ Test M Passed: ["AI / ML", "DSA"] resolves to ai-ml.');

  // N. ["DSA", "AI / ML"] resolves primary subject as DSA
  if (getPrimarySubject(['DSA', 'AI / ML']) !== 'dsa') {
    throw new Error('[Test N Failed] Multi-subject ordering DSA first failed');
  }
  console.log('✓ Test N Passed: ["DSA", "AI / ML"] resolves to dsa.');

  // O. Mission contains Learn/Practice/Review/Interview
  for (const mission of aiCurriculum.missions) {
    if (!mission.lesson || !mission.practice || !mission.review || !mission.interview) {
      throw new Error(`[Test O Failed] Mission "${mission.title}" missing one or more of Learn/Practice/Review/Interview`);
    }
  }
  console.log('✓ Test O Passed: Mission contains Learn, Practice, Review, and Interview sections.');

  // P. Mission subjectKey matches user's primary subject
  for (const mission of aiCurriculum.missions) {
    if (mission.subjectKey !== 'ai-ml') {
      throw new Error(`[Test P Failed] Mission subjectKey "${mission.subjectKey}" does not match primary subject "ai-ml"`);
    }
  }
  console.log('✓ Test P Passed: Mission subjectKey matches user\'s primary subject.');

  // Q. Roadmap subject matches user's primary subject
  if (aiCurriculum.key !== 'ai-ml') {
    throw new Error('[Test Q Failed] Roadmap subject mismatch');
  }
  console.log('✓ Test Q Passed: Roadmap subject matches primary subject.');

  // R. Diagnostic subject matches user's primary subject
  for (const q of aiCurriculum.diagnosticQuestions) {
    if (q.subjectKey !== 'ai-ml') {
      throw new Error(`[Test R Failed] Diagnostic question subjectKey "${q.subjectKey}" does not match primary subject "ai-ml"`);
    }
  }
  console.log('✓ Test R Passed: Diagnostic question subject matches primary subject.');

  console.log('\n==================================================');
  console.log('ALL 18 VERIFICATION CHECKS (A-R) PASSED SUCCESSFULLY!');
  console.log('==================================================\n');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
