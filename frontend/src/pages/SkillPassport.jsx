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
  Edit3
} from 'lucide-react';

export default function SkillPassport({ user, onOpenEditProfile }) {
  const [copied, setCopied] = useState(false);

  const learner = user || {
    name: 'Kezia Umutoni',
    location: 'Gasabo District, Kigali City',
    role: 'Aspiring Junior Data Analyst',
    streakDays: 14,
    assessedSkills: [
      { name: 'SQL & Relational Databases', score: 65, level: 'Practitioner (Level 2)' },
      { name: 'Python for Data Analysis', score: 40, level: 'Foundation (Level 1)' },
      { name: 'Professional English for Business', score: 70, level: 'Practitioner (Level 2)' },
      { name: 'NISR Statistical Literacy', score: 55, level: 'Foundation (Level 1)' }
    ],
    verifiedCredentials: [
      {
        id: 'cred-01',
        title: 'Rwanda Labour Statistics Literacy',
        issuedBy: 'The Hub — Verified Assessment Panel',
        issueDate: '2026-09-15',
        evidenceUrl: 'https://thehub.rw/verify/cred-01',
        score: '88% (Level 2 Verified)'
      },
      {
        id: 'cred-02',
        title: 'Peer Helper Endorsement: Python Basics',
        issuedBy: 'The Hub Community Learning Circle',
        issueDate: '2026-09-28',
        evidenceUrl: 'https://thehub.rw/verify/cred-02',
        score: 'Completed 6 Mentorship Hours'
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
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cryptographic Skill Passport</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Learner Competency Passport
          </h1>
          <p className="text-xs text-slate-500">
            Distinguishes course completion from demonstrated workplace capability.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {onOpenEditProfile && (
            <button
              onClick={onOpenEditProfile}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-100 transition shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Public Link'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Passport Document Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden print:border-none print:shadow-none">
        {/* Passport Header Strip */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest uppercase text-blue-300">
                REPUBLIC OF RWANDA — THE HUB SKILL PASSPORT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">{learner.name}</h2>
              <p className="text-xs text-slate-300 font-medium">
                {learner.role} • {learner.location}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right font-mono text-[11px] text-blue-200">
                <span className="block text-slate-400">PASSPORT HASH</span>
                <span className="font-bold">HUB-RW-94A8E</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Passport Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Verified Digital Credentials */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Tri-Part Credentials</span>
              </h3>
              <span className="text-xs text-slate-400">
                {learner.verifiedCredentials?.length || 0} Badges Issued
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learner.verifiedCredentials?.map((cred, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{cred.title}</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      {cred.score}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 space-y-0.5 font-mono">
                    <p>Issuer: {cred.issuedBy}</p>
                    <p>Verified Date: {cred.issueDate}</p>
                  </div>
                  <div className="pt-1">
                    <span className="text-[10px] text-blue-600 font-bold hover:underline flex items-center space-x-1 cursor-pointer">
                      <span>Inspect Capstone Artifact Evidence</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessed Competency Inventory */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Demonstrated Competency Scores (Tri-Part Assessment)</span>
              </h3>
              <span className="text-xs text-slate-400">Theory + Practical + Capstone</span>
            </div>

            <div className="space-y-3">
              {learner.assessedSkills?.map((skill, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-900">{skill.name}</span>
                    <span className="text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200/60">
                      {skill.level} ({skill.score}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning-by-Teaching Mentorship Ladder */}
          <div className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>Learning-by-Teaching Mentorship Ladder</span>
            </div>
            <p className="text-xs text-indigo-950/80 leading-relaxed">
              Learners who achieve Level 2 (Practitioner) or Level 3 (Specialist) are authorized to host peer study groups and language exchanges. Kezia Umutoni has logged <strong>6 verified community mentorship hours</strong> in Python Fundamentals.
            </p>
          </div>

          {/* Legal / Accreditation Disclaimer Notice */}
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
            <p>
              * Note: The Hub Skill Passport certifies verified workplace and portfolio competencies evaluated against NISR industry benchmarks. It complements, but is independent from, formal degree accreditations issued by the Rwanda TVET Board (RTB) or Higher Education Council (HEC).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
