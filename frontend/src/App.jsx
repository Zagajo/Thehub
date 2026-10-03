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
        if (res.success && res.user) {
          setUser(res.user);
        }
      } catch (e) {
        console.error('Failed to load user profile', e);
      }
    }
    initUser();
  }, []);

  const handleEnrollCourse = async (course) => {
    if (!user || user.id === 'guest') {
      setIsAuthOpen(true);
      return;
    }
    try {
      const res = await api.enrollCourse(course.id);
      if (res.success) {
        setUser(res.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.logout();
      if (res.success) {
        setUser(res.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenAiTutor = (course) => {
    setCurrentTutorCourse(course || null);
    setIsAiTutorOpen(true);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${lowBandwidth ? 'bg-slate-50' : 'bg-[#f1f5f9] bg-futuristic-grid'}`}>
        <Navbar
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenDbTelemetry={() => setIsDbTelemetryOpen(true)}
          onOpenAiTutor={() => handleOpenAiTutor(null)}
          onOpenEditProfile={() => setIsEditProfileOpen(true)}
          onLogout={handleLogout}
          lowBandwidth={lowBandwidth}
          setLowBandwidth={setLowBandwidth}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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
                />
              }
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-200/80 bg-white/80 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-extrabold text-slate-900 text-sm">
                The Hub — {isAdmin ? 'Administrative Operations & National Skills Oversight' : 'Data-Informed Skills & Learning Platform'}
              </span>
              <p className="text-[11px]">
                Powered by official National Institute of Statistics of Rwanda (NISR) indicators and deterministic skill gap architecture.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-semibold">
              <button onClick={() => setIsDbTelemetryOpen(true)} className="hover:text-blue-600 transition">
                Live DB Status
              </button>
              <a href="/insights" className="hover:text-blue-600 transition">
                NISR Provenance
              </a>
              {!isAdmin && (
                <a href="/skill-passport" className="hover:text-blue-600 transition">
                  Skill Passport
                </a>
              )}
            </div>
          </div>
        </footer>

        {/* Modals */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={(u) => setUser(u)}
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
