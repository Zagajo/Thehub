import React from 'react';
import { BookOpen, Award, BarChart3, ShieldCheck, ArrowRight, CheckCircle2, Briefcase, Users, Cpu, Wifi, FileText } from 'lucide-react';

export default function Home({ setActiveTab, user, onOpenAuth }) {
  return (
    <div className="space-y-12 pb-24 bg-slate-50 text-slate-900 min-h-screen font-sans">
      {/* IBM Carbon Inspired Enterprise Dashboard Header (Light Theme) */}
      <section className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 bg-slate-100 border border-slate-300 text-slate-700 text-xs font-mono tracking-widest uppercase">
              SYS-STATUS: OPERATIONAL
            </span>
            <span className="px-2.5 py-1 bg-slate-100 border border-slate-300 text-slate-700 text-xs font-mono tracking-widest uppercase">
              ENVIRONMENT: PRODUCTION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-900">
                The Hub <span className="font-bold text-blue-950">Enterprise Intelligence</span>
              </h1>
              <p className="text-slate-600 text-base max-w-2xl leading-relaxed font-light">
                National skills platform delivering data-informed technical training, verified cryptographic credentials, offline-first progress synchronization, and official NISR labour market analytics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setActiveTab('courses')}
                className="px-6 py-3.5 bg-blue-900 text-white hover:bg-blue-800 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {!user && (
                <button
                  onClick={onOpenAuth}
                  className="px-6 py-3.5 bg-slate-200 border border-slate-300 text-slate-800 hover:bg-slate-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* IBM Carbon Style Metric Cards Grid (Light Theme) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-6 space-y-3 hover:border-blue-900 transition-colors shadow-sm rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
              <span>METRIC 01</span>
              <BookOpen className="w-4 h-4 text-blue-900" />
            </div>
            <div className="text-3xl font-light text-slate-900">100+</div>
            <div className="text-xs text-slate-500 font-mono">Curated Modules & Video Lectures</div>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-3 hover:border-blue-900 transition-colors shadow-sm rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
              <span>METRIC 02</span>
              <BarChart3 className="w-4 h-4 text-blue-900" />
            </div>
            <div className="text-3xl font-light text-slate-900">NISR LFS</div>
            <div className="text-xs text-slate-500 font-mono">Real-time Labour Market Indicators</div>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-3 hover:border-blue-900 transition-colors shadow-sm rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
              <span>METRIC 03</span>
              <Award className="w-4 h-4 text-blue-900" />
            </div>
            <div className="text-3xl font-light text-slate-900">SHA-256</div>
            <div className="text-xs text-slate-500 font-mono">QR Verified Secure Certificates</div>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-3 hover:border-blue-900 transition-colors shadow-sm rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
              <span>METRIC 04</span>
              <Briefcase className="w-4 h-4 text-blue-900" />
            </div>
            <div className="text-3xl font-light text-slate-900">Active</div>
            <div className="text-xs text-slate-500 font-mono">Employer Matching & Stipends</div>
          </div>
        </div>
      </section>

      {/* System Core Functions & Architecture (Light Theme) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <h2 className="text-lg font-mono tracking-wider uppercase text-slate-900 font-bold">
            // Core System Functions & Architecture
          </h2>
          <span className="text-xs font-mono text-slate-500">CARBON ENTERPRISE SPEC v2.4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-8 space-y-4 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Course Discovery & Enrollment</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-light">
              Public course catalog with granular skill filtering, difficulty levels, and syllabus previews. Enrolled users gain access to ordered lessons, videos, and practical notes.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 space-y-4 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">Offline-First Synchronization</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-light">
              Local IndexedDB caching for study notes and reading progress during network outages. Automatic conflict-free background queue synchronization upon reconnection.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 space-y-4 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">Cryptographic Certificate Vault</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-light">
              Server-validated course completion checks triggering unique SHA-256 hash IDs and scannable QR verification badges stored directly in the learner Skill Passport.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Enterprise Navigation & Usage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <h2 className="text-lg font-mono tracking-wider uppercase text-slate-900 font-bold">
            // Platform Operation Workflow
          </h2>
          <span className="text-xs font-mono text-slate-500">USER GUIDE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 space-y-3 rounded-2xl shadow-sm">
            <div className="text-xs font-mono text-slate-400">PHASE_01</div>
            <h4 className="text-sm font-bold text-slate-900">Identity & Profile</h4>
            <p className="text-slate-600 text-xs font-light leading-relaxed">
              Register or sign in to obtain your National Passport ID. Customize profile details, avatar uploads, and account passwords securely.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-3 rounded-2xl shadow-sm">
            <div className="text-xs font-mono text-slate-400">PHASE_02</div>
            <h4 className="text-sm font-bold text-slate-900">Curriculum & Study</h4>
            <p className="text-slate-600 text-xs font-light leading-relaxed">
              Enroll in verified courses, review structured modules, and study embedded lecture notes and video tutorials.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-3 rounded-2xl shadow-sm">
            <div className="text-xs font-mono text-slate-400">PHASE_03</div>
            <h4 className="text-sm font-bold text-slate-900">Assessment & Grading</h4>
            <p className="text-slate-600 text-xs font-light leading-relaxed">
              Take strictly enforced online assessments to validate technical competency. Results update your portfolio automatically.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-3 rounded-2xl shadow-sm">
            <div className="text-xs font-mono text-slate-400">PHASE_04</div>
            <h4 className="text-sm font-bold text-slate-900">Credentials & Matching</h4>
            <p className="text-slate-600 text-xs font-light leading-relaxed">
              Download printable PDF certificates with QR verification, explore NISR data insights, and apply for employer challenges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
