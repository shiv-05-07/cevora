const { PrismaClient, OpportunityType, OpportunityStatus } = require('@prisma/client');
const prisma = new PrismaClient();

const companies = [
  {
    name: 'Amazon',
    slug: 'amazon',
    industry: 'E-commerce & Cloud',
    description: 'Amazon is a global technology leader focusing on e-commerce, cloud computing (AWS), digital streaming, and AI.',
    website: 'https://www.amazon.jobs',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
  },
  {
    name: 'Google',
    slug: 'google',
    industry: 'Technology & AI',
    description: 'Google specializes in Internet-related services, cloud computing, software, search, and quantum computing.',
    website: 'https://careers.google.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    industry: 'Technology & Cloud',
    description: 'Microsoft develops, manufactures, licenses, and supports software, consumer electronics, personal computers, and services.',
    website: 'https://careers.microsoft.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'
  },
  {
    name: 'Adobe',
    slug: 'adobe',
    industry: 'Software & Creative Tech',
    description: 'Adobe is an American multinational computer software company focused on creativity and digital marketing software products.',
    website: 'https://www.adobe.com/careers.html',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png'
  },
  {
    name: 'Atlassian',
    slug: 'atlassian',
    industry: 'Enterprise Software',
    description: 'Atlassian develops products for software developers, project managers, and other software development teams (Jira, Confluence).',
    website: 'https://www.atlassian.com/company/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Atlassian-Logo.png'
  },
  {
    name: 'Oracle',
    slug: 'oracle',
    industry: 'Enterprise Cloud & Database',
    description: 'Oracle sells database software, cloud engineered systems, and enterprise software products.',
    website: 'https://www.oracle.com/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg'
  },
  {
    name: 'Cisco',
    slug: 'cisco',
    industry: 'Networking & Cybersecurity',
    description: 'Cisco Systems develops, manufactures, and sells networking hardware, software, telecommunications equipment, and domain security.',
    website: 'https://jobs.cisco.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg'
  },
  {
    name: 'Flipkart',
    slug: 'flipkart',
    industry: 'E-commerce & Supply Chain',
    description: 'Flipkart is one of India leading e-commerce marketplaces offering scalable consumer tech and logistics networks.',
    website: 'https://www.flipkartcareers.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg'
  },
  {
    name: 'PhonePe',
    slug: 'phonepe',
    industry: 'FinTech & Payments',
    description: 'PhonePe is India leading digital payments company building UPI, payment processing, merchant gateways, and financial services.',
    website: 'https://www.phonepe.com/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg'
  },
  {
    name: 'Paytm',
    slug: 'paytm',
    industry: 'FinTech',
    description: 'Paytm is an Indian multinational financial technology company specializing in digital payments and financial services.',
    website: 'https://careers.paytm.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg'
  },
  {
    name: 'Goldman Sachs',
    slug: 'goldman-sachs',
    industry: 'Investment Banking & FinTech',
    description: 'Goldman Sachs is a leading global financial institution delivering securities, investment banking, and quant engineering solutions.',
    website: 'https://www.goldmansachs.com/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg'
  },
  {
    name: 'Morgan Stanley',
    slug: 'morgan-stanley',
    industry: 'Financial Services',
    description: 'Morgan Stanley is an American multinational investment management and financial services company.',
    website: 'https://www.morganstanley.com/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Morgan_Stanley_Logo_1.svg'
  },
  {
    name: 'Vispe',
    slug: 'vispe',
    industry: 'Artificial Intelligence & Vision',
    description: 'Vispe is an emerging AI innovation lab specializing in spatial computing, computer vision, and edge neural processing.',
    website: 'https://vispe.io/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/100px-Target_Corporation_logo_%28vector%29.svg.png'
  },
  {
    name: 'Sprinklr',
    slug: 'sprinklr',
    industry: 'Customer Experience Software',
    description: 'Sprinklr provides enterprise software for customer experience management, social media marketing, and AI content analysis.',
    website: 'https://www.sprinklr.com/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Sprinklr_Logo.svg'
  },
  {
    name: 'IBM',
    slug: 'ibm',
    industry: 'Cloud & Cognitive Solutions',
    description: 'IBM produces and sells computer hardware, middleware, software, quantum computing, and consulting services.',
    website: 'https://www.ibm.com/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'
  },
  {
    name: 'Deloitte',
    slug: 'deloitte',
    industry: 'Professional Services & Consulting',
    description: 'Deloitte is one of the Big Four accounting and tech consulting firms delivering enterprise strategy and digital architecture.',
    website: 'https://www2.deloitte.com/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg'
  },
  {
    name: 'Qualcomm',
    slug: 'qualcomm',
    industry: 'Semiconductors & Wireless',
    description: 'Qualcomm creates semiconductors, software, and services related to wireless technology, 5G, and mobile processors.',
    website: 'https://www.qualcomm.com/company/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Qualcomm_logo.svg'
  },
  {
    name: 'Intel',
    slug: 'intel',
    industry: 'Semiconductors & Microprocessors',
    description: 'Intel is a global leader in designing and manufacturing microprocessors, graphics chips, and integrated semiconductor solutions.',
    website: 'https://jobs.intel.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282020%29.svg'
  },
  {
    name: 'Accenture',
    slug: 'accenture',
    industry: 'IT & Management Consulting',
    description: 'Accenture is a leading global professional services company providing capabilities in digital, cloud, and security.',
    website: 'https://www.accenture.com/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg'
  },
  {
    name: 'TCS Digital',
    slug: 'tcs-digital',
    industry: 'IT Services & Digital Engineering',
    description: 'TCS Digital is the premier technology wing of Tata Consultancy Services hiring for next-gen engineering, AI, and cloud.',
    website: 'https://www.tcs.com/careers',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg'
  }
];

