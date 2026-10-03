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
  Layers
} from 'lucide-react';
import { api } from '../services/api.js';

export default function LearningPaths({ user, onEnrollCourse }) {
  const [paths, setPaths] = useState([]);
  const [activePathId, setActivePathId] = useState('path-1');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const pRes = await api.getLearningPaths();
        if (pRes.success) {
          setPaths(pRes.data);
        }
        const gapRes = await api.analyzeSkillGaps(user?.assessedSkills, activePathId);
        if (gapRes.success) {
          setAnalysis(gapRes.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activePathId, user]);

  const activePath = paths.find(p => p.id === activePathId) || paths[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Structured Career Pathways</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Data-Informed Learning Pathways
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Deterministic career tracks engineered around verified Rwandan labour market demand. Each pathway outlines required competencies, target scores, and practical capstone evidence.
          </p>
        </div>

        {/* Pathway Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          {paths.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePathId(p.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activePathId === p.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{p.role}</span>
            </button>
          ))}
        </div>
      </div>

      {activePath && analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Pathway Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Target Role
                </span>
                <h2 className="text-2xl font-black text-slate-900">{activePath.title}</h2>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                    Sector: {activePath.targetSector}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">
                    Duration: {activePath.estimatedDuration}
                  </span>
                </div>
              </div>

              {/* NISR Labour Evidence Box */}
              <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-900">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Rwanda NISR Labour Market Evidence</span>
                </div>
                <p className="text-xs text-blue-950/80 leading-relaxed">
                  {activePath.nisrEvidence}
                </p>
              </div>

              {/* Deterministic Skill Gap Table */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Required Competency Profile vs Your Current Standing
                </h3>

                <div className="space-y-3">
                  {analysis.gapBreakdown.map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-900">{item.skillName}</span>
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
                          <span className="text-slate-500 font-mono">
                            {item.currentScore} / {item.requiredScore} pts
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden flex">
                        <div
                          className="bg-blue-600 h-2.5 rounded-l-full"
                          style={{ width: `${(item.currentScore / item.requiredScore) * 100}%` }}
                        ></div>
                        {item.gap > 0 && (
                          <div
                            className="bg-red-400 h-2.5"
                            style={{ width: `${(item.gap / item.requiredScore) * 100}%` }}
                          ></div>
                        )}
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                        <span>Current Assessed Score</span>
                        <span>{item.gap > 0 ? `${item.gap} pts required to satisfy benchmark` : 'Benchmark fully met'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capstone Brief */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2 border border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Capstone Evidence Project Requirement
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePath.capstoneBrief}
                </p>
                <div className="pt-2">
                  <Link
                    to="/assessments"
                    className="inline-flex items-center space-x-1.5 text-xs text-blue-400 font-bold hover:underline"
                  >
                    <span>Submit portfolio evidence in Assessments module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Readiness Summary & Next Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Pathway Readiness
              </span>

              <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-5xl font-black text-slate-900">{analysis.overallReadinessPercentage}%</div>
                <span className="text-xs text-slate-500 mt-1 block">Role Benchmark Readiness</span>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-4 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${analysis.overallReadinessPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Targeted Skill Remediations
                </h4>
                {analysis.recommendedCourses?.map((course) => (
                  <div key={course.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                    <span className="font-bold text-slate-800 block">{course.title}</span>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{course.tagline}</p>
                    <Link
                      to={`/courses/${course.slug}`}
                      className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
                    >
                      <span>Start Course</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>

              <Link
                to="/assessments"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>Take Tri-Part Benchmark Assessment</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
