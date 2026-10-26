import React from 'react';
import { X, Download, QrCode, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, certificate }) {
  if (!isOpen || !certificate) return null;

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 relative animate-in fade-in zoom-in duration-200 print:shadow-none print:m-0">
        <div className="absolute top-4 right-4 flex items-center space-x-2 print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md transition-colors"
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

        {/* Certificate Body (Styled like official REB / IBM digital credential) */}
        <div className="p-10 md:p-14 bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 border-8 border-indigo-900/10 m-3 rounded-2xl relative">
          {/* Header watermark/seal */}
          <div className="absolute top-8 left-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-indigo-900" />
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-indigo-900 text-white rounded-xl flex items-center font-bold text-lg shadow-md">
                REB
              </div>
              <div className="text-left">
                <div className="text-xs font-bold tracking-widest text-indigo-900 uppercase">Republic of Rwanda</div>
                <div className="text-sm font-semibold text-slate-600">Rwanda Education Board & NISR Digital Hub</div>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="text-xs uppercase tracking-widest font-bold text-indigo-600">Certificate of Professional Completion</h4>
              <h2 className="text-3xl md:text-4xl font-ext500 font-bold text-slate-900 mt-2">Digital Skills Credential</h2>
            </div>

            <p className="text-slate-600 text-sm italic">This is proudly presented to</p>

            <div className="text-2xl md:text-3xl font-bold text-indigo-900 border-b-2 border-indigo-200 pb-2 inline-block px-8">
              {certificate.userName}
            </div>

            <p className="text-slate-600 text-sm max-w-xl mx-auto pt-2">
              For successfully completing all modules, practical assessments, and verified competency benchmarks in:
            </p>

            <div className="text-xl font-semibold text-slate-800 bg-white/80 py-3 px-6 rounded-xl border border-slate-200 shadow-sm inline-block">
              {certificate.courseTitle}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 items-center border-t border-slate-200 mt-8">
              <div className="text-left">
                <div className="text-xs font-semibold text-slate-400 uppercase">Date Issued</div>
                <div className="text-sm font-bold text-slate-800">{certificate.issuedDate}</div>
              </div>
              
              <div className="flex justify-center">
                {/* QR Code Simulated Verification Badge */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
                  <div className="w-20 h-20 bg-slate-900 rounded-lg flex items-center justify-center text-white p-2">
                    <QrCode className="w-full h-full text-indigo-400" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">Scan to Verify</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-semibold text-slate-400 uppercase">Credential Hash ID</div>
                <div className="text-xs font-mono text-indigo-700 bg-indigo-50 p-1.5 rounded border border-indigo-100">{certificate.credentialHash}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
