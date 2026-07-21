import prisma from '@/lib/prisma';
import { RecommendationEngine } from './RecommendationEngine';
import { MissionType, MissionStatus } from '@prisma/client';

export class MissionGenerator {
  /**
   * Generates a new personalized daily mission for the user.
   */
  static async generateDailyMission(userId: string) {
    const recommendation = await RecommendationEngine.recommendNextMission(userId);

    // Mock content generation for the purpose of this implementation.
    // In a real scenario, this would likely call an AI service to generate content.
    const lessonContent = `### Welcome to your daily mission!\n\nToday we are focusing on mastering new skills.\n\n${recommendation.reason}`;
    const interactiveExample = { type: 'code', code: 'console.log("Hello, World!");' };
    
    const practiceQuestion = 'What is the output of the following code?\n\n```javascript\nconsole.log(typeof 42);\n```';
    const practiceOptions = [
      { id: 'a', text: '"number"' },
      { id: 'b', text: '"string"' },
      { id: 'c', text: '"undefined"' },
      { id: 'd', text: '"object"' }
    ];
    const practiceCorrectAnswer = { id: 'a' };

    const mission = await prisma.mission.create({
      data: {
        userId,
        title: 'Daily Microlearning Mission',
        description: recommendation.reason,
        type: MissionType.LESSON,
        status: MissionStatus.PENDING,
        priority: recommendation.priorityScore,
        estimatedMinutes: recommendation.estimatedMinutes,
        difficulty: recommendation.adaptiveDifficulty,
        lessons: {
          create: [
            {
              order: 0,
              title: 'Introduction',
              content: lessonContent,
              interactiveExample: interactiveExample,
              estimatedMinutes: Math.floor(recommendation.estimatedMinutes * 0.7),
            }
          ]
        },
        practices: {
          create: [
            {
              order: 0,
              question: practiceQuestion,
              options: practiceOptions,
              correctAnswer: practiceCorrectAnswer,
              explanation: 'The typeof operator returns "number" for numeric values.',
            }
          ]
        },
        missionProgress: {
          create: {
            currentStage: 'LESSON',
            completedLessonIds: [],
            completedPracticeIds: [],
          }
        }
      },
      include: {
        lessons: true,
        practices: true,
        missionProgress: true,
      }
    });

    return mission;
  }
}
