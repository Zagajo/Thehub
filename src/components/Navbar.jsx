import React, { useState, useRef, useEffect } from 'react';
import { Home, BookOpen, Award, BarChart3, Briefcase, ShieldAlert, LogOut, User, ChevronDown, Menu, X, Settings } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onLogout, onOpenProfile }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Define tabs based on user role
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

  // Let's split into primary visible tabs and overflow 'More' dropdown tabs if needed
  const primaryTabs = tabs.slice(0, 4);
  const overflowTabs = tabs.slice(4);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab(isAdmin ? 'admin' : 'home')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-ext500 font-bold text-white shadow-md">
              REB
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight flex items-center space-x-1.5">
                <span>The Hub</span>
                <span className="text-xs bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full font-mono">Rwanda</span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Digital Skills & NISR Intelligence Platform</div>
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
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}

            {/* Overflow "More" Dropdown if tabs don't fit */}
            {overflowTabs.length > 0 && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    overflowTabs.some(t => t.id === activeTab)
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>More Tabs</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-2xl shadow-2xl py-2 border border-slate-700 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
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
                            isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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
                className="flex items-center space-x-3 bg-slate-800 py-1.5 px-3 rounded-2xl border border-slate-700 cursor-pointer hover:border-indigo-500 transition-colors"
                title="Click to edit profile"
              >
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-indigo-400" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white flex items-center space-x-1">
                    <span>{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="bg-rose-500/20 text-rose-300 text-[10px] px-1.5 py-0.2 rounded font-mono">Admin</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{user.passportId || user.district}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLogout();
                  }}
                  className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg transition-colors ml-2"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-indigo-900/30 transition-all flex items-center space-x-2"
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
              className="text-slate-300 hover:text-white p-2 rounded-xl bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-4 space-y-2">
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
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
            {user ? (
              <div className="flex items-center space-x-3">
                <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-bold text-white">{user.name}</div>
                  <div className="text-xs text-slate-400">{user.email}</div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium text-sm text-center"
              >
                Sign In / Register
              </button>
            )}
            {user && (
              <button
                onClick={onLogout}
                className="text-rose-400 hover:bg-slate-700 p-2 rounded-xl"
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
