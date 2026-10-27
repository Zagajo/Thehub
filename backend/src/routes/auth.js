import { Router } from 'express';

const router = Router();

// Demo learner profile
const demoUser = {
  id: 'usr_rwa_2026',
  email: 'learner@thehub.rw',
  fullName: 'Kezia Umutoni',
  username: 'kezia_u',
  location: 'Kigali, Rwanda',
  preferredLanguage: 'English / Kinyarwanda',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
  learningStreak: 4,
  enrolledCourses: ['crs-web-fund', 'crs-excel-data'],
  verifiedSkills: [
    { skill: 'Digital Literacy', level: 'Advanced', verified: true },
    { skill: 'HTML & CSS Web Development', level: 'Intermediate', verified: true },
    { skill: 'Excel & Spreadsheets', level: 'Intermediate', verified: true }
  ]
};

router.post('/login', (req, res) => {
  const { email } = req.body;
  return res.json({
    success: true,
    message: 'Authentication successful',
    token: `hub_jwt_${Date.now()}`,
    user: {
      ...demoUser,
      email: email || demoUser.email
    }
  });
});

router.post('/demo-login', (_req, res) => {
  return res.json({
    success: true,
    message: 'Logged in as Demo Learner (Kezia Umutoni)',
    token: `hub_demo_${Date.now()}`,
    user: demoUser
  });
});

router.get('/me', (_req, res) => {
  return res.json({
    success: true,
    user: demoUser
  });
});

export default router;
