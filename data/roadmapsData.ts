import { Roadmap } from '@/types/roadmap';

export const roadmapsData: Roadmap[] = [
  {
    id: 'amazon-sde-1',
    slug: 'amazon-sde-1',
    title: 'Amazon SDE 1 Interview Roadmap',
    company: 'Amazon',
    role: 'Software Development Engineer I',
    difficulty: 'Intermediate',
    estimatedDuration: '12 weeks',
    description: 'A structured preparation path for candidates targeting entry-level software engineering roles, with emphasis on coding interviews, problem solving, system design fundamentals and behavioral preparation.',
    skills: ['Java', 'Data Structures', 'Algorithms', 'System Design', 'Behavioral STAR'],
    prerequisites: ['Basic programming syntax in Java, C++ or Python', 'Understanding of basic object-oriented concepts'],
    learningOutcomes: [
      'Build confidence with core data structures and time complexity analysis',
      'Solve common algorithmic interview patterns efficiently',
      'Understand fundamental distributed system design concepts',
      'Practice behavioral interview frameworks using the STAR method',
      'Establish a disciplined daily interview preparation routine',
      'Know key revision topics before your SDE 1 technical rounds'
    ],
    modules: [
      {
        id: 'amz-mod-1',
        title: 'Programming Foundations',
        description: 'Master core object-oriented principles, memory management, and baseline algorithmic complexity.',
        order: 1,
        lessons: [
          {
            id: 'amz-l-101',
            title: 'Object-Oriented Programming Principles',
            description: 'Learn encapsulation, inheritance, polymorphism, and abstraction with interview examples.',
            resourceType: 'documentation',
            resourceUrl: 'https://docs.oracle.com/javase/tutorial/java/concepts/',
            order: 1
          },
          {
            id: 'amz-l-102',
            title: 'Big-O Time and Space Complexity Analysis',
            description: 'Analyze algorithm asymptotic bounds, best/worst case bounds, and space tradeoffs.',
            resourceType: 'article',
            resourceUrl: 'https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/',
            order: 2
          },
          {
            id: 'amz-l-103',
            title: 'Memory Allocation & Pointers / References',
            description: 'Understand stack vs heap memory allocation, garbage collection, and reference variables.',
            resourceType: 'article',
            resourceUrl: 'https://www.baeldung.com/java-stack-heap',
            order: 3
          }
        ]
      },
      {
        id: 'amz-mod-2',
        title: 'Arrays, Strings & Hashing',
        description: 'Learn array manipulation, hashing techniques, two pointers, sliding windows, and string algorithms.',
        order: 2,
        lessons: [
          {
            id: 'amz-l-201',
            title: 'Arrays & Memory Map Fundamentals',
            description: 'Learn memory layout, indexing, sub-arrays, and in-place array manipulation.',
            resourceType: 'youtube',
            resourceUrl: 'https://www.youtube.com/watch?v=pkYVOmU3MgA',
            order: 1
          },
          {
            id: 'amz-l-202',
            title: 'Hash Maps & Hash Sets',
            description: 'Master hash collisions, load factors, frequency maps, and O(1) lookups.',
            resourceType: 'documentation',
            resourceUrl: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html',
            order: 2
          },
          {
            id: 'amz-l-203',
            title: 'Two Pointers Technique',
            description: 'Implement left-right and slow-fast pointer strategies for sorted arrays and palindromes.',
            resourceType: 'practice',
            resourceUrl: 'https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/703/arraystrings/4501/',
            order: 3
          },
          {
            id: 'amz-l-204',
            title: 'Sliding Window Pattern',
            description: 'Learn fixed and variable sliding window patterns for contiguous sub-array optimization.',
            resourceType: 'practice',
            resourceUrl: 'https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/703/arraystrings/4502/',
            order: 4
          },
          {
            id: 'amz-l-205',
            title: 'Prefix Sums & Range Queries',
            description: 'Precompute array cumulative sums for constant-time sub-array sum queries.',
            resourceType: 'article',
            resourceUrl: 'https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/',
            order: 5
          }
        ]
      },
      {
        id: 'amz-mod-3',
        title: 'Linked Lists, Stacks & Queues',
        description: 'Implement linear linked data structures, monotonic stacks, and custom queue buffers.',
        order: 3,
        lessons: [
          {
            id: 'amz-l-301',
            title: 'Singly and Doubly Linked Lists',
            description: 'Master list traversal, reversal, cycle detection, and merge operations.',
            resourceType: 'youtube',
            resourceUrl: 'https://www.youtube.com/watch?v=pkYVOmU3MgA',
            order: 1
          },
          {
            id: 'amz-l-302',
            title: 'Stack Operations & Monotonic Stack',
            description: 'Solve next greater element and expression parsing using LIFO stack structures.',
            resourceType: 'practice',
            resourceUrl: 'https://leetcode.com/tag/monotonic-stack/',
            order: 2
          },
          {
            id: 'amz-l-303',
            title: 'Queues & Priority Queues (Heaps)',
            description: 'Use FIFO queues and min/max binary heaps for top-K element problems.',
            resourceType: 'documentation',
            resourceUrl: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/PriorityQueue.html',
            order: 3
          }
        ]
      },
      {
        id: 'amz-mod-4',
        title: 'Trees, Graphs & Algorithms',
        description: 'Traverse binary trees, graphs, and implement topological sorting and shortest path algorithms.',
        order: 4,
        lessons: [
          {
            id: 'amz-l-401',
            title: 'Binary Search Trees & Traversals',
            description: 'Master DFS (pre-order, in-order, post-order) and BFS level-order traversals.',
            resourceType: 'youtube',
            resourceUrl: 'https://www.youtube.com/watch?v=pkYVOmU3MgA',
            order: 1
          },
          {
            id: 'amz-l-402',
            title: 'Graph Representations & BFS / DFS',
            description: 'Build adjacency lists and implement graph traversals for connected components.',
            resourceType: 'article',
            resourceUrl: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
            order: 2
          },
          {
            id: 'amz-l-403',
            title: 'Dijkstra & Shortest Path Algorithms',
            description: 'Find shortest paths on weighted non-negative edge graphs.',
            resourceType: 'practice',
            resourceUrl: 'https://leetcode.com/tag/shortest-path/',
            order: 3
          }
        ]
      },
      {
        id: 'amz-mod-5',
        title: 'System Design Fundamentals',
        description: 'Understand horizontal scaling, caching strategies, load balancing, and database choices.',
        order: 5,
        lessons: [
          {
            id: 'amz-l-501',
            title: 'Scalability & Load Balancing',
            description: 'Understand vertical vs horizontal scaling, DNS round-robin, and reverse proxies.',
            resourceType: 'official',
            resourceUrl: 'https://github.com/donnemartin/system-design-primer#load-balancer',
            order: 1
          },
          {
            id: 'amz-l-502',
            title: 'Caching Strategies & Redis',
            description: 'Learn write-through, write-around, and cache eviction algorithms (LRU/LFU).',
            resourceType: 'official',
            resourceUrl: 'https://github.com/donnemartin/system-design-primer#cache',
            order: 2
          },
          {
            id: 'amz-l-503',
            title: 'SQL vs NoSQL Database Choices',
            description: 'Compare relational consistency against key-value and document store scalability.',
            resourceType: 'article',
            resourceUrl: 'https://aws.amazon.com/nosql/',
            order: 3
          }
        ]
      },
      {
        id: 'amz-mod-6',
        title: 'Behavioral & Interview Preparation',
        description: 'Prepare behavioral stories aligned with leadership principles using the STAR framework.',
        order: 6,
        lessons: [
          {
            id: 'amz-l-601',
            title: 'The STAR Method for Behavioral Questions',
            description: 'Format your technical project experiences into Situation, Task, Action, and Result.',
            resourceType: 'article',
            resourceUrl: 'https://www.inc.com/the-muse/star-method-interview-questions.html',
            order: 1
          },
          {
            id: 'amz-l-602',
            title: 'Mock Coding Interview Routine',
            description: 'Practice communicating your thought process out loud before typing solution code.',
            resourceType: 'practice',
            resourceUrl: 'https://leetcode.com/interview/',
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: 'frontend-developer',
    slug: 'frontend-developer',
    title: 'Frontend Developer Roadmap',
    company: null,
    role: 'Frontend Developer',
    difficulty: 'Beginner',
    estimatedDuration: '16 weeks',
    description: 'Learn modern web frontend development step by step from HTML, CSS, and modern JavaScript to component architecture in React.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'DOM APIs', 'Git'],
    prerequisites: ['Basic computer literacy', 'Web browser and text editor installed'],
    learningOutcomes: [
      'Write clean, accessible, semantic HTML5 markup',
      'Create responsive UI layouts using CSS Flexbox and Grid',
      'Master modern JavaScript ES6+ features and async programming',
      'Interact confidently with browser DOM APIs and HTTP requests',
      'Build dynamic single-page web applications with React',
      'Use Git version control and deploy live websites'
    ],
    modules: [
      {
        id: 'fe-mod-1',
        title: 'HTML & Web Fundamentals',
        description: 'Understand HTTP, web browsers, semantic tags, forms, and web accessibility fundamentals.',
        order: 1,
        lessons: [
          {
            id: 'fe-l-101',
            title: 'How the Web Works',
            description: 'Learn clients, servers, DNS lookups, and the request-response cycle.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works',
            order: 1
          },
          {
            id: 'fe-l-102',
            title: 'HTML5 Semantic Markup',
            description: 'Use header, nav, main, article, section, and footer elements correctly.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics',
            order: 2
          },
          {
            id: 'fe-l-103',
            title: 'HTML Forms & Inputs',
            description: 'Build user input forms with validation attributes and accessible labels.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Forms',
            order: 3
          }
        ]
      },
      {
        id: 'fe-mod-2',
        title: 'CSS & Responsive Design',
        description: 'Master styling, CSS Box Model, Flexbox layout, CSS Grid, and mobile-first responsive design.',
        order: 2,
        lessons: [
          {
            id: 'fe-l-201',
            title: 'The CSS Box Model',
            description: 'Understand content, padding, border, margin, and box-sizing: border-box.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model',
            order: 1
          },
          {
            id: 'fe-l-202',
            title: 'Flexbox Layouts',
            description: 'Master flex direction, alignment, justification, wrapping, and flex item sizing.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox',
            order: 2
          },
          {
            id: 'fe-l-203',
            title: 'CSS Grid System',
            description: 'Build complex two-dimensional web layouts with CSS Grid tracks and template areas.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids',
            order: 3
          }
        ]
      },
      {
        id: 'fe-mod-3',
        title: 'JavaScript Fundamentals',
        description: 'Variables, data types, control flow, functions, objects, arrays, and ES6+ features.',
        order: 3,
        lessons: [
          {
            id: 'fe-l-301',
            title: 'Variables, Scope & Data Types',
            description: 'Master let, const, block scoping, primitives, and object references.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types',
            order: 1
          },
          {
            id: 'fe-l-302',
            title: 'Array Methods & Iteration',
            description: 'Transform data using map, filter, reduce, find, and forEach.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
            order: 2
          }
        ]
      },
      {
        id: 'fe-mod-4',
        title: 'DOM & Browser APIs',
        description: 'Manipulate the HTML DOM, handle user events, and make asynchronous fetch requests.',
        order: 4,
        lessons: [
          {
            id: 'fe-l-401',
            title: 'Selecting & Manipulating DOM Elements',
            description: 'Query elements and update classes, styles, and text dynamically.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents',
            order: 1
          },
          {
            id: 'fe-l-402',
            title: 'Fetch API & Async JavaScript',
            description: 'Consume JSON APIs asynchronously using promises and async/await.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
            order: 2
          }
        ]
      },
      {
        id: 'fe-mod-5',
        title: 'React',
        description: 'Build user interfaces with JSX, components, props, state, effects, and custom hooks.',
        order: 5,
        lessons: [
          {
            id: 'fe-l-501',
            title: 'React Components & JSX',
            description: 'Write declarative component markup with embedded JavaScript expressions.',
            resourceType: 'official',
            resourceUrl: 'https://react.dev/learn/your-first-component',
            order: 1
          },
          {
            id: 'fe-l-502',
            title: 'State & Event Handling (useState)',
            description: 'Manage component memory and respond to user interactions.',
            resourceType: 'official',
            resourceUrl: 'https://react.dev/learn/state-a-components-memory',
            order: 2
          },
          {
            id: 'fe-l-503',
            title: 'Side Effects & Data Fetching (useEffect)',
            description: 'Synchronize components with external APIs and cleanup resources.',
            resourceType: 'official',
            resourceUrl: 'https://react.dev/learn/synchronizing-with-effects',
            order: 3
          }
        ]
      },
      {
        id: 'fe-mod-6',
        title: 'Git, Testing & Deployment',
        description: 'Version control your codebase with Git and host static web applications online.',
        order: 6,
        lessons: [
          {
            id: 'fe-l-601',
            title: 'Git Basics & Commit Workflow',
            description: 'Initialize repositories, stage changes, commit, branch, and push to GitHub.',
            resourceType: 'documentation',
            resourceUrl: 'https://git-scm.com/book/en/v2/Getting-Started-Git-Basics',
            order: 1
          },
          {
            id: 'fe-l-602',
            title: 'Deploying Static Web Apps',
            description: 'Host static single-page apps for free using Vercel or Netlify.',
            resourceType: 'documentation',
            resourceUrl: 'https://vercel.com/docs',
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: 'backend-developer',
    slug: 'backend-developer',
    title: 'Backend Developer Roadmap',
    company: null,
    role: 'Backend Developer',
    difficulty: 'Intermediate',
    estimatedDuration: '18 weeks',
    description: 'Learn server-side application development, HTTP protocol principles, API construction, database modeling, and server deployment.',
    skills: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'SQL', 'JWT Auth'],
    prerequisites: ['Basic JavaScript or programming experience', 'Understanding of basic terminal commands'],
    learningOutcomes: [
      'Understand client-server architecture and HTTP mechanics',
      'Design clean, RESTful web APIs',
      'Model relational schemas and query databases with SQL',
      'Implement secure user authentication with JWT and bcrypt',
      'Optimize server caching and query execution times',
      'Containerize and deploy backend services'
    ],
    modules: [
      {
        id: 'be-mod-1',
        title: 'Programming & HTTP Fundamentals',
        description: 'Understand Node.js event loop, asynchronous IO, HTTP methods, headers, and status codes.',
        order: 1,
        lessons: [
          {
            id: 'be-l-101',
            title: 'Node.js Runtime & Event Loop',
            description: 'Learn how non-blocking asynchronous IO operates under the hood.',
            resourceType: 'official',
            resourceUrl: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick',
            order: 1
          },
          {
            id: 'be-l-102',
            title: 'HTTP Protocol & Headers',
            description: 'Understand GET, POST, PUT, DELETE, status codes, and HTTP request headers.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
            order: 2
          }
        ]
      },
      {
        id: 'be-mod-2',
        title: 'REST APIs',
        description: 'Design and build structured RESTful API endpoints using Express.js middleware.',
        order: 2,
        lessons: [
          {
            id: 'be-l-201',
            title: 'Express.js Routing & Middleware',
            description: 'Build custom middleware pipelines for parsing JSON, logging, and error handling.',
            resourceType: 'documentation',
            resourceUrl: 'https://expressjs.com/en/guide/using-middleware.html',
            order: 1
          },
          {
            id: 'be-l-202',
            title: 'RESTful API Naming & Structure',
            description: 'Organize resources, query parameters, route parameters, and standard response payloads.',
            resourceType: 'article',
            resourceUrl: 'https://restfulapi.net/',
            order: 2
          }
        ]
      },
      {
        id: 'be-mod-3',
        title: 'Databases & SQL',
        description: 'Master relational database modeling, normalization, SQL queries, joins, and indexing.',
        order: 3,
        lessons: [
          {
            id: 'be-l-301',
            title: 'Relational Database Schema Design',
            description: 'Design normalized tables with primary keys, foreign keys, and integrity constraints.',
            resourceType: 'documentation',
            resourceUrl: 'https://www.postgresql.org/docs/current/tutorial-table.html',
            order: 1
          },
          {
            id: 'be-l-302',
            title: 'SQL Queries, Joins & Aggregations',
            description: 'Write SELECT queries with INNER JOIN, LEFT JOIN, GROUP BY, and aggregate functions.',
            resourceType: 'documentation',
            resourceUrl: 'https://www.postgresql.org/docs/current/tutorial-select.html',
            order: 2
          }
        ]
      },
      {
        id: 'be-mod-4',
        title: 'Authentication & Authorization',
        description: 'Implement password hashing, session tokens, JSON Web Tokens (JWT), and role-based access control.',
        order: 4,
        lessons: [
          {
            id: 'be-l-401',
            title: 'Password Hashing with bcrypt',
            description: 'Hash user passwords securely with salting before saving to storage.',
            resourceType: 'article',
            resourceUrl: 'https://auth0.com/blog/hashing-passwords-one-way-functional-security/',
            order: 1
          },
          {
            id: 'be-l-402',
            title: 'JSON Web Token (JWT) Authentication',
            description: 'Issue, sign, verify, and pass bearer tokens in authorization headers.',
            resourceType: 'documentation',
            resourceUrl: 'https://jwt.io/introduction',
            order: 2
          }
        ]
      },
      {
        id: 'be-mod-5',
        title: 'Caching & Performance',
        description: 'Accelerate response times using Redis in-memory caching and database index optimization.',
        order: 5,
        lessons: [
          {
            id: 'be-l-501',
            title: 'In-Memory Caching with Redis',
            description: 'Store frequent API responses in Redis key-value memory cache.',
            resourceType: 'documentation',
            resourceUrl: 'https://redis.io/docs/manual/client-side-caching/',
            order: 1
          }
        ]
      },
      {
        id: 'be-mod-6',
        title: 'Testing & Deployment',
        description: 'Write API integration tests and deploy server processes to cloud environments.',
        order: 6,
        lessons: [
          {
            id: 'be-l-601',
            title: 'Backend API Testing with Jest',
            description: 'Test API routes, status codes, and database responses automatically.',
            resourceType: 'documentation',
            resourceUrl: 'https://jestjs.io/docs/getting-started',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'full-stack-developer',
    slug: 'full-stack-developer',
    title: 'Full Stack Developer Roadmap',
    company: null,
    role: 'Full Stack Developer',
    difficulty: 'Intermediate',
    estimatedDuration: '24 weeks',
    description: 'Master full-stack web application development across client frontend, server backend, relational databases, authentication, and continuous deployment.',
    skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    prerequisites: ['HTML/CSS basics', 'Programming logic fundamentals'],
    learningOutcomes: [
      'Build modern single-page and server-rendered web frontends',
      'Develop scalable REST and GraphQL APIs',
      'Manage database models, migrations, and transactions',
      'Wire secure full-stack authentication flows',
      'Deploy full-stack web applications to cloud infrastructure'
    ],
    modules: [
      {
        id: 'fs-mod-1',
        title: 'HTML & CSS Foundations',
        description: 'Modern HTML5 structural markup and responsive CSS styling.',
        order: 1,
        lessons: [
          {
            id: 'fs-l-101',
            title: 'HTML5 & CSS Layouts',
            description: 'Build mobile-responsive grid and flex layouts.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS',
            order: 1
          }
        ]
      },
      {
        id: 'fs-mod-2',
        title: 'JavaScript & TypeScript',
        description: 'Modern ES6+ JavaScript syntax and static typing with TypeScript.',
        order: 2,
        lessons: [
          {
            id: 'fs-l-201',
            title: 'TypeScript Basics for Fullstack Devs',
            description: 'Add static type definitions, interfaces, and generics to JavaScript.',
            resourceType: 'documentation',
            resourceUrl: 'https://www.typescriptlang.org/docs/handbook/intro.html',
            order: 1
          }
        ]
      },
      {
        id: 'fs-mod-3',
        title: 'React Frontend Architecture',
        description: 'Component architecture, state management, hooks, and routing.',
        order: 3,
        lessons: [
          {
            id: 'fs-l-301',
            title: 'Building Modern React UIs',
            description: 'Manage component hierarchy, state flow, and user events.',
            resourceType: 'official',
            resourceUrl: 'https://react.dev/learn',
            order: 1
          }
        ]
      },
      {
        id: 'fs-mod-4',
        title: 'Node.js Backend APIs',
        description: 'Build backend web servers and API endpoints with Node.js.',
        order: 4,
        lessons: [
          {
            id: 'fs-l-401',
            title: 'Express Server Development',
            description: 'Build REST endpoints and handle JSON HTTP requests.',
            resourceType: 'documentation',
            resourceUrl: 'https://expressjs.com/',
            order: 1
          }
        ]
      },
      {
        id: 'fs-mod-5',
        title: 'PostgreSQL & Database ORMs',
        description: 'Relational data modeling, Prisma ORM queries, and migrations.',
        order: 5,
        lessons: [
          {
            id: 'fs-l-501',
            title: 'Prisma ORM & PostgreSQL Integration',
            description: 'Define Prisma schemas, create migrations, and query databases safely.',
            resourceType: 'documentation',
            resourceUrl: 'https://www.prisma.io/docs/getting-started',
            order: 1
          }
        ]
      },
      {
        id: 'fs-mod-6',
        title: 'Authentication & APIs',
        description: 'Full-stack user login, sessions, JWT tokens, and protected routes.',
        order: 6,
        lessons: [
          {
            id: 'fs-l-601',
            title: 'Full-Stack Auth Flows',
            description: 'Authenticate users securely between frontend client and backend server.',
            resourceType: 'article',
            resourceUrl: 'https://auth0.com/docs/get-started',
            order: 1
          }
        ]
      },
      {
        id: 'fs-mod-7',
        title: 'Deployment & Cloud Hosting',
        description: 'Deploy full-stack web applications to modern cloud platforms.',
        order: 7,
        lessons: [
          {
            id: 'fs-l-701',
            title: 'Deploying Full-Stack Next.js Apps',
            description: 'Connect GitHub repositories to Vercel and Supabase cloud services.',
            resourceType: 'documentation',
            resourceUrl: 'https://vercel.com/docs/frameworks/nextjs',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'ai-engineer',
    slug: 'ai-engineer',
    title: 'AI Engineer Roadmap',
    company: null,
    role: 'AI Engineer',
    difficulty: 'Advanced',
    estimatedDuration: '24 weeks',
    description: 'Master practical AI application engineering: from machine learning foundations to deep neural networks, LLM prompting, vector embeddings, RAG pipelines, and AI agent frameworks.',
    skills: ['Python', 'PyTorch', 'Machine Learning', 'LLMs', 'Vector Databases', 'RAG', 'LangChain'],
    prerequisites: ['Proficiency in Python programming', 'Basic linear algebra and calculus concepts'],
    learningOutcomes: [
      'Master numerical computing with Python, NumPy, and Pandas',
      'Train supervised machine learning models with scikit-learn',
      'Build deep learning neural networks with PyTorch',
      'Fine-tune Transformer models for natural language tasks',
      'Generate and search high-dimensional vector embeddings',
      'Construct Retrieval-Augmented Generation (RAG) knowledge systems',
      'Design autonomous AI agents with tools and memory',
      'Deploy and evaluate production AI model API endpoints'
    ],
    modules: [
      {
        id: 'ai-mod-1',
        title: 'Python Foundations',
        description: 'NumPy array manipulation, Pandas dataframes, and data preprocessing for AI.',
        order: 1,
        lessons: [
          {
            id: 'ai-l-101',
            title: 'NumPy Vectorization & Matrix Math',
            description: 'Perform fast array operations without explicit Python loops.',
            resourceType: 'documentation',
            resourceUrl: 'https://numpy.org/doc/stable/user/absolute_beginners.html',
            order: 1
          },
          {
            id: 'ai-l-102',
            title: 'Data Wrangling with Pandas',
            description: 'Load, filter, transform, and clean datasets for model ingestion.',
            resourceType: 'documentation',
            resourceUrl: 'https://pandas.pydata.org/docs/user_guide/10min.html',
            order: 2
          }
        ]
      },
      {
        id: 'ai-mod-2',
        title: 'Machine Learning Fundamentals',
        description: 'Supervised and unsupervised learning, regression, classification, and validation metrics.',
        order: 2,
        lessons: [
          {
            id: 'ai-l-201',
            title: 'Supervised Learning with Scikit-Learn',
            description: 'Train decision trees, random forests, and logistic regression classifiers.',
            resourceType: 'documentation',
            resourceUrl: 'https://scikit-learn.org/stable/getting_started.html',
            order: 1
          }
        ]
      },
      {
        id: 'ai-mod-3',
        title: 'Neural Networks',
        description: 'Build multi-layer perceptrons, backpropagation, and PyTorch deep learning models.',
        order: 3,
        lessons: [
          {
            id: 'ai-l-301',
            title: 'PyTorch Deep Learning Fundamentals',
            description: 'Build neural network layers, loss functions, and backpropagation loops.',
            resourceType: 'official',
            resourceUrl: 'https://pytorch.org/tutorials/beginner/basics/intro.html',
            order: 1
          }
        ]
      },
      {
        id: 'ai-mod-4',
        title: 'LLM Fundamentals',
        description: 'Understand Transformer architecture, self-attention, tokenization, and prompt design.',
        order: 4,
        lessons: [
          {
            id: 'ai-l-401',
            title: 'The Transformer Architecture & Self-Attention',
            description: 'Understand how self-attention processes sequential text tokens in parallel.',
            resourceType: 'article',
            resourceUrl: 'https://jalammar.github.io/illustrated-transformer/',
            order: 1
          }
        ]
      },
      {
        id: 'ai-mod-5',
        title: 'Embeddings & Vector Databases',
        description: 'Generate text embeddings and store them in Pinecone or ChromaDB for similarity search.',
        order: 5,
        lessons: [
          {
            id: 'ai-l-501',
            title: 'Vector Embeddings & Cosine Similarity',
            description: 'Map text to dense vector spaces and perform nearest neighbor search.',
            resourceType: 'article',
            resourceUrl: 'https://www.pinecone.io/learn/vector-embeddings/',
            order: 1
          }
        ]
      },
      {
        id: 'ai-mod-6',
        title: 'RAG',
        description: 'Build Retrieval-Augmented Generation pipelines linking vector stores to LLMs.',
        order: 6,
        lessons: [
          {
            id: 'ai-l-601',
            title: 'Building a RAG System',
            description: 'Chunk documents, index embeddings, retrieve context, and prompt LLMs.',
            resourceType: 'documentation',
            resourceUrl: 'https://python.langchain.com/docs/tutorials/rag/',
            order: 1
          }
        ]
      },
      {
        id: 'ai-mod-7',
        title: 'AI Agents',
        description: 'Construct multi-step reasoning agents equipped with tool calling and short-term memory.',
        order: 7,
        lessons: [
          {
            id: 'ai-l-701',
            title: 'Tool Calling & Agentic Workflows',
            description: 'Give LLMs capability to invoke search, APIs, and custom code tools.',
            resourceType: 'documentation',
            resourceUrl: 'https://python.langchain.com/docs/concepts/agents/',
            order: 1
          }
        ]
      },
      {
        id: 'ai-mod-8',
        title: 'Deployment & Evaluation',
        description: 'Deploy AI models as REST microservices and evaluate output accuracy.',
        order: 8,
        lessons: [
          {
            id: 'ai-l-801',
            title: 'Deploying AI Models with FastAPI',
            description: 'Expose model inference through high-performance Python FastAPI endpoints.',
            resourceType: 'documentation',
            resourceUrl: 'https://fastapi.tiangolo.com/tutorial/',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'data-engineer',
    slug: 'data-engineer',
    title: 'Data Engineer Roadmap',
    company: null,
    role: 'Data Engineer',
    difficulty: 'Advanced',
    estimatedDuration: '20 weeks',
    description: 'Build robust data architecture: from SQL and data modeling to ETL/ELT pipelines, data warehousing, Apache Spark distributed computing, and workflow orchestration.',
    skills: ['Python', 'SQL', 'Data Warehousing', 'Apache Spark', 'Airflow', 'ETL'],
    prerequisites: ['Python syntax basics', 'Fundamental SQL querying skills'],
    learningOutcomes: [
      'Master advanced SQL analytical queries and window functions',
      'Design dimensional schemas (star/snowflake schemas) for data warehouses',
      'Construct automated ETL and ELT data extraction pipelines',
      'Process large datasets in parallel using Apache Spark',
      'Orchestrate pipeline schedules with Apache Airflow',
      'Build reliable production data infrastructure'
    ],
    modules: [
      {
        id: 'de-mod-1',
        title: 'Python & SQL',
        description: 'Advanced SQL window functions, CTEs, and Python script automation.',
        order: 1,
        lessons: [
          {
            id: 'de-l-101',
            title: 'SQL Window Functions & CTEs',
            description: 'Write complex analytical queries using ROW_NUMBER, RANK, and WITH clauses.',
            resourceType: 'documentation',
            resourceUrl: 'https://www.postgresql.org/docs/current/tutorial-window.html',
            order: 1
          }
        ]
      },
      {
        id: 'de-mod-2',
        title: 'Data Modeling',
        description: 'Dimensional modeling concepts, fact tables, dimension tables, and star schema architecture.',
        order: 2,
        lessons: [
          {
            id: 'de-l-201',
            title: 'Dimensional Modeling & Star Schemas',
            description: 'Separate business metrics into fact tables surrounded by dimension context tables.',
            resourceType: 'article',
            resourceUrl: 'https://www.geeksforgeeks.org/star-schema-in-data-warehouse/',
            order: 1
          }
        ]
      },
      {
        id: 'de-mod-3',
        title: 'ETL / ELT',
        description: 'Extract raw data, apply transformations, and load into target storage.',
        order: 3,
        lessons: [
          {
            id: 'de-l-301',
            title: 'Building Robust ETL Pipelines in Python',
            description: 'Extract data from APIs and databases, clean records, and load into storage.',
            resourceType: 'article',
            resourceUrl: 'https://realpython.com/python-etl-crate/',
            order: 1
          }
        ]
      },
      {
        id: 'de-mod-4',
        title: 'Data Warehousing',
        description: 'Columnar storage principles, partitioning, indexing, and Snowflake/BigQuery fundamentals.',
        order: 4,
        lessons: [
          {
            id: 'de-l-401',
            title: 'Data Warehouse Architecture & Partitioning',
            description: 'Optimize query throughput using columnar storage formats and partition keys.',
            resourceType: 'documentation',
            resourceUrl: 'https://cloud.google.com/bigquery/docs/partitioned-tables',
            order: 1
          }
        ]
      },
      {
        id: 'de-mod-5',
        title: 'Spark & Distributed Processing',
        description: 'Distributed dataframes, PySpark computations, and parallel cluster processing.',
        order: 5,
        lessons: [
          {
            id: 'de-l-501',
            title: 'PySpark DataFrames & Transformations',
            description: 'Manipulate massive datasets distributed across computing nodes.',
            resourceType: 'official',
            resourceUrl: 'https://spark.apache.org/docs/latest/api/python/getting_started/quickstart_df.html',
            order: 1
          }
        ]
      },
      {
        id: 'de-mod-6',
        title: 'Cloud Data Platforms',
        description: 'Store and manage cloud data buckets (S3/GCS) and managed data services.',
        order: 6,
        lessons: [
          {
            id: 'de-l-601',
            title: 'Cloud Object Storage & Data Lakes',
            description: 'Structure Parquet and Delta Lake files in AWS S3 data lakes.',
            resourceType: 'article',
            resourceUrl: 'https://aws.amazon.com/big-data/datalakes-and-analytics/',
            order: 1
          }
        ]
      },
      {
        id: 'de-mod-7',
        title: 'Data Pipelines',
        description: 'Schedule, monitor, and orchestrate DAG pipeline workflows with Apache Airflow.',
        order: 7,
        lessons: [
          {
            id: 'de-l-701',
            title: 'Workflow Orchestration with Apache Airflow',
            description: 'Define Python DAGs to schedule and monitor multi-step data pipelines.',
            resourceType: 'official',
            resourceUrl: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'python-developer',
    slug: 'python-developer',
    title: 'Python Developer Roadmap',
    company: null,
    role: 'Python Developer',
    difficulty: 'Beginner',
    estimatedDuration: '10 weeks',
    description: 'Learn modern Python programming from syntax basics, functions, and object-oriented programming to file automation, API integration, testing, and project creation.',
    skills: ['Python 3', 'OOP', 'Pip', 'Virtualenv', 'Requests API', 'PyTest'],
    prerequisites: ['No prior coding experience required', 'Computer access with internet'],
    learningOutcomes: [
      'Write clean, readable Python code adhering to PEP 8 standards',
      'Master functions, modules, data structures, and control flow',
      'Apply Object-Oriented Programming (OOP) classes and methods',
      'Interact with file systems, JSON, and third-party Web APIs',
      'Automate repetitive daily computer and file tasks',
      'Write unit tests using pytest'
    ],
    modules: [
      {
        id: 'py-mod-1',
        title: 'Python Fundamentals',
        description: 'Variables, primitive data types, string formatting, conditional logic, and loops.',
        order: 1,
        lessons: [
          {
            id: 'py-l-101',
            title: 'Variables & Data Types',
            description: 'Learn integers, floats, strings, booleans, and type casting.',
            resourceType: 'official',
            resourceUrl: 'https://docs.python.org/3/tutorial/introduction.html',
            order: 1
          },
          {
            id: 'py-l-102',
            title: 'Control Flow (if, for, while)',
            description: 'Master conditional branching and iteration loops.',
            resourceType: 'official',
            resourceUrl: 'https://docs.python.org/3/tutorial/controlflow.html',
            order: 2
          }
        ]
      },
      {
        id: 'py-mod-2',
        title: 'Functions & Modules',
        description: 'Define functions, argument passing, return values, and module imports.',
        order: 2,
        lessons: [
          {
            id: 'py-l-201',
            title: 'Defining & Calling Functions',
            description: 'Use parameters, default arguments, *args, **kwargs, and return statements.',
            resourceType: 'official',
            resourceUrl: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
            order: 1
          }
        ]
      },
      {
        id: 'py-mod-3',
        title: 'Object-Oriented Programming (OOP)',
        description: 'Create custom classes, objects, instance attributes, methods, and inheritance.',
        order: 3,
        lessons: [
          {
            id: 'py-l-301',
            title: 'Python Classes & Objects',
            description: 'Define __init__ constructors, instance methods, and class inheritance.',
            resourceType: 'official',
            resourceUrl: 'https://docs.python.org/3/tutorial/classes.html',
            order: 1
          }
        ]
      },
      {
        id: 'py-mod-4',
        title: 'Files & APIs',
        description: 'Read and write local files, work with JSON, and send HTTP requests.',
        order: 4,
        lessons: [
          {
            id: 'py-l-401',
            title: 'File IO & JSON Data Handling',
            description: 'Open, read, write files using context managers (with statement) and parse JSON.',
            resourceType: 'official',
            resourceUrl: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files',
            order: 1
          }
        ]
      },
      {
        id: 'py-mod-5',
        title: 'Testing',
        description: 'Write automated unit tests using pytest to ensure script correctness.',
        order: 5,
        lessons: [
          {
            id: 'py-l-501',
            title: 'Unit Testing with pytest',
            description: 'Write test functions, assertions, and run pytest from the command line.',
            resourceType: 'documentation',
            resourceUrl: 'https://docs.pytest.org/en/stable/getting-started.html',
            order: 1
          }
        ]
      },
      {
        id: 'py-mod-6',
        title: 'Automation',
        description: 'Automate file renaming, web scraping, and CSV manipulation.',
        order: 6,
        lessons: [
          {
            id: 'py-l-601',
            title: 'Automating File System Tasks',
            description: 'Use os and pathlib libraries to automate file management.',
            resourceType: 'official',
            resourceUrl: 'https://docs.python.org/3/library/pathlib.html',
            order: 1
          }
        ]
      },
      {
        id: 'py-mod-7',
        title: 'Projects',
        description: 'Build portfolio Python applications combining all learned topics.',
        order: 7,
        lessons: [
          {
            id: 'py-l-701',
            title: 'Building a CLI Application',
            description: 'Package your Python script into a command-line interface tool.',
            resourceType: 'article',
            resourceUrl: 'https://realpython.com/command-line-interfaces-python-argparse/',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'devops-cloud',
    slug: 'devops-cloud',
    title: 'DevOps & Cloud Engineer Roadmap',
    company: null,
    role: 'DevOps Engineer',
    difficulty: 'Advanced',
    estimatedDuration: '20 weeks',
    description: 'Master modern DevOps practices: Linux administration, networking fundamentals, CI/CD automation, Docker containerization, Kubernetes orchestration, Infrastructure as Code, and monitoring.',
    skills: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS', 'Prometheus'],
    prerequisites: ['Basic command-line fluency', 'Understanding of software development lifecycles'],
    learningOutcomes: [
      'Administer Linux servers via SSH and shell scripts',
      'Understand core networking: TCP/IP, DNS, SSL/TLS, and CIDR blocks',
      'Build automated CI/CD build and test pipelines',
      'Package applications into portable Docker containers',
      'Orchestrate multi-container deployments with Kubernetes',
      'Provision cloud infrastructure declaratively using Terraform',
      'Configure system monitoring and alerting with Prometheus'
    ],
    modules: [
      {
        id: 'ops-mod-1',
        title: 'Linux',
        description: 'Linux terminal commands, file permissions, process management, and bash scripting.',
        order: 1,
        lessons: [
          {
            id: 'ops-l-101',
            title: 'Linux Shell & File Management',
            description: 'Master bash commands, directory structures, and file permission modes (chmod/chown).',
            resourceType: 'documentation',
            resourceUrl: 'https://linuxjourney.com/',
            order: 1
          }
        ]
      },
      {
        id: 'ops-mod-2',
        title: 'Networking',
        description: 'TCP/IP layers, ports, DNS resolution, SSH keys, HTTP/HTTPS, and firewalls.',
        order: 2,
        lessons: [
          {
            id: 'ops-l-201',
            title: 'Networking Fundamentals & SSH',
            description: 'Understand IP routing, port mapping, and secure shell (SSH) key authentication.',
            resourceType: 'article',
            resourceUrl: 'https://www.digitalocean.com/community/tutorials/an-introduction-to-networking-terminology-interfaces-and-protocols',
            order: 1
          }
        ]
      },
      {
        id: 'ops-mod-3',
        title: 'Git & CI/CD',
        description: 'Automate build, test, and release workflows using GitHub Actions.',
        order: 3,
        lessons: [
          {
            id: 'ops-l-301',
            title: 'CI/CD Pipelines with GitHub Actions',
            description: 'Define YAML workflow files to automatically test code on every git push.',
            resourceType: 'documentation',
            resourceUrl: 'https://docs.github.com/en/actions/quickstart',
            order: 1
          }
        ]
      },
      {
        id: 'ops-mod-4',
        title: 'Docker',
        description: 'Container concepts, Dockerfiles, images, containers, and multi-container Docker Compose.',
        order: 4,
        lessons: [
          {
            id: 'ops-l-401',
            title: 'Docker Containerization Fundamentals',
            description: 'Write Dockerfiles to build lightweight, isolated container images.',
            resourceType: 'official',
            resourceUrl: 'https://docs.docker.com/get-started/',
            order: 1
          }
        ]
      },
      {
        id: 'ops-mod-5',
        title: 'Kubernetes',
        description: 'Container orchestration, pods, deployments, services, ingress, and config maps.',
        order: 5,
        lessons: [
          {
            id: 'ops-l-501',
            title: 'Kubernetes Cluster Architecture & Pods',
            description: 'Deploy, scale, and manage containerized applications across cluster nodes.',
            resourceType: 'official',
            resourceUrl: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
            order: 1
          }
        ]
      },
      {
        id: 'ops-mod-6',
        title: 'Cloud Fundamentals',
        description: 'AWS/GCP core cloud services: virtual machines (EC2), VPC networks, and IAM security.',
        order: 6,
        lessons: [
          {
            id: 'ops-l-601',
            title: 'AWS Cloud Core Services Overview',
            description: 'Understand cloud regions, EC2 instances, S3 buckets, and IAM permission policies.',
            resourceType: 'official',
            resourceUrl: 'https://aws.amazon.com/getting-started/',
            order: 1
          }
        ]
      },
      {
        id: 'ops-mod-7',
        title: 'Infrastructure as Code',
        description: 'Provision cloud resources declaratively using HashiCorp Terraform configuration files.',
        order: 7,
        lessons: [
          {
            id: 'ops-l-701',
            title: 'Declarative Cloud Infrastructure with Terraform',
            description: 'Write HCL code to initialize, plan, and apply cloud infrastructure state.',
            resourceType: 'official',
            resourceUrl: 'https://developer.hashicorp.com/terraform/tutorials/aws-get-started',
            order: 1
          }
        ]
      },
      {
        id: 'ops-mod-8',
        title: 'Monitoring',
        description: 'Monitor server metrics and log aggregations using Prometheus and Grafana dashboards.',
        order: 8,
        lessons: [
          {
            id: 'ops-l-801',
            title: 'Metrics & Monitoring with Prometheus',
            description: 'Scrape time-series metrics from application endpoints and configure alerts.',
            resourceType: 'documentation',
            resourceUrl: 'https://prometheus.io/docs/introduction/overview/',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'dsa-interview',
    slug: 'dsa-interview',
    title: 'Data Structures & Algorithms Roadmap',
    company: null,
    role: 'Software Engineering Interviews',
    difficulty: 'Intermediate',
    estimatedDuration: '14 weeks',
    description: 'A comprehensive, pattern-focused technical interview roadmap designed to build problem-solving speed and algorithmic intuition for coding assessments.',
    skills: ['Time Complexity', 'Recursion', 'Trees & Graphs', 'Dynamic Programming', 'LeetCode Patterns'],
    prerequisites: ['Fluency in at least one programming language (Java, C++, Python, JS)'],
    learningOutcomes: [
      'Master asymptotic Big-O analysis for time and space complexity',
      'Recognize pattern triggers (two pointers, sliding window, fast/slow pointers)',
      'Traverse non-linear structures (BSTs, N-ary trees, graphs, DAGs)',
      'Deconstruct dynamic programming into state variables and transitions',
      'Excel in timed coding assessments and technical phone screens'
    ],
    modules: [
      {
        id: 'dsa-mod-1',
        title: 'Complexity & Problem Solving',
        description: 'Asymptotic notation, recursion tree analysis, and dry-running code methodically.',
        order: 1,
        lessons: [
          {
            id: 'dsa-l-101',
            title: 'Mastering Time & Space Complexity',
            description: 'Calculate tight upper bounds (O), lower bounds (Omega), and average cases.',
            resourceType: 'youtube',
            resourceUrl: 'https://www.youtube.com/watch?v=pkYVOmU3MgA',
            order: 1
          }
        ]
      },
      {
        id: 'dsa-mod-2',
        title: 'Arrays & Strings',
        description: 'Two pointers, sliding window, prefix sums, and string matching algorithms.',
        order: 2,
        lessons: [
          {
            id: 'dsa-l-201',
            title: 'Array Patterns: Two Pointers & Sliding Window',
            description: 'Solve contiguous sub-array and sub-string search problems in linear time.',
            resourceType: 'practice',
            resourceUrl: 'https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/',
            order: 1
          }
        ]
      },
      {
        id: 'dsa-mod-3',
        title: 'Linked Lists',
        description: 'Fast/slow pointer technique, list reversal, and cycle detection algorithms.',
        order: 3,
        lessons: [
          {
            id: 'dsa-l-301',
            title: 'Floyd\'s Tortoise and Hare Cycle Detection',
            description: 'Detect linked list loops and locate cycle entry nodes in O(1) space.',
            resourceType: 'article',
            resourceUrl: 'https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/',
            order: 1
          }
        ]
      },
      {
        id: 'dsa-mod-4',
        title: 'Trees',
        description: 'Binary Tree traversals, Binary Search Tree properties, and Lowest Common Ancestor.',
        order: 4,
        lessons: [
          {
            id: 'dsa-l-401',
            title: 'Tree Traversals & Recursion Patterns',
            description: 'Solve tree height, path sum, and ancestor queries using DFS and BFS.',
            resourceType: 'youtube',
            resourceUrl: 'https://www.youtube.com/watch?v=pkYVOmU3MgA',
            order: 1
          }
        ]
      },
      {
        id: 'dsa-mod-5',
        title: 'Graphs',
        description: 'Graph BFS/DFS, topological sort, Union-Find (Disjoint Set Union), and shortest paths.',
        order: 5,
        lessons: [
          {
            id: 'dsa-l-501',
            title: 'Graph Traversal & Topological Sort',
            description: 'Detect graph cycles and resolve dependency orderings in directed graphs.',
            resourceType: 'article',
            resourceUrl: 'https://www.geeksforgeeks.org/topological-sorting/',
            order: 1
          }
        ]
      },
      {
        id: 'dsa-mod-6',
        title: 'Sorting & Searching',
        description: 'Binary search variations, QuickSort, MergeSort, and Custom Comparator functions.',
        order: 6,
        lessons: [
          {
            id: 'dsa-l-601',
            title: 'Binary Search on Solution Spaces',
            description: 'Apply binary search to monotonic decision functions beyond plain arrays.',
            resourceType: 'practice',
            resourceUrl: 'https://leetcode.com/tag/binary-search/',
            order: 1
          }
        ]
      },
      {
        id: 'dsa-mod-7',
        title: 'Dynamic Programming',
        description: 'Memoization top-down, tabulation bottom-up, 1D DP, and 2D grid/knapsack DP.',
        order: 7,
        lessons: [
          {
            id: 'dsa-l-701',
            title: 'DP Foundations: Memoization vs Tabulation',
            description: 'Break overlapping subproblems into sub-state recurrence relations.',
            resourceType: 'article',
            resourceUrl: 'https://www.geeksforgeeks.org/overlapping-subproblems-property-in-dynamic-programming-dp-1/',
            order: 1
          }
        ]
      },
      {
        id: 'dsa-mod-8',
        title: 'Interview Practice',
        description: 'Timed mock coding challenges and technical communication practice.',
        order: 8,
        lessons: [
          {
            id: 'dsa-l-801',
            title: 'Mock Coding Assessment Simulation',
            description: 'Practice dry-running test cases and communicating tradeoffs under time pressure.',
            resourceType: 'practice',
            resourceUrl: 'https://leetcode.com/assessment/',
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'react-developer',
    slug: 'react-developer',
    title: 'React Developer Roadmap',
    company: null,
    role: 'React Developer',
    difficulty: 'Intermediate',
    estimatedDuration: '12 weeks',
    description: 'Master client-side UI engineering with React 19: from components and state management to custom hooks, routing, performance optimization, and testing.',
    skills: ['React 19', 'Hooks', 'Context API', 'React Router', 'Zustand', 'React Testing Library'],
    prerequisites: ['Good proficiency in modern JavaScript (ES6+)', 'HTML and CSS fundamentals'],
    learningOutcomes: [
      'Deconstruct complex interfaces into reusable React component hierarchies',
      'Manage local state with useState and complex state with useReducer',
      'Build custom React hooks to encapsulate domain UI logic',
      'Implement multi-page client routing with React Router',
      'Optimize component rendering with memo, useMemo, and useCallback',
      'Write robust component unit tests with React Testing Library'
    ],
    modules: [
      {
        id: 'react-mod-1',
        title: 'JavaScript Fundamentals',
        description: 'ES6+ destructuring, arrow functions, promises, modules, and immutability.',
        order: 1,
        lessons: [
          {
            id: 'react-l-101',
            title: 'ES6+ Features for React',
            description: 'Master arrow functions, destructuring, spread/rest operators, and modules.',
            resourceType: 'documentation',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
            order: 1
          }
        ]
      },
      {
        id: 'react-mod-2',
        title: 'React Fundamentals',
        description: 'JSX syntax, Virtual DOM, element rendering, and component composition.',
        order: 2,
        lessons: [
          {
            id: 'react-l-201',
            title: 'JSX & Component Composition',
            description: 'Write clean JSX expressions and pass children components as props.',
            resourceType: 'official',
            resourceUrl: 'https://react.dev/learn/writing-markup-with-jsx',
            order: 1
          }
        ]
      },
      {
        id: 'react-mod-3',
        title: 'Components & Props',
        description: 'Functional component props, default props, prop typing, and purity.',
        order: 3,
        lessons: [
          {
            id: 'react-l-301',
            title: 'Passing Props to Components',
            description: 'Pass data down component trees cleanly with read-only props.',
            resourceType: 'official',
            resourceUrl: 'https://react.dev/learn/passing-props-to-a-component',
            order: 1
          }
        ]
      },
      {
        id: 'react-mod-4',
        title: 'State & Effects',
        description: 'useState, useReducer, useEffect lifecycles, and custom hooks.',
        order: 4,
        lessons: [
          {
            id: 'react-l-401',
            title: 'State Management & Custom Hooks',
            description: 'Encapsulate reusable stateful logic into custom React hooks.',
            resourceType: 'official',
            resourceUrl: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
            order: 1
          }
        ]
      },
      {
        id: 'react-mod-5',
        title: 'Routing & APIs',
        description: 'Client-side navigation with React Router and API data fetching.',
        order: 5,
        lessons: [
          {
            id: 'react-l-501',
            title: 'Client-Side Navigation with React Router',
            description: 'Configure dynamic routes, nested layouts, and route parameters.',
            resourceType: 'documentation',
            resourceUrl: 'https://reactrouter.com/en/main/start/tutorial',
            order: 1
          }
        ]
      },
      {
        id: 'react-mod-6',
        title: 'Forms',
        description: 'Controlled vs uncontrolled inputs, form validation, and submission handlers.',
        order: 6,
        lessons: [
          {
            id: 'react-l-601',
            title: 'Controlled Form Inputs & Validation',
            description: 'Synchronize form input values with React component state.',
            resourceType: 'official',
            resourceUrl: 'https://react.dev/reference/react-dom/components/input',
            order: 1
          }
        ]
      },
      {
        id: 'react-mod-7',
        title: 'Performance',
        description: 'React compiler, React.memo, useMemo, useCallback, and code splitting.',
        order: 7,
        lessons: [
          {
            id: 'react-l-701',
            title: 'Preventing Unnecessary Re-renders',
            description: 'Optimize expensive component computations with useMemo and useCallback.',
            resourceType: 'official',
            resourceUrl: 'https://react.dev/reference/react/useMemo',
            order: 1
          }
        ]
      },
      {
        id: 'react-mod-8',
        title: 'Testing',
        description: 'Unit testing components with React Testing Library and Vitest.',
        order: 8,
        lessons: [
          {
            id: 'react-l-801',
            title: 'Component Testing with React Testing Library',
            description: 'Test component rendering, user clicks, and accessibility roles.',
            resourceType: 'documentation',
            resourceUrl: 'https://testing-library.com/docs/react-testing-library/intro/',
            order: 1
          }
        ]
      }
    ]
  }
];
