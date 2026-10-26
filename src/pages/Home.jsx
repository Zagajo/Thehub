import React from 'react';
import { BookOpen, Award, BarChart3, ShieldCheck, ArrowRight, CheckCircle2, Briefcase, Users } from 'lucide-react';

export default function Home({ setActiveTab, user, onOpenAuth }) {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section (IBM minimalist dark & REB national alignment) */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>REB & NISR National Skill Passport</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-ext500 font-bold tracking-tight leading-tight">
              Empowering Rwanda’s Digital Future Through <span className="text-indigo-400">Data-Informed Skills</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Discover verified technical courses aligned with National Strategy for Transformation (NST2) targets, complete practical assessments, track your career passport, and get matched with top employers.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setActiveTab('courses')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-2xl font-semibold shadow-xl shadow-indigo-900/40 transition-all flex items-center space-x-2 text-base"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              {!user && (
                <button
                  onClick={onOpenAuth}
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-7 py-3.5 rounded-2xl font-semibold transition-all text-base"
                >
                  Create Learner Passport
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-sm text-slate-400 font-medium">Verified Modules & Video Lectures</div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <div className="w-12 h-12 bg-emerald-600/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-white">NISR</div>
              <div className="text-sm text-slate-400 font-medium">Labour Market Intelligence Integration</div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <div className="w-12 h-12 bg-amber-600/20 text-amber-400 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-white">QR Verified</div>
              <div className="text-sm text-slate-400 font-medium">Secure SHA-256 Certificates</div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <div className="w-12 h-12 bg-purple-600/20 text-purple-400 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-white">Direct Match</div>
              <div className="text-sm text-slate-400 font-medium">Employer Projects & Stipends</div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Platform Core Capabilities</h2>
          <p className="text-slate-600">Built for Rwandan students, educators, and enterprise employers seeking verifiable skill credentials.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow space-y-4">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900">Enrolled-Only Assessments</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Assessments require login and strict enrollment. You only access tests for courses you are actively enrolled in, ensuring rigorous learning standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow space-y-4">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900">Certificate Requests & Approvals</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Upon completing course modules, request your certificate. Administrators review and approve certificates with cryptographically verifiable QR codes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow space-y-4">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl">
              03
            </div>
            <h3 className="text-xl font-bold text-slate-900">NISR Labour Data Sync</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Real-time integration with National Institute of Statistics of Rwanda indicators guiding you towards high-demand economic sectors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
