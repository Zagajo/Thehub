import React, { useEffect, useState } from 'react';
import { Award, ShieldCheck, Share2, Download } from 'lucide-react';

export const SkillPassport = ({ user, onOpenAuth }) => {
  const [certificates, setCertificates] = useState([]);

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
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition shadow flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Official Verified Certificates ({userCertificates.length})</h3>
        
        {userCertificates.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 space-y-2">
            <Award className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No certificates granted yet.</p>
            <p className="text-xs">Complete course modules and request certification from the system administrator.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userCertificates.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-200">Verified Certificate</span>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
