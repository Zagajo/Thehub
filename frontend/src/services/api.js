// API Client for The Hub backend

export const api = {
  async getHealth() {
    const res = await fetch('/api/health');
    return res.json();
  },

  async getCourses(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.difficulty && filters.difficulty !== 'All') params.append('difficulty', filters.difficulty);
    if (filters.search) params.append('search', filters.search);
    const res = await fetch(`/api/courses?${params.toString()}`);
    return res.json();
  },

  async getCourseBySlug(slug) {
    const res = await fetch(`/api/courses/${slug}`);
    return res.json();
  },

  async enrollCourse(id) {
    const res = await fetch(`/api/courses/${id}/enroll`, { method: 'POST' });
    return res.json();
  },

  async getSkills() {
    const res = await fetch('/api/skills');
    return res.json();
  },

  async getNisrIndicators() {
    const res = await fetch('/api/nisr/indicators');
    return res.json();
  },

  async getNisrLabourSummary() {
    const res = await fetch('/api/nisr/labour');
    return res.json();
  },

  async getNisrProvinces() {
    const res = await fetch('/api/nisr/provinces');
    return res.json();
  },

  async getLearningPaths() {
    const res = await fetch('/api/learning-paths');
    return res.json();
  },

  async analyzeSkillGaps(userSkills, targetRoleId) {
    const res = await fetch('/api/recommendations/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userSkills, targetRoleId })
    });
    return res.json();
  },

  async getAssessments() {
    const res = await fetch('/api/assessments');
    return res.json();
  },

  async submitAssessment(id, data) {
    const res = await fetch(`/api/assessments/${id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getAuthUser() {
    const res = await fetch('/api/auth/me');
    return res.json();
  },

  async login(credentials) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },

  async register(registrationData) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });
    return res.json();
  },

  async demoLogin() {
    const res = await fetch('/api/auth/demo-login', { method: 'POST' });
    return res.json();
  },

  async updateProfile(profileData) {
    const res = await fetch('/api/auth/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    return res.json();
  },

  async changePassword(passwordData) {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwordData)
    });
    return res.json();
  },

  async logout() {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    return res.json();
  },

  async getPeerMatches() {
    const res = await fetch('/api/peers/matches');
    return res.json();
  },

  async requestPeerMatch(matchData) {
    const res = await fetch('/api/peers/request-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchData)
    });
    return res.json();
  },

  async getChallenges() {
    const res = await fetch('/api/challenges');
    return res.json();
  },

  async askAiTutor(question, contextCourse, learnerLevel) {
    const res = await fetch('/api/ai/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, contextCourse, learnerLevel })
    });
    return res.json();
  },

  // Admin Portal Methods
  async adminLogin() {
    const res = await fetch('/api/auth/admin-login', { method: 'POST' });
    return res.json();
  },

  async getAdminOverview() {
    const res = await fetch('/api/admin/overview');
    return res.json();
  },

  async getAdminUsers(filters = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.district && filters.district !== 'All') params.append('district', filters.district);
    if (filters.role && filters.role !== 'All') params.append('role', filters.role);
    if (filters.sessionStatus && filters.sessionStatus !== 'All') params.append('sessionStatus', filters.sessionStatus);
    if (filters.completion && filters.completion !== 'All') params.append('completion', filters.completion);
    const res = await fetch(`/api/admin/users?${params.toString()}`);
    return res.json();
  },

  async updateAdminUserRole(id, role, status) {
    const res = await fetch(`/api/admin/users/${id}/update-role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, status })
    });
    return res.json();
  },

  async awardAdminCredential(id, data) {
    const res = await fetch(`/api/admin/users/${id}/award-credential`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getAdminTasks() {
    const res = await fetch('/api/admin/tasks');
    return res.json();
  },

  async reviewAdminTask(id, data) {
    const res = await fetch(`/api/admin/tasks/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getAdminStats() {
    const res = await fetch('/api/admin/stats');
    return res.json();
  },

  async getAdminCertificates(filters = {}) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.course && filters.course !== 'All') params.append('course', filters.course);
    if (filters.district && filters.district !== 'All') params.append('district', filters.district);
    const res = await fetch(`/api/admin/certificates?${params.toString()}`);
    return res.json();
  },

  async issueAdminCertificate(certData) {
    const res = await fetch('/api/admin/certificates/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(certData)
    });
    return res.json();
  },

  async revokeAdminCertificate(id, reason) {
    const res = await fetch(`/api/admin/certificates/${id}/revoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    return res.json();
  },

  async getAdminAuditLog() {
    const res = await fetch('/api/admin/audit-log');
    return res.json();
  }
};
