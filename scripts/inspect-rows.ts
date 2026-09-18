import prisma from '../lib/prisma';

async function inspectRows() {
  console.log('--- INSPECTING ROW DETAILS FOR BACKFILL & MIGRATION ---');

  const attempts = await prisma.$queryRaw<any[]>`
    SELECT da.id, da."userId", da.score, da."startedAt", da."completedAt",
           lp."preferredSubjects"
    FROM "DiagnosticAttempt" da
    LEFT JOIN "LearningProfile" lp ON da."userId" = lp."userId"
  `;
  console.log('DiagnosticAttempt rows (with LearningProfile preferredSubjects):', attempts);

  const concepts = await prisma.$queryRaw<any[]>`
    SELECT id, name, slug, category FROM "Concept" LIMIT 20
  `;
  console.log('Sample Concept rows:', concepts);

  const ksRows = await prisma.$queryRaw<any[]>`
    SELECT ks.id, ks."userId", lp."preferredSubjects"
    FROM "KnowledgeState" ks
    LEFT JOIN "LearningProfile" lp ON ks."userId" = lp."userId"
  `;
  console.log('KnowledgeState rows (with LearningProfile preferredSubjects):', ksRows);
}

inspectRows().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
