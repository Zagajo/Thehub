import React, { useState, useEffect } from 'react';
import { Briefcase, Building, CheckCircle2, ArrowRight } from 'lucide-react';

export default function EmployerMatching({ user, onOpenAuth }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const res = await fetch('/api/challenges');
        const data = await res.json();
        setChallenges(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchChallenges();
  }, []);

  const handleApply = (challenge) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    alert(`Application submitted successfully for ${challenge.title} at ${challenge.company}! Our matching team will review your Skill Passport.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <span className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Rwanda Enterprise Network</span>
        <h1 className="text-3xl sm:text-4xl font-bold">Employer Career & Project Matching</h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Connect your verified Skill Passport directly with Rwandan enterprises seeking software engineers, data analysts, and digital experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>{challenge.company}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{challenge.title}</h3>
              <div className="flex flex-wrap gap-2">
                {challenge.skills.map((skill, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium">{skill}</span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Stipend</span>
                  <span className="font-bold text-emerald-600">{challenge.stipend}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-xs">Duration</span>
                  <span className="font-bold text-slate-800">{challenge.duration}</span>
                </div>
              </div>

              <button
                onClick={() => handleApply(challenge)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow transition-all flex items-center justify-center space-x-2"
              >
                <span>Apply with Skill Passport</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
