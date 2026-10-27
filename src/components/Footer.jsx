import React from 'react';
import { ExternalLink, Shield, Globe, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 py-16 border-t border-slate-200 font-sans shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-200">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center font-bold text-white shadow-sm">
                Hub
              </div>
              <span className="text-slate-900 font-bold text-xl tracking-tight">The Hub</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              National digital skills, workforce passports, career matching, and labour-market intelligence platform.
            </p>
            <div className="flex items-center space-x-3 text-xs text-blue-900 font-mono">
              <Globe className="w-4 h-4" />
              <span>www.thehub.rw | digital.skills.rw</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-4">Platform Ecosystem</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#courses" className="hover:text-slate-900 transition-colors flex items-center space-x-1"><span>Full-Stack Engineering</span></a></li>
              <li><a href="#nisr" className="hover:text-slate-900 transition-colors flex items-center space-x-1"><span>Labour Intelligence</span></a></li>
              <li><a href="#passport" className="hover:text-slate-900 transition-colors flex items-center space-x-1"><span>Verified Skill Passport</span></a></li>
              <li><a href="#assessments" className="hover:text-slate-900 transition-colors flex items-center space-x-1"><span>Diagnostics & Certifications</span></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-4">Security & Compliance</h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-blue-900 font-semibold">
                <Shield className="w-4 h-4" />
                <span>SHA-256 Credential Vault</span>
              </div>
              <p className="text-slate-600">All certificates are cryptographically signed and verifiable via QR code scanning under digital accreditation standards.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>© 2026 The Hub Platform. All rights reserved.</div>
          <div className="flex space-x-6">
            <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 cursor-pointer">Accessibility</span>
            <span className="hover:text-slate-900 cursor-pointer">Contact Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
