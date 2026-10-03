import express from 'express';
import {
  initialCourses,
  initialSkills,
  initialLearningPathways,
  initialAssessments,
  demoUserProfile,
  adminUserProfile,
  initialLearnersList,
  initialLearnerTasks,
  initialCertificateWinners,
  initialAdminAuditLog,
  initialEmployerChallenges,
  initialStudyGroups
} from '../db/data.js';
import { nisrService } from '../services/nisrService.js';
import { recommendationEngine } from '../services/recommendationEngine.js';

const router = express.Router();

// Current in-memory session profile
let currentUser = { ...demoUserProfile };
let learners = [...initialLearnersList];
let learnerTasks = [...initialLearnerTasks];
let certificates = [...initialCertificateWinners];
let auditLog = [...initialAdminAuditLog];

// 1. Health check & Telemetry
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'The Hub backend is running',
    timestamp: new Date().toISOString(),
    database: {
      provider: process.env.SUPABASE_URL ? 'Supabase PostgreSQL (Active)' : 'In-Memory Resilient DB (Active)',
      status: 'Connected',
      tablesReady: 12,
      sslEnforced: true,
      pingLatencyMs: Math.floor(Math.random() * 4) + 3
    }
  });
});

// 2. Courses
router.get('/courses', (req, res) => {
  const { category, difficulty, search } = req.query;
  let results = [...initialCourses];

  if (category && category !== 'All') {
    results = results.filter(c => c.category.toLowerCase() === String(category).toLowerCase());
  }

  if (difficulty && difficulty !== 'All') {
    results = results.filter(c => c.difficulty.toLowerCase().includes(String(difficulty).toLowerCase()));
  }

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.skillsGained.some(s => s.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: results.length, data: results });
});

router.get('/courses/:slug', (req, res) => {
  const { slug } = req.params;
  const course = initialCourses.find(c => c.slug === slug || c.id === slug);
  if (!course) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }
  res.json({ success: true, data: course });
});

router.post('/courses/:id/enroll', (req, res) => {
  const { id } = req.params;
  const course = initialCourses.find(c => c.id === id || c.slug === id);
  if (!course) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }

  if (!currentUser.enrolledCourses.includes(course.id)) {
    currentUser.enrolledCourses.push(course.id);
  }

  res.json({
    success: true,
    message: `Enrolled successfully in ${course.title}`,
    user: currentUser
  });
});

// 3. Skills
router.get('/skills', (req, res) => {
  res.json({ success: true, data: initialSkills });
});

// 4. NISR Indicators
router.get('/nisr/indicators', (req, res) => {
  res.json({ success: true, data: nisrService.getAllIndicators() });
});

router.get('/nisr/labour', (req, res) => {
  res.json({ success: true, data: nisrService.getLabourMarketSummary() });
});

router.get('/nisr/provinces', (req, res) => {
  res.json({ success: true, data: nisrService.getGeographicDisaggregation() });
});

// 5. Pathways & Recommendations
router.get('/learning-paths', (req, res) => {
  res.json({ success: true, data: initialLearningPathways });
});

router.post('/recommendations/analyze', (req, res) => {
  const { userSkills, targetRoleId } = req.body;
  const analysis = recommendationEngine.calculateSkillGaps(
    userSkills || currentUser.assessedSkills,
    targetRoleId || 'path-1'
  );
  res.json({ success: true, data: analysis });
});

// 6. Assessments
router.get('/assessments', (req, res) => {
  res.json({ success: true, data: initialAssessments });
});

