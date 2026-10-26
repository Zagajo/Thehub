import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Video, 
  Award, 
  Users, 
  User, 
  LogOut, 
  ChevronDown,
  Compass,
  BarChart3,
  Layers
} from 'lucide-react';

export const Navbar = ({ currentTab, setCurrentTab, user, onOpenAuth, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const adminNavItems = [
    { id: 'admin-overview', label: 'Overview & Stats', icon: ShieldCheck },
    { id: 'admin-courses', label: 'Course Registry', icon: BookOpen },
    { id: 'admin-media', label: 'Notes & Video Manager', icon: Video },
    { id: 'admin-certs', label: 'Certificate Approvals', icon: Award },
    { id: 'admin-users', label: 'User Directory', icon: Users }
  ];

  const learnerNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'courses', label: 'Courses & Notes', icon: BookOpen },
    { id: 'insights', label: 'NISR Insights', icon: BarChart3 },
    { id: 'assessments', label: 'Assessments', icon: Layers },
    { id: 'passport', label: 'Skill Passport', icon: Award }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : learnerNavItems;

  const activeItem = navItems.find(item => item.id === currentTab) || navItems[0];
  const ActiveIcon = activeItem?.icon || ShieldCheck;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-300 bg-slate-900/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2.5 cursor-pointer group shrink-0" onClick={() => setCurrentTab(user?.role === 'admin' ? 'admin-overview' : 'dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-700 to-red-600 flex items-center justify-center shadow-lg text-white font-extrabold text-lg tracking-wider border border-blue-400/30">
              H
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  {user?.role === 'admin' ? 'The Hub Admin' : 'The Hub'}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                {user?.role === 'admin' ? 'System Management Portal' : 'SkillBridge Rwanda'}
              </div>
            </div>
          </div>

          <div className="relative lg:hidden">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-700 shadow-sm"
            >
              <ActiveIcon className="w-4 h-4 text-blue-400" />
              <span>{activeItem.label}</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl py-2 z-50">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const active = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition text-left ${
                        active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap ${
                    active
                      ? 'text-white bg-blue-800/80 font-bold shadow-sm border border-blue-600/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full ring-2 ring-blue-500 object-cover shadow-sm"
                  />
                  <span className="hidden xl:inline text-xs font-bold text-white max-w-[100px] truncate">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign out"
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth()}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition-all border border-blue-500/40 active:scale-95"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
