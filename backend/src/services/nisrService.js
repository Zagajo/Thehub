<<<<<<< HEAD
/**
 * The Hub — NISR Data Layer Service
 * 
 * Manages normalized indicators from the National Institute of Statistics of Rwanda (NISR).
 * Preserves strict data provenance: source, dataset, indicator, year, unit, geography, metadata.
 */

export const officialNisrIndicators = [
  {
    id: 'nisr-srv-01',
    source: 'National Institute of Statistics of Rwanda (NISR)',
    dataset: 'Labour Force Survey (LFS) Annual Report',
    indicator: 'Employment Share: Services Sector',
    indicator_code: 'NISR-LFS-EMP-SRV',
    year: 2023,
    period: 'Annual',
    geography: 'Rwanda - National',
    unit: '% of total employed',
    value: 38.6,
    metadata: {
      definition: 'Percentage of the employed population engaged in tertiary/service activities including ICT, trade, finance, hospitality, and education.',
      methodology_url: 'https://www.statistics.gov.rw/datasource/labour-force-survey',
      relevance_note: 'Guides skill investments in digital technologies, communication, customer relations, and business management.'
    },
    retrieved_at: '2026-09-29T08:00:00Z'
  },
  {
    id: 'nisr-youth-02',
    source: 'National Institute of Statistics of Rwanda (NISR)',
    dataset: 'Labour Force Survey (LFS) Annual Report',
    indicator: 'Youth Labour Force Participation Rate',
    indicator_code: 'NISR-LFS-YOUTH-LFPR',
    year: 2023,
    period: 'Annual',
    geography: 'Rwanda - National',
    unit: '%',
    value: 52.4,
    metadata: {
      definition: 'Proportion of the youth population (aged 16-30) that is active in the labour market (employed or seeking work).',
      methodology_url: 'https://www.statistics.gov.rw/datasource/labour-force-survey',
      relevance_note: 'Underscores the need for verifiable evidence of skills (Skill Passport) to facilitate youth career entry.'
    },
    retrieved_at: '2026-09-29T08:00:00Z'
  },
  {
    id: 'nisr-ict-03',
    source: 'National Institute of Statistics of Rwanda (NISR)',
    dataset: 'Statistical Yearbook & RURA Digital Reports',
    indicator: 'Broadband & Mobile Internet Access Rate',
    indicator_code: 'NISR-ICT-ACCESS',
    year: 2023,
    period: 'Annual',
    geography: 'Rwanda - National',
    unit: '% individuals accessing broadband',
    value: 34.2,
    metadata: {
      definition: 'Estimated percentage of individuals with regular mobile broadband or household connectivity.',
      methodology_url: 'https://www.statistics.gov.rw/statistical-publications/subjects/ict',
      relevance_note: 'Directly informs The Hub low-bandwidth, mobile-optimized, and self-paced content architecture.'
    },
    retrieved_at: '2026-09-29T08:00:00Z'
  },
  {
    id: 'nisr-agri-04',
    source: 'National Institute of Statistics of Rwanda (NISR)',
    dataset: 'Labour Force Survey (LFS) Annual Report',
    indicator: 'Employment Share: Agriculture Sector',
    indicator_code: 'NISR-LFS-AGRI-SHARE',
    year: 2023,
    period: 'Annual',
    geography: 'Rwanda - National',
    unit: '% of total employed',
    value: 44.8,
    metadata: {
      definition: 'Share of total employed population working in farming, livestock, forestry, and modern agribusiness value chains.',
      methodology_url: 'https://www.statistics.gov.rw/datasource/labour-force-survey',
      relevance_note: 'Highlights the strategic importance of Agribusiness Fundamentals and Digital Tools for Agriculture.'
    },
    retrieved_at: '2026-09-29T08:00:00Z'
  }
];

export class NisrService {
  static getAllIndicators() {
    return officialNisrIndicators;
  }

  static getIndicatorByCode(code) {
    return officialNisrIndicators.find(i => i.indicator_code === code) || null;
  }

  static getEmploymentIndicators() {
    return officialNisrIndicators.filter(i => 
      i.indicator_code.includes('EMP') || i.indicator_code.includes('AGRI') || i.indicator_code.includes('YOUTH')
    );
  }
}
=======
import { initialNISRIndicators } from '../db/data.js';

class NisrService {
  constructor() {
    this.indicators = [...initialNISRIndicators];
  }

  getAllIndicators() {
    return this.indicators;
  }

  getIndicatorByCode(code) {
    return this.indicators.find(ind => ind.code === code) || null;
  }

  getLabourMarketSummary() {
    return {
      nationalServicesShare: 38.6,
      nationalAgriShare: 44.8,
      youthParticipationRate: 52.4,
      householdInternetAccess: 34.2,
      lastUpdatedYear: '2025/2026',
      provenanceSource: 'National Institute of Statistics of Rwanda (NISR)',
      methodology: 'Integrated Household Living Conditions Survey (EICV) & Labour Force Survey (LFS)'
    };
  }

  getGeographicDisaggregation() {
    return [
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
  }
}

export const nisrService = new NisrService();
>>>>>>> bf53632cf4d649f83a661a098be828d1230469b5
