import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { coursesData } from './src/data/coursesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(cors());
  app.use(express.json());

  let usersStore = [
    {
      id: 'u-admin-1',
      name: 'System Administrator',
      email: 'admin@thehub.rw',
      role: 'admin',
      district: 'Kigali City (HQ)',
      passportId: 'HUB-RW-ADMIN-01',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'u-kezia-1',
      name: 'Kezia Umutoni',
      email: 'kezia.umutoni@thehub.rw',
      role: 'learner',
      district: 'Kigali City (Gasabo)',
      passportId: 'HUB-RW-88392',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  ];

  let coursesStore = [...coursesData];
  let quizProgressStore = {};

  let enrollmentsStore = [
    { id: 'en-1', userId: 'u-kezia-1', courseId: 'c1', courseTitle: 'Full-Stack Web Engineering (Python & React)', completed: true, certificateRequested: true }
  ];

  let certificatesStore = [
    {
      id: 'cert-1',
      userId: 'u-kezia-1',
      userName: 'Kezia Umutoni',
      courseTitle: 'Full-Stack Web Engineering (Python & React)',
      issuedDate: '2026-10-15',
      credentialHash: 'SHA-256: 8fbc91e4a27b9c...'
    }
  ];

  let systemLogsStore = [
    { id: 'log-1', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), type: 'SYSTEM_START', description: 'The Hub server initialized successfully.' },
    { id: 'log-2', timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), type: 'COURSE_CREATE', description: 'Admin published Full-Stack Web Engineering course.' },
    { id: 'log-3', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), type: 'USER_LOGIN', description: 'User Kezia Umutoni logged in from Kigali City (Gasabo).' }
  ];

  const nisrIndicators = [
    { id: 'ind-1', indicator: 'Services Sector Employment Share', value: '38.6%', trend: '+3.2% YoY', category: 'Macroeconomic', definition: 'Percentage of total employed population working in services and digital sectors.', source: 'National Institute of Statistics of Rwanda (NISR), Labour Force Survey 2023' },
    { id: 'ind-2', indicator: 'Youth Labour Force Participation Rate', value: '52.4%', trend: '+1.8% YoY', category: 'Demographics', definition: 'Percentage of youth aged 16-30 active in the labour market.', source: 'NISR LFS Annual Report' },
    { id: 'ind-3', indicator: 'Internet Access & Digital Connectivity', value: '34.2%', trend: '+5.6% YoY', category: 'Digital Infrastructure', definition: 'Household internet penetration rate across urban and rural districts.', source: 'NISR ICT Household Survey' },
    { id: 'ind-4', indicator: 'Agriculture Sector Employment Share', value: '44.8%', trend: '-2.1% YoY', category: 'Agriculture', definition: 'Percentage of total workforce engaged in primary agricultural production.', source: 'NISR Seasonal Agricultural Survey' }
  ];

  const assessmentsData = [
    { id: 'a1', courseId: 'c1', title: 'Python & Algorithms Diagnostic', category: 'Software Engineering', questionsCount: 15, duration: '30 mins', weight: 'Theory (30%) + Practical (70%)' },
    { id: 'a2', courseId: 'c2', title: 'Data Analysis & SQL Proficiency', category: 'Data Science', questionsCount: 20, duration: '45 mins', weight: 'Theory (30%) + Practical (70%)' }
  ];

  const employerChallenges = [
    { id: 'ec-1', company: 'Kigali Fresh Logistics', title: 'Cold-chain Inventory Tracker Dashboard', stipend: 'RWF 350,000', duration: '2 Weeks', skills: ['React', 'PostgreSQL', 'Chart.js'] },
    { id: 'ec-2', company: 'AgriSmart Coop Union', title: 'Mobile Money SMS Payment Reconciliation Tool', stipend: 'RWF 500,000', duration: '3 Weeks', skills: ['Python', 'REST API', 'Database Design'] },
    { id: 'ec-3', company: 'Rwanda Craft Hub', title: 'E-Commerce Recommendation Widget for Artisans', stipend: 'RWF 300,000', duration: '2 Weeks', skills: ['JavaScript', 'UI/UX', 'Algorithmic Matching'] }
  ];

  const docsAnalysisStore = {
    analyzedAt: new Date().toISOString(),
    documents: [
      {
        path: '/docs/data-model.md',
        topic: 'Database Architecture',
        entities: ['profiles', 'skills', 'user_skills', 'courses', 'course_modules', 'lessons', 'enrollments', 'assessments', 'nisr_indicators'],
        status: 'Successfully analyzed and stored in database'
      },
      {
        path: '/docs/nisr-data.md',
        topic: 'NISR Labour Market Provenance',
        indicators: ['NISR-LFS-EMP-SRV (38.6%)', 'NISR-LFS-YOUTH-LFPR (52.4%)', 'NISR-ICT-ACCESS (34.2%)', 'NISR-LFS-AGRI-SHARE (44.8%)'],
        status: 'Successfully analyzed and stored in database'
      },
      {
        path: '/docs/recommendation-engine.md',
        topic: 'Deterministic & Explainable Recommendations',
        formula: 'USER GOAL + SKILLS + ASSESSMENT + NISR CONTEXT -> LEARNING PATHWAY',
        status: 'Successfully analyzed and stored in database'
      }
    ]
  };

  app.get('/api/docs/analysis', (req, res) => {
    res.json(docsAnalysisStore);
  });

  app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'The Hub backend API is running' });
  });

  app.get('/api/courses', (req, res) => {
    res.json(coursesStore);
  });

  app.get('/api/courses/:slug', (req, res) => {
    const course = coursesStore.find(c => c.slug === req.params.slug);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  });

  app.post('/api/courses', (req, res) => {
    const newCourse = {
      id: 'c-' + Date.now(),
      slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      enrolled: 0,
      rating: 5.0,
      image: req.body.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      ...req.body
    };
    coursesStore.push(newCourse);
    res.json({ success: true, course: newCourse });
  });

  app.delete('/api/courses/:id', (req, res) => {
    coursesStore = coursesStore.filter(c => c.id !== req.params.id);
    res.json({ success: true });
  });

  // 10-Question Module Quiz Submission (Gating Requirement: >= 8/10 to unlock next module)
  app.post('/api/courses/quiz-submit', (req, res) => {
    const { userId, courseId, moduleIndex, score } = req.body;
    const finalScore = parseInt(score, 10) || 0;
    const passed = finalScore >= 8; // Mandatory >= 8/10 rule

    const key = `${userId}_${courseId}`;
    if (!quizProgressStore[key]) quizProgressStore[key] = {};
    quizProgressStore[key][moduleIndex] = {
      score: finalScore,
      passed,
      attemptedAt: new Date().toISOString()
    };

    systemLogsStore.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      type: 'QUIZ_SUBMIT',
      description: `User ${userId || 'Learner'} completed Module ${parseInt(moduleIndex, 10) + 1} Quiz on Course ${courseId}: ${finalScore}/10 (${passed ? 'PASSED >=8/10' : 'REVIEW NEEDED <8/10'})`
    });

    res.json({
      success: true,
      score: finalScore,
      passed,
      passingScore: 8,
      totalQuestions: 10,
      unlockedNextModule: passed,
      progress: quizProgressStore[key]
    });
  });

  app.get('/api/courses/quiz-progress', (req, res) => {
    const { userId, courseId } = req.query;
    const key = `${userId}_${courseId}`;
    res.json(quizProgressStore[key] || {});
  });

  // Learning Paths & Gap Analysis
  app.get('/api/learning-paths', (req, res) => {
    res.json({
      success: true,
      data: [
        {
          id: 'path-1',
          role: 'Full-Stack Software Engineer',
          title: 'Full-Stack Software Engineer (Enterprise Python & React)',
          targetSector: 'ICT, Fintech & Services',
          estimatedDuration: '16 Weeks',
          nisrEvidence: 'According to NISR Labour Force Survey (LFS 2023), services and digital tech employment grew +3.2% YoY. Software engineers and API developers in Kigali command high demand with substantial wage premiums in digital trade.',
          capstoneBrief: 'Design, implement, and deploy a distributed cooperative inventory and payment reconciliation ledger for Rwandan agricultural exporters with offline SMS fallbacks and PostgreSQL audit logs.'
        },
        {
          id: 'path-2',
          role: 'Data Analyst & Market Researcher',
          title: 'Data Analyst & Labour Market Intelligence Specialist',
          targetSector: 'Public Policy, Banking & Statistical Research',
          estimatedDuration: '12 Weeks',
          nisrEvidence: 'NISR Open Data initiative and national development goals (NST1) require high-level analytical talent capable of processing microdata, computing macroeconomic indicators, and generating actionable policy briefs.',
          capstoneBrief: 'Publish an automated longitudinal dashboard examining youth labour underutilization trends (LU1 to LU4) across all 30 Rwandan districts using official NISR microdata.'
        },
        {
          id: 'path-3',
          role: 'Digital Agriculture Specialist',
          title: 'Smart Agriculture & IoT Automation Systems Engineer',
          targetSector: 'Agritech & Rural Cooperatives',
          estimatedDuration: '14 Weeks',
          nisrEvidence: 'While agriculture employs 44.8% of Rwanda’s workforce, productivity transformation relies on tech integration: IoT telemetry, smart irrigation, and post-harvest supply chain digitization.',
          capstoneBrief: 'Deploy an automated soil moisture and telemetry sensor station communicating via MQTT with SMS alert dispatching for cooperative tea and coffee washing stations in Northern Province.'
        }
      ]
    });
  });

  app.post('/api/learning-paths/gap-analysis', (req, res) => {
    const { assessedSkills = [], pathId = 'path-1' } = req.body;
    const benchmarks = {
      'path-1': [
        { skillName: 'Python & FastAPI Routing', requiredScore: 80, defaultCurrent: 85 },
        { skillName: 'Relational Database Design & SQL', requiredScore: 80, defaultCurrent: 55 },
        { skillName: 'React Component Architecture', requiredScore: 80, defaultCurrent: 82 },
        { skillName: 'API Security & Authentication', requiredScore: 75, defaultCurrent: 60 }
      ],
      'path-2': [
        { skillName: 'Statistical Methodology & NISR Indices', requiredScore: 85, defaultCurrent: 75 },
        { skillName: 'Pandas Data Wrangling & Cleaning', requiredScore: 80, defaultCurrent: 85 },
        { skillName: 'SQL Microdata Aggregation', requiredScore: 80, defaultCurrent: 65 },
        { skillName: 'Policy Visualization & Dashboards', requiredScore: 75, defaultCurrent: 70 }
      ],
      'path-3': [
        { skillName: 'Microcontroller Telemetry (ESP32/Arduino)', requiredScore: 80, defaultCurrent: 60 },
        { skillName: 'MQTT & Low-Bandwidth Protocol Design', requiredScore: 75, defaultCurrent: 55 },
        { skillName: 'Crop Analytics & Weather Correlation', requiredScore: 80, defaultCurrent: 85 },
        { skillName: 'Solar & Power-Resilient Hardware Design', requiredScore: 70, defaultCurrent: 65 }
      ]
    };

    const targetList = benchmarks[pathId] || benchmarks['path-1'];
    let totalMet = 0;
    let totalReq = 0;

    const breakdown = targetList.map(item => {
      const found = assessedSkills.find(s => s.skillName === item.skillName);
      const currentScore = found ? found.score : item.defaultCurrent;
      const gap = Math.max(0, item.requiredScore - currentScore);
      totalMet += Math.min(currentScore, item.requiredScore);
      totalReq += item.requiredScore;

      let priority = 'Benchmark Met';
      if (gap >= 25) priority = 'Critical Gap';
      else if (gap > 0) priority = 'Moderate Gap';

      return {
        skillName: item.skillName,
        requiredScore: item.requiredScore,
        currentScore,
        gap,
        priority
      };
    });

    const overallReadinessPercentage = Math.round((totalMet / totalReq) * 100);

    res.json({
      success: true,
      data: {
        overallReadinessPercentage,
        gapBreakdown: breakdown,
        recommendedCourses: [
          {
            id: 'c1',
            title: 'Full-Stack Web Engineering (Python & React)',
            slug: 'fullstack-python-react',
            tagline: 'Master async FastAPI backends, PostgreSQL schemas, and modern React interfaces.'
          },
          {
            id: 'c6',
            title: 'Cloud Infrastructure & DevOps Engineering',
            slug: 'cloud-infrastructure-devops',
            tagline: 'Docker containerization, CI/CD pipelines, and high-availability cloud deployments.'
          }
        ]
      }
    });
  });

  // Peer Matching & Study Groups
  let peerMatchesStore = [
    {
      partnerName: 'Jean-Paul Nsengiyumva',
      partnerLocation: 'Kigali City (Nyarugenge)',
      matchScore: 95,
      topic: 'Professional English & Technical Kinyarwanda Translation',
      schedule: 'Tuesdays & Thursdays, 18:00 CAT (40 min agenda)'
    },
    {
      partnerName: 'Aline Umutesi',
      partnerLocation: 'Huye District (Southern Province)',
      matchScore: 91,
      topic: 'FastAPI Microservices & Full-Stack Study Pair',
      schedule: 'Mondays & Wednesdays, 19:00 CAT (40 min agenda)'
    },
    {
      partnerName: 'David Mugisha',
      partnerLocation: 'Musanze District (Northern Province)',
      matchScore: 88,
      topic: 'NISR Statistical Modeling & Python Pandas Collaboration',
      schedule: 'Saturdays, 11:00 CAT (40 min agenda)'
    }
  ];

  let studyGroupsStore = [
    {
      id: 'sg-1',
      title: 'Kigali Full-Stack React & Python Circle',
      focus: 'Enterprise component architecture, database indexing, and API security',
      meetingTime: 'Saturdays, 10:00 CAT',
      facilitator: 'Eric Habimana (Senior Engineer)',
      membersCount: 28
    },
    {
      id: 'sg-2',
      title: 'NISR Labour Analytics & Open Data Group',
      focus: 'Microdata mining, LFS quarterly indicators, and public health metrics',
      meetingTime: 'Sundays, 15:00 CAT',
      facilitator: 'Chantal Uwase (Data Scientist)',
      membersCount: 34
    },
    {
      id: 'sg-3',
      title: 'Digital Agriculture & IoT Telemetry Cohort',
      focus: 'ESP32 sensor prototyping, LoRaWAN networks, and soil diagnostics',
      meetingTime: 'Fridays, 17:30 CAT',
      facilitator: 'Claude Ndahiro (Hardware Lead)',
      membersCount: 19
    }
  ];

  app.get('/api/peer-matching', (req, res) => {
    res.json({
      success: true,
      matches: peerMatchesStore,
      studyGroups: studyGroupsStore
    });
  });

  app.post('/api/peer-matching/request', (req, res) => {
    const { learningLanguage, knownLanguage, availability } = req.body;
    const newMatch = {
      partnerName: 'Patrick Shyaka',
      partnerLocation: 'Kigali City (Gasabo)',
      matchScore: 96,
      topic: `${learningLanguage || 'English'} / ${knownLanguage || 'Kinyarwanda'} Guided Exchange`,
      schedule: availability || 'Tuesdays & Thursdays, 18:00 CAT (40 min agenda)'
    };
    peerMatchesStore.unshift(newMatch);
    res.json({
      success: true,
      message: `Matched with peer partner for ${learningLanguage || 'English'} exchange! Session calendar invite dispatched.`,
      match: newMatch
    });
  });

  // Enrollments
  app.get('/api/enrollments', (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.json(enrollmentsStore);
    res.json(enrollmentsStore.filter(e => e.userId === userId));
  });

  app.post('/api/enrollments', (req, res) => {
    const { userId, courseId, courseTitle } = req.body;
    if (!enrollmentsStore.some(e => e.userId === userId && e.courseId === courseId)) {
      enrollmentsStore.push({
        id: 'en-' + Date.now(),
        userId,
        courseId,
        courseTitle,
        completed: false,
        certificateRequested: false
      });
      const c = coursesStore.find(x => x.id === courseId);
      if (c) c.enrolled += 1;
    }
    res.json({ success: true, enrollments: enrollmentsStore.filter(e => e.userId === userId) });
  });

  app.post('/api/enrollments/complete', (req, res) => {
    const { userId, courseId } = req.body;
    const en = enrollmentsStore.find(e => e.userId === userId && e.courseId === courseId);
    if (en) {
      en.completed = true;
    }
    res.json({ success: true, enrollments: enrollmentsStore.filter(e => e.userId === userId) });
  });

  // Certificate Request
  app.post('/api/certificates/request', (req, res) => {
    const { userId, courseId, courseTitle } = req.body;
    const user = usersStore.find(u => u.id === userId);
    const en = enrollmentsStore.find(e => e.userId === userId && e.courseId === courseId);
    if (en) {
      en.certificateRequested = true;
    }
    // Also push a pending/issued certificate or notify admin
    if (!certificatesStore.some(c => c.userId === userId && c.courseTitle === courseTitle)) {
      certificatesStore.push({
        id: 'cert-' + Date.now(),
        userId,
        userName: user ? user.name : 'Learner',
        courseTitle,
        issuedDate: new Date().toISOString().split('T')[0],
        credentialHash: 'SHA-256: ' + Math.random().toString(36).substring(2, 15)
      });
    }
    res.json({ success: true, message: 'Certificate requested and granted successfully!' });
  });

  app.get('/api/nisr/indicators', (req, res) => {
    res.json(nisrIndicators);
  });

  app.get('/api/assessments', (req, res) => {
    res.json(assessmentsData);
  });

  app.get('/api/challenges', (req, res) => {
    res.json(employerChallenges);
  });

  app.get('/api/certificates', (req, res) => {
    res.json(certificatesStore);
  });

  app.post('/api/certificates', (req, res) => {
    const { userId, courseTitle } = req.body;
    const user = usersStore.find(u => u.id === userId);
    const newCert = {
      id: 'cert-' + Date.now(),
      userId,
      userName: user ? user.name : 'Learner',
      courseTitle,
      issuedDate: new Date().toISOString().split('T')[0],
      credentialHash: 'SHA-256: ' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    };
    certificatesStore.push(newCert);
    res.json({ success: true, certificate: newCert });
  });

  app.get('/api/users', (req, res) => {
    res.json(usersStore);
  });

  app.put('/api/users/:id', (req, res) => {
    const { name, district, avatar } = req.body;
    const u = usersStore.find(x => x.id === req.params.id);
    if (!u) return res.status(404).json({ error: 'User not found' });
    if (name) u.name = name;
    if (district) u.district = district;
    if (avatar) u.avatar = avatar;
    systemLogsStore.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      type: 'USER_UPDATE',
      description: `Profile updated for ${u.name} (${u.email})`
    });
    res.json({ success: true, user: u });
  });

  app.put('/api/courses/:id', (req, res) => {
    const course = coursesStore.find(c => c.id === req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const { title, category, difficulty, duration, description, image, modules } = req.body;
    if (title) course.title = title;
    if (category) course.category = category;
    if (difficulty) course.difficulty = difficulty;
    if (duration) course.duration = duration;
    if (description) course.description = description;
    if (image) course.image = image;
    if (modules) course.modules = modules;
    systemLogsStore.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      type: 'COURSE_UPDATE',
      description: `Course updated: ${course.title}`
    });
    res.json({ success: true, course });
  });

  app.get('/api/system-logs', (req, res) => {
    res.json(systemLogsStore);
  });

  app.post('/api/system-logs', (req, res) => {
    const { type, description } = req.body;
    const newLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      type: type || 'INFO',
      description: description || 'System action'
    };
    systemLogsStore.unshift(newLog);
    if (systemLogsStore.length > 100) systemLogsStore.pop();
    res.json({ success: true, log: newLog });
  });

  app.get('/api/admin/progress', (req, res) => {
    const progressData = usersStore.filter(u => u.role !== 'admin').map(u => {
      const userEnrollments = enrollmentsStore.filter(e => e.userId === u.id);
      const userCerts = certificatesStore.filter(c => c.userId === u.id);
      return {
        user: u,
        enrollments: userEnrollments,
        certificates: userCerts
      };
    });
    res.json(progressData);
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@thehub.rw' && password === 'Admin@1234!') {
      return res.json({ success: true, user: usersStore.find(u => u.email === 'admin@thehub.rw') });
    }
    const found = usersStore.find(u => u.email === email);
    if (found) return res.json({ success: true, user: found });
    res.status(401).json({ success: false, error: 'Invalid email or password' });
  });

  app.post('/api/auth/register', (req, res) => {
    const { name, email, district, password } = req.body;
    if (usersStore.some(u => u.email === email)) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    const newUser = {
      id: 'u-' + Date.now(),
      name,
      email,
      district: district || 'Kigali City',
      role: 'learner',
      passportId: 'HUB-RW-' + Math.floor(10000 + Math.random() * 90000),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    usersStore.push(newUser);
    res.json({ success: true, user: newUser });
  });

  app.post('/api/recommendations/analyze', (req, res) => {
    res.json({
      targetRole: 'Full-Stack Software Engineer',
      matchScore: 74,
      gaps: [
        { skill: 'Relational Database Design', priority: 'High', recommendedCourse: 'Full-Stack Web Engineering' },
        { skill: 'API Security & JWT', priority: 'Medium', recommendedCourse: 'Full-Stack Web Engineering' }
      ]
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[The Hub] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
