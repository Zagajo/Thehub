import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, ShieldCheck, Database, ExternalLink, ChevronRight } from 'lucide-react';

export default function NisrHub() {
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIndicators() {
      try {
        const res = await fetch('/api/nisr/indicators');
        const data = await res.json();
        setIndicators(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchIndicators();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
      {/* IBM Carbon Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">NISR Labour Market Intelligence</span>
      </nav>

      {/* Enterprise Header */}
      <div className="bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-blue-400 tracking-wider font-semibold">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>National Institute of Statistics of Rwanda (NISR)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
            Labour Market & <span className="font-bold">Macroeconomic Intel</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
            Official statistics guiding curriculum design, sector skill prioritization, and national workforce planning under Rwanda Vision 2050 and NST2 frameworks.
          </p>
        </div>

        <div className="p-4 bg-slate-800 border border-slate-700 text-center space-y-1 shrink-0 w-full sm:w-auto">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-medium">
            Official Data Stream
          </div>
          <div className="text-sm font-mono font-bold text-emerald-400">
            Connected · Synchronized
          </div>
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {indicators.map((ind) => (
          <div
            key={ind.id}
            className="bg-white border border-slate-200 p-8 space-y-5 hover:border-blue-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-blue-700 font-semibold tracking-wider">
                {ind.category}
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>{ind.trend}</span>
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">{ind.indicator}</h3>
              <div className="text-4xl font-light text-slate-900 font-mono tabular-nums">
                {ind.value}
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              {ind.definition}
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="truncate max-w-[280px]">Source: {ind.source}</span>
              <span className="text-blue-700 font-semibold shrink-0">NISR Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
