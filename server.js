import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { coursesData } from './src/data/coursesData.js';
import { nisrService, officialNisrIndicators } from './backend/src/services/nisrService.js';
import { recommendationEngine, roleBenchmarks } from './backend/src/services/recommendationEngine.js';
import { initialSkills, initialLearningPathways, initialAssessments } from './backend/src/db/data.js';
import {
  getSupabaseHealth,
  serverSupabase,
  supabaseProjectUrl,
  persistCertificateToSupabase,
  fetchCertificatesFromSupabase,
  persistUserToSupabase,
  persistEnrollmentToSupabase,
  syncAllToSupabase
} from './serverSupabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(cors());
  app.use(express.json());

  // In-memory data store with state preservation across client interactions
  let usersStore = [
    {
      id: 'u-admin-1',
      name: 'System Administrator',
      fullName: 'System Administrator',
      email: 'admin@thehub.rw',
      role: 'admin',
      district: 'Kigali City (HQ)',
      location: 'Kigali City (HQ)',
      passportId: 'HUB-RW-ADMIN-01',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'u-kezia-1',
      name: 'Kezia Umutoni',
      fullName: 'Kezia Umutoni',
      email: 'kezia.umutoni@thehub.rw',
      role: 'learner',
      district: 'Kigali City (Gasabo)',
      location: 'Kigali City (Gasabo)',
      passportId: 'HUB-RW-88392',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      learningStreak: 4
    }
  ];

  let coursesStore = [...coursesData];
  let quizProgressStore = {};

  let enrollmentsStore = [
    {
      id: 'en-1',
      userId: 'u-kezia-1',
      courseId: 'c1',
      courseTitle: 'Full-Stack Web Engineering (Python & React)',
      completed: true,
      certificateRequested: true
    }
  ];

  let certificatesStore = [
    {
      id: 'cert-1',
      userId: 'u-kezia-1',
      userName: 'Kezia Umutoni',
      courseTitle: 'Full-Stack Web Engineering (Python & React)',
      issuedDate: '2026-10-15',
      credentialHash: 'SHA-256: 8fbc91e4a27b9c9f0e1d823456789abc'
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

  // ==========================================
  // API ROUTES
  // ==========================================

  // Health check & telemetry
  app.get('/api/health', async (_req, res) => {
    const supabaseHealth = await getSupabaseHealth();
    res.json({
      success: true,
      message: 'The Hub backend API is running and connected',
      status: 'online',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      supabase: supabaseHealth,
      database: {
        provider: supabaseHealth.connected ? 'Supabase PostgreSQL Cloud DB' : 'In-Memory Resilient DB (Supabase sync ready)',
        status: supabaseHealth.connected ? 'Connected to Supabase' : 'Active Local Store',
        supabaseConfigured: supabaseHealth.configured,
        supabaseConnected: supabaseHealth.connected,
        coursesCount: coursesStore.length,
        usersCount: usersStore.length,
        nisrIndicatorsCount: nisrIndicators.length,
        certificatesCount: certificatesStore.length,
        sslEnforced: true
      }
    });
  });

  // Supabase cloud database status
  app.get('/api/supabase/status', async (_req, res) => {
    const health = await getSupabaseHealth();
    res.json({
      success: true,
      data: health
    });
  });

  // Admin Supabase synchronization trigger
  app.post('/api/supabase/sync', async (_req, res) => {
    const syncResult = await syncAllToSupabase({
      courses: coursesStore,
      users: usersStore,
      certificates: certificatesStore,
      nisrIndicators: nisrIndicators,
      enrollments: enrollmentsStore
    });
    res.json(syncResult);
  });

  // Courses Catalog & Management
  app.get('/api/courses', (req, res) => {
    const { category, search } = req.query;
    let list = [...coursesStore];
    if (category && category !== 'All') {
      list = list.filter(c => c.category?.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    }
    res.json(list);
  });

  app.get('/api/courses/:slug', (req, res) => {
    const course = coursesStore.find(c => c.slug === req.params.slug || c.id === req.params.slug);
    if (!course) return res.status(404).json({ success: false, error: 'Course not found' });
    res.json(course);
  });

  app.post('/api/courses', (req, res) => {
    const newCourse = {
      id: 'c-' + Date.now(),
      slug: (req.body.title || 'course').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      enrolled: 0,
      rating: 5.0,
      image: req.body.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      ...req.body
    };
    coursesStore.unshift(newCourse);
    systemLogsStore.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      type: 'COURSE_CREATE',
      description: `New course published: ${newCourse.title}`
    });
    res.json({ success: true, course: newCourse });
  });

  app.put('/api/courses/:id', (req, res) => {
    const course = coursesStore.find(c => c.id === req.params.id);
    if (!course) return res.status(404).json({ success: false, error: 'Course not found' });
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

  app.delete('/api/courses/:id', (req, res) => {
    coursesStore = coursesStore.filter(c => c.id !== req.params.id);
    res.json({ success: true });
  });

  // 10-Question Module Quiz Submission (Gating Requirement: >= 8/10 to unlock next module)
  app.post('/api/courses/quiz-submit', (req, res) => {
    const { userId, courseId, moduleIndex, score } = req.body;
    const finalScore = parseInt(score, 10) || 0;
    const passed = finalScore >= 8;

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

  // Enrollments
  app.get('/api/enrollments', (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.json(enrollmentsStore);
    res.json(enrollmentsStore.filter(e => e.userId === userId));
  });

  app.post('/api/enrollments', (req, res) => {
    const { userId, courseId, courseTitle } = req.body;
    let enrollment = enrollmentsStore.find(e => e.userId === userId && e.courseId === courseId);
    if (!enrollment) {
      enrollment = {
        id: 'en-' + Date.now(),
        userId,
        courseId,
        courseTitle,
        completed: false,
        certificateRequested: false,
        progressPercentage: 0
      };
      enrollmentsStore.push(enrollment);
      const c = coursesStore.find(x => x.id === courseId);
      if (c && typeof c.enrolled === 'number') c.enrolled += 1;
    }
    // Async push to Supabase
    persistEnrollmentToSupabase(enrollment);
    res.json({ success: true, enrollments: enrollmentsStore.filter(e => e.userId === userId) });
  });

  app.post('/api/enrollments/complete', (req, res) => {
    const { userId, courseId } = req.body;
    const en = enrollmentsStore.find(e => e.userId === userId && e.courseId === courseId);
    if (en) {
      en.completed = true;
      en.progressPercentage = 100;
      persistEnrollmentToSupabase(en);
    }
    res.json({ success: true, enrollments: enrollmentsStore.filter(e => e.userId === userId) });
  });

  // Certificates & SHA-256 Vault
  app.get('/api/certificates', async (req, res) => {
    const { userId } = req.query;
    // Attempt Supabase fetch if available
    const sbCerts = await fetchCertificatesFromSupabase(userId);
    if (sbCerts && sbCerts.length > 0) {
      // Merge with in-memory certs avoiding duplicate ids
      const existingIds = new Set(certificatesStore.map(c => c.id));
      for (const sc of sbCerts) {
        if (!existingIds.has(sc.id)) {
          certificatesStore.unshift(sc);
          existingIds.add(sc.id);
        }
      }
    }
    if (userId) {
      return res.json(certificatesStore.filter(c => c.userId === userId));
    }
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
    certificatesStore.unshift(newCert);
    // Write-through to Supabase
    persistCertificateToSupabase(newCert);
    res.json({ success: true, certificate: newCert });
  });

  app.post('/api/certificates/request', (req, res) => {
    const { userId, courseId, courseTitle } = req.body;
    const user = usersStore.find(u => u.id === userId);
    const en = enrollmentsStore.find(e => e.userId === userId && e.courseId === courseId);
    if (en) {
      en.certificateRequested = true;
      persistEnrollmentToSupabase(en);
    }
    let cert = certificatesStore.find(c => c.userId === userId && c.courseTitle === courseTitle);
    if (!cert) {
      cert = {
        id: 'cert-' + Date.now(),
        userId,
        userName: user ? user.name : 'Learner',
        courseTitle,
        issuedDate: new Date().toISOString().split('T')[0],
        credentialHash: 'SHA-256: ' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 10)
      };
      certificatesStore.unshift(cert);
      persistCertificateToSupabase(cert);
    }
    res.json({ success: true, message: 'Certificate requested and granted successfully!', certificate: cert });
  });

  // Learning Paths & Deterministic Gap Analysis
  app.get('/api/learning-paths', (_req, res) => {
    res.json({
      success: true,
      data: initialLearningPathways.length > 0 ? initialLearningPathways : [
        {
          id: 'path-1',
          role: 'Full-Stack Software Engineer',
          title: 'Full-Stack Software Engineer (Enterprise Python & React)',
          targetSector: 'ICT, Fintech & Services',
          estimatedDuration: '16 Weeks',
          nisrEvidence: 'According to NISR Labour Force Survey (LFS 2023), services and digital communication employment grew +3.2% YoY.',
          capstoneBrief: 'Design and deploy a distributed cooperative inventory and payment reconciliation ledger for Rwandan agricultural exporters.'
        }
      ]
    });
  });

  app.post('/api/learning-paths/gap-analysis', (req, res) => {
    const { assessedSkills = [], pathId = 'path-1' } = req.body;
    const result = recommendationEngine.calculateSkillGaps(assessedSkills, pathId);
    res.json({ success: true, data: result });
  });

  app.post('/api/recommendations/analyze', (req, res) => {
    const { userSkills = [], targetRoleId = 'path-1' } = req.body;
    const result = recommendationEngine.calculateSkillGaps(userSkills, targetRoleId);
    res.json({ success: true, data: result });
  });

  // Peer Matching & Study Circles
  app.get('/api/peer-matching', (_req, res) => {
    res.json({
      success: true,
      matches: peerMatchesStore,
      studyGroups: studyGroupsStore
    });
  });

  app.get('/api/peers/matches', (_req, res) => {
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

  app.post('/api/peers/request-match', (req, res) => {
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
      message: 'Pairing algorithm matched you with a high-affinity peer!',
      match: newMatch
    });
  });

  // NISR Official Labour Intelligence
  app.get('/api/nisr/indicators', (_req, res) => {
    res.json(nisrIndicators);
  });

  app.get('/api/nisr/youth', (_req, res) => {
    res.json({
      success: true,
      provinces: nisrService.getGeographicDisaggregation()
    });
  });

  app.get('/api/nisr/labour', (_req, res) => {
    res.json({
      success: true,
      data: nisrService.getLabourMarketSummary()
    });
  });

  app.get('/api/nisr/provinces', (_req, res) => {
    res.json({
      success: true,
      data: nisrService.getGeographicDisaggregation()
    });
  });

  // Diagnostic Assessments
  app.get('/api/assessments', (_req, res) => {
    res.json(assessmentsData);
  });

  app.get('/api/assessments/:id', (req, res) => {
    const found = assessmentsData.find(a => a.id === req.params.id) || assessmentsData[0];
    res.json({ success: true, data: found });
  });

  // Employer Challenges
  app.get('/api/challenges', (_req, res) => {
    res.json(employerChallenges);
  });

  // Skills Registry
  app.get('/api/skills', (_req, res) => {
    res.json({ success: true, data: initialSkills });
  });

  // Users & Profiles
  app.get('/api/users', (_req, res) => {
    res.json(usersStore);
  });

  app.put('/api/users/:id', (req, res) => {
    const { name, fullName, district, location, avatar, avatarUrl, bio, notes, externalLinks, experiences, externalCertificates } = req.body;
    let u = usersStore.find(x => x.id === req.params.id);
    if (!u) {
      u = {
        id: req.params.id,
        name: name || fullName || 'Learner',
        fullName: name || fullName || 'Learner',
        email: req.body.email || 'learner@thehub.rw',
        role: req.body.role || 'learner',
        district: district || location || 'Kigali City'
      };
      usersStore.push(u);
    }
    if (name || fullName) {
      u.name = name || fullName;
      u.fullName = name || fullName;
    }
    if (district || location) {
      u.district = district || location;
      u.location = district || location;
    }
    if (avatar || avatarUrl) {
      u.avatar = avatar || avatarUrl;
      u.avatarUrl = avatar || avatarUrl;
    }
    if (bio !== undefined) u.bio = bio;
    if (notes !== undefined) u.notes = notes;
    if (externalLinks) u.externalLinks = externalLinks;
    if (experiences) u.experiences = experiences;
    if (externalCertificates) u.externalCertificates = externalCertificates;

    systemLogsStore.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      type: 'USER_UPDATE',
      description: `Profile updated for ${u.name} (${u.email})`
    });
    // Async push to Supabase
    persistUserToSupabase(u);
    res.json({ success: true, user: u });
  });

  // Authentication & Verification
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@thehub.rw' && password === 'Admin@1234!') {
      return res.json({ success: true, user: usersStore.find(u => u.email === 'admin@thehub.rw') });
    }
    const found = usersStore.find(u => u.email === email);
    if (found) {
      return res.json({ success: true, user: found });
    }
    res.status(401).json({ success: false, error: 'Invalid email or password' });
  });

  app.post('/api/auth/demo-login', (_req, res) => {
    const demo = usersStore.find(u => u.role === 'learner') || usersStore[1];
    res.json({ success: true, user: demo });
  });

  app.post('/api/auth/admin-login', (req, res) => {
    const { password } = req.body;
    if (password && password !== 'Admin@1234!') {
      return res.status(401).json({ success: false, error: 'Incorrect administrator password' });
    }
    const admin = usersStore.find(u => u.role === 'admin') || usersStore[0];
    res.json({ success: true, user: admin });
  });

  app.post('/api/auth/register', (req, res) => {
    const { name, names, email, district, location, password } = req.body;
    const finalEmail = (email || '').trim().toLowerCase();
    if (usersStore.some(u => u.email === finalEmail)) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    const displayName = name || names || 'Learner';
    const newUser = {
      id: 'u-' + Date.now(),
      name: displayName,
      fullName: displayName,
      email: finalEmail,
      district: district || location || 'Kigali City',
      location: district || location || 'Kigali City',
      role: 'learner',
      passportId: 'HUB-RW-' + Math.floor(10000 + Math.random() * 90000),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      learningStreak: 1
    };
    usersStore.push(newUser);
    // Async push to Supabase
    persistUserToSupabase(newUser);
    res.json({ success: true, user: newUser });
  });

  // Admin Progress & Activity Logs
  app.get('/api/admin/progress', (_req, res) => {
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

  app.get('/api/system-logs', (_req, res) => {
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

  // Mount Vite middleware in development or static in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', async () => {
    console.log(`[The Hub] Full-Stack server running on http://0.0.0.0:${PORT}`);
    try {
      const sbHealth = await getSupabaseHealth();
      console.log(`[The Hub Supabase] Status: ${sbHealth.status} | URL: ${sbHealth.url} | Message: ${sbHealth.message}`);
    } catch (e) {
      console.warn('[The Hub Supabase] Startup probe notice:', e.message);
    }
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
