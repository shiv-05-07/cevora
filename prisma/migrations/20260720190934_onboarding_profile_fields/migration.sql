-- CreateEnum
CREATE TYPE "public"."LearningPace" AS ENUM ('SLOW', 'NORMAL', 'FAST');

-- AlterTable
ALTER TABLE "public"."LearningProfile" ADD COLUMN     "learningGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "learningPace" "public"."LearningPace",
ADD COLUMN     "preferredSubjects" TEXT[] DEFAULT ARRAY[]::TEXT[];
