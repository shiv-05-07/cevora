import { SubjectCurriculum } from './types';

export const devopsCurriculum: SubjectCurriculum = {
  key: 'devops',
  label: 'DevOps',
  roadmapTitle: 'DevOps & Cloud Infrastructure Track',
  roadmapDescription: 'Master Linux administration, shell scripting, Git version control, Docker containerization, CI/CD pipelines, and Infrastructure as Code.',
  roadmapSteps: [
    { id: 'devops-1', topicKey: 'linux-cli', title: 'Linux & CLI Foundations', description: 'File systems, permissions, process management, and shell pipelines.', order: 1, estimatedMinutes: 45 },
    { id: 'devops-2', topicKey: 'git-version-control', title: 'Git & Version Control', description: 'Branching strategies, rebase vs merge, commit hygiene, and conflict resolution.', order: 2, estimatedMinutes: 45 },
    { id: 'devops-3', topicKey: 'networking-fundamentals', title: 'Networking Fundamentals', description: 'HTTP/S protocols, DNS resolution, IP subnets, firewalls, and ports.', order: 3, estimatedMinutes: 45 },
    { id: 'devops-4', topicKey: 'docker-containers', title: 'Docker & Containerization', description: 'Dockerfiles, multi-stage builds, container images, volumes, and networks.', order: 4, estimatedMinutes: 45 },
    { id: 'devops-5', topicKey: 'cicd-pipelines', title: 'CI/CD Pipelines', description: 'Automated testing, build pipelines, GitHub Actions, and deployment strategies.', order: 5, estimatedMinutes: 60 },
    { id: 'devops-6', topicKey: 'cloud-fundamentals', title: 'Cloud Fundamentals', description: 'Cloud compute, object storage, virtual private clouds (VPC), and IAM security.', order: 6, estimatedMinutes: 60 },
    { id: 'devops-7', topicKey: 'infrastructure-as-code', title: 'Infrastructure as Code', description: 'Terraform state management, declarative provisioning, and configuration management.', order: 7, estimatedMinutes: 60 },
    { id: 'devops-8', topicKey: 'monitoring-deployment', title: 'Monitoring & Logging', description: 'Prometheus metrics, Grafana dashboards, log aggregation, and alerting.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "Your current path is building cloud infrastructure, containerization, and automated deployment pipeline capabilities.",
    nextStep: "Complete today's DevOps mission to automate container builds and deployment workflows."
  },
  diagnosticQuestions: [
    {
      id: 'devops_dq1',
      subjectKey: 'devops',
      conceptKey: 'linux-cli',
      concept: 'Linux Permissions',
      difficulty: 'BEGINNER',
      question: 'What numeric permission code grants read, write, and execute permissions to owner, and read-only access to group and others?',
      options: [
        { id: 'A', text: '744' },
        { id: 'B', text: '777' },
        { id: 'C', text: '644' },
        { id: 'D', text: '755' }
      ],
      correctAnswer: 'A',
      explanation: '7 = rwx (4+2+1) for owner; 4 = r-- for group; 4 = r-- for others.'
    },
    {
      id: 'devops_dq2',
      subjectKey: 'devops',
      conceptKey: 'git-version-control',
      concept: 'Git Branching',
      difficulty: 'BEGINNER',
      question: 'What is the main difference between `git merge` and `git rebase`?',
      options: [
        { id: 'A', text: 'Merge creates a 3-way merge commit preserving history; Rebase rewrites commit history onto the target tip' },
        { id: 'B', text: 'Merge deletes branches; Rebase creates new branches' },
        { id: 'C', text: 'Rebase pushes code to GitHub automatically' },
        { id: 'D', text: 'Merge only works on remote repositories' }
      ],
      correctAnswer: 'A',
      explanation: 'Merge preserves branch topology with a merge commit; Rebase reapplies commits sequentially for a linear log.'
    },
    {
      id: 'devops_dq3',
      subjectKey: 'devops',
      conceptKey: 'docker-containers',
      concept: 'Docker Container Isolation',
      difficulty: 'INTERMEDIATE',
      question: 'What Linux kernel features provide process and resource isolation for Docker containers?',
      options: [
        { id: 'A', text: 'Namespaces (visibility) & Control Groups (cgroups, resource limits)' },
        { id: 'B', text: 'Virtual machine hypervisors' },
        { id: 'C', text: 'Swap partitions & CR3 page tables' },
        { id: 'D', text: 'Systemd service unit files' }
      ],
      correctAnswer: 'A',
      explanation: 'Namespaces isolate process views (PID, Net, Mount), while cgroups limit resource utilization (CPU, Memory).'
    },
    {
      id: 'devops_dq4',
      subjectKey: 'devops',
      conceptKey: 'docker-containers',
      concept: 'Docker Multi-Stage Builds',
      difficulty: 'INTERMEDIATE',
      question: 'Why are multi-stage Docker builds used in production pipelines?',
      options: [
        { id: 'A', text: 'Separate build tools from runtime images to reduce final image size and attack surface' },
        { id: 'B', text: 'Run containers on multiple physical servers simultaneously' },
        { id: 'C', text: 'Encrypt container storage layers' },
        { id: 'D', text: 'Automatically generate CI/CD YAML files' }
      ],
      correctAnswer: 'A',
      explanation: 'Multi-stage builds copy compiled artifacts into minimal runtime base images (e.g. Alpine/Distroless), shrinking image size.'
    },
    {
      id: 'devops_dq5',
      subjectKey: 'devops',
      conceptKey: 'cicd-pipelines',
      concept: 'CI/CD Automation',
      difficulty: 'INTERMEDIATE',
      question: 'What does Continuous Integration (CI) require in a team software pipeline?',
      options: [
        { id: 'A', text: 'Automatically building and running automated unit/integration tests on code commits' },
        { id: 'B', text: 'Deploying code to production without human approval' },
        { id: 'C', text: 'Manual code reviews on printed paper' },
        { id: 'D', text: 'Writing all code inside a single master file' }
      ],
      correctAnswer: 'A',
      explanation: 'CI automates building and testing code changes upon integration into shared repositories.'
    },
    {
      id: 'devops_dq6',
      subjectKey: 'devops',
      conceptKey: 'infrastructure-as-code',
      concept: 'Terraform State',
      difficulty: 'ADVANCED',
      question: 'What is the purpose of the Terraform state file (`terraform.tfstate`)?',
      options: [
        { id: 'A', text: 'Maps declarative configuration code resources to real-world managed cloud infrastructure' },
        { id: 'B', text: 'Stores database passwords in cleartext' },
        { id: 'C', text: 'Compiles C++ code binaries' },
        { id: 'D', text: 'Tracks git user commit history' }
      ],
      correctAnswer: 'A',
      explanation: 'Terraform state tracks resource metadata and mappings to determine plan diffs during execution.'
    },
    {
      id: 'devops_dq7',
      subjectKey: 'devops',
      conceptKey: 'networking-fundamentals',
      concept: 'Reverse Proxies',
      difficulty: 'ADVANCED',
      question: 'What is the primary role of a Reverse Proxy like NGINX or HAProxy?',
      options: [
        { id: 'A', text: 'Terminates SSL/TLS, load balances incoming traffic, and forwards requests to backend servers' },
        { id: 'B', text: 'Encodes video files for streaming' },
        { id: 'C', text: 'Generates database indexes' },
        { id: 'D', text: 'Formats client-side React JSX code' }
      ],
      correctAnswer: 'A',
      explanation: 'Reverse proxies sit in front of application servers to handle SSL termination, caching, and load distribution.'
    },
    {
      id: 'devops_dq8',
      subjectKey: 'devops',
      conceptKey: 'monitoring-deployment',
      concept: 'Prometheus Metrics',
      difficulty: 'ADVANCED',
      question: 'How does Prometheus collect metrics from monitored target services?',
      options: [
        { id: 'A', text: 'Pull model: periodically scrapes HTTP `/metrics` endpoints published by targets' },
        { id: 'B', text: 'Push model: targets stream logs via UDP constantly' },
        { id: 'C', text: 'Manual SQL database export queries' },
        { id: 'D', text: 'Reading local text files over SSH' }
      ],
      correctAnswer: 'A',
      explanation: 'Prometheus actively pulls (scrapes) metric endpoints at configured scrape intervals.'
    }
  ],
  missions: [
    {
      id: 'devops-m1',
      topicKey: 'linux-cli',
      title: 'Linux — Files, Processes & Permissions',
      description: 'Master Linux directory structures, file permissions, and CLI pipelines.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Linux Permissions & Process Control',
        content: 'Linux permissions use octal representation (r=4, w=2, x=1). Process signals (`kill -9`) terminate un-responsive processes.',
        interactiveExample: {
          language: 'bash',
          code: 'chmod 755 script.sh && ps aux | grep node',
          explanation: 'chmod 755 makes scripts executable by owner while readable by others.'
        }
      },
      practice: {
        question: 'Which Linux permission setting gives rwx to owner and r-x to group/others?',
        options: [
          { id: 'A', text: '755' },
          { id: 'B', text: '777' },
          { id: 'C', text: '644' },
          { id: 'D', text: '700' }
        ],
        correctAnswerId: 'A',
        explanation: '7 = rwx (4+2+1); 5 = r-x (4+0+1).'
      },
      review: {
        title: 'Linux CLI Review',
        pitfalls: ['Running `chmod -R 777` on system directories creating massive security holes'],
        edgeCases: ['Command pipelines silently dropping non-zero exit codes (use `set -e -o pipefail`)'],
        keyTakeaway: 'Follow the principle of least privilege for Linux permissions.'
      },
      interview: {
        title: 'Technical Viva: Linux Process Signals',
        question: 'What is the difference between SIGTERM (15) and SIGKILL (9)?',
        hint: 'Graceful shutdown vs immediate kernel force termination.',
        keyPoints: ['SIGTERM can be caught/handled by processes for cleanup', 'SIGKILL cannot be intercepted and terminates process immediately']
      }
    },
    {
      id: 'devops-m2',
      topicKey: 'git-version-control',
      title: 'Git — Branching & Collaboration',
      description: 'Master branching models, rebase workflows, and merge conflict resolution.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Git Branching and Rebase Mechanics',
        content: 'Git tracks DAG commit histories. `git rebase` rewrites local commits onto target branch tips for clean linear history.',
        interactiveExample: {
          language: 'bash',
          code: 'git checkout feature && git rebase main',
          explanation: 'Rebases feature commits on top of current main tip.'
        }
      },
      practice: {
        question: 'What is the main advantage of interactive rebase (`git rebase -i`)?',
        options: [
          { id: 'A', text: 'Squash, reorder, or edit local commits before pushing to shared remotes' },
          { id: 'B', text: 'Automatically resolves code merge conflicts' },
          { id: 'C', text: 'Deletes remote repository history' },
          { id: 'D', text: 'Compiles code binaries' }
        ],
        correctAnswerId: 'A',
        explanation: 'Interactive rebase allows cleaning and squashing commit logs before pull request merging.'
      },
      review: {
        title: 'Git Review',
        pitfalls: ['Force pushing (`git push --force`) onto shared main branches overwriting peer commits'],
        edgeCases: ['Dangling unreferenced commits recovered via `git reflog`'],
        keyTakeaway: 'Use `git push --force-with-lease` to safely update personal remote feature branches.'
      },
      interview: {
        title: 'Technical Viva: Git Reflog',
        question: 'What is `git reflog` and how does it save lost commits?',
        hint: 'Local record of HEAD movement updates.',
        keyPoints: ['Tracks every local HEAD update regardless of branch state', 'Allows recovering deleted branches or reset commits']
      }
    },
    {
      id: 'devops-m3',
      topicKey: 'networking-fundamentals',
      title: 'Networking — HTTP, DNS & Ports',
      description: 'Master networking protocols, DNS resolution, and TCP/UDP communication.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Networking Protocols and DNS',
        content: 'DNS maps domain names to IP addresses. HTTP/HTTPS operates on TCP ports 80/443.',
        interactiveExample: {
          language: 'bash',
          code: 'dig +trace cevora.com && curl -v https://cevora.com',
          explanation: 'dig traces DNS resolution hierarchy steps.'
        }
      },
      practice: {
        question: 'Which port is standard for encrypted HTTPS web traffic?',
        options: [
          { id: 'A', text: '443' },
          { id: 'B', text: '80' },
          { id: 'C', text: '22' },
          { id: 'D', text: '8080' }
        ],
        correctAnswerId: 'A',
        explanation: 'HTTPS defaults to TCP port 443; HTTP uses port 80.'
      },
      review: {
        title: 'Networking Review',
        pitfalls: ['Forgetting firewall Security Group ingress rule updates for custom app ports'],
        edgeCases: ['DNS propagation delays during domain record changes'],
        keyTakeaway: 'Test port connectivity using `nc -zv host port` or `curl`.'
      },
      interview: {
        title: 'Technical Viva: TLS Handshake',
        question: 'What steps occur during a TLS 1.2/1.3 Handshake?',
        hint: 'Client Hello, Server Hello, Certificate Validation, Key Exchange.',
        keyPoints: ['Client/Server negotiate cipher suites', 'Server proves identity via TLS certificate', 'Asymmetric key exchange establishes symmetric session key']
      }
    },
    {
      id: 'devops-m4',
      topicKey: 'docker-containers',
      title: 'Docker — Containers & Images',
      description: 'Master Dockerfiles, image caching, multi-stage builds, and volumes.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Docker Image Layers and Caching',
        content: 'Docker images consist of read-only layers. Order Dockerfile instructions from least to most frequently changed to maximize layer cache hits.',
        interactiveExample: {
          language: 'dockerfile',
          code: 'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["npm", "start"]',
          explanation: 'Copying package.json before code preserves npm cache.'
        }
      },
      practice: {
        question: 'Why should dependency files (`package.json`) be copied before source code in Dockerfiles?',
        options: [
          { id: 'A', text: 'Leverages Docker layer caching so `npm install` re-runs only when dependencies change' },
          { id: 'B', text: 'Reduces CPU speed' },
          { id: 'C', text: 'Required by Node.js runtime' },
          { id: 'D', text: 'Deletes unused image files' }
        ],
        correctAnswerId: 'A',
        explanation: 'Unchanged Dockerfile instructions reuse cached layers, bypassing expensive dependency reinstalls.'
      },
      review: {
        title: 'Docker Review',
        pitfalls: ['Running containers as `root` user in production'],
        edgeCases: ['Container data loss when omitting volume mounts for persistent databases'],
        keyTakeaway: 'Use non-root users (`USER node`) and volume mounts for persistent data.'
      },
      interview: {
        title: 'Technical Viva: Containers vs Virtual Machines',
        question: 'Compare Docker Containers with Virtual Machines.',
        hint: 'OS kernel sharing vs hypervisor hardware virtualization.',
        keyPoints: ['Containers share host OS kernel, lightweight (MBs), start in seconds', 'VMs run full guest OS on hypervisor, heavy (GBs), start in minutes']
      }
    },
    {
      id: 'devops-m5',
      topicKey: 'cicd-pipelines',
      title: 'CI/CD — Automated Build & Deployment',
      description: 'Master GitHub Actions workflow pipelines, test automation, and release artifacts.',
      estimatedMinutes: 60,
      lesson: {
        title: 'GitHub Actions Pipelines',
        content: 'CI/CD YAML workflows trigger jobs on push events. Steps run linting, tests, build compilation, and deployment tasks.',
        interactiveExample: {
          language: 'yaml',
          code: 'on: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test',
          explanation: 'YAML workflow executes automated test step on push.'
        }
      },
      practice: {
        question: 'What is Continuous Integration (CI)?',
        options: [
          { id: 'A', text: 'Automating build and test execution whenever code changes are committed' },
          { id: 'B', text: 'Manually uploading ZIP archives to web servers' },
          { id: 'C', text: 'Writing code directly in production servers' },
          { id: 'D', text: 'Buying cloud servers' }
        ],
        correctAnswerId: 'A',
        explanation: 'CI continuously integrates code into main branch via automated testing.'
      },
      review: {
        title: 'CI/CD Review',
        pitfalls: ['Storing un-encrypted production deployment credentials in public repository files'],
        edgeCases: ['Flaky asynchronous integration tests breaking CI pipeline runs'],
        keyTakeaway: 'Store deployment tokens in encrypted repository secrets.'
      },
      interview: {
        title: 'Technical Viva: Deployment Strategies',
        question: 'Compare Blue-Green Deployment with Canary Deployment.',
        hint: 'Zero downtime environment switching vs incremental traffic shifting.',
        keyPoints: ['Blue-Green switches 100% traffic instantly between two identical environments', 'Canary shifts traffic incrementally (e.g. 5% -> 25% -> 100%) while monitoring error metrics']
      }
    },
    {
      id: 'devops-m6',
      topicKey: 'cloud-fundamentals',
      title: 'Cloud — Compute, Storage & Networking',
      description: 'Master cloud virtual machines, object storage buckets, and VPC networks.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Cloud Infrastructure Architecture',
        content: 'Cloud providers offer elastic compute (VMs/Instances), object storage (S3 buckets), and isolated Virtual Private Clouds (VPC).',
        interactiveExample: {
          language: 'bash',
          code: 'aws s3 sync ./build s3://my-app-bucket --acl public-read',
          explanation: 'Uploads static frontend build files to S3 storage bucket.'
        }
      },
      practice: {
        question: 'What cloud service type provides raw virtual machines on demand?',
        options: [
          { id: 'A', text: 'IaaS (Infrastructure as a Service)' },
          { id: 'B', text: 'PaaS (Platform as a Service)' },
          { id: 'C', text: 'SaaS (Software as a Service)' },
          { id: 'D', text: 'FaaS (Function as a Service)' }
        ],
        correctAnswerId: 'A',
        explanation: 'IaaS provides raw compute VMs, storage, and networking resources.'
      },
      review: {
        title: 'Cloud Review',
        pitfalls: ['Configuring public read/write access permissions on sensitive S3 storage buckets'],
        edgeCases: ['Cloud provider region outages requiring multi-region failover setups'],
        keyTakeaway: 'Keep cloud storage buckets private by default and restrict IAM roles.'
      },
      interview: {
        title: 'Technical Viva: Cloud IAM',
        question: 'What is the Principle of Least Privilege in Cloud IAM?',
        hint: 'Granting minimum necessary permissions.',
        keyPoints: ['Assign permissions strictly required for specific job roles', 'Avoid using root cloud credentials for application tasks']
      }
    },
    {
      id: 'devops-m7',
      topicKey: 'infrastructure-as-code',
      title: 'Infrastructure as Code — Terraform',
      description: 'Master declarative provisioning, state files, and modular infrastructure.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Declarative Infrastructure with Terraform',
        content: 'Terraform uses HCL syntax to declare target infrastructure states. `terraform apply` provisions resources to match config.',
        interactiveExample: {
          language: 'hcl',
          code: 'resource "aws_instance" "web" {\n  ami = "ami-0c55b159cbfafe1f0"\n  instance_type = "t2.micro"\n}',
          explanation: 'Declares an AWS EC2 instance resource block.'
        }
      },
      practice: {
        question: 'What is the purpose of `terraform plan`?',
        options: [
          { id: 'A', text: 'Displays an execution delta preview of resources to be created, updated, or destroyed' },
          { id: 'B', text: 'Deletes cloud resources instantly' },
          { id: 'C', text: 'Formats python code files' },
          { id: 'D', text: 'Generates billing invoices' }
        ],
        correctAnswerId: 'A',
        explanation: '`terraform plan` previews changes before applying them to cloud providers.'
      },
      review: {
        title: 'IaC Review',
        pitfalls: ['Committing `terraform.tfstate` files containing sensitive outputs to Git repositories'],
        edgeCases: ['State drift when manual cloud console changes bypass Terraform'],
        keyTakeaway: 'Store state remotely in S3 with S3 DynamoDB state locking.'
      },
      interview: {
        title: 'Technical Viva: State Locking',
        question: 'Why is Remote State Locking essential when multiple engineers run Terraform?',
        hint: 'Preventing concurrent state file overwrites.',
        keyPoints: ['Locks state table during apply executions', 'Prevents race conditions and state corruption']
      }
    },
    {
      id: 'devops-m8',
      topicKey: 'monitoring-deployment',
      title: 'Monitoring — Logs, Metrics & Alerts',
      description: 'Master Prometheus scraping, Grafana metrics dashboards, and log aggregation.',
      estimatedMinutes: 60,
      lesson: {
        title: 'System Observability: Metrics, Logs & Traces',
        content: 'Observability relies on 3 pillars: Metrics (numerical counters/gauges), Logs (event records), Traces (request path spans).',
        interactiveExample: {
          language: 'yaml',
          code: 'scrape_configs:\n  - job_name: "app"\n    static_configs:\n      - targets: ["localhost:3000"]',
          explanation: 'Prometheus scrapes target app metric endpoints.'
        }
      },
      practice: {
        question: 'Which monitoring model does Prometheus use to gather metrics?',
        options: [
          { id: 'A', text: 'Pull model (scraping HTTP /metrics endpoints)' },
          { id: 'B', text: 'Push model over UDP' },
          { id: 'C', text: 'Manual SQL database export' },
          { id: 'D', text: 'Email notification parsing' }
        ],
        correctAnswerId: 'A',
        explanation: 'Prometheus periodically pulls metrics from target HTTP endpoints.'
      },
      review: {
        title: 'Monitoring Review',
        pitfalls: ['Alert fatigue caused by setting non-actionable notification thresholds'],
        edgeCases: ['High cardinality labels in Prometheus metrics consuming massive RAM'],
        keyTakeaway: 'Alert on actionable user-impacting symptoms (e.g. 5xx error rate spikes).'
      },
      interview: {
        title: 'Technical Viva: Golden Signals of Monitoring',
        question: 'What are Google\'s 4 Golden Signals of Site Reliability Engineering (SRE)?',
        hint: 'Latency, Traffic, Errors, and Saturation.',
        keyPoints: ['Latency: Time to service requests', 'Traffic: Request load rate', 'Errors: Rate of failed requests', 'Saturation: System resource fullness']
      }
    }
  ]
};
