-- 1. Alter Table "DiagnosticAttempt"
ALTER TABLE "DiagnosticAttempt" ADD COLUMN IF NOT EXISTS "subjectKey" TEXT NOT NULL DEFAULT 'dsa';
ALTER TABLE "DiagnosticAttempt" ADD COLUMN IF NOT EXISTS "recommendedStartConcept" TEXT;
ALTER TABLE "DiagnosticAttempt" ADD COLUMN IF NOT EXISTS "diagnosticVersion" TEXT DEFAULT '1.0';
ALTER TABLE "DiagnosticAttempt" ADD COLUMN IF NOT EXISTS "analysis" JSONB;

-- Backfill DiagnosticAttempt.subjectKey using LearningProfile preferredSubjects where available
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
WHERE "subjectKey" = 'dsa';

-- 2. Alter Table "DiagnosticResponse"
ALTER TABLE "DiagnosticResponse" ADD COLUMN IF NOT EXISTS "conceptKey" TEXT;

-- 3. Alter Table "Concept"
ALTER TABLE "Concept" ADD COLUMN IF NOT EXISTS "subjectKey" TEXT NOT NULL DEFAULT 'dsa';

-- Backfill Concept.subjectKey based on category
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
END;

-- 4. Create/Alter Table "KnowledgeState"
CREATE TABLE IF NOT EXISTS "KnowledgeState" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "subjectKey" TEXT NOT NULL DEFAULT 'dsa',
    "overallMastery" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "placementReadiness" "PlacementReadiness" NOT NULL DEFAULT 'NEEDS_FOUNDATION',
    "readinessScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "confidenceScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "learningVelocity" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "consistencyScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "lastCalculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KnowledgeState_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "KnowledgeState" DROP CONSTRAINT IF EXISTS "KnowledgeState_userId_key";
ALTER TABLE "KnowledgeState" ADD COLUMN IF NOT EXISTS "subjectKey" TEXT NOT NULL DEFAULT 'dsa';

-- Backfill KnowledgeState.subjectKey using LearningProfile preferredSubjects
UPDATE "KnowledgeState"
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
    WHERE lp."userId" = "KnowledgeState"."userId"
    LIMIT 1
  ),
  'dsa'
);

-- Clean up any duplicates before adding unique constraint
DELETE FROM "KnowledgeState" ks1
USING "KnowledgeState" ks2
WHERE ks1.id < ks2.id
  AND ks1."userId" = ks2."userId"
  AND ks1."subjectKey" = ks2."subjectKey";

-- Create unique constraint and index on KnowledgeState (userId, subjectKey)
CREATE UNIQUE INDEX IF NOT EXISTS "KnowledgeState_userId_subjectKey_key" ON "KnowledgeState"("userId", "subjectKey");

-- 5. Alter Table "Mission"
ALTER TABLE "Mission" ADD COLUMN IF NOT EXISTS "conceptKey" TEXT;
ALTER TABLE "Mission" ADD COLUMN IF NOT EXISTS "roadmapStepId" TEXT;

-- 6. Indexes
CREATE INDEX IF NOT EXISTS "DiagnosticAttempt_userId_subjectKey_idx" ON "DiagnosticAttempt"("userId", "subjectKey");
CREATE INDEX IF NOT EXISTS "Concept_subjectKey_idx" ON "Concept"("subjectKey");
CREATE INDEX IF NOT EXISTS "Concept_subjectKey_slug_idx" ON "Concept"("subjectKey", "slug");
CREATE INDEX IF NOT EXISTS "KnowledgeState_userId_subjectKey_idx" ON "KnowledgeState"("userId", "subjectKey");
CREATE INDEX IF NOT EXISTS "Mission_userId_subjectKey_idx" ON "Mission"("userId", "subjectKey");
CREATE INDEX IF NOT EXISTS "Mission_subjectKey_topicKey_idx" ON "Mission"("subjectKey", "topicKey");
CREATE INDEX IF NOT EXISTS "Mission_subjectKey_conceptKey_idx" ON "Mission"("subjectKey", "conceptKey");