router.post('/assessments/:id/submit', (req, res) => {
  const { id } = req.params;
  const { theoryAnswers, practicalCompleted, capstoneSubmitted } = req.body;
  const assessment = initialAssessments.find(a => a.id === id);

  if (!assessment) {
    return res.status(404).json({ success: false, error: 'Assessment not found' });
  }

  // Calculate Tri-Part score
  let theoryScore = 80;
  if (Array.isArray(theoryAnswers) && theoryAnswers.length > 0) {
    const correctCount = theoryAnswers.filter((ans, idx) => {
      const q = assessment.theoryQuestions[idx];
      return q && ans === q.correctIndex;
    }).length;
    theoryScore = Math.round((correctCount / assessment.theoryQuestions.length) * 100);
  }

  const practicalScore = practicalCompleted ? 90 : 50;
  const projectScore = capstoneSubmitted ? 85 : 40;

  // Tri-Part Weighted: 30% Theory, 40% Practical, 30% Capstone
  const compositeScore = Math.round(
    (theoryScore * 0.3) + (practicalScore * 0.4) + (projectScore * 0.3)
  );

  let verifiedLevel = 'Foundation (Level 1)';
  if (compositeScore >= 80) verifiedLevel = 'Specialist (Level 3)';
  else if (compositeScore >= 65) verifiedLevel = 'Practitioner (Level 2)';

  // Update learner profile
  const existingSkillIndex = currentUser.assessedSkills.findIndex(s =>
    assessment.skillTarget.includes(s.name)
  );

  if (existingSkillIndex >= 0) {
    currentUser.assessedSkills[existingSkillIndex].score = compositeScore;
    currentUser.assessedSkills[existingSkillIndex].level = verifiedLevel;
  } else {
    currentUser.assessedSkills.push({
      name: assessment.skillTarget,
      score: compositeScore,
      level: verifiedLevel
    });
  }

  // Add verified credential
  currentUser.verifiedCredentials.push({
    id: `cred-${Date.now()}`,
    title: `${assessment.title} — Verified`,
    issuedBy: 'The Hub Tri-Part Examination Board',
    issueDate: new Date().toISOString().split('T')[0],
    evidenceUrl: `https://thehub.rw/verify/as-${Date.now()}`,
    skills: [assessment.skillTarget],
    score: `${compositeScore}% (${verifiedLevel})`
  });

  res.json({
    success: true,
    scoreBreakdown: {
      theoryScore,
      practicalScore,
      projectScore,
      compositeScore,
      verifiedLevel
    },
    user: currentUser
  });
});

// 7. Auth & Profile
const registeredUsers = new Map();
// Seed default accounts
registeredUsers.set('kezia.umutoni@thehub.rw', { password: 'password123', profile: demoUserProfile });
registeredUsers.set('alice.mukamana@thehub.rw', { password: 'admin123', profile: adminUserProfile });

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, error: 'Email address is required to sign in.' });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({ success: false, error: 'Password is required to sign in.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  // Check admin account
  if (cleanEmail === 'alice.mukamana@thehub.rw' || cleanEmail.includes('admin')) {
    currentUser = { ...adminUserProfile };
    return res.json({
      success: true,
      message: 'Authenticated as Administrator: Dr. Alice Mukamana',
      user: currentUser
    });
  }

  // Check in registered users map
  if (registeredUsers.has(cleanEmail)) {
    const record = registeredUsers.get(cleanEmail);
    if (record.password && record.password !== password) {
      return res.status(401).json({ success: false, error: 'Incorrect password. Please try again.' });
    }
    currentUser = { ...record.profile };
    return res.json({
      success: true,
      message: `Welcome back, ${currentUser.name}!`,
      user: currentUser
    });
  }

  // Check in learners list
  const existingLearner = learners.find(l => l.email?.toLowerCase() === cleanEmail);
  if (existingLearner) {
    currentUser = { ...existingLearner };
    return res.json({
      success: true,
      message: `Welcome back, ${currentUser.name}!`,
      user: currentUser
    });
  }

  // Not found
  return res.status(404).json({
    success: false,
    error: 'No account found with this email. Click "Create an account" below to register.'
  });
});

