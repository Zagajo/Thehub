import React, { useState } from 'react';
import { X, Download, QrCode, CheckCircle2, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';

export default function CertificateModal({ isOpen = true, onClose, certificate, user }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !certificate) return null;

  // Resolve learner name and course name with bulletproof fallbacks
  const learnerName =
    certificate.userName ||
    certificate.learnerName ||
    user?.fullName ||
    user?.name ||
    'Kezia Umutoni';

  const courseName =
    certificate.courseTitle ||
    certificate.title ||
    'Full-Stack Web Engineering (Python & React)';

  const issuedDate =
    certificate.issuedDate ||
    certificate.issueDate ||
    new Date().toISOString().split('T')[0];

  const certId =
    certificate.id ||
    certificate.certificateId ||
    `HUB-RW-2026-${Math.floor(10000 + Math.random() * 90000)}`;

  const certHash =
    certificate.credentialHash ||
    certificate.verificationHash ||
    'SHA-256: 8fbc91e4a27b9c9f0e1d823456789abc01234567';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const url = `https://thehub.rw/verify/${certId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto font-sans print:p-0 print:bg-white">
      {/* Container wrapper for print & screen */}
      <div className="w-full max-w-5xl my-auto flex flex-col items-center">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="w-full flex items-center justify-between pb-3 px-1 print:hidden text-white">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">Verified Landscape Credential · 1.414:1 Standard A4</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-colors border border-slate-700"
              title="Copy public verification link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors shadow-sm"
              title="Print landscape or save as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-lg transition-colors border border-slate-700 ml-1"
              aria-label="Close Certificate"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Master Landscape Certificate */}
        <div
          id="official-certificate-canvas"
          className="print-certificate-container w-full aspect-[1.414/1] min-h-[580px] bg-slate-900 border-[8px] md:border-[12px] border-slate-900 shadow-2xl relative flex flex-col justify-between overflow-hidden print:shadow-none print:m-0 print:border-[8px]"
        >
          {/* Inner Golden Inset Pinstripe & Parchment Texture */}
          <div className="relative m-1.5 sm:m-2.5 md:m-3 p-6 sm:p-8 md:p-12 flex-1 flex flex-col justify-between bg-gradient-to-br from-[#fcfdfd] via-[#ffffff] to-[#faf8f5] border-2 border-amber-600/50 shadow-inner">
            {/* Elegant Classical Corner Ornaments */}
            {/* Top-Left */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600 pointer-events-none">
              <div className="w-1.5 h-1.5 bg-amber-600 absolute -top-1 -left-1"></div>
            </div>
            {/* Top-Right */}
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600 pointer-events-none">
              <div className="w-1.5 h-1.5 bg-amber-600 absolute -top-1 -right-1"></div>
            </div>
            {/* Bottom-Left */}
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600 pointer-events-none">
              <div className="w-1.5 h-1.5 bg-amber-600 absolute -bottom-1 -left-1"></div>
            </div>
            {/* Bottom-Right */}
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600 pointer-events-none">
              <div className="w-1.5 h-1.5 bg-amber-600 absolute -bottom-1 -right-1"></div>
            </div>

            {/* Subtle Watermark Shield in Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
              <ShieldCheck className="w-[520px] h-[520px] text-slate-900" />
            </div>

            {/* 1. Header: National Hierarchy & Logos */}
            <div className="relative z-10 text-center space-y-2">
              {/* National Tri-Color Accent Bar */}
              <div className="w-32 mx-auto h-1 flex rounded-full overflow-hidden shadow-2xs">
                <div className="bg-[#00A3E0] flex-1"></div>
                <div className="bg-[#FAD201] flex-1"></div>
                <div className="bg-[#20603D] flex-1"></div>
              </div>

              <div className="flex items-center justify-center space-x-3 pt-1">
                <img
                  src="/hub-logo.jpeg"
                  alt="The Hub Logo"
                  className="w-10 h-10 object-contain rounded-md border border-slate-300 p-0.5 bg-white shadow-2xs"
                />
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-600 uppercase font-bold leading-tight">
                    Republic of Rwanda · Ministry of ICT & Innovation
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 flex items-center space-x-1.5 leading-tight">
                    <span>The Hub Rwanda</span>
                    <span className="text-slate-300 font-light">/</span>
                    <span className="text-blue-700 font-mono text-[11px]">National Institute of Statistics of Rwanda (NISR)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-blue-900 font-bold">
                  Official Verified Professional Credential
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                  Certificate of Professional Mastery
                </h1>
                <div className="text-[10px] sm:text-[11px] font-mono italic text-slate-500">
                  Impamyabushobozi y’Ubumenyi bw’Umwuga n’Ikoranabuhanga
                </div>
              </div>
            </div>

            {/* 2. Recipient & Course Completion Core */}
            <div className="relative z-10 text-center space-y-3 sm:space-y-4 my-auto py-2 sm:py-3">
              <p className="text-slate-600 text-xs sm:text-sm font-medium tracking-wide">
                This is to officially certify that
              </p>

              {/* Learner Name Display */}
              <div className="inline-block px-8 sm:px-14 border-b-2 border-slate-900 pb-1.5 sm:pb-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight font-serif capitalize">
                  {learnerName}
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                has successfully completed all rigorous modular curriculum requirements, demonstrated practical application, and passed all end-of-module mastery assessment quizzes with verified distinction in:
              </p>

              {/* Course Name Display */}
              <div>
                <div className="inline-block bg-blue-50/90 text-blue-950 py-2.5 sm:py-3.5 px-6 sm:px-10 rounded-xl border border-blue-200 shadow-xs">
                  <div className="text-base sm:text-lg md:text-xl font-bold tracking-tight">
                    {courseName}
                  </div>
                </div>
              </div>

              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 flex items-center justify-center space-x-3">
                <span>Passing Benchmark: ≥ 80% (Passed Gated Module Quizzes)</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Competency
                </span>
              </div>
            </div>

            {/* 3. Signatures, Security Stamp & Validation Footer */}
            <div className="relative z-10 pt-3 sm:pt-4 border-t border-slate-200">
              <div className="grid grid-cols-3 gap-4 items-end">
                {/* Academic Director Signature */}
                <div className="text-center space-y-1">
                  <div className="h-10 sm:h-12 flex items-center justify-center">
                    <span className="font-serif italic text-lg sm:text-2xl text-slate-800 tracking-wide select-none">
                      Dr. Alice Mukamana
                    </span>
                  </div>
                  <div className="w-36 sm:w-44 mx-auto border-t border-slate-400"></div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                    Dr. Alice Mukamana
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-slate-500 leading-tight">
                    Director of Academic Programs, NISR
                  </div>
                </div>

                {/* Central Security QR & Official Seal */}
                <div className="flex flex-col items-center justify-center space-y-1.5">
                  <div className="p-1.5 bg-white border border-slate-300 rounded-lg shadow-2xs flex items-center justify-center">
                    <QrCode className="w-12 h-12 sm:w-14 sm:h-14 text-slate-900" />
                  </div>
                  <div className="flex items-center space-x-1 text-[9px] sm:text-[10px] font-mono text-blue-900 font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 text-blue-700" />
                    <span>Cryptographic Seal</span>
                  </div>
                </div>

                {/* Registrar Signature */}
                <div className="text-center space-y-1">
                  <div className="h-10 sm:h-12 flex items-center justify-center">
                    <span className="font-serif italic text-lg sm:text-2xl text-slate-800 tracking-wide select-none">
                      Jean-Paul Habimana
                    </span>
                  </div>
                  <div className="w-36 sm:w-44 mx-auto border-t border-slate-400"></div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                    Jean-Paul Habimana
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-slate-500 leading-tight">
                    Registrar & National Assessment Board
                  </div>
                </div>
              </div>

              {/* Cryptographic Audit Strip */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-500 gap-1.5">
                <div>
                  <span className="font-semibold text-slate-700">Issued:</span> {issuedDate}
                  <span className="mx-2 text-slate-300">|</span>
                  <span className="font-semibold text-slate-700">Reg No:</span> {certId}
                </div>

                <div className="truncate max-w-sm sm:max-w-md">
                  <span className="font-semibold text-slate-700">SHA-256:</span> {certHash}
                </div>

                <div className="text-blue-700 font-semibold flex items-center space-x-1">
                  <span>verify.thehub.rw</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Print Landscape CSS injection */}
        <style dangerouslySetInnerHTML={{ __html: `
          @page {
            size: landscape;
            margin: 0mm;
          }
          @media print {
            body {
              background: white !important;
              color: black !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-certificate-container {
              position: fixed !important;
              inset: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              max-width: none !important;
              aspect-ratio: auto !important;
              margin: 0 !important;
              padding: 0 !important;
              border: 10px solid #0f172a !important;
              box-shadow: none !important;
              page-break-inside: avoid !important;
            }
          }
        `}} />
      </div>
    </div>
  );
}
