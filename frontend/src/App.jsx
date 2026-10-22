import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { DashboardPage } from './pages/DashboardPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LearningPathsPage } from './pages/LearningPathsPage';
import { NisrInsightsPage } from './pages/NisrInsightsPage';
import { SkillPassportPage } from './pages/SkillPassportPage';
import { PeerMatchingPage } from './pages/PeerMatchingPage';
import { YouthOpportunitiesPage } from './pages/YouthOpportunitiesPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ProfilePage } from './pages/ProfilePage';

import {
  fetchHealth,
  fetchCourses,
  fetchNisrIndicators,
  enrollCourse,
  defaultCourses,
  defaultNisrIndicators
} from './services/api';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hub_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [lowBandwidth, setLowBandwidth] = useState(() => {
    return localStorage.getItem('hub_low_bandwidth') === 'true';
  });

  const [courses, setCourses] = useState(defaultCourses);
  const [nisrIndicators, setNisrIndicators] = useState(defaultNisrIndicators);
  const [healthData, setHealthData] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);

  // Auth modal control
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [targetCourseForAuth, setTargetCourseForAuth] = useState(null);

  const toggleLowBandwidth = () => {
    setLowBandwidth(prev => {
      const next = !prev;
      localStorage.setItem('hub_low_bandwidth', String(next));
      return next;
    });
  };

  const refreshHealth = () => {
    fetchHealth()
      .then((data) => {
        setHealthData(data);
        if (data.success) setBackendConnected(true);
      })
      .catch(() => setBackendConnected(false));
  };

  useEffect(() => {
    refreshHealth();

    fetchCourses().then((res) => {
      if (res.courses && res.courses.length > 0) {
        setCourses(res.courses);
      }
    });

    fetchNisrIndicators().then((res) => {
      if (res.indicators && res.indicators.length > 0) {
        setNisrIndicators(res.indicators);
      }
    });
  }, []);

  // Triggered when user selects a course from dashboard or courses list
  const handleSelectCourse = (course) => {
    if (!user) {
      setTargetCourseForAuth(course);
      setIsAuthOpen(true);
    } else {
      enrollCourse(course.id, user.id).then(() => {
        if (!user.enrolledCourses?.includes(course.id)) {
          const updatedUser = {
            ...user,
            enrolledCourses: [...(user.enrolledCourses || []), course.id]
          };
          setUser(updatedUser);
          localStorage.setItem('hub_user', JSON.stringify(updatedUser));
        }
        navigate(`/courses/${course.slug || course.id}`);
      });
    }
  };

  const handleLoginSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    localStorage.setItem('hub_user', JSON.stringify(authenticatedUser));
    if (targetCourseForAuth) {
      enrollCourse(targetCourseForAuth.id, authenticatedUser.id).then(() => {
        navigate(`/courses/${targetCourseForAuth.slug || targetCourseForAuth.id}`);
        setTargetCourseForAuth(null);
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hub_user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navbar with Dark Blue Main Color & Red/Blue Accents */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Content Routes */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6">
        <Routes>
          {/* User lands on Dashboard with courses */}
          <Route
            path="/"
            element={
              <DashboardPage
                courses={courses}
                user={user}
                onSelectCourse={handleSelectCourse}
                nisrIndicators={nisrIndicators}
                onNavigate={navigate}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                courses={courses}
                user={user}
                onSelectCourse={handleSelectCourse}
                nisrIndicators={nisrIndicators}
                onNavigate={navigate}
              />
            }
          />
          <Route
            path="/courses"
            element={
              <CoursesPage
                courses={courses}
                user={user}
                onSelectCourse={handleSelectCourse}
              />
            }
          />
          <Route
            path="/courses/:slug"
            element={
              <CourseDetailWrapper
                courses={courses}
                user={user}
                onEnroll={(id) => handleSelectCourse({ id, slug: id })}
                onTriggerAuth={(course) => {
                  setTargetCourseForAuth(course);
                  setIsAuthOpen(true);
                }}
              />
            }
          />
          <Route
            path="/learning-paths"
            element={<LearningPathsPage onSelectCourse={handleSelectCourse} />}
          />
          <Route
            path="/peers"
            element={
              <PeerMatchingPage
                user={user}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            }
          />
          <Route
            path="/youth"
            element={<YouthOpportunitiesPage onSelectCourse={handleSelectCourse} />}
          />
          <Route
            path="/challenges"
            element={
              <ChallengesPage
                user={user}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            }
          />
          <Route
            path="/insights"
            element={<NisrInsightsPage indicators={nisrIndicators} />}
          />
          <Route
            path="/skill-passport"
            element={
              <SkillPassportPage
                user={user}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            }
          />
          <Route
            path="/passport/:id"
            element={
              <SkillPassportPage
                user={user}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                user={user}
                onUpdateUser={setUser}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            }
          />
        </Routes>
      </main>

      {/* Authentication Modal triggered on course selection */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setTargetCourseForAuth(null);
        }}
        onLoginSuccess={handleLoginSuccess}
        targetCourse={targetCourseForAuth}
      />
    </div>
  );
}

