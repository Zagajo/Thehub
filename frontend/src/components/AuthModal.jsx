<<<<<<< HEAD
import React, { useState } from 'react';
import { X, Lock, CheckCircle2, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, onLoginSuccess, targetCourse }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const demoUser = {
        id: 'usr_rwa_2026',
        fullName: 'Kezia Umutoni',
        email: 'kezia.umutoni@thehub.rw',
        username: 'kezia_u',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
        location: 'Kigali, Rwanda',
        learningStreak: 4,
        enrolledCourses: ['crs-web-fund', 'crs-excel-data']
      };
      localStorage.setItem('hub_user', JSON.stringify(demoUser));
      onLoginSuccess(demoUser);
      setLoading(false);
      onClose();
    }, 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = {
        id: `usr_${Date.now()}`,
        fullName: email.split('@')[0],
        email,
        username: email.split('@')[0],
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
        location: 'Kigali, Rwanda',
        learningStreak: 1,
        enrolledCourses: []
      };
      localStorage.setItem('hub_user', JSON.stringify(user));
      onLoginSuccess(user);
      setLoading(false);
      onClose();
    }, 350);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-200 border border-slate-300 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Futuristic top accent hairline */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-900 via-blue-600 to-red-600" />

        {/* Header */}
        <div className="p-6 border-b border-slate-300 bg-slate-100/90 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs uppercase tracking-wider font-mono">
              <Lock className="w-3.5 h-3.5 text-red-600" />
              <span>Authentication Gate</span>
            </div>
            <h2 className="text-base font-extrabold text-blue-950 mt-1">
              {targetCourse ? `Enroll in ${targetCourse.title}` : 'Sign In to The Hub'}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Authenticate to save course progress, complete assessments, and verify skills.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 p-1.5 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Quick Demo Access Button */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/10 to-red-600/10 border border-blue-900/20 hover:border-blue-900/50 hover:bg-blue-900/15 text-left transition-all duration-200 group shadow-sm active:scale-98"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Demo User"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-700"
              />
              <div>
                <div className="text-xs font-bold text-blue-950 group-hover:text-blue-800 flex items-center gap-1.5">
                  <span>Continue as Kezia Umutoni</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-red-600/15 text-red-700 rounded-md font-bold">
                    Demo Learner
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 font-mono">Instant 1-Click Login (Kigali, Rwanda)</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-700 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-3 text-slate-500 text-xs font-mono">
            <div className="h-px bg-slate-300 flex-1" />
            <span>OR EMAIL</span>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="learner@thehub.rw"
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1 font-semibold">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 hover:from-blue-800 hover:to-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-950/20 transition-all active:scale-98 mt-2"
            >
              {loading ? 'Authenticating...' : isRegister ? 'Create Learner Account' : 'Sign In & Continue'}
            </button>
          </form>

          <div className="text-center text-xs text-slate-600 pt-1">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-800 hover:text-blue-950 font-semibold hover:underline"
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
=======
import React, { useState, useEffect } from 'react';
import {
  User,
  Sparkles,
  CheckCircle2,
  X,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Eye,
  EyeOff,
  AlertCircle,
  UserPlus,
  LogIn,
  BookOpen,
  Check,
  ShieldAlert
} from 'lucide-react';
import { api } from '../services/api.js';

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
  enrollCourse = null
}) {
  // 'login' | 'register'
  const [mode, setMode] = useState(initialMode || 'login');

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [initialMode, isOpen]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [names, setNames] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [location, setLocation] = useState('Gasabo District, Kigali City');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [targetRole, setTargetRole] = useState('Junior Data Analyst');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  if (!isOpen) return null;

  // Password Strength Criteria Calculation
  const hasMinLength = registerPassword.length >= 8;
  const hasNumber = /\d/.test(registerPassword);
  const hasSign = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(registerPassword);
  const isStrongPassword = hasMinLength && hasNumber && hasSign;

  const rwandaDistricts = [
    'Gasabo District, Kigali City',
    'Kicukiro District, Kigali City',
    'Nyarugenge District, Kigali City',
    'Musanze District, Northern Province',
    'Gicumbi District, Northern Province',
    'Burera District, Northern Province',
    'Huye District, Southern Province',
    'Muhanga District, Southern Province',
    'Nyanza District, Southern Province',
    'Rubavu District, Western Province',
    'Rusizi District, Western Province',
    'Karongi District, Western Province',
    'Rwamagana District, Eastern Province',
    'Bugesera District, Eastern Province',
    'Nyagatare District, Eastern Province'
  ];

  const careerPathways = [
    'Junior Data Analyst',
    'Web Application Developer',
    'Agribusiness Operations Specialist',
    'Tourism & Hospitality Lead',
    'FinTech & Systems Specialist',
    'Statistical Researcher'
  ];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.login({
        email: loginEmail,
        password: loginPassword
      });

      if (res.success) {
        setSuccessMessage(res.message);
        if (onAuthSuccess) {
          onAuthSuccess(res.user, enrollCourse);
        }
        setTimeout(() => {
          onClose();
        }, 600);
      } else {
        setErrorMessage(res.error || 'Failed to sign in. Please verify your credentials.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!names.trim() || names.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes('@') || !registerEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!isStrongPassword) {
      setErrorMessage('A strong password must be at least 8 characters and mixed with numbers and signs.');
      return;
    }
    if (registerPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-type your password identically.');
      return;
    }
    if (!location) {
      setErrorMessage('Please select your region / district location in Rwanda.');
      return;
    }
    if (!dateOfBirth) {
      setErrorMessage('Please provide your date of birth.');
      return;
    }

    // Age validation
    const birth = new Date(dateOfBirth);
    const age = new Date().getFullYear() - birth.getFullYear();
    if (isNaN(birth.getTime()) || age < 14 || age > 100) {
      setErrorMessage('Please provide a valid date of birth (must be at least 14 years old).');
      return;
    }

    setLoading(true);
    try {
      const res = await api.register({
        names,
        email: registerEmail,
        password: registerPassword,
        location,
        dateOfBirth,
        targetRole
      });

      if (res.success) {
        setSuccessMessage(res.message);
        if (onAuthSuccess) {
          onAuthSuccess(res.user, enrollCourse);
        }
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setErrorMessage(res.error || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill helper for testing convenience
  const fillCredentials = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col font-sans">
        {/* Header */}
        <div className="bg-white text-slate-900 p-5 sm:p-6 relative shrink-0 border-b border-slate-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Hub Rwanda Authentication</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            {enrollCourse ? (
              mode === 'register' ? 'Create Account & Enroll' : 'Log In & Enroll'
            ) : (
              mode === 'login' ? 'Sign In to Your Account' : 'Create a Free Account'
            )}
          </h2>

          <p className="text-xs text-slate-600 mt-1">
            {enrollCourse ? (
              mode === 'register'
                ? `Create your account below to immediately enroll in "${enrollCourse.title}".`
                : `Sign in to your account below to enroll in "${enrollCourse.title}".`
            ) : (
              mode === 'login'
                ? 'Provide your email address and password to sign in.'
                : 'Register your details to access certified skills, lessons, and credentials.'
            )}
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Notifications */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-900 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Contextual Course Enrollment Banner */}
          {enrollCourse && (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider">
                    TARGET ENROLLMENT COURSE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                  {enrollCourse.duration || 'Self-Paced'}
                </span>
              </div>
              <p className="text-slate-900 font-bold text-xs flex items-center space-x-1.5 pt-0.5">
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">{enrollCourse.title}</span>
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {mode === 'register'
                  ? 'No account yet? Fill in your details below to create your account and automatically enroll in this cohort!'
                  : 'Already have an account? Sign in below to automatically enroll in this course and track your progress!'}
              </p>
            </div>
          )}

          {/* Dedicated Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage(null);
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                mode === 'register'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{enrollCourse ? 'Create & Enroll' : 'Create Account'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                mode === 'login'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{enrollCourse ? 'Log In & Enroll' : 'Sign In'}</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* MODE 1: LOGIN FORM */}
          {/* ========================================================= */}
          {mode === 'login' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Quick-Fill Presets for Evaluation
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => fillCredentials('kezia.umutoni@thehub.rw', 'password123')}
                    className="p-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left transition cursor-pointer"
                  >
                    <span className="text-[11px] font-bold text-slate-800 block truncate">Kezia (Learner)</span>
                    <span className="text-[10px] text-slate-500 font-mono block">Data Analyst • 14d</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fillCredentials('alice.mukamana@thehub.rw', 'admin123')}
                    className="p-2 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl text-left transition cursor-pointer"
                  >
                    <span className="text-[11px] font-bold text-slate-800 block truncate">Dr. Alice (Admin)</span>
                    <span className="text-[10px] text-amber-700 font-mono block">Executive Authority</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. kezia.umutoni@thehub.rw"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your account password"
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !loginEmail || !loginPassword}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    {loading
                      ? 'Authenticating...'
                      : enrollCourse
                      ? `Sign In & Enroll in Course`
                      : 'Sign In with Email & Password'}
                  </span>
                </button>
              </form>

              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition ml-1 cursor-pointer"
                  >
                    {enrollCourse ? 'Create an account to enroll' : 'Create an account'}
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MODE 2: CREATE AN ACCOUNT FORM WITH STRONG PASSWORD INDICATOR */}
          {/* ========================================================= */}
          {mode === 'register' && (
            <div className="space-y-4">
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Names (First & Last)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={names}
                      onChange={(e) => setNames(e.target.value)}
                      placeholder="e.g. Pacifique Mugisha"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="e.g. p.mugisha@thehub.rw"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Region / Location in Rwanda
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                    >
                      {rwandaDistricts.map((d, i) => (
                        <option key={i} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Used for NST2 youth workforce demographic metrics (NISR alignment).
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Pathway Target
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                  >
                    {careerPathways.map((role, i) => (
                      <option key={i} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {/* Password & Confirm with Strong Password Indicator */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        required
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="At least 8 chars with numbers & signs"
                        className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showRegisterPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Real-time Strong Password Indicator & Checklist */}
                    <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-slate-600">Password Strength:</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isStrongPassword
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {isStrongPassword ? 'Strong Password ✓' : 'Incomplete Requirements'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1 text-slate-500">
                        <div className={`flex items-center space-x-1 ${hasMinLength ? 'text-emerald-700 font-bold' : ''}`}>
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${hasMinLength ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                            {hasMinLength ? '✓' : '•'}
                          </span>
                          <span>Min 8 chars</span>
                        </div>

                        <div className={`flex items-center space-x-1 ${hasNumber ? 'text-emerald-700 font-bold' : ''}`}>
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${hasNumber ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                            {hasNumber ? '✓' : '•'}
                          </span>
                          <span>Number (0-9)</span>
                        </div>

                        <div className={`flex items-center space-x-1 ${hasSign ? 'text-emerald-700 font-bold' : ''}`}>
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${hasSign ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                            {hasSign ? '✓' : '•'}
                          </span>
                          <span>Sign (!@#$)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-type password"
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isStrongPassword}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>
                    {loading
                      ? 'Creating Account...'
                      : enrollCourse
                      ? `Create Account & Enroll in Course`
                      : 'Create Account & Begin'}
                  </span>
                </button>
              </form>

              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition ml-1 cursor-pointer"
                  >
                    {enrollCourse ? 'Sign in to enroll' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </div>
          )}
>>>>>>> bf53632cf4d649f83a661a098be828d1230469b5
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> bf53632cf4d649f83a661a098be828d1230469b5