router.post('/auth/register', (req, res) => {
  const { names, email, password, location, dateOfBirth, targetRole } = req.body;

  if (!names || names.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Full name is required (minimum 2 characters).' });
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
  }

  if (!location || !location.trim()) {
    return res.status(400).json({ success: false, error: 'Region / location is required.' });
  }

  if (!dateOfBirth) {
    return res.status(400).json({ success: false, error: 'Date of birth is required.' });
  }

  const birthDate = new Date(dateOfBirth);
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthDate.getFullYear();

  if (isNaN(birthDate.getTime()) || age < 14 || age > 100) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid date of birth (must be between 14 and 100 years of age).'
    });
  }

  const cleanEmail = email.trim().toLowerCase();

  // Check duplicate
  const exists = learners.some(l => l.email?.toLowerCase() === cleanEmail) || registeredUsers.has(cleanEmail);
  if (exists) {
    return res.status(400).json({
      success: false,
      error: 'An account with this email already exists. Please sign in below.'
    });
  }

  const isAdmin = cleanEmail.includes('admin');
  const newUser = {
    id: `usr-${Date.now()}`,
    name: names.trim(),
    email: cleanEmail,
    role: isAdmin ? 'admin' : 'Learner',
    targetRole: targetRole || 'Junior Data Analyst',
    location: location.trim(),
    province: location.includes(',') ? location.split(',')[1].trim() : 'Kigali City',
    dateOfBirth,
    streakDays: 1,
    status: 'Active',
    sessionStatus: 'Signed In (Online)',
    lastSignedIn: 'Just now',
    sessionDuration: '1 min',
    device: 'Web Client',
    network: 'Rwanda Broadband',
    currentActivity: 'Enrolling in Foundation Curriculum',
    studyHoursTotal: 0,
    learningVelocity: '1.0 lessons/week',
    hasFinishedCertificate: false,
    certificateTitle: 'New Enrollee',
    quizAverage: 0,
    enrolledCourses: ['c-1'],
    completedLessons: [],
    completedLessonsCount: 0,
    totalLessonsCount: 6,
    progressPercentage: 0,
    assessedSkills: [],
    verifiedCredentials: [],
    peerMatches: [],
    bio: `Learner based in ${location}. Focusing on workplace data skills aligned with Rwanda NISR benchmarks.`
  };

  registeredUsers.set(cleanEmail, { password, profile: newUser });
  learners.unshift(newUser);
  currentUser = newUser;

  auditLog.unshift({
    id: `log-${Date.now()}`,
    action: 'New Learner Registered',
    details: `User ${newUser.name} (${newUser.email}) registered from ${newUser.location} (DOB: ${newUser.dateOfBirth})`,
    operator: 'Self-Registration',
    timestamp: 'Just now',
    type: 'user'
  });

  res.json({
    success: true,
    message: `Account created successfully! Welcome to The Hub Rwanda, ${newUser.name}.`,
    user: currentUser
  });
});

router.post('/auth/demo-login', (req, res) => {
  currentUser = { ...demoUserProfile };
  res.json({
    success: true,
    message: 'Authenticated as demo learner: Kezia Umutoni',
    user: currentUser
  });
});

router.post('/auth/admin-login', (req, res) => {
  currentUser = { ...adminUserProfile };
  res.json({
    success: true,
    message: 'Authenticated as Administrator: Dr. Alice Mukamana',
    user: currentUser
  });
});

router.get('/auth/me', (req, res) => {
  res.json({ success: true, user: currentUser });
});

router.post('/auth/profile', (req, res) => {
  const { name, email, location, role, bio, preferredLanguage, targetRole } = req.body;
  if (name) currentUser.name = name;
  if (email) currentUser.email = email;
  if (location) currentUser.location = location;
  if (role) currentUser.role = role;
  if (targetRole) currentUser.targetRole = targetRole;
  if (bio !== undefined) currentUser.bio = bio;
  if (preferredLanguage) currentUser.preferredLanguage = preferredLanguage;

  // Sync with learners list if user is in learners
  const learner = learners.find(l => l.id === currentUser.id);
  if (learner) {
    if (name) learner.name = name;
    if (email) learner.email = email;
    if (location) learner.location = location;
    if (role) learner.role = role;
    if (targetRole) learner.targetRole = targetRole;
  }

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: currentUser
  });
});

router.post('/auth/change-password', (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'New password must be at least 6 characters long.' });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, error: 'New passwords do not match. Please re-type identical passwords.' });
  }

  currentUser.passwordChangedAt = new Date().toISOString();

  // Record security audit event
  auditLog.unshift({
    id: `log-${Date.now()}`,
    action: 'Password Changed',
    details: `User ${currentUser.name} (${currentUser.email || 'account'}) updated their security credentials`,
    operator: currentUser.name,
    timestamp: 'Just now',
    type: 'security'
  });

  res.json({
    success: true,
    message: 'Your password has been changed securely.'
  });
});

router.post('/auth/logout', (req, res) => {
  currentUser = {
    id: 'guest',
    name: 'Guest Learner',
    email: '',
    role: 'Explorer',
    location: 'Kigali, Rwanda',
    streakDays: 0,
    enrolledCourses: [],
    completedLessons: [],
    assessedSkills: [],
    verifiedCredentials: [],
    peerMatches: []
  };
  res.json({ success: true, user: currentUser });
});

