import { SubjectCurriculum } from './types';

export const dbmsCurriculum: SubjectCurriculum = {
  key: 'dbms',
  label: 'DBMS',
  roadmapTitle: 'Database Management Systems Track',
  roadmapDescription: 'Master relational algebra, SQL querying, normal forms (1NF-3NF/BCNF), B+ Tree indexes, ACID transactions, and query execution.',
  roadmapSteps: [
    { id: 'dbms-1', topicKey: 'db-fundamentals', title: 'Database Fundamentals', description: 'Relational data model, schemas, tuples, attributes, and key constraints.', order: 1, estimatedMinutes: 45 },
    { id: 'dbms-2', topicKey: 'sql-fundamentals', title: 'SQL Fundamentals', description: 'DDL/DML statements, SELECT queries, filtering, sorting, and aggregate functions.', order: 2, estimatedMinutes: 45 },
    { id: 'dbms-3', topicKey: 'joins-aggregations', title: 'Joins & Aggregations', description: 'INNER, LEFT, RIGHT, FULL OUTER joins, subqueries, and GROUP BY clauses.', order: 3, estimatedMinutes: 45 },
    { id: 'dbms-4', topicKey: 'normalization', title: 'Normalization', description: 'Functional dependencies, 1NF, 2NF, 3NF, and Boyce-Codd Normal Form (BCNF).', order: 4, estimatedMinutes: 45 },
    { id: 'dbms-5', topicKey: 'indexing', title: 'Indexing & Data Access', description: 'Clustered vs non-clustered indexes, B+ Tree node structures, and lookup efficiency.', order: 5, estimatedMinutes: 60 },
    { id: 'dbms-6', topicKey: 'transactions-acid', title: 'Transactions & ACID Properties', description: 'Atomicity, Consistency, Isolation levels, Durability, and write-ahead logging.', order: 6, estimatedMinutes: 60 },
    { id: 'dbms-7', topicKey: 'query-optimization', title: 'Query Optimization', description: 'Relational algebra execution plans, cost estimation, and index scanning.', order: 7, estimatedMinutes: 60 },
    { id: 'dbms-8', topicKey: 'db-design-scaling', title: 'Database Design & Scaling', description: 'ER modeling, read replicas, connection pooling, and horizontal sharding.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "Your current path is strengthening SQL and database fundamentals before moving into query optimization and database design.",
    nextStep: "Complete today's DBMS mission to master relational data modeling, indexing, and SQL queries."
  },
  diagnosticQuestions: [
    {
      id: 'dbms_dq1',
      subjectKey: 'dbms',
      conceptKey: 'db-fundamentals',
      concept: 'Primary Key Invariant',
      difficulty: 'BEGINNER',
      question: 'Which constraints MUST a Primary Key satisfy in a relational database table?',
      options: [
        { id: 'A', text: 'Must contain unique values and CANNOT be NULL' },
        { id: 'B', text: 'Must be unique but CAN contain NULL values' },
        { id: 'C', text: 'Must be an auto-incrementing integer only' },
        { id: 'D', text: 'Must be a foreign key in another table' }
      ],
      correctAnswer: 'A',
      explanation: 'Primary Keys uniquely identify tuples in a table and cannot contain NULL values.'
    },
    {
      id: 'dbms_dq2',
      subjectKey: 'dbms',
      conceptKey: 'sql-fundamentals',
      concept: 'SQL Querying',
      difficulty: 'BEGINNER',
      question: 'Which SQL keyword is used to eliminate duplicate rows from query results?',
      options: [
        { id: 'A', text: 'DISTINCT' },
        { id: 'B', text: 'UNIQUE' },
        { id: 'C', text: 'GROUP BY' },
        { id: 'D', text: 'FILTER' }
      ],
      correctAnswer: 'A',
      explanation: 'SELECT DISTINCT filters duplicate tuple rows from returned result sets.'
    },
    {
      id: 'dbms_dq3',
      subjectKey: 'dbms',
      conceptKey: 'joins-aggregations',
      concept: 'SQL Joins',
      difficulty: 'INTERMEDIATE',
      question: 'Which JOIN returns all rows from the left table and matching rows from the right table, filling unmatched right columns with NULL?',
      options: [
        { id: 'A', text: 'LEFT JOIN (LEFT OUTER JOIN)' },
        { id: 'B', text: 'INNER JOIN' },
        { id: 'C', text: 'RIGHT JOIN' },
        { id: 'D', text: 'CROSS JOIN' }
      ],
      correctAnswer: 'A',
      explanation: 'LEFT JOIN preserves all rows from the left table regardless of right table matches.'
    },
    {
      id: 'dbms_dq4',
      subjectKey: 'dbms',
      conceptKey: 'normalization',
      concept: 'Database Normalization',
      difficulty: 'INTERMEDIATE',
      question: 'What requirement defines Third Normal Form (3NF)?',
      options: [
        { id: 'A', text: 'Table is in 2NF and contains NO transitive functional dependencies' },
        { id: 'B', text: 'Table contains atomic values only' },
        { id: 'C', text: 'Table contains no partial key dependencies' },
        { id: 'D', text: 'Every column is an integer' }
      ],
      correctAnswer: 'A',
      explanation: '3NF requires 2NF status and ensures non-prime attributes do not depend on other non-prime attributes (no transitive dependencies).'
    },
    {
      id: 'dbms_dq5',
      subjectKey: 'dbms',
      conceptKey: 'indexing',
      concept: 'B+ Tree Indexing',
      difficulty: 'INTERMEDIATE',
      question: 'Why are B+ Trees widely used for relational database indexes instead of standard Binary Search Trees?',
      options: [
        { id: 'A', text: 'Leaf nodes contain all data pointers linked sequentially, optimizing range queries and block reads' },
        { id: 'B', text: 'B+ Trees consume less RAM than hash maps' },
        { id: 'C', text: 'B+ Trees avoid binary branching' },
        { id: 'D', text: 'B+ Trees disable lock overhead' }
      ],
      correctAnswer: 'A',
      explanation: 'B+ Trees store data pointers exclusively in linked leaf nodes, enabling fast range scans and disk block reads.'
    },
    {
      id: 'dbms_dq6',
      subjectKey: 'dbms',
      conceptKey: 'transactions-acid',
      concept: 'ACID Durability',
      difficulty: 'INTERMEDIATE',
      question: 'Which ACID property guarantees committed transactions persist even during power failures?',
      options: [
        { id: 'A', text: 'Durability' },
        { id: 'B', text: 'Atomicity' },
        { id: 'C', text: 'Consistency' },
        { id: 'D', text: 'Isolation' }
      ],
      correctAnswer: 'A',
      explanation: 'Durability logs committed modifications to non-volatile storage before confirming transactions.'
    },
    {
      id: 'dbms_dq7',
      subjectKey: 'dbms',
      conceptKey: 'transactions-acid',
      concept: 'Transaction Isolation',
      difficulty: 'ADVANCED',
      question: 'What anomaly occurs when Transaction A reads uncommitted data modified by concurrent Transaction B?',
      options: [
        { id: 'A', text: 'Dirty Read' },
        { id: 'B', text: 'Non-Repeatable Read' },
        { id: 'C', text: 'Phantom Read' },
        { id: 'D', text: 'Lost Update' }
      ],
      correctAnswer: 'A',
      explanation: 'A Dirty Read happens when uncommitted data modified by one transaction is read by another.'
    },
    {
      id: 'dbms_dq8',
      subjectKey: 'dbms',
      conceptKey: 'normalization',
      concept: 'BCNF',
      difficulty: 'ADVANCED',
      question: 'What condition does Boyce-Codd Normal Form (BCNF) strictly enforce for every functional dependency X -> Y?',
      options: [
        { id: 'A', text: 'X must be a Super Key' },
        { id: 'B', text: 'Y must be a primary key' },
        { id: 'C', text: 'X must be a single column' },
        { id: 'D', text: 'Y must be a candidate key' }
      ],
      correctAnswer: 'A',
      explanation: 'BCNF strictly requires that the determinant X in any non-trivial dependency X -> Y is a super key.'
    }
  ],
  missions: [
    {
      id: 'dbms-m1',
      topicKey: 'db-fundamentals',
      title: 'Database Fundamentals — Tables, Rows & Keys',
      description: 'Understand tuples, attributes, candidate keys, and relational schemas.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Relational Database Data Model',
        content: 'Relational databases organize data into tables (relations). Rows represent tuples; columns represent attributes bounded by domain types.',
        interactiveExample: {
          language: 'sql',
          code: 'CREATE TABLE users (\n  id UUID PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL\n);',
          explanation: 'PRIMARY KEY enforces unique identification and non-null constraints.'
        }
      },
      practice: {
        question: 'What constraint MUST a Primary Key satisfy?',
        options: [
          { id: 'A', text: 'Unique and NOT NULL' },
          { id: 'B', text: 'Unique and Nullable' },
          { id: 'C', text: 'Foreign key constraint' },
          { id: 'D', text: 'Auto-incrementing integer only' }
        ],
        correctAnswerId: 'A',
        explanation: 'Primary keys uniquely identify rows and cannot contain NULL values.'
      },
      review: {
        title: 'DBMS Fundamentals Review',
        pitfalls: ['Omitting foreign key constraints allowing orphan records in child tables'],
        edgeCases: ['Composite primary keys containing multiple column combinations'],
        keyTakeaway: 'Enforce referential integrity at the database schema level.'
      },
      interview: {
        title: 'Technical Viva: Candidate Key vs Primary Key',
        question: 'What is the difference between a Candidate Key and a Primary Key?',
        hint: 'Minimal set of attributes uniquely identifying a tuple.',
        keyPoints: ['Candidate keys are all minimal super keys capable of identifying tuples', 'Primary Key is the specific candidate key selected by database designers']
      }
    },
    {
      id: 'dbms-m2',
      topicKey: 'sql-fundamentals',
      title: 'SQL — SELECT, WHERE & ORDER BY',
      description: 'Master basic DML querying, filtering predicates, and sorting.',
      estimatedMinutes: 45,
      lesson: {
        title: 'SQL DML Querying Mechanics',
        content: 'SQL queries retrieve rows using `SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT`.',
        interactiveExample: {
          language: 'sql',
          code: 'SELECT name, price FROM products WHERE category = "Electronics" ORDER BY price DESC;',
          explanation: 'WHERE filters rows before sorting and output formatting.'
        }
      },
      practice: {
        question: 'Which SQL keyword removes duplicate rows from result outputs?',
        options: [
          { id: 'A', text: 'DISTINCT' },
          { id: 'B', text: 'UNIQUE' },
          { id: 'C', text: 'GROUP BY' },
          { id: 'D', text: 'FILTER' }
        ],
        correctAnswerId: 'A',
        explanation: 'SELECT DISTINCT suppresses duplicate output rows.'
      },
      review: {
        title: 'SQL Fundamentals Review',
        pitfalls: ['Using `SELECT *` in production code instead of specifying explicit column names'],
        edgeCases: ['NULL comparisons using `=` instead of `IS NULL` / `IS NOT NULL`'],
        keyTakeaway: 'Always evaluate NULL predicates using `IS NULL` or `IS NOT NULL`.'
      },
      interview: {
        title: 'Technical Viva: SQL NULL Semantics',
        question: 'Why does `SELECT * FROM table WHERE col = NULL` return 0 rows in SQL?',
        hint: 'Three-valued logic (TRUE, FALSE, UNKNOWN).',
        keyPoints: ['Comparisons with NULL evaluate to UNKNOWN, not TRUE', 'Must explicitly use `IS NULL` predicate']
      }
    },
    {
      id: 'dbms-m3',
      topicKey: 'joins-aggregations',
      title: 'SQL — Joins & Aggregation',
      description: 'Master relational join types, GROUP BY aggregations, and subqueries.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Relational Joins and Grouping',
        content: 'Joins correlate tuples across tables using candidate key relationships. `GROUP BY` computes aggregates per group.',
        interactiveExample: {
          language: 'sql',
          code: 'SELECT c.name, COUNT(o.id) FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id;',
          explanation: 'LEFT JOIN keeps customers even if they have 0 orders.'
        }
      },
      practice: {
        question: 'Which join returns matching rows from both tables, dropping unmatched entries?',
        options: [
          { id: 'A', text: 'INNER JOIN' },
          { id: 'B', text: 'LEFT JOIN' },
          { id: 'C', text: 'FULL OUTER JOIN' },
          { id: 'D', text: 'CROSS JOIN' }
        ],
        correctAnswerId: 'A',
        explanation: 'INNER JOIN returns only rows meeting join predicates in both tables.'
      },
      review: {
        title: 'SQL Joins Review',
        pitfalls: ['Accidental Cartesian products caused by missing ON join predicates'],
        edgeCases: ['Filtering outer-joined columns in WHERE clause converting LEFT JOIN to INNER JOIN'],
        keyTakeaway: 'Place outer join filtering predicates inside the ON clause.'
      },
      interview: {
        title: 'Technical Viva: INNER vs LEFT JOIN',
        question: 'Explain the practical difference between INNER JOIN and LEFT JOIN.',
        hint: 'Preserving unmatched rows from left table.',
        keyPoints: ['INNER JOIN returns intersection of matching rows', 'LEFT JOIN returns all left rows, placing NULL for unmatched right columns']
      }
    },
    {
      id: 'dbms-m4',
      topicKey: 'normalization',
      title: 'Normalization — 1NF, 2NF & 3NF',
      description: 'Master functional dependencies, anomaly elimination, and normal forms.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Database Normalization Forms',
        content: 'Normalization eliminates data redundancy and update/insert/delete anomalies by splitting tables along functional dependencies.',
        interactiveExample: {
          language: 'text',
          code: '1NF: Atomic values -> 2NF: No partial key dependencies -> 3NF: No transitive dependencies',
          explanation: 'Progressively eliminates redundant duplicate columns.'
        }
      },
      practice: {
        question: 'What condition characterizes Third Normal Form (3NF)?',
        options: [
          { id: 'A', text: 'In 2NF and contains no transitive dependencies' },
          { id: 'B', text: 'Contains atomic column values only' },
          { id: 'C', text: 'Every column is a primary key' },
          { id: 'D', text: 'No null values allowed' }
        ],
        correctAnswerId: 'A',
        explanation: '3NF eliminates transitive dependencies between non-prime attributes.'
      },
      review: {
        title: 'Normalization Review',
        pitfalls: ['Over-normalizing read-heavy systems causing expensive multi-table join queries'],
        edgeCases: ['Intentional denormalization for data warehouse reporting performance'],
        keyTakeaway: 'Normalize schemas to 3NF for OLTP; denormalize selectively for OLAP.'
      },
      interview: {
        title: 'Technical Viva: Functional Dependency',
        question: 'What is a Functional Dependency X -> Y in relational database theory?',
        hint: 'Determinant X uniquely determines dependent Y value.',
        keyPoints: ['If two tuples agree on attribute X, they must agree on attribute Y', 'Underpins 2NF, 3NF, and BCNF definitions']
      }
    },
    {
      id: 'dbms-m5',
      topicKey: 'indexing',
      title: 'Indexes — Faster Data Retrieval',
      description: 'Master B+ Tree index lookup, clustered indexes, and composite keys.',
      estimatedMinutes: 60,
      lesson: {
        title: 'B+ Tree Database Indexing',
        content: 'Indexes create balanced search trees on indexed columns, converting O(N) full table scans into O(log N) tree lookups.',
        interactiveExample: {
          language: 'sql',
          code: 'CREATE INDEX idx_users_email ON users(email);',
          explanation: 'B+ Tree index accelerates exact and range searches on email.'
        }
      },
      practice: {
        question: 'Why do B+ Tree leaf nodes link sequentially to each other?',
        options: [
          { id: 'A', text: 'To perform fast, efficient sequential range scans' },
          { id: 'B', text: 'To encrypt data blocks' },
          { id: 'C', text: 'To disable table locks' },
          { id: 'D', text: 'To compress text values' }
        ],
        correctAnswerId: 'A',
        explanation: 'Sequential leaf links allow range queries to traverse adjacent nodes without re-seeking root.'
      },
      review: {
        title: 'Indexing Review',
        pitfalls: ['Adding indexes to high-frequency write columns slowing down INSERT/UPDATE statements'],
        edgeCases: ['Index suppression caused by applying functions on indexed columns in WHERE clauses'],
        keyTakeaway: 'Index columns used frequently in JOIN, WHERE, and ORDER BY clauses.'
      },
      interview: {
        title: 'Technical Viva: Clustered vs Non-Clustered Index',
        question: 'Compare a Clustered Index with a Non-Clustered Index.',
        hint: 'Physical data row ordering on disk.',
        keyPoints: ['Clustered Index determines physical row storage order on disk (1 per table)', 'Non-Clustered Index creates separate lookup structure with pointers to table rows']
      }
    },
    {
      id: 'dbms-m6',
      topicKey: 'transactions-acid',
      title: 'ACID — Reliable Database Operations',
      description: 'Master Atomicity, Consistency, Isolation levels, and Durability.',
      estimatedMinutes: 60,
      lesson: {
        title: 'ACID Properties and Transaction Logs',
        content: 'Transactions group SQL commands into atomic units. Write-Ahead Logging (WAL) ensures durability.',
        interactiveExample: {
          language: 'sql',
          code: 'BEGIN TRANSACTION;\nUPDATE account SET bal = bal - 100 WHERE id = 1;\nUPDATE account SET bal = bal + 100 WHERE id = 2;\nCOMMIT;',
          explanation: 'Atomicity guarantees either both updates succeed or both roll back.'
        }
      },
      practice: {
        question: 'Which ACID property guarantees all operations in a transaction succeed or all roll back?',
        options: [
          { id: 'A', text: 'Atomicity' },
          { id: 'B', text: 'Consistency' },
          { id: 'C', text: 'Isolation' },
          { id: 'D', text: 'Durability' }
        ],
        correctAnswerId: 'A',
        explanation: 'Atomicity enforces all-or-nothing execution.'
      },
      review: {
        title: 'Transactions Review',
        pitfalls: ['Long-running transactions holding locks and blocking concurrent database queries'],
        edgeCases: ['Deadlocks between concurrent transactions acquiring locks in reverse order'],
        keyTakeaway: 'Keep transactions short and acquire locks in consistent global order.'
      },
      interview: {
        title: 'Technical Viva: Isolation Levels',
        question: 'What are the 4 standard SQL Transaction Isolation Levels?',
        hint: 'Read Uncommitted, Read Committed, Repeatable Read, Serializable.',
        keyPoints: ['Read Uncommitted (Dirty Reads possible)', 'Read Committed (Prevents Dirty Reads)', 'Repeatable Read (Prevents Non-Repeatable Reads)', 'Serializable (Strict serial order)']
      }
    },
    {
      id: 'dbms-m7',
      topicKey: 'query-optimization',
      title: 'Query Optimization — Understanding Execution',
      description: 'Master EXPLAIN execution plans, cost estimators, and index scans.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Database Query Optimization',
        content: 'The query optimizer converts SQL into relational algebra trees and evaluates candidate execution plans.',
        interactiveExample: {
          language: 'sql',
          code: 'EXPLAIN ANALYZE SELECT * FROM users WHERE status = "ACTIVE";',
          explanation: 'EXPLAIN ANALYZE outputs actual execution time and scan types.'
        }
      },
      practice: {
        question: 'What indicates a query is performing an inefficient full disk scan?',
        options: [
          { id: 'A', text: 'Seq Scan (Sequential Table Scan)' },
          { id: 'B', text: 'Index Scan' },
          { id: 'C', text: 'Index Only Scan' },
          { id: 'D', text: 'Bitmap Index Scan' }
        ],
        correctAnswerId: 'A',
        explanation: 'Sequential Scan reads every page block of a table from disk sequentially.'
      },
      review: {
        title: 'Query Optimization Review',
        pitfalls: ['Stale query planner table statistics causing wrong index selection (run ANALYZE)'],
        edgeCases: ['Implicit type conversions disabling index usage'],
        keyTakeaway: 'Use EXPLAIN ANALYZE to identify slow sequential scans.'
      },
      interview: {
        title: 'Technical Viva: Query Optimization',
        question: 'Why does `SELECT * FROM table WHERE YEAR(created_at) = 2024` fail to use an index on `created_at`?',
        hint: 'Function evaluation on indexed columns.',
        keyPoints: ['Evaluating functions on columns prevents direct index key lookup', 'Rewrite query using range bounds `created_at >= "2024-01-01" AND created_at < "2025-01-01"`']
      }
    },
    {
      id: 'dbms-m8',
      topicKey: 'db-design-scaling',
      title: 'Database Design — Modeling Real Applications',
      description: 'Master ER diagrams, read replicas, connection pools, and sharding.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Scaling Database Systems',
        content: 'High-throughput systems scale read traffic via Read Replicas and scale write throughput via horizontal Sharding.',
        interactiveExample: {
          language: 'text',
          code: 'Primary DB (Writes) -> Replication Lag -> Read Replicas (Reads)',
          explanation: 'Read replicas offload SELECT queries from primary DB instance.'
        }
      },
      practice: {
        question: 'What is Database Sharding?',
        options: [
          { id: 'A', text: 'Horizontally partitioning table rows across multiple independent database servers' },
          { id: 'B', text: 'Creating read-only database copies' },
          { id: 'C', text: 'Compressing database tables' },
          { id: 'D', text: 'Exporting SQL backups' }
        ],
        correctAnswerId: 'A',
        explanation: 'Sharding distributes table rows horizontally across distinct database nodes.'
      },
      review: {
        title: 'Database Architecture Review',
        pitfalls: ['Connection exhaustion caused by missing connection pools in application backends'],
        edgeCases: ['Replication lag causing stale read anomalies on read replicas'],
        keyTakeaway: 'Use connection poolers like PgBouncer and route critical reads to primary node.'
      },
      interview: {
        title: 'Technical Viva: CAP Theorem',
        question: 'Explain the CAP Theorem for distributed databases.',
        hint: 'Consistency, Availability, Partition Tolerance.',
        keyPoints: ['A distributed system can guarantee at most 2 of 3: Consistency, Availability, Partition Tolerance', 'In network partitions, systems choose between CP (Consistency) or AP (Availability)']
      }
    }
  ]
};
