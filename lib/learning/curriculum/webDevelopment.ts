import { SubjectCurriculum } from './types';

export const webDevelopmentCurriculum: SubjectCurriculum = {
  key: 'web-development',
  label: 'Web Development',
  roadmapTitle: 'Full-Stack Web Development Track',
  roadmapDescription: 'Master modern frontend and backend web development using HTML, CSS, JavaScript, React, Node.js, and REST APIs.',
  roadmapSteps: [
    { id: 'web-1', topicKey: 'html-css', title: 'HTML & CSS Foundations', description: 'Semantic HTML5 structure, CSS Box Model, Flexbox, and responsive layouts.', order: 1, estimatedMinutes: 45 },
    { id: 'web-2', topicKey: 'javascript-fundamentals', title: 'JavaScript Fundamentals', description: 'Variables, scopes, closures, higher-order functions, and ES6+ features.', order: 2, estimatedMinutes: 45 },
    { id: 'web-3', topicKey: 'dom-browser-apis', title: 'DOM & Browser APIs', description: 'Event delegation, DOM manipulation, web storage, and browser rendering lifecycle.', order: 3, estimatedMinutes: 45 },
    { id: 'web-4', topicKey: 'react-fundamentals', title: 'React Fundamentals', description: 'JSX, functional components, props, virtual DOM, and component composition.', order: 4, estimatedMinutes: 45 },
    { id: 'web-5', topicKey: 'state-data-fetching', title: 'State & Data Fetching', description: 'useState, useEffect, custom hooks, and async data fetching with fetch/axios.', order: 5, estimatedMinutes: 60 },
    { id: 'web-6', topicKey: 'backend-apis', title: 'Backend APIs', description: 'Node.js runtime, Express HTTP routing, middleware, and REST API design.', order: 6, estimatedMinutes: 60 },
    { id: 'web-7', topicKey: 'authentication', title: 'Authentication & Security', description: 'JWT tokens, HTTP cookies, password hashing, and CORS policies.', order: 7, estimatedMinutes: 60 },
    { id: 'web-8', topicKey: 'fullstack-project', title: 'Full-Stack Deployment', description: 'Production deployment, CI/CD pipelines, SSR, and web performance optimization.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "Your current path is building browser and JavaScript fundamentals before moving into React and full-stack development.",
    nextStep: "Complete today's web development mission to build dynamic, responsive user interfaces."
  },
  diagnosticQuestions: [
    {
      id: 'web_dq1',
      subjectKey: 'web-development',
      conceptKey: 'html-css',
      concept: 'Semantic HTML',
      difficulty: 'BEGINNER',
      question: 'Which HTML5 element should be used for the primary navigation links of a page?',
      options: [
        { id: 'A', text: '<nav>' },
        { id: 'B', text: '<div class="nav">' },
        { id: 'C', text: '<header>' },
        { id: 'D', text: '<section>' }
      ],
      correctAnswer: 'A',
      explanation: '<nav> provides semantic meaning to user agents and screen readers for navigation blocks.'
    },
    {
      id: 'web_dq2',
      subjectKey: 'web-development',
      conceptKey: 'html-css',
      concept: 'CSS Box Model',
      difficulty: 'BEGINNER',
      question: 'What does `box-sizing: border-box` do in CSS?',
      options: [
        { id: 'A', text: 'Includes padding and border in the specified width and height' },
        { id: 'B', text: 'Adds a black border to the element' },
        { id: 'C', text: 'Excludes padding from element dimensions' },
        { id: 'D', text: 'Stretches the element to fill its parent' }
      ],
      correctAnswer: 'A',
      explanation: 'border-box causes width and height to include content, padding, and border, simplifying layout calculations.'
    },
    {
      id: 'web_dq3',
      subjectKey: 'web-development',
      conceptKey: 'javascript-fundamentals',
      concept: 'JavaScript Closures',
      difficulty: 'INTERMEDIATE',
      question: 'What is a closure in JavaScript?',
      options: [
        { id: 'A', text: 'A function bundled together with references to its surrounding lexical environment' },
        { id: 'B', text: 'A method to close database connections' },
        { id: 'C', text: 'A syntax error during execution' },
        { id: 'D', text: 'A tool for minifying JavaScript bundle files' }
      ],
      correctAnswer: 'A',
      explanation: 'A closure gives an inner function access to an outer function\'s scope even after the outer function has returned.'
    },
    {
      id: 'web_dq4',
      subjectKey: 'web-development',
      conceptKey: 'dom-browser-apis',
      concept: 'DOM Events',
      difficulty: 'INTERMEDIATE',
      question: 'What is event delegation in JavaScript?',
      options: [
        { id: 'A', text: 'Attaching a single event listener to a parent element to handle events on descendant elements' },
        { id: 'B', text: 'Passing functions as component props in React' },
        { id: 'C', text: 'Cancelling all default browser keyboard triggers' },
        { id: 'D', text: 'Delegating server-side requests to a web worker thread' }
      ],
      correctAnswer: 'A',
      explanation: 'Event delegation leverages event bubbling to handle child events with a single listener on a parent.'
    },
    {
      id: 'web_dq5',
      subjectKey: 'web-development',
      conceptKey: 'react-fundamentals',
      concept: 'React Virtual DOM',
      difficulty: 'INTERMEDIATE',
      question: 'What is the primary benefit of the React Virtual DOM?',
      options: [
        { id: 'A', text: 'Minimizes costly direct real DOM updates via efficient diffing' },
        { id: 'B', text: 'Encrypts browser state storage' },
        { id: 'C', text: 'Bypasses JavaScript execution entirely' },
        { id: 'D', text: 'Replaces CSS stylesheets' }
      ],
      correctAnswer: 'A',
      explanation: 'React compares Virtual DOM trees (reconciliation) and batches minimal updates to the actual browser DOM.'
    },
    {
      id: 'web_dq6',
      subjectKey: 'web-development',
      conceptKey: 'state-data-fetching',
      concept: 'React State',
      difficulty: 'INTERMEDIATE',
      question: 'Why should React state never be mutated directly (e.g. `state.count = 5`)?',
      options: [
        { id: 'A', text: 'Direct mutations do not trigger component re-renders' },
        { id: 'B', text: 'It triggers immediate browser crashes' },
        { id: 'C', text: 'React automatically converts strings to numbers' },
        { id: 'D', text: 'It deletes the component from the DOM tree' }
      ],
      correctAnswer: 'A',
      explanation: 'React detects state changes via object identity comparisons during setter calls; direct mutations bypass this.'
    },
    {
      id: 'web_dq7',
      subjectKey: 'web-development',
      conceptKey: 'backend-apis',
      concept: 'REST APIs',
      difficulty: 'ADVANCED',
      question: 'Which HTTP method should be used to partially update an existing resource in a RESTful API?',
      options: [
        { id: 'A', text: 'GET' },
        { id: 'B', text: 'PUT' },
        { id: 'C', text: 'PATCH' },
        { id: 'D', text: 'POST' }
      ],
      correctAnswer: 'C',
      explanation: 'PATCH applies partial modifications to a resource, while PUT replaces the target resource entirely.'
    },
    {
      id: 'web_dq8',
      subjectKey: 'web-development',
      conceptKey: 'authentication',
      concept: 'Web Security & CORS',
      difficulty: 'ADVANCED',
      question: 'What problem does Cross-Origin Resource Sharing (CORS) address in web browsers?',
      options: [
        { id: 'A', text: 'Enables servers to specify which origins are allowed to read responses in the browser' },
        { id: 'B', text: 'Compresses image files during network transfers' },
        { id: 'C', text: 'Provides automatic database password hashing' },
        { id: 'D', text: 'Prevents SQL injection vulnerabilities' }
      ],
      correctAnswer: 'A',
      explanation: 'CORS uses HTTP headers to allow servers to declare which foreign origins can access API resources.'
    }
  ],
  missions: [
    {
      id: 'web-m1',
      topicKey: 'html-css',
      title: 'HTML & CSS Foundations — Page Structure',
      description: 'Master semantic layout, CSS flexbox containers, and responsive design principles.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Semantic Markup & CSS Layouts',
        content: 'Semantic HTML tags (<header>, <main>, <article>, <nav>) describe document meaning. CSS Flexbox provides one-dimensional alignment.',
        interactiveExample: {
          language: 'css',
          code: '.container { display: flex; justify-content: space-between; align-items: center; }',
          explanation: 'Flexbox aligns items along main and cross axes dynamically.'
        }
      },
      practice: {
        question: 'Which CSS property property includes padding and border in an element\'s total width?',
        options: [
          { id: 'A', text: 'box-sizing: border-box' },
          { id: 'B', text: 'box-sizing: content-box' },
          { id: 'C', text: 'display: flex' },
          { id: 'D', text: 'margin: auto' }
        ],
        correctAnswerId: 'A',
        explanation: 'border-box bounds element dimensions inclusive of padding and border.'
      },
      review: {
        title: 'HTML & CSS Review',
        pitfalls: ['Overusing unsemantic <div> elements for all layout structures', 'Margin collapsing between adjacent block elements'],
        edgeCases: ['Small mobile viewport rendering', 'High contrast browser accessibility modes'],
        keyTakeaway: 'Prioritize semantic HTML structure before adding CSS styling.'
      },
      interview: {
        title: 'Technical Viva: CSS Box Model',
        question: 'Explain the components of the CSS Box Model.',
        hint: 'Content, padding, border, and margin.',
        keyPoints: ['Content area', 'Padding surrounding content', 'Border boundary', 'Outer margin space between elements']
      }
    },
    {
      id: 'web-m2',
      topicKey: 'javascript-fundamentals',
      title: 'JavaScript Fundamentals — Closures & Scope',
      description: 'Understand lexical scoping, closures, and execution context.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Lexical Scopes and Closures',
        content: 'Functions retain access to variables declared in their outer lexical scope even after the outer function finishes execution.',
        interactiveExample: {
          language: 'javascript',
          code: 'function createCounter() { let count = 0; return () => ++count; }',
          explanation: 'The returned inner arrow function closes over count variable.'
        }
      },
      practice: {
        question: 'What is a closure in JavaScript?',
        options: [
          { id: 'A', text: 'A function that retains access to its outer lexical scope' },
          { id: 'B', text: 'Closing a browser tab' },
          { id: 'C', text: 'A loop termination statement' },
          { id: 'D', text: 'A database handle shutdown function' }
        ],
        correctAnswerId: 'A',
        explanation: 'Closures bundle functions with references to surrounding state.'
      },
      review: {
        title: 'JavaScript Review',
        pitfalls: ['Variable hoisting confusion with `var` vs `let`/`const`'],
        edgeCases: ['Asynchronous loops sharing `var` variables'],
        keyTakeaway: 'Use `let` and `const` to scope variables block-wise.'
      },
      interview: {
        title: 'Technical Viva: JavaScript Event Loop',
        question: 'How does the JavaScript Event Loop handle microtasks vs macrotasks?',
        hint: 'Promises vs setTimeout.',
        keyPoints: ['Microtask queue (Promises) empties completely before the next macrotask (setTimeout) runs']
      }
    },
    {
      id: 'web-m3',
      topicKey: 'dom-browser-apis',
      title: 'DOM & Browser APIs — Interactive Interfaces',
      description: 'Master event bubbling, DOM queries, and web storage.',
      estimatedMinutes: 45,
      lesson: {
        title: 'DOM Event Propagation',
        content: 'Events propagate through Capturing, Target, and Bubbling phases. Event delegation listens at parent nodes.',
        interactiveExample: {
          language: 'javascript',
          code: 'document.addEventListener("click", (e) => { if (e.target.matches(".btn")) { ... } });',
          explanation: 'One event listener handles multiple dynamic child buttons.'
        }
      },
      practice: {
        question: 'What is event delegation?',
        options: [
          { id: 'A', text: 'Using one listener on a parent element to manage child element events' },
          { id: 'B', text: 'Delegating API requests to web workers' },
          { id: 'C', text: 'Cancelling form submits' },
          { id: 'D', text: 'Rendering components on server' }
        ],
        correctAnswerId: 'A',
        explanation: 'Event delegation uses event bubbling to catch events on a parent node.'
      },
      review: {
        title: 'DOM Review',
        pitfalls: ['Memory leaks caused by detached DOM nodes with unremoved event listeners'],
        edgeCases: ['Rapid resize/scroll event triggers without debouncing'],
        keyTakeaway: 'Clean up listeners when elements are removed from the DOM.'
      },
      interview: {
        title: 'Technical Viva: Debounce vs Throttle',
        question: 'What is the difference between debouncing and throttling a function?',
        hint: 'Delaying execution after inactivity vs rate-limiting to a fixed interval.',
        keyPoints: ['Debounce waits until events stop firing for N ms', 'Throttle ensures function runs at most once per N ms']
      }
    },
    {
      id: 'web-m4',
      topicKey: 'react-fundamentals',
      title: 'React Fundamentals — Components & Props',
      description: 'Master declarative UI composition, JSX, and component props.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Declarative React Component Trees',
        content: 'React components are pure functions returning JSX layout. Props pass data top-down.',
        interactiveExample: {
          language: 'typescript',
          code: 'function Card({ title }: { title: string }) { return <h2>{title}</h2>; }',
          explanation: 'Props pass read-only data from parent to child components.'
        }
      },
      practice: {
        question: 'What is the main role of the React Virtual DOM?',
        options: [
          { id: 'A', text: 'Perform efficient diffing to minimize actual browser DOM updates' },
          { id: 'B', text: 'Replace CSS' },
          { id: 'C', text: 'Run backend server queries' },
          { id: 'D', text: 'Provide local storage encryption' }
        ],
        correctAnswerId: 'A',
        explanation: 'The Virtual DOM diffs tree changes to compute optimal real DOM patches.'
      },
      review: {
        title: 'React Fundamentals Review',
        pitfalls: ['Mutating props inside child components'],
        edgeCases: ['Missing `key` props on mapped array items'],
        keyTakeaway: 'Treat props as immutable data contracts.'
      },
      interview: {
        title: 'Technical Viva: React Reconciliation',
        question: 'Why are `key` props important when rendering list items in React?',
        hint: 'Component identity tracking during re-renders.',
        keyPoints: ['Keys identify items across render cycles', 'Prevents unnecessary component re-mounting and state bugs']
      }
    },
    {
      id: 'web-m5',
      topicKey: 'state-data-fetching',
      title: 'State & Data Fetching — Hooks & Async Data',
      description: 'Master component state management and async API integration with useEffect.',
      estimatedMinutes: 60,
      lesson: {
        title: 'React State Lifecycle and Effects',
        content: '`useState` manages local state. `useEffect` synchronizes external systems and data fetching calls.',
        interactiveExample: {
          language: 'typescript',
          code: 'useEffect(() => { fetch("/api/data").then(res => res.json()).then(setData); }, []);',
          explanation: 'Empty dependency array runs effect once on component mount.'
        }
      },
      practice: {
        question: 'Why must state updates use setter functions instead of direct assignment?',
        options: [
          { id: 'A', text: 'Setters trigger React re-render cycles' },
          { id: 'B', text: 'Direct assignment causes compiler errors' },
          { id: 'C', text: 'Setters encrypt state memory' },
          { id: 'D', text: 'Direct assignment deletes local storage' }
        ],
        correctAnswerId: 'A',
        explanation: 'State setters notify React to schedule a component re-render.'
      },
      review: {
        title: 'State & Fetching Review',
        pitfalls: ['Missing dependencies in useEffect leading to stale closures'],
        edgeCases: ['Race conditions from uncancelled async fetch promises'],
        keyTakeaway: 'Always include referenced state/props inside useEffect dependency arrays.'
      },
      interview: {
        title: 'Technical Viva: Custom React Hooks',
        question: 'What is a Custom Hook in React and why would you write one?',
        hint: 'Encapsulating reusable stateful logic.',
        keyPoints: ['Functions prefixed with `use` that call other hooks', 'Extracts and shares stateful behavior across components']
      }
    },
    {
      id: 'web-m6',
      topicKey: 'backend-apis',
      title: 'Backend APIs — Node.js & Express Routing',
      description: 'Master server HTTP request handling, middleware pipelines, and REST design.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Express HTTP Server Routes',
        content: 'Node.js powers non-blocking server applications. Express manages routes, middleware, and request/response payloads.',
        interactiveExample: {
          language: 'javascript',
          code: 'app.get("/api/users", (req, res) => res.json(users));',
          explanation: 'Express routes map HTTP verbs and paths to handler functions.'
        }
      },
      practice: {
        question: 'Which HTTP method is appropriate for partial updates to a resource?',
        options: [
          { id: 'A', text: 'PATCH' },
          { id: 'B', text: 'GET' },
          { id: 'C', text: 'POST' },
          { id: 'D', text: 'DELETE' }
        ],
        correctAnswerId: 'A',
        explanation: 'PATCH applies partial modifications to existing API resources.'
      },
      review: {
        title: 'Backend APIs Review',
        pitfalls: ['Forgetting `next(error)` in async Express error middleware handlers'],
        edgeCases: ['Handling large JSON payload parsing memory limits'],
        keyTakeaway: 'Structure APIs cleanly with standard REST HTTP verbs and status codes.'
      },
      interview: {
        title: 'Technical Viva: Express Middleware',
        question: 'How does the middleware pipeline function in Express?',
        hint: 'Request-response cycle and `next()` calls.',
        keyPoints: ['Middleware functions execute sequentially', 'Call `next()` to pass control to the subsequent handler']
      }
    },
    {
      id: 'web-m7',
      topicKey: 'authentication',
      title: 'Authentication & Security — Sessions & JWTs',
      description: 'Understand user authentication, secure token storage, and web security policies.',
      estimatedMinutes: 60,
      lesson: {
        title: 'JSON Web Tokens and Cookie Security',
        content: 'JWTs digitally sign user identities. Store tokens in HTTP-only cookies to mitigate XSS attacks.',
        interactiveExample: {
          language: 'javascript',
          code: 'res.cookie("token", jwtToken, { httpOnly: true, secure: true });',
          explanation: 'HttpOnly cookies prevent client-side JavaScript access to token cookies.'
        }
      },
      practice: {
        question: 'What security mechanism controls cross-origin API requests in browsers?',
        options: [
          { id: 'A', text: 'CORS (Cross-Origin Resource Sharing)' },
          { id: 'B', text: 'JWT' },
          { id: 'C', text: 'Bcrypt' },
          { id: 'D', text: 'DOM' }
        ],
        correctAnswerId: 'A',
        explanation: 'CORS header policies regulate cross-origin browser HTTP requests.'
      },
      review: {
        title: 'Web Security Review',
        pitfalls: ['Storing sensitive JWT tokens in localStorage vulnerable to XSS script injection'],
        edgeCases: ['CORS preflight OPTIONS requests failing on custom authorization headers'],
        keyTakeaway: 'Always use HttpOnly SameSite cookies for session token persistence.'
      },
      interview: {
        title: 'Technical Viva: XSS vs CSRF',
        question: 'Explain the difference between Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF).',
        hint: 'Injecting malicious scripts vs tricking browsers into sending credentials.',
        keyPoints: ['XSS executes unauthorized scripts in user browser context', 'CSRF tricks browser into executing unwanted commands on trusted app']
      }
    },
    {
      id: 'web-m8',
      topicKey: 'fullstack-project',
      title: 'Full-Stack Deployment — Production Readiness',
      description: 'Master full-stack web application deployment, build optimization, and hosting.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Building and Deploying Modern Web Apps',
        content: 'Modern web applications use build tools (Vite, Next.js) to bundle JS/CSS assets, optimize images, and run SSR.',
        interactiveExample: {
          language: 'bash',
          code: 'npm run build && next start',
          explanation: 'Build scripts compile optimized production bundles.'
        }
      },
      practice: {
        question: 'What is the main benefit of Server-Side Rendering (SSR)?',
        options: [
          { id: 'A', text: 'Faster initial page load HTML rendering and improved SEO' },
          { id: 'B', text: 'Eliminates the need for CSS' },
          { id: 'C', text: 'Disables browser cache' },
          { id: 'D', text: 'Removes Node.js requirement' }
        ],
        correctAnswerId: 'A',
        explanation: 'SSR pre-renders HTML on the server, providing fast initial paint and crawlable content for search engines.'
      },
      review: {
        title: 'Deployment Review',
        pitfalls: ['Leaking server secret keys into client-side public bundles'],
        edgeCases: ['Cache invalidation failure on updated static asset bundles'],
        keyTakeaway: 'Strictly separate public environment variables from secret backend keys.'
      },
      interview: {
        title: 'Technical Viva: Web Performance Metrics',
        question: 'What are Core Web Vitals and why are they important?',
        hint: 'LCP, FID/INP, and CLS.',
        keyPoints: ['LCP measures loading performance', 'INP measures interactivity', 'CLS measures visual layout stability']
      }
    }
  ]
};