const opportunities = [
  // 1. Amazon (2 roles)
  {
    companySlug: 'amazon',
    title: 'SDE 1 (Software Development Engineer)',
    role: 'Software Development Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore',
    workMode: 'Hybrid',
    salaryMin: 4400000,
    salaryMax: 4400000,
    stipend: null,
    deadline: new Date('2026-11-15'),
    minimumCgpa: 7.5,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    eligibleGraduationYears: [2026, 2027],
    maximumBacklogs: 0,
    skills: ['Java', 'DSA', 'System Design', 'AWS'],
    preferredSkills: ['Distributed Systems', 'DynamoDB'],
    applyUrl: 'https://www.amazon.jobs',
    officialSourceUrl: 'https://www.amazon.jobs',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.5', isMandatory: true },
      { criterionType: 'BACKLOGS', operator: 'LTE', requiredValue: '0', isMandatory: true }
    ]
  },
  {
    companySlug: 'amazon',
    title: 'Cloud Support Associate Intern',
    role: 'Cloud Support Associate',
    type: OpportunityType.INTERNSHIP,
    status: OpportunityStatus.OPEN,
    location: 'Hyderabad',
    workMode: 'Remote',
    salaryMin: null,
    salaryMax: null,
    stipend: '₹50,000/month',
    deadline: new Date('2026-12-15'),
    minimumCgpa: 7.0,
    eligibleBranches: ['All Engineering', 'CSE', 'IT', 'ECE', 'EEE'],
    eligibleGraduationYears: [2027],
    maximumBacklogs: 1,
    skills: ['Linux', 'Networking', 'Python', 'Cloud Computing'],
    preferredSkills: ['AWS Certified', 'Bash'],
    applyUrl: 'https://www.amazon.jobs',
    officialSourceUrl: 'https://www.amazon.jobs',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.0', isMandatory: true }
    ]
  },

  // 2. Google (2 roles)
  {
    companySlug: 'google',
    title: 'Software Engineer, Early Career 2027',
    role: 'Software Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore / Hyderabad',
    workMode: 'Hybrid',
    salaryMin: 5200000,
    salaryMax: 5200000,
    stipend: null,
    deadline: new Date('2026-11-30'),
    minimumCgpa: 8.5,
    eligibleBranches: ['CSE', 'IT'],
    eligibleGraduationYears: [2026, 2027],
    maximumBacklogs: 0,
    skills: ['C++', 'Python', 'Algorithms', 'Distributed Systems'],
    preferredSkills: ['Concurrency', 'Go'],
    applyUrl: 'https://careers.google.com',
    officialSourceUrl: 'https://careers.google.com',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.5', isMandatory: true }
    ]
  },
  {
    companySlug: 'google',
    title: 'STEP Intern 2027',
    role: 'Software Engineering Intern',
    type: OpportunityType.INTERNSHIP,
    status: OpportunityStatus.UPCOMING,
    location: 'Bangalore',
    workMode: 'On-site',
    salaryMin: null,
    salaryMax: null,
    stipend: '₹80,000/month',
    deadline: new Date('2027-01-15'),
    minimumCgpa: 8.0,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    eligibleGraduationYears: [2027, 2028],
    maximumBacklogs: 0,
    skills: ['Java', 'Python', 'DSA'],
    preferredSkills: ['Problem Solving', 'Data Structures'],
    applyUrl: 'https://careers.google.com',
    officialSourceUrl: 'https://careers.google.com',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.0', isMandatory: true }
    ]
  },

  // 3. Microsoft (2 roles)
  {
    companySlug: 'microsoft',
    title: 'Software Engineering Internship 2027',
    role: 'Software Engineering Intern',
    type: OpportunityType.INTERNSHIP,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore / Hyderabad',
    workMode: 'Hybrid',
    salaryMin: null,
    salaryMax: null,
    stipend: '₹60,000/month',
    deadline: new Date('2026-11-30'),
    minimumCgpa: 8.0,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    eligibleGraduationYears: [2027],
    maximumBacklogs: 0,
    skills: ['C#', 'C++', 'Java', 'DSA'],
    preferredSkills: ['Azure', 'System Design'],
    applyUrl: 'https://careers.microsoft.com',
    officialSourceUrl: 'https://careers.microsoft.com',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.0', isMandatory: true }
    ]
  },
  {
    companySlug: 'microsoft',
    title: 'Support Engineer',
    role: 'Technical Support Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Noida',
    workMode: 'Hybrid',
    salaryMin: 1800000,
    salaryMax: 1800000,
    stipend: null,
    deadline: new Date('2026-12-20'),
    minimumCgpa: 7.0,
    eligibleBranches: ['All Engineering', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 1,
    skills: ['Troubleshooting', 'Azure', 'PowerShell', 'SQL'],
    preferredSkills: ['Windows Server', 'Active Directory'],
    applyUrl: 'https://careers.microsoft.com',
    officialSourceUrl: 'https://careers.microsoft.com',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.0', isMandatory: true }
    ]
  },

  // 4. Adobe (1 role)
  {
    companySlug: 'adobe',
    title: 'Member of Technical Staff (MTS 1)',
    role: 'Software Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Noida / Bangalore',
    workMode: 'Hybrid',
    salaryMin: 4200000,
    salaryMax: 4200000,
    stipend: null,
    deadline: new Date('2026-12-05'),
    minimumCgpa: 7.5,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    eligibleGraduationYears: [2026, 2027],
    maximumBacklogs: 0,
    skills: ['C++', 'Java', 'Computer Graphics', 'DSA'],
    preferredSkills: ['OpenGL', 'Algorithms'],
    applyUrl: 'https://www.adobe.com/careers.html',
    officialSourceUrl: 'https://www.adobe.com/careers.html',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.5', isMandatory: true }
    ]
  },

  // 5. Atlassian (1 role)
  {
    companySlug: 'atlassian',
    title: 'Software Engineer (Backend)',
    role: 'Backend Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Remote (India)',
    workMode: 'Remote',
    salaryMin: 5800000,
    salaryMax: 5800000,
    stipend: null,
    deadline: new Date('2026-11-25'),
    minimumCgpa: 8.0,
    eligibleBranches: ['CSE', 'IT'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    preferredSkills: ['Kotlin', 'PostgreSQL'],
    applyUrl: 'https://www.atlassian.com/company/careers',
    officialSourceUrl: 'https://www.atlassian.com/company/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.0', isMandatory: true }
    ]
  },

  // 6. Oracle (1 role)
  {
    companySlug: 'oracle',
    title: 'Server Technology Engineer',
    role: 'Database / Systems Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Hyderabad',
    workMode: 'On-site',
    salaryMin: 3200000,
    salaryMax: 3200000,
    stipend: null,
    deadline: new Date('2026-12-10'),
    minimumCgpa: 7.0,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['C', 'C++', 'SQL', 'Database Internals'],
    preferredSkills: ['OS Concepts', 'Memory Management'],
    applyUrl: 'https://www.oracle.com/careers',
    officialSourceUrl: 'https://www.oracle.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.0', isMandatory: true }
    ]
  },

  // 7. Cisco (1 role)
  {
    companySlug: 'cisco',
    title: 'Network Software Engineer',
    role: 'Network Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore',
    workMode: 'Hybrid',
    salaryMin: 2400000,
    salaryMax: 2400000,
    stipend: null,
    deadline: new Date('2026-11-10'),
    minimumCgpa: 7.5,
    eligibleBranches: ['CSE', 'IT', 'ECE', 'EEE'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['C', 'C++', 'TCP/IP', 'Routing Protocols', 'Linux'],
    preferredSkills: ['Socket Programming', 'Wireshark'],
    applyUrl: 'https://jobs.cisco.com',
    officialSourceUrl: 'https://jobs.cisco.com',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.5', isMandatory: true }
    ]
  },

  // 8. Flipkart (1 role)
  {
    companySlug: 'flipkart',
    title: 'SDE 1 (Supply Chain Tech)',
    role: 'Software Development Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore',
    workMode: 'Hybrid',
    salaryMin: 3200000,
    salaryMax: 3200000,
    stipend: null,
    deadline: new Date('2026-11-20'),
    minimumCgpa: 7.5,
    eligibleBranches: ['CSE', 'IT'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['Java', 'DSA', 'Kafka', 'System Design'],
    preferredSkills: ['Distributed Caching', 'Redis'],
    applyUrl: 'https://www.flipkartcareers.com',
    officialSourceUrl: 'https://www.flipkartcareers.com',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.5', isMandatory: true }
    ]
  },

  // 9. PhonePe (1 role)
  {
    companySlug: 'phonepe',
    title: 'Software Engineer (Payments Platform)',
    role: 'Backend Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore',
    workMode: 'On-site',
    salaryMin: 3400000,
    salaryMax: 3400000,
    stipend: null,
    deadline: new Date('2026-12-01'),
    minimumCgpa: 8.0,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['Java', 'DSA', 'Spring Boot', 'Aerospike', 'MySQL'],
    preferredSkills: ['High Concurrency', 'Kafka'],
    applyUrl: 'https://www.phonepe.com/careers',
    officialSourceUrl: 'https://www.phonepe.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.0', isMandatory: true }
    ]
  },

  // 10. Paytm (1 role)
  {
    companySlug: 'paytm',
    title: 'Backend Developer Intern',
    role: 'Backend Developer',
    type: OpportunityType.INTERNSHIP,
    status: OpportunityStatus.OPEN,
    location: 'Noida',
    workMode: 'Hybrid',
    salaryMin: null,
    salaryMax: null,
    stipend: '₹40,000/month',
    deadline: new Date('2026-11-15'),
    minimumCgpa: 6.5,
    eligibleBranches: ['All Engineering', 'CSE', 'IT', 'ECE'],
    eligibleGraduationYears: [2027],
    maximumBacklogs: 1,
    skills: ['Node.js', 'Express', 'MongoDB', 'JavaScript'],
    preferredSkills: ['REST APIs', 'Postman'],
    applyUrl: 'https://careers.paytm.com',
    officialSourceUrl: 'https://careers.paytm.com',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '6.5', isMandatory: true }
    ]
  },

  // 11. Goldman Sachs (2 roles)
  {
    companySlug: 'goldman-sachs',
    title: 'Summer Analyst - Global Markets Tech',
    role: 'Software Engineer Analyst',
    type: OpportunityType.INTERNSHIP,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore',
    workMode: 'On-site',
    salaryMin: null,
    salaryMax: null,
    stipend: '₹75,000/month',
    deadline: new Date('2026-11-28'),
    minimumCgpa: 8.5,
    eligibleBranches: ['All Engineering', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical'],
    eligibleGraduationYears: [2027],
    maximumBacklogs: 0,
    skills: ['Java', 'C++', 'Python', 'Algorithms', 'Mathematics'],
    preferredSkills: ['Financial Systems', 'Data Structures'],
    applyUrl: 'https://www.goldmansachs.com/careers',
    officialSourceUrl: 'https://www.goldmansachs.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.5', isMandatory: true }
    ]
  },
  {
    companySlug: 'goldman-sachs',
    title: 'New Analyst - Quant & Engineering',
    role: 'Quantitative Developer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore / Hyderabad',
    workMode: 'On-site',
    salaryMin: 2800000,
    salaryMax: 2800000,
    stipend: null,
    deadline: new Date('2026-12-20'),
    minimumCgpa: 8.0,
    eligibleBranches: ['CSE', 'IT', 'ECE', 'EEE', 'Mathematics'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['Python', 'C++', 'Financial Modelling', 'DSA'],
    preferredSkills: ['Statistics', 'Probability'],
    applyUrl: 'https://www.goldmansachs.com/careers',
    officialSourceUrl: 'https://www.goldmansachs.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.0', isMandatory: true }
    ]
  },

  // 12. Morgan Stanley (1 role)
  {
    companySlug: 'morgan-stanley',
    title: 'Technology Analyst',
    role: 'Application Developer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Mumbai',
    workMode: 'Hybrid',
    salaryMin: 2600000,
    salaryMax: 2600000,
    stipend: null,
    deadline: new Date('2026-12-15'),
    minimumCgpa: 7.5,
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['Java', 'SQL', 'Unix', 'Angular'],
    preferredSkills: ['Spring Framework', 'Design Patterns'],
    applyUrl: 'https://www.morganstanley.com/careers',
    officialSourceUrl: 'https://www.morganstanley.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.5', isMandatory: true }
    ]
  },

  // 13. Vispe (1 role)
  {
    companySlug: 'vispe',
    title: 'Computer Vision Engineer Intern',
    role: 'AI/ML Engineer',
    type: OpportunityType.INTERNSHIP,
    status: OpportunityStatus.OPEN,
    location: 'Pune',
    workMode: 'Remote',
    salaryMin: null,
    salaryMax: null,
    stipend: '₹35,000/month',
    deadline: new Date('2027-01-10'),
    minimumCgpa: 7.0,
    eligibleBranches: ['CSE', 'IT', 'ECE', 'Biomedical', 'Robotics'],
    eligibleGraduationYears: [2027],
    maximumBacklogs: 0,
    skills: ['Python', 'PyTorch', 'OpenCV', 'Deep Learning'],
    preferredSkills: ['TensorFlow', 'Image Processing'],
    applyUrl: 'https://vispe.io/careers',
    officialSourceUrl: 'https://vispe.io/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.0', isMandatory: true }
    ]
  },

  // 14. Sprinklr (1 role)
  {
    companySlug: 'sprinklr',
    title: 'Product Engineer (Full Stack)',
    role: 'Full Stack Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Gurugram',
    workMode: 'Hybrid',
    salaryMin: 3000000,
    salaryMax: 3000000,
    stipend: null,
    deadline: new Date('2026-11-18'),
    minimumCgpa: 8.0,
    eligibleBranches: ['CSE', 'IT'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['Java', 'React', 'TypeScript', 'DSA'],
    preferredSkills: ['Next.js', 'Redux'],
    applyUrl: 'https://www.sprinklr.com/careers',
    officialSourceUrl: 'https://www.sprinklr.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.0', isMandatory: true }
    ]
  },

  // 15. IBM (2 roles)
  {
    companySlug: 'ibm',
    title: 'Associate Developer - Cloud & AI',
    role: 'Software Developer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore / Pune / Kochi',
    workMode: 'Hybrid',
    salaryMin: 1200000,
    salaryMax: 1200000,
    stipend: null,
    deadline: new Date('2026-12-31'),
    minimumCgpa: 6.5,
    eligibleBranches: ['All Engineering', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 1,
    skills: ['Java', 'Python', 'Cloud Basics', 'Docker'],
    preferredSkills: ['Kubernetes', 'Red Hat OpenShift'],
    applyUrl: 'https://www.ibm.com/careers',
    officialSourceUrl: 'https://www.ibm.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '6.5', isMandatory: true }
    ]
  },
  {
    companySlug: 'ibm',
    title: 'Quantum / Research Intern',
    role: 'Research Intern',
    type: OpportunityType.INTERNSHIP,
    status: OpportunityStatus.UPCOMING,
    location: 'Bangalore',
    workMode: 'On-site',
    salaryMin: null,
    salaryMax: null,
    stipend: '₹45,000/month',
    deadline: new Date('2027-02-01'),
    minimumCgpa: 8.5,
    eligibleBranches: ['CSE', 'Physics', 'ECE', 'Mathematics'],
    eligibleGraduationYears: [2027],
    maximumBacklogs: 0,
    skills: ['Python', 'Qiskit', 'Linear Algebra', 'Algorithms'],
    preferredSkills: ['Quantum Algorithms', 'C++'],
    applyUrl: 'https://www.ibm.com/careers',
    officialSourceUrl: 'https://www.ibm.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.5', isMandatory: true }
    ]
  },

  // 16. Deloitte (1 role)
  {
    companySlug: 'deloitte',
    title: 'Analyst - Tech Consulting',
    role: 'Technology Consultant',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Pan India (Hyderabad / Mumbai / Gurgaon)',
    workMode: 'Hybrid',
    salaryMin: 800000,
    salaryMax: 800000,
    stipend: null,
    deadline: new Date('2026-12-28'),
    minimumCgpa: 6.5,
    eligibleBranches: ['All Engineering', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical', 'Production'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 1,
    skills: ['SQL', 'Python', 'Excel', 'Problem Solving', 'Communication'],
    preferredSkills: ['PowerBI', 'Tableau'],
    applyUrl: 'https://www2.deloitte.com/careers',
    officialSourceUrl: 'https://www2.deloitte.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '6.5', isMandatory: true }
    ]
  },

  // 17. Qualcomm (1 role)
  {
    companySlug: 'qualcomm',
    title: 'Embedded Software Engineer',
    role: 'Embedded Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Hyderabad / Chennai',
    workMode: 'On-site',
    salaryMin: 2200000,
    salaryMax: 2200000,
    stipend: null,
    deadline: new Date('2026-11-22'),
    minimumCgpa: 7.5,
    eligibleBranches: ['ECE', 'EEE', 'CSE', 'Instrumentation', 'Mechatronics'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['C', 'Embedded C', 'RTOS', 'Microcontrollers', 'Device Drivers'],
    preferredSkills: ['ARM Architecture', 'Linux Kernel'],
    applyUrl: 'https://www.qualcomm.com/company/careers',
    officialSourceUrl: 'https://www.qualcomm.com/company/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.5', isMandatory: true }
    ]
  },

  // 18. Intel (2 roles)
  {
    companySlug: 'intel',
    title: 'Hardware Design & Validation Intern',
    role: 'Silicon / Hardware Engineer',
    type: OpportunityType.INTERNSHIP,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore',
    workMode: 'On-site',
    salaryMin: null,
    salaryMax: null,
    stipend: '₹55,000/month',
    deadline: new Date('2026-12-05'),
    minimumCgpa: 8.0,
    eligibleBranches: ['ECE', 'EEE', 'VLSI', 'Electronics'],
    eligibleGraduationYears: [2027],
    maximumBacklogs: 0,
    skills: ['Verilog', 'SystemVerilog', 'Digital Design', 'Computer Architecture'],
    preferredSkills: ['UVM', 'FPGA'],
    applyUrl: 'https://jobs.intel.com',
    officialSourceUrl: 'https://jobs.intel.com',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '8.0', isMandatory: true }
    ]
  },
  {
    companySlug: 'intel',
    title: 'Firmware Engineer',
    role: 'Firmware Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Bangalore',
    workMode: 'Hybrid',
    salaryMin: 2000000,
    salaryMax: 2000000,
    stipend: null,
    deadline: new Date('2027-01-05'),
    minimumCgpa: 7.5,
    eligibleBranches: ['CSE', 'ECE', 'EEE'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['C', 'C++', 'BIOS', 'UEFI', 'Linux Kernel'],
    preferredSkills: ['Assembly', 'GDB'],
    applyUrl: 'https://jobs.intel.com',
    officialSourceUrl: 'https://jobs.intel.com',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.5', isMandatory: true }
    ]
  },

  // 19. Accenture (1 role)
  {
    companySlug: 'accenture',
    title: 'Advanced App Engineering Analyst',
    role: 'Full Stack Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Pan India',
    workMode: 'Hybrid',
    salaryMin: 1190000,
    salaryMax: 1190000,
    stipend: null,
    deadline: new Date('2026-12-18'),
    minimumCgpa: 6.5,
    eligibleBranches: ['All Engineering', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical', 'Biotechnology', 'Aerospace'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 1,
    skills: ['Java', 'Spring Boot', 'SQL', 'JavaScript'],
    preferredSkills: ['React', 'Cloud Services'],
    applyUrl: 'https://www.accenture.com/careers',
    officialSourceUrl: 'https://www.accenture.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '6.5', isMandatory: true }
    ]
  },

  // 20. TCS Digital (2 roles)
  {
    companySlug: 'tcs-digital',
    title: 'Digital Innovator Trainee',
    role: 'Systems Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Pan India',
    workMode: 'On-site',
    salaryMin: 750000,
    salaryMax: 750000,
    stipend: null,
    deadline: new Date('2026-11-28'),
    minimumCgpa: 7.0,
    eligibleBranches: ['All Engineering', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical', 'Production', 'Aerospace', 'Metallurgy'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 1,
    skills: ['Python', 'Java', 'Data Structures', 'SQL', 'GenAI Basics'],
    preferredSkills: ['Problem Solving', 'Data Analytics'],
    applyUrl: 'https://www.tcs.com/careers',
    officialSourceUrl: 'https://www.tcs.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.0', isMandatory: true }
    ]
  },
  {
    companySlug: 'tcs-digital',
    title: 'Prime Research & Engineering Trainee',
    role: 'R&D Software Engineer',
    type: OpportunityType.FULL_TIME,
    status: OpportunityStatus.OPEN,
    location: 'Pune / Bangalore / Chennai',
    workMode: 'Hybrid',
    salaryMin: 950000,
    salaryMax: 950000,
    stipend: null,
    deadline: new Date('2026-12-15'),
    minimumCgpa: 7.5,
    eligibleBranches: ['CSE', 'IT', 'ECE', 'EEE', 'All Engineering'],
    eligibleGraduationYears: [2026],
    maximumBacklogs: 0,
    skills: ['Algorithms', 'Python', 'C++', 'Machine Learning'],
    preferredSkills: ['Deep Learning', 'PyTorch'],
    applyUrl: 'https://www.tcs.com/careers',
    officialSourceUrl: 'https://www.tcs.com/careers',
    sourceType: 'official_careers',
    isMock: true,
    criteria: [
      { criterionType: 'CGPA', operator: 'GTE', requiredValue: '7.5', isMandatory: true }
    ]
  }
];

