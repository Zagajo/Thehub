// In-memory persistent data store with mock and Supabase sync capability
export const initialNISRIndicators = [
  {
    id: 'nisr-1',
    code: 'LFS_EMP_SERVICES',
    name: 'Services Sector Employment Share',
    value: 38.6,
    unit: '% of total employed',
    category: 'Labour Market',
    trend: '+2.4% YoY',
    trendDirection: 'up',
    source: 'National Institute of Statistics of Rwanda (NISR)',
    dataset: 'Labour Force Survey (LFS) Q4 2024 / Annual 2025',
    provenance: 'Formal and informal services employment across commercial, ICT, and financial sectors.',
    targetSkills: ['Data Analytics', 'Customer Relations', 'Digital Marketing', 'Financial Literacy'],
    priorityLevel: 'High'
  },
  {
    id: 'nisr-2',
    code: 'LFS_YOUTH_LFPR',
    name: 'Youth Labour Force Participation Rate',
    value: 52.4,
    unit: '% of youth (16-30 yrs)',
    category: 'Youth & Inclusion',
    trend: '+1.8% YoY',
    trendDirection: 'up',
    source: 'NISR LFS Report',
    dataset: 'Youth Employment Monograph (LFS Series)',
    provenance: 'Measures economically active youth cohort in urban and rural districts.',
    targetSkills: ['Full-Stack Web Development', 'Agri-Tech', 'Professional English', 'Problem Solving'],
    priorityLevel: 'Critical'
  },
  {
    id: 'nisr-3',
    code: 'ICT_HH_ACCESS',
    name: 'Internet Access & Connectivity Rate',
    value: 34.2,
    unit: '% of households',
    category: 'Digital Infrastructure',
    trend: '+4.1% YoY',
    trendDirection: 'up',
    source: 'NISR & RURA Joint Telemetry',
    dataset: 'Establishment Census & Household ICT Access Survey',
    provenance: 'National broadband & mobile data reach. Driving need for low-bandwidth digital tools.',
    targetSkills: ['Mobile-First Web Development', 'Offline PWA Architectures', 'Low-Bandwidth UX'],
    priorityLevel: 'High'
  },
  {
    id: 'nisr-4',
    code: 'LFS_EMP_AGRI',
    name: 'Agriculture & Agro-Processing Share',
    value: 44.8,
    unit: '% of working population',
    category: 'Agritech & Food Systems',
    trend: '-1.5% YoY (transitioning to high-value agro-industry)',
    trendDirection: 'neutral',
    source: 'NISR Agricultural Survey',
    dataset: 'Agricultural Household Survey & NST2 Sector Benchmarks',
    provenance: 'Primary agricultural workforce actively adopting digital supply chains and cooperative management.',
    targetSkills: ['Agribusiness Management', 'Cold Chain Logistics', 'Soil Data Analytics', 'Export Compliance'],
    priorityLevel: 'High'
  },
  {
    id: 'nisr-5',
    code: 'TOUR_HOSP_REV',
    name: 'Tourism & MICE Hospitality Growth',
    value: 17.3,
    unit: '% sector GDP growth',
    category: 'Hospitality & Services',
    trend: '+3.5% YoY',
    trendDirection: 'up',
    source: 'Rwanda Development Board (RDB) & NISR Economic Statistics',
    dataset: 'National Accounts Statistics & Tourism Satellite Account',
    provenance: 'High-value meetings, incentives, conferences, exhibitions and eco-tourism service requirements.',
    targetSkills: ['Multilingual Communication', 'Event Management', 'Sustainable Eco-Tourism', 'Service Excellence'],
    priorityLevel: 'Medium'
  }
];

export const initialSkills = [
  { id: 'sk-1', name: 'SQL & Relational Databases', category: 'Technology', level: 'Intermediate', marketDemand: 'Very High', sector: 'Data & Finance' },
  { id: 'sk-2', name: 'Python for Data Analysis', category: 'Technology', level: 'Intermediate', marketDemand: 'Very High', sector: 'Data & Finance' },
  { id: 'sk-3', name: 'React & Modern Frontend', category: 'Technology', level: 'Intermediate', marketDemand: 'High', sector: 'Software' },
  { id: 'sk-4', name: 'Professional English for Business', category: 'Languages', level: 'Advanced', marketDemand: 'Universal', sector: 'All Sectors' },
  { id: 'sk-5', name: 'Kinyarwanda Technical Terminology', category: 'Languages', level: 'Intermediate', marketDemand: 'High', sector: 'Public & Community' },
  { id: 'sk-6', name: 'Agribusiness Financial Records', category: 'Business', level: 'Intermediate', marketDemand: 'High', sector: 'Agriculture' },
  { id: 'sk-7', name: 'Digital Marketing & Social Commerce', category: 'Professional Skills', level: 'Beginner', marketDemand: 'High', sector: 'Commerce' },
  { id: 'sk-8', name: 'GIS & Agricultural Spatial Data', category: 'Data', level: 'Advanced', marketDemand: 'Growing', sector: 'Agriculture & Planning' },
  { id: 'sk-9', name: 'Hospitality & Guest Operations', category: 'Tourism', level: 'Beginner', marketDemand: 'High', sector: 'Hospitality' }
];

