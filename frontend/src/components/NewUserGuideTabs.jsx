import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle2,
  Users,
  UserPlus,
  LogIn
} from 'lucide-react';

export default function NewUserGuideTabs({
  onOpenAuth,
  onEnrollCourse,
  onLoginToEnroll,
  courses = [],
  isAdmin
}) {
  // Never display to admin
  if (isAdmin) return null;

  const [activeTab, setActiveTab] = useState('how-it-works');

  const guideTabs = [
    {
      id: 'how-it-works',
      title: '1. How It Works',
      icon: Compass,
      badge: 'Guide'
    },
    {
      id: 'in-demand-courses',
      title: '2. In-Demand Courses',
      icon: BookOpen,
      badge: 'Popular'
    },
    {
      id: 'career-pathways',
      title: '3. Career Pathways',
      icon: TrendingUp,
      badge: 'Tracks'
    },
    {
      id: 'accreditation',
      title: '4. Verified Accreditation',
      icon: Award,
      badge: 'Credentials'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Clean Solid Header Banner (No gradients) */}
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium">
            <span>New Learner Orientation & Directing Guide</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Welcome to The Hub Rwanda
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Explore approved courses, calculate skill gaps against NISR national market demand, and earn verified credentials.
          </p>

          {/* Simple Action Directives */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onOpenAuth('register')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition flex items-center space-x-1.5 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account to Enroll</span>
            </button>

            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-xs rounded-lg transition flex items-center space-x-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In & Enroll</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="p-2 sm:p-3 bg-slate-50 border-b border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-semibold">
          {guideTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-lg transition text-left flex flex-col justify-between space-y-1.5 border cursor-pointer ${
                  active
                    ? 'bg-white text-blue-700 border-blue-500 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-1.5 rounded-md ${active ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                    active ? 'bg-blue-100 text-blue-800 font-semibold' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {tab.badge}
                  </span>
                </div>
                <span className="text-xs font-semibold leading-tight">{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1 Content: How It Works */}
      {activeTab === 'how-it-works' && (
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Three Simple Steps to Get Started
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Follow this structured path to master in-demand skills and earn industry-recognized credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Explore Market Demand</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Check National Institute of Statistics of Rwanda (NISR) labor market indicators to align your learning with high-demand sectors like Services, Tech, and Agribusiness.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Enroll & Build Real Skills</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Register or log in to enroll. Complete interactive lessons and real-world project assignments at your own pace.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Earn Verified Credentials</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pass assessments (Theory, Practical, Capstone) to receive verifiable Skill Passports and certificates you can share with employers.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-900 text-xs">Ready to begin learning?</span>
              <p className="text-xs text-slate-500">Sign up or sign in to enroll into your first course.</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Create Account to Enroll
              </button>
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Log In & Enroll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 Content: In-Demand Courses */}
      {activeTab === 'in-demand-courses' && (
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Popular Certified Learning Programs
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Choose an approved course below. If you don't have an account yet, click <strong>Enroll Now</strong> to register. If you already have an account, click <strong>Log In & Enroll</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="p-5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {course.difficulty}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {course.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {course.tagline || course.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {course.skillsGained?.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{course.duration}</span>
                    <span className="text-emerald-700 font-semibold">Free</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onEnrollCourse(course)}
                      className="py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1 cursor-pointer"
                      title="Create an account and immediately enroll in this course"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Enroll Now</span>
                    </button>

                    <button
                      onClick={() => onLoginToEnroll ? onLoginToEnroll(course) : onOpenAuth('login')}
                      className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1 cursor-pointer"
                      title="Log in to your existing account and enroll"
                    >
                      <LogIn className="w-3.5 h-3.5 text-slate-500" />
                      <span>Log In & Enroll</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-slate-700">
              New to The Hub? <strong>Enroll Now</strong> will help you create your account and automatically register you. Have an account? Click <strong>Log In & Enroll</strong>.
            </span>
            <button
              onClick={() => onOpenAuth('login')}
              className="font-semibold text-blue-600 hover:underline shrink-0 cursor-pointer"
            >
              Sign In &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Tab 3 Content: Rwanda Career Pathways */}
      {activeTab === 'career-pathways' && (
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Structured Career Tracks
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Progressive roadmaps from foundation skills to job-ready expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Data & Services
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Junior Data Analyst</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Targets services and fintech growth with SQL, Python for analytics, and statistical literacy.
              </p>
              <div className="pt-2 text-xs text-slate-500">
                <span className="font-medium text-slate-700 block">Est. Duration: 10 Weeks</span>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                Software & ICT
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Full-Stack Software Practitioner</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Teaches web and mobile application engineering, APIs, and modern deployment.
              </p>
              <div className="pt-2 text-xs text-slate-500">
                <span className="font-medium text-slate-700 block">Est. Duration: 12 Weeks</span>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                AgriTech & Operations
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Agri-Tech Cooperative Specialist</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Combines modern agricultural value-chain digital tools and cooperative bookkeeping.
              </p>
              <div className="pt-2 text-xs text-slate-500">
                <span className="font-medium text-slate-700 block">Est. Duration: 8 Weeks</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2 flex items-center justify-center space-x-3">
            <button
              onClick={() => onOpenAuth('register')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer inline-flex items-center space-x-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account to Start Pathway</span>
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer inline-flex items-center space-x-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-500" />
              <span>Log In</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4 Content: Verified Accreditation */}
      {activeTab === 'accreditation' && (
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Verifiable Skill Passports & Digital Diplomas
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Empower your career profile with verified proof of work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center space-x-2 text-blue-700 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tri-Part Evaluation Standard</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Competency scores are calculated through a rigorous tri-part balance: <strong>30% Theory Benchmark</strong>, <strong>40% Practical Application</strong>, and <strong>30% Capstone Project</strong>.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center space-x-2 text-blue-700 font-semibold text-xs">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Sharable Public Passport Link</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate an official public verification URL and downloadable PDF diploma to include on your CV and LinkedIn profiles.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-600">
              Create your account today and earn your first verified badge.
            </span>
            <button
              onClick={() => onOpenAuth('register')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
