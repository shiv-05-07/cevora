-- CreateEnum
CREATE TYPE "public"."LearningLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "public"."LearningStyle" AS ENUM ('VISUAL', 'AUDITORY', 'READING_WRITING', 'KINESTHETIC');

-- CreateEnum
CREATE TYPE "public"."MissionType" AS ENUM ('LESSON', 'QUIZ', 'PROJECT', 'REVIEW');

-- CreateEnum
CREATE TYPE "public"."MissionStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "public"."MasteryLevel" AS ENUM ('NOVICE', 'FAMILIAR', 'PROFICIENT', 'MASTERED');

-- CreateEnum
CREATE TYPE "public"."LearningEventType" AS ENUM ('LESSON_STARTED', 'LESSON_COMPLETED', 'QUIZ_TAKEN', 'MISSION_COMPLETED', 'DIAGNOSTIC_COMPLETED');

-- CreateTable
CREATE TABLE "public"."LearningProfile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "learningLevel" "public"."LearningLevel",
    "learningStyle" "public"."LearningStyle",
    "preferredDifficulty" "public"."RoadmapDifficulty" NOT NULL DEFAULT 'BEGINNER',
    "adaptiveEnabled" BOOLEAN NOT NULL DEFAULT true,
    "diagnosticCompleted" BOOLEAN NOT NULL DEFAULT false,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "dailyGoalMinutes" INTEGER,
    "weeklyGoalMinutes" INTEGER,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastLearningDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DiagnosticAttempt" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "score" DOUBLE PRECISION,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "DiagnosticAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DiagnosticResponse" (
    "id" UUID NOT NULL,
    "attemptId" UUID NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedAnswer" TEXT,
    "correctAnswer" TEXT,
    "isCorrect" BOOLEAN NOT NULL,
    "timeTaken" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiagnosticResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Concept" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "difficulty" "public"."RoadmapDifficulty" NOT NULL,
    "estimatedMinutes" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Concept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ConceptMastery" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "conceptId" UUID NOT NULL,
    "masteryScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "masteryLevel" "public"."MasteryLevel" NOT NULL DEFAULT 'NOVICE',
    "confidenceScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastPracticed" TIMESTAMP(3),
    "lastReviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConceptMastery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Mission" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "public"."MissionType" NOT NULL,
    "status" "public"."MissionStatus" NOT NULL DEFAULT 'PENDING',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "estimatedMinutes" INTEGER,
    "content" JSONB,
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LearningEvent" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT,
    "source" TEXT,
    "eventType" "public"."LearningEventType" NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LearningEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningProfile_userId_key" ON "public"."LearningProfile"("userId");

-- CreateIndex
CREATE INDEX "DiagnosticAttempt_userId_idx" ON "public"."DiagnosticAttempt"("userId");

-- CreateIndex
CREATE INDEX "DiagnosticResponse_attemptId_idx" ON "public"."DiagnosticResponse"("attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "Concept_name_key" ON "public"."Concept"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Concept_slug_key" ON "public"."Concept"("slug");

-- CreateIndex
CREATE INDEX "ConceptMastery_userId_idx" ON "public"."ConceptMastery"("userId");

-- CreateIndex
CREATE INDEX "ConceptMastery_conceptId_idx" ON "public"."ConceptMastery"("conceptId");

-- CreateIndex
CREATE UNIQUE INDEX "ConceptMastery_userId_conceptId_key" ON "public"."ConceptMastery"("userId", "conceptId");

-- CreateIndex
CREATE INDEX "Mission_userId_idx" ON "public"."Mission"("userId");

-- CreateIndex
CREATE INDEX "LearningEvent_userId_idx" ON "public"."LearningEvent"("userId");

-- CreateIndex
CREATE INDEX "LearningEvent_eventType_idx" ON "public"."LearningEvent"("eventType");

-- AddForeignKey
ALTER TABLE "public"."LearningProfile" ADD CONSTRAINT "LearningProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DiagnosticAttempt" ADD CONSTRAINT "DiagnosticAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DiagnosticResponse" ADD CONSTRAINT "DiagnosticResponse_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "public"."DiagnosticAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ConceptMastery" ADD CONSTRAINT "ConceptMastery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ConceptMastery" ADD CONSTRAINT "ConceptMastery_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "public"."Concept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mission" ADD CONSTRAINT "Mission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LearningEvent" ADD CONSTRAINT "LearningEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