export const initialCourses = [
  {
    id: 'c-1',
    slug: 'rwanda-data-analyst-pathway',
    title: 'Data Analytics with Python & SQL',
    tagline: 'Master real-world data analysis aligned with Rwanda NISR economic benchmarks',
    category: 'Technology',
    difficulty: 'Intermediate',
    duration: '6 Weeks (Self-paced)',
    lessonsCount: 18,
    nisrSector: 'Services & Financial Tech',
    enrollmentCount: 1420,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    skillsGained: ['Python for Data Analysis', 'SQL & Relational Databases', 'Data Cleaning', 'Dashboarding'],
    description: 'A hands-on program designed around genuine Rwandan industry data. Learn to import, clean, query, and visualize dataset indicators from NISR and local micro-finance institutions.',
    syllabus: [
      {
        module: 'Module 1: Foundations of Economic & Survey Data',
        lessons: [
          { id: 'l1', title: 'Understanding Rwanda NISR Labour Force Data', duration: '25 min', completed: true },
          { id: 'l2', title: 'Tabular Data Cleaning with Pandas', duration: '40 min', completed: true },
          { id: 'l3', title: 'Exploratory Data Analysis on Kigali Youth Demographics', duration: '35 min', completed: false }
        ]
      },
      {
        module: 'Module 2: Practical SQL for Decision Support',
        lessons: [
          { id: 'l4', title: 'Writing Resilient PostgreSQL Queries', duration: '45 min', completed: false },
          { id: 'l5', title: 'Aggregating Provincial Labour Statistics', duration: '50 min', completed: false },
          { id: 'l6', title: 'Building Automated Views & Reports', duration: '30 min', completed: false }
        ]
      },
      {
        module: 'Module 3: Capstone Evidence Project',
        lessons: [
          { id: 'l7', title: 'Rwanda District Economic Opportunity Dashboard Brief', duration: '60 min', completed: false }
        ]
      }
    ]
  },
  {
    id: 'c-2',
    slug: 'fullstack-web-rwanda',
    title: 'Full-Stack Web Development: Fast & Low-Bandwidth',
    tagline: 'Build resilient web apps optimized for East African connectivity',
    category: 'Technology',
    difficulty: 'Intermediate',
    duration: '8 Weeks',
    lessonsCount: 24,
    nisrSector: 'Digital Services & ICT',
    enrollmentCount: 2190,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    skillsGained: ['React & Modern Frontend', 'Node.js APIs', 'Offline-First PWAs', 'Tailwind CSS'],
    description: 'Learn modern web engineering with an essential constraint: real users in Rwanda need fast loading, offline resilience, and mobile optimization.',
    syllabus: [
      {
        module: 'Module 1: Modern Component Architecture',
        lessons: [
          { id: 'l21', title: 'React 19 & Tailwind Responsive Design', duration: '30 min', completed: true },
          { id: 'l22', title: 'Client-side State & Resilient UI States', duration: '40 min', completed: false }
        ]
      },
      {
        module: 'Module 2: Resilient REST APIs with Express',
        lessons: [
          { id: 'l23', title: 'Designing Clean API Contracts', duration: '45 min', completed: false },
          { id: 'l24', title: 'Handling Connectivity Drops Gracefully', duration: '35 min', completed: false }
        ]
      }
    ]
  },
  {
    id: 'c-3',
    slug: 'business-english-communications',
    title: 'Professional English & Executive Communication',
    tagline: 'Confidently present proposals, lead meetings, and communicate internationally',
    category: 'Languages',
    difficulty: 'Beginner to Advanced',
    duration: '4 Weeks',
    lessonsCount: 14,
    nisrSector: 'Services, MICE & International Trade',
    enrollmentCount: 3450,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    skillsGained: ['Professional English for Business', 'Pitching & Presentation', 'Cross-Cultural Email Writing'],
    description: 'Designed specifically for Rwandan professionals stepping into regional East African Community (EAC) trade, tech hubs, and conference coordination.',
    syllabus: [
      {
        module: 'Module 1: Workplace Communication Protocols',
        lessons: [
          { id: 'l31', title: 'Crafting High-Impact Executive Summaries', duration: '20 min', completed: true },
          { id: 'l32', title: 'Active Listening in Multilingual Meetings', duration: '30 min', completed: true }
        ]
      }
    ]
  },
  {
    id: 'c-4',
    slug: 'modern-agribusiness-cooperatives',
    title: 'Modern Agribusiness & Cooperative Supply Chains',
    tagline: 'Digitize farm records, manage cooperatives, and access premium markets',
    category: 'Agriculture',
    difficulty: 'Beginner',
    duration: '5 Weeks',
    lessonsCount: 16,
    nisrSector: 'Agriculture & Food Systems',
    enrollmentCount: 1820,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    skillsGained: ['Agribusiness Financial Records', 'Supply Chain Traceability', 'Export Quality Standards'],
    description: 'Directly aligned with NISR agriculture transformation data. Learn digital record-keeping, cooperative bookkeeping, and value-addition techniques.',
    syllabus: [
      {
        module: 'Module 1: Cooperative Governance & Finance',
        lessons: [
          { id: 'l41', title: 'Digital Bookkeeping for Agri-Cooperatives', duration: '35 min', completed: false },
          { id: 'l42', title: 'Post-Harvest Loss Reduction Strategies', duration: '40 min', completed: false }
        ]
      }
    ]
  },
  {
    id: 'c-5',
    slug: 'hospitality-mice-operations',
    title: 'MICE Tourism & High-End Hospitality Operations',
    tagline: 'World-class service excellence for Kigali’s conference & eco-tourism ecosystem',
    category: 'Tourism',
    difficulty: 'Intermediate',
    duration: '4 Weeks',
    lessonsCount: 12,
    nisrSector: 'Hospitality & Tourism',
    enrollmentCount: 970,
    rating: 4.78,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    skillsGained: ['Hospitality & Guest Operations', 'Conference Event Coordination', 'Service Quality Standards'],
    description: 'Equipping youth with premier customer care, conference logistics management, and eco-lodge operational skills.',
    syllabus: [
      {
        module: 'Module 1: Guest Journey & Cultural Intelligence',
        lessons: [
          { id: 'l51', title: 'International Guest Etiquette & Protocol', duration: '30 min', completed: false }
        ]
      }
    ]
  }
];

