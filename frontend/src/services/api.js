// Resilient API Client for The Hub backend
import { getFallbackForUrl } from './fallbackData.js';

/**
 * Safe fetch helper that guarantees:
 * 1. Checks content-type before parsing JSON to prevent SyntaxError: Unexpected token '<'
 * 2. Automatic retry for transient connection failures in iframe environments
 * 3. Graceful fallback data provider so UI never encounters blank or broken states
 * 4. Suppresses fatal console.error exceptions on transient network interrupts
 */
async function safeFetch(url, options = {}, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      const contentType = res.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const data = await res.json();
        return data;
      }

      // If server returned non-JSON (e.g. proxy starting up)
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 250 * (attempt + 1)));
        continue;
      }

      const fallback = getFallbackForUrl(url);
      if (fallback) {
        return { success: true, data: fallback, fromFallback: true };
      }

      return {
        success: false,
        error: `Server returned non-JSON response (${res.status} ${res.statusText}).`,
        data: null
      };
    } catch (err) {
      // Retry transient network errors (e.g. TypeError: Failed to fetch during container/proxy init)
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 250 * (attempt + 1)));
        continue;
      }

      console.warn(`[The Hub API] ${url} unavailable, using resilient fallback data:`, err.message);

      const fallback = getFallbackForUrl(url);
      if (fallback) {
        return { success: true, data: fallback, fromFallback: true };
      }

      return {
        success: false,
        error: err.message || 'Network request failed. Please check your connection.',
        data: null
      };
    }
  }
}

export const api = {
  async getHealth() {
    return safeFetch('/api/health');
  },

  async getCourses(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.difficulty && filters.difficulty !== 'All') params.append('difficulty', filters.difficulty);
    if (filters.search) params.append('search', filters.search);
    return safeFetch(`/api/courses?${params.toString()}`);
  },

  async getCourseBySlug(slug) {
    return safeFetch(`/api/courses/${slug}`);
  },

  async enrollCourse(id) {
    return safeFetch(`/api/courses/${id}/enroll`, { method: 'POST' });
  },

  async getSkills() {
    return safeFetch('/api/skills');
  },

  async getNisrIndicators() {
    return safeFetch('/api/nisr/indicators');
  },

  async getNisrLabourSummary() {
    return safeFetch('/api/nisr/labour');
  },

  async getNisrProvinces() {
    return safeFetch('/api/nisr/provinces');
  },

  async getLearningPaths() {
    return safeFetch('/api/learning-paths');
  },

  async analyzeSkillGaps(userSkills, targetRoleId) {
    const safeSkills = Array.isArray(userSkills) ? userSkills : [];
    return safeFetch('/api/recommendations/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userSkills: safeSkills, targetRoleId })
    });
  },

  async getAssessments(params = {}) {
    const query = new URLSearchParams();
    if (params.courseId && params.courseId !== 'All') query.set('courseId', params.courseId);
    if (params.difficulty && params.difficulty !== 'All') query.set('difficulty', params.difficulty);
    if (params.search) query.set('search', params.search);
    const qs = query.toString();
    return safeFetch(`/api/assessments${qs ? `?${qs}` : ''}`);
  },

  async submitAssessment(id, data) {
    return safeFetch(`/api/assessments/${id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  async getAuthUser() {
    return safeFetch('/api/auth/me');
  },

  async login(credentials) {
    return safeFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
  },

  async register(registrationData) {
    return safeFetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });
  },

  async demoLogin() {
    return safeFetch('/api/auth/demo-login', { method: 'POST' });
  },

  async updateProfile(profileData) {
    return safeFetch('/api/auth/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
  },

  async changePassword(passwordData) {
    return safeFetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwordData)
    });
  },

  async logout() {
    return safeFetch('/api/auth/logout', { method: 'POST' });
  },

  async getPeerMatches() {
    return safeFetch('/api/peers/matches');
  },

  async requestPeerMatch(matchData) {
    return safeFetch('/api/peers/request-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchData)
    });
  },

  async getChallenges() {
    return safeFetch('/api/challenges');
  },

  async askAiTutor(question, contextCourse, learnerLevel) {
    return safeFetch('/api/ai/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, contextCourse, learnerLevel })
    });
  },

  // Admin Portal Methods
  async adminLogin(credentials) {
    return safeFetch('/api/auth/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
  },

  async getAdminOverview() {
    return safeFetch('/api/admin/overview');
  },

  async getAdminUsers(filters = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.district && filters.district !== 'All') params.append('district', filters.district);
    if (filters.role && filters.role !== 'All') params.append('role', filters.role);
    if (filters.sessionStatus && filters.sessionStatus !== 'All') params.append('sessionStatus', filters.sessionStatus);
    if (filters.completion && filters.completion !== 'All') params.append('completion', filters.completion);
    return safeFetch(`/api/admin/users?${params.toString()}`);
  },

  async updateAdminUserRole(id, role, status) {
    return safeFetch(`/api/admin/users/${id}/update-role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, status })
    });
  },

  async awardAdminCredential(id, data) {
    return safeFetch(`/api/admin/users/${id}/award-credential`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  async getAdminTasks() {
    return safeFetch('/api/admin/tasks');
  },

  async createAdminCourse(courseData) {
    return safeFetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });
  },

  async deleteAdminCourse(id) {
    return safeFetch(`/api/admin/courses/${id}`, {
      method: 'DELETE'
    });
  },

  async reviewAdminTask(id, data) {
    return safeFetch(`/api/admin/tasks/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  async getAdminStats() {
    return safeFetch('/api/admin/stats');
  },

  async getAdminCertificates(filters = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.course && filters.course !== 'All') params.append('course', filters.course);
    if (filters.district && filters.district !== 'All') params.append('district', filters.district);
    return safeFetch(`/api/admin/certificates?${params.toString()}`);
  },

  async issueAdminCertificate(certData) {
    return safeFetch('/api/admin/certificates/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(certData)
    });
  },

  async revokeAdminCertificate(id, reason) {
    return safeFetch(`/api/admin/certificates/${id}/revoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
  },

  async getAdminAuditLog() {
    return safeFetch('/api/admin/audit-log');
  }
};
