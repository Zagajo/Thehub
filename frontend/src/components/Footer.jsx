import React from 'react';
import { ShieldCheck, Globe, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-700 to-red-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                H
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white">The Hub</span>
                <p className="text-[11px] text-slate-400">SkillBridge Rwanda & NISR Intelligence</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering learners across Rwanda with verified skill pathways, official labour market intelligence, and enterprise-grade learning management aligned with www.reb.gov.rw and www.ibm.com standards.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Data-Informed Platform • Secure SSL</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#dashboard" className="hover:text-white transition">Dashboard Overview</a></li>
              <li><a href="#courses" className="hover:text-white transition">Courses & Study Notes</a></li>
              <li><a href="#insights" className="hover:text-white transition">NISR Labour Insights</a></li>
              <li><a href="#passport" className="hover:text-white transition">Verified Skill Passport</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#assessments" className="hover:text-white transition">Tri-Part Assessments</a></li>
              <li><a href="#peermatch" className="hover:text-white transition">Peer-to-Peer Connect</a></li>
              <li><a href="#challenges" className="hover:text-white transition">Employer Micro-Internships</a></li>
              <li><a href="#admin" className="hover:text-white transition">System Administration</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Kigali City, Rwanda (HQ)</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" /> support@thehub.rw</li>
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" /> +250 788 000 000</li>
              <li className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" /> www.reb.gov.rw aligned</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 The Hub — SkillBridge Rwanda Platform. All rights reserved. Powered by Official NISR Data & Enterprise Architecture.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