export const initialLearningPathways = [
  {
    id: 'path-1',
    title: 'Certified Junior Data Analyst (Rwanda Priority Sector)',
    role: 'Junior Data Analyst',
    targetSector: 'Services & Financial Technology',
    nisrEvidence: 'Services employment accounts for 38.6% of labour force with double-digit growth in digital transaction processing.',
    estimatedDuration: '10 Weeks',
    requiredSkills: [
      { name: 'SQL & Relational Databases', requiredLevel: 80, currentLevel: 65 },
      { name: 'Python for Data Analysis', requiredLevel: 75, currentLevel: 40 },
      { name: 'Professional English for Business', requiredLevel: 85, currentLevel: 70 },
      { name: 'NISR Statistical Literacy', requiredLevel: 70, currentLevel: 55 }
    ],
    recommendedCourses: ['c-1', 'c-3'],
    capstoneBrief: 'Analyze 30 Rwandan district indicators from NISR and produce a 3-page policy summary with interactive charts.'
  },
  {
    id: 'path-2',
    title: 'Full-Stack Software Practitioner',
    role: 'Web Application Developer',
    targetSector: 'Digital Services & Creative Economy',
    nisrEvidence: 'Youth participation is 52.4% with Kigali technology hubs creating regional outsourcing demand.',
    estimatedDuration: '12 Weeks',
    requiredSkills: [
      { name: 'React & Modern Frontend', requiredLevel: 85, currentLevel: 70 },
      { name: 'Node.js APIs', requiredLevel: 80, currentLevel: 50 },
      { name: 'SQL & Relational Databases', requiredLevel: 70, currentLevel: 65 }
    ],
    recommendedCourses: ['c-2', 'c-1'],
    capstoneBrief: 'Build a low-bandwidth, offline-capable inventory and order tracker for a Musanze agribusiness cooperative.'
  },
  {
    id: 'path-3',
    title: 'Agri-Tech & Cooperative Operations Manager',
    role: 'Agribusiness Operations Specialist',
    targetSector: 'Agriculture & Food Processing (44.8% of national employment)',
    nisrEvidence: 'Strategic NST2 transition to value-addition and export-grade agro-processing requires digital accounting.',
    estimatedDuration: '8 Weeks',
    requiredSkills: [
      { name: 'Agribusiness Financial Records', requiredLevel: 85, currentLevel: 60 },
      { name: 'GIS & Agricultural Spatial Data', requiredLevel: 65, currentLevel: 30 },
      { name: 'Professional English for Business', requiredLevel: 75, currentLevel: 70 }
    ],
    recommendedCourses: ['c-4', 'c-3'],
    capstoneBrief: 'Prepare a 1-year digitization and cashflow management plan for a 150-member coffee cooperative.'
  }
];

export const initialAssessments = [
  {
    id: 'as-1',
    title: 'Rwanda Labour & Economic Data Analysis (Tri-Part)',
    courseId: 'c-1',
    skillTarget: 'SQL & Relational Databases / Python',
    totalDuration: '45 mins',
    theoryWeight: 30,
    practicalWeight: 40,
    projectWeight: 30,
    theoryQuestions: [
      {
        id: 'q1',
        prompt: 'According to NISR Labour Force Survey standards, how is the "Youth" cohort defined in Rwanda?',
        options: ['15-24 years', '16-30 years', '18-35 years', '14-28 years'],
        correctIndex: 1,
        explanation: 'Rwanda national policy and NISR monographs classify youth as ages 16 to 30.'
      },
      {
        id: 'q2',
        prompt: 'Which SQL clause is strictly executed before the HAVING clause in a PostgreSQL query?',
        options: ['SELECT', 'ORDER BY', 'GROUP BY', 'LIMIT'],
        correctIndex: 2,
        explanation: 'In SQL logical query processing, GROUP BY groups the rows before HAVING filters grouped records.'
      }
    ],
    practicalTask: {
      instruction: 'Write a SQL query that calculates the total youth population and average employment rate for each Province where youth population exceeds 200,000.',
      starterCode: 'SELECT province, \n       SUM(youth_count) AS total_youth, \n       AVG(employment_rate) AS avg_emp_rate\nFROM district_demographics\nGROUP BY province\nHAVING SUM(youth_count) > 200000\nORDER BY total_youth DESC;',
      expectedOutputSnippet: 'Kigali City | 320,400 | 54.2%'
    },
    capstoneBrief: 'Upload your verified GitHub repo or clean CSV dataset link representing the NISR district analysis.'
  },
  {
    id: 'as-2',
    title: 'Resilient Frontend Engineering Assessment',
    courseId: 'c-2',
    skillTarget: 'React & Modern Frontend',
    totalDuration: '40 mins',
    theoryWeight: 30,
    practicalWeight: 40,
    projectWeight: 30,
    theoryQuestions: [
      {
        id: 'q21',
        prompt: 'Why is low-bandwidth architecture crucial for digital products in East African contexts?',
        options: [
          'Because mobile browsers do not support modern JavaScript',
          'Because NISR telemetry shows variable household broadband access (34.2%), requiring low payload sizes and offline persistence',
          'Because Tailwind CSS requires low bandwidth to compile',
          'Because servers cannot run outside Europe'
        ],
        correctIndex: 1,
        explanation: 'Official NISR ICT data shows that optimizing assets and enabling offline mode directly increases digital inclusion.'
      }
    ],
    practicalTask: {
      instruction: 'Implement an offline-resilient cache hook in React that persists user progress in localStorage when the navigator is offline.',
      starterCode: 'function useOfflineSync(key, initialValue) {\n  const [state, setState] = useState(() => {\n    const cached = localStorage.getItem(key);\n    return cached ? JSON.parse(cached) : initialValue;\n  });\n  // Complete sync effect\n}',
      expectedOutputSnippet: 'Synced 100% on reconnect'
    },
    capstoneBrief: 'Submit a functional URL of your offline-first single page app.'
  }
];

