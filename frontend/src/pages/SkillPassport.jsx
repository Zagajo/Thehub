import React, { useEffect, useState } from 'react';
import { Award, ShieldCheck, Share2, Download, Eye, X } from 'lucide-react';

export const SkillPassport = ({ user, onOpenAuth }) => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    fetch('/api/certificates')
      .then(res => res.json())
      .then(data => setCertificates(data))
      .catch(console.error);
  }, []);

  if (!user) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Award className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign In Required</h2>
        <p className="text-xs text-slate-600">Sign in with demo learner or your account to view official Skill Passports and verified certificates.</p>
        <button
          onClick={onOpenAuth}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition shadow"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const userCertificates = certificates.filter(c => c.userId === user.id || c.userName === user.name);

  const handleDownloadPDF = (cert) => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-8 rounded-3xl shadow-md border border-slate-800">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-400 shadow" />
          <div>
            <span className="text-xs uppercase font-bold text-blue-400">Verified Competency Record</span>
            <h1 className="text-2xl font-extrabold">{user.name}</h1>
            <p className="text-xs text-slate-300 mt-0.5">{user.district} • Passport ID: <span className="font-mono font-bold text-blue-400">{user.passportId}</span></p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition border border-slate-700 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" /> Share URL
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Official Verified Certificates ({userCertificates.length})</h3>
        
        {userCertificates.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 space-y-2">
            <Award className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No certificates granted yet.</p>
            <p className="text-xs">Complete course modules and request certification from the course details page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userCertificates.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-200">Verified QR Certificate</span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{cert.courseTitle}</h4>
                  <p className="text-xs text-slate-600 mt-1">Awarded by SkillBridge Rwanda System Administration.</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Issued: {cert.issuedDate}</span>
                  <span className="font-mono text-blue-600 font-semibold">{cert.credentialHash}</span>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Certificate
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(cert)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-4 border-slate-900 relative space-y-6 text-center">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                H
              </div>
              <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Republic of Rwanda • SkillBridge Rwanda</h4>
              <h2 className="text-2xl font-extrabold text-slate-900">Certificate of Completion</h2>
            </div>

            <p className="text-xs text-slate-600">This is proudly presented to</p>
            <div className="text-2xl font-extrabold text-blue-900 underline decoration-blue-400 underline-offset-4">{user.name}</div>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              for successfully completing all curriculum requirements, study notes, video lectures, and assessments for the verified learning pathway:
            </p>

            <div className="text-lg font-bold text-slate-900 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {selectedCert.courseTitle}
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 py-2">
              <div className="w-24 h-24 bg-white p-2 rounded-xl border-2 border-slate-800 shadow-sm flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full text-slate-900 fill-current">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 2h2v2h-2v-2zm-4-4h2v2h-2v-2zm6-6h2v2h-2v-2zm0 4h2v2h-2v-2zm-6-2h2v2h-2v-2z"/>
                </svg>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Scan QR Code to Verify Authenticity on thehub.rw</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
              <div>
                <span className="block font-bold text-slate-800">Issue Date</span>
                <span>{selectedCert.issuedDate}</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-slate-800 font-mono">Credential Verification Hash</span>
                <span className="font-mono text-blue-600">{selectedCert.credentialHash}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download / Print PDF
              </button>
              <button
                onClick={() => setSelectedCert(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-2.5 rounded-xl text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
