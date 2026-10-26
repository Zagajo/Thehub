import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Users, CheckCircle, BookOpen, Award, FileText, Video } from 'lucide-react';

export const CourseDetail = ({ slug, onBack, user, onOpenAuth }) => {
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/courses/${slug}`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  const handleEnroll = () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    fetch(`/api/courses/${course.id}/enroll`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEnrolled(true);
        }
      });
  };

  if (loading) {
    return <div className="py-16 text-center text-slate-500">Loading course syllabus and study materials...</div>;
  }

  if (!course) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Course not found</h2>
        <button onClick={onBack} className="text-blue-600 font-semibold flex items-center gap-2 mx-auto">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </button>
      </div>
    );
  }

  const activeModule = course.modules?.[activeModuleIndex] || {};

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Courses & Notes
      </button>

      <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-md border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 lg:p-12 flex flex-col justify-between space-y-6">
            <div>
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded uppercase tracking-wider">
                {course.category}
              </span>
              <h1 className="text-3xl font-extrabold mt-4 leading-tight">{course.title}</h1>
              <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed">{course.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-4 border-t border-slate-800">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" /> {course.duration}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-blue-400" /> {course.enrolled} Enrolled</span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">★ {course.rating} / 5.0</span>
            </div>
          </div>
          <div className="relative h-64 md:h-auto bg-slate-800">
            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Study Modules, Notes & Videos
            </h3>

            <div className="flex flex-wrap gap-2">
              {course.modules?.map((mod, index) => (
                <button
                  key={index}
                  onClick={() => setActiveModuleIndex(index)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    activeModuleIndex === index 
                      ? 'bg-slate-900 text-white shadow' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Module {index + 1}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              <div>
                <span className="text-xs uppercase font-bold text-blue-600">Active Module</span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">{activeModule.title}</h4>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase">
                  <FileText className="w-4 h-4 text-blue-600" /> Comprehensive Study Notes
                </div>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {activeModule.notes || 'No study notes provided for this module yet. Check back soon or contact admin.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase">
                  <Video className="w-4 h-4 text-emerald-600" /> Study Video Lecture
                </div>
                {activeModule.videoUrl ? (
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 shadow-inner">
                    <iframe
                      src={activeModule.videoUrl}
                      title={activeModule.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                    No video lecture linked for this module.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24 space-y-6">
            <div className="text-center pb-6 border-b border-slate-100">
              <span className="text-xs uppercase font-semibold text-slate-400">Program Enrollment</span>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">Free</div>
              <p className="text-xs text-slate-500 mt-1">Full access to notes, video lectures, and verified certificate upon completion.</p>
            </div>

            {enrolled ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Enrolled & Studying!</h4>
                <p className="text-xs text-emerald-700">Complete modules and request certification from the admin panel.</p>
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow transition text-sm flex items-center justify-center gap-2"
              >
                {user ? 'Enroll & Access Notes' : 'Sign In & Enroll'}
              </button>
            )}

            <div className="text-[11px] text-slate-500 space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Earn official verified certificate signed by administrator.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
