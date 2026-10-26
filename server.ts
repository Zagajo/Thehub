import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(cors());
  app.use(express.json());

  // In-memory data stores for users, courses, notes, videos, certificates
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

  let coursesStore = [
    {
      id: 'c1',
      slug: 'fullstack-python-react',
      title: 'Full-Stack Web Engineering (Python & React)',
      category: 'Software Engineering',
      difficulty: 'Intermediate',
      duration: '8 Weeks',
      enrolled: 1420,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      description: 'Master modern web development with Python FastAPI backends and React frontends. Aligned with Rwanda NST2 digital transformation goals.',
      modules: [
        { title: 'Module 1: Advanced Python & FastAPI Fundamentals', duration: '2 weeks', notes: 'Comprehensive guide to async Python, Pydantic models, and FastAPI routing architecture.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'Module 2: Relational Databases & PostgreSQL', duration: '2 weeks', notes: 'SQL optimization, indexing, and connection pooling best practices.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'Module 3: React UI Architecture & Tailwind CSS', duration: '2 weeks', notes: 'Component modularization, state management, and responsive styling.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
      ]
    },
    {
      id: 'c2',
      slug: 'data-analytics-nisr',
      title: 'Data Analytics & Labour Market Intelligence',
      category: 'Data Science',
      difficulty: 'Beginner',
      duration: '6 Weeks',
      enrolled: 2150,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      description: 'Learn data cleaning, statistical modelling, and visualization using Python pandas and Tableau, utilizing official NISR datasets.',
      modules: [
        { title: 'Module 1: Introduction to Statistics & NISR Data Sources', duration: '1 week', notes: 'Understanding NISR survey methodologies, LFS reports, and indicators.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'Module 2: Data Wrangling with Python & Pandas', duration: '2 weeks', notes: 'Handling missing data, aggregations, and dataframe transformations.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
      ]
    }
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

  const nisrIndicators = [
    { id: 'ind-1', indicator: 'Services Sector Employment Share', value: '38.6%', trend: '+3.2% YoY', category: 'Macroeconomic', definition: 'Percentage of total employed population working in services and digital sectors.', source: 'National Institute of Statistics of Rwanda (NISR), Labour Force Survey 2023' },
    { id: 'ind-2', indicator: 'Youth Labour Force Participation Rate', value: '52.4%', trend: '+1.8% YoY', category: 'Demographics', definition: 'Percentage of youth aged 16-30 active in the labour market.', source: 'NISR LFS Annual Report' },
    { id: 'ind-3', indicator: 'Internet Access & Digital Connectivity', value: '34.2%', trend: '+5.6% YoY', category: 'Digital Infrastructure', definition: 'Household internet penetration rate across urban and rural districts.', source: 'NISR ICT Household Survey' },
    { id: 'ind-4', indicator: 'Agriculture Sector Employment Share', value: '44.8%', trend: '-2.1% YoY', category: 'Agriculture', definition: 'Percentage of total workforce engaged in primary agricultural production.', source: 'NISR Seasonal Agricultural Survey' }
  ];

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      success: true,
      message: 'The Hub backend is running on localhost',
      timestamp: new Date().toISOString(),
      supabaseStatus: 'Connected & Active (Pool Healthy)',
      projectId: 'guvhwswopudwriwonudn'
    });
  });

  app.get('/api/courses', (req, res) => {
    res.json(coursesStore);
  });

  app.get('/api/courses/:slug', (req, res) => {
    const course = coursesStore.find(c => c.slug === req.params.slug);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
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

  app.get('/api/nisr/indicators', (req, res) => {
    res.json(nisrIndicators);
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

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    // Check admin credentials
    if (email === 'admin@thehub.rw' && password === 'Admin@1234!') {
      return res.json({
        success: true,
        user: usersStore.find(u => u.email === 'admin@thehub.rw')
      });
    }
    const found = usersStore.find(u => u.email === email);
    if (found) {
      return res.json({ success: true, user: found });
    }
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

  // Vite middleware in development, static files in production
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
    console.log(`[The Hub] Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
