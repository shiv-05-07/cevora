import { SubjectCurriculum } from './types';

export const operatingSystemsCurriculum: SubjectCurriculum = {
  key: 'operating-systems',
  label: 'Operating Systems',
  roadmapTitle: 'Core Operating Systems Track',
  roadmapDescription: 'Master OS architecture, process states, thread concurrency, CPU scheduling algorithms, memory management, virtual paging, and file systems.',
  roadmapSteps: [
    { id: 'os-1', topicKey: 'os-fundamentals', title: 'OS Fundamentals', description: 'Dual-mode execution, kernel vs user space, and system calls.', order: 1, estimatedMinutes: 45 },
    { id: 'os-2', topicKey: 'processes-threads', title: 'Processes & Threads', description: 'Process Control Blocks (PCB), context switching, thread memory sharing, and POSIX threads.', order: 2, estimatedMinutes: 45 },
    { id: 'os-3', topicKey: 'cpu-scheduling', title: 'CPU Scheduling', description: 'FCFS, Shortest Job First, Round Robin, Multi-level Feedback Queues, and CFS scheduler.', order: 3, estimatedMinutes: 45 },
    { id: 'os-4', topicKey: 'synchronization', title: 'Process Synchronization', description: 'Critical section problem, mutexes, counting semaphores, and race conditions.', order: 4, estimatedMinutes: 45 },
    { id: 'os-5', topicKey: 'deadlocks', title: 'Deadlocks', description: 'Coffman conditions, resource allocation graphs, Banker algorithm, and prevention.', order: 5, estimatedMinutes: 60 },
    { id: 'os-6', topicKey: 'memory-management', title: 'Memory Management', description: 'Contiguous allocation, segmentation, paging, page table entries, and TLB caches.', order: 6, estimatedMinutes: 60 },
    { id: 'os-7', topicKey: 'virtual-memory', title: 'Virtual Memory & Page Faults', description: 'Demand paging, page fault handling cycle, and replacement algorithms (FIFO, LRU, Clock).', order: 7, estimatedMinutes: 60 },
    { id: 'os-8', topicKey: 'file-systems', title: 'File Systems & I/O', description: 'Inodes, directory structures, hard/soft links, journaling, and disk I/O scheduling.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "Your current path is building systems-level mastery across kernel architecture, memory management, and process concurrency.",
    nextStep: "Complete today's Operating Systems mission to master process context switching, virtual memory, and OS primitives."
  },
  diagnosticQuestions: [
    {
      id: 'os_dq1',
      subjectKey: 'operating-systems',
      conceptKey: 'os-fundamentals',
      concept: 'Dual Mode Execution',
      difficulty: 'BEGINNER',
      question: 'What hardware feature prevents user applications from executing privileged kernel instructions directly?',
      options: [
        { id: 'A', text: 'Dual-Mode CPU execution (User Mode vs Kernel Mode via mode bits)' },
        { id: 'B', text: 'Virtual machine hypervisors' },
        { id: 'C', text: 'Network firewalls' },
        { id: 'D', text: 'Compiler optimization flags' }
      ],
      correctAnswer: 'A',
      explanation: 'Dual-mode execution uses hardware mode bits to trap privileged instructions when attempted in User mode.'
    },
    {
      id: 'os_dq2',
      subjectKey: 'operating-systems',
      conceptKey: 'processes-threads',
      concept: 'Process Control Block',
      difficulty: 'BEGINNER',
      question: 'Which component stores a process\'s hardware context, program counter, and state during context switching?',
      options: [
        { id: 'A', text: 'Process Control Block (PCB)' },
        { id: 'B', text: 'Translation Lookaside Buffer (TLB)' },
        { id: 'C', text: 'Inode Table' },
        { id: 'D', text: 'Directory Cache' }
      ],
      correctAnswer: 'A',
      explanation: 'The kernel maintains a PCB for each process storing PID, registers, stack pointer, and state.'
    },
    {
      id: 'os_dq3',
      subjectKey: 'operating-systems',
      conceptKey: 'cpu-scheduling',
      concept: 'Round Robin Scheduling',
      difficulty: 'INTERMEDIATE',
      question: 'In Round Robin CPU scheduling, what happens if the time quantum slice is set extremely large?',
      options: [
        { id: 'A', text: 'Degrades to First-Come First-Served (FCFS) scheduling' },
        { id: 'B', text: 'Causes immediate deadlock' },
        { id: 'C', text: 'Increases context switch overhead to infinity' },
        { id: 'D', text: 'Converts to Shortest Remaining Time First' }
      ],
      correctAnswer: 'A',
      explanation: 'If time quantum > maximum process burst time, processes complete without preemption, mimicking FCFS.'
    },
    {
      id: 'os_dq4',
      subjectKey: 'operating-systems',
      conceptKey: 'synchronization',
      concept: 'Mutex vs Semaphore',
      difficulty: 'INTERMEDIATE',
      question: 'What is the key functional difference between a Mutex and a Counting Semaphore?',
      options: [
        { id: 'A', text: 'A Mutex has ownership (only the acquiring thread can unlock it); a Semaphore is a signaling mechanism without ownership' },
        { id: 'B', text: 'Mutexes run in user space only' },
        { id: 'C', text: 'Semaphores cannot be used for multi-threaded code' },
        { id: 'D', text: 'Mutexes support negative integer counts' }
      ],
      correctAnswer: 'A',
      explanation: 'Mutexes enforce strict locking ownership by the acquiring thread; semaphores signal integer permit availability.'
    },
    {
      id: 'os_dq5',
      subjectKey: 'operating-systems',
      conceptKey: 'deadlocks',
      concept: 'Coffman Conditions',
      difficulty: 'INTERMEDIATE',
      question: 'How can deadlocks be prevented by invalidating the Circular Wait Coffman condition?',
      options: [
        { id: 'A', text: 'Enforce a global total ordering on all resource requests' },
        { id: 'B', text: 'Allow non-preemptible resource allocation' },
        { id: 'C', text: 'Allow unbounded process creation' },
        { id: 'D', text: 'Run CPU scheduling without priorities' }
      ],
      correctAnswer: 'A',
      explanation: 'Hierarchical resource ordering guarantees resource allocation graphs remain acyclic, preventing circular wait.'
    },
    {
      id: 'os_dq6',
      subjectKey: 'operating-systems',
      conceptKey: 'virtual-memory',
      concept: 'Page Fault Mechanics',
      difficulty: 'INTERMEDIATE',
      question: 'What triggers a Page Fault in a demand-paged virtual memory system?',
      options: [
        { id: 'A', text: 'Referencing a virtual page whose valid/present bit is set to 0 in the Page Table' },
        { id: 'B', text: 'Executing a division by zero' },
        { id: 'C', text: 'Running out of disk space' },
        { id: 'D', text: 'Exceeding CPU time quantum' }
      ],
      correctAnswer: 'A',
      explanation: 'When the MMU encounters a page table entry with valid bit 0, it raises a Page Fault trap to load the page from disk.'
    },
    {
      id: 'os_dq7',
      subjectKey: 'operating-systems',
      conceptKey: 'virtual-memory',
      concept: 'Page Replacement Anomalies',
      difficulty: 'ADVANCED',
      question: 'What is Belady\'s Anomaly in page replacement algorithms?',
      options: [
        { id: 'A', text: 'In FIFO replacement, increasing available physical page frames can paradoxically increase total page faults' },
        { id: 'B', text: 'LRU page replacement causes infinite loops' },
        { id: 'C', text: 'TLB miss rate reaches 100%' },
        { id: 'D', text: 'Process stacks collide with heap memory' }
      ],
      correctAnswer: 'A',
      explanation: 'Belady\'s Anomaly proves FIFO is not a stack algorithm, causing higher fault counts for certain access patterns when frames increase.'
    },
    {
      id: 'os_dq8',
      subjectKey: 'operating-systems',
      conceptKey: 'file-systems',
      concept: 'Unix Inodes',
      difficulty: 'ADVANCED',
      question: 'What information is stored inside a Unix Inode?',
      options: [
        { id: 'A', text: 'File metadata (size, permissions, timestamps) and direct/indirect block pointers, but NOT the file name' },
        { id: 'B', text: 'File name and file content string' },
        { id: 'C', text: 'User password hash' },
        { id: 'D', text: 'Process control state' }
      ],
      correctAnswer: 'A',
      explanation: 'Inodes store all file metadata and block addresses. Filenames are stored separately in directory entry maps.'
    }
  ],
  missions: [
    {
      id: 'os-m1',
      topicKey: 'os-fundamentals',
      title: 'Operating Systems — OS Fundamentals & System Calls',
      description: 'Understand dual-mode execution, system calls, and kernel traps.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Kernel vs User Mode Execution',
        content: 'The OS isolates hardware via User/Kernel mode bits. User apps execute system calls (traps) to request OS services.',
        interactiveExample: {
          language: 'c',
          code: '#include <unistd.h>\nwrite(1, "System Call\\n", 12);',
          explanation: 'write() traps to kernel mode to perform disk/terminal I/O.'
        }
      },
      practice: {
        question: 'How does a user process request kernel hardware services?',
        options: [
          { id: 'A', text: 'System Call (Trap)' },
          { id: 'B', text: 'Direct CPU register write' },
          { id: 'C', text: 'Global variable mutation' },
          { id: 'D', text: 'Compiler directive' }
        ],
        correctAnswerId: 'A',
        explanation: 'System calls generate CPU software traps to elevate execution privileges to Kernel mode.'
      },
      review: {
        title: 'OS Fundamentals Review',
        pitfalls: ['Attempting privileged hardware I/O directly in user space causing segmentation faults'],
        edgeCases: ['Nested interrupt traps overloading kernel interrupt vectors'],
        keyTakeaway: 'All hardware access must pass through validated kernel system call interfaces.'
      },
      interview: {
        title: 'Technical Viva: Context Switching Overhead',
        question: 'What occurs during a process context switch?',
        hint: 'Saving PCB context, switching page tables (CR3), invalidating TLB.',
        keyPoints: ['Save hardware state to current PCB', 'Update process state', 'Switch page tables & reload target registers']
      }
    },
    {
      id: 'os-m2',
      topicKey: 'processes-threads',
      title: 'Processes — Lifecycle & Context Switching',
      description: 'Master process creation with `fork()`, exec, zombie processes, and threads.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Process Creation and POSIX Threads',
        content: '`fork()` duplicates a process. Threads within a process share heap/code sections but keep private stacks.',
        interactiveExample: {
          language: 'c',
          code: 'pid_t pid = fork();\nif (pid == 0) { /* Child process */ }',
          explanation: 'fork() returns 0 in child process and child PID in parent.'
        }
      },
      practice: {
        question: 'If a parent process does not call `wait()` after a child terminates, what state does the child enter?',
        options: [
          { id: 'A', text: 'Zombie process' },
          { id: 'B', text: 'Orphan process' },
          { id: 'C', text: 'Running process' },
          { id: 'D', text: 'Daemon process' }
        ],
        correctAnswerId: 'A',
        explanation: 'Terminated children remain in the process table as Zombies until reaped by parent `wait()` calls.'
      },
      review: {
        title: 'Process Management Review',
        pitfalls: ['Fork bombs: uncontrolled recursive fork calls exhausting kernel process table IDs'],
        edgeCases: ['Parent process terminating before child (orphan reparented to init PID 1)'],
        keyTakeaway: 'Always reap child processes using `wait()` or `waitpid()`.'
      },
      interview: {
        title: 'Technical Viva: Process vs Thread Context Switch',
        question: 'Why is thread context switching faster than process context switching?',
        hint: 'Page table switching and TLB invalidation.',
        keyPoints: ['Threads share identical virtual address spaces and page tables', 'Avoids clearing and reloading TLB entries']
      }
    },
    {
      id: 'os-m3',
      topicKey: 'cpu-scheduling',
      title: 'CPU Scheduling — FCFS, SJF & Round Robin',
      description: 'Master scheduling algorithms, Gantt charts, and preemption.',
      estimatedMinutes: 45,
      lesson: {
        title: 'CPU Scheduler Algorithms',
        content: 'Schedulers optimize CPU utilization, throughput, and response times using FCFS, SJF, or Round Robin time slicing.',
        interactiveExample: {
          language: 'text',
          code: 'Processes P1(10ms), P2(3ms), P3(3ms)\nRound Robin quantum = 4ms: [P1, P2, P3, P1, P1]',
          explanation: 'Round Robin prevents long processes from monopolizing CPU.'
        }
      },
      practice: {
        question: 'Which scheduling algorithm guarantees minimum average waiting time for a given set of processes?',
        options: [
          { id: 'A', text: 'Shortest Job First (SJF)' },
          { id: 'B', text: 'First-Come First-Served (FCFS)' },
          { id: 'C', text: 'Round Robin' },
          { id: 'D', text: 'Priority Scheduling' }
        ],
        correctAnswerId: 'A',
        explanation: 'SJF is provably optimal for minimizing average process waiting time.'
      },
      review: {
        title: 'CPU Scheduling Review',
        pitfalls: ['Starvation: long processes preventing short jobs from running in non-preemptive SJF'],
        edgeCases: ['Convoys in FCFS when a single CPU-bound process blocks multiple I/O bound jobs'],
        keyTakeaway: 'Use aging protocols to prevent process starvation in priority schedulers.'
      },
      interview: {
        title: 'Technical Viva: Completely Fair Scheduler (CFS)',
        question: 'How does the Linux Completely Fair Scheduler (CFS) allocate CPU time?',
        hint: 'Red-Black tree tracking virtual runtime (vruntime).',
        keyPoints: ['Tracks task execution in virtual runtime (vruntime)', 'Selects task with smallest vruntime using Red-Black tree']
      }
    },
    {
      id: 'os-m4',
      topicKey: 'synchronization',
      title: 'Synchronization — Locks & Race Conditions',
      description: 'Master critical sections, Peterson solution, mutexes, and semaphores.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Critical Sections & Mutex Primitives',
        content: 'Race conditions occur when concurrent execution on shared data yields non-deterministic results. Mutexes enforce mutual exclusion.',
        interactiveExample: {
          language: 'c',
          code: 'pthread_mutex_lock(&lock);\ncounter++;\npthread_mutex_unlock(&lock);',
          explanation: 'Mutex locks ensure only 1 thread executes inside critical section.'
        }
      },
      practice: {
        question: 'Which condition requires that only one thread can execute in its critical section at any instant?',
        options: [
          { id: 'A', text: 'Mutual Exclusion' },
          { id: 'B', text: 'Progress' },
          { id: 'C', text: 'Bounded Waiting' },
          { id: 'D', text: 'Starvation' }
        ],
        correctAnswerId: 'A',
        explanation: 'Mutual exclusion prevents multiple threads from concurrently modifying shared data.'
      },
      review: {
        title: 'Synchronization Review',
        pitfalls: ['Priority Inversion: high priority thread waiting for lock held by low priority thread'],
        edgeCases: ['Spurious wakeups in condition variables'],
        keyTakeaway: 'Always evaluate condition variables inside `while` loops, not `if` statements.'
      },
      interview: {
        title: 'Technical Viva: Priority Inheritance',
        question: 'How does Priority Inheritance solve Priority Inversion?',
        hint: 'Temporarily boosting low-priority thread priority to match waiting high-priority thread.',
        keyPoints: ['Low priority thread holding lock inherits priority of highest waiting thread', 'Allows low priority thread to finish critical section quickly']
      }
    },
    {
      id: 'os-m5',
      topicKey: 'deadlocks',
      title: 'Deadlocks — Conditions & Prevention',
      description: 'Master Coffman deadlock conditions, Banker algorithm, and resource ordering.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Deadlock Detection & Prevention',
        content: 'Deadlock requires 4 conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Eliminating 1 condition prevents deadlock.',
        interactiveExample: {
          language: 'text',
          code: 'Process A holds Lock 1, wants Lock 2.\nProcess B holds Lock 2, wants Lock 1.',
          explanation: 'Circular wait creates unresolvable deadlock state.'
        }
      },
      practice: {
        question: 'How many Coffman conditions must hold simultaneously for a deadlock to occur?',
        options: [
          { id: 'A', text: 'All 4 conditions' },
          { id: 'B', text: 'At least 1 condition' },
          { id: 'C', text: 'Exactly 2 conditions' },
          { id: 'D', text: '3 conditions' }
        ],
        correctAnswerId: 'A',
        explanation: 'Deadlock requires all 4 Coffman conditions to hold concurrently.'
      },
      review: {
        title: 'Deadlocks Review',
        pitfalls: ['Acquiring multiple locks in inconsistent orders across different code files'],
        edgeCases: ['Resource starvation misdiagnosed as deadlock'],
        keyTakeaway: 'Enforce strict global resource lock ordering across all threads.'
      },
      interview: {
        title: 'Technical Viva: Banker\'s Algorithm',
        question: 'What is the purpose of the Banker\'s Algorithm in OS resource allocation?',
        hint: 'Deadlock avoidance by testing safe states before allocation.',
        keyPoints: ['Simulates resource allocation to verify system remains in safe state', 'Rejects requests that lead to unsafe states']
      }
    },
    {
      id: 'os-m6',
      topicKey: 'memory-management',
      title: 'Memory Management — Allocation & Address Spaces',
      description: 'Master base/limit registers, paging, page tables, and TLB caches.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Paging and Memory Translation',
        content: 'Physical memory is divided into fixed-size frames; virtual memory into pages. Page tables translate virtual addresses to physical frame numbers.',
        interactiveExample: {
          language: 'text',
          code: 'Virtual Address = [Page Number (VPN) | Offset]\nMMU checks TLB -> Page Table -> Physical Frame',
          explanation: 'Page tables decouple virtual address spaces from physical RAM.'
        }
      },
      practice: {
        question: 'What cache component accelerates virtual-to-physical address translation in MMUs?',
        options: [
          { id: 'A', text: 'TLB (Translation Lookaside Buffer)' },
          { id: 'B', text: 'Inode Cache' },
          { id: 'C', text: 'Swap Partition' },
          { id: 'D', text: 'L3 Data Cache' }
        ],
        correctAnswerId: 'A',
        explanation: 'TLB is a hardware MMU cache storing recently used page table translations.'
      },
      review: {
        title: 'Memory Management Review',
        pitfalls: ['Internal fragmentation in large fixed-size page frames'],
        edgeCases: ['Multi-level page table lookups causing memory access latency without TLB'],
        keyTakeaway: 'TLB hits resolve address translations in sub-nanosecond CPU cycles.'
      },
      interview: {
        title: 'Technical Viva: Multi-Level Page Tables',
        question: 'Why do 64-bit operating systems use multi-level (hierarchical) page tables?',
        hint: 'Avoiding sparse linear page table memory overhead.',
        keyPoints: ['Linear page table for 64-bit address space would require petabytes', 'Hierarchical tables allocate page tables dynamically for active memory regions only']
      }
    },
    {
      id: 'os-m7',
      topicKey: 'virtual-memory',
      title: 'Virtual Memory — Paging & Page Faults',
      description: 'Master demand paging, page fault handling, and replacement algorithms.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Demand Paging & Replacement',
        content: 'Demand paging loads pages into RAM only when accessed. When RAM is full, page replacement policies (LRU, Clock) evict victim pages.',
        interactiveExample: {
          language: 'text',
          code: 'Page Access: 1, 2, 3, 4, 1 -> LRU evicts page 2 when page 4 arrives (if 3 frames)',
          explanation: 'LRU evicts page not accessed for longest duration.'
        }
      },
      practice: {
        question: 'What is Thrashing in virtual memory systems?',
        options: [
          { id: 'A', text: 'System spends more time swapping pages to/from disk than executing productive code' },
          { id: 'B', text: 'CPU running at 100% speed' },
          { id: 'C', text: 'Deleting duplicate files' },
          { id: 'D', text: 'Formatting hard drives' }
        ],
        correctAnswerId: 'A',
        explanation: 'Thrashing occurs when active working sets exceed physical RAM, causing continuous page faults.'
      },
      review: {
        title: 'Virtual Memory Review',
        pitfalls: ['Belady\'s anomaly occurring in FIFO replacement policies'],
        edgeCases: ['Dirty page eviction requiring synchronous writeback to swap disk'],
        keyTakeaway: 'LRU provides high hit rates by exploiting temporal access locality.'
      },
      interview: {
        title: 'Technical Viva: Working Set Model',
        question: 'How does Denning\'s Working Set Model prevent Thrashing?',
        hint: 'Allocating sufficient page frames to hold working set Delta.',
        keyPoints: ['Tracks pages referenced by process in window Delta', 'If sum of working sets > total RAM, suspends processes to free frames']
      }
    },
    {
      id: 'os-m8',
      topicKey: 'file-systems',
      title: 'File Systems — Files, Directories & Metadata',
      description: 'Master inode pointers, directory structures, links, and journaling.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Unix File System Inodes',
        content: 'Inodes store metadata and block pointers. Hard links point to inode numbers; soft links store string paths.',
        interactiveExample: {
          language: 'bash',
          code: 'ln file.txt hard.txt && ln -s file.txt soft.txt',
          explanation: 'Hard links share inode number; soft links store path string.'
        }
      },
      practice: {
        question: 'Why can hard links NOT cross different filesystem partitions?',
        options: [
          { id: 'A', text: 'Inode numbers are unique only within a single partition' },
          { id: 'B', text: 'Hard links require network connections' },
          { id: 'C', text: 'Hard links store absolute file paths' },
          { id: 'D', text: 'Linux forbids multi-partition files' }
        ],
        correctAnswerId: 'A',
        explanation: 'Inodes are local to specific partitions; hard links map filenames directly to local inode numbers.'
      },
      review: {
        title: 'File Systems Review',
        pitfalls: ['Exhausting inode table allocations on systems storing millions of micro files'],
        edgeCases: ['File deletion delays while active file descriptors remain open in processes'],
        keyTakeaway: 'Journaling file systems log updates to prevent crash corruption.'
      },
      interview: {
        title: 'Technical Viva: Journaling File Systems',
        question: 'What is the purpose of Journaling in ext4 or NTFS file systems?',
        hint: 'Write-Ahead Logging of metadata updates.',
        keyPoints: ['Writes metadata updates to a log before committing to disk', 'Prevents full-disk fsck recovery scans after unexpected power failure']
      }
    }
  ]
};
