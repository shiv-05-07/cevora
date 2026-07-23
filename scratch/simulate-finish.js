const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { diagnosticQuestions } = require('../features/diagnostic/data/diagnosticQuestions');

async function run() {
  try {
    console.log('--- Simulating End-to-End Diagnostic Finish Flow ---');
    
    // 1. Get first available user
    const user = await prisma.user.findFirst({
      where: { role: 'STUDENT' }
    });

    if (!user) {
      console.error('No STUDENT user found in database. Please run migrations/seed or register a user.');
      return;
    }

    console.log(`Using User: ${user.fullName} (${user.id})`);

    // Reset profile diagnosticCompleted to allow taking it
    await prisma.learningProfile.upsert({
      where: { userId: user.id },
      update: {
        diagnosticCompleted: false,
        diagnosticStatus: 'PENDING',
        attemptNumber: 0
      },
      create: {
        userId: user.id,
        diagnosticCompleted: false,
        diagnosticStatus: 'PENDING',
        attemptNumber: 0
      }
    });

    // 2. Create clean diagnostic attempt
    // Clean old attempts for fresh run
    await prisma.diagnosticResponse.deleteMany({
      where: { attempt: { userId: user.id } }
    });
    await prisma.diagnosticAttempt.deleteMany({
      where: { userId: user.id }
    });

    const attempt = await prisma.diagnosticAttempt.create({
      data: {
        userId: user.id,
      }
    });

    console.log(`Created DiagnosticAttempt: ${attempt.id}`);

    // 3. Submit 15 randomized responses (8 correct, 7 incorrect for a mixed score)
    const activeQuestions = diagnosticQuestions.slice(0, 15);
    for (let i = 0; i < activeQuestions.length; i++) {
      const q = activeQuestions[i];
      const isCorrect = i % 2 === 0; // Alternating correct answers
      const selectedAnswer = isCorrect ? q.correctAnswer : 'INVALID_OPTION';

      await prisma.diagnosticResponse.create({
        data: {
          attemptId: attempt.id,
          questionId: q.id,
          selectedAnswer,
          correctAnswer: q.correctAnswer,
          isCorrect,
          timeTaken: 15
        }
      });
    }

    console.log('Submitted 15 responses.');

    // 4. Load optimized finish diagnostic service and execute
    // Since we are running in commonjs, let's dynamic import DiagnosticService
    const { diagnosticService } = require('../features/diagnostic/services/DiagnosticService');
    
    console.log('Invoking finishDiagnostic...');
    const result = await diagnosticService.finishDiagnostic(attempt.id, user.id);
    console.log('finishDiagnostic completed successfully!');
    console.log('Placement Readiness Level:', result.placementReadiness);
    console.log('Overall Accuracy:', result.accuracy, '%');
    console.log('Score:', result.score);
    console.log('Learning Persona:', result.learningPersona);

    // 5. Print counts after execution
    console.log('\n--- Post-Simulation Record Counts ---');
    const profileCount = await prisma.learningProfile.count({ where: { userId: user.id } });
    const stateCount = await prisma.knowledgeState.count({ where: { userId: user.id } });
    const snapshotCount = await prisma.knowledgeSnapshot.count({ where: { userId: user.id } });
    const scoreCount = await prisma.skillScore.count({ where: { userId: user.id } });
    const weakCount = await prisma.weakConcept.count({ where: { userId: user.id } });
    const masteryCount = await prisma.conceptMastery.count({ where: { userId: user.id } });

    console.log(`LearningProfile completed: ${profileCount}`);
    console.log(`KnowledgeState row created: ${stateCount}`);
    console.log(`KnowledgeSnapshot row created: ${snapshotCount}`);
    console.log(`SkillScore rows created: ${scoreCount}`);
    console.log(`WeakConcept rows created: ${weakCount}`);
    console.log(`ConceptMastery rows created: ${masteryCount}`);

  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
