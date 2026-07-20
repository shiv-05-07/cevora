import { Project, Certification, EducationItem, ExperienceItem } from '@/types/profile';

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Cevora Core Platform',
    description: 'An AI-powered placement intelligence platform enabling students to track roadmap progress, perform resume ATS scans, and run mock interviews.',
    status: 'In Progress',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Prisma'],
    githubUrl: 'https://github.com/cevora/core',
    demoUrl: 'https://cevora.co',
    pinned: true,
    coverImage: '/projects/cevora.png',
    teamSize: 'Team',
    featured: true
  },
  {
    id: 'p2',
    name: 'Distributed Task Queue',
    description: 'A high-throughput distributed task scheduler built from scratch using Go and Redis with automatic retry and dead-letter queue management.',
    status: 'Completed',
    techStack: ['Go', 'Redis', 'Docker', 'gRPC'],
    githubUrl: 'https://github.com/example/task-queue',
    pinned: true,
    coverImage: '/projects/queue.png',
    teamSize: 'Solo',
    featured: true
  },
  {
    id: 'p3',
    name: 'Self-Hosting Analytics Engine',
    description: 'Privacy-focused web analytics client and server dashboard. Process millions of events per hour using Go and ClickHouse.',
    status: 'Completed',
    techStack: ['Go', 'ClickHouse', 'React', 'Docker'],
    githubUrl: 'https://github.com/example/analytics',
    pinned: false,
    coverImage: '/projects/analytics.png',
    teamSize: 'Solo',
    featured: false
  }
];

export const mockCertifications: Certification[] = [
  {
    id: 'cert1',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    completionDate: 'Jan 2025',
    credentialId: 'AWS-ASA-998877',
    verifyUrl: 'https://aws.amazon.com/verification'
  },
  {
    id: 'cert2',
    name: 'Google Cloud Certified Associate Cloud Engineer',
    issuer: 'Google Cloud',
    completionDate: 'Nov 2024',
    credentialId: 'GCP-ACE-112233',
    verifyUrl: 'https://cloud.google.com/certification'
  },
  {
    id: 'cert3',
    name: 'Algorithmic Toolbox',
    issuer: 'UC San Diego & HSE University (Coursera)',
    completionDate: 'Jul 2024',
    credentialId: 'COURSERA-ALG-4455',
    verifyUrl: 'https://coursera.org/verify'
  }
];

export const mockEducation: EducationItem[] = [
  {
    id: 'edu1',
    institution: 'Tech University',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
    cgpa: '8.5 / 10.0',
    duration: '2022 - 2026'
  }
];

export const mockExperience: ExperienceItem[] = [
  {
    id: 'exp1',
    role: 'Backend Engineering Intern',
    company: 'TechCorp Solutions',
    duration: 'May 2025 - Jul 2025',
    description: 'Designed and optimized RESTful APIs in Node.js and Express. Refactored SQL queries yielding a 35% reduction in response latency.',
    type: 'Internship'
  },
  {
    id: 'exp2',
    role: 'Core Contributor',
    company: 'FastAPI Open Source Project',
    duration: 'Jan 2024 - Present',
    description: 'Contributed multiple bug fixes and optimizations to the core router, improving query param serialization speed.',
    type: 'Open Source'
  }
];
