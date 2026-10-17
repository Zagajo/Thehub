import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Flame,
  Bot,
  Wifi,
  WifiOff,
  User,
  LogOut,
  Edit3,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  UserPlus,
  LogIn
} from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onOpenAiTutor,
  onOpenEditProfile,
  onLogout,
  lowBandwidth,
  setLowBandwidth
}) {
  const location = useLocation();
  const isAdmin = user && user.role === 'admin';
  const isGuest = !user || user.id === 'guest';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close "More" dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Admin exclusive navigation (strictly no guest direction tabs)
  const adminNavLinks = [
    { name: 'Admin Dashboard', path: '/admin', icon: ShieldCheck },
    { name: 'NISR Market Data', path: '/insights', icon: TrendingUp }
  ];

  // Guest tabs for directing new users for better interaction (never shown to admin)
  const guestNavLinks = [
    { name: 'Getting Started', path: '/', icon: Compass },
    { name: 'Approved Courses', path: '/courses', icon: BookOpen },
    { name: 'Career Pathways', path: '/pathways', icon: TrendingUp },
    { name: 'NISR Market Data', path: '/insights', icon: TrendingUp }
  ];

  // Authenticated regular learner links
  const primaryLearnerLinks = [
    { name: 'Dashboard', path: '/', icon: Compass },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Pathways', path: '/pathways', icon: TrendingUp },
    { name: 'NISR Data', path: '/insights', icon: TrendingUp }
  ];

  const secondaryLearnerLinks = [
    { name: 'Skill Passport', path: '/skill-passport', icon: Award },
    { name: 'Assessments', path: '/assessments', icon: Award },
    { name: 'Peer Connect', path: '/peer-matching', icon: Users },
    { name: 'Employer Challenges', path: '/challenges', icon: Briefcase }
  ];

  const allLearnerLinks = [...primaryLearnerLinks, ...secondaryLearnerLinks];

  // Active navigation set based on role & auth state
  const activeNavLinks = isAdmin
    ? adminNavLinks
    : isGuest
    ? guestNavLinks
    : allLearnerLinks;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isSecondaryActive = secondaryLearnerLinks.some((item) => isActive(item.path));

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-colors w-full font-sans">
      {/* Clean, Simple Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Left: Brand Identity */}
          <Link
            to={isAdmin ? '/admin' : '/'}
            className="flex items-center space-x-3 group shrink-0"
            aria-label="The Hub Rwanda"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shrink-0">
              H
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-sm sm:text-base leading-tight tracking-tight">
                The Hub Rwanda
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:block">
                {isAdmin ? 'National Administrative Console' : 'Education & Skills Platform'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {isAdmin ? (
              adminNavLinks.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                      active
                        ? 'bg-slate-100 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })
            ) : isGuest ? (
              guestNavLinks.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                      active
                        ? 'bg-slate-100 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })
            ) : (
              <>
                {primaryLearnerLinks.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        active
                          ? 'bg-slate-100 text-blue-700 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* More dropdown for secondary learner links */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1 cursor-pointer ${
                      isSecondaryActive
                        ? 'bg-slate-100 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>More</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {moreDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                      {secondaryLearnerLinks.map((item) => {
                        const active = isActive(item.path);
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMoreDropdownOpen(false)}
                            className={`flex items-center space-x-2 px-3 py-2 text-xs font-medium transition ${
                              active
                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Right Action Tools: Zero DB button here (Strictly in Admin Dashboard) */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Low-Bandwidth Mode Toggle */}
            <button
              onClick={() => setLowBandwidth(!lowBandwidth)}
              title={lowBandwidth ? 'Low-Data Mode ON' : 'Switch to Low-Data mode'}
              aria-label="Toggle low bandwidth mode"
              className={`hidden sm:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition shrink-0 cursor-pointer ${
                lowBandwidth
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {lowBandwidth ? <WifiOff className="w-3.5 h-3.5 text-amber-700" /> : <Wifi className="w-3.5 h-3.5 text-slate-500" />}
              <span className="hidden lg:inline text-[11px]">
                {lowBandwidth ? 'Lite ON' : 'Lite Mode'}
              </span>
            </button>

            {/* AI Tutor Launcher (Learners & guests only) */}
            {!isAdmin && (
              <button
                onClick={onOpenAiTutor}
                title="AI Tutor Coach"
                aria-label="Open AI Tutor Coach"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-semibold transition shrink-0 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden md:inline">AI Tutor</span>
              </button>
            )}

            {/* User Profile or Guest Directing Tabs */}
            {user && user.id !== 'guest' ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 shrink-0">
                {isAdmin ? (
                  <span className="bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-bold">
                    Admin
                  </span>
                ) : (
                  <div
                    title={`${user.streakDays || 0}-day study streak`}
                    className="flex items-center space-x-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium"
                  >
                    <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                    <span>{user.streakDays || 0}d</span>
                  </div>
                )}

                <button
                  onClick={onOpenEditProfile}
                  title="Profile Settings"
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition max-w-[130px] truncate cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="truncate">{user.name?.split(' ')[0] || 'User'}</span>
                  <Edit3 className="w-3 h-3 text-slate-400 shrink-0 hidden sm:inline" />
                </button>

                <button
                  onClick={onLogout}
                  title="Log out"
                  aria-label="Log out"
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* When no one is signed in: Directing Actions for Log In & Create Account */
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
                  title="Log in to existing account"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
                  title="Create free learner account"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create Account</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-label="Toggle navigation menu"
              className="md:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition cursor-pointer ml-1"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Clean, simple, zero gradients) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
                {isAdmin ? 'Admin Console' : isGuest ? 'New User Orientation' : 'Navigation'}
              </span>
              <div className="grid grid-cols-1 gap-1">
                {activeNavLinks.map((item) => {
                  const active = isActive(item.path);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                        active
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile guest tabs directive */}
            {isGuest && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] text-slate-500 block px-1">
                  Ready to start learning? Create an account or sign in to enroll in approved courses.
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold text-center transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold text-center transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-slate-500" />
                    <span>Log In</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Utilities */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <button
                onClick={() => setLowBandwidth(!lowBandwidth)}
                className="flex items-center space-x-1.5 py-1 text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                {lowBandwidth ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5" />}
                <span>{lowBandwidth ? 'Lite Data: ON' : 'Lite Data Mode'}</span>
              </button>

              {!isAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAiTutor();
                  }}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Tutor</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
