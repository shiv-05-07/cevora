const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

interface TopicContent {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  plan: string;
  mistakes: string;
  resources: string;
  nextSteps: string;
}

const topicsDatabase: Record<string, TopicContent> = {
  resume: {
    id: 'resume',
    title: 'Resume & ATS Optimization',
    summary: 'Your resume is the first impression you make. Passing ATS (Applicant Tracking Systems) requires precise formatting, impactful metrics, and correct keyword placement.',
    explanation: 'ATS parsers read left-to-right, top-to-bottom. If your resume uses complex CSS layouts, columns, or graphics, the parser fails. Furthermore, recruiters skim resumes in about 6 seconds, meaning your best achievements must be front and center.',
    plan: '1. **Use the XYZ Formula:** "Accomplished [X] as measured by [Y], by doing [Z]."\n2. **Format Cleanly:** Stick to single-column, standard fonts (Arial, Times New Roman).\n3. **Keyword Density:** Match skills to the specific job description.',
    mistakes: '- Including generic buzzwords like "hardworking" or "team player."\n- Using a photo or complex graphics.\n- Listing duties instead of accomplishments.',
    resources: '- [Harvard Resume Guidelines](https://careerservices.fas.harvard.edu)\n- [XYZ Formula Examples](https://www.inc.com)',
    nextSteps: 'Run your current PDF through our **Resume Analyzer** to get an instant ATS score.'
  },
  amazon: {
    id: 'amazon',
    title: 'Amazon Interview Preparation',
    summary: 'Amazon evaluates candidates heavily on both technical scalability and their 16 Leadership Principles (LPs). Cultural fit is just as important as coding.',
    explanation: 'For SDE roles, Amazon OA (Online Assessment) typically features Sliding Window and Graph problems. But the real challenge is the Loop (onsite) where every interviewer is assigned 2-3 specific Leadership Principles to grill you on.',
    plan: '### 30-Day Amazon Plan\n- **Week 1:** Master Trees & Graphs (BFS, DFS) and Sliding Window.\n- **Week 2:** Prepare two STAR stories for Customer Obsession and Deliver Results.\n- **Week 3:** System Design basics (Load Balancers, Caching, DB Sharding).\n- **Week 4:** Mock Interviews focusing on Ownership and Dive Deep.',
    mistakes: '- Failing to structure behavioral answers using the STAR method.\n- Writing unoptimized O(N^2) code without mentioning the tradeoff.\n- Arguing with the interviewer instead of taking feedback.',
    resources: '- [Amazon Leadership Principles](https://www.amazon.jobs)\n- [Grokking the System Design Interview](https://www.educative.io)',
    nextSteps: 'Practice Amazon-specific questions in our **OA Practice** module.'
  },
  google: {
    id: 'google',
    title: 'Google Interview Strategy',
    summary: 'Google interviews are notoriously rigorous, focusing heavily on raw algorithmic problem solving, data structures, and "Googliness".',
    explanation: 'Google cares deeply about how you think, not just if you get the right answer. They want to see you clarify ambiguity, discuss tradeoffs between space/time complexity, and write bug-free code on a whiteboard or shared doc.',
    plan: '- **Technical:** Focus on Dynamic Programming, Hard Graph problems, and Trie data structures.\n- **Behavioral:** Emphasize "Googliness" (thriving in ambiguity, valuing feedback, putting the user first).\n- **System Design:** Focus on massive scale, distributed systems, and latency minimization.',
    mistakes: '- Jumping into code before fully understanding the problem constraints.\n- Silent coding. You must think out loud constantly.\n- Not testing your code with edge cases before saying you are done.',
    resources: '- [Google Tech Dev Guide](https://techdevguide.withgoogle.com/)\n- [NeetCode 150](https://neetcode.io)',
    nextSteps: 'Start a timed mock interview to simulate the pressure of a Google onsite.'
  },
  dsa: {
    id: 'dsa',
    title: 'Data Structures & Algorithms (DSA)',
    summary: 'Mastering DSA is about pattern recognition, not rote memorization. Understanding underlying patterns allows you to solve unseen problems.',
    explanation: 'Instead of solving 500 random problems, solve 50 problems that cover the core patterns: Sliding Window, Two Pointers, Fast & Slow Pointers, Merge Intervals, Cyclic Sort, and Top K Elements.',
    plan: '1. **Foundation (Weeks 1-2):** Arrays, Hashing, Two Pointers.\n2. **Intermediate (Weeks 3-4):** Linked Lists, Trees, Stacks, Queues.\n3. **Advanced (Weeks 5-8):** Graphs (BFS/DFS), Dynamic Programming, Tries, Heaps.',
    mistakes: '- Looking at the solution too quickly (spend at least 30 mins struggling).\n- Memorizing code instead of understanding the logic.\n- Ignoring Time & Space complexity analysis.',
    resources: '- [NeetCode Roadmap](https://neetcode.io/roadmap)\n- [LeetCode Patterns](https://seanprashad.com/leetcode-patterns/)',
    nextSteps: 'Open the **Roadmaps** tab and select the Comprehensive DSA track.'
  },
  systemdesign: {
    id: 'systemdesign',
    title: 'System Design Mastery',
    summary: 'System Design interviews test your ability to architect scalable, highly available, and performant systems from scratch.',
    explanation: 'You are expected to drive the conversation. You must define functional and non-functional requirements, estimate capacity (QPS, storage), design the high-level architecture, and then dive deep into bottlenecks like database sharding, caching strategies, and load balancing.',
    plan: '1. **Learn the Basics:** DNS, CDNs, Load Balancers, API Gateways.\n2. **Databases:** Relational vs NoSQL, Sharding, Replication, CAP Theorem.\n3. **Caching & Queues:** Redis, Memcached, Kafka, RabbitMQ.\n4. **Case Studies:** Design Twitter, Design Uber, Design a URL Shortener.',
    mistakes: '- Designing a microservices architecture for a simple problem that needs a monolith.\n- Forgetting to discuss single points of failure (SPOF).\n- Not asking clarifying questions about the scale.',
    resources: '- [ByteByteGo (Alex Xu)](https://bytebytego.com/)\n- [System Design Primer](https://github.com/donnemartin/system-design-primer)',
    nextSteps: 'Review the System Design section in our comprehensive Roadmaps.'
  },
  behavioral: {
    id: 'behavioral',
    title: 'Behavioral Interviews & STAR Method',
    summary: 'Behavioral rounds ensure you are someone the team actually wants to work with. The STAR method is the industry standard for answering these.',
    explanation: 'STAR stands for Situation, Task, Action, and Result. Most candidates fail because they spend 80% of their time on the Situation, and only 20% on the Action and Result. Flip that. Emphasize what *you* did, not what the *team* did.',
    plan: 'Prepare stories for these 5 core themes:\n1. A time you failed or made a mistake.\n2. A time you had a conflict with a teammate.\n3. A time you showed leadership without a title.\n4. A time you had to learn a new technology quickly.\n5. A time you went above and beyond for a customer.',
    mistakes: '- Saying "we" instead of "I". The interviewer wants to know *your* impact.\n- Giving a story without a measurable result (e.g., "The project was a success").\n- Memorizing a script and sounding like a robot.',
    resources: '- [STAR Method Guide](https://www.themuse.com/advice/star-interview-method)\n- [Dan Croitor YouTube](https://www.youtube.com/c/DanCroitor)',
    nextSteps: 'Write down 5 core stories and map them to the themes above.'
  },
  linkedin: {
    id: 'linkedin',
    title: 'LinkedIn Profile Optimization',
    summary: 'Your LinkedIn profile is your 24/7 digital footprint. A highly optimized profile attracts inbound recruiter messages.',
    explanation: 'Recruiters use LinkedIn Recruiter, which relies heavily on keyword matching in your Headline, About section, and Skills. If you just put "Student at XYZ University", you will not appear in searches for "Frontend Engineer".',
    plan: '1. **Headline:** Role | Tech Stack | Impact (e.g., "Software Engineer | React & Node.js | Building Scalable Web Apps").\n2. **About Section:** A 3-paragraph summary of your passion, tech stack, and what you are looking for.\n3. **Experience/Projects:** Add rich media (links, GitHub repos, live sites).\n4. **Skills:** Max out your 50 skills and get endorsements.',
    mistakes: '- Leaving the default banner image empty.\n- Not turning on "Open to Work" (recruiters only).\n- Posting generic certificates without context.',
    resources: '- [LinkedIn Optimization Guide](https://www.tealhq.com/post/linkedin-profile-optimization)',
    nextSteps: 'Update your headline today using the formula provided.'
  },
  projects: {
    id: 'projects',
    title: 'Resume-Worthy Projects',
    summary: 'To stand out, your projects need to solve real problems, have actual users, or demonstrate complex engineering challenges.',
    explanation: 'Recruiters are tired of seeing standard tutorial projects (To-Do apps, basic Weather apps). You need projects that show you understand full-stack integration, authentication, database modeling, and deployment pipelines.',
    plan: '### Project Ideas\n1. **Real-time Collaboration Tool:** (WebSockets, Redis, React, Node).\n2. **E-commerce with payment:** (Stripe API, Next.js, PostgreSQL).\n3. **AI Wrapper SaaS:** (OpenAI API, Next.js, Tailwind, Supabase).\n4. **Custom ATS Parser:** (Python, NLP, React).',
    mistakes: '- Not deploying the project to a live URL (Vercel, Render).\n- Missing a good `README.md` with screenshots and setup instructions.\n- Over-engineering a simple idea instead of finishing an MVP.',
    resources: '- [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x)\n- [Vercel Templates](https://vercel.com/templates)',
    nextSteps: 'Pick one project idea, write a feature spec, and start building the MVP this weekend.'
  },
  frontend: {
    id: 'frontend',
    title: 'Frontend Engineering',
    summary: 'Modern frontend engineering goes far beyond HTML/CSS. It involves state management, performance optimization, and complex architectural decisions.',
    explanation: 'Companies want developers who understand the component lifecycle, rendering strategies (CSR, SSR, SSG), and web vitals. React is the industry standard, but frameworks like Next.js are becoming mandatory knowledge.',
    plan: '1. **Core React:** Hooks (useState, useEffect, useMemo, useCallback), Context API.\n2. **Frameworks:** Next.js (App Router, Server Components).\n3. **Styling:** Tailwind CSS, CSS-in-JS, Shadcn UI.\n4. **State Management:** Zustand, Redux Toolkit, React Query.',
    mistakes: '- Abusing `useEffect` for derived state.\n- Ignoring accessibility (a11y) and semantic HTML.\n- Prop drilling instead of using Context or global state.',
    resources: '- [Frontend Masters](https://frontendmasters.com/)\n- [React Official Docs](https://react.dev/)',
    nextSteps: 'Refactor one of your basic React apps to use Next.js App Router and Server Components.'
  },
  backend: {
    id: 'backend',
    title: 'Backend Engineering',
    summary: 'Backend engineering is about building robust, secure, and highly scalable APIs and data pipelines.',
    explanation: 'You need to deeply understand HTTP protocols, REST vs GraphQL, database normalization, indexing, and authentication (JWT, OAuth). Performance bottlenecks usually happen at the database level, so SQL mastery is critical.',
    plan: '1. **Language/Framework:** Node.js (Express/NestJS) or Python (Django/FastAPI) or Java (Spring Boot).\n2. **Databases:** PostgreSQL (Relational) and MongoDB (NoSQL).\n3. **Auth & Security:** Implement JWT, OAuth, and understand CORS, CSRF, XSS.\n4. **Deployment:** Docker, AWS EC2, CI/CD pipelines.',
    mistakes: '- Storing plaintext passwords in the database (always hash with bcrypt).\n- N+1 Query problems when fetching relational data.\n- Missing rate limiting and input validation on public APIs.',
    resources: '- [Backend Developer Roadmap](https://roadmap.sh/backend)\n- [Hussein Nasser Database Course](https://www.youtube.com/c/HusseinNasser-software-engineering)',
    nextSteps: 'Build a RESTful API from scratch with full CRUD operations, authentication, and Swagger documentation.'
  },
  ai: {
    id: 'ai',
    title: 'Artificial Intelligence & Machine Learning',
    summary: 'AI engineering is rapidly evolving. Today, the focus has shifted heavily toward LLMs, RAG (Retrieval-Augmented Generation), and MLOps.',
    explanation: 'While traditional ML (regression, classification) is still important, the highest demand is for engineers who can integrate foundation models (like GPT-4) into production applications using prompt engineering, vector databases, and agentic workflows.',
    plan: '1. **Foundations:** Python, Pandas, NumPy, Scikit-Learn.\n2. **Deep Learning:** PyTorch, Neural Networks, CNNs.\n3. **Modern AI (GenAI):** LangChain, LlamaIndex, Pinecone (Vector DBs), OpenAI API.\n4. **Deployment:** HuggingFace, FastAPI, Replicate.',
    mistakes: '- Trying to train large models from scratch instead of fine-tuning or using RAG.\n- Ignoring data cleaning (garbage in, garbage out).\n- Overlooking the latency and cost of LLM API calls in production.',
    resources: '- [Fast.ai](https://course.fast.ai/)\n- [DeepLearning.AI](https://www.deeplearning.ai/)',
    nextSteps: 'Build a simple RAG pipeline that lets a user "chat" with a PDF document.'
  }
};