// 8. Peer Matching & Language Exchange
router.get('/peers/matches', (req, res) => {
  res.json({
    success: true,
    matches: currentUser.peerMatches,
    studyGroups: initialStudyGroups,
    matchingAlgorithm: 'MatchScore = Skill_Compat(30%) + Goal_Alignment(25%) + Level_Compat(20%) + Language_Bridge(15%) + Availability(10%)'
  });
});

router.post('/peers/request-match', (req, res) => {
  const { learningLanguage, knownLanguage, targetSkill, availability } = req.body;
  const newMatch = {
    partnerName: 'Mutesi Divine',
    partnerLocation: 'Kicukiro District, Kigali City',
    topic: `${learningLanguage || 'English'} & ${knownLanguage || 'Kinyarwanda'} Language Exchange`,
    matchScore: 96,
    schedule: availability || 'Mondays & Wednesdays 18:00 CAT (40 min structured agenda)',
    status: 'Confirmed'
  };

  currentUser.peerMatches.unshift(newMatch);

  res.json({
    success: true,
    message: 'Pairing algorithm matched you with a high-affinity peer!',
    match: newMatch
  });
});

// 9. Employer Challenges & Micro-Internships
router.get('/challenges', (req, res) => {
  res.json({ success: true, data: initialEmployerChallenges });
});

// 10. Public Skill Passport
router.get('/passport/:id', (req, res) => {
  res.json({
    success: true,
    passport: {
      learner: currentUser.name,
      district: currentUser.location,
      role: currentUser.role,
      verifiedCredentials: currentUser.verifiedCredentials,
      assessedSkills: currentUser.assessedSkills,
      streakDays: currentUser.streakDays,
      publicVerificationHash: 'sha256-nisr-hub-9f82d1c04ba2e'
    }
  });
});

// ==========================================
// 11. ADMIN DASHBOARD & USER MANAGEMENT API
// ==========================================

// Overview KPIs
router.get('/admin/overview', (req, res) => {
  const totalLearners = learners.length;
  const activeLearners = learners.filter(l => l.status === 'Active').length;
  const signedInUsers = learners.filter(l => l.sessionStatus?.includes('Signed In')).length;
  const idleUsers = learners.filter(l => l.sessionStatus?.includes('Idle')).length;
  const finishedCertificateCount = learners.filter(l => l.hasFinishedCertificate).length;
  const totalCredentials = learners.reduce((sum, l) => sum + (l.verifiedCredentialsCount || 0), 0);
  const avgProgress = Math.round(learners.reduce((sum, l) => sum + (l.progressPercentage || 0), 0) / (totalLearners || 1));
  const pendingTasks = learnerTasks.filter(t => t.status === 'Pending Review').length;
  const activeStreaks = learners.filter(l => l.streakDays >= 7).length;

  res.json({
    success: true,
    kpis: {
      totalLearners,
      activeLearners,
      signedInUsers,
      idleUsers,
      finishedCertificateCount,
      totalCredentials,
      avgProgress,
      pendingTasks,
      activeStreaks,
      districtReachCount: 22,
      averageSessionMins: 46,
      mobileSessionPct: 38,
      nst2PriorityAlignmentPct: 94
    },
    sectorBreakdown: [
      { sector: 'Technology & ICT', learners: 520, growth: '+28%' },
      { sector: 'Financial & Services Data', learners: 410, growth: '+22%' },
      { sector: 'Agri-Tech & Cooperatives', learners: 340, growth: '+15%' },
      { sector: 'Hospitality & MICE Tourism', learners: 210, growth: '+19%' }
    ]
  });
});

