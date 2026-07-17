export interface ProfileSettings {
  avatar: string;
  name: string;
  email: string;
  university: string;
  degree: string;
  graduationYear: string;
  targetRole: string;
  dreamCompany: string;
  profileCompletion: number;
}

export interface CareerPreferences {
  targetRole: string;
  preferredCompanies: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  languages: string[];
  cgpa: string;
  preferredLocation: string;
  expectedPackage: string;
  availability: 'Immediate' | '1 Month' | '2 Months' | '3+ Months';
  workMode: {
    remote: boolean;
    hybrid: boolean;
    onsite: boolean;
  };
}

export interface AIPreferences {
  responseStyle: 'Concise' | 'Balanced' | 'Detailed';
  interviewDifficulty: 'Easy' | 'Medium' | 'Hard';
  studyPlan: 'Daily' | 'Weekly' | 'Adaptive';
  roadmapStyle: 'Fast Track' | 'Balanced' | 'Deep Learning';
  mentorPersonality: 'Friendly' | 'Professional' | 'Strict';
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  interviewReminders: boolean;
  studyReminder: boolean;
  weeklyReport: boolean;
  placementUpdates: boolean;
  resumeScoreChanges: boolean;
  companyAlerts: boolean;
}

export interface AppearanceSettings {
  theme: 'Light' | 'Dark' | 'System';
  compactMode: boolean;
  reduceAnimations: boolean;
  highContrast: boolean;
}

export interface PrivacySecuritySettings {
  dataSharing: boolean;
  analyticsCollection: boolean;
}

export interface ConnectedAccount {
  id: string;
  provider: 'GitHub' | 'LinkedIn' | 'Google' | 'LeetCode' | 'Codeforces' | 'GeeksforGeeks';
  status: 'Connected' | 'Not Connected';
  lastSync?: string;
  details?: {
    repositories?: number;
    language?: string;
    connections?: number;
    rating?: number;
    problemsSolved?: number;
  };
}

export interface Integration {
  id: string;
  name: string;
  status: 'Healthy' | 'Degraded' | 'Offline';
  enabled: boolean;
  lastSync: string;
  dataSources: string[];
}

export interface SettingsData {
  profile: ProfileSettings;
  career: CareerPreferences;
  ai: AIPreferences;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
  privacy: PrivacySecuritySettings;
  accounts: ConnectedAccount[];
  integrations: Integration[];
}
