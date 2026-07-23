const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    console.log('--- Database Record Count Verification ---');
    const profileCount = await prisma.learningProfile.count();
    const stateCount = await prisma.knowledgeState.count();
    const snapshotCount = await prisma.knowledgeSnapshot.count();
    const scoreCount = await prisma.skillScore.count();
    const weakCount = await prisma.weakConcept.count();
    const masteryCount = await prisma.conceptMastery.count();

    console.log(`LearningProfile: ${profileCount} rows`);
    console.log(`KnowledgeState: ${stateCount} rows`);
    console.log(`KnowledgeSnapshot: ${snapshotCount} rows`);
    console.log(`SkillScore: ${scoreCount} rows`);
    console.log(`WeakConcept: ${weakCount} rows`);
    console.log(`ConceptMastery: ${masteryCount} rows`);
  } catch (error) {
    console.error('Error during validation:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
