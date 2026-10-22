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
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExploreDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExploreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const adminNavLinks = [
    { name: 'Admin Console', path: '/admin', icon: ShieldCheck },
    { name: 'NISR Market Data', path: '/insights', icon: TrendingUp }
  ];

  const guestNavLinks = [
    { name: 'Overview', path: '/', icon: Compass },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Career Pathways', path: '/pathways', icon: TrendingUp },
    { name: 'NISR Insights', path: '/insights', icon: TrendingUp }
  ];

  const learnerNavLinks = [
    { name: 'Dashboard', path: '/', icon: Compass },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Pathways', path: '/pathways', icon: TrendingUp },
    { name: 'NISR Data', path: '/insights', icon: TrendingUp }
  ];

  const exploreSubMenu = [
    { name: 'Skill Passport', path: '/skill-passport', icon: Award, desc: 'Verified competency record' },
    { name: 'Assessments', path: '/assessments', icon: Award, desc: 'Tri-part evaluation tests' },
    { name: 'Peer Connect', path: '/peer-matching', icon: Users, desc: 'Bilingual study circles' },
    { name: 'Employer Challenges', path: '/challenges', icon: Briefcase, desc: 'Real-world project briefs' }
  ];

  const activeNavLinks = isAdmin ? adminNavLinks : isGuest ? guestNavLinks : learnerNavLinks;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isExploreActive = exploreSubMenu.some((item) => isActive(item.path));

  return (
    <header className="sticky top-0 z-40 bg-white text-slate-900 border-b border-slate-200 font-sans shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Identity */}
          <Link
            to={isAdmin ? '/admin' : '/'}
            className="flex items-center space-x-3 group shrink-0"
            aria-label="The Hub Enterprise"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm tracking-widest shrink-0">
              H
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-tight">
                THE HUB <span className="text-blue-600 font-semibold text-xs px-1.5 py-0.5 bg-blue-50 rounded-md border border-blue-200 ml-1">Rwanda</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {isAdmin ? 'Enterprise Admin Portal' : 'Enterprise Skills & Intelligence'}
              </span>
            </div>
          </Link>

          {/* Center Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {activeNavLinks.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition flex items-center space-x-1.5 ${
                    active
                      ? 'bg-blue-50 text-blue-700 font-bold border-1 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {!isAdmin && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition flex items-center space-x-1 cursor-pointer ${
                    isExploreActive
                      ? 'bg-blue-50 text-blue-700 font-bold border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>Explore More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {exploreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Enterprise Capabilities
                      </span>
                    </div>
                    {exploreSubMenu.map((item) => {
                      const active = isActive(item.path);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setExploreDropdownOpen(false)}
                          className={`flex items-start space-x-3 px-3 py-2.5 text-xs transition ${
                            active
                              ? 'bg-blue-50 text-blue-700 font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-slate-900">{item.name}</span>
                            <span className="text-[11px] text-slate-500">{item.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Low Bandwidth Toggle */}
            <button
              onClick={() => setLowBandwidth(!lowBandwidth)}
              title={lowBandwidth ? 'Low-Data Mode ON' : 'Switch to Low-Data mode'}
              aria-label="Toggle low bandwidth mode"
              className={`hidden sm:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                lowBandwidth
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {lowBandwidth ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5 text-blue-600" />}
              <span className="text-[11px]">
                {lowBandwidth ? 'Lite ON' : 'Lite Mode'}
              </span>
            </button>



            {/* AI Tutor Launcher */}
            {!isAdmin && (
              <button
                onClick={onOpenAiTutor}
                title="AI Tutor Coach"
                aria-label="Open AI Tutor Coach"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-semibold transition cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden md:inline">AI Tutor</span>
              </button>
            )}

            {/* User Profile or Auth */}
            {user && user.id !== 'guest' ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 shrink-0">
                {isAdmin ? (
                  <span className="bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    Admin
                  </span>
                ) : (
                  <div
                    title={`${user.streakDays || 0}-day study streak`}
                    className="flex items-center space-x-1 bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded text-[11px] font-semibold"
                  >
                    <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                    <span>{user.streakDays || 0}d</span>
                  </div>
                )}

                <button
                  onClick={onOpenEditProfile}
                  title="Profile Settings"
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition max-w-[130px] truncate cursor-pointer shadow-xs"
                >
                  <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{user.name?.split(' ')[0] || 'User'}</span>
                  <Edit3 className="w-3 h-3 text-slate-400 shrink-0 hidden sm:inline" />
                </button>

                <button
                  onClick={onLogout}
                  title="Log out"
                  aria-label="Log out"
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5 text-blue-600" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer whitespace-nowrap shadow-xs"
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
              className="md:hidden p-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition cursor-pointer ml-1"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white text-slate-900 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
                {isAdmin ? 'Admin Console' : isGuest ? 'Platform Overview' : 'Navigation'}
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
                      className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                        active
                          ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                {!isAdmin && exploreSubMenu.map((item) => {
                  const active = isActive(item.path);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                        active
                          ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {isGuest && (
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <span className="text-[11px] text-slate-500 block px-1">
                  Access accredited courses and verified digital skill credentials.
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold text-center transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold text-center transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-blue-600" />
                    <span>Log In</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