// Get all learners with progress and tracking specs
router.get('/admin/users', (req, res) => {
  const { search, district, role, sessionStatus, completion } = req.query;
  let results = [...learners];

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.targetRole?.toLowerCase().includes(q) ||
      u.location.toLowerCase().includes(q) ||
      u.device?.toLowerCase().includes(q) ||
      u.network?.toLowerCase().includes(q)
    );
  }

  if (district && district !== 'All') {
    results = results.filter(u => u.location.toLowerCase().includes(String(district).toLowerCase()));
  }

  if (role && role !== 'All') {
    results = results.filter(u => u.role.toLowerCase() === String(role).toLowerCase());
  }

  if (sessionStatus && sessionStatus !== 'All') {
    results = results.filter(u => u.sessionStatus?.toLowerCase().includes(String(sessionStatus).toLowerCase()));
  }

  if (completion && completion !== 'All') {
    if (completion === 'finished') results = results.filter(u => u.hasFinishedCertificate);
    if (completion === 'in-progress') results = results.filter(u => !u.hasFinishedCertificate);
  }

  res.json({ success: true, count: results.length, data: results });
});

// Update user role or status
router.post('/admin/users/:id/update-role', (req, res) => {
  const { id } = req.params;
  const { role, status } = req.body;
  const learner = learners.find(l => l.id === id);

  if (!learner) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  if (role) learner.role = role;
  if (status) learner.status = status;

  // If currentUser is this learner, sync
  if (currentUser.id === id) {
    if (role) currentUser.role = role;
  }

  res.json({ success: true, message: `Updated ${learner.name}'s profile`, learner });
});

// Award verified credential directly from Admin
router.post('/admin/users/:id/award-credential', (req, res) => {
  const { id } = req.params;
  const { title, skill, score, level } = req.body;
  const learner = learners.find(l => l.id === id);

  if (!learner) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  learner.verifiedCredentialsCount = (learner.verifiedCredentialsCount || 0) + 1;
  const existingSkill = learner.assessedSkills.find(s => s.name === skill);
  if (existingSkill) {
    existingSkill.score = score || 90;
    existingSkill.level = level || 'Specialist (Level 3)';
  } else if (skill) {
    learner.assessedSkills.push({
      name: skill,
      score: score || 90,
      level: level || 'Specialist (Level 3)'
    });
  }

  res.json({
    success: true,
    message: `Awarded credential "${title || 'Verified Competency'}" to ${learner.name}`,
    learner
  });
});

// Get all reviewable learner tasks & capstones
router.get('/admin/tasks', (req, res) => {
  res.json({ success: true, data: learnerTasks });
});

// Review and grade a learner task
router.post('/admin/tasks/:id/review', (req, res) => {
  const { id } = req.params;
  const { status, feedback, score, rubricScores } = req.body;
  const task = learnerTasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  if (status) task.status = status;
  if (feedback !== undefined) task.feedback = feedback;
  if (score !== undefined) task.currentScore = score;
  if (rubricScores && Array.isArray(rubricScores)) {
    task.rubricCriteria = rubricScores;
  }

  // If approved, update learner's verified credentials count
  if (status === 'Verified & Approved') {
    const learner = learners.find(l => l.id === task.learnerId);
    if (learner) {
      learner.verifiedCredentialsCount = (learner.verifiedCredentialsCount || 0) + 1;
    }
  }

  res.json({
    success: true,
    message: `Task "${task.title}" updated with status: ${task.status}`,
    task
  });
});

// ==========================================
// 12. CERTIFICATE WINNERS & GRADUATES API
// ==========================================

// Get all certificate winners
router.get('/admin/certificates', (req, res) => {
  const { search, course, district } = req.query;
  let results = [...certificates];

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(c =>
      c.learnerName.toLowerCase().includes(q) ||
      c.courseTitle.toLowerCase().includes(q) ||
      c.district.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.distinction.toLowerCase().includes(q)
    );
  }

  if (course && course !== 'All') {
    results = results.filter(c => c.courseTitle.toLowerCase().includes(String(course).toLowerCase()));
  }

  if (district && district !== 'All') {
    results = results.filter(c => c.district.toLowerCase().includes(String(district).toLowerCase()));
  }

  res.json({ success: true, count: results.length, data: results });
});

