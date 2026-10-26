import React, { useEffect, useState } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  BarChart2, 
  Sparkles,
  ShieldAlert,
  PlayCircle
} from 'lucide-react';

interface DashboardProps {
  setCurrentTab: (tab: string) => void;
  onSelectCourse: (slug: string) => void;
  user: any;
  onOpenAuth: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setCurrentTab, onSelectCourse, user, onOpenAuth }) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [nisrIndicators, setNisrIndicators] = useState<any[]>([]);
  const [skillGapResult, setSkillGapResult] = useState<any>(null);
  const [loadingGap, setLoadingGap] = useState(false);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.slice(0, 3)))
      .catch(console.error);

    fetch('/api/nisr/indicators')
      .then(res => res.json())
      .then(data => setNisrIndicators(data))
      .catch(console.error);

    fetch('/api/recommendations/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetRole: 'Full-Stack Software Engineer' })
    })
      .then(res => res.json())
      .then(data => setSkillGapResult(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-950 rounded-3xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden border border-navy-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-6 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            SkillBridge Rwanda • NST2 National Strategy
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Data-Informed Skills & Learning Platform
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Connecting Rwandan learners with verified skill assessments, structured learning pathways, and official labour market intelligence from the National Institute of Statistics of Rwanda (NISR).
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setCurrentTab('courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
            >
              Explore Courses & Pathways
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('insights')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl backdrop-blur transition border border-white/20 flex items-center gap-2"
            >
              View NISR Labour Insights
              <BarChart2 className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>
      </div>

      {/* NISR Key Indicators Marquee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nisrIndicators.map((ind, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
              <span>{ind.category}</span>
              <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">{ind.trend}</span>
            </div>
            <div className="mt-3 text-3xl font-extrabold text-navy-900">{ind.value}</div>
            <div className="mt-1 text-sm font-medium text-slate-800">{ind.indicator}</div>
            <p className="mt-2 text-xs text-slate-500 line-clamp-2">{ind.source}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Featured Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Featured Learning Pathways</h2>
              <p className="text-sm text-slate-600">Certified by industry experts and aligned with national economic growth sectors.</p>
            </div>
            <button
              onClick={() => setCurrentTab('courses')}
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div 
                key={course.id}
                onClick={() => onSelectCourse(course.slug)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 border border-slate-200 cursor-pointer flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                    {course.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>{course.duration}</span>
                      <span className="font-semibold text-blue-600">{course.difficulty}</span>
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 leading-snug">{course.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2">{course.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">👥 {course.enrolled} Learners</span>
                    <span className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                      Start Learning <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Deterministic Skill Gap HUD & User Card */}
        <div className="space-y-6">
          {/* User Status Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-600" />
                  <div>
                    <h4 className="font-bold text-navy-900">{user.name}</h4>
                    <p className="text-xs text-slate-500">{user.district}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block">Skill Passport ID</span>
                    <span className="font-mono font-bold text-navy-900">{user.passportId}</span>
                  </div>
                  <button
                    onClick={() => setCurrentTab('passport')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    View Passport
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-navy-900">Sign in to track progress</h4>
                <p className="text-xs text-slate-500">Access demo learner profile or sign in with your email to unlock all features.</p>
                <button
                  onClick={onOpenAuth}
                  className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition shadow"
                >
                  Sign In / Demo Access
                </button>
              </div>
            )}
          </div>

          {/* Skill Gap Engine Preview */}
          <div className="bg-gradient-to-br from-blue-900 to-navy-950 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">Deterministic Skill Gap Engine</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded font-bold">74% Match</span>
            </div>
            <h4 className="text-lg font-bold mb-2">Target: Full-Stack Engineer</h4>
            <p className="text-xs text-slate-300 mb-4">Calculated from NISR labour demand and your assessment diagnostic.</p>
            
            {skillGapResult && (
              <div className="space-y-3">
                {skillGapResult.gaps.map((gap: any, i: number) => (
                  <div key={i} className="bg-white/10 rounded-xl p-3 border border-white/10 text-xs">
                    <div className="flex justify-between font-semibold text-white">
                      <span>{gap.skill}</span>
                      <span className="text-amber-400">{gap.priority} Priority</span>
                    </div>
                    <div className="text-slate-300 mt-1">Rec: {gap.recommendedCourse}</div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setCurrentTab('assessments')}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition shadow flex items-center justify-center gap-2"
            >
              Take Assessment Diagnostic
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
