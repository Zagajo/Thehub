import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  Code,
  FileCheck,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { api } from '../services/api.js';

export default function Assessments({ user, onAssessmentComplete }) {
  const [assessments, setAssessments] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [theoryAnswers, setTheoryAnswers] = useState({});
  const [practicalCompleted, setPracticalCompleted] = useState(false);
  const [capstoneSubmitted, setCapstoneSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchAssessments() {
      try {
        const res = await api.getAssessments();
        if (res.success) {
          setAssessments(res.data);
          setActiveAssessment(res.data[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAssessments();
  }, []);

  const handleSelectOption = (qIdx, optIdx) => {
    setTheoryAnswers({ ...theoryAnswers, [qIdx]: optIdx });
  };

  const handleSubmit = async () => {
    if (!activeAssessment) return;
    setSubmitting(true);
    try {
      const answersArray = activeAssessment.theoryQuestions.map((_, i) => theoryAnswers[i]);
      const res = await api.submitAssessment(activeAssessment.id, {
        theoryAnswers: answersArray,
        practicalCompleted,
        capstoneSubmitted
      });
      if (res.success) {
        setSubmissionResult(res.scoreBreakdown);
        if (onAssessmentComplete) onAssessmentComplete(res.user);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>Tri-Part Competency Model</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Practical Skill Assessments
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Multi-vector evaluation evaluating Theory (30%), Practical Task (40%), and Capstone Project Evidence (30%). Proven performance unlocks certified badges on your Skill Passport.
          </p>
        </div>

        {/* Assessment selector tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          {assessments.map((as) => (
            <button
              key={as.id}
              onClick={() => {
                setActiveAssessment(as);
                setSubmissionResult(null);
                setTheoryAnswers({});
                setPracticalCompleted(false);
                setCapstoneSubmitted(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeAssessment?.id === as.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {as.title}
            </button>
          ))}
        </div>
      </div>

      {activeAssessment && !submissionResult && (
        <div className="space-y-6">
          {/* Section 1: Theory Questions (30%) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Part 1 of 3: Theory & Concepts (30% Weight)
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Domain Knowledge & Statistical Understanding
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">
                {activeAssessment.theoryQuestions.length} Questions
              </span>
            </div>

            <div className="space-y-6">
              {activeAssessment.theoryQuestions.map((q, qIdx) => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {qIdx + 1}. {q.prompt}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const selected = theoryAnswers[qIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`text-left p-3 rounded-xl text-xs font-medium transition border flex items-center justify-between ${
                            selected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-bold'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <span>{opt}</span>
                          {selected && <Check className="w-4 h-4 ml-2 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Practical Task (40%) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Part 2 of 3: Practical Timed Task (40% Weight)
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Hands-On Code / Query Challenge
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeAssessment.practicalTask.instruction}
            </p>

            <div className="bg-slate-950 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800">
              <pre>{activeAssessment.practicalTask.starterCode}</pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 font-mono">
                Expected snippet output: {activeAssessment.practicalTask.expectedOutputSnippet}
              </span>

              <button
                onClick={() => setPracticalCompleted(!practicalCompleted)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  practicalCompleted
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{practicalCompleted ? 'Task Verified' : 'Verify Code Output'}</span>
              </button>
            </div>
          </div>

          {/* Section 3: Capstone Brief Evidence (30%) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Part 3 of 3: Capstone Evidence Artifact (30% Weight)
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                Demonstrated Portfolio Submission
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeAssessment.capstoneBrief}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <input
                type="text"
                placeholder="https://github.com/your-username/rwanda-analysis-project"
                defaultValue="https://github.com/kezia-umutoni/nisr-district-metrics"
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <button
                onClick={() => setCapstoneSubmitted(true)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  capstoneSubmitted ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {capstoneSubmitted ? 'Evidence Attached' : 'Attach Link'}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>{submitting ? 'Evaluating Submission...' : 'Submit Tri-Part Assessment for Verification'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Result Card */}
      {submissionResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl space-y-6 animate-in fade-in zoom-in-95">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Award className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              {submissionResult.verifiedLevel} Achieved
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Assessment Successfully Verified!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your scores have been registered and added to your Skill Passport with cryptographic verification.
            </p>
          </div>

          {/* Tri-Part breakdown */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto text-center font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Theory (30%)</span>
              <span className="text-base font-bold text-slate-800">{submissionResult.theoryScore}%</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Practical (40%)</span>
              <span className="text-base font-bold text-slate-800">{submissionResult.practicalScore}%</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Project (30%)</span>
              <span className="text-base font-bold text-slate-800">{submissionResult.projectScore}%</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-4xl font-black text-slate-900">
              {submissionResult.compositeScore}%
            </span>
            <span className="text-xs text-slate-500 block mt-1">Weighted Composite Mastery</span>
          </div>

          <div className="flex justify-center space-x-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setSubmissionResult(null)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
            >
              Take Another Test
            </button>
            <a
              href="/skill-passport"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
            >
              View Updated Skill Passport
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
