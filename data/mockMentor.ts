import { Conversation, MentorInsight, QuickTool, SuggestedPrompt } from '@/types/mentor';

export const mockMentorHistory: Conversation[] = [
  {
    id: 'c1',
    title: 'How to prepare for Amazon SDE1',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2),
    category: 'recent',
    preview: 'Here is a complete Amazon prep guide focusing on Leadership Principles...',
    messages: [
      { id: 'm1', role: 'user', content: 'How should I prepare for Amazon?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { id: 'm2', role: 'assistant', content: 'Here is a complete Amazon prep guide...', timestamp: new Date(Date.now() - 1000 * 60 * 59 * 2) },
    ]
  },
  {
    id: 'c2',
    title: 'Resume Review: Missing Keywords',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24),
    category: 'recent',
    preview: 'Your ATS score is currently 72%. I recommend adding more measurable...',
    messages: [
      { id: 'm3', role: 'user', content: 'Can you review my resume and suggest improvements?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
      { id: 'm4', role: 'assistant', content: 'Your ATS score is currently 72%. I recommend adding more measurable metrics to your experience section and including keywords like \'React\', \'Node.js\', and \'TypeScript\' based on the jobs you are applying for.', timestamp: new Date(Date.now() - 1000 * 60 * 59 * 24) }
    ]
  },
  {
    id: 'c3',
    title: 'Behavioral Questions - STAR Method',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    category: 'saved',
    preview: 'The STAR method stands for Situation, Task, Action, and Result...',
    messages: [
      { id: 'm5', role: 'user', content: 'How do I answer behavioral questions?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
      { id: 'm6', role: 'assistant', content: 'The STAR method stands for Situation, Task, Action, and Result. You should focus on specific examples from your past experience. When detailing the \'Action\', emphasize what *you* did, not what the team did.', timestamp: new Date(Date.now() - 1000 * 60 * 59 * 24 * 3) }
    ]
  },
  {
    id: 'c4',
    title: 'Dynamic Programming Patterns',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    category: 'older',
    preview: 'DP can be broken down into 1D, 2D, Knapsack, and pathfinding patterns...',
    messages: [
      { id: 'm7', role: 'user', content: 'I struggle with Dynamic Programming. How can I get better?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
      { id: 'm8', role: 'assistant', content: 'DP can be broken down into 1D, 2D, Knapsack, and pathfinding patterns. I suggest starting with 1D problems like \'Climbing Stairs\' and \'House Robber\' before moving on to more complex 2D grid patterns.', timestamp: new Date(Date.now() - 1000 * 60 * 59 * 24 * 7) }
    ]
  }
];

export const mockSuggestedPrompts: SuggestedPrompt[] = [
  // Career
  { id: 'p1', category: 'Career', title: 'Review my resume', prompt: 'Can you review my resume and suggest improvements for ATS optimization?', icon: 'FileText' },
  { id: 'p2', category: 'Career', title: 'Build a placement strategy', prompt: 'Create a 6-month placement preparation strategy for me.', icon: 'Map' },
  { id: 'p3', category: 'Career', title: 'Improve LinkedIn profile', prompt: 'How can I optimize my LinkedIn profile to attract more recruiters?', icon: 'Briefcase' },
  // Interview
  { id: 'p4', category: 'Interview', title: 'HR interview questions', prompt: 'What are the top 5 most common HR interview questions and how do I answer them?', icon: 'Users' },
  { id: 'p5', category: 'Interview', title: 'Amazon preparation', prompt: 'What are the most common interview topics asked at Amazon for SDE1?', icon: 'Building2' },
  { id: 'p6', category: 'Interview', title: 'Mock technical interview', prompt: 'Conduct a mock technical interview for a Frontend Developer role.', icon: 'Code' },
  // Learning
  { id: 'p7', category: 'Learning', title: 'Explain Dynamic Programming', prompt: 'Explain the concept of Dynamic Programming with a real-world analogy and an example.', icon: 'Brain' },
  { id: 'p8', category: 'Learning', title: 'Create a DSA roadmap', prompt: 'Can you give me a structured 30-day DSA roadmap?', icon: 'Map' },
  { id: 'p9', category: 'Learning', title: 'Suggest backend projects', prompt: 'Suggest 3 unique backend projects that will stand out on my resume.', icon: 'Server' },
];

export const mockInsights: MentorInsight[] = [
  { id: 'i1', label: 'Current Focus', value: 'Resume Optimization', icon: 'Target', color: 'text-blue-500' },
  { id: 'i2', label: 'Weakest Area', value: 'Projects', icon: 'TrendingDown', color: 'text-orange-500' },
  { id: 'i3', label: 'Strongest Area', value: 'DSA', icon: 'TrendingUp', color: 'text-emerald-500' },
  { id: 'i4', label: 'Next Recommendation', value: 'Improve Resume', icon: 'CheckSquare', color: 'text-purple-500' },
  { id: 'i5', label: 'Learning Streak', value: '7 Days', icon: 'Flame', color: 'text-orange-500' },
  { id: 'i6', label: 'Estimated Readiness', value: '82%', icon: 'Award', color: 'text-yellow-500' },
];

export const mockTools: QuickTool[] = [
  { id: 't1', title: 'Resume Analyzer', description: 'Get an ATS score and feedback.', icon: 'FileText', href: '/resume' },
  { id: 't2', title: 'Roadmaps', description: 'Follow your structured path.', icon: 'Map', href: '/roadmaps' },
  { id: 't3', title: 'Practice OA', description: 'Solve real company problems.', icon: 'Code', href: '/oa-practice' },
  { id: 't4', title: 'Interview', description: 'Mock AI interview sessions.', icon: 'Video', href: '/interview' },
  { id: 't5', title: 'Study Planner', description: 'Organize your schedule.', icon: 'Calendar', href: '/study-assistant' },
  { id: 't6', title: 'LinkedIn Review', description: 'Optimize your social presence.', icon: 'Linkedin', href: '#' },
];
