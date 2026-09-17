import { SubjectCurriculum } from './types';

export const dsaCurriculum: SubjectCurriculum = {
  key: 'dsa',
  label: 'Data Structures & Algorithms',
  roadmapTitle: 'Placement Data Structures & Algorithms Track',
  roadmapDescription: 'Master foundational problem solving, space-time complexities, and core data structures for SDE technical interviews.',
  roadmapSteps: [
    { id: 'dsa-1', topicKey: 'arrays-strings', title: 'Arrays & Strings', description: 'Contiguous memory layout, prefix sums, and sliding pointer techniques.', order: 1, estimatedMinutes: 45 },
    { id: 'dsa-2', topicKey: 'two-pointers', title: 'Two Pointers & Sliding Window', description: 'Converging boundaries, expanding/contracting windows for O(N) operations.', order: 2, estimatedMinutes: 45 },
    { id: 'dsa-3', topicKey: 'linked-lists', title: 'Linked Lists', description: 'Pointers, node traversals, cycle detection, and list reversal.', order: 3, estimatedMinutes: 45 },
    { id: 'dsa-4', topicKey: 'stacks-queues', title: 'Stacks & Queues', description: 'LIFO and FIFO ordering, monotonic stack patterns, and queue design.', order: 4, estimatedMinutes: 45 },
    { id: 'dsa-5', topicKey: 'binary-search', title: 'Binary Search', description: 'Logarithmic search spaces, boundary conditions, and search on answer.', order: 5, estimatedMinutes: 45 },
    { id: 'dsa-6', topicKey: 'trees', title: 'Trees & Binary Trees', description: 'Hierarchical traversals (In-order, Pre-order, Post-order) and BST invariants.', order: 6, estimatedMinutes: 60 },
    { id: 'dsa-7', topicKey: 'graphs', title: 'Graphs', description: 'Adjacency representations, BFS shortest path, DFS, and topological sorting.', order: 7, estimatedMinutes: 60 },
    { id: 'dsa-8', topicKey: 'dynamic-programming', title: 'Dynamic Programming', description: 'Overlapping subproblems, optimal substructure, and state space optimization.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "You're strengthening the foundational problem-solving patterns needed for software engineering technical rounds.",
    nextStep: "Complete today's mission to master linear data structures and algorithmic space-time complexity."
  },
  diagnosticQuestions: [
    {
      id: 'dsa_dq1',
      subjectKey: 'dsa',
      conceptKey: 'arrays',
      concept: 'Arrays',
      difficulty: 'BEGINNER',
      question: 'What is the time complexity of accessing an element by index in a contiguous array?',
      options: [
        { id: 'A', text: 'O(1)' },
        { id: 'B', text: 'O(N)' },
        { id: 'C', text: 'O(log N)' },
        { id: 'D', text: 'O(N^2)' }
      ],
      correctAnswer: 'A',
      explanation: 'Arrays store elements in contiguous memory, allowing O(1) random access by index calculation.'
    },
    {
      id: 'dsa_dq2',
      subjectKey: 'dsa',
      conceptKey: 'linked-lists',
      concept: 'Linked Lists',
      difficulty: 'BEGINNER',
      question: 'What is the worst-case time complexity for inserting a node at the head of a singly linked list?',
      options: [
        { id: 'A', text: 'O(1)' },
        { id: 'B', text: 'O(N)' },
        { id: 'C', text: 'O(log N)' },
        { id: 'D', text: 'O(N^2)' }
      ],
      correctAnswer: 'A',
      explanation: 'Inserting at the head requires updating the new node\'s next pointer and moving the head reference in constant O(1) time.'
    },
    {
      id: 'dsa_dq3',
      subjectKey: 'dsa',
      conceptKey: 'stacks',
      concept: 'Stacks',
      difficulty: 'BEGINNER',
      question: 'Which ordering principle governs the behavior of a Stack data structure?',
      options: [
        { id: 'A', text: 'FIFO (First In First Out)' },
        { id: 'B', text: 'LIFO (Last In First Out)' },
        { id: 'C', text: 'Random Access' },
        { id: 'D', text: 'Priority Order' }
      ],
      correctAnswer: 'B',
      explanation: 'Stacks operate under LIFO, where the last pushed element is the first to be popped.'
    },
    {
      id: 'dsa_dq4',
      subjectKey: 'dsa',
      conceptKey: 'two-pointers',
      concept: 'Two Pointers',
      difficulty: 'INTERMEDIATE',
      question: 'In the sliding window technique over an array of size N, what is the maximum number of times left and right pointers advance in total?',
      options: [
        { id: 'A', text: 'N times' },
        { id: 'B', text: '2N times' },
        { id: 'C', text: 'N^2 times' },
        { id: 'D', text: 'N log N times' }
      ],
      correctAnswer: 'B',
      explanation: 'Both left and right pointers move strictly forward from 0 to N, leading to at most 2N total pointer steps.'
    },
    {
      id: 'dsa_dq5',
      subjectKey: 'dsa',
      conceptKey: 'binary-search',
      concept: 'Binary Search',
      difficulty: 'INTERMEDIATE',
      question: 'What prerequisite must a collection satisfy to apply Binary Search?',
      options: [
        { id: 'A', text: 'Elements must be positive integers' },
        { id: 'B', text: 'Collection must be sorted or exhibit a monotonic property' },
        { id: 'C', text: 'Collection must be a linked list' },
        { id: 'D', text: 'Collection must contain no duplicates' }
      ],
      correctAnswer: 'B',
      explanation: 'Binary Search relies on a monotonic order to eliminate half the search space in each step.'
    },
    {
      id: 'dsa_dq6',
      subjectKey: 'dsa',
      conceptKey: 'trees',
      concept: 'Trees',
      difficulty: 'INTERMEDIATE',
      question: 'Which Binary Search Tree traversal visits nodes in strictly ascending sorted order?',
      options: [
        { id: 'A', text: 'Pre-order' },
        { id: 'B', text: 'In-order' },
        { id: 'C', text: 'Post-order' },
        { id: 'D', text: 'Level-order' }
      ],
      correctAnswer: 'B',
      explanation: 'In-order traversal visits Left -> Root -> Right, yielding sorted order in a BST.'
    },
    {
      id: 'dsa_dq7',
      subjectKey: 'dsa',
      conceptKey: 'graphs',
      concept: 'Graphs',
      difficulty: 'ADVANCED',
      question: 'Which graph traversal algorithm guarantees finding the shortest path in an unweighted graph?',
      options: [
        { id: 'A', text: 'Depth-First Search (DFS)' },
        { id: 'B', text: 'Breadth-First Search (BFS)' },
        { id: 'C', text: 'Topological Sort' },
        { id: 'D', text: 'Kruskal\'s Algorithm' }
      ],
      correctAnswer: 'B',
      explanation: 'BFS explores graph nodes level by level, ensuring the first arrival at a node is via the shortest path in unweighted graphs.'
    },
    {
      id: 'dsa_dq8',
      subjectKey: 'dsa',
      conceptKey: 'dynamic-programming',
      concept: 'Dynamic Programming',
      difficulty: 'ADVANCED',
      question: 'What two properties indicate that a problem can be solved using Dynamic Programming?',
      options: [
        { id: 'A', text: 'Greedy choice property & sorted inputs' },
        { id: 'B', text: 'Overlapping subproblems & optimal substructure' },
        { id: 'C', text: 'Divide-and-conquer & random pivots' },
        { id: 'D', text: 'Graph completeness & zero cycles' }
      ],
      correctAnswer: 'B',
      explanation: 'DP requires optimal substructure (subproblems form optimal solution) and overlapping subproblems (memoizable computations).'
    }
  ],
  missions: [
    {
      id: 'dsa-m1',
      topicKey: 'arrays-strings',
      title: 'Arrays & Strings — Efficient Traversal',
      description: 'Master linear array indexing, contiguous memory layouts, and prefix sum calculations.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Arrays and Memory Layout',
        content: 'Arrays store elements in contiguous memory locations. Accessing index i uses `base_address + i * size`, granting O(1) random access.',
        interactiveExample: {
          language: 'typescript',
          code: 'const nums = [1, 2, 3, 4];\nconst prefix = [0, 1, 3, 6, 10];',
          explanation: 'Prefix sums enable constant-time range sum queries.'
        }
      },
      practice: {
        question: 'What is the time complexity of accessing an array element by index?',
        options: [
          { id: 'A', text: 'O(1)' },
          { id: 'B', text: 'O(N)' },
          { id: 'C', text: 'O(log N)' },
          { id: 'D', text: 'O(N^2)' }
        ],
        correctAnswerId: 'A',
        explanation: 'Random access by index is an O(1) operation due to direct memory pointer arithmetic.'
      },
      review: {
        title: 'Arrays & Strings Review',
        pitfalls: ['Off-by-one errors when indexing bounds', 'String immutability creating O(N^2) dynamic string allocations'],
        edgeCases: ['Empty array', 'Array with 1 element', 'All negative numbers'],
        keyTakeaway: 'Utilize contiguous spatial locality and prefix sums to optimize range calculations.'
      },
      interview: {
        title: 'Technical Viva: Array Locality',
        question: 'Why is random access in an array O(1)?',
        hint: 'Discuss contiguous memory addresses and pointer arithmetic.',
        keyPoints: ['Elements reside in adjacent memory slots', 'Address = Base + Index * Size', 'L1/L2 hardware CPU cache line prefetching']
      }
    },
    {
      id: 'dsa-m2',
      topicKey: 'two-pointers',
      title: 'Two Pointers — Eliminating Nested Loops',
      description: 'Master converging pointers and dynamic sliding window bounds.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Two Pointer Paradigms',
        content: 'Two pointers maintain dynamic search boundaries across sorted collections in linear O(N) time.',
        interactiveExample: {
          language: 'typescript',
          code: 'let left = 0, right = nums.length - 1;\nwhile(left < right) { ... }',
          explanation: 'Converging pointers eliminate O(N^2) pair searching.'
        }
      },
      practice: {
        question: 'How many total steps do left and right pointers take across a sliding window of size N?',
        options: [
          { id: 'A', text: 'At most N' },
          { id: 'B', text: 'At most 2N' },
          { id: 'C', text: 'N^2' },
          { id: 'D', text: 'N log N' }
        ],
        correctAnswerId: 'B',
        explanation: 'Each pointer advances from 0 to N at most once, bounding total steps to 2N = O(N).'
      },
      review: {
        title: 'Two Pointers Review',
        pitfalls: ['Applying two pointers on unsorted arrays without sorting first'],
        edgeCases: ['Target cannot be formed', 'All identical elements'],
        keyTakeaway: 'Use sliding windows whenever searching contiguous subarrays under monotonic invariants.'
      },
      interview: {
        title: 'Technical Viva: Two Pointers',
        question: 'When would you prefer Two Pointers over a Hash Map?',
        hint: 'Discuss auxiliary space constraints.',
        keyPoints: ['Two pointers requires O(1) extra space', 'Avoids hash allocation and GC overhead']
      }
    },
    {
      id: 'dsa-m3',
      topicKey: 'linked-lists',
      title: 'Linked Lists — Pointer Fundamentals',
      description: 'Understand node references, memory pointers, and linked list traversal.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Linked List Nodes',
        content: 'Singly linked lists store nodes with data and a reference pointer to the next node.',
        interactiveExample: {
          language: 'typescript',
          code: 'class ListNode { val: number; next: ListNode | null = null; }',
          explanation: 'Nodes can be inserted or deleted in O(1) time at known pointer locations.'
        }
      },
      practice: {
        question: 'What is the time complexity of inserting a node at the head of a linked list?',
        options: [
          { id: 'A', text: 'O(1)' },
          { id: 'B', text: 'O(N)' },
          { id: 'C', text: 'O(log N)' },
          { id: 'D', text: 'O(N^2)' }
        ],
        correctAnswerId: 'A',
        explanation: 'Updating head node references takes constant O(1) time.'
      },
      review: {
        title: 'Linked List Review',
        pitfalls: ['Losing the head reference during updates', 'Null pointer dereferences'],
        edgeCases: ['Empty list', 'Single node list', 'Cycles in list'],
        keyTakeaway: 'Always handle null pointers and dummy head nodes carefully.'
      },
      interview: {
        title: 'Technical Viva: Linked Lists vs Arrays',
        question: 'When would you choose a linked list over an array?',
        hint: 'Consider insertion/deletion cost at head and dynamic size requirements.',
        keyPoints: ['O(1) insertions without array reallocation', 'No initial capacity pre-allocation required']
      }
    },
    {
      id: 'dsa-m4',
      topicKey: 'stacks-queues',
      title: 'Stacks & Queues — Choosing the Right Structure',
      description: 'Master LIFO and FIFO execution flows for problem solving.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Stack & Queue Operations',
        content: 'Stacks process data in LIFO order (Push/Pop), while Queues process data in FIFO order (Enqueue/Dequeue).',
        interactiveExample: {
          language: 'typescript',
          code: 'const stack = []; stack.push(1); const val = stack.pop();',
          explanation: 'LIFO access is ideal for function call stacks and expression parsing.'
        }
      },
      practice: {
        question: 'Which operations are used to add and remove items from a Queue?',
        options: [
          { id: 'A', text: 'Enqueue and Dequeue' },
          { id: 'B', text: 'Push and Pop' },
          { id: 'C', text: 'Insert and Delete' },
          { id: 'D', text: 'Append and Remove' }
        ],
        correctAnswerId: 'A',
        explanation: 'Enqueue adds to the rear, while Dequeue removes from the front.'
      },
      review: {
        title: 'Stacks & Queues Review',
        pitfalls: ['Popping from an empty stack/queue without checking size'],
        edgeCases: ['Empty container', 'Single element container'],
        keyTakeaway: 'Match LIFO for nested execution and FIFO for order-preserving buffers.'
      },
      interview: {
        title: 'Technical Viva: Monotonic Stack',
        question: 'What is a Monotonic Stack used for?',
        hint: 'Finding Next Greater or Next Smaller Element in linear time.',
        keyPoints: ['Stores elements in strictly increasing/decreasing order', 'Answers Next Greater Element in O(N) total time']
      }
    },
    {
      id: 'dsa-m5',
      topicKey: 'binary-search',
      title: 'Binary Search — Reducing the Search Space',
      description: 'Master divide and conquer on ordered search spaces.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Logarithmic Search Spaces',
        content: 'Binary Search halves candidate sets on each iteration, achieving O(log N) time.',
        interactiveExample: {
          language: 'typescript',
          code: 'let low = 0, high = arr.length - 1;\nwhile(low <= high) { ... }',
          explanation: 'Mid calculation `low + Math.floor((high - low) / 2)` prevents integer overflow.'
        }
      },
      practice: {
        question: 'How many iterations does Binary Search take on an array of 1,000,000 sorted elements?',
        options: [
          { id: 'A', text: 'At most 20 iterations' },
          { id: 'B', text: '500,000 iterations' },
          { id: 'C', text: '1,000 iterations' },
          { id: 'D', text: '100 iterations' }
        ],
        correctAnswerId: 'A',
        explanation: 'log2(1,000,000) ≈ 19.93, so binary search requires at most 20 comparisons.'
      },
      review: {
        title: 'Binary Search Review',
        pitfalls: ['Infinite loops caused by incorrect boundary updates (`low = mid` instead of `mid + 1`)'],
        edgeCases: ['Target smaller than min element', 'Target larger than max element'],
        keyTakeaway: 'Ensure the search interval strictly shrinks during every loop iteration.'
      },
      interview: {
        title: 'Technical Viva: Binary Search on Monotonic Functions',
        question: 'How can Binary Search be applied when there is no input array?',
        hint: 'Search on answer ranges using greedy feasibility checks.',
        keyPoints: ['Range of possible answers [min, max]', 'Monotonic feasibility predicate f(x)', 'O(N log(Range)) execution time']
      }
    },
    {
      id: 'dsa-m6',
      topicKey: 'trees',
      title: 'Trees — Traversal & Recursion',
      description: 'Master binary tree structures and recursive tree algorithms.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Hierarchical Tree Invariants',
        content: 'Trees consist of nodes connected by directed edges. BSTs enforce `left < root < right`.',
        interactiveExample: {
          language: 'typescript',
          code: 'function inorder(node) { if(!node) return; inorder(node.left); visit(node); inorder(node.right); }',
          explanation: 'In-order traversal yields BST keys in sorted order.'
        }
      },
      practice: {
        question: 'Which traversal visits Left -> Root -> Right in a Binary Tree?',
        options: [
          { id: 'A', text: 'In-order' },
          { id: 'B', text: 'Pre-order' },
          { id: 'C', text: 'Post-order' },
          { id: 'D', text: 'Level-order' }
        ],
        correctAnswerId: 'A',
        explanation: 'In-order traversal visits the left subtree, root node, then right subtree.'
      },
      review: {
        title: 'Tree Traversal Review',
        pitfalls: ['Forgetting null checks on leaf node child pointers'],
        edgeCases: ['Null tree', 'Single node tree', 'Unbalanced skewed tree'],
        keyTakeaway: 'Recursion naturally aligns with hierarchical tree subproblems.'
      },
      interview: {
        title: 'Technical Viva: BST vs Hash Table',
        question: 'When is a BST preferred over a Hash Table?',
        hint: 'Range queries and sorted order traversal.',
        keyPoints: ['BST supports O(log N) range queries', 'Maintains sorted order without full sorting step']
      }
    },
    {
      id: 'dsa-m7',
      topicKey: 'graphs',
      title: 'Graphs — BFS & DFS Traversal',
      description: 'Understand graph representations, BFS shortest path, and DFS traversal.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Graph Traversal Paradigms',
        content: 'BFS uses queues for unweighted shortest paths. DFS uses recursion/stacks for topological order and cycles.',
        interactiveExample: {
          language: 'typescript',
          code: 'const queue = [start]; visited.add(start);',
          explanation: 'Nodes must be marked visited immediately upon queue insertion.'
        }
      },
      practice: {
        question: 'What is the time complexity of BFS on an adjacency list graph with V vertices and E edges?',
        options: [
          { id: 'A', text: 'O(V + E)' },
          { id: 'B', text: 'O(V * E)' },
          { id: 'C', text: 'O(V^2)' },
          { id: 'D', text: 'O(E log V)' }
        ],
        correctAnswerId: 'A',
        explanation: 'BFS visits each vertex once and checks each edge once, yielding O(V + E) complexity.'
      },
      review: {
        title: 'Graph Traversal Review',
        pitfalls: ['Forgetting visited sets causing infinite recursion in cyclic graphs'],
        edgeCases: ['Disconnected components', 'Self-loops', 'Graph with 0 edges'],
        keyTakeaway: 'Always track visited nodes to avoid infinite graph cycles.'
      },
      interview: {
        title: 'Technical Viva: BFS vs DFS',
        question: 'Why does BFS guarantee the shortest path in unweighted graphs?',
        hint: 'Layer-by-layer exploration.',
        keyPoints: ['All nodes at distance d are visited before any node at distance d + 1', 'Queue enforces level order']
      }
    },
    {
      id: 'dsa-m8',
      topicKey: 'dynamic-programming',
      title: 'Dynamic Programming — Breaking Problems Into States',
      description: 'Master memoization, tabulation, and state space optimization.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Principles of Dynamic Programming',
        content: 'DP solves problems with overlapping subproblems and optimal substructure by memoizing intermediate results.',
        interactiveExample: {
          language: 'typescript',
          code: 'const dp = new Array(n + 1).fill(0); dp[1] = 1; dp[2] = 2;',
          explanation: 'Tabulation builds solutions bottom-up from base cases.'
        }
      },
      practice: {
        question: 'Which property enables memoization in Dynamic Programming?',
        options: [
          { id: 'A', text: 'Overlapping Subproblems' },
          { id: 'B', text: 'Greedy Choice Property' },
          { id: 'C', text: 'Randomized Pivot' },
          { id: 'D', text: 'Sorting Invariant' }
        ],
        correctAnswerId: 'A',
        explanation: 'Overlapping subproblems mean the same sub-computations recur multiple times and can be cached.'
      },
      review: {
        title: 'Dynamic Programming Review',
        pitfalls: ['Missing initial base cases in DP table initialization'],
        edgeCases: ['n = 0 or n = 1', 'Negative values or invalid capacities'],
        keyTakeaway: 'Formulate state transition equations before writing code.'
      },
      interview: {
        title: 'Technical Viva: DP vs Greedy',
        question: 'What is the main difference between Greedy algorithms and Dynamic Programming?',
        hint: 'Local choice vs evaluating all subproblem combinations.',
        keyPoints: ['Greedy makes locally optimal choices without backtracking', 'DP evaluates all subproblem states to find global optimum']
      }
    }
  ]
};
