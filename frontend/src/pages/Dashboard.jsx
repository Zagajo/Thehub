import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  Users, 
  BarChart2, 
  Sparkles
} from 'lucide-react';

export const Dashboard = ({ setCurrentTab, onSelectCourse, user, onOpenAuth }) => {
  const [courses, setCourses] = useState([]);
  const [nisrIndicators, setNisrIndicators] = useState([]);
  const [skillGapResult, setSkillGapResult] = useState(null);

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
      <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-6 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            SkillBridge Rwanda • NST2 National Strategy
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Data-Informed Skills & Learning Platform
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Connecting Rwandan learners with verified skill assessments, structured learning pathways, study notes, video lectures, and official labour market intelligence from NISR.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setCurrentTab('courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow transition flex items-center gap-2 text-sm"
            >
              Explore Courses & Notes
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('insights')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition border border-slate-700 flex items-center gap-2 text-sm"
            >
              View NISR Labour Insights
              <BarChart2 className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nisrIndicators.map((ind, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
              <span>{ind.category}</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">{ind.trend}</span>
            </div>
            <div className="mt-3 text-3xl font-extrabold text-slate-900">{ind.value}</div>
            <div className="mt-1 text-sm font-medium text-slate-800">{ind.indicator}</div>
            <p className="mt-2 text-xs text-slate-500 line-clamp-2">{ind.source}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Featured Learning Pathways</h2>
              <p className="text-sm text-slate-600">Certified by industry experts with embedded notes and study videos.</p>
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
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 border border-slate-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-slate-900/95 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {course.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>{course.duration}</span>
                      <span className="font-semibold text-blue-600">{course.difficulty}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{course.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2">{course.description}</p>
                  </div>
                </div>
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <span className="text-xs text-slate-500 font-medium">👥 {course.enrolled} Learners</span>
                  <span className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                    Start Learning <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-600" />
                  <div>
                    <h4 className="font-bold text-slate-900">{user.name}</h4>
                    <p className="text-xs text-slate-500">{user.district}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block">Skill Passport ID</span>
                    <span className="font-mono font-bold text-slate-900">{user.passportId}</span>
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
                <h4 className="font-bold text-slate-900">Sign in to track progress</h4>
                <p className="text-xs text-slate-500">Access demo learner profile or create your account.</p>
                <button
                  onClick={onOpenAuth}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition shadow"
                >
                  Sign In / Register
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">Deterministic Skill Gap Engine</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded font-bold">74% Match</span>
            </div>
            <h4 className="text-lg font-bold mb-2">Target: Full-Stack Engineer</h4>
            <p className="text-xs text-slate-300 mb-4">Calculated from NISR labour demand and your assessment diagnostic.</p>
            
            {skillGapResult && (
              <div className="space-y-3">
                {skillGapResult.gaps.map((gap, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-xs">
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
              Take Assessment Diagnostic:
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
