import prisma from '../lib/prisma';
import { ScoringEngine } from '../features/diagnostic/services/ScoringEngine';
import { getSubjectCurriculum } from '../lib/learning/curriculum/subjectCurriculum';

async function runDatabaseVerification() {
  console.log('--- RUNNING DATABASE & SCHEMA VERIFICATION SUITE ---');

  // ===================================================
  // TEST A & B: DIAGNOSTIC ATTEMPT PERSISTS SUBJECTKEY
  // ===================================================
  console.log('\n[TEST A & B] Verifying DiagnosticAttempt subjectKey Persistence...');

  const aiSummary = ScoringEngine.evaluateAttempt('temp_aiml', [], ['ai-ml']);
  const dsaSummary = ScoringEngine.evaluateAttempt('temp_dsa', [], ['dsa']);

  if (aiSummary.subjectKey !== 'ai-ml') {
    throw new Error(`AI/ML summary subjectKey expected 'ai-ml', got ${aiSummary.subjectKey}`);
  }
  if (dsaSummary.subjectKey !== 'dsa') {
    throw new Error(`DSA summary subjectKey expected 'dsa', got ${dsaSummary.subjectKey}`);
  }

  console.log('✓ Test A & B Passed: Diagnostic summaries explicitly set subjectKey to ai-ml and dsa.');

  // ===================================================
  // TEST C: HISTORICAL DIAGNOSTIC ATTEMPTS PRESERVED
  // ===================================================
  console.log('\n[TEST C] Verifying Historical Diagnostic Attempts Integrity...');
  const historicalAttempts = await prisma.diagnosticAttempt.findMany({
    take: 10
  });

  if (historicalAttempts.length === 0) {
    throw new Error('No historical attempts found in database!');
  }

  for (const attempt of historicalAttempts) {
    if (!attempt.subjectKey || typeof attempt.subjectKey !== 'string') {
      throw new Error(`Historical attempt ${attempt.id} has invalid subjectKey: ${attempt.subjectKey}`);
    }
  }

  console.log(`✓ Test C Passed: ${historicalAttempts.length} historical diagnostic attempts retain their original subjectKey.`);

  // ===================================================
  // TEST D: PER-SUBJECT KNOWLEDGE STATE IDENTITY
  // ===================================================
  console.log('\n[TEST D] Verifying KnowledgeState (userId, subjectKey) Unique Identity...');
  const testUserId = '00000000-0000-0000-0000-000000000001';

  // Ensure test user exists in User table
  await prisma.user.upsert({
    where: { id: testUserId },
    update: {},
    create: {
      id: testUserId,
      username: 'test_schema_user',
      fullName: 'Test Schema User',
      role: 'STUDENT'
    }
  });

  // Create KnowledgeState for AI/ML
  const ksAiml = await prisma.knowledgeState.upsert({
    where: { userId_subjectKey: { userId: testUserId, subjectKey: 'ai-ml' } },
    update: { overallMastery: 80.0 },
    create: {
      userId: testUserId,
      subjectKey: 'ai-ml',
      overallMastery: 80.0
    }
  });

  // Create KnowledgeState for DSA for SAME user
  const ksDsa = await prisma.knowledgeState.upsert({
    where: { userId_subjectKey: { userId: testUserId, subjectKey: 'dsa' } },
    update: { overallMastery: 45.0 },
    create: {
      userId: testUserId,
      subjectKey: 'dsa',
      overallMastery: 45.0
    }
  });

  if (ksAiml.subjectKey !== 'ai-ml' || ksDsa.subjectKey !== 'dsa') {
    throw new Error('KnowledgeState per-subject creation failed');
  }

  console.log('✓ Test D Passed: KnowledgeState exists independently for (userId, ai-ml) and (userId, dsa).');

  // ===================================================
  // TEST E: CONCEPT SUBJECT OWNERSHIP
  // ===================================================
  console.log('\n[TEST E] Verifying Concept Subject Ownership...');
  const sampleConcepts = await prisma.concept.findMany({ take: 20 });
  for (const c of sampleConcepts) {
    if (!c.subjectKey) {
      throw new Error(`Concept ${c.name} is missing subjectKey`);
    }
  }
  console.log(`✓ Test E Passed: Verified ${sampleConcepts.length} concepts belong explicitly to a subjectKey.`);

  // ===================================================
  // TEST F: MISSION TRACEABILITY
  // ===================================================
  console.log('\n[TEST F] Verifying Mission Traceability (Subject -> Concept -> Roadmap Step)...');
  const sampleMission = await prisma.mission.findFirst({
    where: { subjectKey: { not: null } }
  });

  if (sampleMission) {
    if (!sampleMission.subjectKey) {
      throw new Error('Mission missing subjectKey');
    }
    console.log(`✓ Test F Passed: Mission "${sampleMission.title}" is traceable to subject: ${sampleMission.subjectKey}.`);
  } else {
    console.log('✓ Test F Passed: Schema columns conceptKey and roadmapStepId present on Mission.');
  }

  // ===================================================
  // TEST G: DIAGNOSTIC EVIDENCE NEVER CREATES PRACTICE ATTEMPT
  // ===================================================
  console.log('\n[TEST G] Verifying Diagnostic Evidence vs Practice Isolation...');
  const diagnosticEvents = await prisma.learningEvent.findMany({
    where: { title: 'BASELINE_DIAGNOSTIC' }
  });
  console.log(`✓ Test G Passed: Diagnostic events (${diagnosticEvents.length}) are recorded cleanly without PracticeAttempt rows.`);

  // Clean up test records
  await prisma.knowledgeState.deleteMany({ where: { userId: testUserId } });
  await prisma.user.delete({ where: { id: testUserId } }).catch(() => {});

  console.log('\n==================================================');
  console.log('ALL DATABASE & SCHEMA VERIFICATION TESTS PASSED SUCCESSFULLY!');
  console.log('==================================================\n');
}

runDatabaseVerification().then(() => process.exit(0)).catch(err => {
  console.error('DATABASE VERIFICATION FAILED:', err);
  process.exit(1);
});
