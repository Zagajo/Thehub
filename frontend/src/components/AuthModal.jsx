import React, { useState } from 'react';
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
  LogIn
} from 'lucide-react';
import { api } from '../services/api.js';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  // 'login' | 'register'
  const [mode, setMode] = useState('login');

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
        onAuthSuccess(res.user);
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
    if (!registerPassword || registerPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
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
        onAuthSuccess(res.user);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Hub Rwanda Authentication</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create an Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {mode === 'login'
              ? 'Provide your full email address and password to log in.'
              : 'Register your details to access certified skills and credentials.'}
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
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

          {/* ========================================================= */}
          {/* MODE 1: LOGIN FORM */}
          {/* ========================================================= */}
          {mode === 'login' && (
            <div className="space-y-4">
              {/* Quick credential presets */}
              <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Quick-Fill Presets for Evaluation
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => fillCredentials('kezia.umutoni@thehub.rw', 'password123')}
                    className="p-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left transition"
                  >
                    <span className="text-[11px] font-bold text-slate-800 block truncate">Kezia (Learner)</span>
                    <span className="text-[10px] text-slate-500 font-mono block">Data Analyst • 14d</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fillCredentials('alice.mukamana@thehub.rw', 'admin123')}
                    className="p-2 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl text-left transition"
                  >
                    <span className="text-[11px] font-bold text-slate-800 block truncate">Dr. Alice (Admin)</span>
                    <span className="text-[10px] text-amber-700 font-mono block">Executive Authority</span>
                  </button>
                </div>
              </div>

              {/* Login Form */}
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
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
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
                  <span>{loading ? 'Authenticating...' : 'Sign In with Email & Password'}</span>
                </button>
              </form>

              {/* Link below for creating an account */}
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
                    className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition ml-1"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MODE 2: CREATE AN ACCOUNT FORM */}
          {/* asks for names, email, region/location, date of birth */}
          {/* ========================================================= */}
          {mode === 'register' && (
            <div className="space-y-4">
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {/* Full Names */}
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

                {/* Email */}
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

                {/* Region / Location */}
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

                {/* Date of Birth */}
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

                {/* Career Pathway Goal */}
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

                {/* Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password (min. 6 chars)
                    </label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showRegisterPassword ? 'text' : 'password'}
                        required
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showRegisterPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
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
                        placeholder="••••••••"
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{loading ? 'Creating Account...' : 'Create Account & Begin'}</span>
                </button>
              </form>

              {/* Link below to sign in if already have an account */}
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
                    className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition ml-1"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
