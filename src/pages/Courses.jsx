import React, { useState, useEffect } from 'react';
import { BookOpen, Video, FileText, CheckCircle2, Award, ArrowLeft, Search, Lock, ShieldCheck } from 'lucide-react';

export default function Courses({ user, onOpenAuth }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [requestingCert, setRequestingCert] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/enrollments?userId=${user.id}`);
      const data = await res.json();
      setEnrollments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (user) fetchEnrollments();
  }, [user]);

  const handleEnroll = async (course) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId: course.id, courseTitle: course.title })
      });
      const data = await res.json();
      if (data.success) {
        setEnrollments(data.enrollments);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompleteModule = async (courseId) => {
    if (!user) return;
    try {
      const res = await fetch('/api/enrollments/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId })
      });
      const data = await res.json();
      if (data.success) {
        setEnrollments(data.enrollments);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequestCertificate = async (course) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setRequestingCert(true);
    setSuccessMsg('');
    try {
      const res = await fetch('/api/certificates/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId: course.id, courseTitle: course.title })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Certificate requested successfully! Admin will review and issue your verified QR certificate.');
        fetchEnrollments();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRequestingCert(false);
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userEnrollment = (courseId) => enrollments.find(e => e.courseId === courseId);

  if (selectedCourse) {
    const en = userEnrollment(selectedCourse.id);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
        <button
          onClick={() => setSelectedCourse(null)}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm bg-indigo-50 px-4 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Catalog</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="relative h-72 sm:h-96">
            <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="bg-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-3">
                {selectedCourse.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold">{selectedCourse.title}</h1>
              <p className="text-slate-300 text-sm mt-2 max-w-3xl">{selectedCourse.description}</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center space-x-6 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Difficulty</span>
                  <span className="font-bold text-slate-800">{selectedCourse.difficulty}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Duration</span>
                  <span className="font-bold text-slate-800">{selectedCourse.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Enrolled Learners</span>
                  <span className="font-bold text-slate-800">{selectedCourse.enrolled}</span>
                </div>
              </div>

              <div>
                {!en ? (
                  <button
                    onClick={() => handleEnroll(selectedCourse)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all text-sm"
                  >
                    Enroll in Course
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Enrolled</span>
                    </span>
                    {!en.completed && (
                      <button
                        onClick={() => handleCompleteModule(selectedCourse.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow"
                      >
                        Mark Course Completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Modules, Videos & Notes */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Course Curriculum, Video Lectures & Notes</h3>
              <div className="space-y-4">
                {selectedCourse.modules?.map((module, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 text-base">{module.title}</h4>
                      <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{module.duration}</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider">
                        <FileText className="w-4 h-4" />
                        <span>Lecture Notes & Study Material</span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{module.notes}</p>
                    </div>

                    {/* Embedded Video Player / Simulation */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-inner flex items-center justify-center">
                      <iframe 
                        className="w-full h-full"
                        src={module.videoUrl}
                        title={module.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Request Section */}
            {en && en.completed && (
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                    <Award className="w-5 h-5 text-indigo-400" />
                    <span>Course Completed Successfully</span>
                  </div>
                  <h4 className="text-2xl font-bold">Ready for your official Certificate?</h4>
                  <p className="text-slate-300 text-sm max-w-xl">
                    Request your cryptographically signed credential bearing QR code verification for your Skill Passport.
                  </p>
                </div>
                <button
                  onClick={() => handleRequestCertificate(selectedCourse)}
                  disabled={requestingCert || en.certificateRequested}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all text-sm whitespace-nowrap"
                >
                  {en.certificateRequested ? 'Certificate Requested (Pending Approval)' : 'Request Certificate'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Courses & Modules Catalog</h1>
          <p className="text-slate-600 text-sm mt-1">Explore Rwanda National Skills Framework courses with integrated videos and notes.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses or skills..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm outline-none bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCourses.map((course) => {
          const en = userEnrollment(course.id);
          return (
            <div key={course.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-52">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {course.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{course.difficulty}</span>
                    <span>{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => setSelectedCourse(course)}>
                    {course.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">{course.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                <div className="text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-800">{course.enrolled}</span> Enrolled learners
                </div>
                <div className="flex items-center space-x-2">
                  {en && (
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enrolled</span>
                    </span>
                  )}
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all"
                  >
                    View Modules
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
