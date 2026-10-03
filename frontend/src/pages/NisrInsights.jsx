import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  MapPin,
  FileText,
  ShieldCheck,
  Search,
  ExternalLink,
  Users,
  Compass,
  CheckCircle2,
  Table
} from 'lucide-react';
import { api } from '../services/api.js';

export default function NisrInsights() {
  const [indicators, setIndicators] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [activeTab, setActiveTab] = useState('indicators'); // 'indicators' | 'youth-view' | 'traceability'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [indRes, provRes] = await Promise.all([
          api.getNisrIndicators(),
          api.getNisrProvinces()
        ]);
        if (indRes.success) setIndicators(indRes.data);
        if (provRes.success) {
          setProvinces(provRes.data);
          setSelectedProvince(provRes.data[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const traceabilityMatrix = [
    {
      feature: 'Macroeconomic Context Strip',
      dataset: 'Labour Force Survey (LFS)',
      indicator: 'Employment by sector (38.6% services, 44.8% agri)',
      transformation: 'Normalization & real-time trend indexing',
      output: 'Macroeconomic dashboard strip'
    },
    {
      feature: 'Youth Skills Opportunity View',
      dataset: 'LFS / Youth Employment Monograph',
      indicator: 'Youth LFPR (52.4%) & District Demographics',
      transformation: 'Disaggregation across 5 provinces & 30 districts',
      output: 'Geographic opportunity matching engine'
    },
    {
      feature: 'Text-First Low-Bandwidth Mode',
      dataset: 'Household ICT Access Survey & RURA',
      indicator: 'Household Internet Access (34.2%)',
      transformation: 'Constraint-driven payload minimization & cheat sheets',
      output: 'Lite mode toggle with offline-ready caching'
    },
    {
      feature: 'Deterministic Skill Gap Engine',
      dataset: 'EICV & NST2 Priority Sectors',
      indicator: 'Skill requirement profiles across 7 economic sectors',
      transformation: 'Deterministic delta: Target_Level - User_Level',
      output: 'Ordered actionable remediation pathways'
    },
    {
      feature: 'Gender & Inclusion Tracking',
      dataset: 'LFS / Census Gender Disaggregation',
      indicator: 'Female participation in technical & service sectors',
      transformation: 'Cohort parity index',
      output: 'Inclusion monitoring indicators'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>National Institute of Statistics of Rwanda (NISR)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Official Rwanda Labour Market Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All curriculum pathways, skill gaps, and local recommendations on The Hub are anchored in empirical statistical benchmarks published by NISR, the Rwanda Development Board (RDB), and NST2 strategies.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-xs font-bold">
          <button
            onClick={() => setActiveTab('indicators')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'indicators' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Core Economic Indicators
          </button>
          <button
            onClick={() => setActiveTab('youth-view')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'youth-view' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Youth Skills Opportunity View (By Province)
          </button>
          <button
            onClick={() => setActiveTab('traceability')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'traceability' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Data-to-Feature Traceability Matrix
          </button>
        </div>
      </div>

      {/* Tab 1: Core Economic Indicators */}
      {activeTab === 'indicators' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {indicators.map((ind) => (
              <div key={ind.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {ind.code}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {ind.trend}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-2">{ind.name}</h3>

                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-black text-slate-900">{ind.value}</span>
                    <span className="text-xs text-slate-500 font-semibold">{ind.unit}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {ind.provenance}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500 font-mono">
                    <p><strong>Source:</strong> {ind.source}</p>
                    <p><strong>Dataset:</strong> {ind.dataset}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Direct Targeted Skills on The Hub:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {ind.targetSkills?.map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-800 font-medium px-2 py-0.5 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Youth Skills Opportunity View & Geographic Disaggregation */}
      {activeTab === 'youth-view' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Province Selector Column */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                Select Rwanda Province
              </h3>
              <div className="space-y-2">
                {provinces.map((prov) => (
                  <button
                    key={prov.province}
                    onClick={() => setSelectedProvince(prov)}
                    className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                      selectedProvince?.province === prov.province
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{prov.province}</span>
                    </div>
                    <span className="text-[11px] opacity-80">{prov.districts.length} Districts</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Province Opportunity Detail */}
          {selectedProvince && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Geographic Labour Profile
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{selectedProvince.province}</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Districts: {selectedProvince.districts.join(', ')}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-[11px] font-bold text-slate-500 block">Youth Population (16-30)</span>
                    <span className="text-xl font-black text-slate-900 mt-1 block">
                      {selectedProvince.youthPopulation.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-[11px] font-bold text-slate-500 block">Youth Employment</span>
                    <span className="text-xl font-black text-slate-900 mt-1 block">
                      {selectedProvince.youthEmploymentRate}%
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-[11px] font-bold text-slate-500 block">Internet Reach</span>
                    <span className="text-xl font-black text-slate-900 mt-1 block">
                      {selectedProvince.internetPenetration}%
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-blue-900 block">
                    Strategic Skill Opportunities in {selectedProvince.province}:
                  </span>
                  <p className="text-xs text-blue-950/80 font-medium">
                    {selectedProvince.priorityOpportunity}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                    Key Leading Economic Sectors
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProvince.topSectors?.map((s, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Data-to-Feature Traceability Matrix */}
      {activeTab === 'traceability' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Data-to-Feature Traceability Matrix</h3>
            <p className="text-xs text-slate-500">
              Audit trail showing how official NISR data feeds directly into The Hub’s feature implementations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-3">Platform Feature</th>
                  <th className="p-3">NISR Dataset Source</th>
                  <th className="p-3">Key Indicator</th>
                  <th className="p-3">Analytical Transformation</th>
                  <th className="p-3">Application Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {traceabilityMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition">
                    <td className="p-3 font-bold text-slate-900">{row.feature}</td>
                    <td className="p-3 font-mono text-blue-700">{row.dataset}</td>
                    <td className="p-3">{row.indicator}</td>
                    <td className="p-3 text-slate-600">{row.transformation}</td>
                    <td className="p-3 font-semibold text-emerald-700">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
