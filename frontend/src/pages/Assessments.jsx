import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2, ArrowRight, Lock, BookOpen } from 'lucide-react';

export const Assessments = ({ user, onOpenAuth, setCurrentTab }) => {
  const [assessments, setAssessments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/assessments').then(res => res.json()),
      user ? fetch(`/api/enrollments?userId=${user.id}`).then(res => res.json()) : Promise.resolve([])
    ])
      .then(([assData, enData]) => {
        setAssessments(assData);
        setEnrollments(enData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign In Required for Assessments</h2>
        <p className="text-xs text-slate-600">Please sign in with your account or demo learner to access assessments for your enrolled courses.</p>
        <button
          onClick={onOpenAuth}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition shadow"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const userAssessments = assessments.filter(a => enrolledCourseIds.includes(a.courseId));

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Enrolled Course Assessments</h1>
        <p className="text-slate-600 text-sm mt-1">Demonstrate competency through assessments for courses you are currently enrolled in.</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading your course assessments...</div>
      ) : userAssessments.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Enrolled Course Assessments Found</h3>
          <p className="text-xs text-slate-600">You must enroll in at least one course before you can take its assessments.</p>
          <button
            onClick={() => setCurrentTab('courses')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition shadow"
          >
            Browse Courses & Enroll
          </button>
        </div>
      ) : selectedAssessment ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs uppercase font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{selectedAssessment.category}</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">{selectedAssessment.title}</h2>
            </div>
            <button onClick={() => { setSelectedAssessment(null); setSubmitted(false); }} className="text-sm font-semibold text-slate-500 hover:text-slate-900">
              ← Back to Assessments
            </button>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-900">Assessment Submitted Successfully!</h3>
              <p className="text-sm text-emerald-700">Your score has been recorded: <span className="font-bold">88 / 100 (Level 2 Practitioner)</span>.</p>
              <button onClick={() => { setSelectedAssessment(null); setSubmitted(false); }} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition">
                Return to Assessments
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-sm">
                <div className="font-bold text-slate-900">Instructions:</div>
                <p className="text-slate-600">Answer the diagnostic questions and submit your practical solution. Weight: {selectedAssessment.weight}.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-900">Question 1: Explain the primary benefit of normalized database relationships.</label>
                  <textarea rows={3} placeholder="Type your technical response here..." className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
                </div>
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow transition"
              >
                Submit Assessment for Verification
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userAssessments.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{item.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">{item.title}</h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.duration}</span>
                  <span>📝 {item.questionsCount} Questions</span>
                </div>
                <p className="mt-3 text-xs text-slate-600 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">{item.weight}</p>
              </div>
              <button
                onClick={() => setSelectedAssessment(item)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition shadow flex items-center justify-center gap-2"
              >
                Start Assessment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
