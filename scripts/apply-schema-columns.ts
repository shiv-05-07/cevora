import prisma from '../lib/prisma';

async function backfillConceptSubjectKeys() {
  console.log('--- BACKFILLING CONCEPT SUBJECT KEYS ---');

  const count = await prisma.$executeRaw`
    UPDATE "Concept"
    SET "subjectKey" = CASE
      WHEN lower(category) = 'os' OR lower(category) LIKE '%operating%' THEN 'operating-systems'
      WHEN lower(category) = 'dbms' OR lower(category) LIKE '%database%' OR lower(category) = 'sql' THEN 'dbms'
      WHEN lower(category) = 'cn' OR lower(category) LIKE '%network%' THEN 'computer-networks'
      WHEN lower(category) = 'aptitude' THEN 'aptitude'
      WHEN lower(category) = 'ai / ml' OR lower(category) = 'ai-ml' THEN 'ai-ml'
      WHEN lower(category) = 'web development' OR lower(category) = 'web-development' THEN 'web-development'
      WHEN lower(category) = 'app development' OR lower(category) = 'app-development' THEN 'app-development'
      WHEN lower(category) = 'data science' OR lower(category) = 'data-science' THEN 'data-science'
      WHEN lower(category) = 'devops' THEN 'devops'
      ELSE 'dsa'
    END
    WHERE "subjectKey" IS NULL
  `;

  console.log(`✓ Backfilled ${count} Concept rows with valid subjectKey.`);
}

backfillConceptSubjectKeys().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
