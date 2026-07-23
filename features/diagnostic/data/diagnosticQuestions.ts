import { DiagnosticQuestion } from '../types';

export const diagnosticQuestions: DiagnosticQuestion[] = [
  // ==========================================
  // 1. DATA STRUCTURES & ALGORITHMS (DSA) - 15 Questions
  // ==========================================
  {
    id: 'dsa_b1',
    category: 'DSA',
    concept: 'Arrays',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'What is the time complexity of accessing an element by index in a contiguous array?',
    options: [
      { id: 'A', text: 'O(1)' },
      { id: 'B', text: 'O(n)' },
      { id: 'C', text: 'O(log n)' },
      { id: 'D', text: 'O(n^2)' }
    ],
    correctAnswer: 'A',
    explanation: 'Arrays store elements in contiguous memory locations, allowing direct memory address calculation in O(1) constant time.'
  },
  {
    id: 'dsa_b2',
    category: 'DSA',
    concept: 'Linked Lists',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'Which node in a singly linked list points to null?',
    options: [
      { id: 'A', text: 'Head node' },
      { id: 'B', text: 'Tail node' },
      { id: 'C', text: 'Middle node' },
      { id: 'D', text: 'Root node' }
    ],
    correctAnswer: 'B',
    explanation: 'The tail node is the final node in a singly linked list and its next pointer references null.'
  },
  {
    id: 'dsa_b3',
    category: 'DSA',
    concept: 'Stacks',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'Which principle governs the operation of a Stack data structure?',
    options: [
      { id: 'A', text: 'FIFO (First In First Out)' },
      { id: 'B', text: 'LIFO (Last In First Out)' },
      { id: 'C', text: 'LILO (Last In Last Out)' },
      { id: 'D', text: 'Priority Order' }
    ],
    correctAnswer: 'B',
    explanation: 'Stacks operate under Last In First Out (LIFO), where the element inserted last is removed first.'
  },
  {
    id: 'dsa_b4',
    category: 'DSA',
    concept: 'Queues',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'Which operation is used to add an item to the rear of a Queue?',
    options: [
      { id: 'A', text: 'Enqueue' },
      { id: 'B', text: 'Dequeue' },
      { id: 'C', text: 'Push' },
      { id: 'D', text: 'Pop' }
    ],
    correctAnswer: 'A',
    explanation: 'Enqueue adds an element to the rear of the queue, while Dequeue removes from the front.'
  },
  {
    id: 'dsa_b5',
    category: 'DSA',
    concept: 'Strings',
    difficulty: 'BEGINNER',
    questionType: 'Code Output',
    question: 'What is the time complexity of checking if a string of length N is a palindrome using two pointers?',
    options: [
      { id: 'A', text: 'O(N)' },
      { id: 'B', text: 'O(N log N)' },
      { id: 'C', text: 'O(N^2)' },
      { id: 'D', text: 'O(1)' }
    ],
    correctAnswer: 'A',
    explanation: 'The two-pointer technique compares outer characters inward, requiring at most N/2 iterations, which is O(N).'
  },
  {
    id: 'dsa_i1',
    category: 'DSA',
    concept: 'Binary Search',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What requirement must an array satisfy before applying Binary Search?',
    options: [
      { id: 'A', text: 'Elements must be positive' },
      { id: 'B', text: 'Array must be sorted' },
      { id: 'C', text: 'Array length must be even' },
      { id: 'D', text: 'No duplicate elements allowed' }
    ],
    correctAnswer: 'B',
    explanation: 'Binary Search relies on ordering to eliminate half of the remaining search space in each step.'
  },
  {
    id: 'dsa_i2',
    category: 'DSA',
    concept: 'Hash Tables',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What is the average time complexity for lookup and insertion in a Hash Table?',
    options: [
      { id: 'A', text: 'O(1)' },
      { id: 'B', text: 'O(log n)' },
      { id: 'C', text: 'O(n)' },
      { id: 'D', text: 'O(n log n)' }
    ],
    correctAnswer: 'A',
    explanation: 'Hash functions compute bucket indices directly, giving average O(1) time complexity.'
  },
  {
    id: 'dsa_i3',
    category: 'DSA',
    concept: 'Sorting Algorithms',
    difficulty: 'INTERMEDIATE',
    questionType: 'MCQ',
    question: 'Which sorting algorithm has a worst-case time complexity of O(N^2) but an average-case of O(N log N)?',
    options: [
      { id: 'A', text: 'Merge Sort' },
      { id: 'B', text: 'Quick Sort' },
      { id: 'C', text: 'Heap Sort' },
      { id: 'D', text: 'Counting Sort' }
    ],
    correctAnswer: 'B',
    explanation: 'Quick Sort degrades to O(N^2) if bad pivot choices cause unbalanced partitions, but averages O(N log N).'
  },
  {
    id: 'dsa_i4',
    category: 'DSA',
    concept: 'Trees',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'In a Binary Search Tree (BST), where are keys smaller than the root node stored?',
    options: [
      { id: 'A', text: 'In the right subtree' },
      { id: 'B', text: 'In the left subtree' },
      { id: 'C', text: 'In the root node parent' },
      { id: 'D', text: 'Randomly assigned' }
    ],
    correctAnswer: 'B',
    explanation: 'The BST property mandates that all values in the left subtree are smaller than the node, and right subtree values are larger.'
  },
  {
    id: 'dsa_i5',
    category: 'DSA',
    concept: 'Recursion',
    difficulty: 'INTERMEDIATE',
    questionType: 'Code Output',
    question: 'What occurs if a recursive function lacks a base case?',
    options: [
      { id: 'A', text: 'It returns null immediately' },
      { id: 'B', text: 'It triggers a Stack Overflow error' },
      { id: 'C', text: 'It compiles with an automatic exit' },
      { id: 'D', text: 'It converts to an iterative loop' }
    ],
    correctAnswer: 'B',
    explanation: 'Without a base case, recursive calls continue indefinitely until call stack memory is exhausted.'
  },
  {
    id: 'dsa_a1',
    category: 'DSA',
    concept: 'Graphs',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'Which algorithm finds the single-source shortest path in a weighted graph with non-negative edge weights?',
    options: [
      { id: 'A', text: 'Breadth First Search (BFS)' },
      { id: 'B', text: 'Dijkstra\'s Algorithm' },
      { id: 'C', text: 'Kruskal\'s Algorithm' },
      { id: 'D', text: 'Floyd-Warshall Algorithm' }
    ],
    correctAnswer: 'B',
    explanation: 'Dijkstra\'s algorithm uses a priority queue to greedily compute shortest paths from a single source for non-negative weights.'
  },
  {
    id: 'dsa_a2',
    category: 'DSA',
    concept: 'Dynamic Programming',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'Which key property allows Dynamic Programming to solve optimization problems efficiently?',
    options: [
      { id: 'A', text: 'Greedy Choice Property' },
      { id: 'B', text: 'Overlapping Subproblems & Optimal Substructure' },
      { id: 'C', text: 'Amortized Constant Time' },
      { id: 'D', text: 'Randomized Pivot Distribution' }
    ],
    correctAnswer: 'B',
    explanation: 'DP applies when a problem has optimal substructure (optimal solution composed of sub-solutions) and overlapping subproblems (memoizable).'
  },
  {
    id: 'dsa_a3',
    category: 'DSA',
    concept: 'Heaps',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What is the time complexity to extract the minimum element from a Min-Heap of N elements?',
    options: [
      { id: 'A', text: 'O(1)' },
      { id: 'B', text: 'O(log N)' },
      { id: 'C', text: 'O(N)' },
      { id: 'D', text: 'O(N log N)' }
    ],
    correctAnswer: 'B',
    explanation: 'Extracting min removes the root in O(1) but requires heapifying down the replacement element in O(log N) time.'
  },
  {
    id: 'dsa_a4',
    category: 'DSA',
    concept: 'Bit Manipulation',
    difficulty: 'ADVANCED',
    questionType: 'Code Output',
    question: 'What does the expression `(n & (n - 1)) == 0` check for a positive integer `n`?',
    options: [
      { id: 'A', text: 'Checks if `n` is odd' },
      { id: 'B', text: 'Checks if `n` is a power of 2' },
      { id: 'C', text: 'Checks if `n` is prime' },
      { id: 'D', text: 'Checks if `n` is negative' }
    ],
    correctAnswer: 'B',
    explanation: 'Powers of 2 have exactly one binary bit set. Subtracting 1 flips all lower bits, so bitwise AND yields 0.'
  },
  {
    id: 'dsa_a5',
    category: 'DSA',
    concept: 'Tries',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What makes a Trie (Prefix Tree) ideal for autocomplete features?',
    options: [
      { id: 'A', text: 'Constant space consumption regardless of string length' },
      { id: 'B', text: 'Prefix-based search matching in O(K) time where K is string length' },
      { id: 'C', text: 'Automatic alphabetical sorting in O(1) time' },
      { id: 'D', text: 'Elimination of hash collision' }
    ],
    correctAnswer: 'B',
    explanation: 'Tries branch per character, enabling prefix matching in O(K) steps regardless of total dictionary size.'
  },

  // ==========================================
  // 2. APTITUDE & QUANTITATIVE REASONING - 15 Questions
  // ==========================================
  {
    id: 'apt_b1',
    category: 'Aptitude',
    concept: 'Percentages',
    difficulty: 'BEGINNER',
    questionType: 'Logical',
    question: 'If a product price is increased by 20% and then decreased by 20%, what is the net change in price?',
    options: [
      { id: 'A', text: 'No change (0%)' },
      { id: 'B', text: '4% increase' },
      { id: 'C', text: '4% decrease' },
      { id: 'D', text: '2% decrease' }
    ],
    correctAnswer: 'C',
    explanation: 'Let price = 100. After +20% = 120. Decreasing 120 by 20% (24) leaves 96, representing a net 4% decrease.'
  },
  {
    id: 'apt_b2',
    category: 'Aptitude',
    concept: 'Ratios',
    difficulty: 'BEGINNER',
    questionType: 'Logical',
    question: 'If A and B share $500 in the ratio 3:2, how much money does A receive?',
    options: [
      { id: 'A', text: '$200' },
      { id: 'B', text: '$300' },
      { id: 'C', text: '$250' },
      { id: 'D', text: '$350' }
    ],
    correctAnswer: 'B',
    explanation: 'Total parts = 3 + 2 = 5. Value per part = $500 / 5 = $100. A gets 3 parts = $300.'
  },
  {
    id: 'apt_b3',
    category: 'Aptitude',
    concept: 'Average',
    difficulty: 'BEGINNER',
    questionType: 'Logical',
    question: 'What is the average of the first 5 prime numbers (2, 3, 5, 7, 11)?',
    options: [
      { id: 'A', text: '5.2' },
      { id: 'B', text: '5.6' },
      { id: 'C', text: '6.0' },
      { id: 'D', text: '4.8' }
    ],
    correctAnswer: 'B',
    explanation: 'Sum = 2 + 3 + 5 + 7 + 11 = 28. Average = 28 / 5 = 5.6.'
  },
  {
    id: 'apt_b4',
    category: 'Aptitude',
    concept: 'Profit and Loss',
    difficulty: 'BEGINNER',
    questionType: 'Logical',
    question: 'An item bought for $80 is sold for $100. What is the profit percentage?',
    options: [
      { id: 'A', text: '20%' },
      { id: 'B', text: '25%' },
      { id: 'C', text: '15%' },
      { id: 'D', text: '30%' }
    ],
    correctAnswer: 'B',
    explanation: 'Profit = $100 - $80 = $20. Profit percentage = ($20 / $80) * 100 = 25%.'
  },
  {
    id: 'apt_b5',
    category: 'Aptitude',
    concept: 'Time & Distance',
    difficulty: 'BEGINNER',
    questionType: 'Logical',
    question: 'A car travels 180 km in 3 hours. What is its average speed in meters per second (m/s)?',
    options: [
      { id: 'A', text: '16.67 m/s' },
      { id: 'B', text: '60 m/s' },
      { id: 'C', text: '20 m/s' },
      { id: 'D', text: '15 m/s' }
    ],
    correctAnswer: 'A',
    explanation: 'Speed = 180 km / 3 h = 60 km/h. Convert to m/s: 60 * (5 / 18) = 16.67 m/s.'
  },
  {
    id: 'apt_i1',
    category: 'Aptitude',
    concept: 'Time & Work',
    difficulty: 'INTERMEDIATE',
    questionType: 'Logical',
    question: 'A completes a task in 10 days, B in 15 days. Working together, how many days will they take?',
    options: [
      { id: 'A', text: '6 days' },
      { id: 'B', text: '8 days' },
      { id: 'C', text: '12.5 days' },
      { id: 'D', text: '5 days' }
    ],
    correctAnswer: 'A',
    explanation: 'Combined rate = (1/10) + (1/15) = 5/30 = 1/6 task per day. Time = 6 days.'
  },
  {
    id: 'apt_i2',
    category: 'Aptitude',
    concept: 'Probability',
    difficulty: 'INTERMEDIATE',
    questionType: 'Logical',
    question: 'What is the probability of rolling a sum of 7 with two fair 6-sided dice?',
    options: [
      { id: 'A', text: '1/6' },
      { id: 'B', text: '1/12' },
      { id: 'C', text: '7/36' },
      { id: 'D', text: '5/36' }
    ],
    correctAnswer: 'A',
    explanation: 'Pairs giving 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 combinations out of 36 total outcomes. 6/36 = 1/6.'
  },
  {
    id: 'apt_i3',
    category: 'Aptitude',
    concept: 'Permutations',
    difficulty: 'INTERMEDIATE',
    questionType: 'Logical',
    question: 'How many distinct ways can the letters of the word "LEADER" be arranged?',
    options: [
      { id: 'A', text: '720' },
      { id: 'B', text: '360' },
      { id: 'C', text: '120' },
      { id: 'D', text: '480' }
    ],
    correctAnswer: 'B',
    explanation: 'Total letters = 6. \'E\' appears twice. Unique permutations = 6! / 2! = 720 / 2 = 360.'
  },
  {
    id: 'apt_i4',
    category: 'Aptitude',
    concept: 'Number Series',
    difficulty: 'INTERMEDIATE',
    questionType: 'Logical',
    question: 'Find the next number in the sequence: 2, 6, 12, 20, 30, ?',
    options: [
      { id: 'A', text: '40' },
      { id: 'B', text: '42' },
      { id: 'C', text: '44' },
      { id: 'D', text: '38' }
    ],
    correctAnswer: 'B',
    explanation: 'Differences are +4, +6, +8, +10. Next difference is +12. 30 + 12 = 42.'
  },
  {
    id: 'apt_i5',
    category: 'Aptitude',
    concept: 'Clocks & Angles',
    difficulty: 'INTERMEDIATE',
    questionType: 'Logical',
    question: 'What is the angle between the hour and minute hands of a clock at 3:30?',
    options: [
      { id: 'A', text: '90 degrees' },
      { id: 'B', text: '75 degrees' },
      { id: 'C', text: '105 degrees' },
      { id: 'D', text: '60 degrees' }
    ],
    correctAnswer: 'B',
    explanation: 'Minute hand angle = 30 * 6 = 180°. Hour hand angle = 3 * 30 + 30 * 0.5 = 105°. Difference = 180° - 105° = 75°.'
  },
  {
    id: 'apt_a1',
    category: 'Aptitude',
    concept: 'Compound Interest',
    difficulty: 'ADVANCED',
    questionType: 'Logical',
    question: 'A principal of $1,000 compounded annually at 10% for 2 years yields what total compound interest?',
    options: [
      { id: 'A', text: '$200' },
      { id: 'B', text: '$210' },
      { id: 'C', text: '$220' },
      { id: 'D', text: '$250' }
    ],
    correctAnswer: 'B',
    explanation: 'Amount = 1000 * (1.10)^2 = 1000 * 1.21 = $1,210. Interest = 1210 - 1000 = $210.'
  },
  {
    id: 'apt_a2',
    category: 'Aptitude',
    concept: 'Pipes & Cisterns',
    difficulty: 'ADVANCED',
    questionType: 'Logical',
    question: 'Pipe A fills a tank in 4h, Pipe B in 6h, Leak C empties in 12h. All open together, how long to fill?',
    options: [
      { id: 'A', text: '3 hours' },
      { id: 'B', text: '2.5 hours' },
      { id: 'C', text: '4 hours' },
      { id: 'D', text: '3.5 hours' }
    ],
    correctAnswer: 'A',
    explanation: 'Net rate = (1/4) + (1/6) - (1/12) = (3/12) + (2/12) - (1/12) = 4/12 = 1/3 per hour. Time = 3 hours.'
  },
  {
    id: 'apt_a3',
    category: 'Aptitude',
    concept: 'Set Theory',
    difficulty: 'ADVANCED',
    questionType: 'Logical',
    question: 'In a class of 100, 60 like Math, 50 like Physics, 20 like both. How many like neither?',
    options: [
      { id: 'A', text: '10' },
      { id: 'B', text: '20' },
      { id: 'C', text: '30' },
      { id: 'D', text: '15' }
    ],
    correctAnswer: 'A',
    explanation: 'N(M U P) = 60 + 50 - 20 = 90. Neither = Total - 90 = 10.'
  },
  {
    id: 'apt_a4',
    category: 'Aptitude',
    concept: 'Logarithms',
    difficulty: 'ADVANCED',
    questionType: 'Logical',
    question: 'What is the value of log2(64)?',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: '8' },
      { id: 'C', text: '5' },
      { id: 'D', text: '32' }
    ],
    correctAnswer: 'A',
    explanation: '2^6 = 64, therefore log2(64) = 6.'
  },
  {
    id: 'apt_a5',
    category: 'Aptitude',
    concept: 'Speed & Streams',
    difficulty: 'ADVANCED',
    questionType: 'Logical',
    question: 'A boat goes 12 km downstream in 1 hour and 12 km upstream in 2 hours. What is the speed of the stream?',
    options: [
      { id: 'A', text: '3 km/h' },
      { id: 'B', text: '6 km/h' },
      { id: 'C', text: '9 km/h' },
      { id: 'D', text: '4 km/h' }
    ],
    correctAnswer: 'A',
    explanation: 'Downstream speed = 12 km/h, Upstream speed = 6 km/h. Stream speed = (12 - 6) / 2 = 3 km/h.'
  },

  // ==========================================
  // 3. DATABASE MANAGEMENT SYSTEMS (DBMS) - 15 Questions
  // ==========================================
  {
    id: 'dbms_b1',
    category: 'DBMS',
    concept: 'Relational Model',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'What does a row in a relational database table represent?',
    options: [
      { id: 'A', text: 'Attribute' },
      { id: 'B', text: 'Tuple / Record' },
      { id: 'C', text: 'Domain' },
      { id: 'D', text: 'Index' }
    ],
    correctAnswer: 'B',
    explanation: 'In relational algebra, each row of a table is referred to as a tuple or record.'
  },
  {
    id: 'dbms_b2',
    category: 'DBMS',
    concept: 'Primary Key',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'Which requirement MUST a Primary Key satisfy?',
    options: [
      { id: 'A', text: 'Unique and Nullable' },
      { id: 'B', text: 'Unique and NOT NULL' },
      { id: 'C', text: 'Foreign constraint bound' },
      { id: 'D', text: 'Auto-incrementing integer only' }
    ],
    correctAnswer: 'B',
    explanation: 'A Primary Key uniquely identifies every tuple in a table and cannot contain NULL values.'
  },
  {
    id: 'dbms_b3',
    category: 'DBMS',
    concept: 'SQL Basics',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'Which SQL keyword is used to eliminate duplicate records from query results?',
    options: [
      { id: 'A', text: 'UNIQUE' },
      { id: 'B', text: 'DISTINCT' },
      { id: 'C', text: 'GROUP BY' },
      { id: 'D', text: 'FILTER' }
    ],
    correctAnswer: 'B',
    explanation: 'SELECT DISTINCT removes duplicate rows from the result set.'
  },
  {
    id: 'dbms_b4',
    category: 'DBMS',
    concept: 'Foreign Keys',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'What purpose does a Foreign Key serve in a database?',
    options: [
      { id: 'A', text: 'Speed up query execution speed' },
      { id: 'B', text: 'Enforce Referential Integrity between tables' },
      { id: 'C', text: 'Encrypt stored table values' },
      { id: 'D', text: 'Prevent table deletion' }
    ],
    correctAnswer: 'B',
    explanation: 'Foreign Keys link child table columns to parent table candidate keys, enforcing referential integrity.'
  },
  {
    id: 'dbms_b5',
    category: 'DBMS',
    concept: 'Data Types',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'What is the main difference between CHAR(10) and VARCHAR(10)?',
    options: [
      { id: 'A', text: 'CHAR is variable length, VARCHAR is fixed' },
      { id: 'B', text: 'CHAR is fixed length (padded), VARCHAR is variable length' },
      { id: 'C', text: 'CHAR stores numbers, VARCHAR stores strings' },
      { id: 'D', text: 'VARCHAR cannot store special characters' }
    ],
    correctAnswer: 'B',
    explanation: 'CHAR pads unused characters with spaces up to fixed length 10; VARCHAR allocates only the required string length.'
  },
  {
    id: 'dbms_i1',
    category: 'DBMS',
    concept: 'ACID Properties',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'Which ACID property guarantees that database changes survive system failures after a transaction commits?',
    options: [
      { id: 'A', text: 'Atomicity' },
      { id: 'B', text: 'Consistency' },
      { id: 'C', text: 'Isolation' },
      { id: 'D', text: 'Durability' }
    ],
    correctAnswer: 'D',
    explanation: 'Durability ensures committed transactions are permanently logged to non-volatile storage.'
  },
  {
    id: 'dbms_i2',
    category: 'DBMS',
    concept: 'Normalization',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What condition defines Third Normal Form (3NF)?',
    options: [
      { id: 'A', text: 'No partial functional dependencies' },
      { id: 'B', text: 'In 2NF and contains no transitive dependencies' },
      { id: 'C', text: 'Every determinant is a candidate key' },
      { id: 'D', text: 'No repeating groups' }
    ],
    correctAnswer: 'B',
    explanation: '3NF requires 2NF status and that non-prime attributes do not depend on other non-prime attributes (no transitive dependencies).'
  },
  {
    id: 'dbms_i3',
    category: 'DBMS',
    concept: 'Indexing',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'Which underlying data structure is most commonly used for RDBMS B-Tree indexes?',
    options: [
      { id: 'A', text: 'Binary Search Tree' },
      { id: 'B', text: 'B+ Tree' },
      { id: 'C', text: 'Red-Black Tree' },
      { id: 'D', text: 'Skip List' }
    ],
    correctAnswer: 'B',
    explanation: 'B+ Trees store all actual data pointers in leaf nodes linked sequentially, optimizing range queries and disk block reads.'
  },
  {
    id: 'dbms_i4',
    category: 'DBMS',
    concept: 'Joins',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'Which JOIN returns all records from the left table and matching records from the right table?',
    options: [
      { id: 'A', text: 'INNER JOIN' },
      { id: 'B', text: 'LEFT JOIN (or LEFT OUTER JOIN)' },
      { id: 'C', text: 'RIGHT JOIN' },
      { id: 'D', text: 'FULL OUTER JOIN' }
    ],
    correctAnswer: 'B',
    explanation: 'LEFT JOIN preserves all rows from the left table, filling unmatched right table columns with NULL.'
  },
  {
    id: 'dbms_i5',
    category: 'DBMS',
    concept: 'Transactions',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'What is a "Dirty Read" anomaly in database transaction isolation levels?',
    options: [
      { id: 'A', text: 'Reading uncommitted data written by a concurrent transaction' },
      { id: 'B', text: 'Reading different values when re-querying the same row in a transaction' },
      { id: 'C', text: 'Phantom rows appearing during range queries' },
      { id: 'D', text: 'Writing over committed data without locking' }
    ],
    correctAnswer: 'A',
    explanation: 'A Dirty Read occurs when Transaction A reads modifications made by Transaction B before B has committed.'
  },
  {
    id: 'dbms_a1',
    category: 'DBMS',
    concept: 'Concurrency Control',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What protocol prevents cascading rollbacks by ensuring locks are released only after commit/abort?',
    options: [
      { id: 'A', text: 'Basic Two-Phase Locking (2PL)' },
      { id: 'B', text: 'Strict Two-Phase Locking (Strict 2PL)' },
      { id: 'C', text: 'Thomas Write Rule' },
      { id: 'D', text: 'Timestamp Ordering' }
    ],
    correctAnswer: 'B',
    explanation: 'Strict 2PL holds all exclusive locks until transaction completion, preventing other transactions from reading uncommitted data.'
  },
  {
    id: 'dbms_a2',
    category: 'DBMS',
    concept: 'BCNF',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'Boyce-Codd Normal Form (BCNF) strictly requires that for every functional dependency X -> Y:',
    options: [
      { id: 'A', text: 'Y is a prime attribute' },
      { id: 'B', text: 'X must be a super key' },
      { id: 'C', text: 'Y must be a subset of X' },
      { id: 'D', text: 'X must be a single column' }
    ],
    correctAnswer: 'B',
    explanation: 'BCNF is a stricter variant of 3NF requiring that the left-hand side X of any non-trivial dependency X -> Y is a super key.'
  },
  {
    id: 'dbms_a3',
    category: 'DBMS',
    concept: 'Query Optimization',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What does a Database Query Planner generate to evaluate execution cost?',
    options: [
      { id: 'A', text: 'Relational Execution Tree / Query Execution Plan' },
      { id: 'B', text: 'Entity Relationship Diagram' },
      { id: 'C', text: 'Normal Form Graph' },
      { id: 'D', text: 'WAL Journal File' }
    ],
    correctAnswer: 'A',
    explanation: 'The query optimizer converts SQL into relational algebra trees and evaluates cost estimates to pick the optimal query plan.'
  },
  {
    id: 'dbms_a4',
    category: 'DBMS',
    concept: 'WAL Logging',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What is the purpose of Write-Ahead Logging (WAL) in storage engines?',
    options: [
      { id: 'A', text: 'Encrypting data blocks on disk' },
      { id: 'B', text: 'Ensuring log records are flushed to disk before data pages are updated' },
      { id: 'C', text: 'Compressing database backups' },
      { id: 'D', text: 'Generating schema migrations automatically' }
    ],
    correctAnswer: 'B',
    explanation: 'WAL guarantees durability and atomicity by writing changes to sequential log files before writing modified buffer pages to data files.'
  },
  {
    id: 'dbms_a5',
    category: 'DBMS',
    concept: 'Sharding',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'What is Database Sharding?',
    options: [
      { id: 'A', text: 'Creating read-only replicas of a master database' },
      { id: 'B', text: 'Horizontally partitioning data across independent database instances' },
      { id: 'C', text: 'Normalizing tables into 5NF' },
      { id: 'D', text: 'Indexing columns using inverted hash maps' }
    ],
    correctAnswer: 'B',
    explanation: 'Sharding partitions rows of tables horizontally across multiple distinct physical servers to scale write throughput.'
  },

  // ==========================================
  // 4. OPERATING SYSTEMS (OS) - 15 Questions
  // ==========================================
  {
    id: 'os_b1',
    category: 'OS',
    concept: 'Process vs Thread',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'What memory space do threads belonging to the same process share?',
    options: [
      { id: 'A', text: 'Stack only' },
      { id: 'B', text: 'Code, Data, and Heap sections' },
      { id: 'C', text: 'CPU Registers only' },
      { id: 'D', text: 'No shared memory' }
    ],
    correctAnswer: 'B',
    explanation: 'Threads share the address space (code, global data, heap) of their parent process, while keeping private stacks and registers.'
  },
  {
    id: 'os_b2',
    category: 'OS',
    concept: 'Kernel & User Mode',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'What CPU mechanism isolates system hardware access from user applications?',
    options: [
      { id: 'A', text: 'Dual-mode execution (User mode vs Kernel mode)' },
      { id: 'B', text: 'Virtual machine hypervisor' },
      { id: 'C', text: 'Garbage Collection' },
      { id: 'D', text: 'L1 Cache eviction' }
    ],
    correctAnswer: 'A',
    explanation: 'Dual-mode execution uses mode bits in hardware to restrict privileged instructions to Kernel mode.'
  },
  {
    id: 'os_b3',
    category: 'OS',
    concept: 'CPU Scheduling',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'Which CPU scheduling algorithm assigns CPU time slices in a circular order?',
    options: [
      { id: 'A', text: 'First-Come First-Served (FCFS)' },
      { id: 'B', text: 'Round Robin (RR)' },
      { id: 'C', text: 'Shortest Job First (SJF)' },
      { id: 'D', text: 'Priority Scheduling' }
    ],
    correctAnswer: 'B',
    explanation: 'Round Robin assigns fixed time quanta to processes in a circular queue.'
  },
  {
    id: 'os_b4',
    category: 'OS',
    concept: 'System Calls',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'How does a user program request a service from the operating system kernel?',
    options: [
      { id: 'A', text: 'Via an Interrupt Service Routine (ISR)' },
      { id: 'B', text: 'Via a System Call (Trap)' },
      { id: 'C', text: 'Via a Global Variable' },
      { id: 'D', text: 'Via a Direct Memory Access (DMA) trigger' }
    ],
    correctAnswer: 'B',
    explanation: 'System calls trigger software traps to transition execution from user space to kernel space.'
  },
  {
    id: 'os_b5',
    category: 'OS',
    concept: 'Process States',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'Which process state describes a process waiting for I/O operation completion?',
    options: [
      { id: 'A', text: 'Ready' },
      { id: 'B', text: 'Running' },
      { id: 'C', text: 'Waiting / Blocked' },
      { id: 'D', text: 'Terminated' }
    ],
    correctAnswer: 'C',
    explanation: 'A process transitions to the Blocked/Waiting state while waiting for an external event or I/O completion.'
  },
  {
    id: 'os_i1',
    category: 'OS',
    concept: 'Deadlocks',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'Which of the following is NOT one of Coffman\'s four necessary conditions for Deadlock?',
    options: [
      { id: 'A', text: 'Mutual Exclusion' },
      { id: 'B', text: 'Hold and Wait' },
      { id: 'C', text: 'Preemption Allowed' },
      { id: 'D', text: 'Circular Wait' }
    ],
    correctAnswer: 'C',
    explanation: 'The necessary condition is "No Preemption" (resources cannot be forcibly taken away). "Preemption Allowed" prevents deadlocks.'
  },
  {
    id: 'os_i2',
    category: 'OS',
    concept: 'Virtual Memory',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What hardware component translates Virtual Memory addresses to Physical Memory addresses?',
    options: [
      { id: 'A', text: 'ALU' },
      { id: 'B', text: 'MMU (Memory Management Unit)' },
      { id: 'C', text: 'DMA Controller' },
      { id: 'D', text: 'BIOS' }
    ],
    correctAnswer: 'B',
    explanation: 'The MMU translates virtual page addresses into physical frame addresses using page tables.'
  },
  {
    id: 'os_i3',
    category: 'OS',
    concept: 'Page Faults',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'When does a Page Fault occur?',
    options: [
      { id: 'A', text: 'When a process tries to access a page not currently mapped in RAM' },
      { id: 'B', text: 'When physical RAM experiences hardware failure' },
      { id: 'C', text: 'When cache memory is cleared' },
      { id: 'D', text: 'When a process exits illegally' }
    ],
    correctAnswer: 'A',
    explanation: 'A Page Fault occurs when a virtual address reference hits an invalid page table entry, forcing the OS to fetch the page from secondary storage.'
  },
  {
    id: 'os_i4',
    category: 'OS',
    concept: 'Semaphores',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What are the two atomic operations associated with a Semaphore?',
    options: [
      { id: 'A', text: 'Lock & Unlock' },
      { id: 'B', text: 'Wait (P) & Signal (V)' },
      { id: 'C', text: 'Read & Write' },
      { id: 'D', text: 'Block & Resume' }
    ],
    correctAnswer: 'B',
    explanation: 'Dijkstra defined Wait (P / decrement) and Signal (V / increment) as atomic semaphore operations.'
  },
  {
    id: 'os_i5',
    category: 'OS',
    concept: 'Thrashing',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'What is Thrashing in an operating system?',
    options: [
      { id: 'A', text: 'Excessive CPU context switching between threads' },
      { id: 'B', text: 'High frequency of page fault swapping dominating CPU activity' },
      { id: 'C', text: 'Disk fragmentation causing slow file writes' },
      { id: 'D', text: 'Memory corruption due to buffer overflow' }
    ],
    correctAnswer: 'B',
    explanation: 'Thrashing occurs when an OS spends more time swapping pages in and out of disk than executing useful work.'
  },
  {
    id: 'os_a1',
    category: 'OS',
    concept: 'Banker\'s Algorithm',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What is the primary purpose of Dijkstra\'s Banker\'s Algorithm?',
    options: [
      { id: 'A', text: 'Deadlock Detection' },
      { id: 'B', text: 'Deadlock Avoidance by testing safe states' },
      { id: 'C', text: 'Page replacement optimization' },
      { id: 'D', text: 'Disk scheduling optimization' }
    ],
    correctAnswer: 'B',
    explanation: 'Banker\'s Algorithm avoids deadlocks by simulating allocation and denying requests if they transition the system into an unsafe state.'
  },
  {
    id: 'os_a2',
    category: 'OS',
    concept: 'TLB',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What is the Translation Lookaside Buffer (TLB)?',
    options: [
      { id: 'A', text: 'A hardware cache for fast page table address translation' },
      { id: 'B', text: 'A disk cache for file system metadata' },
      { id: 'C', text: 'A software buffer for system call arguments' },
      { id: 'D', text: 'A queue for pending I/O requests' }
    ],
    correctAnswer: 'A',
    explanation: 'The TLB is a high-speed associative hardware cache storing recent virtual-to-physical address mappings.'
  },
  {
    id: 'os_a3',
    category: 'OS',
    concept: 'Belady\'s Anomaly',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'Belady\'s Anomaly demonstrates that increasing page frames can increase page faults in which algorithm?',
    options: [
      { id: 'A', text: 'LRU (Least Recently Used)' },
      { id: 'B', text: 'FIFO (First In First Out)' },
      { id: 'C', text: 'Optimal Page Replacement' },
      { id: 'D', text: 'MFU (Most Frequently Used)' }
    ],
    correctAnswer: 'B',
    explanation: 'FIFO page replacement suffers from Belady\'s Anomaly, where assigning more memory frames can counterintuitively increase total page faults.'
  },
  {
    id: 'os_a4',
    category: 'OS',
    concept: 'Inter-Process Communication',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'Which IPC mechanism provides the highest throughput for sharing data between local processes?',
    options: [
      { id: 'A', text: 'Message Queues' },
      { id: 'B', text: 'Shared Memory' },
      { id: 'C', text: 'Unix Domain Sockets' },
      { id: 'D', text: 'Named Pipes (FIFO)' }
    ],
    correctAnswer: 'B',
    explanation: 'Shared Memory avoids kernel data copying overhead by mapping the same physical RAM region into multiple processes\' address spaces.'
  },
  {
    id: 'os_a5',
    category: 'OS',
    concept: 'File Systems',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What does a Unix inode store?',
    options: [
      { id: 'A', text: 'File contents and file name' },
      { id: 'B', text: 'File metadata and data block pointers (excluding filename)' },
      { id: 'C', text: 'Directory paths only' },
      { id: 'D', text: 'User passwords and access logs' }
    ],
    correctAnswer: 'B',
    explanation: 'An inode contains file metadata (permissions, owner, size, timestamps) and pointers to disk blocks, but filenames are stored in directory entries.'
  },

  // ==========================================
  // 5. COMPUTER NETWORKS (CN) - 15 Questions
  // ==========================================
  {
    id: 'cn_b1',
    category: 'CN',
    concept: 'OSI Model',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'How many layers are in the ISO OSI Reference Model?',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '5' },
      { id: 'C', text: '7' },
      { id: 'D', text: '6' }
    ],
    correctAnswer: 'C',
    explanation: 'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.'
  },
  {
    id: 'cn_b2',
    category: 'CN',
    concept: 'IP Addresses',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'How many bits compose an IPv4 address?',
    options: [
      { id: 'A', text: '32 bits' },
      { id: 'B', text: '64 bits' },
      { id: 'C', text: '128 bits' },
      { id: 'D', text: '16 bits' }
    ],
    correctAnswer: 'A',
    explanation: 'IPv4 addresses are 32-bit values typically represented in dotted-decimal notation (e.g. 192.168.1.1).'
  },
  {
    id: 'cn_b3',
    category: 'CN',
    concept: 'TCP vs UDP',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'Which protocol is connectionless and does not guarantee packet delivery?',
    options: [
      { id: 'A', text: 'TCP' },
      { id: 'B', text: 'UDP' },
      { id: 'C', text: 'HTTP' },
      { id: 'D', text: 'SSH' }
    ],
    correctAnswer: 'B',
    explanation: 'UDP (User Datagram Protocol) is a lightweight, connectionless protocol without delivery guarantees or handshake overhead.'
  },
  {
    id: 'cn_b4',
    category: 'CN',
    concept: 'HTTP/HTTPS',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'What is the default port number used by unencrypted HTTP traffic?',
    options: [
      { id: 'A', text: '443' },
      { id: 'B', text: '80' },
      { id: 'C', text: '21' },
      { id: 'D', text: '22' }
    ],
    correctAnswer: 'B',
    explanation: 'Port 80 is standard for HTTP, while port 443 is standard for encrypted HTTPS.'
  },
  {
    id: 'cn_b5',
    category: 'CN',
    concept: 'MAC Address',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'At which OSI layer does a MAC address operate?',
    options: [
      { id: 'A', text: 'Layer 1 (Physical)' },
      { id: 'B', text: 'Layer 2 (Data Link)' },
      { id: 'C', text: 'Layer 3 (Network)' },
      { id: 'D', text: 'Layer 4 (Transport)' }
    ],
    correctAnswer: 'B',
    explanation: 'MAC addresses are physical hardware identifiers operating at Layer 2 (Data Link Layer).'
  },
  {
    id: 'cn_i1',
    category: 'CN',
    concept: 'TCP Handshake',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What is the correct order of flag packets in a 3-Way TCP Handshake?',
    options: [
      { id: 'A', text: 'SYN -> ACK -> SYN-ACK' },
      { id: 'B', text: 'SYN -> SYN-ACK -> ACK' },
      { id: 'C', text: 'ACK -> SYN -> FIN' },
      { id: 'D', text: 'CONNECT -> ACCEPT -> READY' }
    ],
    correctAnswer: 'B',
    explanation: 'TCP connection establishment sequence: Client sends SYN, Server replies SYN-ACK, Client sends ACK.'
  },
  {
    id: 'cn_i2',
    category: 'CN',
    concept: 'DNS',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'Which DNS record type maps a domain name directly to an IPv4 address?',
    options: [
      { id: 'A', text: 'AAAA Record' },
      { id: 'B', text: 'A Record' },
      { id: 'C', text: 'CNAME Record' },
      { id: 'D', text: 'MX Record' }
    ],
    correctAnswer: 'B',
    explanation: 'An \'A\' record maps a domain to an IPv4 address. \'AAAA\' maps to IPv6, and \'CNAME\' aliases to another hostname.'
  },
  {
    id: 'cn_i3',
    category: 'CN',
    concept: 'Subnetting',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'How many usable host IP addresses are in a /24 IPv4 subnet?',
    options: [
      { id: 'A', text: '256' },
      { id: 'B', text: '254' },
      { id: 'C', text: '255' },
      { id: 'D', text: '512' }
    ],
    correctAnswer: 'B',
    explanation: 'A /24 subnet has 2^(32-24) = 256 addresses. Subtracting Network ID and Broadcast address leaves 254 usable host IPs.'
  },
  {
    id: 'cn_i4',
    category: 'CN',
    concept: 'ARP',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What is the purpose of the Address Resolution Protocol (ARP)?',
    options: [
      { id: 'A', text: 'Translating IP addresses to MAC addresses' },
      { id: 'B', text: 'Translating domain names to IP addresses' },
      { id: 'C', text: 'Routing packets across Autonomous Systems' },
      { id: 'D', text: 'Assigning dynamic IP addresses to hosts' }
    ],
    correctAnswer: 'A',
    explanation: 'ARP resolves known Layer 3 IP addresses to physical Layer 2 MAC addresses on local networks.'
  },
  {
    id: 'cn_i5',
    category: 'CN',
    concept: 'Flow Control',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'Which sliding window algorithm aspect controls TCP flow rate based on receiver buffer availability?',
    options: [
      { id: 'A', text: 'Receiver Window (rwnd)' },
      { id: 'B', text: 'Congestion Window (cwnd)' },
      { id: 'C', text: 'Maximum Segment Size (MSS)' },
      { id: 'D', text: 'Time To Live (TTL)' }
    ],
    correctAnswer: 'A',
    explanation: 'The Receiver Window (rwnd) field in TCP headers communicates available buffer space to prevent receiver overflow.'
  },
  {
    id: 'cn_a1',
    category: 'CN',
    concept: 'TCP Congestion Control',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'In TCP Tahoe/Reno, what state is entered when a packet loss is detected via 3 Duplicate ACKs?',
    options: [
      { id: 'A', text: 'Slow Start (reset cwnd = 1 MSS)' },
      { id: 'B', text: 'Fast Retransmit & Fast Recovery' },
      { id: 'C', text: 'Connection Termination' },
      { id: 'D', text: 'Exponential Backoff' }
    ],
    correctAnswer: 'B',
    explanation: 'Receiving 3 Duplicate ACKs signals partial loss without timeout, triggering Fast Retransmit and setting cwnd to ssthresh + 3.'
  },
  {
    id: 'cn_a2',
    category: 'CN',
    concept: 'BGP Routing',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What classification applies to Border Gateway Protocol (BGP)?',
    options: [
      { id: 'A', text: 'Link-State Interior Gateway Protocol' },
      { id: 'B', text: 'Path-Vector Exterior Gateway Protocol' },
      { id: 'C', text: 'Distance-Vector Interior Routing Protocol' },
      { id: 'D', text: 'Centralized Software-Defined Controller' }
    ],
    correctAnswer: 'B',
    explanation: 'BGP is a Path-Vector Exterior Gateway Protocol used to route traffic between distinct Autonomous Systems across the internet.'
  },
  {
    id: 'cn_a3',
    category: 'CN',
    concept: 'TLS Handshake',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What cryptographic technique allows TLS 1.3 to achieve Forward Secrecy?',
    options: [
      { id: 'A', text: 'Static RSA Key Exchange' },
      { id: 'B', text: 'Ephemeral Diffie-Hellman (ECDHE)' },
      { id: 'C', text: 'Symmetric AES-GCM Encryption' },
      { id: 'D', text: 'MD5 Hashing' }
    ],
    correctAnswer: 'B',
    explanation: 'Ephemeral Diffie-Hellman key exchanges generate per-session keys, ensuring past session traffic cannot be decrypted if server private keys leak.'
  },
  {
    id: 'cn_a4',
    category: 'CN',
    concept: 'NAT',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'How does NAPT (Network Address Port Translation / PAT) allow multiple internal hosts to share one public IP?',
    options: [
      { id: 'A', text: 'By assigning unique MAC addresses to packets' },
      { id: 'B', text: 'By mapping internal IP + source port combinations to unique external source ports' },
      { id: 'C', text: 'By encrypting IP headers' },
      { id: 'D', text: 'By alternating public IP addresses every second' }
    ],
    correctAnswer: 'B',
    explanation: 'PAT maps private IP addresses and source ports into distinct source port numbers on the shared public IP.'
  },
  {
    id: 'cn_a5',
    category: 'CN',
    concept: 'HTTP/2 & HTTP/3',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What fundamental transport layer change differentiates HTTP/3 from HTTP/2?',
    options: [
      { id: 'A', text: 'HTTP/3 uses TCP with TLS 1.3' },
      { id: 'B', text: 'HTTP/3 uses QUIC protocol over UDP instead of TCP' },
      { id: 'C', text: 'HTTP/3 removes header compression' },
      { id: 'D', text: 'HTTP/3 relies on WebSockets exclusively' }
    ],
    correctAnswer: 'B',
    explanation: 'HTTP/3 runs over QUIC (built on top of UDP), eliminating TCP head-of-line blocking across multiplexed streams.'
  },

  // ==========================================
  // 6. OBJECT-ORIENTED PROGRAMMING (OOP) - 15 Questions
  // ==========================================
  {
    id: 'oop_b1',
    category: 'OOP',
    concept: 'Encapsulation',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'Which OOP pillar restricts direct access to an object\'s internal state and forces interaction through methods?',
    options: [
      { id: 'A', text: 'Inheritance' },
      { id: 'B', text: 'Encapsulation' },
      { id: 'C', text: 'Polymorphism' },
      { id: 'D', text: 'Abstraction' }
    ],
    correctAnswer: 'B',
    explanation: 'Encapsulation bundles data and methods operating on that data within a class while hiding private implementation details.'
  },
  {
    id: 'oop_b2',
    category: 'OOP',
    concept: 'Inheritance',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'What keyword allows a child class to inherit properties and methods from a parent class in TypeScript/Java?',
    options: [
      { id: 'A', text: 'implements' },
      { id: 'B', text: 'extends' },
      { id: 'C', text: 'super' },
      { id: 'D', text: 'export' }
    ],
    correctAnswer: 'B',
    explanation: 'The `extends` keyword establishes a child-parent class inheritance relationship.'
  },
  {
    id: 'oop_b3',
    category: 'OOP',
    concept: 'Polymorphism',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'What does Polymorphism literally mean in OOP context?',
    options: [
      { id: 'A', text: 'Single Form' },
      { id: 'B', text: 'Many Forms' },
      { id: 'C', text: 'Data Hiding' },
      { id: 'D', text: 'Static Memory' }
    ],
    correctAnswer: 'B',
    explanation: 'Polymorphism ("many forms") allows methods with the same name to exhibit different behaviors based on the invoking object.'
  },
  {
    id: 'oop_b4',
    category: 'OOP',
    concept: 'Abstraction',
    difficulty: 'BEGINNER',
    questionType: 'MCQ',
    question: 'What is the main purpose of Abstraction in object-oriented design?',
    options: [
      { id: 'A', text: 'Showing internal algorithmic implementation details' },
      { id: 'B', text: 'Hiding complex internal logic while exposing essential interfaces' },
      { id: 'C', text: 'Duplicating class methods for efficiency' },
      { id: 'D', text: 'Converting classes to primitive data types' }
    ],
    correctAnswer: 'B',
    explanation: 'Abstraction simplifies system complexity by revealing high-level interface actions while hiding low-level execution details.'
  },
  {
    id: 'oop_b5',
    category: 'OOP',
    concept: 'Classes & Objects',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'What is an Object in relation to a Class?',
    options: [
      { id: 'A', text: 'A Class is an instance of an Object' },
      { id: 'B', text: 'An Object is a runtime instance of a Class blueprint' },
      { id: 'C', text: 'Objects and Classes are identical concepts' },
      { id: 'D', text: 'An Object is a global primitive variable' }
    ],
    correctAnswer: 'B',
    explanation: 'A Class provides the structural blueprint, while an Object is a concrete instantiated entity allocated in heap memory.'
  },
  {
    id: 'oop_i1',
    category: 'OOP',
    concept: 'Method Overloading vs Overriding',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'How does Method Overloading differ from Method Overriding?',
    options: [
      { id: 'A', text: 'Overloading is compile-time (same class, different params); Overriding is runtime (subclass redefines parent method)' },
      { id: 'B', text: 'Overriding happens in the same class; Overloading happens in derived classes' },
      { id: 'C', text: 'Overloading requires interfaces; Overriding requires abstract classes' },
      { id: 'D', text: 'There is no difference' }
    ],
    correctAnswer: 'A',
    explanation: 'Overloading provides multiple methods with same name but different signatures in a class. Overriding lets a child class redefine a parent method signature at runtime.'
  },
  {
    id: 'oop_i2',
    category: 'OOP',
    concept: 'Interfaces vs Abstract Classes',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'Which capability distinguishes an Abstract Class from an Interface in standard Java/TypeScript?',
    options: [
      { id: 'A', text: 'Abstract classes can hold state (fields) and concrete method implementations' },
      { id: 'B', text: 'Interfaces can have constructors' },
      { id: 'C', text: 'Abstract classes support multiple inheritance' },
      { id: 'D', text: 'Interfaces can instantiate objects directly' }
    ],
    correctAnswer: 'A',
    explanation: 'Abstract classes can maintain instance state and default method code, whereas interfaces primarily define contracts.'
  },
  {
    id: 'oop_i3',
    category: 'OOP',
    concept: 'Constructors',
    difficulty: 'INTERMEDIATE',
    questionType: 'Code Output',
    question: 'What is called when instantiated derived class `super()` is executed in a constructor?',
    options: [
      { id: 'A', text: 'The child class static initializer' },
      { id: 'B', text: 'The parent class constructor' },
      { id: 'C', text: 'The Garbage Collector' },
      { id: 'D', text: 'The object destructor' }
    ],
    correctAnswer: 'B',
    explanation: '`super()` invokes the parent class constructor to initialize inherited properties.'
  },
  {
    id: 'oop_i4',
    category: 'OOP',
    concept: 'Static Keyword',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What characterizes a `static` member in a class?',
    options: [
      { id: 'A', text: 'It belongs to individual object instances' },
      { id: 'B', text: 'It belongs to the class itself and is shared across all instances' },
      { id: 'C', text: 'It cannot be accessed outside the class' },
      { id: 'D', text: 'It is recreated every time an object is initialized' }
    ],
    correctAnswer: 'B',
    explanation: 'Static variables and methods are associated with the class definition in memory rather than individual instances.'
  },
  {
    id: 'oop_i5',
    category: 'OOP',
    concept: 'Composition vs Inheritance',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'Why does modern software architecture prefer "Composition over Inheritance"?',
    options: [
      { id: 'A', text: 'Composition enforces tight coupling' },
      { id: 'B', text: 'Composition provides greater runtime flexibility and reduces brittle hierarchy coupling' },
      { id: 'C', text: 'Inheritance consumes more memory at runtime' },
      { id: 'D', text: 'Composition eliminates the need for interfaces' }
    ],
    correctAnswer: 'B',
    explanation: 'Composition ("has-a") avoids rigid class hierarchy dependencies ("is-a"), allowing components to be swapped dynamically.'
  },
  {
    id: 'oop_a1',
    category: 'OOP',
    concept: 'SOLID Principles (Liskov)',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What does the Liskov Substitution Principle (LSP) dictate?',
    options: [
      { id: 'A', text: 'Subclasses must be substitutable for their base classes without breaking program correctness' },
      { id: 'B', text: 'Classes should have only one reason to change' },
      { id: 'C', text: 'High-level modules should not depend on low-level modules' },
      { id: 'D', text: 'Clients should not be forced to depend on interfaces they do not use' }
    ],
    correctAnswer: 'A',
    explanation: 'LSP states that objects of a derived class must behave cleanly when substituted for objects of their base class.'
  },
  {
    id: 'oop_a2',
    category: 'OOP',
    concept: 'Design Patterns (Singleton)',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'Which technique ensures thread-safe Singleton instantiation in multi-threaded environments?',
    options: [
      { id: 'A', text: 'Double-Checked Locking with volatile instance variable' },
      { id: 'B', text: 'Public constructor export' },
      { id: 'C', text: 'Recursive initialization' },
      { id: 'D', text: 'Global scope declaration' }
    ],
    correctAnswer: 'A',
    explanation: 'Double-Checked Locking minimizes synchronization overhead while guaranteeing single instance allocation across threads.'
  },
  {
    id: 'oop_a3',
    category: 'OOP',
    concept: 'Design Patterns (Factory)',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'When should the Factory Method Pattern be used?',
    options: [
      { id: 'A', text: 'When a class cannot anticipate the exact class of objects it must create' },
      { id: 'B', text: 'When creating a single global state object' },
      { id: 'C', text: 'When converting incompatible interfaces' },
      { id: 'D', text: 'When building complex step-by-step UI forms' }
    ],
    correctAnswer: 'A',
    explanation: 'The Factory Method pattern encapsulates object creation logic, allowing subclasses or parameters to dictate instantiated types.'
  },
  {
    id: 'oop_a4',
    category: 'OOP',
    concept: 'SOLID Principles (Dependency Inversion)',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What does Dependency Inversion (DIP) recommend?',
    options: [
      { id: 'A', text: 'Depend on concrete implementations rather than abstractions' },
      { id: 'B', text: 'High-level modules and low-level modules should both depend on abstractions' },
      { id: 'C', text: 'Avoid creating interfaces for small classes' },
      { id: 'D', text: 'Pass dependencies through static global variables' }
    ],
    correctAnswer: 'B',
    explanation: 'DIP states that high-level business logic should depend on abstract contracts (interfaces) rather than concrete implementations.'
  },
  {
    id: 'oop_a5',
    category: 'OOP',
    concept: 'Garbage Collection',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'How do modern JVM/V8 Garbage Collectors identify unreferenced objects for collection?',
    options: [
      { id: 'A', text: 'Simple Reference Counting' },
      { id: 'B', text: 'Tracing Reachability from GC Roots (Mark and Sweep)' },
      { id: 'C', text: 'Manual memory free triggers' },
      { id: 'D', text: 'Stack allocation monitoring' }
    ],
    correctAnswer: 'B',
    explanation: 'Mark and Sweep tracing starts from GC Roots (stack frames, static variables) and collects objects unreachable through any reference chain, resolving circular reference leaks.'
  },

  // ==========================================
  // 7. SQL & DATABASE QUERIES - 15 Questions
  // ==========================================
  {
    id: 'sql_b1',
    category: 'SQL',
    concept: 'SELECT Statement',
    difficulty: 'BEGINNER',
    questionType: 'Code Output',
    question: 'Which query retrieves all columns from a table named `Students`?',
    options: [
      { id: 'A', text: 'GET ALL FROM Students;' },
      { id: 'B', text: 'SELECT * FROM Students;' },
      { id: 'C', text: 'FETCH Students.*;' },
      { id: 'D', text: 'SHOW TABLE Students;' }
    ],
    correctAnswer: 'B',
    explanation: '`SELECT * FROM table_name;` is standard SQL syntax to retrieve all columns.'
  },
  {
    id: 'sql_b2',
    category: 'SQL',
    concept: 'WHERE Clause',
    difficulty: 'BEGINNER',
    questionType: 'Code Output',
    question: 'Which clause filters rows BEFORE aggregation occurs in SQL?',
    options: [
      { id: 'A', text: 'HAVING' },
      { id: 'B', text: 'WHERE' },
      { id: 'C', text: 'ORDER BY' },
      { id: 'D', text: 'GROUP BY' }
    ],
    correctAnswer: 'B',
    explanation: '`WHERE` filters individual rows prior to grouping, while `HAVING` filters aggregated group results.'
  },
  {
    id: 'sql_b3',
    category: 'SQL',
    concept: 'ORDER BY',
    difficulty: 'BEGINNER',
    questionType: 'Code Output',
    question: 'How do you sort query results by `salary` from highest to lowest?',
    options: [
      { id: 'A', text: 'ORDER BY salary ASC' },
      { id: 'B', text: 'ORDER BY salary DESC' },
      { id: 'C', text: 'SORT BY salary HIGH' },
      { id: 'D', text: 'GROUP BY salary DESC' }
    ],
    correctAnswer: 'B',
    explanation: '`ORDER BY column DESC` sorts results in descending order (highest to lowest).'
  },
  {
    id: 'sql_b4',
    category: 'SQL',
    concept: 'Aggregate Functions',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'Which SQL function calculates the total number of non-NULL rows in a column?',
    options: [
      { id: 'A', text: 'SUM()' },
      { id: 'B', text: 'COUNT()' },
      { id: 'C', text: 'AVG()' },
      { id: 'D', text: 'MAX()' }
    ],
    correctAnswer: 'B',
    explanation: '`COUNT(column_name)` counts the number of non-NULL values present in the specified column.'
  },
  {
    id: 'sql_b5',
    category: 'SQL',
    concept: 'LIKE Operator',
    difficulty: 'BEGINNER',
    questionType: 'Code Output',
    question: 'What does the SQL wildcard pattern `WHERE name LIKE \'A%\'` match?',
    options: [
      { id: 'A', text: 'Names ending with letter A' },
      { id: 'B', text: 'Names starting with letter A' },
      { id: 'C', text: 'Names containing exactly one letter A' },
      { id: 'D', text: 'Names having 2 characters' }
    ],
    correctAnswer: 'B',
    explanation: 'The `%` wildcard matches zero or more characters, so `\'A%\'` matches any string starting with \'A\'.'
  },
  {
    id: 'sql_i1',
    category: 'SQL',
    concept: 'GROUP BY & HAVING',
    difficulty: 'INTERMEDIATE',
    questionType: 'Code Output',
    question: 'Which SQL statement retrieves departments with an average salary greater than 50000?',
    options: [
      { id: 'A', text: 'SELECT dept, AVG(salary) FROM emp WHERE AVG(salary) > 50000 GROUP BY dept;' },
      { id: 'B', text: 'SELECT dept, AVG(salary) FROM emp GROUP BY dept HAVING AVG(salary) > 50000;' },
      { id: 'C', text: 'SELECT dept, AVG(salary) FROM emp GROUP BY dept WHERE salary > 50000;' },
      { id: 'D', text: 'SELECT dept FROM emp HAVING salary > 50000;' }
    ],
    correctAnswer: 'B',
    explanation: 'Aggregate conditions must be evaluated in the `HAVING` clause after `GROUP BY` execution.'
  },
  {
    id: 'sql_i2',
    category: 'SQL',
    concept: 'Subqueries',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What is a Correlated Subquery in SQL?',
    options: [
      { id: 'A', text: 'A subquery that executes once independently of the outer query' },
      { id: 'B', text: 'A subquery that references columns from the outer query and re-evaluates per outer row' },
      { id: 'C', text: 'A subquery inside a UNION statement' },
      { id: 'D', text: 'A subquery that creates temporary tables' }
    ],
    correctAnswer: 'B',
    explanation: 'Correlated subqueries depend on values from the current row of the outer query, evaluating once per outer row.'
  },
  {
    id: 'sql_i3',
    category: 'SQL',
    concept: 'COALESCE Function',
    difficulty: 'INTERMEDIATE',
    questionType: 'Code Output',
    question: 'What is returned by `SELECT COALESCE(NULL, NULL, \'Cevora\', \'Default\');`?',
    options: [
      { id: 'A', text: 'NULL' },
      { id: 'B', text: '\'Cevora\'' },
      { id: 'C', text: '\'Default\'' },
      { id: 'D', text: 'Error' }
    ],
    correctAnswer: 'B',
    explanation: '`COALESCE()` returns the first non-NULL expression from its argument list.'
  },
  {
    id: 'sql_i4',
    category: 'SQL',
    concept: 'UNION vs UNION ALL',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What is the operational difference between `UNION` and `UNION ALL`?',
    options: [
      { id: 'A', text: '`UNION` preserves duplicate rows; `UNION ALL` removes duplicates' },
      { id: 'B', text: '`UNION` removes duplicate rows; `UNION ALL` preserves all duplicates' },
      { id: 'C', text: '`UNION` works on tables; `UNION ALL` works on views' },
      { id: 'D', text: 'They are identical' }
    ],
    correctAnswer: 'B',
    explanation: '`UNION` performs a distinct sort operation to remove duplicate rows, whereas `UNION ALL` simply concatenates result sets faster.'
  },
  {
    id: 'sql_i5',
    category: 'SQL',
    concept: 'DDL vs DML',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'Which of the following is a Data Definition Language (DDL) command?',
    options: [
      { id: 'A', text: 'INSERT' },
      { id: 'B', text: 'UPDATE' },
      { id: 'C', text: 'TRUNCATE' },
      { id: 'D', text: 'DELETE' }
    ],
    correctAnswer: 'C',
    explanation: '`TRUNCATE` is DDL (deallocates table data pages directly), whereas `INSERT`, `UPDATE`, and `DELETE` are DML commands.'
  },
  {
    id: 'sql_a1',
    category: 'SQL',
    concept: 'Window Functions (DENSE_RANK)',
    difficulty: 'ADVANCED',
    questionType: 'Code Output',
    question: 'How does `DENSE_RANK()` differ from `RANK()` when tied values occur?',
    options: [
      { id: 'A', text: '`DENSE_RANK()` skips ranking numbers after ties' },
      { id: 'B', text: '`DENSE_RANK()` does NOT skip ranking numbers after ties' },
      { id: 'C', text: '`DENSE_RANK()` sorts in reverse order' },
      { id: 'D', text: '`DENSE_RANK()` works only on strings' }
    ],
    correctAnswer: 'B',
    explanation: 'If two items tie for rank 1, `RANK()` assigns the next item rank 3, whereas `DENSE_RANK()` assigns the next item rank 2.'
  },
  {
    id: 'sql_a2',
    category: 'SQL',
    concept: 'Common Table Expressions (CTE)',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'Which SQL keyword defines a Common Table Expression (CTE)?',
    options: [
      { id: 'A', text: 'WITH' },
      { id: 'B', text: 'USING' },
      { id: 'C', text: 'AS TEMP' },
      { id: 'D', text: 'DEFINE' }
    ],
    correctAnswer: 'A',
    explanation: '`WITH cte_name AS (SELECT ...)` defines a CTE to improve query modularity and enable recursive queries.'
  },
  {
    id: 'sql_a3',
    category: 'SQL',
    concept: 'EXPLAIN ANALYZE',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What does `EXPLAIN ANALYZE` provide in RDBMS execution diagnostics?',
    options: [
      { id: 'A', text: 'Shows query syntax errors without running' },
      { id: 'B', text: 'Executes the query and displays actual timing, row counts, and plan node execution costs' },
      { id: 'C', text: 'Automatically adds indexes to slow columns' },
      { id: 'D', text: 'Locks tables against concurrent writes' }
    ],
    correctAnswer: 'B',
    explanation: '`EXPLAIN ANALYZE` executes the SQL statement, displaying planner estimates vs real execution times for each node operator.'
  },
  {
    id: 'sql_a4',
    category: 'SQL',
    concept: 'PIVOT Operations',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What transformation does a SQL PIVOT operation perform?',
    options: [
      { id: 'A', text: 'Converts rows into columns for crosstab reporting' },
      { id: 'B', text: 'Converts foreign keys to primary keys' },
      { id: 'C', text: 'Converts tables into JSON documents' },
      { id: 'D', text: 'Deletes orphaned records' }
    ],
    correctAnswer: 'A',
    explanation: 'PIVOT rotates unique row values from a column into multiple report columns, performing aggregate calculations across them.'
  },
  {
    id: 'sql_a5',
    category: 'SQL',
    concept: 'Index Scan Types',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What is an "Index Only Scan" in PostgreSQL/RDBMS engines?',
    options: [
      { id: 'A', text: 'Scanning the entire table sequentially because no index exists' },
      { id: 'B', text: 'Retrieving required column data directly from the index without fetching heap table pages' },
      { id: 'C', text: 'Scanning partial indexes only' },
      { id: 'D', text: 'Rebuilding an index during low traffic' }
    ],
    correctAnswer: 'B',
    explanation: 'An Index Only Scan satisfies the query entirely from the B-Tree index structure, skipping heap page reads.'
  },

  // ==========================================
  // 8. BEHAVIORAL & WORKPLACE READINESS - 15 Questions
  // ==========================================
  {
    id: 'beh_b1',
    category: 'Behavioral',
    concept: 'STAR Method',
    difficulty: 'BEGINNER',
    questionType: 'Scenario',
    question: 'What does the acronym STAR stand for in behavioral interview responses?',
    options: [
      { id: 'A', text: 'Situation, Task, Action, Result' },
      { id: 'B', text: 'Strategy, Target, Approach, Review' },
      { id: 'C', text: 'System, Technique, Analysis, Reaction' },
      { id: 'D', text: 'Statement, Topic, Answer, Reasoning' }
    ],
    correctAnswer: 'A',
    explanation: 'STAR stands for Situation, Task, Action, and Result — the structured framework for answering behavioral questions.'
  },
  {
    id: 'beh_b2',
    category: 'Behavioral',
    concept: 'Conflict Resolution',
    difficulty: 'BEGINNER',
    questionType: 'Scenario',
    question: 'If a teammate disagrees with your code implementation during a PR review, what is the best first step?',
    options: [
      { id: 'A', text: 'Ignore the feedback and merge immediately' },
      { id: 'B', text: 'Listen to their perspective, discuss technical trade-offs objectively, and seek consensus' },
      { id: 'C', text: 'Escalate to the engineering manager without responding' },
      { id: 'D', text: 'Rewrite the code without asking for clarification' }
    ],
    correctAnswer: 'B',
    explanation: 'Constructive code reviews require respectful dialogue, evaluating architectural trade-offs, and building team alignment.'
  },
  {
    id: 'beh_b3',
    category: 'Behavioral',
    concept: 'Time Management',
    difficulty: 'BEGINNER',
    questionType: 'Scenario',
    question: 'When assigned multiple tasks with tight deadlines, how should you prioritize work?',
    options: [
      { id: 'A', text: 'Work on the easiest task first regardless of impact' },
      { id: 'B', text: 'Assess business impact and urgency, communicate expectations with stakeholders, and execute accordingly' },
      { id: 'C', text: 'Attempt to do all tasks simultaneously without prioritizing' },
      { id: 'D', text: 'Wait until deadlines pass to request extensions' }
    ],
    correctAnswer: 'B',
    explanation: 'Prioritizing based on urgency vs impact (Eisenhower Matrix) and managing stakeholder expectations ensures effective delivery.'
  },
  {
    id: 'beh_b4',
    category: 'Behavioral',
    concept: 'Adaptability',
    difficulty: 'BEGINNER',
    questionType: 'Scenario',
    question: 'Project requirements shift mid-sprint due to changing business requirements. What is the appropriate response?',
    options: [
      { id: 'A', text: 'Refuse to adapt and insist on original requirements' },
      { id: 'B', text: 'Embrace the change, re-evaluate sprint goals with the team, and adjust task scope' },
      { id: 'C', text: 'Stop working until sprint completion' },
      { id: 'D', text: 'Complain about management in team chat' }
    ],
    correctAnswer: 'B',
    explanation: 'Agile software development values responding to change over following a rigid plan.'
  },
  {
    id: 'beh_b5',
    category: 'Behavioral',
    concept: 'Accountability',
    difficulty: 'BEGINNER',
    questionType: 'Scenario',
    question: 'You push a bug to production that breaks a user checkout flow. What should you do?',
    options: [
      { id: 'A', text: 'Blame the QA engineer for missing the bug' },
      { id: 'B', text: 'Immediately notify the team, initiate rollback/fix, and participate in a blameless post-mortem' },
      { id: 'C', text: 'Hide the issue and hope users don\'t notice' },
      { id: 'D', text: 'Delete git commit history' }
    ],
    correctAnswer: 'B',
    explanation: 'Accountability requires prompt incident response, transparent communication, and blameless root-cause prevention.'
  },
  {
    id: 'beh_i1',
    category: 'Behavioral',
    concept: 'Leadership & Ownership',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'An unassigned critical system bug is impacting customer onboarding. What demonstrates strong Ownership?',
    options: [
      { id: 'A', text: 'Wait for the tech lead to explicitly assign the ticket' },
      { id: 'B', text: 'Step up to investigate, triage the issue, inform stakeholders, and drive resolution' },
      { id: 'C', text: 'Assume someone else will fix it' },
      { id: 'D', text: 'Log a ticket and close your laptop' }
    ],
    correctAnswer: 'B',
    explanation: 'Ownership means taking initiative to solve critical problems for customer success without waiting to be asked.'
  },
  {
    id: 'beh_i2',
    category: 'Behavioral',
    concept: 'Constructive Feedback',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'How should you deliver constructive feedback to a peer whose work missed quality standards?',
    options: [
      { id: 'A', text: 'Critique their intelligence in front of the entire team' },
      { id: 'B', text: 'Deliver actionable, specific, private feedback focused on behavior and impact (SBI model)' },
      { id: 'C', text: 'Avoid giving feedback altogether' },
      { id: 'D', text: 'Complain to HR without speaking to the peer' }
    ],
    correctAnswer: 'B',
    explanation: 'The Situation-Behavior-Impact (SBI) model delivers constructive, non-judgmental feedback privately to foster growth.'
  },
  {
    id: 'beh_i3',
    category: 'Behavioral',
    concept: 'Ambiguity Management',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'You receive a feature request with vague specifications. What is the best action?',
    options: [
      { id: 'A', text: 'Guess the implementation details and build without asking questions' },
      { id: 'B', text: 'Ask targeted clarifying questions, prototype solutions, and align on acceptance criteria' },
      { id: 'C', text: 'Refuse to work until 100% spec completeness is provided' },
      { id: 'D', text: 'Build a completely different feature' }
    ],
    correctAnswer: 'B',
    explanation: 'Engineers handle ambiguity by proactively asking clarifying questions, drafting technical proposals, and defining explicit acceptance criteria.'
  },
  {
    id: 'beh_i4',
    category: 'Behavioral',
    concept: 'Peer Mentorship',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'A junior engineer asks for help with a bug they have been struggling with for 2 hours. How should you help?',
    options: [
      { id: 'A', text: 'Take their keyboard and write the code for them' },
      { id: 'B', text: 'Guide them through debugging techniques, ask probing questions, and help them solve it themselves' },
      { id: 'C', text: 'Tell them to read documentation and walk away' },
      { id: 'D', text: 'Log off' }
    ],
    correctAnswer: 'B',
    explanation: 'Effective mentorship empowers peers by teaching problem-solving mental models rather than giving quick code answers.'
  },
  {
    id: 'beh_i5',
    category: 'Behavioral',
    concept: 'Failure & Resiliency',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'When asked about a past project failure in an interview, what is the interviewer assessing?',
    options: [
      { id: 'A', text: 'Whether you have ever made mistakes' },
      { id: 'B', text: 'Self-awareness, learning lessons, personal growth, and accountability' },
      { id: 'C', text: 'Your ability to blame external factors' },
      { id: 'D', text: 'How well you memorize company guidelines' }
    ],
    correctAnswer: 'B',
    explanation: 'Interviewers evaluate how candidates handle adversity, reflect on lessons learned, and implement preventative changes.'
  },
  {
    id: 'beh_a1',
    category: 'Behavioral',
    concept: 'Stakeholder Management',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'A product manager requests a complex feature 3 days before release. Technical debt risk is high. What should you do?',
    options: [
      { id: 'A', text: 'Say yes blindly and work 24/7 without testing' },
      { id: 'B', text: 'Explain technical risks clearly, propose scoped MVP alternatives or deferred phase rollout, and decide together' },
      { id: 'C', text: 'Say no aggressively without explanation' },
      { id: 'D', text: 'Promise the feature but don\'t deliver' }
    ],
    correctAnswer: 'B',
    explanation: 'Senior engineering judgment balances business speed with technical stability by presenting risk trade-offs and pragmatic compromise options.'
  },
  {
    id: 'beh_a2',
    category: 'Behavioral',
    concept: 'Cross-functional Collaboration',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'Designers and backend engineers disagree on API data payload structures. How do you resolve this?',
    options: [
      { id: 'A', text: 'Let backend dictate without considering UX' },
      { id: 'B', text: 'Establish clear API contracts (OpenAPI/GraphQL) aligning frontend UX needs with backend performance' },
      { id: 'C', text: 'Build separate APIs for every screen' },
      { id: 'D', text: 'Cancel the feature' }
    ],
    correctAnswer: 'B',
    explanation: 'Cross-functional collaboration uses API contract standards to bridge UI requirements with backend schema optimization.'
  },
  {
    id: 'beh_a3',
    category: 'Behavioral',
    concept: 'Technical Vision',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'When proposing a major architectural refactor to leadership, what is essential to include?',
    options: [
      { id: 'A', text: 'Only cool framework benchmarks' },
      { id: 'B', text: 'Business ROI, risk mitigation, execution phases, and maintenance cost reductions' },
      { id: 'C', text: 'Criticisms of former engineers' },
      { id: 'D', text: 'A requirement to pause product releases for 6 months' }
    ],
    correctAnswer: 'B',
    explanation: 'Architectural proposals win executive buy-in by linking code refactoring to business outcomes like latency, developer velocity, and uptime.'
  },
  {
    id: 'beh_a4',
    category: 'Behavioral',
    concept: 'Inclusive Culture',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'A quiet team member is consistently talked over during architecture brainstorming sessions. What should you do?',
    options: [
      { id: 'A', text: 'Ignore it since they aren\'t speaking up' },
      { id: 'B', text: 'Intervene politely during the meeting to invite their perspective, and support asynchronous written input' },
      { id: 'C', text: 'End the meeting immediately' },
      { id: 'D', text: 'Exclude them from future meetings' }
    ],
    correctAnswer: 'B',
    explanation: 'Inclusive leaders create space for all team members by facilitating equal participation in discussions and async channels.'
  },
  {
    id: 'beh_a5',
    category: 'Behavioral',
    concept: 'Ethics & Integrity',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'You discover user location data is being logged in plain text due to a telemetry configuration error. What action is required?',
    options: [
      { id: 'A', text: 'Wait until the next quarterly security audit' },
      { id: 'B', text: 'Flag security incident immediately, disable insecure logging, purge sensitive logs, and patch vulnerability' },
      { id: 'C', text: 'Delete your own user account' },
      { id: 'D', text: 'Ignore it if customer complaints haven\'t occurred' }
    ],
    correctAnswer: 'B',
    explanation: 'Data privacy and security integrity demand immediate remediation, data purging, and vulnerability patching.'
  },

  // ==========================================
  // 9. PROFESSIONAL COMMUNICATION - 15 Questions
  // ==========================================
  {
    id: 'comm_b1',
    category: 'Communication',
    concept: 'Email Etiquette',
    difficulty: 'BEGINNER',
    questionType: 'Scenario',
    question: 'What is the most effective subject line for a bug report email to an engineering team?',
    options: [
      { id: 'A', text: 'HELP!! EVERYTHING IS BROKEN!' },
      { id: 'B', text: '[Bug] Checkout API returning 500 error on Stripe payment step' },
      { id: 'C', text: 'Question about code' },
      { id: 'D', text: 'Important update' }
    ],
    correctAnswer: 'B',
    explanation: 'Clear subject lines specify component, severity tag, and precise failure description.'
  },
  {
    id: 'comm_b2',
    category: 'Communication',
    concept: 'Active Listening',
    difficulty: 'BEGINNER',
    questionType: 'Scenario',
    question: 'What action demonstrates active listening during technical requirement reviews?',
    options: [
      { id: 'A', text: 'Formulating your reply while the speaker is talking' },
      { id: 'B', text: 'Paraphrasing key points back to the speaker to confirm understanding' },
      { id: 'C', text: 'Checking phone notifications quietly' },
      { id: 'D', text: 'Nodding without taking notes' }
    ],
    correctAnswer: 'B',
    explanation: 'Active listening involves summarizing and confirming understanding to ensure zero communication gaps.'
  },
  {
    id: 'comm_b3',
    category: 'Communication',
    concept: 'Documentation',
    difficulty: 'BEGINNER',
    questionType: 'Technical',
    question: 'What makes a README.md file effective for open-source project contributors?',
    options: [
      { id: 'A', text: 'Having 50 pages of unformatted text' },
      { id: 'B', text: 'Providing clear installation instructions, usage examples, prerequisites, and contribution guidelines' },
      { id: 'C', text: 'Listing source code line by line' },
      { id: 'D', text: 'Leaving the file blank' }
    ],
    correctAnswer: 'B',
    explanation: 'Great technical documentation provides concise setup steps, runnable code snippets, and clear architectural overviews.'
  },
  {
    id: 'comm_b4',
    category: 'Communication',
    concept: 'Standup Updates',
    difficulty: 'BEGINNER',
    questionType: 'Scenario',
    question: 'What 3 questions form the standard structure of an Agile Daily Standup update?',
    options: [
      { id: 'A', text: 'What did I do yesterday? What will I do today? What blockers do I have?' },
      { id: 'B', text: 'What is my salary? Who is my boss? When is lunch?' },
      { id: 'C', text: 'What bugs exist? Who caused them? When will they fix it?' },
      { id: 'D', text: 'What is the project budget? What is the deadline? Who is hired?' }
    ],
    correctAnswer: 'A',
    explanation: 'Agile daily standups focus concisely on yesterday\'s accomplishments, today\'s commitments, and active blockers.'
  },
  {
    id: 'comm_b5',
    category: 'Communication',
    concept: 'Asynchronous Work',
    difficulty: 'BEGINNER',
    questionType: 'Scenario',
    question: 'When communicating across different timezones, what is a best practice?',
    options: [
      { id: 'A', text: 'Send single-word messages like "Hi" and wait for a reply' },
      { id: 'B', text: 'Provide complete context, code links, steps to reproduce, and clear calls to action in a single message' },
      { id: 'C', text: 'Schedule midnight meetings for teammates' },
      { id: 'D', text: 'Refuse to work with international teams' }
    ],
    correctAnswer: 'B',
    explanation: 'Asynchronous communication works best when messages are self-contained with full context to eliminate back-and-forth latency.'
  },
  {
    id: 'comm_i1',
    category: 'Communication',
    concept: 'Technical Demos',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'When presenting a technical demo to non-technical stakeholders, what should you emphasize?',
    options: [
      { id: 'A', text: 'Complex database schema queries and C++ pointer arithmetic' },
      { id: 'B', text: 'User experience impact, business value, and key functionality demonstrations' },
      { id: 'C', text: 'Compiler flags and build script optimization' },
      { id: 'D', text: 'Unresolved edge cases only' }
    ],
    correctAnswer: 'B',
    explanation: 'Tailor presentation language to your audience: focus on user value and high-level workflows for non-technical stakeholders.'
  },
  {
    id: 'comm_i2',
    category: 'Communication',
    concept: 'Pull Request Descriptions',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What elements should be included in a high-quality Pull Request (PR) description?',
    options: [
      { id: 'A', text: 'Just the title "Fixed bug"' },
      { id: 'B', text: 'Context of the change, issue ticket link, testing steps, and before/after screenshots' },
      { id: 'C', text: 'Full copy of commit log' },
      { id: 'D', text: 'A list of files changed' }
    ],
    correctAnswer: 'B',
    explanation: 'Informative PR descriptions accelerate code review by giving reviewers context, testing steps, and visual proof of correctness.'
  },
  {
    id: 'comm_i3',
    category: 'Communication',
    concept: 'API Documentation',
    difficulty: 'INTERMEDIATE',
    questionType: 'Technical',
    question: 'What specification standard is widely used to document RESTful APIs machine-readably?',
    options: [
      { id: 'A', text: 'OpenAPI (Swagger)' },
      { id: 'B', text: 'HTML5 Semantic Spec' },
      { id: 'C', text: 'UML Class Diagram' },
      { id: 'D', text: 'Markdown Tables only' }
    ],
    correctAnswer: 'A',
    explanation: 'OpenAPI (formerly Swagger) is the industry standard for declaring REST API endpoints, request schemas, and responses.'
  },
  {
    id: 'comm_i4',
    category: 'Communication',
    concept: 'Handling Criticism',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'During a architecture design review, a principal engineer identifies a scaling flaw in your proposal. How should you react?',
    options: [
      { id: 'A', text: 'Take it personally and become defensive' },
      { id: 'B', text: 'Thank them for pointing out the edge case, analyze their feedback objectively, and refine the design' },
      { id: 'C', text: 'Withdraw your proposal and resign from the team' },
      { id: 'D', text: 'Argue loudly without looking at data' }
    ],
    correctAnswer: 'B',
    explanation: 'Professional growth requires treating technical critique of work as constructive opportunity to improve system design.'
  },
  {
    id: 'comm_i5',
    category: 'Communication',
    concept: 'Incident Post-Mortems',
    difficulty: 'INTERMEDIATE',
    questionType: 'Scenario',
    question: 'What is the core philosophy of a "Blameless Post-Mortem"?',
    options: [
      { id: 'A', text: 'Identifying which engineer caused the outage to discipline them' },
      { id: 'B', text: 'Focusing on systemic process and tooling failures that allowed the outage to occur' },
      { id: 'C', text: 'Hiding incident details from customers' },
      { id: 'D', text: 'Fining the responsible team' }
    ],
    correctAnswer: 'B',
    explanation: 'Blameless post-mortems assume engineers act in good faith; they fix system flaws and safeguard processes to prevent recurring failures.'
  },
  {
    id: 'comm_a1',
    category: 'Communication',
    concept: 'RFC (Request for Comments)',
    difficulty: 'ADVANCED',
    questionType: 'Technical',
    question: 'What is the main objective of writing an RFC document in software teams?',
    options: [
      { id: 'A', text: 'To mandate top-down management orders' },
      { id: 'B', text: 'To propose major technical changes, gather peer feedback, evaluate alternatives, and achieve consensus before coding' },
      { id: 'C', text: 'To write end-user marketing blogs' },
      { id: 'D', text: 'To replace automated unit testing' }
    ],
    correctAnswer: 'B',
    explanation: 'RFCs (Request for Comments) facilitate asynchronous architectural alignment and debate before investing engineering effort.'
  },
  {
    id: 'comm_a2',
    category: 'Communication',
    concept: 'Executive Briefing',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'When presenting a project update to C-level executives, what framework ensures clarity?',
    options: [
      { id: 'A', text: 'BLUF (Bottom Line Up Front) — summarize core conclusions, status, and risks first' },
      { id: 'B', text: 'Chronological storytelling starting from 6 months ago' },
      { id: 'C', text: 'Line-by-line git diff analysis' },
      { id: 'D', text: 'Unstructured open Q&A without slides or data' }
    ],
    correctAnswer: 'A',
    explanation: 'BLUF (Bottom Line Up Front) leads with key conclusions, project health, and decisions required before diving into background.'
  },
  {
    id: 'comm_a3',
    category: 'Communication',
    concept: 'Negotiation & Trade-offs',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'Two senior architects are locked in a design stalemate over Microservices vs Monolith. How do you break the tie?',
    options: [
      { id: 'A', text: 'Flip a coin' },
      { id: 'B', text: 'Define objective evaluation criteria (latency, team size, deployment complexity, cost) and score options against real data' },
      { id: 'C', text: 'Choose the most trendy framework' },
      { id: 'D', text: 'Build both implementations in parallel' }
    ],
    correctAnswer: 'B',
    explanation: 'Technical stalemates are resolved by establishing weighted evaluation criteria aligned with business constraints.'
  },
  {
    id: 'comm_a4',
    category: 'Communication',
    concept: 'Crisis Communication',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'During a major security breach outage, what is the key rule for public status updates?',
    options: [
      { id: 'A', text: 'Deny everything until fix is complete' },
      { id: 'B', text: 'Provide regular, transparent updates acknowledging the issue, current mitigation steps, and next update time' },
      { id: 'C', text: 'Blame third-party cloud providers publicly' },
      { id: 'D', text: 'Delete status page' }
    ],
    correctAnswer: 'B',
    explanation: 'Crisis communication requires transparency, acknowledging impact, describing active mitigations, and setting expected update intervals.'
  },
  {
    id: 'comm_a5',
    category: 'Communication',
    concept: 'Knowledge Transfer',
    difficulty: 'ADVANCED',
    questionType: 'Scenario',
    question: 'A core system author is leaving the company in 2 weeks. How do you prevent knowledge loss?',
    options: [
      { id: 'A', text: 'Ask them to write as much documentation as possible on their last day' },
      { id: 'B', text: 'Pair program daily, record architecture walkthroughs, write runbooks, and verify team can deploy independently before departure' },
      { id: 'C', text: 'Offer to pay them as a consultant later' },
      { id: 'D', text: 'Rewrite their code from scratch' }
    ],
    correctAnswer: 'B',
    explanation: 'Effective offboarding transfers tacit knowledge through active pairing, runbook validation, and verified independent team execution.'
  }
];
