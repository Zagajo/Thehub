import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  ChevronRight,
  Send
} from 'lucide-react';
import { api } from '../services/api.js';

export default function PeerMatching({ user, onOpenAuth }) {
  const [matches, setMatches] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [learningLanguage, setLearningLanguage] = useState('English');
  const [knownLanguage, setKnownLanguage] = useState('Kinyarwanda');
  const [matchedNotification, setMatchedNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    async function loadPeers() {
      try {
        const res = await api.getPeerMatches();
        if (res.success) {
          setMatches(res.matches || []);
          setStudyGroups(res.studyGroups || []);
        }
      } catch (e) {
        console.warn('Peer matching loading fallback applied:', e);
      } finally {
        setLoading(false);
      }
    }
    loadPeers();
  }, []);

  const handleRequestMatch = async (e) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }
    setRequesting(true);
    try {
      const res = await api.requestPeerMatch({
        learningLanguage,
        knownLanguage,
        availability: 'Tuesdays & Thursdays, 18:00 CAT (40 min agenda)'
      });
      if (res.success) {
        setMatches([res.match, ...matches]);
        setMatchedNotification(res.message);
        setTimeout(() => setMatchedNotification(null), 6000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
      {/* IBM Carbon Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">Peer Learning & Language Exchange</span>
      </nav>

      {/* Enterprise Header */}
      <div className="bg-white border border-slate-200 p-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs text-blue-700 font-mono tracking-wider uppercase font-semibold">
            <Users className="w-4 h-4" />
            <span>The Connect Pillar</span>
            <span aria-hidden="true">·</span>
            <span>Bilingual Exchange</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            Peer Learning & <span className="font-bold">Language Exchange</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Learning is inherently collaborative. Connect with Rwandan peers for structured 40-minute bilingual language exchanges (English & Kinyarwanda) and curated cohort study circles across engineering and data disciplines.
          </p>
        </div>
      </div>

      {matchedNotification && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{matchedNotification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Match Column */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 space-y-5">
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Request Language Exchange Match
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Our matching algorithm pairs complementary native and target language proficiencies.
              </p>
            </div>

            <form onSubmit={handleRequestMatch} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Language I want to practice:
                </label>
                <select
                  value={learningLanguage}
                  onChange={(e) => setLearningLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option value="English">Professional Technical English</option>
                  <option value="French">Commercial Business French</option>
                  <option value="Kinyarwanda">Technical Kinyarwanda Translation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Language I can support:
                </label>
                <select
                  value={knownLanguage}
                  onChange={(e) => setKnownLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option value="Kinyarwanda">Kinyarwanda (Native / Fluent)</option>
                  <option value="English">English (Fluent Professional)</option>
                  <option value="French">French (Fluent Business)</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <span className="font-bold text-slate-900 block font-mono uppercase text-[11px] tracking-wider">
                  40-Minute Session Protocol:
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  • 20 Mins: Target Language 1 (Oral exercises & technical terminology)
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  • 20 Mins: Target Language 2 (Vocabulary exchange & conversational review)
                </p>
              </div>

              <button
                type="submit"
                disabled={requesting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{requesting ? 'Matching Algorithm Running...' : 'Find Matched Partner'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Matches & Study Groups Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Peer Matches */}
          <div className="bg-white border border-slate-200 p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Your Active Peer Study Partners</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">{matches.length} Matched</span>
            </div>

            <div className="space-y-3">
              {matches.map((m, idx) => (
                <div key={idx} className="p-5 bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-slate-900 text-sm">{m.partnerName}</span>
                      <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                        {m.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-normal">{m.topic}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono pt-1">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{m.partnerLocation}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{m.schedule}</span>
                      </span>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors shrink-0">
                    Join Session Room
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Cohort Study Groups */}
          <div className="bg-white border border-slate-200 p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Community Cohort Study Circles</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">Weekly Agendas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {studyGroups.map((grp) => (
                <div key={grp.id} className="p-5 bg-white border border-slate-200 space-y-3 flex flex-col justify-between hover:border-blue-600 transition-colors">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">{grp.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{grp.focus}</p>
                    <div className="pt-2 text-xs text-slate-500 space-y-1 font-mono">
                      <p>Time: {grp.meetingTime}</p>
                      <p>Lead: {grp.facilitator}</p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <span className="text-xs font-mono text-slate-500 tabular-nums">{grp.membersCount} Members</span>
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 uppercase tracking-wider font-mono">
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