export const adminUserProfile = {
  id: 'usr-admin-01',
  name: 'Dr. Alice Mukamana',
  email: 'alice.mukamana@thehub.rw',
  role: 'admin',
  title: 'Director of Skills & National Statistics (NST2 Lead)',
  location: 'Kigali City, Rwanda',
  streakDays: 42,
  enrolledCourses: ['c-1', 'c-2', 'c-3', 'c-4'],
  completedLessons: ['l1', 'l2', 'l3', 'l21', 'l31'],
  assessedSkills: [
    { name: 'SQL & Relational Databases', score: 95, level: 'Specialist (Level 3)' },
    { name: 'NISR Statistical Literacy', score: 98, level: 'Specialist (Level 3)' },
    { name: 'Professional English for Business', score: 92, level: 'Specialist (Level 3)' }
  ],
  verifiedCredentials: [
    {
      id: 'cred-admin-01',
      title: 'National Skills Auditor & NST2 Lead',
      issuedBy: 'NISR & National Skills Council Rwanda',
      issueDate: '2026-01-15',
      evidenceUrl: 'https://thehub.rw/verify/cred-admin-01',
      skills: ['National Strategy for Transformation (NST2)', 'Labour Market Telemetry'],
      score: 'Mastery Level 3'
    }
  ],
  peerMatches: []
};