// Wrapper to extract slug param
function CourseDetailWrapper({ courses, user, onEnroll, onTriggerAuth }) {
  const location = useLocation();
  const slug = location.pathname.replace('/courses/', '');
  const course = courses.find((c) => c.slug === slug || c.id === slug) || courses[0];

  return (
    <CourseDetailPage
      course={course}
      user={user}
      onEnroll={onEnroll}
      onTriggerAuth={onTriggerAuth}
    />
  );
}

export default App;
=======
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
      await api.logout();
    } catch (e) {
      console.error(e);
    } finally {
      setUser(null);
      setAuthMode('login');
      setIsAuthOpen(true);
      window.location.href = '/';
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (!user || user.id === 'guest') {
      return <Navigate to="/" replace />;
    }
    return children;
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
      <div className={`min-h-screen flex flex-col w-full overflow-x-hidden ${lowBandwidth ? 'bg-slate-50 text-slate-900' : 'bg-[#f4f7f9] text-slate-900'}`}>
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
                <ProtectedRoute>
                  {isAdmin ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <LearningPaths
                      user={user}
                      onEnrollCourse={handleEnrollCourse}
                      onLoginToEnroll={handleLoginToEnroll}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/insights"
              element={<NisrInsights />}
            />
            <Route
              path="/skill-passport"
              element={
                <ProtectedRoute>
                  {isAdmin ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <SkillPassport
                      user={user}
                      onOpenEditProfile={() => setIsEditProfileOpen(true)}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessments"
              element={
                <ProtectedRoute>
                  {isAdmin ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <Assessments
                      user={user}
                      onAssessmentComplete={(updatedUser) => setUser(updatedUser)}
                      onOpenAuth={() => setIsAuthOpen(true)}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/peer-matching"
              element={
                <ProtectedRoute>
                  {isAdmin ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <PeerMatching user={user} />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <ProtectedRoute>
                  {isAdmin ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <EmployerChallenges user={user} />
                  )}
                </ProtectedRoute>
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

        {/* IBM Enterprise Footer */}
        <footer className="mt-auto bg-[#161616] text-[#c6c6c6] border-t border-[#393939]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
              {/* Col 1 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-sm bg-[#0F62FE] flex items-center justify-center text-white font-bold text-xs">
                    H
                  </div>
                  <span className="font-bold text-white text-sm tracking-tight">The Hub Rwanda</span>
                </div>
                <p className="text-xs text-[#8d8d8d] leading-relaxed">
                  National digital education and workforce skills platform aligning learner competencies with National Institute of Statistics of Rwanda (NISR) market benchmarks.
                </p>
              </div>

              {/* Col 2 */}
              <div className="space-y-2.5">
                <span className="font-semibold text-white uppercase tracking-wider font-mono text-[11px] block">
                  Curriculum & Learning
                </span>
                <ul className="space-y-2 text-xs text-[#c6c6c6]">
                  <li><a href="/courses" className="hover:text-white transition">Accredited Courses</a></li>
                  <li><a href="/pathways" className="hover:text-white transition">Career Pathways</a></li>
                  <li><a href="/assessments" className="hover:text-white transition">Competency Assessments</a></li>
                  <li><a href="/skill-passport" className="hover:text-white transition">Skill Passports</a></li>
                </ul>
              </div>

              {/* Col 3 */}
              <div className="space-y-2.5">
                <span className="font-semibold text-white uppercase tracking-wider font-mono text-[11px] block">
                  National Data & Agencies
                </span>
                <ul className="space-y-2 text-xs text-[#c6c6c6]">
                  <li><a href="/insights" className="hover:text-white transition">NISR Labour Statistics</a></li>
                  <li><a href="/challenges" className="hover:text-white transition">Employer Challenges</a></li>
                  <li><a href="/peer-matching" className="hover:text-white transition">Peer Circles</a></li>
                </ul>
              </div>

              {/* Col 4 */}
              <div className="space-y-2.5">
                <span className="font-semibold text-white uppercase tracking-wider font-mono text-[11px] block">
                  Contact & Support
                </span>
                <div className="text-xs text-[#c6c6c6] space-y-1.5">
                  <p>Kigali, Rwanda</p>
                  <p>General Inquiries: <strong className="text-white font-mono">support@thehub.rw</strong></p>
                  <p>Toll-Free Support: <strong className="text-white font-mono">1322</strong></p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#393939] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8d8d8d] gap-3">
              <div>
                © 2026 The Hub Rwanda. All rights reserved. Powered by Carbon Design Principles.
              </div>
              <div className="flex items-center space-x-4 text-[#8d8d8d]">
                <span className="hover:text-white cursor-pointer">Privacy</span>
                <span>·</span>
                <span className="hover:text-white cursor-pointer">Terms of Use</span>
                <span>·</span>
                <span className="hover:text-white cursor-pointer">National Portal</span>
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
>>>>>>> bf53632cf4d649f83a661a098be828d1230469b5
