-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."AccountStatus" AS ENUM ('ACTIVE', 'PENDING', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."ResumeStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "public"."RoadmapCategory" AS ENUM ('DSA', 'WEB_DEVELOPMENT', 'APP_DEVELOPMENT', 'AI_ML', 'DATA_SCIENCE', 'DEVOPS', 'CYBER_SECURITY', 'CLOUD', 'BLOCKCHAIN', 'UI_UX', 'APTITUDE');

-- CreateEnum
CREATE TYPE "public"."RoadmapDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "public"."StepType" AS ENUM ('VIDEO', 'ARTICLE', 'PROJECT', 'QUIZ', 'RESOURCE', 'PRACTICE');

-- CreateEnum
CREATE TYPE "public"."OpportunityType" AS ENUM ('INTERNSHIP', 'FULL_TIME');

-- CreateEnum
CREATE TYPE "public"."OpportunityStatus" AS ENUM ('OPEN', 'CLOSED', 'UPCOMING');

-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "public"."AIChatType" AS ENUM ('STUDY', 'CAREER', 'RESUME', 'INTERVIEW');

-- CreateEnum
CREATE TYPE "public"."MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "public"."InterviewMode" AS ENUM ('HR', 'TECHNICAL', 'BEHAVIORAL', 'MIXED');

-- CreateEnum
CREATE TYPE "public"."InterviewStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('LOGIN', 'ROADMAP', 'AI_CHAT', 'RESUME', 'INTERVIEW', 'COMPANY');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "role" "public"."UserRole" NOT NULL DEFAULT 'STUDENT',
    "status" "public"."AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StudentProfile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "college" TEXT,
    "degree" TEXT,
    "specialization" TEXT,
    "semester" INTEGER,
    "graduationYear" INTEGER,
    "cgpa" DOUBLE PRECISION,
    "targetRole" TEXT,
    "targetCompany" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "portfolio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Resume" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "workExperience" TEXT,
    "education" TEXT,
    "skills" TEXT[],
    "score" INTEGER,
    "aiFeedback" JSONB,
    "status" "public"."ResumeStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResumeProject" (
    "id" UUID NOT NULL,
    "resumeId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT[],
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Roadmap" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."RoadmapCategory" NOT NULL,
    "difficulty" "public"."RoadmapDifficulty" NOT NULL,
    "estimatedHours" INTEGER,
    "thumbnailUrl" TEXT,
    "isOfficial" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoadmapStep" (
    "id" UUID NOT NULL,
    "isOptional" BOOLEAN NOT NULL DEFAULT false,
    "roadmapId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "public"."StepType" NOT NULL,
    "resourceUrl" TEXT,
    "durationMinutes" INTEGER,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoadmapStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserProgress" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "roadmapId" UUID NOT NULL,
    "completedSteps" INTEGER NOT NULL DEFAULT 0,
    "totalSteps" INTEGER NOT NULL DEFAULT 0,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "logoUrl" TEXT,
    "website" TEXT,
    "description" TEXT,
    "industry" TEXT,
    "headquarters" TEXT,
    "foundedYear" INTEGER,
    "employees" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Opportunity" (
    "id" UUID NOT NULL,
    "skills" TEXT[],
    "companyId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "type" "public"."OpportunityType" NOT NULL,
    "status" "public"."OpportunityStatus" NOT NULL DEFAULT 'OPEN',
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "applyUrl" TEXT,
    "deadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OAQuestion" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL,
    "topic" TEXT,
    "solution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OAQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InterviewExperience" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "rounds" INTEGER,
    "result" TEXT,
    "postedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AIChat" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT,
    "type" "public"."AIChatType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AIChatMessage" (
    "id" UUID NOT NULL,
    "chatId" UUID NOT NULL,
    "role" "public"."MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MockInterview" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "companyId" UUID,
    "role" TEXT,
    "mode" "public"."InterviewMode" NOT NULL,
    "difficulty" "public"."Difficulty" NOT NULL,
    "status" "public"."InterviewStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MockInterview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InterviewFeedback" (
    "id" UUID NOT NULL,
    "interviewId" UUID NOT NULL,
    "overallScore" INTEGER,
    "communication" INTEGER,
    "technicalKnowledge" INTEGER,
    "confidence" INTEGER,
    "problemSolving" INTEGER,
    "analysis" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserActivity" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "public"."ActivityType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "public"."User"("status");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "public"."StudentProfile"("userId");

-- CreateIndex
CREATE INDEX "StudentProfile_college_idx" ON "public"."StudentProfile"("college");

-- CreateIndex
CREATE INDEX "Resume_userId_idx" ON "public"."Resume"("userId");

-- CreateIndex
CREATE INDEX "ResumeProject_resumeId_idx" ON "public"."ResumeProject"("resumeId");

-- CreateIndex
CREATE INDEX "Roadmap_category_idx" ON "public"."Roadmap"("category");

-- CreateIndex
CREATE INDEX "Roadmap_difficulty_idx" ON "public"."Roadmap"("difficulty");

-- CreateIndex
CREATE INDEX "RoadmapStep_roadmapId_idx" ON "public"."RoadmapStep"("roadmapId");

-- CreateIndex
CREATE UNIQUE INDEX "RoadmapStep_roadmapId_order_key" ON "public"."RoadmapStep"("roadmapId", "order");

-- CreateIndex
CREATE INDEX "UserProgress_roadmapId_idx" ON "public"."UserProgress"("roadmapId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_roadmapId_key" ON "public"."UserProgress"("userId", "roadmapId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "public"."Company"("name");

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "public"."Company"("name");

-- CreateIndex
CREATE INDEX "Opportunity_companyId_idx" ON "public"."Opportunity"("companyId");

-- CreateIndex
CREATE INDEX "Opportunity_type_idx" ON "public"."Opportunity"("type");

-- CreateIndex
CREATE INDEX "Opportunity_status_idx" ON "public"."Opportunity"("status");

-- CreateIndex
CREATE INDEX "OAQuestion_companyId_idx" ON "public"."OAQuestion"("companyId");

-- CreateIndex
CREATE INDEX "OAQuestion_difficulty_idx" ON "public"."OAQuestion"("difficulty");

-- CreateIndex
CREATE INDEX "InterviewExperience_companyId_idx" ON "public"."InterviewExperience"("companyId");

-- CreateIndex
CREATE INDEX "AIChat_userId_idx" ON "public"."AIChat"("userId");

-- CreateIndex
CREATE INDEX "AIChat_type_idx" ON "public"."AIChat"("type");

-- CreateIndex
CREATE INDEX "AIChatMessage_chatId_idx" ON "public"."AIChatMessage"("chatId");

-- CreateIndex
CREATE INDEX "MockInterview_userId_idx" ON "public"."MockInterview"("userId");

-- CreateIndex
CREATE INDEX "MockInterview_status_idx" ON "public"."MockInterview"("status");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewFeedback_interviewId_key" ON "public"."InterviewFeedback"("interviewId");

-- CreateIndex
CREATE INDEX "UserActivity_userId_idx" ON "public"."UserActivity"("userId");

-- CreateIndex
CREATE INDEX "UserActivity_type_idx" ON "public"."UserActivity"("type");

-- CreateIndex
CREATE INDEX "UserActivity_createdAt_idx" ON "public"."UserActivity"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResumeProject" ADD CONSTRAINT "ResumeProject_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "public"."Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Roadmap" ADD CONSTRAINT "Roadmap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoadmapStep" ADD CONSTRAINT "RoadmapStep_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "public"."Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProgress" ADD CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProgress" ADD CONSTRAINT "UserProgress_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "public"."Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Opportunity" ADD CONSTRAINT "Opportunity_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OAQuestion" ADD CONSTRAINT "OAQuestion_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewExperience" ADD CONSTRAINT "InterviewExperience_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AIChat" ADD CONSTRAINT "AIChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AIChatMessage" ADD CONSTRAINT "AIChatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."AIChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MockInterview" ADD CONSTRAINT "MockInterview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MockInterview" ADD CONSTRAINT "MockInterview_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewFeedback" ADD CONSTRAINT "InterviewFeedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."MockInterview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
