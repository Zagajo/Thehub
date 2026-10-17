import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AuthModal from './components/AuthModal.jsx';
import DbTelemetryModal from './components/DbTelemetryModal.jsx';
import AiTutorModal from './components/AiTutorModal.jsx';
import EditProfileModal from './components/EditProfileModal.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import LearningPaths from './pages/LearningPaths.jsx';
import NisrInsights from './pages/NisrInsights.jsx';
import SkillPassport from './pages/SkillPassport.jsx';
import Assessments from './pages/Assessments.jsx';
import PeerMatching from './pages/PeerMatching.jsx';
import EmployerChallenges from './pages/EmployerChallenges.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { api } from './services/api.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const [pendingEnrollCourse, setPendingEnrollCourse] = useState(null);
  const [enrollNotification, setEnrollNotification] = useState(null);
  const [isDbTelemetryOpen, setIsDbTelemetryOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [currentTutorCourse, setCurrentTutorCourse] = useState(null);
  const [lowBandwidth, setLowBandwidth] = useState(false);

  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    async function initUser() {
      try {
        const res = await api.getAuthUser();
        if (res.success && res.user && res.user.id !== 'guest') {
          setUser(res.user);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error('Failed to load user profile', e);
      }
    }
    initUser();
  }, []);

  const handleEnrollCourse = async (course) => {
    if (!user || user.id === 'guest') {
      // Unauthenticated visitor: Pop up Create Account as requested!
      setPendingEnrollCourse(course);
      setAuthMode('register');
      setIsAuthOpen(true);
      return;
    }

    try {
      const res = await api.enrollCourse(course.id);
      if (res.success) {
        setUser(res.user);
        setEnrollNotification(`Successfully enrolled in "${course.title}"!`);
        setTimeout(() => setEnrollNotification(null), 4500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoginToEnroll = (course) => {
    // Unauthenticated visitor with existing account: Pop up Log In!
    setPendingEnrollCourse(course);
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = async (authenticatedUser, targetCourse) => {
    setUser(authenticatedUser);
    const courseToEnroll = targetCourse || pendingEnrollCourse;

    if (courseToEnroll) {
      try {
        const res = await api.enrollCourse(courseToEnroll.id);
        if (res.success) {
          setUser(res.user);
          setEnrollNotification(`Welcome, ${authenticatedUser.name}! You are now enrolled in "${courseToEnroll.title}".`);
          setTimeout(() => setEnrollNotification(null), 5000);
        }
      } catch (err) {
        console.error('Auto-enroll error after authentication:', err);
      } finally {
        setPendingEnrollCourse(null);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.logout();
      if (res.success) {
        setUser(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenAiTutor = (course) => {
    setCurrentTutorCourse(course || null);
    setIsAiTutorOpen(true);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setPendingEnrollCourse(null);
    setIsAuthOpen(true);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col w-full overflow-x-hidden ${lowBandwidth ? 'bg-slate-50' : 'bg-[#f4f7f9]'}`}>
        <Navbar
          user={user}
          onOpenAuth={handleOpenAuth}
          onOpenAiTutor={() => handleOpenAiTutor(null)}
          onOpenEditProfile={() => setIsEditProfileOpen(true)}
          onLogout={handleLogout}
          lowBandwidth={lowBandwidth}
          setLowBandwidth={setLowBandwidth}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Notification Banner */}
          {enrollNotification && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping shrink-0"></span>
                <span>{enrollNotification}</span>
              </div>
              <button
                onClick={() => setEnrollNotification(null)}
                className="text-emerald-800 hover:text-emerald-950 font-bold ml-3 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Dashboard
                    user={user}
                    onEnrollCourse={handleEnrollCourse}
                    onLoginToEnroll={handleLoginToEnroll}
                    onOpenAuth={handleOpenAuth}
                    lowBandwidth={lowBandwidth}
                  />
                )
              }
            />
            <Route
              path="/courses"
              element={
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Courses
                    user={user}
                    onEnrollCourse={handleEnrollCourse}
                    onLoginToEnroll={handleLoginToEnroll}
                    onOpenAuth={handleOpenAuth}
                    lowBandwidth={lowBandwidth}
                  />
                )
              }
            />
            <Route
              path="/courses/:slug"
              element={
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <CourseDetail
                    user={user}
                    onEnrollCourse={handleEnrollCourse}
                    onLoginToEnroll={handleLoginToEnroll}
                    onOpenAiTutor={handleOpenAiTutor}
                    lowBandwidth={lowBandwidth}
                  />
                )
              }
            />
            <Route
              path="/pathways"
              element={
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <LearningPaths
                    user={user}
                    onEnrollCourse={handleEnrollCourse}
                    onLoginToEnroll={handleLoginToEnroll}
                  />
                )
              }
            />
            <Route
              path="/insights"
              element={<NisrInsights />}
            />
            <Route
              path="/skill-passport"
              element={
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <SkillPassport
                    user={user}
                    onOpenEditProfile={() => setIsEditProfileOpen(true)}
                  />
                )
              }
            />
            <Route
              path="/assessments"
              element={
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Assessments
                    user={user}
                    onAssessmentComplete={(updatedUser) => setUser(updatedUser)}
                    onOpenAuth={() => setIsAuthModalOpen(true)}
                  />
                )
              }
            />
            <Route
              path="/peer-matching"
              element={
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <PeerMatching user={user} />
                )
              }
            />
            <Route
              path="/challenges"
              element={
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <EmployerChallenges user={user} />
                )
              }
            />
            <Route
              path="/admin"
              element={
                <AdminDashboard
                  user={user}
                  onOpenAuth={() => setIsAuthOpen(true)}
                  onOpenDbTelemetry={() => setIsDbTelemetryOpen(true)}
                />
              }
            />
          </Routes>
        </main>

        {/* Clean, Simple, Realistic Footer (No gradients) */}
        <footer className="mt-auto bg-slate-900 text-slate-400 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
              {/* Col 1 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    H
                  </div>
                  <span className="font-bold text-white text-sm">The Hub Rwanda</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  National digital education and workforce skills platform aligning learner competencies with National Institute of Statistics of Rwanda (NISR) market benchmarks.
                </p>
              </div>

              {/* Col 2 */}
              <div className="space-y-2">
                <span className="font-semibold text-white uppercase tracking-wider text-[11px] block">
                  Curriculum & Learning
                </span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li><a href="/courses" className="hover:text-white transition">Accredited Courses</a></li>
                  <li><a href="/pathways" className="hover:text-white transition">Career Pathways</a></li>
                  <li><a href="/assessments" className="hover:text-white transition">Competency Assessments</a></li>
                  <li><a href="/skill-passport" className="hover:text-white transition">Skill Passports</a></li>
                </ul>
              </div>

              {/* Col 3 */}
              <div className="space-y-2">
                <span className="font-semibold text-white uppercase tracking-wider text-[11px] block">
                  National Data & Agencies
                </span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li><a href="/insights" className="hover:text-white transition">NISR Labour Statistics</a></li>
                  <li><a href="/challenges" className="hover:text-white transition">Employer Challenges</a></li>
                  <li><a href="/peer-matching" className="hover:text-white transition">Peer Circles</a></li>
                </ul>
              </div>

              {/* Col 4 */}
              <div className="space-y-2">
                <span className="font-semibold text-white uppercase tracking-wider text-[11px] block">
                  Contact & Support
                </span>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Kigali, Rwanda</p>
                  <p>General Inquiries: <strong className="text-slate-300">support@thehub.rw</strong></p>
                  <p>Toll-Free Support: <strong className="text-slate-300">1322</strong></p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
              <div>
                © 2026 The Hub Rwanda. All rights reserved.
              </div>
              <div className="flex items-center space-x-3 text-slate-500">
                <span>Privacy</span>
                <span>·</span>
                <span>Terms</span>
                <span>·</span>
                <span>National Portal</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => {
            setIsAuthOpen(false);
            setPendingEnrollCourse(null);
          }}
          onAuthSuccess={handleAuthSuccess}
          initialMode={authMode}
          enrollCourse={pendingEnrollCourse}
        />

        <DbTelemetryModal
          isOpen={isDbTelemetryOpen}
          onClose={() => setIsDbTelemetryOpen(false)}
        />

        <AiTutorModal
          isOpen={isAiTutorOpen}
          onClose={() => setIsAiTutorOpen(false)}
          currentCourse={currentTutorCourse}
        />

        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          user={user}
          onProfileUpdated={(u) => setUser(u)}
        />
      </div>
    </BrowserRouter>
  );
}
