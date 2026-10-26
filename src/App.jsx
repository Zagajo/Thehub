import React, { useState } from 'react';
import { BackendStatusBanner } from './components/BackendStatusBanner.jsx';
import { Navbar } from './components/Navbar.jsx';
import { AuthModal } from './components/AuthModal.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Courses } from './pages/Courses.jsx';
import { CourseDetail } from './pages/CourseDetail.jsx';
import { NisrInsights } from './pages/NisrInsights.jsx';
import { Assessments } from './pages/Assessments.jsx';
import { SkillPassport } from './pages/SkillPassport.jsx';
import { PeerMatch } from './pages/PeerMatch.jsx';
import { EmployerChallenges } from './pages/EmployerChallenges.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedCourseSlug, setSelectedCourseSlug] = useState(null);
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleSelectCourse = (slug) => {
    setSelectedCourseSlug(slug);
    setCurrentTab('coursedetail');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedCourseSlug(null);
          setCurrentTab(tab);
        }}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'dashboard' && (
          <Dashboard
            setCurrentTab={setCurrentTab}
            onSelectCourse={handleSelectCourse}
            user={user}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}
        {currentTab === 'courses' && (
          <Courses onSelectCourse={handleSelectCourse} />
        )}
        {currentTab === 'coursedetail' && selectedCourseSlug && (
          <CourseDetail
            slug={selectedCourseSlug}
            onBack={() => setCurrentTab('courses')}
            user={user}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}
        {currentTab === 'insights' && <NisrInsights />}
        {currentTab === 'assessments' && <Assessments />}
        {currentTab === 'passport' && (
          <SkillPassport user={user} onOpenAuth={() => setAuthModalOpen(true)} />
        )}
        {currentTab === 'peermatch' && <PeerMatch />}
        {currentTab === 'challenges' && <EmployerChallenges />}
        {currentTab === 'admin' && <AdminDashboard user={user} />}
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={(u) => setUser(u)}
      />
      <BackendStatusBanner />
    </div>
  );
}