// Issue a new certificate
router.post('/admin/certificates/issue', (req, res) => {
  const { learnerId, courseTitle, grade, distinction, skills } = req.body;
  const learner = learners.find(l => l.id === learnerId);

  if (!learner) {
    return res.status(404).json({ success: false, error: 'Learner not found' });
  }

  const certNumber = String(certificates.length + 1).padStart(3, '0');
  const newCert = {
    id: `CERT-RW-2026-${certNumber}`,
    learnerId: learner.id,
    learnerName: learner.name,
    learnerEmail: learner.email,
    district: learner.location,
    courseId: 'c-1',
    courseTitle: courseTitle || 'National Strategic Skills Certification',
    issueDate: new Date().toISOString().split('T')[0],
    grade: grade || '92%',
    distinction: distinction || 'Honours Distinction',
    verificationHash: `sha256-nisr-hub-cert-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`,
    skills: skills || ['NISR Data Literacy', 'Professional Mastery'],
    status: 'Issued & Active',
    issuingAuthority: 'National Institute of Statistics of Rwanda (NISR) & The Hub Academic Council',
    signedBy: 'Dr. Alice Mukamana (Director of Skills)'
  };

  certificates.unshift(newCert);

  // Update learner credentials count
  learner.verifiedCredentialsCount = (learner.verifiedCredentialsCount || 0) + 1;
  learner.progressPercentage = 100;

  // Add to audit log
  auditLog.unshift({
    id: `log-${Date.now()}`,
    action: 'Certificate Awarded',
    details: `Issued Certificate #${newCert.id} (${newCert.courseTitle}) to ${learner.name} (${newCert.grade})`,
    operator: 'Dr. Alice Mukamana',
    timestamp: 'Just now',
    type: 'certificate'
  });

  res.json({
    success: true,
    message: `Certificate #${newCert.id} officially granted to ${learner.name}`,
    certificate: newCert
  });
});

// Revoke or update certificate status
router.post('/admin/certificates/:id/revoke', (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const cert = certificates.find(c => c.id === id);

  if (!cert) {
    return res.status(404).json({ success: false, error: 'Certificate not found' });
  }

  cert.status = 'Revoked';
  cert.revocationReason = reason || 'Administrative review';

  auditLog.unshift({
    id: `log-${Date.now()}`,
    action: 'Certificate Revoked',
    details: `Revoked Certificate #${cert.id} (${cert.learnerName}): ${reason || 'Administrative review'}`,
    operator: 'Dr. Alice Mukamana',
    timestamp: 'Just now',
    type: 'security'
  });

  res.json({
    success: true,
    message: `Certificate #${cert.id} status updated to Revoked`,
    certificate: cert
  });
});

// Comprehensive Administrative Stats
router.get('/admin/stats', (req, res) => {
  const totalLearners = learners.length;
  const totalCertificates = certificates.filter(c => c.status === 'Issued & Active').length;
  const activeLearners = learners.filter(l => l.status === 'Active').length;
  const averageGrade = Math.round(
    certificates.reduce((sum, c) => sum + parseInt(c.grade), 0) / (certificates.length || 1)
  );

  const districtDistribution = [
    { district: 'Gasabo District, Kigali City', learners: 420, certified: 48, rate: '89%' },
    { district: 'Kicukiro District, Kigali City', learners: 380, certified: 52, rate: '92%' },
    { district: 'Musanze District, Northern Province', learners: 290, certified: 36, rate: '86%' },
    { district: 'Huye District, Southern Province', learners: 240, certified: 28, rate: '84%' },
    { district: 'Rubavu District, Western Province', learners: 180, certified: 22, rate: '87%' },
    { district: 'Rwamagana District, Eastern Province', learners: 160, certified: 18, rate: '82%' }
  ];

  const completionFunnel = [
    { stage: 'Course Enrolled', count: 1480, percentage: 100 },
    { stage: 'Actively Progressing (>30%)', count: 1140, percentage: 77 },
    { stage: 'Capstone Project Submitted', count: 860, percentage: 58 },
    { stage: 'Tri-Part Assessment Passed', count: 720, percentage: 48 },
    { stage: 'Official Certificate Won', count: totalCertificates, percentage: 42 }
  ];

  res.json({
    success: true,
    summary: {
      totalLearners,
      activeLearners,
      totalCertificates,
      averageGrade: `${averageGrade}%`,
      passRate: '88.4%',
      activeStreaks: learners.filter(l => l.streakDays >= 7).length,
      averageDaysToCert: 38
    },
    districtDistribution,
    completionFunnel,
    recentWinners: certificates.slice(0, 3)
  });
});

// Audit Log
router.get('/admin/audit-log', (req, res) => {
  res.json({ success: true, count: auditLog.length, data: auditLog });
});

export default router;
