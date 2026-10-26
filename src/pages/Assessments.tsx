import React, { useEffect, useState } from 'react';
import { Layers, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const Assessments: React.FC = () => {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/assessments')
      .then(res => res.json())
      .then(data => setAssessments(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-3xl font-extrabold text-navy-900">Tri-Part Weighted Assessments</h1>
        <p className="text-slate-600 text-sm mt-1">Demonstrate competency through theory, practical code challenges, and capstone project evidence.</p>
      </div>

      {selectedAssessment ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs uppercase font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{selectedAssessment.category}</span>
              <h2 className="text-2xl font-bold text-navy-900 mt-2">{selectedAssessment.title}</h2>
            </div>
            <button onClick={() => { setSelectedAssessment(null); setSubmitted(false); }} className="text-sm font-semibold text-slate-500 hover:text-navy-900">
              ← Back to Assessments
            </button>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-900">Assessment Submitted Successfully!</h3>
              <p className="text-sm text-emerald-700">Your score has been recorded: <span className="font-bold">88 / 100 (Level 2 Practitioner)</span>. Credential added to your Skill Passport.</p>
              <button onClick={() => { setSelectedAssessment(null); setSubmitted(false); }} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition">
                Return to Assessments
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-sm">
                <div className="font-bold text-navy-900">Instructions:</div>
                <p className="text-slate-600">Answer the diagnostic questions and submit your practical solution artifact. Weight: {selectedAssessment.weight}.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy-900">Question 1: Explain the primary benefit of normalized database relationships in high-throughput web applications.</label>
                  <textarea rows={3} placeholder="Type your technical response here..." className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy-900">Question 2: Write a secure SQL query or Python snippet to aggregate employment share data.</label>
                  <textarea rows={3} placeholder="Write code snippet here..." className="w-full p-3 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
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
          {assessments.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{item.category}</span>
                <h3 className="text-lg font-bold text-navy-900 mt-3">{item.title}</h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.duration}</span>
                  <span>📝 {item.questionsCount} Questions</span>
                </div>
                <p className="mt-3 text-xs text-slate-600 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">{item.weight}</p>
              </div>
              <button
                onClick={() => setSelectedAssessment(item)}
                className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition shadow flex items-center justify-center gap-2"
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
