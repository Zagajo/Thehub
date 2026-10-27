import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  BookOpen,
  Award,
  BarChart3,
  Briefcase,
  ShieldAlert,
  LogOut,
  User,
  Menu,
  X,
  Settings,
  Layers,
  Users,
  Check,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onLogout, onOpenProfile }) {
  const { language, setLanguage, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isAdmin = user && user.role === 'admin';

  // Primary Direct Tabs that fit cleanly across desktop viewports
  const learnerMainTabs = [
    { id: 'home', label: t('nav_overview', 'Overview'), icon: Home, desc: 'National platform summary & metrics' },
    { id: 'courses', label: t('nav_courses', 'Courses'), icon: BookOpen, desc: '10-question gated mastery curriculum' },
    { id: 'paths', label: t('nav_paths', 'Learning Paths'), icon: Layers, desc: 'Deterministic career benchmark tracks' },
    { id: 'assessments', label: t('nav_assessments', 'Assessments'), icon: ShieldAlert, desc: '15-question tracked diagnostic tests with 80% pass mark' },
  ];

  // Secondary Tabs placed inside the "More" Dropdown so navigation never overflows
  const learnerOtherTabs = [
    {
      id: 'passport',
      label: t('nav_passport', 'Skill Passport'),
      icon: Award,
      category: 'Credentials',
      desc: 'Verified certificates & SHA-256 tamper-proof credential vault'
    },
    {
      id: 'peer-matching',
      label: t('nav_peer', 'Peer Learning'),
      icon: Users,
      category: 'Community',
      desc: '40-min bilingual language exchanges & study circles'
    },
    {
      id: 'nisr',
      label: t('nav_nisr', 'NISR Intel'),
      icon: BarChart3,
      category: 'Labour Market',
      desc: 'Official labour statistics, LFPR & workforce indicators'
    },
    {
      id: 'employer',
      label: t('nav_employer', 'Employer Match'),
      icon: Briefcase,
      category: 'Opportunities',
      desc: 'Enterprise challenges, apprenticeships & stipends'
    },
  ];

  const adminMainTabs = [
    { id: 'admin', label: t('nav_admin', 'Admin Dashboard'), icon: Settings, desc: 'Central management console' },
    { id: 'courses', label: t('nav_courses', 'Course Catalog'), icon: BookOpen, desc: 'Curriculum & module management' },
    { id: 'paths', label: t('nav_paths', 'Pathways'), icon: Layers, desc: 'Career tracks & benchmarks' },
    { id: 'assessments', label: t('nav_assessments', 'Assessments'), icon: ShieldAlert, desc: '15-question technical diagnostic question bank' },
  ];

  const adminOtherTabs = [
    {
      id: 'passport',
      label: t('nav_passport', 'Skill Passport'),
      icon: Award,
      category: 'Credentials',
      desc: 'Credential approval queue & cryptographic certificates'
    },
    {
      id: 'nisr',
      label: t('nav_nisr', 'NISR Indicators'),
      icon: BarChart3,
      category: 'Labour Market',
      desc: 'Labour statistics registry & workforce indicators'
    },
    {
      id: 'employer',
      label: t('nav_employer', 'Employer Challenges'),
      icon: Briefcase,
      category: 'Opportunities',
      desc: 'Enterprise capstone challenges & project moderation'
    },
    {
      id: 'home',
      label: t('nav_overview', 'Learner Overview'),
      icon: Home,
      category: 'Public View',
      desc: 'Public-facing national platform homepage'
    },
  ];

  const mainTabs = isAdmin ? adminMainTabs : learnerMainTabs;
  const otherTabs = isAdmin ? adminOtherTabs : learnerOtherTabs;
  const allTabs = [...mainTabs, ...otherTabs];

  const isOtherActive = otherTabs.some((t) => t.id === activeTab);
  const activeOtherTab = otherTabs.find((t) => t.id === activeTab);

  return (
    <header className="bg-white text-slate-900 sticky top-0 z-40 border-b border-slate-200 shadow-xs font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Zone with official logo */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer shrink-0 select-none group py-1"
            onClick={() => setActiveTab(isAdmin ? 'admin' : 'home')}
          >
            <img
              src="/hub-logo.jpeg"
              alt="The Hub Logo"
              className="w-9 h-9 object-contain rounded-md p-0.5 bg-white border border-slate-200 shadow-xs group-hover:border-blue-600 transition-colors"
            />
            <div className="flex flex-col justify-center">
              <div className="font-bold text-sm sm:text-base tracking-tight flex items-center space-x-1.5 text-slate-900 leading-none">
                <span>The Hub</span>
                <span className="text-slate-300 font-light">/</span>
                <span className="text-xs text-blue-700 font-mono font-semibold">Rwanda</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono tracking-tight hidden sm:block leading-none mt-1">
                Skills & NISR Labour Intel
              </div>
            </div>
          </div>

          {/* Desktop Navigation: Direct Main Tabs + More Dropdown */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 h-full min-w-0">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 lg:px-3.5 h-full text-xs font-medium tracking-normal whitespace-nowrap transition-colors border-b-2 shrink-0 ${
                    isActive
                      ? 'border-blue-600 text-blue-600 font-bold bg-blue-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}

            {/* Dropdown for tabs that don't fit */}
            {otherTabs.length > 0 && (
              <div className="relative h-full flex items-center" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  className={`flex items-center space-x-1.5 px-3 lg:px-3.5 h-full text-xs font-medium tracking-normal whitespace-nowrap transition-colors border-b-2 select-none shrink-0 ${
                    isOtherActive
                      ? 'border-blue-600 text-blue-600 font-bold bg-blue-50/50'
                      : dropdownOpen
                      ? 'border-slate-400 text-slate-900 bg-slate-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {activeOtherTab ? (
                    <>
                      <activeOtherTab.icon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-bold">{activeOtherTab.label}</span>
                    </>
                  ) : (
                    <span>{t('nav_more', 'More')}</span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 shrink-0 ${
                      dropdownOpen ? 'rotate-180 text-blue-600' : isOtherActive ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-80 sm:w-96 bg-white border border-slate-200 shadow-2xl rounded-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 font-sans">
                    <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[11px] font-mono uppercase text-slate-600 tracking-wider font-semibold">
                          {t('nav_more', 'More')} Modules & Tools
                        </span>
                        <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          {otherTabs.length}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">ESC to close</span>
                    </div>

                    <div className="p-2 space-y-1 max-h-[75vh] overflow-y-auto">
                      {otherTabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id);
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-lg flex items-start space-x-3 transition-colors border ${
                              isActive
                                ? 'bg-blue-50/80 border-blue-200 text-blue-900'
                                : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-800'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border mt-0.5 ${
                                isActive
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-xs font-semibold ${
                                    isActive ? 'text-blue-900 font-bold' : 'text-slate-900'
                                  }`}
                                >
                                  {tab.label}
                                </span>
                                {tab.category && (
                                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 ml-2">
                                    {tab.category}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5 line-clamp-1">
                                {tab.desc}
                              </p>
                            </div>

                            {isActive && (
                              <div className="self-center pl-1 text-blue-600 shrink-0">
                                <Check className="w-4 h-4" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 font-mono text-center">
                      Official NISR Rwanda Labour Market Aligned
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Trilingual Language Selector (EN.FR.RW) replacing the Translate Tab */}
            <div className="flex items-center my-auto ml-1.5 px-2 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs select-none shadow-2xs shrink-0">
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-all text-[11px] font-bold ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <span className="text-slate-400 font-bold px-0.5 select-none">.</span>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-1.5 py-0.5 rounded transition-all text-[11px] font-bold ${
                  language === 'fr'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Passer en Français"
              >
                FR
              </button>
              <span className="text-slate-400 font-bold px-0.5 select-none">.</span>
              <button
                onClick={() => setLanguage('rw')}
                className={`px-1.5 py-0.5 rounded transition-all text-[11px] font-bold ${
                  language === 'rw'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Guhindura mu Kinyarwanda"
              >
                RW
              </button>
            </div>
          </nav>

          {/* Desktop Actions: User Auth */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            {user ? (
              <div
                onClick={onOpenProfile}
                className="flex items-center space-x-2.5 py-1 px-2.5 bg-slate-50 rounded-md border border-slate-200 hover:border-blue-600 cursor-pointer transition-colors max-w-[200px]"
                title="View user profile"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-300 shrink-0"
                />
                <div className="text-left min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 leading-tight flex items-center space-x-1 truncate">
                    <span className="truncate">{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="text-[9px] font-mono font-semibold bg-rose-100 text-rose-800 px-1 rounded border border-rose-200 shrink-0">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">
                    {user.passportId || user.district || 'Learner'}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLogout();
                  }}
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors shrink-0"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5 shadow-xs"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('nav_signin', 'Sign In / Register')}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 hover:text-slate-900 p-2 border border-slate-200 bg-slate-50 rounded-md"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <img
              src="/hub-logo.jpeg"
              alt="The Hub Logo"
              className="w-8 h-8 object-contain rounded-md border border-slate-200"
            />
            <div>
              <div className="font-bold text-sm text-slate-900">The Hub Rwanda</div>
              <div className="text-[10px] text-slate-500 font-mono">Skills & NISR Labour Intel</div>
            </div>
          </div>

          {/* Core Tabs */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 px-1">
              Core Pathways
            </div>
            <div className="space-y-1">
              {mainTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-colors border ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary & Diagnostic Tools */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 px-1">
              Diagnostics, Community & Tools
            </div>
            <div className="space-y-1">
              {otherTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-colors border ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Trilingual Switcher (EN.FR.RW) */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-700 flex items-center gap-1.5 font-sans font-medium text-xs">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Language:</span>
            </span>
            <div className="flex items-center px-2 py-1 rounded bg-white border border-slate-200 text-xs font-mono select-none">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <span className="text-slate-400 font-bold px-1 select-none">.</span>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  language === 'fr'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                FR
              </button>
              <span className="text-slate-400 font-bold px-1 select-none">.</span>
              <button
                onClick={() => setLanguage('rw')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  language === 'rw'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                RW
              </button>
            </div>
          </div>

          {/* User Sign In / Profile */}
          <div className="pt-2 border-t border-slate-100">
            {user ? (
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div
                  className="flex items-center space-x-2.5 flex-1 cursor-pointer min-w-0"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-slate-300 shrink-0" />
                  <div className="truncate min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-rose-600 hover:bg-slate-200 p-1.5 rounded transition-colors ml-2 shrink-0"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium text-xs font-mono uppercase tracking-wider text-center"
              >
                {t('nav_signin', 'Sign In / Register')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
