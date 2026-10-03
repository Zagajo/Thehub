import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  TrendingUp,
  MapPin,
  ExternalLink,
  ChevronRight,
  UserCheck,
  AlertCircle,
  FileText,
  Sparkles,
  BarChart3,
  Flame,
  PlusCircle,
  X,
  Printer,
  KeyRound,
  History,
  GraduationCap,
  Activity,
  Laptop,
  Smartphone,
  Wifi,
  Radio,
  Timer,
  BookOpen,
  CheckCheck,
  Send,
  Sliders,
  PieChart
} from 'lucide-react';
import { api } from '../services/api.js';

export default function AdminDashboard({ user, onOpenAuth }) {
  // Tabs:
  // 1. 'active-users' => Total Active & Signed-in Users (live sessions, presence, devices, locations)
  // 2. 'progress'     => Learner Progress & Curriculum Completion (tracking who finished, earned certificates, drop-offs)
  // 3. 'tracking-specs' => Tracking Specs & System Telemetry (DAU/WAU, velocity, geographic coverage, completion metrics)
  const [activeTab, setActiveTab] = useState('active-users');

  // Data states
  const [overview, setOverview] = useState(null);
  const [stats, setStats] = useState(null);
  const [learners, setLearners] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [sessionFilter, setSessionFilter] = useState('All');
  const [completionFilter, setCompletionFilter] = useState('All');

  // Modals
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [viewCertificateModal, setViewCertificateModal] = useState(null);
  const [issueCertModal, setIssueCertModal] = useState(false);
  const [actionNotice, setActionNotice] = useState(null);

  // Quick action form states
  const [newCertLearnerId, setNewCertLearnerId] = useState('');
  const [newCertCourse, setNewCertCourse] = useState('Data Analytics with Python & SQL');
  const [newCertGrade, setNewCertGrade] = useState('95%');
  const [newCertDistinction, setNewCertDistinction] = useState('First Class Distinction');

  const districts = [
    'All',
    'Gasabo',
    'Kicukiro',
    'Nyarugenge',
    'Musanze',
    'Gicumbi',
    'Huye',
    'Rubavu',
    'Rwamagana'
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [oRes, sRes, uRes, cRes] = await Promise.all([
        api.getAdminOverview(),
        api.getAdminStats(),
        api.getAdminUsers({
          search,
          district: districtFilter,
          sessionStatus: sessionFilter,
          completion: completionFilter
        }),
        api.getAdminCertificates()
      ]);

      if (oRes.success) setOverview(oRes);
      if (sRes.success) setStats(sRes);
      if (uRes.success) setLearners(uRes.data);
      if (cRes.success) setCertificates(cRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [search, districtFilter, sessionFilter, completionFilter]);

  const showNotification = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleToggleUserStatus = async (learnerId, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    try {
      const res = await api.updateAdminUserRole(learnerId, null, nextStatus);
      if (res.success) {
        showNotification(`Learner account status updated to ${nextStatus}`);
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleIssueCertificate = async (e) => {
    e.preventDefault();
    if (!newCertLearnerId) return;

    try {
      const res = await api.issueAdminCertificate({
        learnerId: newCertLearnerId,
        courseTitle: newCertCourse,
        grade: newCertGrade,
        distinction: newCertDistinction,
        skills: ['Verified Capstone Evidence', 'NISR Macroeconomic Analysis', 'Domain Mastery']
      });

      if (res.success) {
        showNotification(res.message);
        setIssueCertModal(false);
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signedInCount = learners.filter(l => l.sessionStatus?.includes('Signed In')).length;
  const finishedCertCount = learners.filter(l => l.hasFinishedCertificate).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Executive Command Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>THE HUB • CENTRAL ADMINISTRATIVE MANAGEMENT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Administrator Operations Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time telemetry for signed-in sessions, syllabus completion tracking, graduation certs, and platform tracking specifications.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIssueCertModal(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black transition flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>Award Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* KPI Telemetry Header Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Currently Signed In */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
            <span>Signed In Now</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <span className="text-2xl font-black text-slate-900 mt-1 block flex items-center space-x-1.5">
            <span>{signedInCount}</span>
            <span className="text-xs font-bold text-emerald-600">Online</span>
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Live active sessions</span>
        </div>

        {/* Total Active Users */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Active Users</span>
          <span className="text-2xl font-black text-blue-700 mt-1 block">
            {overview?.kpis?.activeLearners || learners.length}
          </span>
          <span className="text-[10px] text-blue-600 font-semibold mt-0.5 block">
            {overview?.kpis?.districtReachCount || 22} Districts Covered
          </span>
        </div>

        {/* Finished & Won Certificate */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Finished & Won Cert</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block flex items-center space-x-1">
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
            <span>{finishedCertCount}</span>
          </span>
          <span className="text-[10px] text-amber-700 font-semibold mt-0.5 block">
            Graduated with Honors
          </span>
        </div>

        {/* Average Progress */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Avg. Progress</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">
            {overview?.kpis?.avgProgress || 71}%
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Syllabus completion</span>
        </div>

        {/* Average Session Duration */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Avg. Session Time</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block flex items-center space-x-1">
            <Timer className="w-5 h-5 text-slate-400" />
            <span>{overview?.kpis?.averageSessionMins || 46}m</span>
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Engaged study time</span>
        </div>

        {/* Active Learning Streaks */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Active Streaks</span>
          <span className="text-2xl font-black text-red-600 mt-1 block flex items-center space-x-1">
            <Flame className="w-5 h-5 fill-red-500 text-red-500" />
            <span>{overview?.kpis?.activeStreaks || 7}</span>
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">&ge; 7-day study consistency</span>
        </div>
      </div>

      {/* CORE ADMIN NAVIGATION TABS */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs flex flex-wrap gap-2 text-xs font-bold">
        {/* TAB 1: TOTAL ACTIVE & SIGNED IN USERS */}
        <button
          onClick={() => setActiveTab('active-users')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 ${
            activeTab === 'active-users'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Active & Signed-In Users ({signedInCount} online • {learners.length} total)</span>
        </button>

        {/* TAB 2: LEARNER PROGRESS & CURRICULUM TRACKING */}
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 ${
            activeTab === 'progress'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>Learner Progress & Certificate Winners ({finishedCertCount} won)</span>
        </button>

        {/* TAB 3: TRACKING SPECS & TELEMETRY */}
        <button
          onClick={() => setActiveTab('tracking-specs')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 ${
            activeTab === 'tracking-specs'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-blue-400" />
          <span>Tracking Specs & Performance Telemetry</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TOTAL ACTIVE & SIGNED IN USERS */}
      {/* ========================================================================= */}
      {activeTab === 'active-users' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Live User Session & Access Roster
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 mt-1">
                Signed-In & Active Learners Across Rwanda
              </h2>
              <p className="text-xs text-slate-500">
                Monitors active credentials, login duration, current lesson activities, devices, and connection status.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                {signedInCount} Signed In Right Now
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">
                {learners.length} Registered Accounts
              </span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search signed-in users by name, email, device, or district..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={sessionFilter}
                onChange={(e) => setSessionFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="All">All Session States</option>
                <option value="Signed In">Signed In (Active Now)</option>
                <option value="Mobile">Mobile Sessions</option>
                <option value="Idle">Idle Users</option>
              </select>

              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                {districts.map(d => (
                  <option key={d} value={d}>{d === 'All' ? 'All Rwanda Districts' : d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-3.5">Learner Profile</th>
                  <th className="p-3.5">Session Status</th>
                  <th className="p-3.5">Current Activity</th>
                  <th className="p-3.5">Signed In / Duration</th>
                  <th className="p-3.5">Device & Network</th>
                  <th className="p-3.5">District Location</th>
                  <th className="p-3.5">Account Status</th>
                  <th className="p-3.5 text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {learners.map((learner) => {
                  const isOnline = learner.sessionStatus?.includes('Signed In');
                  const isMobile = learner.sessionStatus?.includes('Mobile');
                  return (
                    <tr key={learner.id} className="hover:bg-slate-50/60 transition">
                      {/* Learner Profile */}
                      <td className="p-3.5">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                            isOnline
                              ? 'bg-blue-100 text-blue-800 ring-2 ring-emerald-500'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {learner.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{learner.name}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{learner.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Session Status */}
                      <td className="p-3.5">
                        <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isOnline
                            ? 'bg-emerald-100 text-emerald-800'
                            : learner.sessionStatus?.includes('Idle')
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isOnline ? 'bg-emerald-500' : learner.sessionStatus?.includes('Idle') ? 'bg-amber-500' : 'bg-slate-400'
                          }`}></span>
                          <span>{learner.sessionStatus || 'Signed In (Online)'}</span>
                        </span>
                      </td>

                      {/* Current Activity */}
                      <td className="p-3.5 max-w-[200px]">
                        <span className="text-[11px] text-slate-800 font-semibold block truncate" title={learner.currentActivity}>
                          {learner.currentActivity || 'Studying Data Analysis syllabus'}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{learner.targetRole}</span>
                      </td>

                      {/* Signed In / Duration */}
                      <td className="p-3.5">
                        <span className="font-mono text-[11px] text-slate-700 block font-bold">
                          {learner.lastSignedIn || 'Just now'}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                          <Timer className="w-3 h-3" />
                          <span>Session: {learner.sessionDuration || '35 mins'}</span>
                        </span>
                      </td>

                      {/* Device & Network */}
                      <td className="p-3.5 text-slate-600">
                        <div className="flex items-center space-x-1 text-[11px] font-medium">
                          {isMobile ? (
                            <Smartphone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          ) : (
                            <Laptop className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          )}
                          <span className="truncate max-w-[140px]">{learner.device || 'Web Browser'}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate max-w-[140px]">
                          {learner.network || 'Broadband'}
                        </span>
                      </td>

                      {/* District Location */}
                      <td className="p-3.5">
                        <div className="flex items-center space-x-1 text-slate-700 font-medium">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[130px]">{learner.location.split(',')[0]}</span>
                        </div>
                      </td>

                      {/* Account Status */}
                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleUserStatus(learner.id, learner.status)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                            learner.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100'
                          }`}
                        >
                          {learner.status}
                        </button>
                      </td>

                      {/* Admin Action */}
                      <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => setSelectedLearner(learner)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LEARNER PROGRESS & CURRICULUM COMPLETION */}
      {/* ========================================================================= */}
      {activeTab === 'progress' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-[10px] uppercase">
                  Progress Mastery & Certification Tracking
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Curriculum Milestones & Certificate Winners
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 mt-1">
                Learner Progress & Those Who Finished for a Certificate
              </h2>
              <p className="text-xs text-slate-500">
                Live syllabus progression tracker distinguishing active learners from completed certificate winners.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIssueCertModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-2xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Grant Certificate</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search progress by learner, course, or certification ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={completionFilter}
                onChange={(e) => setCompletionFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="All">All Progress States</option>
                <option value="finished">Finished & Won Certificate</option>
                <option value="in-progress">In Progress (Active Coursework)</option>
              </select>

              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                {districts.map(d => (
                  <option key={d} value={d}>{d === 'All' ? 'All Districts' : d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Progress Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="p-3.5">Learner & Pathway</th>
                  <th className="p-3.5">Syllabus Completion</th>
                  <th className="p-3.5">Study Hours</th>
                  <th className="p-3.5">Velocity</th>
                  <th className="p-3.5">Quiz Mastery</th>
                  <th className="p-3.5">Certificate Award Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {learners.map((learner) => {
                  const hasWon = learner.hasFinishedCertificate;
                  return (
                    <tr key={learner.id} className={hasWon ? 'bg-amber-50/30 hover:bg-amber-50/50 transition' : 'hover:bg-slate-50/60 transition'}>
                      {/* Learner Info */}
                      <td className="p-3.5">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                            hasWon ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {learner.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{learner.name}</span>
                            <span className="text-[11px] text-slate-500">{learner.location.split(',')[0]} • {learner.targetRole}</span>
                          </div>
                        </div>
                      </td>

                      {/* Syllabus Progress Bar */}
                      <td className="p-3.5">
                        <div className="w-36 space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span>{learner.completedLessonsCount}/{learner.totalLessonsCount} lessons</span>
                            <span className={hasWon ? 'text-amber-700 font-black' : 'text-blue-700'}>
                              {learner.progressPercentage}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                hasWon ? 'bg-amber-500' : 'bg-blue-600'
                              }`}
                              style={{ width: `${learner.progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Study Hours */}
                      <td className="p-3.5">
                        <span className="font-mono font-bold text-slate-800 text-[11px] block">
                          {learner.studyHoursTotal || 28.5} hrs
                        </span>
                        <span className="text-[10px] text-slate-400">Total logged</span>
                      </td>

                      {/* Velocity */}
                      <td className="p-3.5">
                        <span className="text-[11px] font-bold text-emerald-700 block">
                          {learner.learningVelocity || '3.5 lessons/wk'}
                        </span>
                        <span className="text-[10px] text-slate-400">Pace</span>
                      </td>

                      {/* Quiz Average */}
                      <td className="p-3.5">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                          {learner.quizAverage || 84}%
                        </span>
                      </td>

                      {/* Certificate Award Status */}
                      <td className="p-3.5">
                        {hasWon ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-black text-[10px]">
                              <Award className="w-3 h-3 text-amber-700" />
                              <span>CERTIFIED WINNER</span>
                            </span>
                            <span className="text-[10px] font-mono text-slate-600 block">
                              {learner.certificateTitle}
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>In Progress ({learner.progressPercentage}%)</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => setSelectedLearner(learner)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition"
                        >
                          Dossier
                        </button>

                        <button
                          onClick={() => {
                            setNewCertLearnerId(learner.id);
                            setIssueCertModal(true);
                          }}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold transition"
                        >
                          {hasWon ? 'Re-Issue' : 'Award Cert'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TRACKING SPECS & PERFORMANCE TELEMETRY */}
      {/* ========================================================================= */}
      {activeTab === 'tracking-specs' && (
        <div className="space-y-6">
          {/* Tracking Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spec 1: User Retention & Active Ratios */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-blue-700">
                <Activity className="w-5 h-5" />
                <h3 className="font-extrabold text-slate-900 text-base">User Activity Retention</h3>
              </div>
              <p className="text-xs text-slate-500">
                Deterministic measurement of Daily and Weekly Active User presence.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">DAU / WAU Ratio</span>
                  <span className="font-mono font-black text-blue-700 text-sm">68.4%</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Average Session Length</span>
                  <span className="font-mono font-black text-emerald-700 text-sm">46.2 mins</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Mobile Session Share</span>
                  <span className="font-mono font-black text-slate-900 text-sm">38.0% (Android)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Low-Bandwidth Mode Usage</span>
                  <span className="font-mono font-black text-amber-700 text-sm">18.5%</span>
                </div>
              </div>
            </div>

            {/* Spec 2: Curriculum Completion Funnel */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-amber-600">
                <GraduationCap className="w-5 h-5" />
                <h3 className="font-extrabold text-slate-900 text-base">Graduation Conversion</h3>
              </div>
              <p className="text-xs text-slate-500">
                From enrollment through practical capstone to certificate award.
              </p>

              <div className="space-y-2.5 pt-2">
                {stats?.completionFunnel?.map((step, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-800">{step.stage}</span>
                      <span className="text-blue-700 font-mono">{step.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${step.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec 3: Provincial Economic Alignment */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-emerald-600">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-extrabold text-slate-900 text-base">NST2 Sector Pipelines</h3>
              </div>
              <p className="text-xs text-slate-500">
                Learners enrolled aligned with Rwanda's National Strategy for Transformation.
              </p>

              <div className="space-y-2.5 pt-2">
                {overview?.sectorBreakdown?.map((sec, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{sec.sector}</span>
                      <span className="text-[10px] text-slate-400">{sec.learners} learners</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                      {sec.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* District Performance Heat Roster */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">
              Rwanda District Geographic Performance & Completion Matrix
            </h3>
            <p className="text-xs text-slate-500">
              NISR labour data benchmarking learner density and completion rates by district.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="p-3">District</th>
                    <th className="p-3">Province</th>
                    <th className="p-3">Active Learners</th>
                    <th className="p-3">Certified Graduates</th>
                    <th className="p-3">Pass Rate</th>
                    <th className="p-3">Dominant Pathway</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {stats?.districtDistribution?.map((dist, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-900">{dist.district.split(',')[0]}</td>
                      <td className="p-3 text-slate-500">{dist.district.split(',')[1] || 'Rwanda'}</td>
                      <td className="p-3 font-mono text-slate-800">{dist.learners}</td>
                      <td className="p-3 font-mono font-bold text-amber-700">{dist.certified}</td>
                      <td className="p-3 font-bold text-emerald-700">{dist.rate}</td>
                      <td className="p-3 text-slate-600">
                        {i % 2 === 0 ? 'Data Analytics & Statistics' : 'Agribusiness & Cooperatives'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INSPECT LEARNER DOSSIER */}
      {selectedLearner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">Comprehensive Learner Dossier</span>
                <h3 className="font-extrabold text-slate-900 text-lg">{selectedLearner.name}</h3>
                <span className="text-xs text-slate-500">{selectedLearner.location} • {selectedLearner.email}</span>
              </div>
              <button onClick={() => setSelectedLearner(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Session Specs */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/70 text-xs space-y-1 text-blue-950">
                <span className="font-bold block">Live Session Telemetry</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <span><strong>Status:</strong> {selectedLearner.sessionStatus}</span>
                  <span><strong>Duration:</strong> {selectedLearner.sessionDuration}</span>
                  <span><strong>Device:</strong> {selectedLearner.device}</span>
                  <span><strong>Network:</strong> {selectedLearner.network}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Syllabus Completion</span>
                  <span className="text-blue-700">{selectedLearner.progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${selectedLearner.progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Completed {selectedLearner.completedLessonsCount} out of {selectedLearner.totalLessonsCount} lessons. Logged {selectedLearner.studyHoursTotal} study hours.
                </span>
              </div>

              {/* Assessed Competencies */}
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1.5">Assessed Competency Matrix</span>
                <div className="space-y-1.5">
                  {selectedLearner.assessedSkills?.map((s, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 rounded-lg flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800">{s.name}</span>
                      <span className="font-mono font-bold text-blue-700">{s.score}% ({s.level})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedLearner(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: GRANT NEW CERTIFICATE */}
      {issueCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-base">Issue Official Certificate</h3>
              </div>
              <button onClick={() => setIssueCertModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueCertificate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Learner Graduate</label>
                <select
                  required
                  value={newCertLearnerId}
                  onChange={(e) => setNewCertLearnerId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value="">-- Choose Learner --</option>
                  {learners.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} — {l.location.split(',')[0]} ({l.progressPercentage}% progress)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Program of Study</label>
                <select
                  value={newCertCourse}
                  onChange={(e) => setNewCertCourse(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value="Data Analytics with Python & SQL">Data Analytics with Python & SQL</option>
                  <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                  <option value="Professional English for the Rwandan Workplace">Professional English for the Rwandan Workplace</option>
                  <option value="Modern Agribusiness & Cooperative Supply Chains">Modern Agribusiness & Cooperative Supply Chains</option>
                  <option value="MICE Tourism & High-End Hospitality">MICE Tourism & High-End Hospitality</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Final Score</label>
                  <input
                    type="text"
                    required
                    value={newCertGrade}
                    onChange={(e) => setNewCertGrade(e.target.value)}
                    placeholder="e.g. 95%"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Honors Distinction</label>
                  <select
                    value={newCertDistinction}
                    onChange={(e) => setNewCertDistinction(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="First Class Distinction">First Class Distinction</option>
                    <option value="High Honours">High Honours</option>
                    <option value="Summa Cum Laude">Summa Cum Laude</option>
                    <option value="Honours Certification">Honours Certification</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIssueCertModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!newCertLearnerId}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-black transition flex items-center space-x-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Grant Official Diploma</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
