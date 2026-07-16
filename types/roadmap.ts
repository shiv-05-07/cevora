export type RoadmapDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ModuleStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'practice' | 'quiz' | 'assignment' | 'project';
  duration: string;
  isCompleted: boolean;
}

export interface MiniProject {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface PracticeLink {
  id: string;
  title: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  estimatedTime: string;
  status: ModuleStatus;
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
  miniProjects: MiniProject[];
  practiceLinks: PracticeLink[];
}

export interface RecommendedResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'book' | 'course';
  url: string;
}

export interface Roadmap {
  id: string;
  title: string;
  company?: string;
  role: string;
  difficulty: RoadmapDifficulty;
  estimatedDuration: string;
  completion: number; // 0-100
  rating: number;
  studentsEnrolled: number;
  description: string;
  lastUpdated: string;
  streakDays: number;
  
  skills: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  mentorTips: string[];
  
  modules: RoadmapModule[];
  projects: MiniProject[];
  resources: RecommendedResource[];
}
