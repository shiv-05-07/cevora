import prisma from '../lib/prisma';

async function main() {
  const count = await prisma.$executeRaw`UPDATE "KnowledgeState" SET "subjectKey" = 'dsa' WHERE "subjectKey" IS NULL`;
  console.log(`Updated ${count} KnowledgeState rows.`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