export const initialLearnersList = [
  {
    id: 'usr-demo-01',
    name: 'Kezia Umutoni',
    email: 'kezia.umutoni@thehub.rw',
    role: 'Learner',
    targetRole: 'Junior Data Analyst',
    location: 'Gasabo District, Kigali City',
    province: 'Kigali City',
    streakDays: 14,
    status: 'Active',
    sessionStatus: 'Signed In (Online)',
    lastSignedIn: '2 minutes ago',
    sessionDuration: '46 mins',
    device: 'MacBook Pro (Chrome 128)',
    network: 'Kigali Fiber (Liquid Telecom)',
    currentActivity: 'Querying SQL Join benchmarks on NISR LFS',
    studyHoursTotal: 34.5,
    learningVelocity: '3.8 lessons/week',
    hasFinishedCertificate: true,
    certificateTitle: 'CERT-RW-2026-001 (Distinction 94%)',
    quizAverage: 88,
    enrolledCourses: ['c-1', 'c-3'],
    progressPercentage: 68,
    completedLessonsCount: 4,
    totalLessonsCount: 6,
    assessedSkills: [
      { name: 'SQL & Relational Databases', score: 65, level: 'Practitioner (Level 2)' },
      { name: 'Python for Data Analysis', score: 40, level: 'Foundation (Level 1)' },
      { name: 'Professional English for Business', score: 70, level: 'Practitioner (Level 2)' },
      { name: 'NISR Statistical Literacy', score: 55, level: 'Foundation (Level 1)' }
    ],
    verifiedCredentialsCount: 2,
    lastActive: 'Just now'
  },
  {
    id: 'usr-02',
    name: 'Eric Mugabo',
    email: 'eric.mugabo@agrirwanda.org',
    role: 'Peer Helper',
    targetRole: 'Agribusiness Operations Specialist',
    location: 'Musanze District, Northern Province',
    province: 'Northern Province',
    streakDays: 21,
    status: 'Active',
    sessionStatus: 'Signed In (Online)',
    lastSignedIn: '14 minutes ago',
    sessionDuration: '1h 12m',
    device: 'ThinkPad T14 (Firefox ESR)',
    network: 'MTN 4G Musanze Hub',
    currentActivity: 'Submitting Farm Cooperative Ledger Project',
    studyHoursTotal: 48.0,
    learningVelocity: '4.2 lessons/week',
    hasFinishedCertificate: true,
    certificateTitle: 'CERT-RW-2026-002 (High Honours 92%)',
    quizAverage: 92,
    enrolledCourses: ['c-4', 'c-3'],
    progressPercentage: 82,
    completedLessonsCount: 7,
    totalLessonsCount: 8,
    assessedSkills: [
      { name: 'Agribusiness Financial Records', score: 85, level: 'Specialist (Level 3)' },
      { name: 'GIS & Agricultural Spatial Data', score: 62, level: 'Practitioner (Level 2)' },
      { name: 'Professional English for Business', score: 75, level: 'Practitioner (Level 2)' }
    ],
    verifiedCredentialsCount: 3,
    lastActive: '14 minutes ago'
  },
  {
    id: 'usr-03',
    name: 'Claudine Nyirahabimana',
    email: 'claudine.nyira@dev.rw',
    role: 'Learner',
    targetRole: 'Web Application Developer',
    location: 'Huye District, Southern Province',
    province: 'Southern Province',
    streakDays: 9,
    status: 'Active',
    sessionStatus: 'Signed In (Mobile)',
    lastSignedIn: '25 minutes ago',
    sessionDuration: '30 mins',
    device: 'Tecno Camon 20 (Chrome Android)',
    network: 'Airtel 4G Southern Province',
    currentActivity: 'Building Responsive React Layout for TVETs',
    studyHoursTotal: 22.5,
    learningVelocity: '2.5 lessons/week',
    hasFinishedCertificate: false,
    certificateTitle: 'Pending Final Capstone',
    quizAverage: 76,
    enrolledCourses: ['c-2', 'c-1'],
    progressPercentage: 45,
    completedLessonsCount: 3,
    totalLessonsCount: 7,
    assessedSkills: [
      { name: 'React & Modern Frontend', score: 72, level: 'Practitioner (Level 2)' },
      { name: 'Node.js APIs', score: 50, level: 'Foundation (Level 1)' },
      { name: 'SQL & Relational Databases', score: 48, level: 'Foundation (Level 1)' }
    ],
    verifiedCredentialsCount: 1,
    lastActive: '25 minutes ago'
  },
  {
    id: 'usr-04',
    name: 'Pacifique Twahirwa',
    email: 'pacifique.t@ecotours.rw',
    role: 'Learner',
    targetRole: 'Tourism & Hospitality Lead',
    location: 'Rubavu District, Western Province',
    province: 'Western Province',
    streakDays: 16,
    status: 'Active',
    sessionStatus: 'Signed In (Online)',
    lastSignedIn: '38 minutes ago',
    sessionDuration: '55 mins',
    device: 'Dell Latitude (Edge Windows 11)',
    network: 'Kivu Serena Wi-Fi (CanalBox)',
    currentActivity: 'Reviewing MICE Event Protocols & Multilingual Phrases',
    studyHoursTotal: 39.0,
    learningVelocity: '3.5 lessons/week',
    hasFinishedCertificate: true,
    certificateTitle: 'CERT-RW-2026-004 (Honours 89%)',
    quizAverage: 86,
    enrolledCourses: ['c-5', 'c-3'],
    progressPercentage: 74,
    completedLessonsCount: 5,
    totalLessonsCount: 6,
    assessedSkills: [
      { name: 'Hospitality & Guest Operations', score: 80, level: 'Specialist (Level 3)' },
      { name: 'Professional English for Business', score: 85, level: 'Specialist (Level 3)' }
    ],
    verifiedCredentialsCount: 2,
    lastActive: '38 minutes ago'
  },
  {
    id: 'usr-05',
    name: 'Divine Mutesi',
    email: 'divine.mutesi@fintech.rw',
    role: 'Peer Tutor',
    targetRole: 'Junior Data Analyst',
    location: 'Kicukiro District, Kigali City',
    province: 'Kigali City',
    streakDays: 28,
    status: 'Active',
    sessionStatus: 'Signed In (Online)',
    lastSignedIn: '5 minutes ago',
    sessionDuration: '2h 05m',
    device: 'MacBook Air M2 (Safari 17)',
    network: 'BK TecHouse 5G Mesh',
    currentActivity: 'Mentoring 3 peer learners on Python Pandas joins',
    studyHoursTotal: 64.0,
    learningVelocity: '5.1 lessons/week',
    hasFinishedCertificate: true,
    certificateTitle: 'CERT-RW-2026-003 (Summa Cum Laude 96%)',
    quizAverage: 95,
    enrolledCourses: ['c-1', 'c-2'],
    progressPercentage: 92,
    completedLessonsCount: 9,
    totalLessonsCount: 10,
    assessedSkills: [
      { name: 'Python for Data Analysis', score: 88, level: 'Specialist (Level 3)' },
      { name: 'SQL & Relational Databases', score: 84, level: 'Specialist (Level 3)' },
      { name: 'NISR Statistical Literacy', score: 78, level: 'Practitioner (Level 2)' }
    ],
    verifiedCredentialsCount: 4,
    lastActive: '5 minutes ago'
  },
  {
    id: 'usr-06',
    name: 'Jean de Dieu Nshimiyimana',
    email: 'j.nshimiyimana@easterncoop.rw',
    role: 'Learner',
    targetRole: 'Agribusiness Operations Specialist',
    location: 'Rwamagana District, Eastern Province',
    province: 'Eastern Province',
    streakDays: 6,
    status: 'Active',
    sessionStatus: 'Idle (15m)',
    lastSignedIn: '1 hour ago',
    sessionDuration: '18 mins',
    device: 'Samsung Galaxy A15 (Android 14)',
    network: 'MTN 3G Eastern Rural Network',
    currentActivity: 'Reading Lesson 2: Agribusiness Supply Invoicing',
    studyHoursTotal: 14.0,
    learningVelocity: '1.8 lessons/week',
    hasFinishedCertificate: false,
    certificateTitle: 'Enrolled — Module 2/5',
    quizAverage: 65,
    enrolledCourses: ['c-4'],
    progressPercentage: 35,
    completedLessonsCount: 2,
    totalLessonsCount: 5,
    assessedSkills: [
      { name: 'Agribusiness Financial Records', score: 58, level: 'Foundation (Level 1)' },
      { name: 'GIS & Agricultural Spatial Data', score: 32, level: 'Foundation (Level 1)' }
    ],
    verifiedCredentialsCount: 0,
    lastActive: '1 hour ago'
  },
  {
    id: 'usr-07',
    name: 'Aline Uwase',
    email: 'aline.uwase@kigalitech.rw',
    role: 'Learner',
    targetRole: 'Web Application Developer',
    location: 'Nyarugenge District, Kigali City',
    province: 'Kigali City',
    streakDays: 12,
    status: 'Active',
    sessionStatus: 'Signed In (Online)',
    lastSignedIn: '8 minutes ago',
    sessionDuration: '40 mins',
    device: 'HP Pavilion (Chrome Windows 10)',
    network: 'Kigali Public City Wi-Fi',
    currentActivity: 'Debugging REST API endpoints in Node.js',
    studyHoursTotal: 29.5,
    learningVelocity: '3.0 lessons/week',
    hasFinishedCertificate: false,
    certificateTitle: 'In Progress (57%)',
    quizAverage: 81,
    enrolledCourses: ['c-2'],
    progressPercentage: 57,
    completedLessonsCount: 4,
    totalLessonsCount: 7,
    assessedSkills: [
      { name: 'React & Modern Frontend', score: 68, level: 'Practitioner (Level 2)' },
      { name: 'Node.js APIs', score: 62, level: 'Practitioner (Level 2)' }
    ],
    verifiedCredentialsCount: 1,
    lastActive: '8 minutes ago'
  },
  {
    id: 'usr-08',
    name: 'Olivier Tuyishime',
    email: 'olivier.tuyishime@gicumbi.gov.rw',
    role: 'Learner',
    targetRole: 'Junior Data Analyst',
    location: 'Gicumbi District, Northern Province',
    province: 'Northern Province',
    streakDays: 18,
    status: 'Active',
    sessionStatus: 'Signed In (Online)',
    lastSignedIn: '19 minutes ago',
    sessionDuration: '1h 05m',
    device: 'Lenovo Ideapad (Ubuntu Linux 24.04)',
    network: 'Northern Telecom Fiber',
    currentActivity: 'Synthesizing NISR Household Income Q3 data',
    studyHoursTotal: 41.0,
    learningVelocity: '4.0 lessons/week',
    hasFinishedCertificate: true,
    certificateTitle: 'CERT-RW-2026-005 (High Honours 91%)',
    quizAverage: 89,
    enrolledCourses: ['c-1', 'c-3'],
    progressPercentage: 88,
    completedLessonsCount: 5,
    totalLessonsCount: 6,
    assessedSkills: [
      { name: 'SQL & Relational Databases', score: 82, level: 'Specialist (Level 3)' },
      { name: 'NISR Statistical Literacy', score: 79, level: 'Practitioner (Level 2)' }
    ],
    verifiedCredentialsCount: 2,
    lastActive: '19 minutes ago'
  }
];

