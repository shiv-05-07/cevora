import prisma from '@/lib/prisma';
import { MissionType, MissionStatus, RoadmapDifficulty } from '@prisma/client';
import { getSubjectCurriculum, assertMissionMatchesSubject } from '@/lib/learning/curriculum/subjectCurriculum';
import { topicMatches } from '@/lib/mission/roadmapTemplates';

export interface GenerateMissionOptions {
  userId: string;
  subjectKey?: string;
  currentStepTopicKey?: string;
  completedMissionTopics?: string[];
}

export class MissionGenerator {
  /**
   * Generates the next sequential, topic-coherent daily mission for the user
   * based on their onboarding-selected subjects and completed missions.
   */
  static async generateDailyMission(userIdOrOptions: string | GenerateMissionOptions) {
    if (typeof userIdOrOptions === 'object') {
      const { userId, subjectKey, currentStepTopicKey, completedMissionTopics = [] } = userIdOrOptions;
      const curriculum = getSubjectCurriculum(subjectKey ? [subjectKey] : []);
      if (!curriculum) {
        throw new Error('No learning subject selected.');
      }

      const nextMissionContent =
        curriculum.missions.find(
          (m: any) => (currentStepTopicKey ? m.topicKey === currentStepTopicKey : true) &&
                 !completedMissionTopics.some((ct) => topicMatches(ct, m.title) || topicMatches(ct, m.topicKey))
        ) || curriculum.missions[0];

      assertMissionMatchesSubject(nextMissionContent.title, subjectKey ? [subjectKey] : []);

      return {
        id: `mock_m_${Date.now()}`,
        userId,
        subjectKey: curriculum.key,
        topicKey: nextMissionContent.topicKey,
        title: nextMissionContent.title,
        description: nextMissionContent.description,
        type: MissionType.LESSON,
        status: MissionStatus.IN_PROGRESS,
        priority: 95,
        estimatedMinutes: nextMissionContent.estimatedMinutes || 45,
        difficulty: RoadmapDifficulty.BEGINNER,
        content: {
          topic: nextMissionContent.title,
          lesson: nextMissionContent.lesson,
          practice: nextMissionContent.practice,
          review: nextMissionContent.review,
          interview: nextMissionContent.interview,
        },
        lessons: [nextMissionContent.lesson],
        practices: [nextMissionContent.practice],
      };
    }

    const userId = userIdOrOptions;
    // 1. Fetch user learning profile to get preferred subjects
    const profile = await prisma.learningProfile.findUnique({
      where: { userId },
      select: {
        preferredSubjects: true,
        learningGoals: true,
        preferredDifficulty: true,
      },
    });

    const preferredSubjects = profile?.preferredSubjects || [];

    // 2. Resolve subject curriculum using central registry
    const subjectCurriculum = getSubjectCurriculum(preferredSubjects);
    if (!subjectCurriculum) {
      throw new Error('No learning subject selected. Choose a learning subject to build your learning path.');
    }

    // 3. Fetch completed missions to know what the user has completed
    const completedMissions = await prisma.mission.findMany({
      where: { userId, status: MissionStatus.COMPLETED },
      select: { content: true, title: true, topicKey: true, completedAt: true },
      orderBy: { completedAt: 'asc' },
    });

    const completedTopics = completedMissions.map((m) => {
      return m.topicKey || (m.content as any)?.topic || m.title;
    });

    // 4. Find the first uncompleted mission in the subject curriculum sequence
    const nextMissionContent =
      subjectCurriculum.missions.find(
        (m: any) => !completedTopics.some((ct) => topicMatches(ct, m.title) || topicMatches(ct, m.topicKey))
      ) || subjectCurriculum.missions[subjectCurriculum.missions.length - 1];

    // 5. Assert subject safety check
    assertMissionMatchesSubject(nextMissionContent.title, preferredSubjects);

    // 6. Create the mission in the database with explicit subjectKey & topicKey
    const mission = await prisma.mission.create({
      data: {
        userId,
        subjectKey: subjectCurriculum.key,
        topicKey: nextMissionContent.topicKey,
        title: nextMissionContent.title,
        description: nextMissionContent.description,
        type: MissionType.LESSON,
        status: MissionStatus.IN_PROGRESS,
        priority: 95,
        estimatedMinutes: nextMissionContent.estimatedMinutes || 45,
        difficulty: RoadmapDifficulty.BEGINNER,
        content: {
          topic: nextMissionContent.title,
          review: nextMissionContent.review,
          interview: nextMissionContent.interview,
        } as any,
        lessons: {
          create: [
            {
              order: 0,
              title: nextMissionContent.lesson.title,
              content: nextMissionContent.lesson.content,
              interactiveExample: nextMissionContent.lesson.interactiveExample,
              estimatedMinutes: 15,
            },
          ],
        },
        practices: {
          create: [
            {
              order: 0,
              question: nextMissionContent.practice.question,
              options: nextMissionContent.practice.options,
              correctAnswer: { id: nextMissionContent.practice.correctAnswerId },
              explanation: nextMissionContent.practice.explanation,
            },
          ],
        },
        missionProgress: {
          create: {
            currentStage: 'LEARN',
            completedLessonIds: [],
            completedPracticeIds: [],
          },
        },
      },
      include: {
        lessons: true,
        practices: true,
        missionProgress: true,
      },
    });

    return mission;
  }
}