const fallbackTopic: TopicContent = {
  id: 'general',
  title: 'Career Growth Strategy',
  summary: 'Building a successful career is a marathon, not a sprint. Consistently improving your technical skills while expanding your professional network will yield the best long-term results.',
  explanation: 'In the current job market, technical skills get you the interview, but behavioral and soft skills secure the offer. Make sure you are balancing your preparation. Your LinkedIn profile, GitHub activity, and portfolio projects serve as your 24/7 digital footprint.',
  plan: '- **Consistency is Key:** A small amount of daily practice compounds significantly over months.\n- **Networking:** Leverage LinkedIn to connect with alumni in your target companies.\n- **Iterate:** Treat your resume, portfolio, and interview answers as living documents that evolve.',
  mistakes: '- Focusing 100% on coding and 0% on networking or soft skills.\n- Applying to 500 jobs with the exact same generic resume.\n- Giving up after a few rejections (rejection is the default in tech).',
  resources: '- [Tech Interview Handbook](https://www.techinterviewhandbook.org/)\n- [Negotiating Salary](https://haseebq.com/my-ten-rules-for-negotiating-a-job-offer/)',
  nextSteps: 'Let me know if you want to dive deeper into a specific area like **Resume Reviews**, **DSA Roadmaps**, or **Mock Interviews**!'
};

