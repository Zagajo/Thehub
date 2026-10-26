import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Database, Globe, MapPin, FileText } from 'lucide-react';

export const NisrInsights: React.FC = () => {
  const [indicators, setIndicators] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/nisr/indicators')
      .then(res => res.json())
      .then(data => setIndicators(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
          <Database className="w-3.5 h-3.5" />
          Official Data Provenance & Labour Intelligence
        </div>
        <h1 className="text-3xl font-extrabold text-navy-900">NISR Labour Market Insights</h1>
        <p className="text-slate-600 text-sm mt-1">Normalized datasets from the National Institute of Statistics of Rwanda informing skill pathways and regional growth.</p>
      </div>

      {/* Grid of indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {indicators.map((ind, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{ind.category}</span>
              <span className="text-xs font-bold text-emerald-600">{ind.trend}</span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-navy-900">{ind.value}</div>
              <h3 className="text-base font-bold text-slate-800 mt-1">{ind.indicator}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{ind.definition}</p>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
              <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Source: {ind.source}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Traceability Matrix Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold text-navy-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" /> NISR Data-to-Feature Traceability Matrix
        </h3>
        <p className="text-xs text-slate-600">Explicit mapping showing how official NISR data drives platform features and curriculum alignment.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
              <tr>
                <th className="p-3 rounded-l-lg">Feature</th>
                <th className="p-3">NISR Dataset</th>
                <th className="p-3">Key Indicator</th>
                <th className="p-3 rounded-r-lg">Application Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-navy-900">Labour Context</td>
                <td className="p-3 text-slate-600">Labour Force Survey (LFS)</td>
                <td className="p-3 text-slate-600">Employment by sector (38.6% services)</td>
                <td className="p-3 text-slate-600">Dashboard macro context strip</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-navy-900">Youth Skills View</td>
                <td className="p-3 text-slate-600">LFS / Education Report</td>
                <td className="p-3 text-slate-600">Youth participation (52.4%)</td>
                <td className="p-3 text-slate-600">Targeted youth opportunity journeys</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-navy-900">Digital Inclusion</td>
                <td className="p-3 text-slate-600">ICT Household Survey</td>
                <td className="p-3 text-slate-600">Internet access (34.2%)</td>
                <td className="p-3 text-slate-600">Text-first low-bandwidth mode</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-navy-900">Pathway Alignment</td>
                <td className="p-3 text-slate-600">EICV / LFS</td>
                <td className="p-3 text-slate-600">Skill attainment & formal/informal split</td>
                <td className="p-3 text-slate-600">Deterministic skill gap prioritization</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