async function seed() {
  console.log('--- Starting Idempotent Mock Dataset Seeding ---');

  // 1. Clean up old mock opportunities safely
  console.log('Cleaning existing mock opportunities...');
  await prisma.opportunity.deleteMany({
    where: { isMock: true }
  });

  // Also remove old mock duplicate/unrelated companies if any
  const validSlugs = companies.map(c => c.slug);
  await prisma.company.deleteMany({
    where: {
      slug: { notIn: validSlugs },
      opportunities: { none: {} } // only if no real opportunities exist
    }
  });

  // 2. Upsert the exact 20 companies
  console.log(`Upserting ${companies.length} unique companies...`);
  const companyMap = new Map();

  for (const comp of companies) {
    const record = await prisma.company.upsert({
      where: { slug: comp.slug },
      update: {
        name: comp.name,
        industry: comp.industry,
        description: comp.description,
        website: comp.website,
        logoUrl: comp.logoUrl,
        active: true
      },
      create: {
        name: comp.name,
        slug: comp.slug,
        industry: comp.industry,
        description: comp.description,
        website: comp.website,
        logoUrl: comp.logoUrl,
        active: true
      }
    });
    companyMap.set(comp.slug, record);
    console.log(`✓ Company: ${record.name} (${record.slug})`);
  }

  // 3. Create/Upsert the 27 deterministic mock opportunities
  console.log(`\nInserting/Updating ${opportunities.length} distinct mock opportunities...`);
  let createdCount = 0;

  for (const opp of opportunities) {
    const comp = companyMap.get(opp.companySlug);
    if (!comp) {
      console.warn(`Company not found for slug: ${opp.companySlug}`);
      continue;
    }

    const { companySlug, criteria, ...oppData } = opp;

    const existingOpp = await prisma.opportunity.findFirst({
      where: {
        companyId: comp.id,
        title: opp.title,
        type: opp.type
      }
    });

    if (existingOpp) {
      await prisma.opportunity.update({
        where: { id: existingOpp.id },
        data: {
          ...oppData,
          verifiedAt: new Date(),
          lastCheckedAt: new Date()
        }
      });
    } else {
      await prisma.opportunity.create({
        data: {
          ...oppData,
          companyId: comp.id,
          verifiedAt: new Date(),
          lastCheckedAt: new Date()
        }
      });
    }

    createdCount++;
    console.log(`✓ [${comp.name}] ${opp.title} (${opp.type})`);
  }

  console.log('\n--- Seed Verification ---');
  const finalCompanies = await prisma.company.count();
  const finalOpps = await prisma.opportunity.count();
  console.log(`Total Companies in DB: ${finalCompanies}`);
  console.log(`Total Opportunities in DB: ${finalOpps}`);
  console.log('Seeding completed successfully.');

  await prisma.$disconnect();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