export const initialLearnerTasks = [
  {
    id: 'task-01',
    learnerId: 'usr-demo-01',
    learnerName: 'Kezia Umutoni',
    learnerDistrict: 'Gasabo District, Kigali City',
    courseTitle: 'Data Analytics with Python & SQL',
    taskType: 'Capstone Evidence Project',
    title: 'Rwanda 30-District Economic Opportunity Dashboard Brief',
    submissionUrl: 'https://github.com/kezia-umutoni/nisr-district-metrics',
    submittedAt: '2026-10-02 14:30 CAT',
    status: 'Pending Review',
    theoryScore: 80,
    practicalScore: 90,
    currentScore: 85,
    rubricCriteria: [
      { name: 'NISR Indicator Normalization', maxPts: 30, score: 28 },
      { name: 'PostgreSQL Query Logic', maxPts: 40, score: 38 },
      { name: 'District Policy Insight Clarity', maxPts: 30, score: 26 }
    ],
    feedback: 'Excellent use of LFS services and youth LFPR figures across Gasabo and Musanze. Add confidence intervals to chart visualisations.'
  },
  {
    id: 'task-02',
    learnerId: 'usr-03',
    learnerName: 'Claudine Nyirahabimana',
    learnerDistrict: 'Huye District, Southern Province',
    courseTitle: 'Full-Stack Web Development',
    taskType: 'Practical Code Challenge',
    title: 'Offline-First Local Storage Hook for Rural Sync',
    submissionUrl: 'https://github.com/claudine-nyira/offline-sync-pwa',
    submittedAt: '2026-10-02 18:15 CAT',
    status: 'Pending Review',
    theoryScore: 70,
    practicalScore: 85,
    currentScore: 78,
    rubricCriteria: [
      { name: 'Offline Interception & IndexedDB', maxPts: 40, score: 34 },
      { name: 'Tailwind Responsive Performance', maxPts: 30, score: 27 },
      { name: 'Graceful Error Recovery', maxPts: 30, score: 25 }
    ],
    feedback: ''
  },
  {
    id: 'task-03',
    learnerId: 'usr-02',
    learnerName: 'Eric Mugabo',
    learnerDistrict: 'Musanze District, Northern Province',
    courseTitle: 'Modern Agribusiness & Cooperative Supply Chains',
    taskType: 'Employer Challenge Task',
    title: 'Coffee Harvest Data & Payment Reconciler',
    submissionUrl: 'https://github.com/eric-mugabo/coffee-coop-ledger',
    submittedAt: '2026-10-01 11:20 CAT',
    status: 'Verified & Approved',
    theoryScore: 90,
    practicalScore: 95,
    currentScore: 93,
    rubricCriteria: [
      { name: 'Cooperative Farmer Deductions Calculation', maxPts: 40, score: 39 },
      { name: 'Export Grade Compliance Documentation', maxPts: 30, score: 28 },
      { name: 'Kinyarwanda & French Ledger Summary', maxPts: 30, score: 29 }
    ],
    feedback: 'Approved for RWF 150,000 Micro-Grant shortlist with Rwanda Agribusiness Federation.'
  },
  {
    id: 'task-04',
    learnerId: 'usr-04',
    learnerName: 'Pacifique Twahirwa',
    learnerDistrict: 'Rubavu District, Western Province',
    courseTitle: 'MICE Tourism & High-End Hospitality',
    taskType: 'Practical Brief',
    title: 'Multilingual Guest Concierge & Tour Itinerary Guide',
    submissionUrl: 'https://thehub.rw/submissions/pacifique-tour-guide.pdf',
    submittedAt: '2026-09-30 09:40 CAT',
    status: 'Verified & Approved',
    theoryScore: 85,
    practicalScore: 90,
    currentScore: 88,
    rubricCriteria: [
      { name: 'Cultural Intelligence & Etiquette', maxPts: 40, score: 36 },
      { name: 'Executive Itinerary Coordination', maxPts: 30, score: 27 },
      { name: 'Eco-Tourism Protocol Compliance', maxPts: 30, score: 27 }
    ],
    feedback: 'Approved. Forwarded to East Africa Eco-Lodges Group HR.'
  }
];

