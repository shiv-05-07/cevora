import prisma from '../lib/prisma';

async function main() {
  console.log('--- Testing Remove Progress Feature ---');

  // Fetch or create real test users from User table
  let userA = await prisma.user.findFirst();
  if (!userA) {
    userA = await prisma.user.create({
      data: {
        id: 'a0000000-0000-0000-0000-000000000001',
        username: 'testusera',
        fullName: 'Test User A',
      }
    });
  }

  let userB = await prisma.user.findFirst({
    where: { id: { not: userA.id } }
  });
  if (!userB) {
    userB = await prisma.user.create({
      data: {
        id: 'b0000000-0000-0000-0000-000000000002',
        username: 'testuserb',
        fullName: 'Test User B',
      }
    });
  }

  const testUserId = userA.id;
  const testUserBId = userB.id;
  const testRoadmapId = 'amazon-sde-1';

  console.log(`Using User A (${testUserId}) & User B (${testUserBId})`);

  // Cleanup past test data for these test users
  await prisma.userLessonProgress.deleteMany({ where: { userId: { in: [testUserId, testUserBId] } } });
  await prisma.userRoadmapProgress.deleteMany({ where: { userId: { in: [testUserId, testUserBId] } } });
  await prisma.userRoadmapSave.deleteMany({ where: { userId: { in: [testUserId, testUserBId] } } });

  console.log('1. Setting up User A & User B initial states...');

  // User A starts & completes 2 lessons, and saves the roadmap
  await prisma.userRoadmapSave.create({
    data: { userId: testUserId, roadmapId: testRoadmapId }
  });
  await prisma.userRoadmapProgress.create({
    data: {
      userId: testUserId,
      roadmapId: testRoadmapId,
      startedAt: new Date(),
      lastAccessedAt: new Date(),
      lastAccessedLessonId: 'amz-l-101'
    }
  });
  await prisma.userLessonProgress.createMany({
    data: [
      { userId: testUserId, roadmapId: testRoadmapId, lessonId: 'amz-l-101', completed: true },
      { userId: testUserId, roadmapId: testRoadmapId, lessonId: 'amz-l-102', completed: true }
    ]
  });

  // User B starts the same roadmap
  await prisma.userRoadmapProgress.create({
    data: {
      userId: testUserBId,
      roadmapId: testRoadmapId,
      startedAt: new Date(),
      lastAccessedAt: new Date(),
      lastAccessedLessonId: 'amz-l-101'
    }
  });
  await prisma.userLessonProgress.create({
    data: { userId: testUserBId, roadmapId: testRoadmapId, lessonId: 'amz-l-101', completed: true }
  });

  // Verification Step 1
  const userAProgressBefore = await prisma.userRoadmapProgress.findUnique({
    where: { userId_roadmapId: { userId: testUserId, roadmapId: testRoadmapId } }
  });
  const userALessonsBefore = await prisma.userLessonProgress.findMany({
    where: { userId: testUserId, roadmapId: testRoadmapId }
  });
  const userASaveBefore = await prisma.userRoadmapSave.findUnique({
    where: { userId_roadmapId: { userId: testUserId, roadmapId: testRoadmapId } }
  });

  console.log(`User A Progress Record Exists: ${!!userAProgressBefore}`);
  console.log(`User A Completed Lessons Count: ${userALessonsBefore.length}`);
  console.log(`User A Saved Record Exists: ${!!userASaveBefore}`);

  if (!userAProgressBefore || userALessonsBefore.length !== 2 || !userASaveBefore) {
    throw new Error('Initial setup failed!');
  }

  console.log('2. Executing Remove from In Progress transaction for User A...');

  await prisma.$transaction([
    prisma.userLessonProgress.deleteMany({
      where: { userId: testUserId, roadmapId: testRoadmapId }
    }),
    prisma.userRoadmapProgress.deleteMany({
      where: { userId: testUserId, roadmapId: testRoadmapId }
    })
  ]);

  console.log('3. Verifying post-removal states...');

  const userAProgressAfter = await prisma.userRoadmapProgress.findUnique({
    where: { userId_roadmapId: { userId: testUserId, roadmapId: testRoadmapId } }
  });
  const userALessonsAfter = await prisma.userLessonProgress.findMany({
    where: { userId: testUserId, roadmapId: testRoadmapId }
  });
  const userASaveAfter = await prisma.userRoadmapSave.findUnique({
    where: { userId_roadmapId: { userId: testUserId, roadmapId: testRoadmapId } }
  });

  const userBProgressAfter = await prisma.userRoadmapProgress.findUnique({
    where: { userId_roadmapId: { userId: testUserBId, roadmapId: testRoadmapId } }
  });
  const userBLessonsAfter = await prisma.userLessonProgress.findMany({
    where: { userId: testUserBId, roadmapId: testRoadmapId }
  });

  console.log(`User A Progress Record After Removal: ${userAProgressAfter}`);
  console.log(`User A Lesson Records Count After Removal: ${userALessonsAfter.length}`);
  console.log(`User A Saved Record Exists After Removal: ${!!userASaveAfter}`);
  console.log(`User B Progress Intact: ${!!userBProgressAfter}`);
  console.log(`User B Lesson Count Intact: ${userBLessonsAfter.length}`);

  if (userAProgressAfter !== null) throw new Error('User A roadmap progress was not deleted!');
  if (userALessonsAfter.length !== 0) throw new Error('User A lesson progress was not deleted!');
  if (!userASaveAfter) throw new Error('User A saved state was modified/deleted!');
  if (!userBProgressAfter || userBLessonsAfter.length !== 1) throw new Error('User B state was affected!');

  // Cleanup test data for these test users
  await prisma.userLessonProgress.deleteMany({ where: { userId: { in: [testUserId, testUserBId] } } });
  await prisma.userRoadmapProgress.deleteMany({ where: { userId: { in: [testUserId, testUserBId] } } });
  await prisma.userRoadmapSave.deleteMany({ where: { userId: { in: [testUserId, testUserBId] } } });

  console.log('\n✅ ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
