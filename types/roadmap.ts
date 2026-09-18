export type RoadmapDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ResourceType = 'youtube' | 'documentation' | 'article' | 'practice' | 'official';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  resourceUrl: string;
  order: number;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  company?: string | null;
  role: string;
  difficulty: RoadmapDifficulty;
  estimatedDuration: string;
  description: string;
  skills: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  modules: RoadmapModule[];
}

export interface UserRoadmapMeta {
  roadmapId: string;
  startedAt: string;
  lastAccessedAt: string;
  lastAccessedLessonId?: string | null;
  completedLessonIds: string[];
  completedAt?: string | null;
}

export interface UserRoadmapStateResponse {
  savedRoadmapIds: string[];
  userRoadmaps: Record<string, UserRoadmapMeta>;
}
