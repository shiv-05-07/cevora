import { topicMatches } from './roadmapTemplates';

export interface CurriculumContent {
  topic: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  learn: {
    title: string;
    content: string;
    interactiveExample?: {
      language: string;
      code: string;
      explanation: string;
    };
  };
  practice: {
    question: string;
    options: Array<{ id: string; text: string }>;
    correctAnswerId: string;
    explanation: string;
  };
  review: {
    title: string;
    pitfalls: string[];
    edgeCases: string[];
    keyTakeaway: string;
  };
  interview: {
    title: string;
    question: string;
    hint: string;
    keyPoints: string[];
  };
}

export const TOPIC_CURRICULA: Record<string, CurriculumContent> = {
  // ==========================================
  // DSA TRACK (6 TOPICS)
  // ==========================================
  'Arrays & Strings': {
    topic: 'Arrays & Strings',
    title: 'Mastering Arrays & Strings: In-Place Traversal',
    description: 'Master linear array manipulations, prefix calculations, and memory boundaries for technical interview rounds.',
    category: 'DSA',
    difficulty: 'BEGINNER',
    learn: {
      title: 'Contiguous Memory & In-Place Pointer Manipulation',
      content: `### Overview: Arrays and Contiguous Memory
Arrays store elements in contiguous memory locations, providing $O(1)$ random access by index via pointer arithmetic: \`address = base + index * sizeof(element)\`.

#### Core Principles:
1. **Contiguous Allocation:** High cache locality due to spatial prefetching in CPU L1/L2 caches.
2. **In-Place Modifications:** Reorganizing data without allocating an auxiliary $O(N)$ buffer saves memory and passes strict space constraints.
3. **Prefix Computations:** Accumulating values sequentially allows answering range sum queries in $O(1)$ time after an $O(N)$ precomputation.`,
      interactiveExample: {
        language: 'typescript',
        code: `function buildPrefixSums(nums: number[]): number[] {
  const prefix = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }
  return prefix;
}`,
        explanation: 'The prefix array pre-computes running sums, enabling any range sum between index L and R to be evaluated as prefix[R+1] - prefix[L] in O(1) time.',
      },
    },
    practice: {
      question: 'Given an array `nums` of size N, what is the most space-efficient way to answer M range sum queries `[L, R]`?',
      options: [
        { id: 'a', text: 'Loop through L to R for each query in O(N*M) time and O(1) space.' },
        { id: 'b', text: 'Precompute a prefix sum array in O(N) time and O(N) space, answering each query in O(1) time.' },
        { id: 'c', text: 'Sort the array first to find the bounds in O(N log N) time.' },
        { id: 'd', text: 'Use a 2D matrix storing all pairs in O(N^2) space.' },
      ],
      correctAnswerId: 'b',
      explanation: 'Prefix sums transform each range sum query into a constant-time subtraction: `prefix[R+1] - prefix[L]`. This takes O(N) preprocessing and answers all M queries in O(M) time.',
    },
    review: {
      title: 'Arrays & Strings: Pitfalls & Invariants',
      pitfalls: [
        'Off-by-one errors with prefix sums when 1-indexing vs 0-indexing range intervals.',
        'Buffer overflow or index out of bounds when accessing `i + 1` without bounding `i < length - 1`.',
        'Improper string immutability assumptions (in languages like Java/Python, repeated concatenation inside loops creates O(N^2) allocations; use StringBuilder or array join).',
      ],
      edgeCases: ['Array with 0 or 1 element', 'All negative numbers in range queries', 'Indices where L === R'],
      keyTakeaway: 'Always analyze spatial locality and whether an O(N) precomputation phase reduces high-frequency query latency from O(N) to O(1).',
    },
    interview: {
      title: 'Technical Viva: Contiguous Memory & Cache Locality',
      question: 'Why does iterating through an array tend to be significantly faster than traversing a linked list of the same size, even though both have O(N) time complexity?',
      hint: 'Discuss CPU hardware prefetching, L1/L2 cache lines, and memory fragmentation.',
      keyPoints: [
        'Spatial Locality: Arrays occupy contiguous memory blocks. When one element is read, the CPU pre-fetches the entire cache line (64 bytes) into L1 cache.',
        'Linked list nodes are scattered arbitrarily across the heap, causing frequent CPU cache misses and pointer dereferencing penalties.',
        'Arrays also avoid per-node pointer memory overhead (8 bytes per pointer on 64-bit systems).',
      ],
    },
  },

  'Two Pointers': {
    topic: 'Two Pointers',
    title: 'Mastering Two Pointers & Sliding Window Patterns',
    description: 'Learn how to replace nested O(N^2) loops with elegant O(N) converging pointers and sliding window boundaries.',
    category: 'DSA',
    difficulty: 'BEGINNER',
    learn: {
      title: 'The Converging and Sliding Window Paradigms',
      content: `### Two Pointers & Sliding Window
Instead of checking all pairs or subarrays using nested loops ($O(N^2)$), two pointers maintain dynamic boundaries across a monotonic or sorted collection in $O(N)$ time.

#### Two Primary Variants:
1. **Converging Pointers:** One pointer starts at the left extreme (\`0\`), the other at the right extreme (\`N - 1\`). Pointers move towards each other based on comparison against a target.
2. **Dynamic Sliding Window:** \`left\` and \`right\` define a valid window. Expand \`right\` to include new elements; contract \`left\` as soon as a window invariant is violated.`,
      interactiveExample: {
        language: 'typescript',
        code: `function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
  const counts = new Map<string, number>();
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    counts.set(s[right], (counts.get(s[right]) || 0) + 1);
    while (counts.size > k) {
      const leftChar = s[left];
      counts.set(leftChar, counts.get(leftChar)! - 1);
      if (counts.get(leftChar) === 0) counts.delete(leftChar);
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
        explanation: 'Each character is visited at most twice (once by right, once by left), bounding total operations to O(N).',
      },
    },
    practice: {
      question: 'In the classic Longest Substring Without Repeating Characters problem, what is the worst-case number of pointer movements across a string of length N using a sliding window?',
      options: [
        { id: 'a', text: 'At most N total movements because right only moves forward.' },
        { id: 'b', text: 'At most 2N total movements because left and right each advance at most N times.' },
        { id: 'c', text: 'N^2 movements because of the inner while loop.' },
        { id: 'd', text: 'N log N movements due to hash set operations.' },
      ],
      correctAnswerId: 'b',
      explanation: 'Although there is an inner loop, both `right` and `left` only move strictly forward from 0 to N. Hence the total amortized cost across all iterations is at most 2N = O(N).',
    },
    review: {
      title: 'Two Pointers: Common Pitfalls',
      pitfalls: [
        'Attempting converging two-pointer pair checks on an unsorted array without prior sorting.',
        'Failing to decrement/delete character frequencies when contracting the left window bound.',
        'Prematurely advancing pointers inside nested while loops without verifying boundary `left < right`.',
      ],
      edgeCases: ['Empty string or empty array', 'Target sum cannot be formed', 'All duplicate elements in array'],
      keyTakeaway: 'Whenever an algorithm asks for contiguous subarrays meeting a monotonic condition, sliding window should be your first intuition.',
    },
    interview: {
      title: 'Technical Viva: Two Pointers vs Hash Map Trade-offs',
      question: 'When solving the Two Sum problem, why might an engineer prefer sorting and two pointers over a Hash Map in embedded or high-throughput production environments?',
      hint: 'Consider auxiliary memory allocation, heap fragmentation, and garbage collection pressure.',
      keyPoints: [
        'Hash Map achieves O(N) time but incurs O(N) heap allocations, hash collision overhead, and GC pressure.',
        'Two pointers requires O(1) auxiliary space, which is critical in memory-constrained embedded systems or kernel modules.',
        'If the dataset is already indexed or sorted in storage, two pointers achieves O(N) time with 0 extra memory allocations.',
      ],
    },
  },

  'Binary Search': {
    topic: 'Binary Search',
    title: 'Mastering Binary Search & Search Space Reduction',
    description: 'Master Binary Search logarithmic algorithms, interval boundaries, and predicate-based search spaces.',
    category: 'DSA',
    difficulty: 'BEGINNER',
    learn: {
      title: 'Binary Search Mechanics & Monotonic Invariants',
      content: `### Binary Search: Divide and Conquer
Binary Search reduces candidate spaces from $N$ to $\\log_2 N$ by eliminating half the possibilities in every iteration.

#### Essential Invariants:
1. **Mid Calculation:** Use \`low + Math.floor((high - low) / 2)\` to eliminate potential 32-bit integer overflow.
2. **Search Space:** Define whether your boundary is closed \`[low, high]\` (loop condition \`while (low <= high)\`) or half-open \`[low, high)\` (\`while (low < high)\`).
3. **Monotonic Predicate:** The search space does not need to be an array; it can be any function $f(x) \\in \\{0, 1\\}$ that transitions monotonically from false to true.`,
      interactiveExample: {
        language: 'typescript',
        code: `function lowerBound(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length; // [low, high) half-open

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] >= target) {
      high = mid; // Narrow to left half
    } else {
      low = mid + 1;
    }
  }
  return low;
}`,
        explanation: 'The lower bound invariant returns the first index at which target can be inserted without violating sorted order.',
      },
    },
    practice: {
      question: 'You are searching for the first true value of a monotonic condition `isFeasible(x)` where x is between 1 and 10^9. How many iterations will binary search take in the worst case?',
      options: [
        { id: 'a', text: 'Approximately 30 iterations' },
        { id: 'b', text: 'Approximately 1000 iterations' },
        { id: 'c', text: '10^9 iterations' },
        { id: 'd', text: 'Log10(10^9) = 9 iterations' },
      ],
      correctAnswerId: 'a',
      explanation: 'Since 2^30 is approx 1.07 * 10^9, binary search halves the interval 30 times: log2(10^9) ≈ 29.89. It takes at most 30 steps.',
    },
    review: {
      title: 'Binary Search: Pitfalls & Edge Cases',
      pitfalls: [
        'Infinite loops caused by `high = mid` combined with integer division rounding towards `low`.',
        'Integer overflow from `(low + high) / 2` in standard typed languages.',
      ],
      edgeCases: ['Target smaller than all elements', 'Target larger than all elements', 'Array containing single element'],
      keyTakeaway: 'Always verify your termination condition and make sure your range strictly shrinks on every branch.',
    },
    interview: {
      title: 'Technical Viva: Binary Search on Monotonic Answers',
      question: 'Explain how binary search applies to optimization problems where there is no pre-existing array, such as "Allocate Minimum Pages" or "Capacity to Ship Packages Within D Days".',
      hint: 'Define candidate answers, feasibility checks, and search interval boundaries.',
      keyPoints: [
        'The search space is the range of possible answers [min_answer, max_answer].',
        'A greedy helper function evaluates `canAccomplish(capacity)` in O(N) time.',
        'Because `canAccomplish(capacity)` is monotonic (if valid for C, valid for all > C), binary search identifies the optimal bound in O(N * log(range)).',
      ],
    },
  },

  'Trees & Binary Search Trees': {
    topic: 'Trees & Binary Search Trees',
    title: 'Hierarchical Structures & Binary Search Tree Invariants',
    description: 'Master tree traversals, recursive divide-and-conquer, and BST search-space properties.',
    category: 'DSA',
    difficulty: 'INTERMEDIATE',
    learn: {
      title: 'Tree Traversal & The BST Ordering Property',
      content: `### Binary Trees and Binary Search Trees
A Binary Search Tree (BST) enforces the ordering invariant for every node $N$:
- All nodes in $N$'s left subtree have values $< N.val$.
- All nodes in $N$'s right subtree have values $> N.val$.

#### Traversals:
1. **In-order (Left, Root, Right):** Produces elements in strictly sorted ascending order in a BST.
2. **Pre-order (Root, Left, Right):** Ideal for cloning or serializing tree structures.
3. **Post-order (Left, Right, Root):** Optimal for bottom-up computation (e.g. subtree sizes, tree height, memory deallocation).`,
      interactiveExample: {
        language: 'typescript',
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: number) { this.val = val; }
}

function lowestCommonAncestorBST(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  let curr = root;
  while (curr) {
    if (p.val < curr.val && q.val < curr.val) {
      curr = curr.left; // Both targets in left subtree
    } else if (p.val > curr.val && q.val > curr.val) {
      curr = curr.right; // Both targets in right subtree
    } else {
      return curr; // Split point or exact match is the LCA
    }
  }
  return null;
}`,
        explanation: 'By leveraging the BST invariant, finding the LCA takes O(H) time instead of O(N) required for a generic binary tree.',
      },
    },
    practice: {
      question: 'Which traversal of a Binary Search Tree produces all values in strictly sorted ascending order?',
      options: [
        { id: 'a', text: 'Pre-order traversal' },
        { id: 'b', text: 'In-order traversal' },
        { id: 'c', text: 'Post-order traversal' },
        { id: 'd', text: 'Level-order traversal' },
      ],
      correctAnswerId: 'b',
      explanation: 'In-order traversal visits Left -> Root -> Right. Since in a BST left < root < right, in-order traversal naturally yields elements in sorted order.',
    },
    review: {
      title: 'Trees & BSTs: Pitfalls & Edge Cases',
      pitfalls: [
        'Assuming a tree is balanced; an un-balanced BST degrades to a linked list with O(N) search time.',
        'Validating a BST by only comparing a node to its immediate children rather than carrying global min/max boundaries.',
      ],
      edgeCases: ['Empty tree (null root)', 'Single node tree', 'Tree skewed entirely left or right'],
      keyTakeaway: 'Always pass running valid intervals (min, max) down the call stack when validating BST properties recursively.',
    },
    interview: {
      title: 'Technical Viva: BST vs Hash Table',
      question: 'Compare a self-balancing BST (e.g. Red-Black Tree) against a Hash Table for storing key-value pairs. Under what requirements is a BST strictly preferred?',
      hint: 'Consider range queries, sorted order iteration, and worst-case latency guarantees.',
      keyPoints: [
        'BST supports O(log N) predecessor/successor and range queries (e.g., all items between $10 and $50); Hash Table cannot do range queries without scanning all entries in O(N).',
        'Hash Table has O(1) average lookup but O(N) worst-case on collisions or resizing stalls; Red-Black Trees guarantee O(log N) worst-case latency.',
        'BST preserves strict sorted order with in-order traversal in O(N) time without extra sorting.',
      ],
    },
  },

  'Graphs & BFS/DFS': {
    topic: 'Graphs & BFS/DFS',
    title: 'Graph Traversal: BFS for Shortest Paths & DFS for Topological Sort',
    description: 'Learn graph representations, unweighted shortest path algorithms, cycle detection, and topological ordering.',
    category: 'DSA',
    difficulty: 'INTERMEDIATE',
    learn: {
      title: 'Graph Traversal Paradigms: BFS vs DFS',
      content: `### Graph Theory Fundamentals
A graph $G = (V, E)$ consists of vertices $V$ and edges $E$.

#### Key Representation Trade-offs:
- **Adjacency Matrix ($V \\times V$):** $O(1)$ edge existence query, but $O(V^2)$ space. Inefficient for sparse graphs.
- **Adjacency List:** $O(V + E)$ space. Traversing neighbors takes $O(\\text{deg}(v))$ time. Strictly preferred for interview problems.

#### Core Traversal Principles:
1. **Breadth-First Search (Queue):** Explores vertices layer by layer. Guarantees finding the **shortest path in unweighted graphs**.
2. **Depth-First Search (Stack/Recursion):** Explores as far as possible along each branch before backtracking. Used for cycle detection and Topological Sort (Kahn's or DFS post-order).`,
      interactiveExample: {
        language: 'typescript',
        code: `function shortestPathBFS(graph: number[][], start: number, target: number): number {
  const visited = new Set<number>([start]);
  const queue: [number, number][] = [[start, 0]]; // [node, distance]

  while (queue.length > 0) {
    const [curr, dist] = queue.shift()!;
    if (curr === target) return dist;

    for (const neighbor of graph[curr] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
}`,
        explanation: 'BFS guarantees shortest path in unweighted graphs because nodes at distance d are guaranteed to be dequeued before any node at distance d + 1.',
      },
    },
    practice: {
      question: 'What is the time and space complexity of Breadth-First Search on a graph represented as an adjacency list with V vertices and E edges?',
      options: [
        { id: 'a', text: 'Time: O(V + E), Space: O(V)' },
        { id: 'b', text: 'Time: O(V * E), Space: O(V^2)' },
        { id: 'c', text: 'Time: O(V^2), Space: O(E)' },
        { id: 'd', text: 'Time: O(E log V), Space: O(V + E)' },
      ],
      correctAnswerId: 'a',
      explanation: 'Every vertex is pushed to the queue at most once (O(V)), and every edge is traversed once for directed or twice for undirected (O(E)). Visited set and queue take at most O(V) memory.',
    },
    review: {
      title: 'Graphs: Pitfalls & Cycle Detection',
      pitfalls: [
        'Forgetting to mark a node as visited immediately when adding to the queue in BFS, causing duplicate entries and memory explosions.',
        'Treating undirected graph cycle detection the same as directed graphs (undirected requires ignoring the immediate parent node).',
      ],
      edgeCases: ['Disconnected components', 'Self-loops and multiple parallel edges', 'Graph with 0 edges'],
      keyTakeaway: 'Always mark nodes visited upon queue insertion, not upon queue dequeue.',
    },
    interview: {
      title: 'Technical Viva: BFS vs DFS Memory Consumption',
      question: 'When would DFS consume significantly less memory than BFS, and when would BFS consume less memory than DFS?',
      hint: 'Think about graph diameter vs branching factor (deep narrow trees vs wide shallow trees).',
      keyPoints: [
        'On a graph with a large branching factor (e.g. 10 children per node) and shallow depth, BFS queue stores up to B^D nodes in the last layer, while DFS stack stores only O(B * D). DFS uses drastically less space.',
        'On a very deep graph with branching factor 1 (e.g. linked list of 100,000 nodes), DFS recursion stack risks stack overflow, whereas BFS queue only holds 1 item at a time.',
      ],
    },
  },

  'Dynamic Programming': {
    topic: 'Dynamic Programming',
    title: 'Dynamic Programming: Optimal Substructure & Memoization',
    description: 'Master overlapping subproblems, state space design, memoization, and bottom-up space optimization.',
    category: 'DSA',
    difficulty: 'ADVANCED',
    learn: {
      title: 'The Principles of Dynamic Programming',
      content: `### What Makes a Problem Suitable for DP?
Dynamic Programming is applicable when a problem exhibits:
1. **Optimal Substructure:** An optimal solution to the problem contains within it optimal solutions to subproblems.
2. **Overlapping Subproblems:** The same subproblems are computed repeatedly rather than generating new subproblems.

#### Top-Down vs Bottom-Up:
- **Memoization (Top-Down):** Recursion with a cache table. Only computes reachable states.
- **Tabulation (Bottom-Up):** Iteratively fills a DP table in topological order of dependencies. Allows reducing memory from $O(N)$ or $O(N^2)$ to $O(1)$ or $O(W)$ by only tracking the previous row.`,
      interactiveExample: {
        language: 'typescript',
        code: `function climbStairsSpaceOptimized(n: number): number {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
        explanation: 'Because dp[i] only depends on dp[i-1] and dp[i-2], we maintain state using two variables, reducing space from O(N) to O(1).',
      },
    },
    practice: {
      question: 'In the 0/1 Knapsack problem with N items and maximum weight capacity W, how can the standard 2D DP table `dp[N][W]` be optimized to use only a 1D array of size `W + 1`?',
      options: [
        { id: 'a', text: 'Iterate capacity W from 0 upwards to capacity' },
        { id: 'b', text: 'Iterate capacity W backwards from max capacity down to the item weight' },
        { id: 'c', text: 'Use a bitmask integer representing items' },
        { id: 'd', text: 'Sort items by value-to-weight ratio' },
      ],
      correctAnswerId: 'b',
      explanation: 'Iterating backwards ensures that `dp[w - weight]` represents values from the PREVIOUS item, preventing the current item from being reused multiple times (which would turn it into an Unbounded Knapsack).',
    },
    review: {
      title: 'Dynamic Programming: Pitfalls',
      pitfalls: [
        'Iterating in the wrong direction during 1D table space optimization, accidentally allowing unbounded reuse.',
        'Not defining the base cases explicitly before executing transitions.',
        'Attempting DP on a problem that does not satisfy optimal substructure (e.g. longest simple path in a general graph).',
      ],
      edgeCases: ['Capacity or target value is 0', 'Negative weights or values', 'Array with 0 items'],
      keyTakeaway: 'Always clearly articulate the state definition: what does `dp[i]` or `dp[i][w]` represent precisely?',
    },
    interview: {
      title: 'Technical Viva: Greedy vs Dynamic Programming',
      question: 'Explain the fundamental difference between a Greedy Algorithm and Dynamic Programming. Under what condition does Greedy fail where DP succeeds?',
      hint: 'Discuss local vs global optimum and choice reversibility.',
      keyPoints: [
        'Greedy makes the locally optimal choice at each step and never reconsiders previous choices.',
        'DP considers all subproblem combinations and builds up to the globally optimal solution.',
        'Example: Fractional Knapsack is solved optimally by Greedy; 0/1 Knapsack fails with Greedy because taking a high-density item may prevent packing two items with higher combined value.',
      ],
    },
  },

  // ==========================================
  // OPERATING SYSTEMS TRACK (6 TOPICS)
  // ==========================================
  'Processes & Process Management': {
    topic: 'Processes & Process Management',
    title: 'Operating Systems: Process Life Cycle & Context Switching',
    description: 'Understand Process Control Blocks, process states, system calls, and the mechanics of kernel context switching.',
    category: 'Operating Systems',
    difficulty: 'BEGINNER',
    learn: {
      title: 'Process States, PCB, and Context Switching',
      content: `### What is a Process?
A **Process** is a program in execution. It includes the program code (text), program counter, stack (temporary data/local variables), data section (global variables), and heap (dynamically allocated memory).

#### The Process Control Block (PCB):
The OS kernel maintains a PCB for each active process:
- Process ID (PID) and Process State (New, Ready, Running, Waiting, Terminated).
- CPU registers, stack pointer, and Program Counter (PC).
- Memory management info (page tables, base/limit registers).
- Open file descriptors and I/O status.

#### Context Switch:
When switching CPUs from Process A to Process B:
1. Save the hardware context of A into PCB_A.
2. Update A's state (e.g. Ready or Blocked).
3. Select B via the scheduler.
4. Load B's context from PCB_B into CPU registers.
5. Invalidate or switch TLB entries and page tables.`,
      interactiveExample: {
        language: 'c',
        code: `// Process creation with fork() in POSIX
#include <unistd.h>
#include <sys/wait.h>
#include <stdio.h>

int main() {
    pid_t pid = fork();
    if (pid < 0) {
        perror("fork failed");
    } else if (pid == 0) {
        // Child process
        printf("Child process PID: %d\\n", getpid());
    } else {
        // Parent process
        wait(NULL); // Wait for child to exit
        printf("Child finished. Parent exiting.\\n");
    }
    return 0;
}`,
        explanation: 'fork() creates an exact duplicate child process. It returns 0 in the child and the child PID in the parent.',
      },
    },
    practice: {
      question: 'If a program executes `fork(); fork(); fork();` sequentially with no failures, how many total child processes are created?',
      options: [
        { id: 'a', text: '3 child processes' },
        { id: 'b', text: '7 child processes (8 total processes including parent)' },
        { id: 'c', text: '8 child processes' },
        { id: 'd', text: '6 child processes' },
      ],
      correctAnswerId: 'b',
      explanation: 'Each fork() doubles the number of executing processes: 1 -> 2 -> 4 -> 8. The total processes is 2^3 = 8. Since 1 is the original parent, there are 8 - 1 = 7 child processes created.',
    },
    review: {
      title: 'Process Management: Pitfalls & Edge Cases',
      pitfalls: [
        'Zombie Processes: A child has terminated, but its parent has not yet called `wait()`. The entry remains in the process table.',
        'Orphan Processes: Parent process terminates before child; the orphan is reparented to `init` (PID 1).',
        'Underestimating Context Switch Overhead: High context switch frequencies waste CPU cycles without accomplishing user-space computation.',
      ],
      edgeCases: ['Fork bomb (uncontrolled exponential fork creation exhausting process IDs)', 'Signal delivery to terminated processes'],
      keyTakeaway: 'Always pair process creation with appropriate waitpid handling to prevent zombie accumulation.',
    },
    interview: {
      title: 'Technical Viva: Process vs Thread Architecture',
      question: 'What are the architectural differences between a Process and a Thread? Why is a thread context switch much faster than a process context switch?',
      hint: 'Discuss address space sharing, page table switching, and TLB invalidation.',
      keyPoints: [
        'Processes have separate virtual address spaces; threads within the same process share code, data, heap, and open files, but maintain private stacks and program counters.',
        'A process context switch requires switching page tables (CR3 register in x86), which invalidates the Translation Lookaside Buffer (TLB), causing subsequent memory access cache misses.',
        'Thread switches within the same process retain the same page table and TLB entries, incurring negligible memory mapping overhead.',
      ],
    },
  },

  'Threads & Concurrency': {
    topic: 'Threads & Concurrency',
    title: 'Operating Systems: Threads, Concurrency & Multithreading Models',
    description: 'Master kernel vs user-level threads, race conditions, memory visibility, and Amdahl’s law.',
    category: 'Operating Systems',
    difficulty: 'INTERMEDIATE',
    learn: {
      title: 'Multithreading Models and Race Conditions',
      content: `### Threads: Units of Execution
A thread is the basic unit of CPU utilization. It comprises a Thread ID, program counter, register set, and a stack.

#### Multithreading Models:
1. **Many-to-One:** Multiple user threads mapped to 1 kernel thread. Fast switching in user space, but one blocking system call halts all threads.
2. **One-to-One:** Each user thread maps to a kernel thread (standard in modern Linux/Windows). Provides true multicore parallelism.
3. **Many-to-Many:** M user threads multiplexed across N kernel threads.

#### Race Conditions:
A race condition occurs when multiple threads read and write shared data concurrently, and the final outcome depends on the non-deterministic order of thread scheduling.`,
      interactiveExample: {
        language: 'c',
        code: `// Race condition example
#include <pthread.h>
int counter = 0;

void* increment(void* arg) {
    for (int i = 0; i < 100000; i++) {
        counter++; // NOT atomic: read, modify, write
    }
    return NULL;
}`,
        explanation: 'counter++ compiles to 3 machine instructions: MOV, ADD, MOV. Context switches between these instructions lead to lost updates.',
      },
    },
    practice: {
      question: 'According to Amdahl\'s Law, if 75% of a program can be parallelized, what is the theoretical maximum speedup on an infinite number of CPU cores?',
      options: [
        { id: 'a', text: '4x speedup' },
        { id: 'b', text: '75x speedup' },
        { id: 'c', text: 'Infinite speedup' },
        { id: 'd', text: '1.33x speedup' },
      ],
      correctAnswerId: 'a',
      explanation: 'Amdahl\'s Law: Speedup = 1 / ((1 - P) + P/S). As cores S -> infinity, Speedup = 1 / (1 - P) = 1 / (1 - 0.75) = 1 / 0.25 = 4x.',
    },
    review: {
      title: 'Threads & Concurrency: Pitfalls',
      pitfalls: [
        'Assuming simple memory operations like `counter++` or `bool flag = true` are atomic without synchronization primitives.',
        'False Sharing: Two independent threads updating adjacent variables that reside on the same 64-byte cache line, causing constant cache invalidation.',
      ],
      edgeCases: ['Deadlocks from inverted lock acquisition order', 'Thread starvation under unfair priority scheduling'],
      keyTakeaway: 'Always synchronize access to mutable shared state using mutexes, semaphores, or lock-free atomic primitives.',
    },
    interview: {
      title: 'Technical Viva: User-Level vs Kernel-Level Threads',
      question: 'Why did early operating systems use user-level green threads, and why have modern OS kernels predominantly transitioned to 1:1 kernel-level threads?',
      hint: 'Discuss multicore CPU hardware advancements and blocking I/O calls.',
      keyPoints: [
        'User-level threads avoid the system call overhead of trapping to kernel mode during thread creation and context switching.',
        'However, user-level threads cannot exploit true multicore hardware parallelism because the kernel schedules only 1 thread at a time for that process.',
        'If one user thread executes a blocking I/O system call, the entire process is blocked unless asynchronous I/O hooks are implemented.',
      ],
    },
  },

  'Process Synchronization & Deadlocks': {
    topic: 'Process Synchronization & Deadlocks',
    title: 'Operating Systems: Critical Sections, Semaphores & Deadlocks',
    description: 'Master mutexes, counting semaphores, the 4 Coffman conditions for deadlock, and avoidance strategies.',
    category: 'Operating Systems',
    difficulty: 'INTERMEDIATE',
    learn: {
      title: 'Synchronization Primitives & Deadlock Prevention',
      content: `### The Critical Section Problem
A section of code that accesses shared resources must satisfy three requirements:
1. **Mutual Exclusion:** Only one process can execute in its critical section at a time.
2. **Progress:** If no process is in its critical section, selection of the next process cannot be postponed indefinitely.
3. **Bounded Waiting:** A bound must exist on the number of times other processes are allowed to enter before a request is granted.

#### The 4 Coffman Conditions for Deadlock:
All four must hold simultaneously for a deadlock to occur:
1. **Mutual Exclusion:** At least one resource is held in a non-shareable mode.
2. **Hold and Wait:** A process is holding at least one resource and requesting additional resources.
3. **No Preemption:** Resources cannot be forcibly confiscated.
4. **Circular Wait:** A closed chain of processes exists, where each holds a resource requested by the next.`,
      interactiveExample: {
        language: 'c',
        code: `// Breaking circular wait in Dining Philosophers
void take_forks(int i) {
    int left = i;
    int right = (i + 1) % 5;
    // Always acquire lower-indexed fork first:
    int first = left < right ? left : right;
    int second = left < right ? right : left;
    pthread_mutex_lock(&forks[first]);
    pthread_mutex_lock(&forks[second]);
}`,
        explanation: 'Imposing a strict global ordering on lock acquisition eliminates the Circular Wait condition entirely.',
      },
    },
    practice: {
      question: 'Which of the following strategies successfully prevents deadlocks by invalidating the Circular Wait condition?',
      options: [
        { id: 'a', text: 'Impose a total global ordering on all resource types and require processes to request resources in strictly increasing order.' },
        { id: 'b', text: 'Allow resources to be forcibly preempted from low-priority processes.' },
        { id: 'c', text: 'Require processes to request all needed resources at once before starting.' },
        { id: 'd', text: 'Run the Banker\'s algorithm periodically.' },
      ],
      correctAnswerId: 'a',
      explanation: 'Resource ordering (hierarchical allocation) guarantees that no cycle can form in the Resource Allocation Graph, mathematically breaking the Circular Wait condition.',
    },
    review: {
      title: 'Deadlocks: Pitfalls & Recovery',
      pitfalls: [
        'Priority Inversion: A high-priority thread is blocked waiting for a lock held by a low-priority thread, which is preempted by a medium-priority thread. (Solved by Priority Inheritance).',
        'Spinlocks in single-core systems: A thread spins on CPU waiting for a condition that can only be changed by another thread.',
      ],
      edgeCases: ['Deadlock detection algorithm overhead in real-time systems', 'Resource exhaustion vs deadlock'],
      keyTakeaway: 'Prevent deadlocks by design using hierarchical resource ordering rather than relying on expensive runtime detection.',
    },
    interview: {
      title: 'Technical Viva: Mutex vs Counting Semaphore',
      question: 'Explain the fundamental difference between a Mutex and a Counting Semaphore. Can a Mutex be treated simply as a semaphore initialized to 1?',
      hint: 'Discuss the concept of ownership and unlock permissions.',
      keyPoints: [
        'A Mutex has an ownership concept: only the thread that locked the mutex is legally permitted to unlock it.',
        'A Semaphore is a signaling mechanism without ownership: thread A can wait (`sem_wait`), and thread B can signal (`sem_post`).',
        'Because of ownership, mutexes support priority inheritance protocols to prevent priority inversion, which semaphores cannot provide.',
      ],
    },
  },

  'Virtual Memory & Page Faults': {
    topic: 'Virtual Memory & Page Faults',
    title: 'Virtual Memory: Page Faults & Replacement Algorithms',
    description: 'Understand virtual address translation, demand paging, and page replacement strategies.',
    category: 'Operating Systems',
    difficulty: 'INTERMEDIATE',
    learn: {
      title: 'Virtual Memory & The Mechanics of a Page Fault',
      content: `### Demand Paging & Address Translation
Virtual memory abstracts physical RAM, giving each process a contiguous virtual address space.

#### The Page Fault Cycle:
1. **Reference Virtual Address:** CPU references virtual page number.
2. **TLB Check:** If not in TLB, check Page Table Entry (PTE).
3. **Invalid Bit:** If present bit is 0, the MMU raises a Page Fault Trap to the kernel.
4. **Disk I/O:** OS locates the requested page in secondary storage (swap/disk).
5. **Frame Allocation & Replacement:**
   - Free frame found -> load page.
   - Memory full -> run replacement algorithm (FIFO, LRU, Clock) to evict a victim frame.
6. **Update Page Table:** Set valid bit = 1, physical frame number.
7. **Instruction Restart:** CPU re-executes the faulting instruction seamlessly.`,
      interactiveExample: {
        language: 'c',
        code: `// Conceptual LRU victim selection
int select_lru_victim(page_frame_t *frames, int num_frames) {
    int oldest_idx = 0;
    uint64_t min_timestamp = frames[0].last_accessed;
    for (int i = 1; i < num_frames; i++) {
        if (frames[i].last_accessed < min_timestamp) {
            min_timestamp = frames[i].last_accessed;
            oldest_idx = i;
        }
    }
    return oldest_idx;
}`,
        explanation: 'LRU evicts the page that has not been used for the longest period of time, leveraging temporal locality.',
      },
    },
    practice: {
      question: 'Consider a reference string of page accesses: `1, 2, 3, 4, 1, 2, 5`. Using 3 physical frames initially empty and the Least Recently Used (LRU) replacement policy, how many total page faults occur?',
      options: [
        { id: 'a', text: '7 page faults' },
        { id: 'b', text: '6 page faults' },
        { id: 'c', text: '5 page faults' },
        { id: 'd', text: '4 page faults' },
      ],
      correctAnswerId: 'a',
      explanation: 'Every access causes a page fault because the working set of 4 active pages exceeds the 3 available physical frames. Total page faults = 7.',
    },
    review: {
      title: 'Virtual Memory: Pitfalls & Belady\'s Anomaly',
      pitfalls: [
        'Belady\'s Anomaly: In FIFO replacement, increasing the number of physical frames can paradoxically increase total page faults. LRU does not suffer from this because it is a stack algorithm.',
        'Thrashing: Total memory demand exceeds physical RAM; system spends near 100% time paging to/from disk.',
      ],
      edgeCases: ['Page fault inside a non-preemptible interrupt service routine', 'Dirty page eviction requiring synchronous writeback'],
      keyTakeaway: 'LRU provides optimal practical hit rates without requiring prescient knowledge of future accesses.',
    },
    interview: {
      title: 'Technical Viva: Thrashing & The Working Set Model',
      question: 'What is Thrashing, how do you detect it in production Linux systems, and how does the OS Working Set Model mitigate it?',
      hint: 'Discuss CPU idle rates, disk I/O saturation, and process suspension.',
      keyPoints: [
        'Thrashing occurs when processes do not have enough frames to hold their active working sets, causing continuous page faults and near 100% disk swap I/O while CPU sits idle.',
        'Detection: High swap in/out rates (`vmstat`, `iostat`) paired with very low useful CPU throughput.',
        'Mitigation: Peter Denning\'s Working Set Model allocates frames based on page access locality in parameter window Delta; if sum of working sets > total RAM, suspended processes are swapped out completely.',
      ],
    },
  },

  'File Systems & I/O Management': {
    topic: 'File Systems & I/O Management',
    title: 'Operating Systems: Inodes, File Allocation & Journaling',
    description: 'Learn how files are organized on disk, inode structures, directory indexing, and crash-resilient journaling.',
    category: 'Operating Systems',
    difficulty: 'ADVANCED',
    learn: {
      title: 'File System Architecture & Inode Structures',
      content: `### The Unix Inode Architecture
An **inode** (index node) stores all metadata about a file except its name and actual file data:
- File size, ownership (UID/GID), permissions (rwxrwxrwx).
- Timestamps: access (atime), modification (mtime), status change (ctime).
- Pointers to data blocks:
  - 12 Direct Pointers (pointing directly to data blocks).
  - 1 Singly Indirect Pointer (points to a block containing pointers to data blocks).
  - 1 Doubly Indirect Pointer (points to a block of indirect blocks).
  - 1 Triply Indirect Pointer.`,
      interactiveExample: {
        language: 'bash',
        code: `# Inspecting file inode and hard links
touch original.txt
ln original.txt hardlink.txt
ln -s original.txt symlink.txt

ls -li
# Notice original.txt and hardlink.txt share the exact SAME inode number!`,
        explanation: 'A hard link is simply another directory entry pointing to the same inode. A symbolic link is a separate file containing a pathname string.',
      },
    },
    practice: {
      question: 'In an inode structure with 4KB block size and 4-byte block addresses, how much data can be addressed by a Single Indirect Block pointer?',
      options: [
        { id: 'a', text: '4 MB of data' },
        { id: 'b', text: '1 MB of data' },
        { id: 'c', text: '4 KB of data' },
        { id: 'd', text: '16 KB of data' },
      ],
      correctAnswerId: 'a',
      explanation: 'A 4KB block holds (4096 / 4) = 1024 block pointers. Each pointed block is 4KB. Total addressable data = 1024 * 4KB = 4096 KB = 4 MB.',
    },
    review: {
      title: 'File Systems: Common Pitfalls',
      pitfalls: [
        'Running out of Inodes: A disk can show 50% free gigabytes yet fail with "No space left on device" if millions of tiny files exhaust all pre-allocated inode table entries.',
        'Hard link deletion: Deleting the original file does not free disk space if another hard link or open file descriptor still references the inode.',
      ],
      edgeCases: ['Crash between metadata write and data block allocation', 'Circular symlink loops'],
      keyTakeaway: 'Journaling file systems write updates to a write-ahead log before committing to disk, guaranteeing crash recovery without full-disk fsck.',
    },
    interview: {
      title: 'Technical Viva: Hard Links vs Symbolic Links',
      question: 'Explain why a hard link cannot span across two different disk partitions/filesystems, whereas a soft (symbolic) link can easily cross partitions.',
      hint: 'Inodes are partition-local index numbers.',
      keyPoints: [
        'An inode number is only unique and meaningful within a single filesystem/partition. Inode 100 on /dev/sda1 refers to an entirely different file than Inode 100 on /dev/sdb1.',
        'A hard link is a directory entry mapping a filename directly to an inode number on that partition.',
        'A symbolic link is a standalone file that stores the target file\'s path string (e.g. "/mnt/data/file.txt"), which the VFS resolves independently across filesystem mount points.',
      ],
    },
  },

  'CPU Scheduling Algorithms': {
    topic: 'CPU Scheduling Algorithms',
    title: 'Operating Systems: CPU Scheduling & Multilevel Feedback Queues',
    description: 'Compare FCFS, Shortest Job First, Round Robin, and Linux Completely Fair Scheduler (CFS).',
    category: 'Operating Systems',
    difficulty: 'ADVANCED',
    learn: {
      title: 'Preemptive Scheduling and the Completely Fair Scheduler',
      content: `### Scheduling Criteria
The CPU scheduler maximizes CPU utilization and throughput while minimizing turnaround time, waiting time, and response time.

#### Common Scheduling Disciplines:
1. **First-Come, First-Served (FCFS):** Non-preemptive. Suffers from the **Convoy Effect** (short jobs stuck behind long CPU-bound jobs).
2. **Shortest Job First (SJF):** Mathematically optimal average waiting time, but impossible to implement practically without predicting the future CPU burst length.
3. **Round Robin (RR):** Preemptive with time quantum $q$.
   - $q$ too large -> degrades to FCFS.
   - $q$ too small -> excessive context-switch overhead dominates.
4. **Completely Fair Scheduler (CFS):** Linux kernel scheduler using a Red-Black tree ordered by virtual runtime (\`vruntime\`).`,
      interactiveExample: {
        language: 'c',
        code: `// Conceptual CFS scheduling priority
void update_curr(struct task_struct *task, uint64_t delta_exec) {
    // Weight is inversely proportional to task nice value:
    uint64_t delta_vruntime = (delta_exec * NICE_0_LOAD) / task->weight;
    task->vruntime += delta_vruntime;
    // Task with smallest vruntime is chosen next from leftmost RB-tree node
}`,
        explanation: 'Tasks that have executed less receive smaller vruntime increments and remain toward the left of the Red-Black tree.',
      },
    },
    practice: {
      question: 'What is the primary drawback of the Shortest Remaining Time First (preemptive SJF) scheduling algorithm?',
      options: [
        { id: 'a', text: 'Long processes may suffer indefinite starvation if a steady stream of short processes arrives.' },
        { id: 'b', text: 'It creates excessive memory paging faults.' },
        { id: 'c', text: 'It results in the highest possible average waiting time.' },
        { id: 'd', text: 'It cannot be used with multiple CPU cores.' },
      ],
      correctAnswerId: 'a',
      explanation: 'SJF always prioritizes short bursts. If short bursts continue arriving, long CPU-bound tasks will experience starvation and may never finish.',
    },
    review: {
      title: 'CPU Scheduling: Pitfalls',
      pitfalls: [
        'Setting Round Robin time quantum smaller than context switch duration, resulting in thrashing.',
        'Failure to age processes in priority queues, leading to starvation.',
      ],
      edgeCases: ['Processes with identical vruntime in CFS', 'I/O-bound processes waking up after long sleep'],
      keyTakeaway: 'Multi-Level Feedback Queues dynamically adjust process priority based on observed behavior without requiring prior knowledge of burst times.',
    },
    interview: {
      title: 'Technical Viva: The Linux CFS (Completely Fair Scheduler)',
      question: 'How does the Linux Completely Fair Scheduler (CFS) achieve O(1) task selection and fair CPU distribution without using fixed time slices?',
      hint: 'Mention virtual runtime (vruntime), Red-Black trees, and weight adjustment.',
      keyPoints: [
        'CFS tracks `vruntime` (virtual runtime) for each runnable task, scaled by process nice priority (weight).',
        'Tasks are stored in a Red-Black tree keyed by `vruntime`. The leftmost node represents the task that has had the least CPU time.',
        'Selection takes O(1) because the leftmost pointer is cached; inserting/updating takes O(log N).',
      ],
    },
  },

  // ==========================================
  // DBMS TRACK (6 TOPICS)
  // ==========================================
  'SQL Queries & Relational Algebra': {
    topic: 'SQL Queries & Relational Algebra',
    title: 'DBMS: SQL Execution Order, Joins & Aggregations',
    description: 'Master the relational model, declarative query processing order, and join execution strategies.',
    category: 'DBMS',
    difficulty: 'BEGINNER',
    learn: {
      title: 'Declarative SQL Execution Order & Join Types',
      content: `### The True Order of SQL Execution
Although SQL queries are written starting with \`SELECT\`, the database engine processes clauses in a strictly defined relational pipeline:

1. **FROM & JOIN:** Identifies tables and computes Cartesian products / join filters.
2. **WHERE:** Filters individual rows before aggregation.
3. **GROUP BY:** Aggregates remaining rows into summary groups.
4. **HAVING:** Filters aggregated groups (cannot be replaced by WHERE).
5. **SELECT:** Evaluates projection expressions and column aliases.
6. **DISTINCT:** Eliminates duplicate result rows.
7. **ORDER BY:** Sorts final rows (can use SELECT aliases).
8. **LIMIT / OFFSET:** Restricts the returned record slice.`,
      interactiveExample: {
        language: 'sql',
        code: `-- Finding departments where average salary exceeds $80,000
SELECT department_id, AVG(salary) AS avg_sal
FROM employees
WHERE is_active = TRUE
GROUP BY department_id
HAVING AVG(salary) > 80000
ORDER BY avg_sal DESC;`,
        explanation: 'WHERE filters active employees first. GROUP BY clusters them by department. HAVING filters groups whose average exceeds $80k. SELECT formats the final output.',
      },
    },
    practice: {
      question: 'Why can you NOT use a column alias defined in the `SELECT` clause inside the `WHERE` clause in standard SQL?',
      options: [
        { id: 'a', text: 'Because WHERE is executed before SELECT in the relational processing pipeline.' },
        { id: 'b', text: 'Because aliases are only permitted in ORDER BY and nowhere else.' },
        { id: 'c', text: 'Because WHERE can only filter primary key columns.' },
        { id: 'd', text: 'Because SQL prohibits aliases in aggregated queries.' },
      ],
      correctAnswerId: 'a',
      explanation: 'The database engine evaluates `WHERE` to filter rows BEFORE `SELECT` evaluates projection expressions and assigns column aliases. Therefore, the alias does not yet exist when `WHERE` runs.',
    },
    review: {
      title: 'SQL: Pitfalls & Invariants',
      pitfalls: [
        'Using `WHERE` instead of `HAVING` to filter aggregate functions like `COUNT()` or `AVG()`.',
        'Accidental Cartesian products (cross joins) caused by missing join conditions in comma-separated `FROM tableA, tableB`.',
        'NULL handling in three-valued logic: `WHERE status != \'ACTIVE\'` will silently drop rows where status is `NULL`. Use `IS DISTINCT FROM` or explicit `OR status IS NULL`.',
      ],
      edgeCases: ['Grouping by columns not present in SELECT', 'Empty tables in LEFT JOIN producing NULL right values'],
      keyTakeaway: 'Always remember the logical query execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.',
    },
    interview: {
      title: 'Technical Viva: Join Execution Strategies',
      question: 'What are the three core physical join algorithms used by relational query planners (Nested Loop, Hash Join, Merge Join), and when does the optimizer choose each?',
      hint: 'Consider index presence, dataset sizes, and whether inputs are pre-sorted.',
      keyPoints: [
        'Nested Loop Join: Best when one table is tiny and the other has an index on the join key (O(M * log N)).',
        'Hash Join: Builds an in-memory hash table on the smaller table, then streams and probes the larger table (O(M + N)). Ideal for large, unsorted, unindexed equality joins.',
        'Sort-Merge Join: Sorts both inputs and scans both in parallel like two pointers (O(M log M + N log N)). Optimal when inputs are already sorted by the join key (e.g. from a B-Tree index).',
      ],
    },
  },

  'Database Normalization (1NF-3NF)': {
    topic: 'Database Normalization (1NF-3NF)',
    title: 'DBMS: Relational Normalization & Normal Forms (1NF to BCNF)',
    description: 'Eliminate data redundancy and anomalies through functional dependencies and mathematical decomposition.',
    category: 'DBMS',
    difficulty: 'BEGINNER',
    learn: {
      title: 'Functional Dependencies & Normal Forms',
      content: `### Why Normalize?
Unnormalized schemas suffer from three severe anomalies:
- **Insertion Anomaly:** Unable to insert a record without providing unrelated dummy data.
- **Update Anomaly:** Modifying a value requires updating multiple redundant copies across the table.
- **Deletion Anomaly:** Deleting one entity inadvertently deletes other critical data.

#### The Normal Forms:
1. **1NF (First Normal Form):** Every attribute value must be atomic (no arrays or comma-separated lists); unique primary key exists.
2. **2NF (Second Normal Form):** In 1NF, and **no partial dependency** (every non-key attribute must depend on the whole composite primary key, not a subset).
3. **3NF (Third Normal Form):** In 2NF, and **no transitive dependency** ($X \\to Y$ and $Y \\to Z$ where $Z$ is non-prime).
4. **BCNF (Boyce-Codd):** For every functional dependency $X \\to Y$, $X$ must be a superkey.`,
      interactiveExample: {
        language: 'sql',
        code: `-- Decomposing an unnormalized relation into 3NF
-- Original flawed table: Employee_Project(EmpID, ProjID, EmpName, ProjName)
-- EmpID -> EmpName is a partial dependency on composite key (EmpID, ProjID)!

CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL
);

CREATE TABLE Projects (
    proj_id INT PRIMARY KEY,
    proj_name VARCHAR(100) NOT NULL
);

CREATE TABLE Employee_Projects (
    emp_id INT REFERENCES Employees(emp_id),
    proj_id INT REFERENCES Projects(proj_id),
    PRIMARY KEY (emp_id, proj_id)
);`,
        explanation: 'Decomposing into three relations removes partial dependencies and satisfies 3NF and BCNF without data redundancy.',
      },
    },
    practice: {
      question: 'A relation R(A, B, C, D) has the composite primary key (A, B). If the functional dependency `A -> C` exists, which normal form is violated?',
      options: [
        { id: 'a', text: '1NF is violated' },
        { id: 'b', text: '2NF is violated because C depends on a proper subset of the candidate key (A).' },
        { id: 'c', text: '3NF is violated but 2NF is satisfied.' },
        { id: 'd', text: 'BCNF is satisfied.' },
      ],
      correctAnswerId: 'b',
      explanation: 'Since (A, B) is the composite primary key, attribute C depending on only A is a partial dependency. 2NF strictly forbids partial dependencies.',
    },
    review: {
      title: 'Normalization: Pitfalls & Denormalization',
      pitfalls: [
        'Over-normalization in read-heavy analytics (OLAP) systems, causing excessive 10-table joins that destroy query throughput.',
        'Confusing 2NF violation (partial dependency on composite key) with 3NF violation (transitive dependency between non-prime attributes).',
      ],
      edgeCases: ['Relations with no composite candidate keys (automatically in 2NF if in 1NF)', 'Lossy decomposition where natural join does not recover original relation'],
      keyTakeaway: 'In OLTP transaction systems, normalize to 3NF/BCNF to guarantee write integrity; in OLAP data warehouses, selectively denormalize into Star/Snowflake schemas.',
    },
    interview: {
      title: 'Technical Viva: 3NF vs BCNF Trade-offs',
      question: 'What is the subtle difference between 3NF and BCNF, and why might an engineer consciously choose to stay in 3NF instead of decomposing into BCNF?',
      hint: 'Think about dependency preservation vs redundancy elimination.',
      keyPoints: [
        'In 3NF, for functional dependency X -> Y, Y can be a prime attribute (part of a candidate key) even if X is not a superkey. In BCNF, X MUST be a superkey with no exceptions.',
        'Decomposing a 3NF relation into BCNF can sometimes make it impossible to preserve all functional dependencies without cross-table assertions.',
        'Engineers often accept 3NF to guarantee both lossless join decomposition and dependency preservation.',
      ],
    },
  },

  'Indexing & B-Trees': {
    topic: 'Indexing & B-Trees',
    title: 'DBMS: B+ Tree Indexing, Clustered vs Non-Clustered Indexes',
    description: 'Master storage layouts, B+ Tree search operations, composite index selectivity, and index scan vs seek.',
    category: 'DBMS',
    difficulty: 'INTERMEDIATE',
    learn: {
      title: 'B+ Tree Index Internals and Clustered Storage',
      content: `### Why B+ Trees for Relational Databases?
Databases do not use Binary Search Trees or Hash Tables on disk because:
1. **Disk Block Alignment:** B+ Tree nodes match the disk block size (4KB to 16KB), with a massive fan-out (e.g. 100 to 500 keys per node). Height stays $\\le 3$ even for millions of rows.
2. **Linked Leaf Nodes:** All data pointers reside in leaf nodes, connected as a doubly linked list. Range scans (\`BETWEEN 10 AND 50\`) require just 1 root-to-leaf traversal followed by sequential scanning.

#### Clustered vs Non-Clustered Indexes:
- **Clustered Index:** Dictates the physical disk order of table rows. A table can have **only 1 clustered index** (usually the Primary Key).
- **Secondary (Non-Clustered) Index:** Separate B+ Tree whose leaf nodes contain the index key and a pointer to the clustered index key.`,
      interactiveExample: {
        language: 'sql',
        code: `-- Creating a composite index
CREATE INDEX idx_emp_dept_salary ON employees(department_id, salary);

-- Leftmost Prefix Rule:
-- Query 1: Can utilize index (matches department_id)
SELECT * FROM employees WHERE department_id = 10 AND salary > 50000;

-- Query 2: CANNOT utilize index efficiently (skips leftmost column)
SELECT * FROM employees WHERE salary > 50000;`,
        explanation: 'Composite indexes require queries to match the leftmost prefix of the index definition to perform an efficient B-Tree index seek.',
      },
    },
    practice: {
      question: 'Why do database systems use B+ Trees instead of Hash Indexes as the default indexing structure for general-purpose relational storage engines?',
      options: [
        { id: 'a', text: 'Because Hash Indexes cannot support range queries or inequality operators (<, >, BETWEEN).' },
        { id: 'b', text: 'Because B+ Trees have O(1) lookup time while Hash Indexes are O(N).' },
        { id: 'c', text: 'Because Hash Indexes require more disk space than B+ Trees.' },
        { id: 'd', text: 'Because B+ Trees do not require locking during concurrent transactions.' },
      ],
      correctAnswerId: 'a',
      explanation: 'Hash indexes only support exact equality checks (=) because hashing destroys natural ordering. B+ Trees keep keys sorted, enabling high-performance range scans and order-by operations.',
    },
    review: {
      title: 'Indexing: Pitfalls & Best Practices',
      pitfalls: [
        'Over-indexing: Every INSERT, UPDATE, and DELETE statement must update every index on the table, increasing write latency and disk I/O.',
        'Un-sargable predicates: Wrapping an indexed column in a function (e.g. `WHERE YEAR(created_at) = 2024`) invalidates index seeks, forcing a full table scan.',
      ],
      edgeCases: ['Low-cardinality columns (e.g. boolean gender flags) where index seeks cost more than sequential scans', 'Covering indexes that eliminate clustered key lookups'],
      keyTakeaway: 'An index is only beneficial if its selectivity is high enough that the optimizer avoids a sequential scan.',
    },
    interview: {
      title: 'Technical Viva: Clustered vs Non-Clustered Index Lookup',
      question: 'What is a "Bookmark Lookup" (or Key Lookup) in a secondary index query, and how does a "Covering Index" eliminate it?',
      hint: 'Trace the two-step traversal from secondary B+ tree to primary clustered B+ tree.',
      keyPoints: [
        'A secondary index leaf contains only the indexed columns and the clustered primary key.',
        'If the query requests additional columns (`SELECT *`), the engine must perform a secondary lookup into the clustered index by primary key (Bookmark Lookup).',
        'A Covering Index includes all columns requested by the query (via `INCLUDE` or composite keys), satisfying the query entirely from the secondary index without touching the table.',
      ],
    },
  },

  'Transactions & ACID Properties': {
    topic: 'Transactions & ACID Properties',
    title: 'DBMS: Transactions, ACID Guarantees & Write-Ahead Logging',
    description: 'Understand Atomicity, Consistency, Isolation, Durability, WAL mechanics, and transaction recovery.',
    category: 'DBMS',
    difficulty: 'INTERMEDIATE',
    learn: {
      title: 'The ACID Guarantees & Write-Ahead Logging (WAL)',
      content: `### The ACID Contract
A transaction is an atomic unit of work that preserves database consistency:
- **Atomicity (All or Nothing):** Handled via Undo Logs or Write-Ahead Logging (WAL).
- **Consistency (Valid State Transitions):** Enforces schema constraints, foreign keys, and application assertions.
- **Isolation (Concurrency Control):** Transactions executing concurrently appear to execute serially.
- **Durability (Committed Data Persists):** Handled via Redo Logs flushed to non-volatile storage before confirming commit.

#### The Write-Ahead Logging (WAL) Rule:
*No data page modified by a transaction may be written to non-volatile storage until the corresponding log record describing the update has been flushed to disk.*`,
      interactiveExample: {
        language: 'sql',
        code: `-- Bank transfer transaction
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE account_id = 101;
UPDATE accounts SET balance = balance + 500 WHERE account_id = 202;

-- If any failure occurs, ROLLBACK restores both accounts to original state:
COMMIT;`,
        explanation: 'Atomicity ensures that either both balances update, or neither updates if a failure or power outage occurs midway.',
      },
    },
    practice: {
      question: 'What is the primary purpose of the Write-Ahead Logging (WAL) protocol in relational database engines?',
      options: [
        { id: 'a', text: 'To ensure that log records describing changes are flushed to persistent disk before the dirty database pages themselves are written.' },
        { id: 'b', text: 'To compress queries before sending them across the network.' },
        { id: 'c', text: 'To prevent all database deadlocks automatically.' },
        { id: 'd', text: 'To eliminate the need for primary keys in tables.' },
      ],
      correctAnswerId: 'a',
      explanation: 'WAL guarantees durability and crash recovery. If a power failure happens while dirty pages are still in memory, the engine replays the flushed WAL log to recover committed state.',
    },
    review: {
      title: 'Transactions: Pitfalls & Failure Modes',
      pitfalls: [
        'Long-running transactions holding locks and preventing log truncation, leading to disk exhaustion and transaction timeouts.',
        'Assuming application-level try-catch guarantees database durability without verifying synchronous disk flushes (`fsync`).',
      ],
      edgeCases: ['Crash during commit record write', 'Rollback of nested transactions (Savepoints)'],
      keyTakeaway: 'Durability requires synchronous disk flushing (WAL fsync); without it, power loss results in data loss.',
    },
    interview: {
      title: 'Technical Viva: Two-Phase Commit (2PC)',
      question: 'In a distributed database or microservice architecture, how does the Two-Phase Commit (2PC) protocol ensure atomicity across multiple independent nodes, and what is its primary failure mode?',
      hint: 'Prepare phase vs Commit phase, and the coordinator as a single point of failure.',
      keyPoints: [
        'Phase 1 (Prepare): Coordinator asks all participants to prepare and acquire locks. Participants write prepare to WAL and vote YES/NO.',
        'Phase 2 (Commit): If all voted YES, coordinator logs COMMIT and broadcasts COMMIT. If any voted NO, broadcasts ABORT.',
        'Failure Mode: If the coordinator crashes after participants vote YES but before sending COMMIT, participants are blocked holding locks indefinitely (blocking protocol).',
      ],
    },
  },

  'Concurrency Control & Locking': {
    topic: 'Concurrency Control & Locking',
    title: 'DBMS: Isolation Levels, Concurrency Control & MVCC',
    description: 'Master Read Committed vs Serializable, Two-Phase Locking, Dirty/Phantom reads, and Multi-Version Concurrency Control.',
    category: 'DBMS',
    difficulty: 'ADVANCED',
    learn: {
      title: 'SQL Isolation Levels and MVCC Internals',
      content: `### SQL Standard Isolation Levels
Isolation levels balance concurrency throughput against anomaly prevention:

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| **Read Uncommitted** | Possible | Possible | Possible |
| **Read Committed** | Prevented | Possible | Possible |
| **Repeatable Read** | Prevented | Prevented | Possible (in strict standard) |
| **Serializable** | Prevented | Prevented | Prevented |

#### Multi-Version Concurrency Control (MVCC):
Modern engines (PostgreSQL, MySQL InnoDB) use MVCC:
- **Readers never block Writers, and Writers never block Readers.**
- Each row maintains transaction visibility metadata (e.g. \`xmin\` and \`xmax\` in Postgres).
- Queries read a consistent point-in-time snapshot without acquiring shared read locks.`,
      interactiveExample: {
        language: 'sql',
        code: `-- Setting transaction isolation level
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
SELECT balance FROM accounts WHERE account_id = 1;
-- Even if another transaction updates and commits balance,
-- subsequent queries in this transaction continue seeing the exact same balance!
COMMIT;`,
        explanation: 'Repeatable Read guarantees that reading the same row multiple times within a transaction yields identical data.',
      },
    },
    practice: {
      question: 'What is a "Non-Repeatable Read" anomaly in concurrent database transactions?',
      options: [
        { id: 'a', text: 'A transaction reads uncommitted data that is later rolled back by another transaction.' },
        { id: 'b', text: 'A transaction reads a row, another transaction modifies and commits that row, and re-reading the row returns different values.' },
        { id: 'c', text: 'A transaction executes a range query, another transaction inserts new rows meeting the predicate, and re-querying returns extra rows.' },
        { id: 'd', text: 'Two transactions deadlock on primary key updates.' },
      ],
      correctAnswerId: 'b',
      explanation: 'Non-repeatable read occurs when data read twice within the same transaction changes because a concurrent transaction committed modifications to that specific row.',
    },
    review: {
      title: 'Concurrency Control: Pitfalls',
      pitfalls: [
        'Deadlocks caused by inconsistent table access order (Tx1 updates TableA then TableB; Tx2 updates TableB then TableA).',
        'Table Bloat in MVCC: Dead row versions generated by frequent UPDATEs must be reclaimed (e.g. PostgreSQL VACUUM).',
      ],
      edgeCases: ['Write Skew in Repeatable Read isolation', 'Lock escalation from row-level to table-level'],
      keyTakeaway: 'Prefer MVCC-backed Read Committed or Repeatable Read for high concurrency, and use optimistic concurrency tokens for user-facing edits.',
    },
    interview: {
      title: 'Technical Viva: How MVCC Eliminates Read Locks',
      question: 'How do modern database engines like PostgreSQL or MySQL InnoDB implement MVCC to allow readers to query data concurrently without blocking writers?',
      hint: 'Discuss row versioning, transaction IDs (txid), and undo log segments.',
      keyPoints: [
        'When a row is updated, the engine does not overwrite the existing bytes in place; it inserts a new row version with current transaction ID and marks the old version expired.',
        'A reader transaction is assigned a snapshot timestamp upon start and ignores all row versions created after its snapshot began or created by uncommitted transactions.',
        'Because reads inspect historical snapshots via undo logs/tuples without acquiring exclusive locks, writes proceed concurrently without contention.',
      ],
    },
  },

  'Query Optimization & Execution': {
    topic: 'Query Optimization & Execution',
    title: 'DBMS: Cost-Based Query Optimizer & EXPLAIN Plans',
    description: 'Learn how relational query optimizers evaluate execution trees, estimate cardinalities, and optimize slow queries.',
    category: 'DBMS',
    difficulty: 'ADVANCED',
    learn: {
      title: 'Query Trees, Cardinality Estimation & EXPLAIN Analysis',
      content: `### Inside the Cost-Based Optimizer (CBO)
The database optimizer translates SQL statements into an optimal physical execution plan:
1. **Parser & Analyzer:** Verifies syntax, resolves column names, and builds an abstract syntax tree (AST).
2. **Rewriter:** Applies heuristic algebraic transformations (predicate pushdown, subquery flattening).
3. **Cardinality Estimation:** Uses column histograms and statistics to estimate how many rows match each filter.
4. **Cost Evaluation:** Computes CPU cost and I/O page fetches for candidate execution trees and picks the lowest-cost plan.`,
      interactiveExample: {
        language: 'sql',
        code: `-- Analyzing query plan in PostgreSQL
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date >= '2026-01-01'
  AND c.country = 'IND';`,
        explanation: 'EXPLAIN ANALYZE executes the query and compares the optimizer estimated row counts against actual executed row counts and execution times.',
      },
    },
    practice: {
      question: 'In an EXPLAIN execution plan, what does "Predicate Pushdown" accomplish?',
      options: [
        { id: 'a', text: 'It pushes filter conditions as close to the disk scan as possible before performing expensive joins.' },
        { id: 'b', text: 'It defers filtering until after all records are transmitted to the client.' },
        { id: 'c', text: 'It converts hash joins into nested loop joins.' },
        { id: 'd', text: 'It forces the query to bypass the buffer cache.' },
      ],
      correctAnswerId: 'a',
      explanation: 'Predicate pushdown moves WHERE filters down the operator tree so that rows are filtered early, drastically reducing the number of tuples passed into subsequent memory-intensive joins and sorts.',
    },
    review: {
      title: 'Query Optimization: Pitfalls',
      pitfalls: [
        'Stale table statistics: If `ANALYZE` has not been run after a mass import, the optimizer assumes default cardinalities and chooses disastrous execution paths (e.g. Nested Loop on 5 million rows).',
        'Correlated subqueries in SELECT clauses executed row-by-row ($O(N)$ query latency).',
      ],
      edgeCases: ['Parameter sniffing in prepared statements with skewed data distributions', 'Out-of-memory work_mem spilling sorts to temp disk files'],
      keyTakeaway: 'Always inspect EXPLAIN ANALYZE for discrepancies between estimated rows and actual rows; significant variance indicates stale statistics.',
    },
    interview: {
      title: 'Technical Viva: Diagnosing a Slow Production SQL Query',
      question: 'Walk through your step-by-step methodology when tasked with diagnosing and fixing an API endpoint that has degraded due to a slow SQL query in production.',
      hint: 'Mention EXPLAIN ANALYZE, missing indexes, cardinality errors, and connection pool starvation.',
      keyPoints: [
        'Step 1: Capture the exact SQL and execution time via slow query logs (`pg_stat_statements`) and run `EXPLAIN (ANALYZE, BUFFERS)` to locate the bottleneck operator (Seq Scan vs Hash Join vs Sort).',
        'Step 2: Check for missing composite indexes or un-sargable predicates (e.g. wildcard `%text` or function wrappers).',
        'Step 3: Verify if optimizer statistics are up to date (`ANALYZE table_name`) and check if disk spills occurred (`work_mem`).',
      ],
    },
  },
};

import { getSubjectCurriculum, SUBJECT_CURRICULA } from '../learning/curriculum/subjectCurriculum';

/**
 * Resolves the appropriate curriculum content for any given topic name or preferredSubjects context.
 */
export function getTopicCurriculum(
  topicName?: string | null,
  preferredSubjects?: string[] | null
): CurriculumContent {
  // 1. If preferredSubjects is passed, search within that subject's missions first
  if (preferredSubjects && preferredSubjects.length > 0) {
    const subjectCurriculum = getSubjectCurriculum(preferredSubjects);
    if (subjectCurriculum && subjectCurriculum.missions.length > 0) {
      if (topicName) {
        const matchedMission = subjectCurriculum.missions.find(
          (m: any) => topicMatches(m.title, topicName) || topicMatches(m.topicKey, topicName)
        );
        if (matchedMission) {
          return {
            topic: matchedMission.title,
            title: matchedMission.title,
            description: matchedMission.description,
            category: subjectCurriculum.label,
            difficulty: 'BEGINNER',
            learn: matchedMission.lesson,
            practice: matchedMission.practice,
            review: matchedMission.review,
            interview: matchedMission.interview,
          };
        }
      }
      // Return first mission of the subject as default for this subject
      const defaultMission = subjectCurriculum.missions[0];
      return {
        topic: defaultMission.title,
        title: defaultMission.title,
        description: defaultMission.description,
        category: subjectCurriculum.label,
        difficulty: 'BEGINNER',
        learn: defaultMission.lesson,
        practice: defaultMission.practice,
        review: defaultMission.review,
        interview: defaultMission.interview,
      };
    }
  }

  // 2. Direct match check across central SUBJECT_CURRICULA
  if (topicName) {
    for (const curriculum of Object.values(SUBJECT_CURRICULA)) {
      for (const mission of curriculum.missions) {
        if (topicMatches(mission.title, topicName) || topicMatches(mission.topicKey, topicName)) {
          return {
            topic: mission.title,
            title: mission.title,
            description: mission.description,
            category: curriculum.label,
            difficulty: 'BEGINNER',
            learn: mission.lesson,
            practice: mission.practice,
            review: mission.review,
            interview: mission.interview,
          };
        }
      }
    }
  }

  // 3. Direct match check in legacy TOPIC_CURRICULA table
  if (topicName && TOPIC_CURRICULA[topicName]) {
    return TOPIC_CURRICULA[topicName];
  }

  // 4. Fuzzy match across legacy TOPIC_CURRICULA
  if (topicName) {
    for (const [key, curriculum] of Object.entries(TOPIC_CURRICULA)) {
      if (topicMatches(key, topicName) || topicMatches(curriculum.title, topicName)) {
        return curriculum;
      }
    }
  }

  // Fallback to first available DSA topic if completely unmatched
  return TOPIC_CURRICULA['Arrays & Strings'];
}