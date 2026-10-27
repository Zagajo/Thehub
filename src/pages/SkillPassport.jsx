import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, ShieldCheck, Download, QrCode, BookOpen, AlertCircle, ChevronRight, ExternalLink } from 'lucide-react';
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
        const enList = Array.isArray(enData) ? enData : (enData.enrollments || enData.data || []);
        const certList = Array.isArray(certData) ? certData : (certData.certificates || certData.data || []);
        setEnrollments(enList);
        setCertificates(certList.filter(c => c.userId === user.id || c.learnerId === user.id));
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
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 font-sans">
        <div className="w-12 h-12 bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border border-slate-300">
          <Award className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
            Authentication Required
          </span>
          <h2 className="text-3xl font-light text-slate-900">
            Sign In to Access Your <span className="font-bold">Skill Passport</span>
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Your Skill Passport aggregates verified course modules, 10-question evaluation quiz scores, and cryptographically signed SHA-256 credentials.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
      {/* IBM Carbon Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">Verified Skill Passport</span>
      </nav>

      {/* Enterprise Learner Passport Header */}
      <div className="bg-slate-900 text-white p-8 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 object-cover border border-slate-700"
          />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>National Passport ID: {user.passportId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight">
              {user.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
              <span>{user.email}</span>
              <span aria-hidden="true">·</span>
              <span>District: {user.district}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Status: Verified Learner</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-800/90 border border-slate-700 text-center space-y-1 shrink-0 w-full sm:w-auto">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-medium">
            Verified Credentials
          </div>
          <div className="text-3xl font-light font-mono tabular-nums text-emerald-400">
            {certificates.length}
          </div>
        </div>
      </div>

      {/* Verified Certificates Vault */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
              Cryptographic Credentials
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Verified Certificates & SHA-256 Vault
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">QR Validated</span>
        </div>

        {certificates.length === 0 ? (
          <div className="p-8 bg-white border border-slate-200 text-center space-y-3">
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              No certificates issued yet. Pass all 10-question module quizzes with at least 8/10 to unlock your credential request.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-800"
            >
              <span>Explore Curriculum Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-slate-200 p-6 space-y-4 hover:border-blue-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-blue-700 font-semibold tracking-wider">
                      Verified Certificate
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{cert.courseTitle}</h3>
                    <div className="text-xs font-mono text-slate-500">
                      Issued: {cert.issuedDate} · Recipient: {cert.userName}
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-700">SHA-256 Signature Hash:</div>
                  <div className="truncate text-slate-500">{cert.credentialHash}</div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View Landscape Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enrolled Courses & Real-Time Tracking */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
              Course Portfolio
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Active Enrollments & Progression
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {enrollments.length} Active Courses
          </span>
        </div>

        {enrollments.length === 0 ? (
          <div className="p-8 bg-white border border-slate-200 text-center space-y-3">
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              You are not currently enrolled in any courses.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-800"
            >
              <span>Explore Course Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((en) => (
              <div
                key={en.id}
                className="bg-white border border-slate-200 p-6 space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-blue-700 font-semibold tracking-wider">
                      Course Enrollment
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{en.courseTitle}</h3>
                    <div className="text-xs font-mono text-slate-500">
                      ID: {en.courseId} · Status: {en.completed ? 'Completed' : 'In Progress'}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-mono font-semibold border ${
                    en.completed
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-blue-50 text-blue-800 border-blue-200'
                  }`}>
                    {en.completed ? 'Completed' : 'Active'}
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <Link
                    to="/courses"
                    className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-800"
                  >
                    <span>Resume Course Modules</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          user={user}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}
