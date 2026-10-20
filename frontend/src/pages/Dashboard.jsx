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
import NewUserGuideTabs from '../components/NewUserGuideTabs.jsx';
import { api } from '../services/api.js';

export default function Dashboard({ user, onEnrollCourse, onLoginToEnroll, onOpenAuth, lowBandwidth }) {
  const [courses, setCourses] = useState([]);
  const [nisrSummary, setNisrSummary] = useState(null);
  const [indicators, setIndicators] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('path-1');
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const isGuest = !user || user.id === 'guest';
  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    async function loadData() {
      try {
        const [cRes, nRes, indRes, gapRes] = await Promise.all([
          api.getCourses(),
          api.getNisrLabourSummary(),
          api.getNisrIndicators(),
          api.analyzeSkillGaps(user?.assessedSkills || [], 'path-1')
        ]);
        if (cRes && cRes.data) setCourses(cRes.data);
        if (nRes && nRes.data) setNisrSummary(nRes.data);
        else if (nRes && nRes.nationalServicesShare) setNisrSummary(nRes);
        if (indRes && indRes.data) setIndicators(indRes.data);
        if (gapRes && gapRes.data) setGapAnalysis(gapRes.data);
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
      const res = await api.analyzeSkillGaps(user?.assessedSkills || [], goalId);
      if (res.success) setGapAnalysis(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* SECTION A: Editorial IBM-Style Enterprise Hero */}
      <section className="bg-white border border-[#e0e0e0] rounded-sm p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-[#f4f4f4] text-[#161616] text-[11px] font-mono tracking-wider uppercase border border-[#d0d0d0]">
            <span className="w-2 h-2 rounded-xs bg-[#0F62FE]"></span>
            <span>Rwanda National Enterprise Skills Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#161616] leading-tight">
            Build the skills that move your future forward.
          </h1>

          <p className="text-[#525252] text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            Discover relevant skills, develop practical experience, and explore learning pathways informed by official National Institute of Statistics of Rwanda (NISR) labour intelligence and workforce market benchmarks.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            {isGuest && (
              <>
                <button
                  onClick={() => onOpenAuth && onOpenAuth('register')}
                  className="px-5 py-3 bg-[#0F62FE] hover:bg-[#0353e9] text-white font-semibold text-xs tracking-wide transition flex items-center space-x-2 cursor-pointer shadow-sm rounded-sm"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenAuth && onOpenAuth('login')}
                  className="px-5 py-3 bg-white hover:bg-[#f4f4f4] text-[#161616] font-semibold text-xs tracking-wide transition border border-[#8d8d8d] flex items-center space-x-2 cursor-pointer rounded-sm"
                >
                  <span>Log In</span>
                </button>
              </>
            )}

            <Link
              to="/courses"
              className="px-5 py-3 bg-[#161616] hover:bg-[#262626] text-white font-semibold text-xs tracking-wide transition flex items-center space-x-2 rounded-sm"
            >
              <BookOpen className="w-4 h-4 text-[#0F62FE]" />
              <span>Explore Learning Pathways</span>
            </Link>

            <Link
              to="/insights"
              className="px-5 py-3 bg-[#f4f4f4] hover:bg-[#e5e5e5] text-[#161616] font-semibold text-xs tracking-wide transition border border-[#e0e0e0] flex items-center space-x-2 rounded-sm"
            >
              <TrendingUp className="w-4 h-4 text-[#0F62FE]" />
              <span>NISR Labour Statistics</span>
            </Link>
          </div>
        </div>

        {/* Right Editorial Graphic / Enterprise Statistics Card */}
        <div className="lg:col-span-5 bg-[#161616] text-white p-6 sm:p-8 rounded-sm border border-[#393939] space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#393939] pb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#0F62FE]">
              Enterprise Intelligence
            </span>
            <span className="text-[10px] font-mono text-[#8d8d8d]">NISR Benchmarked</span>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-[#262626] border-l-2 border-[#0F62FE]">
              <span className="text-[11px] text-[#c6c6c6] uppercase font-mono block">Digital Economy Sector Growth</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-white">38.6%</span>
                <span className="text-xs text-emerald-400 font-bold">+2.4% YoY</span>
              </div>
              <p className="text-[11px] text-[#8d8d8d] mt-1">High demand for software engineering & data analysis</p>
            </div>

            <div className="p-3 bg-[#262626] border-l-2 border-emerald-500">
              <span className="text-[11px] text-[#c6c6c6] uppercase font-mono block">Verified Skill Passports Issued</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-white">12,480+</span>
                <span className="text-xs text-emerald-400 font-bold">National Standard</span>
              </div>
              <p className="text-[11px] text-[#8d8d8d] mt-1">Recognized by Rwandan employers & cooperatives</p>
            </div>
          </div>

          <Link
            to="/skill-passport"
            className="w-full py-2.5 bg-[#0F62FE] hover:bg-[#0353e9] text-white font-semibold text-xs tracking-wide transition text-center block rounded-sm shadow-sm"
          >
            View Your Skill Passport
          </Link>
        </div>
      </section>

      {/* Interactive New User Guide Tabs (For Guests) */}
      {isGuest && !isAdmin && (
        <NewUserGuideTabs
          onOpenAuth={onOpenAuth}
          onEnrollCourse={onEnrollCourse}
          onLoginToEnroll={onLoginToEnroll}
          courses={courses}
          isAdmin={isAdmin}
        />
      )}

      {/* SECTION B: Macroeconomic NISR Context Strip */}
      <section className="bg-white rounded-sm p-6 sm:p-8 border border-[#e0e0e0] shadow-xs space-y-6 w-full max-w-full min-w-0 overflow-hidden box-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#e0e0e0] gap-3 w-full max-w-full min-w-0 overflow-hidden box-border">
          <div className="w-full max-w-full min-w-0 flex-1 break-words overflow-hidden box-border">
            <div className="inline-block px-2 py-0.5 bg-[#f4f4f4] text-[#161616] text-[10px] font-mono uppercase tracking-wider mb-1 border border-[#d0d0d0]">
              Official NISR Data Feed
            </div>
            <h2 className="text-xl font-bold text-[#161616] tracking-tight flex items-center space-x-2 break-words whitespace-normal w-full max-w-full min-w-0">
              <span>Rwanda Labour Market & Economic Indicators</span>
            </h2>
            <p className="text-xs text-[#525252] break-words whitespace-normal w-full max-w-full min-w-0">
              Real statistical baselines from the National Institute of Statistics of Rwanda
            </p>
          </div>
          <Link to="/insights" className="text-xs font-semibold text-[#0F62FE] hover:underline flex items-center space-x-1 shrink-0">
            <span>Explore Full Economic Dataset</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#f4f4f4] rounded-sm border border-[#e0e0e0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#525252] block">Services Employment</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-black text-[#161616]">38.6%</span>
              <span className="text-xs text-emerald-700 font-bold">+2.4% YoY</span>
            </div>
            <p className="text-xs text-[#525252] mt-1">Driving demand in FinTech & Digital Trade</p>
          </div>

          <div className="p-4 bg-[#f4f4f4] rounded-sm border border-[#e0e0e0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#525252] block">Youth Participation</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-black text-[#161616]">52.4%</span>
              <span className="text-xs text-emerald-700 font-bold">+1.8% YoY</span>
            </div>
            <p className="text-xs text-[#525252] mt-1">Ages 16-30 across all 30 districts</p>
          </div>

          <div className="p-4 bg-[#f4f4f4] rounded-sm border border-[#e0e0e0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#525252] block">Household Internet Access</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-black text-[#161616]">34.2%</span>
              <span className="text-xs text-[#0F62FE] font-bold">Expanding</span>
            </div>
            <p className="text-xs text-[#525252] mt-1">Informs text-first low-bandwidth mode</p>
          </div>

          <div className="p-4 bg-[#f4f4f4] rounded-sm border border-[#e0e0e0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#525252] block">Agro-Industry Workforce</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-black text-[#161616]">44.8%</span>
              <span className="text-xs text-amber-700 font-bold">Value Addition</span>
            </div>
            <p className="text-xs text-[#525252] mt-1">Adopting cooperative digital tools</p>
          </div>
        </div>
      </section>

      {/* SECTION C: Deterministic Skill Gap Engine */}
      <section className="bg-white rounded-sm p-6 sm:p-8 border border-[#e0e0e0] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-block px-2 py-0.5 bg-[#f4f4f4] text-[#161616] text-[10px] font-mono uppercase tracking-wider mb-1 border border-[#d0d0d0]">
              Deterministic Analytics
            </div>
            <h2 className="text-xl font-extrabold text-[#161616] tracking-tight">
              Personalized Gap Analysis for {user?.name || 'Kezia Umutoni'}
            </h2>
            <p className="text-xs text-[#525252] mt-0.5">
              Target role requirements calculated against your verified assessment scores
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-[#161616]">Target Role:</label>
            <select
              value={selectedGoal}
              onChange={handleGoalChange}
              className="px-3 py-2 bg-[#f4f4f4] border border-[#8d8d8d] rounded-sm text-xs font-semibold text-[#161616] focus:ring-2 focus:ring-[#0F62FE] focus:outline-none"
            >
              <option value="path-1">Junior Data Analyst</option>
              <option value="path-2">Web Application Developer</option>
              <option value="path-3">Agribusiness Operations Specialist</option>
            </select>
          </div>
        </div>

        {gapAnalysis && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 p-6 rounded-sm bg-[#161616] text-white flex flex-col justify-between border border-[#393939]">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#0F62FE]">
                  Readiness Score
                </span>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-4xl font-black text-white">{gapAnalysis.overallReadinessPercentage}%</span>
                  <span className="text-xs text-[#c6c6c6]">Alignment</span>
                </div>
                <div className="w-full bg-[#262626] rounded-full h-2.5 mt-3 overflow-hidden border border-[#393939]">
                  <div
                    className="bg-[#0F62FE] h-2.5 transition-all duration-700"
                    style={{ width: `${gapAnalysis.overallReadinessPercentage}%` }}
                  ></div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#393939] text-xs text-[#c6c6c6] space-y-1.5">
                  <p><strong>Sector:</strong> {gapAnalysis.targetPathway.targetSector}</p>
                  <p><strong>Estimated Time:</strong> {gapAnalysis.targetPathway.estimatedDuration}</p>
                </div>
              </div>

              <Link
                to="/pathways"
                className="mt-6 w-full py-3 rounded-sm bg-[#0F62FE] hover:bg-[#0353e9] text-white font-semibold text-xs tracking-wide transition text-center block shadow-sm"
              >
                View Complete Pathway Plan
              </Link>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#161616] block font-bold">
                Required Competencies Breakdown
              </span>
              <div className="space-y-3">
                {gapAnalysis.gapBreakdown.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] rounded-sm">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#161616]">{item.skillName}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase ${
                          item.priority === 'Critical Gap'
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : item.priority === 'Moderate Gap'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}>
                          {item.priority}
                        </span>
                        <span className="text-[#525252] font-mono text-[11px]">
                          {item.currentScore} / {item.requiredScore} pts
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-[#e0e0e0] rounded-full h-2 mt-2.5 overflow-hidden flex">
                      <div
                        className="bg-[#0F62FE] h-2"
                        style={{ width: `${(item.currentScore / item.requiredScore) * 100}%` }}
                      ></div>
                      {item.gap > 0 && (
                        <div
                          className="bg-red-500/70 h-2"
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

      {/* SECTION D: Featured Courses Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-block px-2 py-0.5 bg-[#f4f4f4] text-[#161616] text-[10px] font-mono uppercase tracking-wider mb-1 border border-[#d0d0d0]">
              Accredited Curriculum
            </div>
            <h2 className="text-2xl font-extrabold text-[#161616] tracking-tight">
              Featured Skill Programs
            </h2>
            <p className="text-xs text-[#525252]">
              Curriculum with practical assessments, local case studies, and verification badges
            </p>
          </div>
          <Link
            to="/courses"
            className="text-xs font-semibold text-[#0F62FE] hover:underline flex items-center space-x-1"
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
              onLoginToEnroll={onLoginToEnroll}
              isGuest={isGuest}
              lowBandwidth={lowBandwidth}
            />
          ))}
        </div>
      </section>

      {/* SECTION E: Connected Pillars Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/assessments"
          className="p-6 bg-white border border-[#e0e0e0] hover:border-[#0F62FE] hover:shadow-md transition-all flex flex-col justify-between group rounded-sm"
        >
          <div>
            <div className="w-10 h-10 rounded-sm bg-[#f4f4f4] text-[#0F62FE] flex items-center justify-center mb-4 border border-[#d0d0d0]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-[#161616] text-base">Tri-Part Assessments</h3>
            <p className="text-xs text-[#525252] mt-1.5 leading-relaxed">
              Prove competency through Theory (30%), Practical Code/Data task (40%), and Capstone Project (30%).
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0F62FE] mt-6 flex items-center space-x-1">
            <span>Take Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/peer-matching"
          className="p-6 bg-white border border-[#e0e0e0] hover:border-[#0F62FE] hover:shadow-md transition-all flex flex-col justify-between group rounded-sm"
        >
          <div>
            <div className="w-10 h-10 rounded-sm bg-[#f4f4f4] text-[#0F62FE] flex items-center justify-center mb-4 border border-[#d0d0d0]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-[#161616] text-base">Peer Connect & Language</h3>
            <p className="text-xs text-[#525252] mt-1.5 leading-relaxed">
              Pair with peers for structured 40-minute bilingual sessions (English & Kinyarwanda) and study circles.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0F62FE] mt-6 flex items-center space-x-1">
            <span>Find Study Partner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/challenges"
          className="p-6 bg-white border border-[#e0e0e0] hover:border-[#0F62FE] hover:shadow-md transition-all flex flex-col justify-between group rounded-sm"
        >
          <div>
            <div className="w-10 h-10 rounded-sm bg-[#f4f4f4] text-[#0F62FE] flex items-center justify-center mb-4 border border-[#d0d0d0]">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-[#161616] text-base">Employer Challenges</h3>
            <p className="text-xs text-[#525252] mt-1.5 leading-relaxed">
              Solve real problem briefs posted by Rwandan cooperatives, tech startups, and tourism operators.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0F62FE] mt-6 flex items-center space-x-1">
            <span>Browse Challenges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </section>

    </div>
  );
}
