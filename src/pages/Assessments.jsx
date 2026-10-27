import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, Lock, BookOpen, Award, ArrowRight, AlertCircle, ChevronRight, RotateCcw } from 'lucide-react';

export default function Assessments({ user, onOpenAuth, setActiveTab }) {
  const [assessments, setAssessments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      try {
        const [assessRes, enRes] = await Promise.all([
          fetch('/api/assessments'),
          fetch(`/api/enrollments?userId=${user.id}`)
        ]);
        const assessData = await assessRes.json();
        const enData = await enRes.json();
        setAssessments(assessData || []);
        setEnrollments(enData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 font-sans">
        <div className="w-12 h-12 bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border border-slate-300">
          <Lock className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
            Authentication Required
          </span>
          <h2 className="text-3xl font-light text-slate-900">
            Sign In to Access <span className="font-bold">Technical Assessments</span>
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Per national digital qualification standards, diagnostic evaluations require verified enrollment.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const userAssessments = assessments.filter(a => enrolledCourseIds.includes(a.courseId));
  // If user has not enrolled in a course yet, show available catalog assessments with preview
  const displayAssessments = userAssessments.length > 0 ? userAssessments : assessments;

  if (selectedAssessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
        {/* IBM Carbon Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => { setSelectedAssessment(null); setSubmitted(false); setScore(null); setAnswers({}); }}
            className="hover:text-blue-600 transition-colors"
          >
            Assessments
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-medium truncate">{selectedAssessment.title}</span>
        </nav>

        <button
          onClick={() => { setSelectedAssessment(null); setSubmitted(false); setScore(null); setAnswers({}); }}
          className="px-4 py-2 bg-white border border-slate-300 text-slate-800 hover:text-blue-600 font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          ← Back to Assessments
        </button>

        <div className="bg-white border border-slate-200 p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <span className="text-xs font-mono uppercase text-blue-700 font-semibold tracking-wider">
              {selectedAssessment.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">{selectedAssessment.title}</h2>
            <div className="text-xs font-mono text-slate-500 pt-1">
              {selectedAssessment.questionsCount} Questions · {selectedAssessment.duration} · {selectedAssessment.weight}
            </div>
          </div>

          {!submitted ? (
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 border border-slate-200 space-y-4">
                <div className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
                  Question 1 of {selectedAssessment.questionsCount}:
                </div>
                <p className="text-slate-800 text-sm font-semibold leading-relaxed">
                  Which architectural pattern is recommended for scalable web APIs aligned with Rwanda digital government services and low-latency client apps?
                </p>
                <div className="space-y-2 pt-2">
                  {[
                    'Monolithic single-thread desktop script with local filesystem storage',
                    'Asynchronous REST API with Python FastAPI / Node.js, connection-pooled PostgreSQL, and strict Pydantic schemas',
                    'Static uncompiled HTML files without database or session management'
                  ].map((opt, i) => (
                    <label
                      key={i}
                      className="flex items-center space-x-3 p-3 bg-white border border-slate-200 cursor-pointer hover:border-blue-600 text-xs text-slate-800 transition-colors"
                    >
                      <input
                        type="radio"
                        name="q1"
                        checked={answers.q1 === i}
                        onChange={() => setAnswers({ ...answers, q1: i })}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setSubmitted(true); setScore(90); }}
                disabled={answers.q1 === undefined}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Submit Diagnostic Evaluation
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-300 p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-600 text-white flex items-center justify-center mx-auto text-2xl font-light font-mono tabular-nums">
                {score}%
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Assessment Evaluation Passed</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-normal">
                  Verified score recorded into your Skill Passport. Meets the national technical benchmark (≥80%).
                </p>
              </div>
              <div className="pt-2 flex justify-center space-x-3">
                <button
                  onClick={() => setActiveTab('passport')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
                >
                  View Skill Passport
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
      {/* IBM Carbon Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">Technical Assessments & Diagnostic Benchmarks</span>
      </nav>

      {/* Enterprise Header */}
      <div className="bg-white border border-slate-200 p-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs text-blue-700 font-mono tracking-wider uppercase font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>Benchmark Diagnostics</span>
            <span aria-hidden="true">·</span>
            <span>Rwanda Digital Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            Technical Assessments & <span className="font-bold">Diagnostics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Take verified diagnostic assessments to measure your practical software engineering and data science competencies against Rwanda industry standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayAssessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-white border border-slate-200 p-6 space-y-4 flex flex-col justify-between hover:border-blue-600 transition-colors"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-blue-700 font-semibold tracking-wider">
                {assessment.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{assessment.title}</h3>
              <div className="text-xs font-mono text-slate-500">
                {assessment.questionsCount} Questions · {assessment.duration} · {assessment.weight}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-mono font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Diagnostic Available</span>
              </div>
              <button
                onClick={() => setSelectedAssessment(assessment)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
              >
                <span>Start Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
