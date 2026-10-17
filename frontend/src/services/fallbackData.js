// Client-side fallback data ensuring 100% resilience against network hiccups & offline mode

export const fallbackIndicators = [
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

export const fallbackProvinces = [
  {
    province: 'Kigali City',
    districts: ['Gasabo', 'Kicukiro', 'Nyarugenge'],
    topSectors: ['Financial Services & FinTech', 'Software & ICT', 'MICE Tourism & Hospitality'],
    youthPopulation: 420000,
    youthEmploymentRate: 64.2,
    internetPenetration: 61.5,
    priorityOpportunity: 'Data Analytics, Cloud Systems, and Business English'
  },
  {
    province: 'Northern Province',
    districts: ['Musanze', 'Burera', 'Gakenke', 'Gicumbi', 'Rulindo'],
    topSectors: ['Eco-Tourism & National Parks', 'High-Value Horticulture', 'Mining'],
    youthPopulation: 380000,
    youthEmploymentRate: 51.8,
    internetPenetration: 32.1,
    priorityOpportunity: 'Agri-Logistics, Cooperative Bookkeeping, and Tourism Hospitality'
  },
  {
    province: 'Southern Province',
    districts: ['Huye', 'Gisagara', 'Nyanza', 'Nyaruguru', 'Ruhango', 'Muhanga', 'Kamonyi', 'Nyamagabe'],
    topSectors: ['Coffee & Tea Processing', 'Higher Education Research', 'Artisanal Manufacturing'],
    youthPopulation: 460000,
    youthEmploymentRate: 53.4,
    internetPenetration: 29.8,
    priorityOpportunity: 'Agri-Tech, Statistical Analysis, and Academic Communications'
  },
  {
    province: 'Eastern Province',
    districts: ['Rwamagana', 'Kayonza', 'Kirehe', 'Nyagatare', 'Gatsibo', 'Bugesera', 'Ngoma'],
    topSectors: ['Commercial Livestock & Dairy', 'Cross-Border Logistics', 'Renewable Energy'],
    youthPopulation: 510000,
    youthEmploymentRate: 55.6,
    internetPenetration: 31.0,
    priorityOpportunity: 'Cold-Chain Management, Mobile Records, and Regional Trade Fluency'
  },
  {
    province: 'Western Province',
    districts: ['Rubavu', 'Karongi', 'Rusizi', 'Rutsiro', 'Nyamasheke', 'Ngororero', 'Nyabihu'],
    topSectors: ['Lake Kivu Commerce & Fisheries', 'Cross-Border Commerce (DRC)', 'Tea Plantations'],
    youthPopulation: 480000,
    youthEmploymentRate: 49.3,
    internetPenetration: 28.5,
    priorityOpportunity: 'Multilingual Commerce (French, Kinyarwanda, English), Logistics, and Sustainable Agro-Processing'
  }
];

export const fallbackLearningPaths = [
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

export const fallbackLabourSummary = {
  nationalServicesShare: 38.6,
  nationalAgriShare: 44.8,
  youthParticipationRate: 52.4,
  householdInternetAccess: 34.2,
  lastUpdatedYear: '2025/2026',
  provenanceSource: 'National Institute of Statistics of Rwanda (NISR)',
  methodology: 'Integrated Household Living Conditions Survey (EICV) & Labour Force Survey (LFS)'
};

export function getFallbackForUrl(url) {
  if (url.includes('/api/nisr/provinces')) return fallbackProvinces;
  if (url.includes('/api/nisr/indicators')) return fallbackIndicators;
  if (url.includes('/api/nisr/labour')) return fallbackLabourSummary;
  if (url.includes('/api/learning-paths')) return fallbackLearningPaths;
  return null;
}