function getMockResponseContent(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  // 1. Detect all matching topics
  const matchedTopics: TopicContent[] = [];
  
  if (lowerPrompt.includes('resume') || lowerPrompt.includes('ats') || lowerPrompt.includes('cv')) matchedTopics.push(topicsDatabase.resume);
  if (lowerPrompt.includes('amazon')) matchedTopics.push(topicsDatabase.amazon);
  if (lowerPrompt.includes('google')) matchedTopics.push(topicsDatabase.google);
  if (lowerPrompt.includes('dsa') || lowerPrompt.includes('algorithm') || lowerPrompt.includes('dynamic programming')) matchedTopics.push(topicsDatabase.dsa);
  if (lowerPrompt.includes('system design') || lowerPrompt.includes('architecture')) matchedTopics.push(topicsDatabase.systemdesign);
  if (lowerPrompt.includes('behavioral') || lowerPrompt.includes('star')) matchedTopics.push(topicsDatabase.behavioral);
  if (lowerPrompt.includes('linkedin') || lowerPrompt.includes('profile')) matchedTopics.push(topicsDatabase.linkedin);
  if (lowerPrompt.includes('project') || lowerPrompt.includes('portfolio')) matchedTopics.push(topicsDatabase.projects);
  if (lowerPrompt.includes('frontend') || lowerPrompt.includes('react') || lowerPrompt.includes('nextjs')) matchedTopics.push(topicsDatabase.frontend);
  if (lowerPrompt.includes('backend') || lowerPrompt.includes('node') || lowerPrompt.includes('api')) matchedTopics.push(topicsDatabase.backend);
  if (lowerPrompt.includes('ai') || lowerPrompt.includes('machine learning') || lowerPrompt.includes('python')) matchedTopics.push(topicsDatabase.ai);

  if (matchedTopics.length === 0) {
    matchedTopics.push(fallbackTopic);
  }

  // 2. Combine topics into a single rich response
  const isCombined = matchedTopics.length > 1;
  const titles = matchedTopics.map(t => t.title).join(' & ');
  
  let markdown = `# ${isCombined ? 'Comprehensive Guide: ' : ''}${titles}\n\n`;

  markdown += `**Summary:**\n`;
  matchedTopics.forEach(t => { markdown += `${t.summary} `; });
  markdown += `\n\n`;

  markdown += `## Detailed Explanation\n`;
  matchedTopics.forEach(t => { markdown += `**${t.title}:** ${t.explanation}\n\n`; });

  markdown += `## Recommended Plan\n`;
  matchedTopics.forEach(t => { 
    if (isCombined) markdown += `### ${t.title} Plan\n`;
    markdown += `${t.plan}\n\n`; 
  });

  markdown += `## Common Mistakes to Avoid\n`;
  matchedTopics.forEach(t => { 
    if (isCombined) markdown += `### ${t.title} Mistakes\n`;
    markdown += `${t.mistakes}\n\n`; 
  });

  markdown += `## Helpful Resources\n`;
  matchedTopics.forEach(t => { markdown += `${t.resources}\n`; });
  markdown += `\n`;

  markdown += `## Next Steps\n`;
  matchedTopics.forEach(t => { markdown += `- ${t.nextSteps}\n`; });

  return markdown;
}

export async function* simulateMentorStreaming(prompt: string) {
  const fullText = getMockResponseContent(prompt);
  
  // Stream word by word, including whitespace. 
  // This feels highly natural like ChatGPT.
  const words = fullText.match(/\S+\s*/g) || [];
  
  for (const word of words) {
    // Variable delay to simulate natural bursty human-like or AI token generation
    await delay(randomBetween(10, 45));
    yield word;
  }
}