export const initialCertificateWinners = [
  {
    id: 'CERT-RW-2026-001',
    learnerId: 'usr-demo-01',
    learnerName: 'Kezia Umutoni',
    learnerEmail: 'kezia.umutoni@thehub.rw',
    district: 'Gasabo District, Kigali City',
    courseId: 'c-1',
    courseTitle: 'Data Analytics with Python & SQL',
    issueDate: '2026-09-28',
    grade: '94%',
    distinction: 'First Class Distinction',
    verificationHash: 'sha256-nisr-hub-cert-7a91bf42e09c81',
    skills: ['SQL & Relational Databases', 'Python for Data Analysis', 'NISR Statistical Literacy'],
    status: 'Issued & Active',
    issuingAuthority: 'National Institute of Statistics of Rwanda (NISR) & The Hub Academic Council',
    signedBy: 'Dr. Alice Mukamana (Director of Skills)'
  },
  {
    id: 'CERT-RW-2026-002',
    learnerId: 'usr-02',
    learnerName: 'Eric Mugabo',
    learnerEmail: 'eric.mugabo@agrirwanda.org',
    district: 'Musanze District, Northern Province',
    courseId: 'c-4',
    courseTitle: 'Modern Agribusiness & Cooperative Supply Chains',
    issueDate: '2026-09-25',
    grade: '92%',
    distinction: 'High Honours',
    verificationHash: 'sha256-nisr-hub-cert-8b10ca53f10d92',
    skills: ['Agribusiness Financial Records', 'Cooperative Ledger Systems', 'GIS Mapping'],
    status: 'Issued & Active',
    issuingAuthority: 'Ministry of Agriculture & NISR Skills Council',
    signedBy: 'Dr. Alice Mukamana (Director of Skills)'
  },
  {
    id: 'CERT-RW-2026-003',
    learnerId: 'usr-05',
    learnerName: 'Divine Mutesi',
    learnerEmail: 'divine.mutesi@fintech.rw',
    district: 'Kicukiro District, Kigali City',
    courseId: 'c-1',
    courseTitle: 'Data Analytics with Python & SQL',
    issueDate: '2026-09-20',
    grade: '96%',
    distinction: 'Summa Cum Laude / Cohort Gold',
    verificationHash: 'sha256-nisr-hub-cert-3c24ef64a21e03',
    skills: ['SQL Optimization', 'Python Automation', 'Economic Policy Models'],
    status: 'Issued & Active',
    issuingAuthority: 'National Institute of Statistics of Rwanda (NISR)',
    signedBy: 'Dr. Alice Mukamana (Director of Skills)'
  },
  {
    id: 'CERT-RW-2026-004',
    learnerId: 'usr-04',
    learnerName: 'Pacifique Twahirwa',
    learnerEmail: 'pacifique.t@ecotours.rw',
    district: 'Rubavu District, Western Province',
    courseId: 'c-5',
    courseTitle: 'MICE Tourism & High-End Hospitality',
    issueDate: '2026-09-15',
    grade: '89%',
    distinction: 'Honours Certification',
    verificationHash: 'sha256-nisr-hub-cert-9d35fa75b32f14',
    skills: ['Multilingual Protocol', 'Hospitality Operations', 'Eco-Tourism Standards'],
    status: 'Issued & Active',
    issuingAuthority: 'Rwanda Development Board (RDB) & The Hub',
    signedBy: 'Dr. Alice Mukamana (Director of Skills)'
  }
];

export const initialAdminAuditLog = [
  {
    id: 'log-101',
    action: 'Certificate Issued',
    details: 'Awarded "Data Analytics with Python & SQL" (Cert #CERT-RW-2026-001) to Kezia Umutoni with Distinction (94%)',
    operator: 'Dr. Alice Mukamana',
    timestamp: '2026-09-28 16:42 CAT',
    type: 'certificate'
  },
  {
    id: 'log-102',
    action: 'Capstone Review Approved',
    details: 'Reviewed and approved task "Coffee Harvest Data & Payment Reconciler" submitted by Eric Mugabo (Score: 93%)',
    operator: 'Dr. Alice Mukamana',
    timestamp: '2026-10-01 11:45 CAT',
    type: 'task'
  },
  {
    id: 'log-103',
    action: 'User Role Promoted',
    details: 'Promoted Divine Mutesi to Peer Tutor (Kicukiro Study Circle Facilitator)',
    operator: 'Dr. Alice Mukamana',
    timestamp: '2026-10-02 09:15 CAT',
    type: 'user'
  },
  {
    id: 'log-104',
    action: 'Curriculum Synchronized',
    details: 'Synchronized SQL course modules with NISR Labour Force Survey Q4 dataset updates',
    operator: 'System Automator',
    timestamp: '2026-10-02 18:00 CAT',
    type: 'curriculum'
  }
];

