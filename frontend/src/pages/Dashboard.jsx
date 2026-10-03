import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Database,
  Wifi,
  Flame,
  Search,
  BookOpen
} from 'lucide-react';
import CourseCard from '../components/CourseCard.jsx';
import { api } from '../services/api.js';

export default function Dashboard({ user, onEnrollCourse, lowBandwidth }) {
  const [courses, setCourses] = useState([]);
  const [nisrSummary, setNisrSummary] = useState(null);
  const [indicators, setIndicators] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('path-1');
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cRes, nRes, indRes, gapRes] = await Promise.all([
          api.getCourses(),
          api.getNisrLabourSummary(),
          api.getNisrIndicators(),
          api.analyzeSkillGaps(user?.assessedSkills, 'path-1')
        ]);
        if (cRes.success) setCourses(cRes.data);
        if (nRes) setNisrSummary(nRes);
        if (indRes.success) setIndicators(indRes.data);
        if (gapRes.success) setGapAnalysis(gapRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  const handleGoalChange = async (e) => {
    const goalId = e.target.value;
    setSelectedGoal(goalId);
    try {
      const res = await api.analyzeSkillGaps(user?.assessedSkills, goalId);
      if (res.success) setGapAnalysis(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>RWANDA NISR LABOUR MARKET INFORMED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Data-Informed Skills & Learning Platform
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Bridge the gap between education and real Rwandan employment demand. Explore verified curriculum, take tri-part competency assessments, build your cryptographic Skill Passport, and partner in local peer learning cohorts.
          </p>

          {/* Core Recommendation Principle Banner */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-mono text-blue-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Core Recommendation Engine Principle:
            </span>
            <div className="overflow-x-auto whitespace-nowrap text-xs text-white">
              USER GOAL + USER SKILLS + ASSESSMENT + SKILL REQS + NISR LABOUR CONTEXT → <span className="text-emerald-400 font-bold">DATA-INFORMED PATHWAY</span>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg flex items-center space-x-2"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/pathways"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/15 flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>Target Pathways</span>
            </Link>

            <Link
              to="/insights"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/15 flex items-center space-x-2"
            >
              <span>NISR Insights & Data</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Macroeconomic NISR Context Strip */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h2 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>Rwanda Macroeconomic & Labour Market Context (Official NISR Data)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Indicators derived from official National Institute of Statistics of Rwanda reports
            </p>
          </div>
          <Link to="/insights" className="text-xs font-semibold text-blue-700 hover:underline flex items-center space-x-1">
            <span>View Full Dataset & Traceability</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[11px] font-semibold text-slate-500 block">Services Employment</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-slate-900">38.6%</span>
              <span className="text-[11px] text-emerald-600 font-bold">+2.4% YoY</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Driving demand in FinTech & Digital Trade</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[11px] font-semibold text-slate-500 block">Youth Participation</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-slate-900">52.4%</span>
              <span className="text-[11px] text-emerald-600 font-bold">+1.8% YoY</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Ages 16-30 across all 30 districts</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[11px] font-semibold text-slate-500 block">Household Internet Access</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-slate-900">34.2%</span>
              <span className="text-[11px] text-blue-600 font-bold">Expanding</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Informs text-first low-bandwidth mode</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-[11px] font-semibold text-slate-500 block">Agro-Industry Workforce</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-slate-900">44.8%</span>
              <span className="text-[11px] text-amber-600 font-bold">Value Addition</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Adopting cooperative digital tools</p>
          </div>
        </div>
      </section>

      {/* Interactive Deterministic Skill Gap Widget */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold mb-1">
              <TrendingUp className="w-3 h-3" />
              <span>DETERMINISTIC SKILL GAP ENGINE</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Personalized Gap Analysis for {user?.name || 'Kezia Umutoni'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Target role requirements calculated against your verified assessment scores
            </p>
          </div>

          {/* Goal Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold text-slate-700">Target Role:</label>
            <select
              value={selectedGoal}
              onChange={handleGoalChange}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="path-1">Junior Data Analyst</option>
              <option value="path-2">Web Application Developer</option>
              <option value="path-3">Agribusiness Operations Specialist</option>
            </select>
          </div>
        </div>

        {/* Readiness Overview */}
        {gapAnalysis && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                  Target Role Readiness
                </span>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-4xl font-black text-white">{gapAnalysis.overallReadinessPercentage}%</span>
                  <span className="text-xs text-blue-200">Competency Alignment</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-3 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${gapAnalysis.overallReadinessPercentage}%` }}
                  ></div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 space-y-1">
                  <p><strong>Sector:</strong> {gapAnalysis.targetPathway.targetSector}</p>
                  <p><strong>Estimated Time:</strong> {gapAnalysis.targetPathway.estimatedDuration}</p>
                </div>
              </div>

              <Link
                to="/pathways"
                className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition text-center block"
              >
                View Complete Pathway Plan
              </Link>
            </div>

            {/* Gap Breakdown Bars */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Required Competencies Breakdown
              </span>
              <div className="space-y-3">
                {gapAnalysis.gapBreakdown.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800">{item.skillName}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          item.priority === 'Critical Gap'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : item.priority === 'Moderate Gap'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.priority}
                        </span>
                        <span className="text-slate-500">
                          {item.currentScore} / {item.requiredScore} pts
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden flex">
                      <div
                        className="bg-blue-600 h-2 rounded-l-full"
                        style={{ width: `${(item.currentScore / item.requiredScore) * 100}%` }}
                      ></div>
                      {item.gap > 0 && (
                        <div
                          className="bg-red-400/70 h-2"
                          style={{ width: `${(item.gap / item.requiredScore) * 100}%` }}
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Featured Courses Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Featured Skill Programs
            </h2>
            <p className="text-xs text-slate-500">
              Curriculum with practical assessments, local case studies, and verification badges
            </p>
          </div>
          <Link
            to="/courses"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>See All Courses</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={user?.enrolledCourses?.includes(course.id)}
              onEnrollClick={onEnrollCourse}
              lowBandwidth={lowBandwidth}
            />
          ))}
        </div>
      </section>

      {/* Connected Pillars Strip (Connect, Assess, Prove) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to="/assessments"
          className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Tri-Part Assessments</h3>
            <p className="text-xs text-slate-600 mt-1">
              Prove competency through Theory (30%), Practical Code/Data task (40%), and Capstone Project (30%).
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 mt-4 flex items-center space-x-1">
            <span>Take Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/peer-matching"
          className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Peer Connect & Language Exchange</h3>
            <p className="text-xs text-slate-600 mt-1">
              Pair with peers for structured 40-minute bilingual sessions (English & Kinyarwanda) and study circles.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 mt-4 flex items-center space-x-1">
            <span>Find Study Partner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/challenges"
          className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Employer Challenges</h3>
            <p className="text-xs text-slate-600 mt-1">
              Solve real problem briefs posted by Rwandan cooperatives, tech startups, and tourism operators.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 mt-4 flex items-center space-x-1">
            <span>Browse Challenges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </section>
    </div>
  );
}
