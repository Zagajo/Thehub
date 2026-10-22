import React, { useState, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { api } from '../services/api.js';

export default function PeerMatching({ user }) {
  const [matches, setMatches] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [learningLanguage, setLearningLanguage] = useState('English');
  const [knownLanguage, setKnownLanguage] = useState('Kinyarwanda');
  const [matchedNotification, setMatchedNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPeers() {
      try {
        const res = await api.getPeerMatches();
        if (res.success) {
          setMatches(res.matches || []);
          setStudyGroups(res.studyGroups || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadPeers();
  }, []);

  const handleRequestMatch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.requestPeerMatch({
        learningLanguage,
        knownLanguage,
        availability: 'Tuesdays & Thursdays, 18:00 CAT (40 min agenda)'
      });
      if (res.success) {
        setMatches([res.match, ...matches]);
        setMatchedNotification(res.message);
        setTimeout(() => setMatchedNotification(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>The "CONNECT" Pillar</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Peer Learning & Language Exchange
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Learning is inherently social. Connect with Rwandan peers for structured 40-minute bilingual language exchanges (English & Kinyarwanda) and curated skill study groups.
          </p>
        </div>
      </div>

      {matchedNotification && (
        <div className="p-4 bg-emerald-100 text-emerald-900 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{matchedNotification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Match Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
              Request Language Exchange Match
            </h3>
            <p className="text-xs text-slate-500">
              Our deterministic algorithm matches complementary native and target language pairs.
            </p>

            <form onSubmit={handleRequestMatch} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Language I want to practice:
                </label>
                <select
                  value={learningLanguage}
                  onChange={(e) => setLearningLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value="English">Professional English</option>
                  <option value="French">Business French</option>
                  <option value="Kinyarwanda">Kinyarwanda Technical</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Language I can help with:
                </label>
                <select
                  value={knownLanguage}
                  onChange={(e) => setKnownLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value="Kinyarwanda">Kinyarwanda (Fluent)</option>
                  <option value="English">English (Fluent)</option>
                  <option value="French">French (Fluent)</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-[11px] text-blue-900 space-y-1">
                <span className="font-bold block">40-Minute Session Protocol:</span>
                <p>• 20 Mins: Target Language 1 (Oral exercises)</p>
                <p>• 20 Mins: Target Language 2 (Vocabulary exchange)</p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Find Matched Partner</span>
              </button>
            </form>
          </div>
        </div>

        {/* Matches & Study Groups Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Peer Matches */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Your Active Peer Study Partners</span>
            </h3>

            <div className="space-y-3">
              {matches.map((m, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{m.partnerName}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {m.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{m.topic}</p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-mono pt-1">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{m.partnerLocation}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{m.schedule}</span>
                      </span>
                    </div>
                  </div>

                  <button className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition whitespace-nowrap">
                    Join Session Room
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Cohort Study Groups */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Community Cohort Study Circles</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {studyGroups.map((grp) => (
                <div key={grp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{grp.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{grp.focus}</p>
                    <div className="mt-2 text-[11px] text-slate-500 space-y-0.5 font-mono">
                      <p>Time: {grp.meetingTime}</p>
                      <p>Lead: {grp.facilitator}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-slate-500">{grp.membersCount} Members</span>
                    <button className="text-xs font-bold text-blue-600 hover:underline">
                      Join Group
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
