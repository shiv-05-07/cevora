-- CreateIndex
CREATE INDEX IF NOT EXISTS "DiagnosticAttempt_userId_completedAt_idx" ON "DiagnosticAttempt"("userId", "completedAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ConceptMastery_userId_lastPracticed_idx" ON "ConceptMastery"("userId", "lastPracticed");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Mission_userId_status_idx" ON "Mission"("userId", "status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "LearningEvent_userId_createdAt_idx" ON "LearningEvent"("userId", "createdAt");
