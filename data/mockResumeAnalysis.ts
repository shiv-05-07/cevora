import { ATSAnalysisData } from '@/types/resume';

export const mockATSAnalysis: ATSAnalysisData = {
  overallScore: 88,
  rating: 'Good',
  recommendation: 'Ready for Review - Minor Tweaks Needed',
  percentile: 'Top 12%',
  interviewReadiness: 78,

  scoreBreakdown: [
    { id: 'fmt', name: 'Formatting', score: 95, description: 'Excellent ATS readability. No complex tables or graphics found.' },
    { id: 'exp', name: 'Experience', score: 80, description: 'Solid measurable impact, but missing some leadership verbs.' },
    { id: 'skl', name: 'Skills', score: 88, description: 'Strong match for software engineering roles.' },
    { id: 'edu', name: 'Education', score: 100, description: 'Clear layout, graduation date and degree present.' },
    { id: 'kwd', name: 'Keywords', score: 72, description: 'Missing a few core technologies mentioned in top job descriptions.' },
    { id: 'grm', name: 'Grammar', score: 90, description: 'No major spelling or grammatical errors detected.' },
  ],

  detectedSkills: [
    { name: 'React', category: 'Frameworks' },
    { name: 'TypeScript', category: 'Languages' },
    { name: 'Node.js', category: 'Frameworks' },
    { name: 'Python', category: 'Languages' },
    { name: 'MongoDB', category: 'Databases' },
    { name: 'Git', category: 'Tools' },
    { name: 'REST APIs', category: 'Concepts' },
    { name: 'Agile', category: 'Soft Skills' },
  ],
  
  missingSkills: [
    { name: 'AWS', category: 'Cloud' },
    { name: 'Docker', category: 'Tools' },
    { name: 'Kubernetes', category: 'Tools' },
    { name: 'GraphQL', category: 'Concepts' },
    { name: 'CI/CD', category: 'Tools' },
  ],

  keywordMatchPercentage: 84,
  missingKeywords: [
    { word: 'System Design', importance: 'Critical', frequency: 'Appears in 92% of SDE roles' },
    { word: 'Microservices', importance: 'High', frequency: 'Appears in 85% of SDE roles' },
    { word: 'Docker', importance: 'High', frequency: 'Appears in 82% of SDE roles' },
    { word: 'Redis', importance: 'Medium', frequency: 'Appears in 65% of SDE roles' },
    { word: 'CI/CD', importance: 'Medium', frequency: 'Appears in 60% of SDE roles' }
  ],
  topMatchingKeywords: ['React', 'TypeScript', 'Node.js', 'Frontend', 'Backend'],
  keywordDensity: 'Optimal (2-3%)',

  sectionAnalysis: [
    {
      name: 'Professional Summary',
      score: 75,
      status: 'needs-work',
      strengths: ['Mentions total years of experience', 'Clear objective'],
      weaknesses: ['Generic wording', 'Lacks a strong hook'],
      suggestions: ['Add a highly quantifiable achievement', 'Remove generic buzzwords like "hard worker"'],
      beforeExample: 'Experienced software engineer looking for a challenging role in a fast-paced environment.',
      afterExample: 'Product-focused Software Engineer with 4+ years of experience building scalable React/Node applications serving 50k+ DAU.'
    },
    {
      name: 'Work Experience',
      score: 85,
      status: 'good',
      strengths: ['Uses bullet points effectively', 'Includes action verbs'],
      weaknesses: ['Missing measurable achievements in older roles', 'Some bullets are too long'],
      suggestions: ['Quantify the impact of your UI rewrite', 'Include team size for leadership context'],
      beforeExample: 'Worked on the backend API using Node.js and MongoDB.',
      afterExample: 'Developed scalable Node.js APIs serving over 20,000 requests daily, reducing latency by 35%.'
    },
    {
      name: 'Projects',
      score: 95,
      status: 'excellent',
      strengths: ['Links to GitHub repositories', 'Clearly separates frontend and backend tech stacks'],
      weaknesses: [],
      suggestions: ['Mention the number of active users if applicable'],
    },
    {
      name: 'Education',
      score: 100,
      status: 'excellent',
      strengths: ['Standard degree format', 'Cleanly structured'],
      weaknesses: [],
      suggestions: [],
    }
  ],

  suggestions: [
    {
      id: 's1',
      priority: 'high',
      title: 'Add measurable achievements',
      explanation: 'Recruiters want to see the impact of your work, not just your responsibilities.',
      impact: 'Significantly improves recruiter callback rate.',
      estimatedImprovement: '+6 ATS Points',
      icon: 'trending-up'
    },
    {
      id: 's2',
      priority: 'high',
      title: 'Include Cloud Technologies',
      explanation: 'AWS or Azure are requested in 80% of modern SDE roles. Adding any familiarity helps.',
      impact: 'Increases search visibility.',
      estimatedImprovement: '+4 ATS Points',
      icon: 'cloud'
    },
    {
      id: 's3',
      priority: 'medium',
      title: 'Enhance Professional Summary',
      explanation: 'Your summary is a bit generic. Tailor it to highlight your specialization in React/Node.',
      impact: 'Captures recruiter attention in the first 5 seconds.',
      estimatedImprovement: '+2 ATS Points',
      icon: 'user'
    },
    {
      id: 's4',
      priority: 'low',
      title: 'Add missing keyword: Jest',
      explanation: 'Testing frameworks are commonly scanned by ATS filters for mid-level roles.',
      impact: 'Slightly improves ATS parsing score.',
      estimatedImprovement: '+1 ATS Point',
      icon: 'check-square'
    }
  ],

  insights: [
    {
      id: 'i1',
      name: 'Recruiter Readability',
      score: 92,
      explanation: 'Excellent use of bullet points and whitespace. Easy to skim.',
      icon: 'eye'
    },
    {
      id: 'i2',
      name: 'ATS Compatibility',
      score: 98,
      explanation: 'Perfect single-column layout parsing. No corrupted text blocks.',
      icon: 'file-check'
    },
    {
      id: 'i3',
      name: 'Technical Strength',
      score: 85,
      explanation: 'Strong core stack, but lacking devops and cloud indicators.',
      icon: 'code'
    },
    {
      id: 'i4',
      name: 'Leadership Evidence',
      score: 45,
      explanation: 'Minimal indicators of mentoring, leading projects, or cross-functional collaboration.',
      icon: 'users'
    }
  ]
};
