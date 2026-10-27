import { Router } from 'express';

const router = Router();

// Sample active peers in Rwanda's learning network
const mockPeers = [
  {
    id: 'peer-1',
    fullName: 'Jean-Luc Mugisha',
    location: 'Kigali (Kicukiro)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    teachingSkills: ['Kinyarwanda (Native)', 'HTML/CSS', 'Digital Literacy'],
    learningSkills: ['English Speaking', 'JavaScript', 'SQL'],
    fluentLanguages: ['Kinyarwanda', 'French'],
    learningLanguages: ['English'],
    level: 'Intermediate (Level 2)',
    mentorStatus: 'Peer Helper',
    sessionsCompleted: 14,
    availability: 'Evenings & Weekends (GMT+2)',
    preferredFormat: 'Video & Audio Call',
    bio: 'Junior web dev enthusiast based in Kigali. Looking for an English native or fluent speaker to exchange English practice for Kinyarwanda or web design help.'
  },
  {
    id: 'peer-2',
    fullName: 'Sandrine Uwase',
    location: 'Musanze, Northern Province',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces',
    teachingSkills: ['English (Fluent)', 'Excel/Data Analysis', 'Tourism Operations'],
    learningSkills: ['Python', 'French Conversation', 'Web Development'],
    fluentLanguages: ['English', 'Kinyarwanda'],
    learningLanguages: ['French'],
    level: 'Advanced (Level 3)',
    mentorStatus: 'Peer Tutor',
    sessionsCompleted: 28,
    availability: 'Weekday Mornings & Saturdays',
    preferredFormat: 'Interactive Screen Share',
    bio: 'Tourism and agro-data specialist in Musanze. Happy to help peers with Excel formulas, pivot tables, and English conversation in exchange for French or Python.'
  },
  {
    id: 'peer-3',
    fullName: 'Patrick Nshimiyimana',
    location: 'Huye, Southern Province',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
    teachingSkills: ['Python Programming', 'SQL Databases', 'Calculus'],
    learningSkills: ['Professional English', 'Digital Marketing', 'Public Speaking'],
    fluentLanguages: ['Kinyarwanda', 'French'],
    learningLanguages: ['English'],
    level: 'Advanced (Level 3)',
    mentorStatus: 'Advanced Mentor',
    sessionsCompleted: 42,
    availability: 'Flexible (After 4 PM)',
    preferredFormat: 'Code Review & Pair Programming',
    bio: 'University graduate passionate about data science. Offering Python and SQL debugging support in exchange for professional English interview prep.'
  },
  {
    id: 'peer-4',
    fullName: 'Aline Mukamana',
    location: 'Rwamagana, Eastern Province',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    teachingSkills: ['Kinyarwanda (Native)', 'Agribusiness Bookkeeping', 'Market Access'],
    learningSkills: ['Excel Spreadsheets', 'Digital Literacy', 'English for Business'],
    fluentLanguages: ['Kinyarwanda'],
    learningLanguages: ['English'],
    level: 'Intermediate (Level 2)',
    mentorStatus: 'Peer Helper',
    sessionsCompleted: 9,
    availability: 'Weekend Afternoons',
    preferredFormat: 'Group Study & Voice Notes',
    bio: 'Agribusiness entrepreneur seeking study partners to master financial spreadsheets and professional communication for export markets.'
  }
];

