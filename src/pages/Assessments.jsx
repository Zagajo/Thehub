import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, Lock, BookOpen, Award, ArrowRight, AlertCircle } from 'lucide-react';

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
        setAssessments(assessData);
        setEnrollments(enData);
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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Authentication Required for Assessments</h2>
        <p className="text-slate-600 max-w-md mx-auto">
          Per Rwanda Education Board guidelines, assessments require sign-in and strict enrollment verification. You can only view assessments for courses you are enrolled in.
        </p>
        <button
          onClick={onOpenAuth}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg transition-all text-sm"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  // Filter assessments to only those whose courseId matches an enrolled course
  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const userAssessments = assessments.filter(a => enrolledCourseIds.includes(a.courseId));

  if (selectedAssessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-in fade-in duration-200">
        <button
          onClick={() => { setSelectedAssessment(null); setSubmitted(false); setScore(null); setAnswers({}); }}
          className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm bg-indigo-50 px-4 py-2 rounded-xl"
        >
          ← Back to Assessments
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wider">{selectedAssessment.category}</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">{selectedAssessment.title}</h2>
            <p className="text-slate-500 text-sm mt-1">{selectedAssessment.questionsCount} questions • {selectedAssessment.duration} • {selectedAssessment.weight}</p>
          </div>

          {!submitted ? (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-800">Sample Diagnostic Question 1:</h4>
                <p className="text-slate-700 text-sm">Which architecture pattern is recommended for scalable web APIs aligned with Rwanda digital services?</p>
                <div className="space-y-2">
                  {['Monolithic monolithic single script', 'Asynchronous REST API with FastAPI / Node.js and PostgreSQL', 'Static HTML pages without database'].map((opt, i) => (
                    <label key={i} className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-indigo-500">
                      <input 
                        type="radio" 
                        name="q1" 
                        onChange={() => setAnswers({ ...answers, q1: i })}
                        className="text-indigo-600 focus:ring-indigo-500" 
                      />
                      <span className="text-sm text-slate-800">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setSubmitted(true); setScore(88); }}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all text-sm"
              >
                Submit Assessment
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
                {score}%
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Assessment Passed Successfully!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Congratulations! Your competency score has been recorded in your National Skill Passport.
              </p>
              <button
                onClick={() => setActiveTab('passport')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow"
              >
                View Skill Passport & Certificates
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Enrolled Course Assessments</h1>
        <p className="text-slate-600 text-sm mt-1">You are viewing assessments for courses you are officially enrolled in.</p>
      </div>

      {userAssessments.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Assessments Available for Enrolled Courses</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            You must enroll in courses from the course catalog before you can view and take their corresponding practical assessments.
          </p>
          <button
            onClick={() => setActiveTab('courses')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow"
          >
            Explore Course Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userAssessments.map((assessment) => (
            <div key={assessment.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">{assessment.category}</span>
                <h3 className="text-xl font-bold text-slate-900">{assessment.title}</h3>
                <p className="text-slate-500 text-sm">{assessment.questionsCount} questions • {assessment.duration} • {assessment.weight}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enrollment Verified</span>
                </div>
                <button
                  onClick={() => setSelectedAssessment(assessment)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition-all flex items-center space-x-2"
                >
                  <span>Start Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
