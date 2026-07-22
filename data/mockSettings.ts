import { SettingsData } from '@/types/settings';

export const mockSettings: SettingsData = {
  profile: {
    avatar: '',
    name: 'User',
    email: '',
    university: 'Tech University',
    degree: 'B.Tech Computer Science',
    graduationYear: '2026',
    targetRole: 'Software Development Engineer',
    dreamCompany: 'Top Tech Companies',
    profileCompletion: 85,
  },
  career: {
    targetRole: 'Backend Engineer',
    preferredCompanies: ['Amazon', 'Microsoft'],
    experienceLevel: 'Intermediate',
    techStack: ['Node.js', 'React', 'PostgreSQL'],
    languages: ['TypeScript', 'Python', 'Java'],
    cgpa: '8.5',
    preferredLocation: 'Bengaluru, India',
    expectedPackage: '15-20 LPA',
    availability: '1 Month',
    workMode: {
      remote: true,
      hybrid: true,
      onsite: false,
    }
  },
  ai: {
    responseStyle: 'Balanced',
    interviewDifficulty: 'Medium',
    studyPlan: 'Adaptive',
    roadmapStyle: 'Balanced',
    mentorPersonality: 'Professional',
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    interviewReminders: true,
    studyReminder: true,
    weeklyReport: true,
    placementUpdates: true,
    resumeScoreChanges: false,
    companyAlerts: true,
  },
  appearance: {
    theme: 'Dark',
    compactMode: false,
    reduceAnimations: false,
    highContrast: false,
  },
  privacy: {
    dataSharing: true,
    analyticsCollection: true,
  },
  accounts: [
    {
      id: 'github',
      provider: 'GitHub',
      status: 'Connected',
      lastSync: '2 hours ago',
      details: {
        repositories: 48,
        language: 'TypeScript',
      }
    },
    {
      id: 'linkedin',
      provider: 'LinkedIn',
      status: 'Connected',
      lastSync: '1 day ago',
      details: {
        connections: 500,
      }
    },
    {
      id: 'google',
      provider: 'Google',
      status: 'Connected',
      lastSync: 'Just now',
    },
    {
      id: 'leetcode',
      provider: 'LeetCode',
      status: 'Connected',
      lastSync: '5 hours ago',
      details: {
        problemsSolved: 342,
        rating: 1850,
      }
    },
    {
      id: 'codeforces',
      provider: 'Codeforces',
      status: 'Not Connected',
    },
    {
      id: 'geeksforgeeks',
      provider: 'GeeksforGeeks',
      status: 'Not Connected',
    }
  ],
  integrations: [
    {
      id: 'analytics',
      name: 'Analytics',
      status: 'Healthy',
      enabled: true,
      lastSync: '2 min ago',
      dataSources: ['Resume', 'OA', 'Interview', 'Roadmaps']
    },
    {
      id: 'ai-mentor',
      name: 'AI Mentor',
      status: 'Healthy',
      enabled: true,
      lastSync: 'Just now',
      dataSources: ['Career Preferences', 'Chat History', 'Skill Profile']
    },
    {
      id: 'resume-analyzer',
      name: 'Resume Analyzer',
      status: 'Healthy',
      enabled: true,
      lastSync: '5 days ago',
      dataSources: ['PDF Uploads', 'LinkedIn Export']
    },
    {
      id: 'study-assistant',
      name: 'Study Assistant',
      status: 'Healthy',
      enabled: true,
      lastSync: '1 hour ago',
      dataSources: ['Roadmaps', 'OA Practice']
    }
  ]
};
