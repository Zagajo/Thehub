import React from 'react';
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
  Database,
  Wifi,
  WifiOff,
  User,
  LogOut,
  UserCog,
  Edit3,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onOpenDbTelemetry,
  onOpenAiTutor,
  onOpenEditProfile,
  onLogout,
  lowBandwidth,
  setLowBandwidth
}) {
  const location = useLocation();
  const isAdmin = user && user.role === 'admin';

  const navLinks = isAdmin
    ? [
        { name: 'Admin Dashboard', path: '/admin', icon: ShieldCheck },
        { name: 'NISR Macro Insights', path: '/insights', icon: TrendingUp }
      ]
    : [
        { name: 'Dashboard', path: '/', icon: Compass },
        { name: 'Courses', path: '/courses', icon: BookOpen },
        { name: 'Pathways', path: '/pathways', icon: TrendingUp },
        { name: 'NISR Insights', path: '/insights', icon: TrendingUp },
        { name: 'Skill Passport', path: '/skill-passport', icon: Award },
        { name: 'Assessments', path: '/assessments', icon: Award },
        { name: 'Peer Connect', path: '/peer-matching', icon: Users },
        { name: 'Challenges', path: '/challenges', icon: Briefcase }
      ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-6">
            <Link to={isAdmin ? '/admin' : '/'} className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition">
                H
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-blue-700 transition">
                  The Hub
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest -mt-1">
                  {isAdmin ? 'Admin Authority' : 'Rwanda Skills'}
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      active
                        ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Low-Bandwidth Mode Toggle (NISR ICT Grounding) */}
            <button
              onClick={() => setLowBandwidth(!lowBandwidth)}
              title="Toggle Low-Bandwidth text-first mode (Optimized for variable rural broadband)"
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                lowBandwidth
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {lowBandwidth ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{lowBandwidth ? 'Low-Data ON' : 'Lite Mode'}</span>
            </button>

            {/* Database Telemetry Indicator Button */}
            <button
              onClick={onOpenDbTelemetry}
              title="View live PostgreSQL database telemetry & latency"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Database className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
              <span className="text-[11px] font-mono">DB Active</span>
            </button>

            {/* AI Tutor Coach Launcher (Learners only, not admin) */}
            {!isAdmin && (
              <button
                onClick={onOpenAiTutor}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-bold transition shadow-2xs"
              >
                <Bot className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden md:inline">AI Coach</span>
              </button>
            )}

            {/* User Streak & Profile */}
            {user && user.id !== 'guest' ? (
              <div className="flex items-center space-x-2 pl-1 border-l border-slate-200">
                {isAdmin ? (
                  <div className="flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-xl text-xs font-black shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>ADMIN</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-lg text-xs font-extrabold">
                    <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                    <span>{user.streakDays || 14}d</span>
                  </div>
                )}

                <div className="flex items-center space-x-1">
                  <button
                    onClick={onOpenEditProfile}
                    title={isAdmin ? 'Administrator Credentials & Security' : 'Edit Account & Profile Details'}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition group border shadow-2xs ${
                      isAdmin
                        ? 'bg-slate-900 text-white hover:bg-slate-800 border-slate-800'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200/80'
                    }`}
                  >
                    <User className={`w-3.5 h-3.5 ${isAdmin ? 'text-amber-400' : 'text-blue-600'}`} />
                    <span className="hidden sm:inline font-bold">
                      {isAdmin ? user.name : user.name.split(' ')[0]}
                    </span>
                    <Edit3 className={`w-3 h-3 transition ml-0.5 ${isAdmin ? 'text-slate-400 group-hover:text-amber-300' : 'text-slate-400 group-hover:text-blue-600'}`} />
                  </button>

                  <button
                    onClick={onLogout}
                    title="Log out"
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>

        {/* Mobile secondary navigation scroll */}
        <div className="lg:hidden flex items-center space-x-2 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none text-xs">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`whitespace-nowrap px-3 py-1 rounded-lg font-semibold transition ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
