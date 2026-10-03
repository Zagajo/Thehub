import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  MapPin,
  Target,
  Globe,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api.js';

export default function EditProfileModal({ isOpen, onClose, user, onProfileUpdated }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security'

  // Profile Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [bio, setBio] = useState('');

  // Password Fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // States
  const [saving, setSaving] = useState(false);
  const [successNotice, setSuccessNotice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setLocation(user.location || 'Gasabo District, Kigali City');
      setTargetRole(user.targetRole || user.role || 'Junior Data Analyst');
      setPreferredLanguage(user.preferredLanguage || 'English');
      setBio(user.bio || 'Developing workplace data skills and technical proficiency aligned with Rwanda NISR economic benchmarks.');
    }
    setSuccessNotice(null);
    setErrorMessage(null);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }, [user, isOpen]);

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

  const careerRoles = [
    'Junior Data Analyst',
    'Web Application Developer',
    'Agribusiness Operations Specialist',
    'Tourism & Hospitality Lead',
    'FinTech & Systems Specialist',
    'Data & Statistical Researcher'
  ];

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    setSuccessNotice(null);

    try {
      const res = await api.updateProfile({
        name,
        email,
        location,
        targetRole,
        preferredLanguage,
        bio
      });
      if (res.success) {
        setSuccessNotice('Profile details saved successfully.');
        if (onProfileUpdated) onProfileUpdated(res.user);
        setTimeout(() => {
          setSuccessNotice(null);
          onClose();
        }, 1200);
      } else {
        setErrorMessage(res.error || 'Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error while saving profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match. Please re-enter them carefully.');
      return;
    }

    setSaving(true);
    try {
      const res = await api.changePassword({
        currentPassword,
        newPassword,
        confirmPassword
      });

      if (res.success) {
        setSuccessNotice('Password updated successfully! Your credentials are now secure.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setSuccessNotice(null);
          onClose();
        }, 1500);
      } else {
        setErrorMessage(res.error || 'Failed to change password.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error while updating password.');
    } finally {
      setSaving(false);
    }
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!newPassword) return { text: 'Empty', color: 'text-slate-400', width: 'w-0' };
    if (newPassword.length < 6) return { text: 'Too Weak', color: 'text-red-500', width: 'w-1/4 bg-red-500' };
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    if (newPassword.length >= 10 && hasNumbers && hasSpecial) {
      return { text: 'Strong', color: 'text-emerald-600', width: 'w-full bg-emerald-500' };
    }
    if (newPassword.length >= 8 && (hasNumbers || hasSpecial)) {
      return { text: 'Moderate', color: 'text-amber-600', width: 'w-2/3 bg-amber-500' };
    }
    return { text: 'Fair', color: 'text-blue-600', width: 'w-1/2 bg-blue-500' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Learner Profile & Security Settings</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Account & Security</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage your personal details, Rwanda district location, and account password.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 pt-3 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setActiveTab('profile'); setErrorMessage(null); setSuccessNotice(null); }}
            className={`pb-3 px-3 flex items-center space-x-1.5 border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Personal Profile</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('security'); setErrorMessage(null); setSuccessNotice(null); }}
            className={`pb-3 px-3 flex items-center space-x-1.5 border-b-2 transition ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Password & Security</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {successNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Display Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kezia Umutoni"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="learner@thehub.rw"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  District / Region (Rwanda NISR Geographic Alignment)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                  >
                    {rwandaDistricts.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Career Pathway Goal
                </label>
                <div className="relative">
                  <Target className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                  >
                    {careerRoles.map((role, i) => (
                      <option key={i} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Study & Mentorship Language
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                  >
                    <option value="English">English (Business & Technical)</option>
                    <option value="Kinyarwanda">Kinyarwanda</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Professional Summary / Bio
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Brief summary of your learning objectives..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                >
                  <span>{saving ? 'Saving Changes...' : 'Save Profile'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PASSWORD CHANGE */}
          {activeTab === 'security' && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-start space-x-3 text-xs text-blue-900">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Account Security Policy</span>
                  <p className="text-[11px] text-blue-800 mt-0.5">
                    Your password protects your verified Skill Passport credentials and assessment records. Use at least 6 characters with a combination of letters and numbers.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Password (Optional if newly registered)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 6 characters)"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                  />
                </div>

                {/* Password strength meter */}
                {newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-500">Security Strength:</span>
                      <span className={strength.color}>{strength.text}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${strength.width}`}></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type your new password"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !newPassword || !confirmPassword}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{saving ? 'Updating Password...' : 'Update Password'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
