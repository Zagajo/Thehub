import React from 'react';
import { ExternalLink, Shield, Globe, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md">
                REB
              </div>
              <span className="text-white font-bold text-xl tracking-tight">The Hub</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Rwanda Education Board (REB) & National Institute of Statistics of Rwanda (NISR) joint initiative for data-informed digital skills, workforce passports, and career matching.
            </p>
            <div className="flex items-center space-x-3 text-xs text-indigo-400 font-mono">
              <Globe className="w-4 h-4" />
              <span>www.reb.gov.rw | www.nisr.gov.rw</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Platform Ecosystem</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#courses" className="hover:text-white transition-colors flex items-center space-x-1"><span>Full-Stack Engineering</span></a></li>
              <li><a href="#nisr" className="hover:text-white transition-colors flex items-center space-x-1"><span>NISR Labour Intelligence</span></a></li>
              <li><a href="#passport" className="hover:text-white transition-colors flex items-center space-x-1"><span>Verified Skill Passport</span></a></li>
              <li><a href="#assessments" className="hover:text-white transition-colors flex items-center space-x-1"><span>Diagnostics & Certifications</span></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Partner Institutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="https://www.reb.gov.rw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center space-x-1"><span>Rwanda Education Board</span> <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-500" /></a></li>
              <li><a href="https://www.nisr.gov.rw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center space-x-1"><span>National Institute of Statistics</span> <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-500" /></a></li>
              <li><a href="https://www.minict.gov.rw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center space-x-1"><span>MINICT Rwanda</span> <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-500" /></a></li>
              <li><a href="https://www.rdb.rw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center space-x-1"><span>Rwanda Development Board</span> <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-500" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Security & Compliance</h4>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-indigo-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>SHA-256 Credential Vault</span>
              </div>
              <p className="text-slate-400">All certificates are cryptographically signed and verifiable via QR code scanning under Rwanda national digital accreditation standards.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>© 2026 Republic of Rwanda - Rwanda Education Board & NISR. All rights reserved.</div>
          <div className="flex space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
            <span className="hover:text-slate-400 cursor-pointer">Contact Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
