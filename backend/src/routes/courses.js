import { Router } from 'express';

const router = Router();

// In-memory / persistent cache seeded from course dataset
const coursesList = [
  {
    id: 'crs-web-fund',
    title: 'Web Development Fundamentals: HTML & CSS',
    slug: 'web-development-fundamentals',
    description: 'Build modern, mobile-first responsive web interfaces using semantic HTML5 and clean CSS styling principles. Learn real-world layout techniques like Flexbox and CSS Grid.',
    short_description: 'Learn to build clean, responsive websites from scratch.',
    thumbnail_url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop',
    category: 'Technology',
    difficulty: 'Beginner',
    estimated_hours: 10,
    instructor_name: 'Aline Uwase',
    language: 'English',
    skillsGained: ['HTML5', 'CSS3', 'Responsive Design', 'Web Accessibility'],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: The Semantic Structure of the Web (HTML5)',
        lessons: [
          { id: 'lsn-1', title: 'Introduction to HTML5 & Web Standards', duration: '15 min', type: 'article' },
          { id: 'lsn-2', title: 'Semantic Hierarchy & Content Structuring', duration: '20 min', type: 'article' },
          { id: 'lsn-3', title: 'Links, Images & Media Elements', duration: '25 min', type: 'exercise' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Styling and Layouts with CSS3',
        lessons: [
          { id: 'lsn-4', title: 'The CSS Box Model Explained', duration: '20 min', type: 'article' },
          { id: 'lsn-5', title: 'Fluid Layouts with CSS Flexbox', duration: '30 min', type: 'exercise' },
          { id: 'lsn-6', title: 'CSS Grid & Mobile-First Media Queries', duration: '35 min', type: 'exercise' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Capstone Portfolio Project',
        lessons: [
          { id: 'lsn-7', title: 'Project Brief: 3-Page Responsive Portfolio', duration: '45 min', type: 'project' }
        ]
      }
    ]
  },
  {
    id: 'crs-excel-data',
    title: 'Excel Fundamentals for Business & Data Analysis',
    slug: 'excel-fundamentals-data-analysis',
    description: 'Master formulas, VLOOKUP/XLOOKUP, pivot tables, data visualization, and financial modelling in modern spreadsheets for workplace productivity.',
    short_description: 'Spreadsheet mastery for everyday workplace efficiency.',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
    category: 'Data',
    difficulty: 'Beginner',
    estimated_hours: 8,
    instructor_name: 'Jean-Paul Habimana',
    language: 'English',
    skillsGained: ['Spreadsheet Formulas', 'Pivot Tables', 'Data Cleaning', 'Business Reporting'],
    modules: [
      {
        id: 'mod-ex-1',
        title: 'Module 1: Core Spreadsheet Mechanics',
        lessons: [
          { id: 'lsn-ex-1', title: 'Navigation, Formatting & Data Types', duration: '15 min', type: 'article' },
          { id: 'lsn-ex-2', title: 'Essential Formulas: SUM, AVERAGE, COUNTIF', duration: '25 min', type: 'exercise' }
        ]
      },
      {
        id: 'mod-ex-2',
        title: 'Module 2: Pivot Tables & Visual Summaries',
        lessons: [
          { id: 'lsn-ex-3', title: 'Pivot Tables from Raw Transaction Logs', duration: '30 min', type: 'exercise' },
          { id: 'lsn-ex-4', title: 'Executive Charts and KPI Slicers', duration: '25 min', type: 'project' }
        ]
      }
    ]
  },
  {
    id: 'crs-python-prog',
    title: 'Python Fundamentals for Practical Problem Solving',
    slug: 'python-fundamentals-practical',
    description: 'Core Python programming syntax, data structures, algorithms, file I/O, and practical data automation scripts from the ground up.',
    short_description: 'Learn programming from zero with hands-on exercises.',
    thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop',
    category: 'Technology',
    difficulty: 'Beginner',
    estimated_hours: 14,
    instructor_name: 'Eric Mugisha',
    language: 'English',
    skillsGained: ['Python 3', 'Data Structures', 'Automation', 'Problem Solving'],
    modules: [
      {
        id: 'mod-py-1',
        title: 'Module 1: Variables, Types & Conditionals',
        lessons: [
          { id: 'lsn-py-1', title: 'Introduction to Python & Runtime Setup', duration: '20 min', type: 'article' },
          { id: 'lsn-py-2', title: 'Loops, Lists, and Dictionary Mapping', duration: '30 min', type: 'exercise' }
        ]
      }
    ]
  },
  {
    id: 'crs-english-work',
    title: 'Workplace English Communication & Presentation',
    slug: 'workplace-english-communication',
    description: 'Confidence in professional correspondence, workplace meetings, public speaking, and technical interview situations across international workplaces.',
    short_description: 'Master verbal and written communication for modern careers.',
    thumbnail_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop',
    category: 'Languages',
    difficulty: 'Intermediate',
    estimated_hours: 12,
    instructor_name: 'Grace Mukamana',
    language: 'English',
    skillsGained: ['Professional Emailing', 'Presentation Skills', 'Meeting Facilitation', 'Interviewing'],
    modules: [
      {
        id: 'mod-eng-1',
        title: 'Module 1: Clear Written Business Communication',
        lessons: [
          { id: 'lsn-eng-1', title: 'Structuring Clear Status Reports & Emails', duration: '20 min', type: 'article' },
          { id: 'lsn-eng-2', title: 'Communicating Technical Solutions to Non-Tech Stakeholders', duration: '25 min', type: 'exercise' }
        ]
      }
    ]
  },
  {
    id: 'crs-agri-bus',
    title: 'Agribusiness Fundamentals: Value Chains & Tools',
    slug: 'agribusiness-fundamentals-value-chains',
    description: 'Explore modern agricultural value chains in Rwanda, cost optimization, digital market linkage tools, post-harvest management, and cooperative accounting.',
    short_description: 'Transform farming insights into sustainable agribusiness enterprises.',
    thumbnail_url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop',
    category: 'Agriculture',
    difficulty: 'Beginner',
    estimated_hours: 9,
    instructor_name: 'Emmanuel Nsengimana',
    language: 'English',
    skillsGained: ['Value Chain Mapping', 'Farm Bookkeeping', 'Market Price Linkages', 'Cooperative Leadership'],
    modules: [
      {
        id: 'mod-ag-1',
        title: 'Module 1: Agriculture as an Economic Engine in Rwanda',
        lessons: [
          { id: 'lsn-ag-1', title: 'NISR Agricultural Insights & Crop Value Chains', duration: '25 min', type: 'article' },
          { id: 'lsn-ag-2', title: 'Managing Working Capital & Seasons', duration: '30 min', type: 'exercise' }
        ]
      }
    ]
  },
  {
    id: 'crs-sql-mastery',
    title: 'SQL Fundamentals for Relational Databases',
    slug: 'sql-fundamentals-relational-databases',
    description: 'Write production queries, schema filters, grouped metrics, and relational table joins using standard ANSI SQL.',
    short_description: 'Structured query language for business intelligence.',
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop',
    category: 'Data',
    difficulty: 'Intermediate',
    estimated_hours: 10,
    instructor_name: 'David Kayitare',
    language: 'English',
    skillsGained: ['SELECT Queries', 'Table JOINs', 'Aggregations', 'Database Indexing'],
    modules: [
      {
        id: 'mod-sql-1',
        title: 'Module 1: Relational Querying Essentials',
        lessons: [
          { id: 'lsn-sql-1', title: 'Table Schema, Primary Keys & SELECT Statements', duration: '25 min', type: 'article' },
          { id: 'lsn-sql-2', title: 'Filtering & Aggregating with GROUP BY & HAVING', duration: '30 min', type: 'exercise' }
        ]
      }
    ]
  },
  {
    id: 'crs-tourism-hosp',
    title: 'Hospitality Fundamentals & Service Excellence',
    slug: 'hospitality-fundamentals-service-excellence',
    description: 'Professional guest relations, cross-cultural customer etiquette, and eco-tourism principles aligned with Rwanda tourism standards.',
    short_description: 'Delivering world-class guest satisfaction in hospitality.',
    thumbnail_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop',
    category: 'Tourism',
    difficulty: 'Beginner',
    estimated_hours: 8,
    instructor_name: 'Diane Ingabire',
    language: 'English',
    skillsGained: ['Customer Etiquette', 'Visitor Reception', 'Cross-Cultural Communication', 'Service Recovery'],
    modules: [
      {
        id: 'mod-tour-1',
        title: 'Module 1: Guest Satisfaction Principles',
        lessons: [
          { id: 'lsn-tour-1', title: 'First Impressions & Cultural Awareness in Hospitality', duration: '20 min', type: 'article' }
        ]
      }
    ]
  },
  {
    id: 'crs-biz-model',
    title: 'Business Model Canvas & Entrepreneurship',
    slug: 'business-model-canvas-entrepreneurship',
    description: 'Validate startup hypotheses, identify high-value customer segments, and build sustainable unit economics for early-stage ventures.',
    short_description: 'Turn practical ideas into viable business models.',
    thumbnail_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop',
    category: 'Business',
    difficulty: 'Beginner',
    estimated_hours: 11,
    instructor_name: 'Robert Gasana',
    language: 'English',
    skillsGained: ['Business Model Canvas', 'Customer Validation', 'Financial Feasibility', 'Pitching'],
    modules: [
      {
        id: 'mod-bm-1',
        title: 'Module 1: The 9 Building Blocks',
        lessons: [
          { id: 'lsn-bm-1', title: 'Value Propositions & Customer Relationships', duration: '25 min', type: 'article' }
        ]
      }
    ]
  }
];

// Track enrolled user courses
const userEnrollments = new Map();

router.get('/', (req, res) => {
  const { category, difficulty, search } = req.query;
  let filtered = [...coursesList];

  if (category && category !== 'All') {
    filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }

  if (difficulty && difficulty !== 'All') {
    filtered = filtered.filter(c => c.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.description.toLowerCase().includes(q) ||
      c.skillsGained.some(s => s.toLowerCase().includes(q))
    );
  }

  return res.json({
    success: true,
    count: filtered.length,
    courses: filtered
  });
});

router.get('/:slug', (req, res) => {
  const course = coursesList.find(c => c.slug === req.params.slug || c.id === req.params.slug);
  if (!course) {
    return res.status(404).json({
      success: false,
      error: { code: 'COURSE_NOT_FOUND', message: 'Course not found' }
    });
  }
  return res.json({ success: true, course });
});

router.post('/:id/enroll', (req, res) => {
  const { userId = 'user_demo_01' } = req.body;
  const course = coursesList.find(c => c.id === req.params.id || c.slug === req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: { code: 'COURSE_NOT_FOUND', message: 'Course not found' }
    });
  }

  const enrollmentKey = `${userId}:${course.id}`;
  const existing = userEnrollments.get(enrollmentKey) || {
    id: `enr_${Date.now()}`,
    userId,
    courseId: course.id,
    courseTitle: course.title,
    status: 'in_progress',
    progressPercentage: 15,
    enrolledAt: new Date().toISOString()
  };

  userEnrollments.set(enrollmentKey, existing);

  return res.json({
    success: true,
    message: `Successfully enrolled in ${course.title}`,
    enrollment: existing
  });
});

export default router;
