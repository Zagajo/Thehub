import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, ShieldCheck, Download, QrCode, BookOpen, AlertCircle } from 'lucide-react';
import CertificateModal from '../components/CertificateModal';

export default function SkillPassport({ user, onOpenAuth }) {
  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      try {
        const [enRes, certRes] = await Promise.all([
          fetch(`/api/enrollments?userId=${user.id}`),
          fetch('/api/certificates')
        ]);
        const enData = await enRes.json();
        const certData = await certRes.json();
        setEnrollments(enData);
        // Filter certificates for current user
        setCertificates(certData.filter(c => c.userId === user.id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Sign In to View Your Skill Passport</h2>
        <p className="text-slate-600 max-w-md mx-auto">
          Your Skill Passport aggregates your enrolled courses, verified competencies, and downloadable QR completion certificates.
        </p>
        <button
          onClick={onOpenAuth}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg transition-all text-sm"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Learner ID Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-400 shadow-md" />
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>National Passport ID: {user.passportId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
            <p className="text-slate-300 text-sm">{user.email} • <span className="text-indigo-400 font-semibold">{user.district}</span></p>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl border border-slate-700 text-center space-y-1">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Verified Credentials</div>
          <div className="text-3xl font-bold text-emerald-400">{certificates.length}</div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          <span>Enrolled Courses & Progress</span>
        </h2>

        {enrollments.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-500">
            You are not enrolled in any courses yet. Explore the course catalog to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((en) => (
              <div key={en.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">Enrolled Course</span>
                    {en.completed ? (
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-semibold">In Progress</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{en.courseTitle}</h3>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Certificate Status: {en.certificateRequested ? 'Requested / Issued' : 'Not Requested'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Earned Certificates with View Certificate & Download PDF */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
          <Award className="w-6 h-6 text-indigo-600" />
          <span>Verified Certificates & QR Passports</span>
        </h2>

        {certificates.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-500">
            No certificates earned yet. Complete course modules and request your certificate.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between border border-indigo-900/30">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                      REB Verified Credential
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{cert.issuedDate}</span>
                  </div>
                  <h3 className="text-xl font-bold">{cert.courseTitle}</h3>
                  <div className="text-xs text-slate-400 font-mono bg-slate-800/80 p-2 rounded-xl">
                    Hash: {cert.credentialHash}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-emerald-400">
                    <QrCode className="w-4 h-4" />
                    <span>QR Code Ready</span>
                  </div>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow transition-all flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>View & Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CertificateModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </div>
  );
}
