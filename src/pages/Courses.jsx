import React, { useState, useEffect } from 'react';
import { BookOpen, Video, FileText, CheckCircle2, Award, ArrowLeft, Search, Lock, ShieldCheck, ChevronDown, PlayCircle, CheckSquare, Square, RotateCcw } from 'lucide-react';

export default function Courses({ user, onOpenAuth }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [subtopicProgress, setSubtopicProgress] = useState({}); // { [courseId_subtopicId]: true/false }
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [requestingCert, setRequestingCert] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [openModules, setOpenModules] = useState({}); // { [moduleIndex]: boolean }

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      // Ensure each module has structured subtopics
      const enriched = data.map(course => ({
        ...course,
        modules: (course.modules || []).map((mod, mIdx) => ({
          ...mod,
          imageUrl: mod.imageUrl || course.image,
          subtopics: mod.subtopics || [
            { id: `m${mIdx}-st1`, title: `1. Core Concepts & Overview of ${mod.title.split(':')[0]}`, duration: '15 mins', type: 'reading', completed: false },
            { id: `m${mIdx}-st2`, title: `2. Guided Video Lecture & Demonstration`, duration: '30 mins', type: 'video', completed: false },
            { id: `m${mIdx}-st3`, title: `3. Practical Exercise & Knowledge Check`, duration: '25 mins', type: 'exercise', completed: false }
          ]
        }))
      }));
      setCourses(enriched);
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
      
      // Load saved subtopic progress from localStorage
      const savedProg = localStorage.getItem(`hub_subtopic_prog_${user.id}`);
      if (savedProg) {
        setSubtopicProgress(JSON.parse(savedProg));
      }
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

  const handleToggleSubtopic = (courseId, subtopicId) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    const key = `${courseId}_${subtopicId}`;
    const updated = { ...subtopicProgress, [key]: !subtopicProgress[key] };
    setSubtopicProgress(updated);
    localStorage.setItem(`hub_subtopic_prog_${user.id}`, JSON.stringify(updated));

    // Check if course is fully completed
    const course = courses.find(c => c.id === courseId);
    if (course) {
      let totalSubs = 0;
      let completedSubs = 0;
      course.modules.forEach(mod => {
        mod.subtopics.forEach(st => {
          totalSubs++;
          if (updated[`${courseId}_${st.id}`]) completedSubs++;
        });
      });

      if (totalSubs > 0 && completedSubs === totalSubs) {
        // Auto complete course enrollment
        handleCompleteCourse(courseId);
      }
    }
  };

  const handleCompleteCourse = async (courseId) => {
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
        setSuccessMsg('Congratulations! Course successfully completed.');
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
        setSuccessMsg('Certificate requested successfully! Issued with verified QR code in your Skill Passport.');
        fetchEnrollments();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRequestingCert(false);
    }
  };

  const calculateCourseProgress = (course) => {
    if (!course || !course.modules) return 0;
    let total = 0;
    let done = 0;
    course.modules.forEach(mod => {
      mod.subtopics.forEach(st => {
        total++;
        if (subtopicProgress[`${course.id}_${st.id}`]) done++;
      });
    });
    if (total === 0) return 0;
    return Math.round((done / total) * 100);
  };

  const findResumeSubtopic = (course) => {
    if (!course || !course.modules) return null;
    for (const mod of course.modules) {
      for (const st of mod.subtopics) {
        if (!subtopicProgress[`${course.id}_${st.id}`]) {
          return { moduleTitle: mod.title, subtopicTitle: st.title };
        }
      }
    }
    return null;
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userEnrollment = (courseId) => enrollments.find(e => e.courseId === courseId);

  if (selectedCourse) {
    const en = userEnrollment(selectedCourse.id);
    const progressPct = calculateCourseProgress(selectedCourse);
    const resumeInfo = findResumeSubtopic(selectedCourse);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
        <button
          onClick={() => setSelectedCourse(null)}
          className="flex items-center space-x-2 text-blue-900 hover:text-blue-950 font-semibold text-xs uppercase tracking-wider bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Catalog</span>
        </button>

        {/* Course Header Banner */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="relative h-72 sm:h-80">
            <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="bg-blue-900 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider w-max mb-3 border border-blue-700">
                {selectedCourse.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold">{selectedCourse.title}</h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">{selectedCourse.description}</p>
            </div>
          </div>

          <div className="p-8 space-y-8 bg-slate-50">
            {/* Progress Bar & Status */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase">Overall Course Progress</div>
                  <div className="text-2xl font-extrabold text-blue-950">{progressPct}% Completed</div>
                </div>

                <div className="flex items-center gap-3">
                  {!en ? (
                    <button
                      onClick={() => handleEnroll(selectedCourse)}
                      className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl shadow-sm transition-all text-xs uppercase tracking-wider"
                    >
                      Enroll in Course
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Enrolled & Tracking Active</span>
                      </span>
                      {resumeInfo && (
                        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                          Resume: <strong>{resumeInfo.subtopicTitle}</strong>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-900 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>
            </div>

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Expandable Modules & Ordered Subtopics */}
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900">Curriculum Modules & Step-by-Step Subtopics</h3>
              <div className="space-y-4">
                {selectedCourse.modules?.map((module, mIdx) => {
                  const isOpen = openModules[mIdx] !== false; // default open
                  const modSubs = module.subtopics || [];
                  const completedModSubs = modSubs.filter(st => subtopicProgress[`${selectedCourse.id}_${st.id}`]).length;
                  const modProgress = modSubs.length > 0 ? Math.round((completedModSubs / modSubs.length) * 100) : 0;
                  const isModComplete = modProgress === 100;

                  return (
                    <div key={mIdx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      {/* Module Header (Expandable/Collapsible) */}
                      <div
                        onClick={() => setOpenModules({ ...openModules, [mIdx]: !isOpen })}
                        className="p-6 bg-slate-100 hover:bg-slate-200/70 transition-colors flex items-center justify-between cursor-pointer border-b border-slate-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${isModComplete ? 'bg-emerald-600 text-white' : 'bg-blue-900 text-white'}`}>
                            {mIdx + 1}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{module.title}</h4>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{module.duration} • {completedModSubs}/{modSubs.length} Subtopics Completed ({modProgress}%)</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {isModComplete && (
                            <span className="text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                          )}
                          <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {/* Module Expanded Content */}
                      {isOpen && (
                        <div className="p-6 space-y-6 bg-white animate-in fade-in duration-150">
                          {/* Notes & Learning Materials */}
                          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                            <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs uppercase tracking-wider font-mono">
                              <FileText className="w-4 h-4" />
                              <span>Module Notes & Learning Materials</span>
                            </div>
                            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{module.notes}</p>
                          </div>

                          {/* Module Picture / Diagram */}
                          {module.imageUrl && (
                            <div className="rounded-xl overflow-hidden border border-slate-200 h-56">
                              <img src={module.imageUrl} alt={module.title} className="w-full h-full object-cover" />
                            </div>
                          )}

                          {/* Embedded Video Lecture */}
                          {module.videoUrl && (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs uppercase tracking-wider font-mono">
                                <Video className="w-4 h-4" />
                                <span>Guided Video Lecture</span>
                              </div>
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
                          )}

                          {/* Ordered Subtopics Step-by-Step Checklist */}
                          <div className="space-y-3 pt-2">
                            <h5 className="text-xs font-mono font-extrabold uppercase text-slate-700">Step-by-Step Subtopics & Progress Tracking</h5>
                            <div className="space-y-2">
                              {modSubs.map((st) => {
                                const isDone = Boolean(subtopicProgress[`${selectedCourse.id}_${st.id}`]);
                                return (
                                  <div
                                    key={st.id}
                                    onClick={() => handleToggleSubtopic(selectedCourse.id, st.id)}
                                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                                      isDone ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <button type="button" className="text-blue-900">
                                        {isDone ? <CheckSquare className="w-5 h-5 text-emerald-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                                      </button>
                                      <div>
                                        <div className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                          {st.title}
                                        </div>
                                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{st.duration} • Type: {st.type}</div>
                                      </div>
                                    </div>
                                    <span className={`text-[10px] font-mono px-2 py-1 rounded font-bold ${isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                                      {isDone ? 'Completed' : 'Pending'}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certificate Request Section */}
            {en && (
              <div className="bg-white border border-slate-300 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-blue-900 text-xs font-bold uppercase tracking-wider font-mono">
                    <Award className="w-5 h-5 text-blue-800" />
                    <span>Course Completion & Certificate</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">Ready for your official Certificate?</h4>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
                    Once all subtopics are completed, request your cryptographically signed credential bearing QR verification for your Skill Passport.
                  </p>
                </div>
                <button
                  onClick={() => handleRequestCertificate(selectedCourse)}
                  disabled={requestingCert || progressPct < 100}
                  className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  {progressPct < 100 ? `Complete All Subtopics (${progressPct}%)` : 'Request Verified Certificate'}
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
          <h1 className="text-3xl font-bold text-slate-900">Courses & Module Tracking Catalog</h1>
          <p className="text-slate-600 text-sm mt-1">Explore verified courses with step-by-step subtopic tracking, notes, and video lectures.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses or skills..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 text-sm outline-none bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const en = userEnrollment(course.id);
          const prog = calculateCourseProgress(course);
          return (
            <div key={course.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-48">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-blue-900 text-white text-xs font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {course.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{course.difficulty}</span>
                    <span>{course.duration}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 hover:text-blue-900 transition-colors cursor-pointer" onClick={() => setSelectedCourse(course)}>
                    {course.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{course.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex flex-col space-y-4 border-t border-slate-100 mt-4">
                {en && (
                  <div className="space-y-1.5 pt-3">
                    <div className="flex justify-between text-xs font-mono text-slate-600">
                      <span>Progress</span>
                      <span className="font-bold">{prog}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-900 h-full rounded-full" style={{ width: `${prog}%` }}></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-mono">
                    <span className="font-bold text-slate-800">{course.enrolled}</span> Enrolled
                  </div>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    {en ? 'Continue Course' : 'View Modules'}
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
