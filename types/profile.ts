import { SettingsData } from './settings';
import { AnalyticsDashboardData } from './analytics';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Completed' | 'In Progress';
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  pinned: boolean;
  coverImage?: string;
  teamSize: 'Solo' | 'Team';
  featured: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  completionDate: string;
  credentialId: string;
  verifyUrl: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  cgpa: string;
  duration: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  type: 'Internship' | 'Freelance' | 'Open Source' | 'Volunteer';
}

export interface AggregatedProfile {
  settings: SettingsData;
  analytics: AnalyticsDashboardData;
  projects: Project[];
  certifications: Certification[];
  education: EducationItem[];
  experience: ExperienceItem[];
  profileCompletionScore: number;
  remainingTasks: string[];
  aiSummary: {
    text: string;
    priority: 'High' | 'Medium' | 'Low';
    confidence: number;
    suggestedAction: string;
    suggestedActionHref: string;
  };
}