export const demoUserProfile = {
  id: 'usr-demo-01',
  name: 'Kezia Umutoni',
  email: 'kezia.umutoni@thehub.rw',
  role: 'Aspiring Junior Data Analyst',
  location: 'Gasabo District, Kigali City',
  streakDays: 14,
  enrolledCourses: ['c-1', 'c-3'],
  completedLessons: ['l1', 'l2', 'l31', 'l32'],
  assessedSkills: [
    { name: 'SQL & Relational Databases', score: 65, level: 'Practitioner (Level 2)' },
    { name: 'Python for Data Analysis', score: 40, level: 'Foundation (Level 1)' },
    { name: 'Professional English for Business', score: 70, level: 'Practitioner (Level 2)' },
    { name: 'NISR Statistical Literacy', score: 55, level: 'Foundation (Level 1)' }
  ],
  verifiedCredentials: [
    {
      id: 'cred-01',
      title: 'Rwanda Labour Statistics Literacy',
      issuedBy: 'The Hub — Verified Assessment Panel',
      issueDate: '2026-09-15',
      evidenceUrl: 'https://thehub.rw/verify/cred-01',
      skills: ['NISR Statistical Literacy', 'Data Interpretation'],
      score: '88% (Level 2 Verified)'
    },
    {
      id: 'cred-02',
      title: 'Peer Helper Endorsement: Python Basics',
      issuedBy: 'The Hub Community Learning Circle',
      issueDate: '2026-09-28',
      evidenceUrl: 'https://thehub.rw/verify/cred-02',
      skills: ['Peer Tutoring', 'Python for Data Analysis'],
      score: 'Completed 6 Mentorship Hours'
    }
  ],
  peerMatches: [
    {
      partnerName: 'Eric Mugabo',
      partnerLocation: 'Musanze District, Northern Province',
      topic: 'English & Kinyarwanda Professional Exchange',
      matchScore: 94,
      schedule: 'Tuesdays & Thursdays, 18:00 CAT (40 min agenda)',
      status: 'Active'
    }
  ]
};

export const initialEmployerChallenges = [
  {
    id: 'ch-1',
    company: 'Rwanda Agribusiness Co-op Federation (Huye)',
    title: 'Coffee Harvest Data & Payment Reconciler',
    bounty: 'RWF 150,000 Micro-Grant + Interview',
    deadline: 'In 12 Days',
    type: 'Micro-Internship Task',
    skillsRequired: ['SQL & Relational Databases', 'Python for Data Analysis'],
    description: 'Clean an anonymized batch of 1,200 smallholder farmer delivery slips and build an automated SQL report calculating net payouts after transport deductions.'
  },
  {
    id: 'ch-2',
    company: 'Kigali Logistics & E-Commerce Hub',
    title: 'Offline-First Driver Manifest Web Interface',
    bounty: 'Paid 3-Month Apprenticeship',
    deadline: 'In 8 Days',
    type: 'Employer Challenge',
    skillsRequired: ['React & Modern Frontend', 'Node.js APIs'],
    description: 'Prototype a lightweight mobile screen that allows dispatchers and couriers to log package drop-offs even when 4G network signal is unavailable in fringe areas.'
  },
  {
    id: 'ch-3',
    company: 'East Africa Eco-Lodges Group (Rubavu & Musanze)',
    title: 'Multilingual Guest Concierge & Tour Itinerary Guide',
    bounty: 'Junior Operations Contract',
    deadline: 'In 18 Days',
    type: 'Practical Brief',
    skillsRequired: ['Professional English for Business', 'Hospitality & Guest Operations'],
    description: 'Draft a standardized 3-day eco-tourism guest briefing in polished English with Kinyarwanda cultural etiquette notes for visiting international delegations.'
  }
];

export const initialStudyGroups = [
  {
    id: 'grp-1',
    title: 'Kigali Data Analysts & NISR Study Circle',
    focus: 'Python & SQL for Economic Research',
    membersCount: 42,
    meetingTime: 'Every Wednesday 19:00 CAT',
    language: 'English & Kinyarwanda',
    facilitator: 'Jean-Paul N. (Level 3 Specialist)'
  },
  {
    id: 'grp-2',
    title: 'Bilingual Tech English & Pitch Practice',
    focus: 'Oral fluency & technical interview presentations',
    membersCount: 68,
    meetingTime: 'Saturdays 10:00 CAT',
    language: 'English with Kinyarwanda bridges',
    facilitator: 'Aline U. (Community Peer Tutor)'
  },
  {
    id: 'grp-3',
    title: 'Agri-Tech & Cooperative Builders Forum',
    focus: 'GIS maps, soil sensor data & cooperative accounting',
    membersCount: 31,
    meetingTime: 'Mondays 18:30 CAT',
    language: 'Kinyarwanda & French',
    facilitator: 'Dr. Emmanuel K. (Agro-economist)'
  }
];
