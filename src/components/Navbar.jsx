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

  // Primary Direct Tabs (without button 7 'language' tab)
  const learnerMainTabs = [
    { id: 'home', label: t('nav_overview', 'Overview'), icon: Home, desc: 'National platform summary & metrics' },
    { id: 'courses', label: t('nav_courses', 'Courses & Modules'), icon: BookOpen, desc: '10-question gated mastery curriculum' },
    { id: 'paths', label: t('nav_paths', 'Learning Paths'), icon: Layers, desc: 'Deterministic career benchmark tracks' },
    { id: 'assessments', label: t('nav_assessments', 'Assessments'), icon: ShieldAlert, desc: 'Diagnostic skills & testing tools' },
    { id: 'passport', label: t('nav_passport', 'Skill Passport'), icon: Award, desc: 'Verified SHA-256 certificate vault' },
  ];

  // Secondary Tabs placed inside the "Other Tabs" Dropdown
  const learnerOtherTabs = [
    { id: 'peer-matching', label: t('nav_peer', 'Peer Learning'), icon: Users, desc: '40-min bilingual language exchanges' },
    { id: 'nisr', label: t('nav_nisr', 'NISR Intel'), icon: BarChart3, desc: 'Official labour market statistics' },
    { id: 'employer', label: t('nav_employer', 'Employer Match'), icon: Briefcase, desc: 'Enterprise challenges & stipends' },
  ];

  const adminMainTabs = [
    { id: 'admin', label: t('nav_admin', 'Admin Dashboard'), icon: Settings, desc: 'Central management console' },
    { id: 'courses', label: t('nav_courses', 'Course Catalog'), icon: BookOpen, desc: 'Curriculum & module management' },
    { id: 'paths', label: t('nav_paths', 'Pathways'), icon: Layers, desc: 'Career tracks & benchmarks' },
    { id: 'certificates', label: 'Certificates', icon: Award, desc: 'Credential approval queue' },
  ];

  const adminOtherTabs = [
    { id: 'nisr', label: t('nav_nisr', 'NISR Indicators'), icon: BarChart3, desc: 'Labour statistics registry' },
  ];

  const mainTabs = isAdmin ? adminMainTabs : learnerMainTabs;
  const otherTabs = isAdmin ? adminOtherTabs : learnerOtherTabs;
  const allTabs = [...mainTabs, ...otherTabs];

  const isOtherActive = otherTabs.some((t) => t.id === activeTab);
  const activeOtherTab = otherTabs.find((t) => t.id === activeTab);

  return (
    <header className="bg-white text-slate-900 sticky top-0 z-40 border-b border-slate-200 shadow-xs font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Zone with the official site logo */}
          <div
            className="flex items-start space-x-1 cursor-pointer shrink-0 select-none group px-4 -ml-[11px] mr-0"
            onClick={() => setActiveTab(isAdmin ? 'admin' : 'home')}
          >
            <img
              src="/hub-logo.jpeg"
              alt="The Hub Logo"
              className="w-9 h-9 object-contain rounded-md p-0.5 bg-white border border-slate-200 shadow-xs group-hover:border-blue-600 transition-colors"
            />
            <div>
              <div className="font-bold text-base tracking-tight flex items-start space-x-1.5 text-slate-900 leading-none">
                <span>The Hub</span>
                <span className="text-slate-300 font-normal">/</span>
                <span className="text-xs text-blue-700 font-mono font-semibold">Rwanda</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono hidden sm:block mt-0.5">
                Skills & NISR Labour <br/> Intelligence
              </div>
            </div>
          </div>

          {/* Desktop Navigation: Direct Tabs + Dropdown for Other Tabs */}
          <nav className="hidden md:flex items-center space-x-0.5 lg:space-x-1 h-full min-w-0 flex-1 justify-center">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-2.5 xl:px-3 h-full text-xs font-medium tracking-normal whitespace-nowrap transition-colors border-b-2 shrink-0 ${
                    isActive
                      ? 'border-blue-600 text-blue-600 font-bold bg-blue-50/40'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}

            {/* Dropdown for other tabs */}
            {otherTabs.length > 0 && (
              <div className="relative h-full flex items-start" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  className={`flex items-center space-x-1.5 px-2.5 xl:px-3 h-full text-xs font-medium tracking-normal whitespace-nowrap transition-colors border-b-2 select-none shrink-0 ${
                    isOtherActive
                      ? 'border-blue-600 text-blue-600 font-bold bg-blue-50/40'
                      : dropdownOpen
                      ? 'border-slate-400 text-slate-900 bg-slate-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{activeOtherTab ? activeOtherTab.label : t('nav_other_tabs', 'Other Tabs')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      dropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-16 w-72 bg-white border border-slate-300 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100 font-sans">
                    <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase text-slate-600 tracking-wider font-semibold">
                        {t('nav_other_tabs', 'Other Tabs')}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">ESC</span>
                    </div>

                    <div className="p-1.5 space-y-1">
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
                            className={`w-full text-left p-2.5 flex items-start space-x-3 transition-colors border ${
                              isActive
                                ? 'bg-blue-50/80 border-blue-200 text-blue-900'
                                : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-800'
                            }`}
                          >
                            <div
                              className={`w-7 h-7 flex items-center justify-center shrink-0 border mt-0.5 ${
                                isActive
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-semibold ${
                                  isActive ? 'text-blue-900 font-bold' : 'text-slate-900'
                                }`}>
                                  {tab.label}
                                </span>
                                {isActive && (
                                  <span className="text-blue-600 flex items-center gap-1 text-[10px] font-mono font-semibold uppercase">
                                    <Check className="w-3 h-3" /> Active
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5 line-clamp-1">
                                {tab.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Desktop Actions: Language Toggle + User Auth */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            {/* Quick Trilingual Language Toggle (EN | FR | RW) */}
            <div className="flex items-center border border-slate-300 bg-slate-50 font-mono text-[11px]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <span className="text-slate-300 select-none">|</span>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 transition-colors ${
                  language === 'fr'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Passer en Français"
              >
                FR
              </button>
              <span className="text-slate-300 select-none">|</span>
              <button
                onClick={() => setLanguage('rw')}
                className={`px-2 py-1 transition-colors ${
                  language === 'rw'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Guhindura mu Kinyarwanda"
              >
                RW
              </button>
            </div>

            {user ? (
              <div
                onClick={onOpenProfile}
                className="flex items-center space-x-2.5 py-1 px-2.5 bg-slate-50 border border-slate-300 hover:border-blue-600 cursor-pointer transition-colors"
                title="View user profile"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 object-cover border border-slate-300"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight flex items-center space-x-1">
                    <span>{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="text-[10px] font-mono font-semibold bg-rose-100 text-rose-800 px-1 border border-rose-200">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {user.passportId || user.district}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLogout();
                  }}
                  className="text-slate-400 hover:text-rose-600 p-1 ml-1 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5"
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
              className="text-slate-700 hover:text-slate-900 p-2 border border-slate-300 bg-slate-50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <img
              src="/hub-logo.jpeg"
              alt="The Hub Logo"
              className="w-8 h-8 object-contain rounded-md border border-slate-200"
            />
            <div>
              <div className="font-bold text-sm text-slate-900">The Hub Rwanda</div>
              <div className="text-[10px] text-slate-500 font-mono">Mobile Navigation</div>
            </div>
          </div>

          <div className="space-y-1">
            {allTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors border ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold border-blue-600'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-200'
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

          {/* Mobile Trilingual Switcher */}
          <div className="p-2.5 bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 flex items-center gap-1.5 font-sans font-medium">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('lang_select_prompt', 'Language / Ururimi:')}</span>
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 border text-[11px] font-bold ${
                  language === 'en'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 border text-[11px] font-bold ${
                  language === 'fr'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('rw')}
                className={`px-2 py-1 border text-[11px] font-bold ${
                  language === 'rw'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                RW
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            {user ? (
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-2.5">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 object-cover border border-slate-300" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{user.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-rose-600 hover:bg-slate-200 p-1.5 transition-colors"
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-medium text-xs font-mono uppercase tracking-wider text-center"
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
