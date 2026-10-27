import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api.js';

export default function LearningPaths({ user, onOpenAuth }) {
  const [paths, setPaths] = useState([]);
  const [activePathId, setActivePathId] = useState('path-1');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const pRes = await api.getLearningPaths();
        if (pRes && pRes.data) {
          setPaths(pRes.data);
        }
        const gapRes = await api.analyzeSkillGaps(user?.assessedSkills || [], activePathId);
        if (gapRes && gapRes.data) {
          setAnalysis(gapRes.data);
        }
      } catch (e) {
        console.error('Error loading pathways:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activePathId, user]);

  const activePath = paths.find(p => p.id === activePathId) || paths[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
      {/* IBM Carbon Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">National Competency Pathways</span>
      </nav>

      {/* Enterprise Header */}
      <div className="bg-white border border-slate-200 p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-blue-700 font-mono tracking-wider uppercase font-semibold">
              <Layers className="w-4 h-4" />
              <span>Structured Career Pathways</span>
              <span aria-hidden="true">·</span>
              <span>Rwanda NST1 Aligned</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Data-Informed <span className="font-bold">Learning Pathways</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Deterministic career tracks engineered around verified Rwandan labour market demand. Each pathway outlines required competencies, target scores, and practical capstone evidence.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Link
              to="/assessments"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>Take Diagnostic</span>
            </Link>
          </div>
        </div>

        {/* IBM Carbon Styled Pathway Tabs */}
        <div className="flex flex-wrap gap-1 pt-2">
          {paths.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePathId(p.id)}
              className={`px-5 py-3 text-xs font-medium transition-all flex items-center space-x-2 border-b-2 ${
                activePathId === p.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="whitespace-nowrap">{p.role}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center bg-white border border-slate-200">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">
            Loading Competency Metrics...
          </div>
        </div>
      ) : activePath && analysis ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Pathway Overview (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 p-8 space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <div className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
                  Target Competency Role
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{activePath.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1 font-mono">
                  <span>Sector: {activePath.targetSector}</span>
                  <span aria-hidden="true">·</span>
                  <span>Duration: {activePath.estimatedDuration}</span>
                  <span aria-hidden="true">·</span>
                  <span>Capstones: 1 Evaluated Project</span>
                </div>
              </div>

              {/* NISR Labour Evidence Box */}
              <div className="p-5 bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Rwanda NISR Labour Market Evidence</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {activePath.nisrEvidence}
                </p>
              </div>

              {/* Deterministic Skill Gap Table */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Required Competency Profile vs Your Current Standing
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Benchmark: 80 pts</span>
                </div>

                <div className="space-y-3">
                  {analysis.gapBreakdown.map((item, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-900">{item.skillName}</span>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-0.5 text-[11px] font-mono font-semibold border ${
                            item.priority === 'Critical Gap'
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : item.priority === 'Moderate Gap'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}>
                            {item.priority}
                          </span>
                          <span className="text-slate-600 font-mono tabular-nums">
                            {item.currentScore} / {item.requiredScore} pts
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-100 h-2 flex overflow-hidden">
                        <div
                          className="bg-blue-600 h-2 transition-all duration-300"
                          style={{ width: `${Math.min(100, (item.currentScore / item.requiredScore) * 100)}%` }}
                        ></div>
                        {item.gap > 0 && (
                          <div
                            className="bg-rose-300 h-2"
                            style={{ width: `${Math.min(100, (item.gap / item.requiredScore) * 100)}%` }}
                          ></div>
                        )}
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-500 pt-1 font-mono">
                        <span>Current standing</span>
                        <span>{item.gap > 0 ? `${item.gap} pts needed to meet target` : 'Verified proficiency standard met'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capstone Brief */}
              <div className="p-6 bg-slate-900 text-white space-y-3 border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-amber-400 block">
                  Capstone Evidence Project Requirement
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {activePath.capstoneBrief}
                </p>
                <div className="pt-2">
                  <Link
                    to="/assessments"
                    className="inline-flex items-center space-x-2 text-xs text-blue-400 hover:text-blue-300 font-semibold tracking-wider uppercase transition-colors"
                  >
                    <span>Submit Portfolio Evidence in Assessments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Readiness Summary & Next Actions */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Pathway Readiness
              </div>

              <div className="text-center p-6 bg-slate-50 border border-slate-200">
                <div className="text-5xl font-light text-slate-900 font-mono tabular-nums">
                  {analysis.overallReadinessPercentage}%
                </div>
                <span className="text-xs text-slate-500 mt-1 block font-mono">Role Benchmark Readiness</span>
                <div className="w-full bg-slate-200 h-2 mt-4 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 transition-all duration-500"
                    style={{ width: `${analysis.overallReadinessPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Targeted Skill Remediations
                </h4>
                {analysis.recommendedCourses?.map((course) => (
                  <div key={course.id} className="p-4 bg-slate-50 border border-slate-200 text-xs space-y-2 hover:border-blue-600 transition-colors">
                    <span className="font-bold text-slate-900 block">{course.title}</span>
                    <p className="text-slate-600 line-clamp-2 leading-relaxed">{course.tagline}</p>
                    <Link
                      to={`/courses`}
                      className="inline-flex items-center space-x-1.5 font-semibold text-blue-600 hover:text-blue-800 uppercase tracking-wider text-[11px] font-mono pt-1"
                    >
                      <span>Explore Course Modules</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>

              <Link
                to="/assessments"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>Take Benchmark Assessment</span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
