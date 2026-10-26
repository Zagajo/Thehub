import React, { useEffect, useState } from 'react';
import { Briefcase, ArrowRight, Award, DollarSign, Clock } from 'lucide-react';

export const EmployerChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/challenges')
      .then(res => res.json())
      .then(data => setChallenges(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-3xl font-extrabold text-navy-900">Employer Challenges & Micro-Internships</h1>
        <p className="text-slate-600 text-sm mt-1">Connect verified skills to real-world problem briefs from Rwandan enterprises and cooperatives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{item.company}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.duration}</span>
              </div>
              <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.skills.map((s: string, i: number) => (
                  <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{s}</span>
                ))}
              </div>
              <div className="text-xs font-bold text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1">
                <DollarSign className="w-4 h-4" /> Stipend / Grant: {item.stipend}
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition shadow flex items-center justify-center gap-2">
              Apply for Micro-Internship <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
