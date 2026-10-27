import React, { useState, useRef, useEffect } from 'react';
import { Home, BookOpen, Award, BarChart3, Briefcase, ShieldAlert, LogOut, User, ChevronDown, Menu, X, Settings } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onLogout, onOpenProfile }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAdmin = user && user.role === 'admin';

  const learnerTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses & Modules', icon: BookOpen },
    { id: 'passport', label: 'Skill Passport', icon: Award },
    { id: 'assessments', label: 'Assessments', icon: ShieldAlert },
    { id: 'nisr', label: 'NISR Labour Intel', icon: BarChart3 },
    { id: 'employer', label: 'Employer Matching', icon: Briefcase },
  ];

  const adminTabs = [
    { id: 'admin', label: 'Admin Dashboard', icon: Settings },
    { id: 'courses', label: 'Course Manager', icon: BookOpen },
    { id: 'certificates', label: 'Certificate Approvals', icon: Award },
    { id: 'nisr', label: 'NISR Indicators', icon: BarChart3 },
  ];

  const tabs = isAdmin ? adminTabs : learnerTabs;
  const primaryTabs = tabs.slice(0, 4);
  const overflowTabs = tabs.slice(4);

  return (
    <header className="bg-white text-slate-900 sticky top-0 z-40 shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab(isAdmin ? 'admin' : 'home')}>
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-01_at_16.28.16_e268ef5e.jpeg"
              alt="The Hub Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-sm border border-slate-300"
            />
            <div>
              <div className="font-bold text-lg tracking-tight flex items-center space-x-1.5 text-slate-900">
                <span>The Hub</span>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono border border-slate-200">Rwanda</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Digital Skills & NISR Intelligence Platform</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {primaryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}

            {overflowTabs.length > 0 && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    overflowTabs.some(t => t.id === activeTab)
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>More Tabs</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 border border-slate-200 z-50">
                    {overflowTabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setMoreOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* User Auth & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div 
                onClick={onOpenProfile} 
                className="flex items-center space-x-3 bg-slate-100 py-1.5 px-3 rounded-2xl border border-slate-200 cursor-pointer hover:border-blue-900 transition-colors"
                title="Click to edit profile"
              >
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-blue-900" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 flex items-center space-x-1">
                    <span>{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="bg-rose-100 text-rose-800 text-[10px] px-1.5 py-0.2 rounded font-mono">Admin</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">{user.passportId || user.district}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLogout();
                  }}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors ml-2"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 hover:text-slate-900 p-2 rounded-xl bg-slate-100 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {user ? (
              <div className="flex items-center space-x-3">
                <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-bold text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full bg-blue-900 text-white py-2.5 rounded-xl font-medium text-sm text-center"
              >
                Sign In / Register
              </button>
            )}
            {user && (
              <button
                onClick={onLogout}
                className="text-rose-600 hover:bg-slate-100 p-2 rounded-xl"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
