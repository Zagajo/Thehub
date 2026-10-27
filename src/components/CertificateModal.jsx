import React from 'react';
import { X, Download, QrCode, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, certificate }) {
  if (!isOpen || !certificate) return null;

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl aspect-[1.294/1] overflow-hidden border border-slate-300 relative animate-in fade-in zoom-in duration-200 print:shadow-none print:m-0 flex flex-col justify-between p-10 md:p-14">
        <div className="absolute top-4 right-4 flex items-center space-x-2 print:hidden z-10">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-1.5 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Watermark Seal */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <ShieldCheck className="w-96 h-96 text-blue-950" />
        </div>

        {/* Top Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center font-bold text-base shadow-sm">
              Hub
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold tracking-widest text-blue-900 uppercase font-mono">Republic of Rwanda</div>
              <div className="text-xs font-semibold text-slate-600">The Hub Digital Skills & NISR Intelligence Platform</div>
            </div>
          </div>
          <div className="pt-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-blue-900 font-mono">Certificate of Professional Completion</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">Verified Digital Credential</h2>
          </div>
        </div>

        {/* Recipient & Course */}
        <div className="text-center space-y-3 relative z-10 my-auto">
          <p className="text-slate-600 text-sm italic">This official digital credential is proudly presented to</p>

          <div className="text-3xl md:text-4xl font-extrabold text-blue-950 border-b-2 border-slate-300 pb-2 inline-block px-12 font-sans">
            {certificate.userName}
          </div>

          <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
            For successfully completing all rigorous training modules, practical assessments, and verified competency benchmarks in:
          </p>

          <div className="text-xl md:text-2xl font-bold text-slate-900 bg-slate-100 py-3 px-8 rounded-2xl border border-slate-300 shadow-sm inline-block">
            {certificate.courseTitle}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-3 gap-6 pt-6 items-center border-t border-slate-200 relative z-10">
          <div className="text-left">
            <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">Date Issued</div>
            <div className="text-xs font-bold text-slate-800">{certificate.issuedDate}</div>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
              <div className="w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center text-white p-1">
                <QrCode className="w-full h-full text-blue-400" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-0.5">Scan to Verify</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">Credential Hash ID</div>
            <div className="text-[11px] font-mono text-blue-950 bg-blue-50 p-1.5 rounded-lg border border-blue-200 mt-1 inline-block">{certificate.credentialHash}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
