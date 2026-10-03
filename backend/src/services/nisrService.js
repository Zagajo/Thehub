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
