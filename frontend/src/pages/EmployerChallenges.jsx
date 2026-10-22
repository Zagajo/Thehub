import React, { useState, useEffect } from 'react';
import { Briefcase, Building, Clock, Award, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api.js';

export default function EmployerChallenges({ user }) {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getChallenges();
        if (res.success) {
          setChallenges(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleApply = (id) => {
    if (!submittedTasks.includes(id)) {
      setSubmittedTasks([...submittedTasks, id]);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Real-World Industry Opportunity</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Employer Challenges & Micro-Internships
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Put your verified Skill Passport into action. Rwandan cooperatives, tech startups, and tourism operators post concrete project briefs for talent discovery, paid micro-grants, and apprenticeships.
          </p>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((ch) => {
          const applied = submittedTasks.includes(ch.id);
          return (
            <div key={ch.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-lg transition">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {ch.type}
                  </span>
                  <span className="text-slate-500 font-mono flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{ch.deadline}</span>
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base mt-3 leading-snug">
                  {ch.title}
                </h3>

                <p className="text-xs font-semibold text-slate-600 mt-1 flex items-center space-x-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ch.company}</span>
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {ch.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Skills Required:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {ch.skillsRequired?.map((sk, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700">
                  {ch.bounty}
                </span>

                <button
                  onClick={() => handleApply(ch.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    applied
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {applied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Task Attached</span>
                    </>
                  ) : (
                    <span>Submit Solution</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
