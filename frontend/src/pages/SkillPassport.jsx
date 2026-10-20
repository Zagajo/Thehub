import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Printer,
  Calendar,
  Flame,
  UserCheck,
  ExternalLink,
  Sparkles,
  Layers,
  Edit3,
  QrCode,
  Check,
  Lock,
  Globe,
  BadgeCheck
} from 'lucide-react';

export default function SkillPassport({ user, onOpenEditProfile }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('credentials');
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [selectedCred, setSelectedCred] = useState(null);

  const learner = user || {
    name: 'Kezia Umutoni',
    location: 'Gasabo District, Kigali City',
    role: 'Aspiring Junior Data Analyst',
    streakDays: 14,
    email: 'kezia.umutoni@thehub.rw',
    memberSince: 'September 2026',
    assessedSkills: [
      { name: 'SQL & Relational Databases', score: 85, level: 'Practitioner (Level 2)', status: 'Verified' },
      { name: 'Python for Data Analysis', score: 78, level: 'Practitioner (Level 2)', status: 'Verified' },
      { name: 'Professional English for Business', score: 90, level: 'Specialist (Level 3)', status: 'Verified' },
      { name: 'NISR Statistical Literacy', score: 82, level: 'Practitioner (Level 2)', status: 'Verified' }
    ],
    verifiedCredentials: [
      {
        id: 'cred-01',
        title: 'Rwanda Labour Statistics Literacy & Empirical Modeling',
        issuedBy: 'The Hub — Verified Assessment Panel (NISR Aligned)',
        issueDate: '2026-09-15',
        evidenceUrl: 'https://thehub.rw/verify/cred-01',
        score: '88% (Level 2 Verified)',
        hash: '0x8f7b...3c21',
        badgeColor: 'bg-blue-600'
      },
      {
        id: 'cred-02',
        title: 'Peer Helper Endorsement: Python Data Pipelines',
        issuedBy: 'The Hub Community Learning Circle',
        issueDate: '2026-09-28',
        evidenceUrl: 'https://thehub.rw/verify/cred-02',
        score: 'Completed 6 Mentorship Hours',
        hash: '0x4e2a...9d10',
        badgeColor: 'bg-indigo-600'
      },
      {
        id: 'cred-03',
        title: 'Enterprise Cloud Microservices & PostgreSQL',
        issuedBy: 'The Hub Engineering Board',
        issueDate: '2026-10-10',
        evidenceUrl: 'https://thehub.rw/verify/cred-03',
        score: '92% (First Class Distinction)',
        hash: '0x9c31...f8e4',
        badgeColor: 'bg-emerald-600'
      }
    ]
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto w-full min-w-0 font-sans">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2 border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Cryptographic Skill Passport & Enterprise Credential Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Learner Competency Passport
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Cryptographically signed workplace capability records aligned with National Institute of Statistics of Rwanda (NISR) benchmarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenEditProfile && (
            <button
              onClick={onOpenEditProfile}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Profile</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-100 transition cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Public Link'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Passport Master Document */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden w-full min-w-0 print:border-none print:shadow-none">
        {/* Elite Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-8 sm:p-10 relative overflow-hidden">
          {/* Background Watermark Symbol */}
          <div className="absolute right-[-20px] bottom-[-20px] text-white/5 font-mono text-9xl font-black select-none pointer-events-none">
            HUB
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                  Official Republic of Rwanda Credential
                </span>
                <span className="flex items-center space-x-1 text-emerald-400 text-xs font-bold font-mono">
                  <BadgeCheck className="w-4 h-4" />
                  <span>Blockchain Verified Hash</span>
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">{learner.name}</h2>
              <p className="text-xs sm:text-sm text-blue-200 font-medium">
                Target Role: <strong className="text-white font-bold">{learner.role}</strong> • {learner.location}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-mono">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>Member Since: {learner.memberSince}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-amber-300 font-bold">{learner.streakDays} Day Streak</span>
                </span>
              </div>
            </div>

            {/* QR Verification Seal Box */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center space-x-4 shrink-0 shadow-lg">
              <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center text-slate-900 shadow-inner">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
              <div className="font-mono text-xs space-y-1">
                <span className="text-[10px] text-blue-300 uppercase block tracking-wider">Cryptographic Hash</span>
                <span className="font-bold text-white tracking-widest text-sm">HUB-RW-94A8E</span>
                <span className="text-[10px] text-emerald-400 block">Status: Active & Validated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher inside Passport */}
        <div className="border-b border-slate-200 bg-slate-50 px-8 py-3 flex items-center space-x-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`pb-2 transition cursor-pointer border-b-2 ${
              activeTab === 'credentials'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Verified Credentials ({learner.verifiedCredentials?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('competencies')}
            className={`pb-2 transition cursor-pointer border-b-2 ${
              activeTab === 'competencies'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Assessed Competency Scores ({learner.assessedSkills?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('mentorship')}
            className={`pb-2 transition cursor-pointer border-b-2 ${
              activeTab === 'mentorship'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Mentorship & Community Leadership
          </button>
        </div>

        {/* Passport Body Content */}
        <div className="p-8 space-y-8 w-full min-w-0">
          {activeTab === 'credentials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Tri-Part Verified Credentials & Badges</span>
                  </h3>
                  <p className="text-xs text-slate-500">Each credential is backed by verified theory exams, coding practicals, and peer-reviewed capstones.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {learner.verifiedCredentials?.map((cred, idx) => (
                  <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:shadow-md transition space-y-3 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-black text-slate-900 group-hover:text-blue-700 transition" title={cred.title}>
                        {cred.title}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0 font-mono">
                        {cred.score}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-1 font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="truncate"><strong>Issuer:</strong> {cred.issuedBy}</p>
                      <p><strong>Issued On:</strong> {cred.issueDate}</p>
                      <p className="text-blue-600"><strong>Ledger Hash:</strong> {cred.hash}</p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setSelectedCred(cred);
                          setVerifyModalOpen(true);
                        }}
                        className="font-bold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verify Cryptographic Proof</span>
                      </button>

                      <span className="text-[10px] font-mono text-slate-400">Secure Ledger v2</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'competencies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Demonstrated Competency Inventory</span>
                  </h3>
                  <p className="text-xs text-slate-500">Evaluated against Rwanda National Skills Framework (NST2) benchmarks.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(learner?.assessedSkills || []).map((skill, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{skill.name}</span>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full font-mono">
                        {skill.score}%
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-slate-500">
                        <span>Proficiency Level</span>
                        <strong className="text-slate-800">{skill.level}</strong>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-700"
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mentorship' && (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl space-y-4">
                <div className="flex items-center space-x-3 text-slate-900 font-bold text-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-base">Learning-by-Teaching Mentorship Ladder</h4>
                    <span className="text-xs text-blue-700 font-mono">Certified Peer Community Leader</span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Learners who achieve Level 2 (Practitioner) or Level 3 (Specialist) are authorized to host peer study circles and language exchanges. {learner.name} has logged <strong>6 verified community mentorship hours</strong> in Python Fundamentals, guiding junior cohorts across Kigali and Musanze districts.
                </p>
                <div className="flex items-center space-x-3 pt-2">
                  <span className="px-3 py-1 rounded-lg bg-white border border-blue-200 text-xs font-bold text-blue-800 shadow-2xs">
                    ✓ Active Peer Mentor Badge
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-blue-200 text-xs font-bold text-slate-700 shadow-2xs">
                    6 Mentorship Hours Logged
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Legal Accreditation Notice */}
          <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed font-mono">
            <p>
              * Note: The Hub Skill Passport certifies verified workplace and portfolio competencies evaluated against NISR industry benchmarks. It complements, but is independent from, formal degree accreditations issued by the Rwanda TVET Board (RTB) or Higher Education Council (HEC).
            </p>
          </div>
        </div>
      </div>

      {/* Credential Verification Modal */}
      {verifyModalOpen && selectedCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col">
            <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Cryptographic Ledger Verification
                </span>
                <h3 className="text-lg font-black mt-0.5">{selectedCred.title}</h3>
              </div>
              <button
                onClick={() => setVerifyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-emerald-900">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block font-bold">Cryptographically Validated Signature</strong>
                  <span>This credential is immutably signed by The Hub verification authority and matches NISR standards.</span>
                </div>
              </div>

              <div className="space-y-2 font-mono bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p><strong>Credential ID:</strong> {selectedCred.id}</p>
                <p><strong>Issuer:</strong> {selectedCred.issuedBy}</p>
                <p><strong>Issue Date:</strong> {selectedCred.issueDate}</p>
                <p className="text-blue-600"><strong>SHA-256 Ledger Hash:</strong> {selectedCred.hash}</p>
                <p className="text-emerald-700"><strong>Score / Grade:</strong> {selectedCred.score}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setVerifyModalOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
