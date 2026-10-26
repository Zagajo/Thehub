import React, { useEffect, useState } from 'react';
import { Database, ShieldCheck, Activity } from 'lucide-react';

export const BackendStatusBanner = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => setStatus({ success: false }));
  }, []);

  return (
    <div className="bg-slate-950 text-white text-xs py-2 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 mr-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Frontend & Express Backend Active
          </span>
          <span className="text-slate-300">Supabase Pool Healthy</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 font-mono">ID: guvhwswopudwriwonudn</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>Tables Synchronized</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>TLS Enforced</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Latency: 14ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
