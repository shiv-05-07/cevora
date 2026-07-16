import { Roadmap } from '@/types/roadmap';

export const mockRoadmaps: Roadmap[] = [
  {
    id: 'amazon-sde',
    title: 'Amazon SDE 1 Masterclass',
    company: 'Amazon',
    role: 'SDE 1',
    difficulty: 'Intermediate',
    estimatedDuration: '12 Weeks',
    completion: 0,
    rating: 4.8,
    studentsEnrolled: 12450,
    description: 'A comprehensive guide to cracking Amazon\'s Software Development Engineer interviews. Focuses heavily on Leadership Principles, scalable system design, and advanced Data Structures & Algorithms.',
    lastUpdated: '2026-07-10',
    streakDays: 4,
    skills: ['Java/C++', 'Data Structures', 'Algorithms', 'System Design', 'Leadership Principles'],
    prerequisites: ['Basic programming knowledge', 'Understanding of time/space complexity', 'Familiarity with Object-Oriented Programming'],
    learningOutcomes: [
      'Master the 16 Amazon Leadership Principles.',
      'Solve complex algorithmic problems efficiently under pressure.',
      'Design scalable and highly available distributed systems.',
      'Ace behavioral interviews using the STAR method.'
    ],
    mentorTips: [
      'Amazon heavily indexes on Leadership Principles. Do not underestimate behavioral rounds.',
      'For coding, always explain your brute force approach before optimizing.',
      'System design rounds expect you to drive the conversation.'
    ],
    projects: [
      { id: 'p1', title: 'Distributed Rate Limiter', description: 'Build a scalable rate limiter service using Redis and Java.', isCompleted: false }
    ],
    resources: [
      { id: 'r1', title: 'Grokking the System Design Interview', type: 'course', url: '#' },
      { id: 'r2', title: 'Amazon Leadership Principles Guide', type: 'article', url: '#' }
    ],
    modules: [
      {
        id: 'amz-m1',
        title: 'Arrays & Strings Deep Dive',
        description: 'Master sliding windows, two pointers, and prefix sums.',
        progress: 0, estimatedTime: '2 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'a1', title: 'Introduction to Arrays & Memory Map', type: 'video', duration: '20m', isCompleted: true },
          { id: 'a2', title: 'Time Complexity Analysis', type: 'reading', duration: '15m', isCompleted: true },
          { id: 'a3', title: 'Prefix Sum Technique', type: 'video', duration: '30m', isCompleted: true },
          { id: 'a4', title: 'Sliding Window Pattern', type: 'practice', duration: '45m', isCompleted: true },
          { id: 'a5', title: 'Two Pointers Concept', type: 'video', duration: '25m', isCompleted: true },
          { id: 'a6', title: 'Binary Search on Arrays', type: 'practice', duration: '50m', isCompleted: true },
          { id: 'a7', title: 'Kadane\'s Algorithm', type: 'video', duration: '35m', isCompleted: true },
          { id: 'a8', title: 'Matrix Problems & Traversal', type: 'practice', duration: '1h', isCompleted: true },
          { id: 'a9', title: 'Practice Set: Top 50 Array Problems', type: 'assignment', duration: '2h', isCompleted: true },
          { id: 'a10', title: 'Weekly Contest 1', type: 'quiz', duration: '1h 30m', isCompleted: true },
          { id: 'a11', title: 'Module Revision', type: 'reading', duration: '30m', isCompleted: true },
          { id: 'a12', title: 'Final Assessment: Arrays', type: 'project', duration: '1h', isCompleted: true }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'amz-m2',
        title: 'Graphs & Trees',
        description: 'BFS, DFS, Dijkstra, and advanced tree traversals.',
        progress: 0, estimatedTime: '3 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 't1', title: 'Binary Tree Traversals (In, Pre, Post)', type: 'video', duration: '40m', isCompleted: true },
          { id: 't2', title: 'Lowest Common Ancestor', type: 'practice', duration: '35m', isCompleted: true },
          { id: 't3', title: 'Trie Data Structure Implementation', type: 'project', duration: '1h 15m', isCompleted: true },
          { id: 't4', title: 'Graph Representations (Adjacency List/Matrix)', type: 'reading', duration: '20m', isCompleted: false },
          { id: 't5', title: 'BFS & DFS Algorithms', type: 'video', duration: '50m', isCompleted: false },
          { id: 't6', title: 'Topological Sort', type: 'practice', duration: '45m', isCompleted: false },
          { id: 't7', title: 'Dijkstra\'s Shortest Path', type: 'video', duration: '1h', isCompleted: false },
          { id: 't8', title: 'Assessment: Trees & Graphs', type: 'quiz', duration: '45m', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'amz-m3',
        title: 'Dynamic Programming',
        description: 'Conquer 1D and 2D DP problems.',
        progress: 0, estimatedTime: '2 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'd1', title: 'Memoization vs Tabulation', type: 'reading', duration: '30m', isCompleted: false },
          { id: 'd2', title: '1D DP: Climbing Stairs', type: 'practice', duration: '25m', isCompleted: false },
          { id: 'd3', title: '1D DP: House Robber', type: 'practice', duration: '35m', isCompleted: false },
          { id: 'd4', title: '2D DP: Knapsack Problem Variations', type: 'video', duration: '1h 10m', isCompleted: false },
          { id: 'd5', title: '2D DP: Longest Common Subsequence', type: 'practice', duration: '45m', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'amz-m4',
        title: 'Leadership Principles & Behavioral',
        description: 'Master the STAR method and align your stories with Amazon\'s LPs.',
        progress: 0, estimatedTime: '1 Week', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'lp1', title: 'Customer Obsession & Ownership', type: 'video', duration: '40m', isCompleted: false },
          { id: 'lp2', title: 'Invent & Simplify', type: 'reading', duration: '20m', isCompleted: false },
          { id: 'lp3', title: 'Are Right, A Lot', type: 'video', duration: '30m', isCompleted: false },
          { id: 'lp4', title: 'Deliver Results (STAR Mock)', type: 'assignment', duration: '1h', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'amz-m5',
        title: 'System Design',
        description: 'Design scalable distributed systems.',
        progress: 0, estimatedTime: '3 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'sd1', title: 'Vertical vs Horizontal Scaling', type: 'video', duration: '30m', isCompleted: false },
          { id: 'sd2', title: 'Load Balancing & Caching', type: 'video', duration: '45m', isCompleted: false },
          { id: 'sd3', title: 'Database Sharding', type: 'reading', duration: '25m', isCompleted: false },
          { id: 'sd4', title: 'Design a URL Shortener', type: 'project', duration: '1h 30m', isCompleted: false },
          { id: 'sd5', title: 'Design Twitter/X', type: 'project', duration: '2h', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      }
    ]
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Developer Roadmap',
    role: 'Frontend Engineer',
    difficulty: 'Beginner',
    estimatedDuration: '14 Weeks',
    completion: 0,
    rating: 4.9,
    studentsEnrolled: 42000,
    description: 'The definitive path to becoming a modern frontend engineer. Learn HTML, CSS, JavaScript, React, Next.js, and web performance optimization.',
    lastUpdated: '2026-07-01',
    streakDays: 12,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind', 'TypeScript'],
    prerequisites: ['Basic computer literacy', 'Understanding of how the internet works'],
    learningOutcomes: [
      'Build responsive, accessible, and beautiful user interfaces.',
      'Master state management and component architecture in React.',
      'Implement Server-Side Rendering (SSR) with Next.js.',
      'Optimize web vitals for maximum performance.'
    ],
    mentorTips: [
      'Do not rush to React. Make sure your JavaScript fundamentals are absolutely solid first.',
      'Accessibility (a11y) is not optional. Learn semantic HTML early.'
    ],
    projects: [],
    resources: [],
    modules: [
      {
        id: 'fe-m1',
        title: 'HTML & Semantic Web',
        description: 'The skeleton of the internet.',
        progress: 0, estimatedTime: '1 Week', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'f1', title: 'HTML5 Boilerplate & Document Structure', type: 'reading', duration: '15m', isCompleted: true },
          { id: 'f2', title: 'Semantic Tags (header, main, article)', type: 'video', duration: '25m', isCompleted: true },
          { id: 'f3', title: 'Forms and Input Validations', type: 'practice', duration: '40m', isCompleted: true },
          { id: 'f4', title: 'Accessibility (a11y) Basics', type: 'video', duration: '35m', isCompleted: true },
          { id: 'f5', title: 'Build a Semantic Portfolio Outline', type: 'project', duration: '1h', isCompleted: true }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'fe-m2',
        title: 'CSS & Responsive Design',
        description: 'Styling, Flexbox, Grid, and Animations.',
        progress: 0, estimatedTime: '2 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'f6', title: 'The Box Model & Selectors', type: 'video', duration: '45m', isCompleted: true },
          { id: 'f7', title: 'Flexbox Deep Dive', type: 'practice', duration: '1h', isCompleted: true },
          { id: 'f8', title: 'CSS Grid Architecture', type: 'video', duration: '50m', isCompleted: true },
          { id: 'f9', title: 'Media Queries & Mobile-First', type: 'reading', duration: '30m', isCompleted: true },
          { id: 'f10', title: 'CSS Transitions & Keyframes', type: 'practice', duration: '40m', isCompleted: true },
          { id: 'f11', title: 'Build a Responsive Dashboard Layout', type: 'project', duration: '2h', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'fe-m3',
        title: 'Advanced JavaScript (ES6+)',
        description: 'Closures, Promises, and the Event Loop.',
        progress: 0, estimatedTime: '3 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'f12', title: 'Let, Const, and Block Scoping', type: 'reading', duration: '20m', isCompleted: false },
          { id: 'f13', title: 'Arrow Functions & Lexical This', type: 'video', duration: '35m', isCompleted: false },
          { id: 'f14', title: 'Destructuring & Spread Syntax', type: 'practice', duration: '30m', isCompleted: false },
          { id: 'f15', title: 'Closures & Higher Order Functions', type: 'video', duration: '55m', isCompleted: false },
          { id: 'f16', title: 'Asynchronous JS (Promises & Async/Await)', type: 'practice', duration: '1h', isCompleted: false },
          { id: 'f17', title: 'The Javascript Event Loop', type: 'video', duration: '45m', isCompleted: false },
          { id: 'f18', title: 'JS Fundamentals Quiz', type: 'quiz', duration: '30m', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'fe-m4',
        title: 'React.js & State Management',
        description: 'Components, Hooks, and Context.',
        progress: 0, estimatedTime: '4 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'f19', title: 'Thinking in React', type: 'reading', duration: '25m', isCompleted: false },
          { id: 'f20', title: 'JSX & Component Lifecycle', type: 'video', duration: '40m', isCompleted: false },
          { id: 'f21', title: 'useState & useEffect in depth', type: 'practice', duration: '1h 15m', isCompleted: false },
          { id: 'f22', title: 'Custom Hooks Architecture', type: 'video', duration: '50m', isCompleted: false },
          { id: 'f23', title: 'Context API & Redux Toolkit', type: 'video', duration: '1h 30m', isCompleted: false },
          { id: 'f24', title: 'Build a Kanban Board App', type: 'project', duration: '3h', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      }
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI & Machine Learning Engineer',
    role: 'AI Engineer',
    difficulty: 'Advanced',
    estimatedDuration: '24 Weeks',
    completion: 0,
    rating: 4.7,
    studentsEnrolled: 18500,
    description: 'Master the foundations of Machine Learning, Deep Learning, Transformers, and Large Language Models (LLMs). Deploy production AI systems.',
    lastUpdated: '2026-07-15',
    streakDays: 0,
    skills: ['Python', 'PyTorch', 'TensorFlow', 'NLP', 'Transformers', 'MLOps'],
    prerequisites: ['Strong Python proficiency', 'Calculus & Linear Algebra', 'Probability & Statistics'],
    learningOutcomes: [
      'Implement neural networks from scratch.',
      'Train and fine-tune Transformer models (BERT, GPT).',
      'Deploy models using FastAPI and Docker.',
      'Implement RAG (Retrieval-Augmented Generation) architectures.'
    ],
    mentorTips: [
      'Don\'t just use high-level APIs like HuggingFace. Build a basic Transformer block from scratch to truly understand it.',
      'Data quality is more important than model architecture.'
    ],
    projects: [],
    resources: [],
    modules: [
      {
        id: 'ai-m1',
        title: 'Python Data Science Stack',
        description: 'NumPy, Pandas, and Matplotlib.',
        progress: 0, estimatedTime: '2 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'ai1', title: 'Vectorization with NumPy', type: 'video', duration: '45m', isCompleted: true },
          { id: 'ai2', title: 'Broadcasting & Matrix Math', type: 'practice', duration: '1h', isCompleted: true },
          { id: 'ai3', title: 'Data Wrangling with Pandas', type: 'video', duration: '1h 15m', isCompleted: true },
          { id: 'ai4', title: 'Handling Missing Data', type: 'practice', duration: '40m', isCompleted: false },
          { id: 'ai5', title: 'Exploratory Data Analysis Project', type: 'project', duration: '2h', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'ai-m2',
        title: 'Machine Learning Foundations',
        description: 'Supervised and Unsupervised Learning algorithms.',
        progress: 0, estimatedTime: '4 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'ai6', title: 'Linear & Logistic Regression', type: 'video', duration: '1h', isCompleted: false },
          { id: 'ai7', title: 'Gradient Descent Optimization', type: 'reading', duration: '35m', isCompleted: false },
          { id: 'ai8', title: 'Decision Trees & Random Forests', type: 'video', duration: '50m', isCompleted: false },
          { id: 'ai9', title: 'Support Vector Machines (SVM)', type: 'practice', duration: '45m', isCompleted: false },
          { id: 'ai10', title: 'K-Means Clustering', type: 'video', duration: '40m', isCompleted: false },
          { id: 'ai11', title: 'Build a Churn Prediction Model', type: 'project', duration: '2h', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'ai-m3',
        title: 'Deep Learning & PyTorch',
        description: 'Neural Networks, CNNs, and RNNs.',
        progress: 0, estimatedTime: '5 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'ai12', title: 'Perceptrons & Activation Functions', type: 'video', duration: '40m', isCompleted: false },
          { id: 'ai13', title: 'Backpropagation Calculus', type: 'reading', duration: '1h', isCompleted: false },
          { id: 'ai14', title: 'PyTorch Tensors & Autograd', type: 'practice', duration: '1h 15m', isCompleted: false },
          { id: 'ai15', title: 'Convolutional Neural Networks (CNN)', type: 'video', duration: '1h 30m', isCompleted: false },
          { id: 'ai16', title: 'Image Classification Project', type: 'project', duration: '3h', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      },
      {
        id: 'ai-m4',
        title: 'Transformers & LLMs',
        description: 'Attention mechanisms and Large Language Models.',
        progress: 0, estimatedTime: '6 Weeks', status: 'Not Started', completedLessons: 0, totalLessons: 0,
        lessons: [
          { id: 'ai17', title: 'Sequence to Sequence Models', type: 'video', duration: '50m', isCompleted: false },
          { id: 'ai18', title: 'The Self-Attention Mechanism', type: 'reading', duration: '45m', isCompleted: false },
          { id: 'ai19', title: 'Transformer Architecture (Attention is All You Need)', type: 'video', duration: '1h 30m', isCompleted: false },
          { id: 'ai20', title: 'Fine-Tuning BERT with HuggingFace', type: 'practice', duration: '2h', isCompleted: false },
          { id: 'ai21', title: 'RAG (Retrieval-Augmented Generation)', type: 'video', duration: '1h', isCompleted: false },
          { id: 'ai22', title: 'Build a Custom Knowledge Chatbot', type: 'project', duration: '4h', isCompleted: false }
        ],
        miniProjects: [], practiceLinks: []
      }
    ]
  }
];
