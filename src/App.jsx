import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import Home from './pages/Home';
import Courses from './pages/Courses';
import SkillPassport from './pages/SkillPassport';
import Assessments from './pages/Assessments';
import NisrHub from './pages/NisrHub';
import EmployerMatching from './pages/EmployerMatching';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Default initial demo user or loaded from storage
  useEffect(() => {
    const saved = localStorage.getItem('hub_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('hub_user', JSON.stringify(loggedInUser));
    if (loggedInUser.role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('home');
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('hub_user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hub_user');
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
        onOpenProfile={() => setProfileOpen(true)}
      />

      <main className="flex-grow">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} user={user} onOpenAuth={() => setAuthOpen(true)} />}
        {activeTab === 'courses' && <Courses user={user} onOpenAuth={() => setAuthOpen(true)} />}
        {activeTab === 'passport' && <SkillPassport user={user} onOpenAuth={() => setAuthOpen(true)} />}
        {activeTab === 'assessments' && <Assessments user={user} onOpenAuth={() => setAuthOpen(true)} setActiveTab={setActiveTab} />}
        {activeTab === 'nisr' && <NisrHub />}
        {activeTab === 'employer' && <EmployerMatching user={user} onOpenAuth={() => setAuthOpen(true)} />}
        {activeTab === 'admin' && <AdminPanel user={user} />}
      </main>

      <Footer />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}