// Curated active study circles / cohorts
const studyGroups = [
  {
    id: 'grp-eng-speaking',
    title: 'English Speaking Practice Circle',
    category: 'Languages',
    focusSkill: 'Spoken English & Workplace Presentation',
    membersCount: 46,
    activeRooms: 3,
    schedule: 'Tuesdays & Thursdays at 6:00 PM CAT',
    nextSession: 'Tomorrow, 6:00 PM (GMT+2)',
    agenda: '40 mins: 20 mins guided topic dialogue, 20 mins open peer conversation',
    leader: 'Sandrine Uwase (Peer Tutor)',
    level: 'All Levels (Beginner to Intermediate)'
  },
  {
    id: 'grp-python-beginners',
    title: 'Python for Rwanda Data Hackathon',
    category: 'Data Science',
    focusSkill: 'Python, Pandas, & NISR Data Processing',
    membersCount: 38,
    activeRooms: 2,
    schedule: 'Mondays & Wednesdays at 7:00 PM CAT',
    nextSession: 'Today, 7:00 PM (GMT+2)',
    agenda: 'Hands-on live coding: Loading and cleaning NISR Labour Force Survey tables',
    leader: 'Patrick Nshimiyimana (Advanced Mentor)',
    level: 'Beginner to Intermediate'
  },
  {
    id: 'grp-excel-accounting',
    title: 'Excel & Financial Modeling for SMEs',
    category: 'Business & Finance',
    focusSkill: 'Spreadsheet Formulas, Budgets, & Cashflow',
    membersCount: 29,
    activeRooms: 1,
    schedule: 'Saturdays at 10:00 AM CAT',
    nextSession: 'Saturday, 10:00 AM (GMT+2)',
    agenda: 'Step-by-step cash flow forecasting template walkthrough for local cooperatives',
    leader: 'Aline Mukamana (Peer Helper)',
    level: 'Beginner'
  },
  {
    id: 'grp-webdev-circle',
    title: 'Web Development Project Studio',
    category: 'Technology',
    focusSkill: 'HTML, CSS, JavaScript & Responsive Layouts',
    membersCount: 52,
    activeRooms: 4,
    schedule: 'Daily Async + Sundays at 4:00 PM CAT',
    nextSession: 'Sunday, 4:00 PM (GMT+2)',
    agenda: 'Peer code reviews: Bring your capstone project website for constructive feedback',
    leader: 'Jean-Luc Mugisha (Peer Helper)',
    level: 'Intermediate'
  }
];

// GET /api/peer-matching/peers
router.get('/peers', (req, res) => {
  const { userGoal, currentSkill, targetLanguage } = req.query;

  // Calculate deterministic match scores if query params exist
  const peersWithScore = mockPeers.map(peer => {
    let score = 75; // baseline

    if (userGoal && peer.teachingSkills.some(s => s.toLowerCase().includes(userGoal.toLowerCase()))) {
      score += 15;
    }
    if (targetLanguage && peer.fluentLanguages.some(l => l.toLowerCase() === targetLanguage.toLowerCase())) {
      score += 10;
    }

    return {
      ...peer,
      matchScore: Math.min(98, score)
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json({
    success: true,
    total: peersWithScore.length,
    peers: peersWithScore
  });
});

// GET /api/peer-matching/study-groups
router.get('/study-groups', (_req, res) => {
  res.json({
    success: true,
    groups: studyGroups
  });
});

// POST /api/peer-matching/match
router.post('/match', (req, res) => {
  const { user, targetPeerId, learningTopic } = req.body;
  const targetPeer = mockPeers.find(p => p.id === targetPeerId) || mockPeers[0];

  // Mathematical formula: Skill Compat (30) + Goal (25) + Level (20) + Lang (15) + Availability (10)
  const calculation = {
    skillCompatibility: 28,
    goalAlignment: 24,
    levelCompatibility: 18,
    languageFit: 15,
    availabilityScore: 9,
    totalMatchPercentage: 94
  };

  res.json({
    success: true,
    matchedWith: targetPeer,
    topic: learningTopic || 'Language & Skills Exchange',
    formula: calculation,
    suggestedAgenda: [
      { minute: '00-05', action: 'Introductions & session objective setting' },
      { minute: '05-22', action: 'Part 1: Primary practice topic (e.g. English conversation or Code debug)' },
      { minute: '22-25', action: 'Midpoint feedback & transition' },
      { minute: '25-42', action: 'Part 2: Reciprocal skill exchange (e.g. Kinyarwanda practice or Excel help)' },
      { minute: '42-45', action: 'Session wrap-up & peer verification endorsement logged to Skill Passport' }
    ],
    confirmedMeetingId: `meet-${Date.now()}`
  });
});

export default router;
