import prisma from '../lib/prisma';

async function backfillNulls() {
  console.log('--- BACKFILLING NULL SUBJECT KEYS IN HISTORICAL ATTEMPTS ---');

  // Backfill any DiagnosticAttempt where subjectKey IS NULL
  const result = await prisma.$executeRaw`
    UPDATE "DiagnosticAttempt"
    SET "subjectKey" = COALESCE(
      (
        SELECT CASE
          WHEN lower(lp."preferredSubjects"[1]) LIKE '%ai%' OR lower(lp."preferredSubjects"[1]) LIKE '%ml%' THEN 'ai-ml'
          WHEN lower(lp."preferredSubjects"[1]) LIKE '%web%' THEN 'web-development'
          WHEN lower(lp."preferredSubjects"[1]) LIKE '%app%' THEN 'app-development'
          WHEN lower(lp."preferredSubjects"[1]) LIKE '%data%' THEN 'data-science'
          WHEN lower(lp."preferredSubjects"[1]) LIKE '%devops%' THEN 'devops'
          WHEN lower(lp."preferredSubjects"[1]) LIKE '%dbms%' OR lower(lp."preferredSubjects"[1]) LIKE '%database%' THEN 'dbms'
          WHEN lower(lp."preferredSubjects"[1]) LIKE '%operating%' OR lower(lp."preferredSubjects"[1]) = 'os' THEN 'operating-systems'
          WHEN lower(lp."preferredSubjects"[1]) LIKE '%network%' OR lower(lp."preferredSubjects"[1]) = 'cn' THEN 'computer-networks'
          WHEN lower(lp."preferredSubjects"[1]) LIKE '%aptitude%' THEN 'aptitude'
          ELSE 'dsa'
        END
        FROM "LearningProfile" lp
        WHERE lp."userId" = "DiagnosticAttempt"."userId"
        LIMIT 1
      ),
      'dsa'
    )
    WHERE "subjectKey" IS NULL
  `;

  console.log(`Updated ${result} historical DiagnosticAttempt rows.`);
}

backfillNulls().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
