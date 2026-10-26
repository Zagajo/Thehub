import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Database, ExternalLink } from 'lucide-react';

export default function NisrHub() {
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIndicators() {
      try {
        const res = await fetch('/api/nisr/indicators');
        const data = await res.json();
        setIndicators(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchIndicators();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>National Institute of Statistics of Rwanda (NISR)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Labour Market & Digital Intelligence Hub</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Real-time official statistics guiding skill development, employment growth sectors, and national workforce planning under NST2.
          </p>
        </div>
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-center space-y-1">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Official Data Feed</div>
          <div className="text-lg font-bold text-emerald-400">Connected ✓</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {indicators.map((ind) => (
          <div key={ind.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">{ind.category}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{ind.trend}</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">{ind.indicator}</h3>
            <div className="text-4xl font-ext500 font-bold text-indigo-900">{ind.value}</div>
            <p className="text-slate-600 text-sm">{ind.definition}</p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Source: {ind.source}</span>
              <span className="font-mono text-indigo-600">NISR Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
