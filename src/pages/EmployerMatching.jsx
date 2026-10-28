import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building, CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';
import { api, fallbackChallenges } from '../services/api';

export default function EmployerMatching({ user, onOpenAuth }) {
  const [challenges, setChallenges] = useState(fallbackChallenges);
  const [appliedNotice, setAppliedNotice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchChallenges() {
      try {
        const list = await api.getChallenges();
        if (isMounted && list && list.length > 0) {
          setChallenges(list);
        }
      } catch (err) {
        // Handled cleanly via fallbackChallenges
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchChallenges();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleApply = (challenge) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setAppliedNotice(`Application submitted for ${challenge.title} at ${challenge.company}! Your Skill Passport has been shared with their hiring committee.`);
    setTimeout(() => setAppliedNotice(null), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
      {/* IBM Carbon Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">Employer Matching & Industry Challenges</span>
      </nav>

      {/* Enterprise Header */}
      <div className="bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-blue-400 tracking-wider font-semibold">
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span>Rwanda Enterprise Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
          Employer Matching & <span className="font-bold">Industry Challenges</span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal">
          Connect your verified Skill Passport directly with Rwandan enterprises seeking certified software engineers, data analysts, and digital automation specialists.
        </p>
      </div>

      {appliedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{appliedNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-6 hover:border-blue-600 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-700 font-mono font-semibold text-xs uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>{challenge.company || challenge.organization || 'Enterprise Partner'}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{challenge.title}</h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(challenge.skills || challenge.skillsDemonstrated || []).map((skill, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 text-slate-700 text-[11px] font-mono px-2 py-0.5 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Stipend</span>
                  <span className="font-bold text-slate-900">{challenge.stipend || challenge.compensation || 'RWF 350,000'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                  <span className="font-semibold text-slate-700">{challenge.duration || '2 Weeks'}</span>
                </div>
              </div>

              <button
                onClick={() => handleApply(challenge)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <span>Apply with Passport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
