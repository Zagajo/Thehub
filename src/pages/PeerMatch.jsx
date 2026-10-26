import React from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';

export const PeerMatch = () => {
  const peers = [
    { name: 'Jean Bosco Mugabo', role: 'Python Developer in Training', language: 'Kinyarwanda / English', matchScore: '96%', location: 'Gasabo, Kigali' },
    { name: 'Aline Uwase', role: 'Data Analytics Student', language: 'English / French', matchScore: '92%', location: 'Huye, Southern Province' },
    { name: 'Patrick Ndayisaba', role: 'Agri-Tech Builder', language: 'Kinyarwanda / English', matchScore: '89%', location: 'Musanze, Northern Province' }
  ];

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          The Connect Pillar • Dual-Language Exchange Algorithm
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Peer-to-Peer Study Matching</h1>
        <p className="text-slate-600 text-sm mt-1">Collaborate with fellow learners across Rwanda for structured study sessions and language exchange.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {peers.map((peer, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">{peer.matchScore} Match</span>
                <span className="text-xs text-slate-500">{peer.location}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{peer.name}</h3>
              <p className="text-xs font-medium text-blue-600">{peer.role}</p>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">🗣️ Language Exchange: {peer.language}</p>
            </div>
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition shadow flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" /> Connect & Schedule Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
