import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Video,
  FileText,
  CheckCircle2,
  Award,
  ArrowLeft,
  Search,
  Lock,
  ChevronDown,
  PlayCircle,
  CheckSquare,
  Square,
  RotateCcw,
  AlertCircle,
  ChevronRight,
  HelpCircle,
  X,
  Code2,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api.js';
import { coursesData } from '../data/coursesData.js';
import { useLanguage } from '../context/LanguageContext';
import CertificateModal from '../components/CertificateModal';

export default function Courses({ user, onOpenAuth }) {
  const { t } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [subtopicProgress, setSubtopicProgress] = useState({});
  const [quizProgress, setQuizProgress] = useState({}); // { [courseId]: { [moduleIndex]: { score, passed } } }
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [requestingCert, setRequestingCert] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [openModules, setOpenModules] = useState({ 0: true });

  // Subtopic explanatory notes viewer modal state
  const [activeSubtopicModal, setActiveSubtopicModal] = useState(null); // { module, subtopic, subtopicIndex, moduleIndex }

  // 10-Question Quiz runner state
  // activeQuizModal: { course, module, moduleIndex, answers: {}, submitted: false, score: 0, passed: false }
  const [activeQuizModal, setActiveQuizModal] = useState(null);

  // Landscape Certificate preview modal state
  const [viewCertModal, setViewCertModal] = useState(null);

  const loadData = async () => {
    try {
      const list = await api.getCourses();
      setCourses(list && list.length ? list : coursesData);

      if (user) {
        const ens = await api.getEnrollments(user.id);
        setEnrollments(ens || []);

        const savedSubtopics = localStorage.getItem(`hub_subtopic_prog_${user.id}`);
        if (savedSubtopics) {
          setSubtopicProgress(JSON.parse(savedSubtopics));
        }

        const savedQuiz = localStorage.getItem(`hub_all_quiz_progress_${user.id}`);
        if (savedQuiz) {
          setQuizProgress(JSON.parse(savedQuiz));
        }
      }
    } catch (err) {
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const userEnrollment = (courseId) => enrollments.find(e => e.courseId === courseId);

  const handleEnroll = async (course) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    const res = await api.enrollCourse(user.id, course.id, course.title);
    if (res && res.enrollments) {
      setEnrollments(res.enrollments);
    }
  };

  // Check if a module is unlocked:
  // Module 0 is always unlocked if enrolled.
  // Module N (N > 0) is unlocked ONLY IF Module N-1 end-of-module quiz has score >= 8 (passed = true)!
  const isModuleUnlocked = (courseId, moduleIndex) => {
    if (moduleIndex === 0) return true;
    const cQuiz = quizProgress[courseId] || {};
    const prevModQuiz = cQuiz[moduleIndex - 1];
    return Boolean(prevModQuiz && prevModQuiz.passed && prevModQuiz.score >= 8);
  };

  const getModuleQuizState = (courseId, moduleIndex) => {
    const cQuiz = quizProgress[courseId] || {};
    return cQuiz[moduleIndex] || null;
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
  };

  // Open Quiz Modal
  const handleStartQuiz = (course, module, moduleIndex) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    // Existing quiz state if previously attempted
    const existing = getModuleQuizState(course.id, moduleIndex);
    setActiveQuizModal({
      course,
      module,
      moduleIndex,
      answers: {},
      submitted: false,
      score: existing ? existing.score : 0,
      passed: existing ? existing.passed : false
    });
  };

  // Submit 10-Question Quiz
  const handleSubmitQuiz = async () => {
    if (!activeQuizModal) return;
    const { course, module, moduleIndex, answers } = activeQuizModal;
    const quizQuestions = module.quiz || [];

    // Calculate score out of 10
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const passed = correctCount >= 8; // Mandatory rule: score at least 8/10 to pass

    // Submit to API
    await api.submitModuleQuiz(user.id, course.id, moduleIndex, correctCount, passed);

    // Update local state & storage
    const updatedCourseQuiz = {
      ...(quizProgress[course.id] || {}),
      [moduleIndex]: {
        score: correctCount,
        passed,
        attemptedAt: new Date().toISOString()
      }
    };
    const updatedAll = {
      ...quizProgress,
      [course.id]: updatedCourseQuiz
    };
    setQuizProgress(updatedAll);
    localStorage.setItem(`hub_all_quiz_progress_${user.id}`, JSON.stringify(updatedAll));

    // Update modal to show results & review
    setActiveQuizModal({
      ...activeQuizModal,
      submitted: true,
      score: correctCount,
      passed
    });

    // Check if entire course is completed
    const allModulesPassed = (course.modules || []).every((_, mIdx) => {
      const q = updatedCourseQuiz[mIdx];
      return q && q.passed && q.score >= 8;
    });

    if (allModulesPassed) {
      await api.completeCourse(user.id, course.id);
      setSuccessMsg('Outstanding achievement! You have passed all module quizzes with ≥8/10 and completed the course.');
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
      const res = await api.requestCertificate(user.id, course.id, course.title);
      if (res.success) {
        setSuccessMsg('Official Verified Certificate issued with cryptographic SHA-256 seal!');
        const updatedEns = await api.getEnrollments(user.id);
        setEnrollments(updatedEns || []);
        // Automatically open the landscape certificate modal for immediate viewing & printing
        setViewCertModal({
          id: res.certificate?.id || `HUB-RW-${Math.floor(10000 + Math.random() * 90000)}`,
          courseTitle: course.title,
          learnerName: user?.fullName || user?.name || user?.email,
          issuedDate: new Date().toISOString().split('T')[0],
          credentialHash: res.certificate?.verificationHash || 'SHA-256: 8fbc91e4a27b9c9f0e1d823456789abc01234567'
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRequestingCert(false);
    }
  };

  const calculateCourseProgress = (course) => {
    if (!course || !course.modules || course.modules.length === 0) return 0;
    let totalItems = 0;
    let completedItems = 0;

    course.modules.forEach((mod, mIdx) => {
      const q = getModuleQuizState(course.id, mIdx);
      totalItems += 1; // Quiz item
      if (q && q.passed && q.score >= 8) completedItems += 1;

      (mod.subtopics || []).forEach(st => {
        totalItems += 1;
        if (subtopicProgress[`${course.id}_${st.id}`]) completedItems += 1;
      });
    });

    if (totalItems === 0) return 0;
    return Math.round((completedItems / totalItems) * 100);
  };

  const isCourseFullyCompleted = (course) => {
    if (!course || !course.modules || course.modules.length === 0) return false;
    return course.modules.every((_, mIdx) => {
      const q = getModuleQuizState(course.id, mIdx);
      return q && q.passed && q.score >= 8;
    });
  };

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================
  // VIEW: SINGLE COURSE DETAIL & MODULE VIEW
  // ==========================================
  if (selectedCourse) {
    const en = userEnrollment(selectedCourse.id);
    const progressPct = calculateCourseProgress(selectedCourse);
    const fullyCompleted = isCourseFullyCompleted(selectedCourse);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
        {/* IBM Carbon Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => setSelectedCourse(null)} className="hover:text-blue-600 transition-colors">
            Course Catalog
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-medium truncate max-w-xs">{selectedCourse.title}</span>
        </nav>

        {/* Top Back Action */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedCourse(null)}
            className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors bg-white px-4 py-2 border border-slate-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </button>
        </div>

        {/* Course Header Banner */}
        <div className="bg-white border border-slate-200 overflow-hidden">
          <div className="p-8 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
              <span className="text-blue-700 font-semibold">{selectedCourse.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedCourse.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedCourse.duration}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-bold text-slate-800">{selectedCourse.enrolled} Enrolled</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
                {selectedCourse.title}
              </h1>
              <p className="text-slate-600 text-sm max-w-4xl leading-relaxed font-normal">
                {selectedCourse.description}
              </p>
            </div>

            {/* Overall Progress & Enrollment Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5 flex-1 max-w-xl">
                <div className="flex justify-between text-xs font-mono text-slate-600">
                  <span className="uppercase tracking-wider font-semibold">Course Progression</span>
                  <span className="font-bold tabular-nums text-slate-900">{progressPct}% Complete</span>
                </div>
                <div className="w-full bg-slate-100 h-2 overflow-hidden border border-slate-200">
                  <div
                    className="bg-blue-600 h-2 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
              </div>

              <div>
                {!en ? (
                  <button
                    onClick={() => handleEnroll(selectedCourse)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Enroll in Course</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Enrolled · Progress Tracking Active</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Global Success / Alert Message */}
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Curriculum Modules with Explanatory Subtopics & 10-Question Quizzes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
                Modular Progression Requirements
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Curriculum Modules & Assessment Quizzes
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Rule: Score ≥ 8/10 to unlock subsequent steps
            </span>
          </div>

          <div className="space-y-6">
            {(selectedCourse.modules || []).map((module, mIdx) => {
              const isUnlocked = isModuleUnlocked(selectedCourse.id, mIdx);
              const quizState = getModuleQuizState(selectedCourse.id, mIdx);
              const isPassed = quizState && quizState.passed && quizState.score >= 8;
              const hasAttempted = Boolean(quizState);
              const isOpen = openModules[mIdx] !== false;

              // Subtopics completion counts
              const subList = module.subtopics || [];
              const completedSubCount = subList.filter(st => subtopicProgress[`${selectedCourse.id}_${st.id}`]).length;

              return (
                <div
                  key={mIdx}
                  className={`bg-white border transition-colors ${
                    !isUnlocked
                      ? 'border-slate-200 opacity-80 bg-slate-50/70'
                      : isPassed
                      ? 'border-emerald-300 shadow-xs'
                      : 'border-slate-200 shadow-xs'
                  }`}
                >
                  {/* Module Header Bar */}
                  <div
                    onClick={() => {
                      if (isUnlocked) {
                        setOpenModules({ ...openModules, [mIdx]: !isOpen });
                      }
                    }}
                    className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none border-b ${
                      !isUnlocked
                        ? 'bg-slate-100 cursor-not-allowed border-slate-200'
                        : isPassed
                        ? 'bg-emerald-50/40 border-emerald-100 hover:bg-emerald-50/70'
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-9 h-9 flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                          !isUnlocked
                            ? 'bg-slate-300 text-slate-600'
                            : isPassed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 text-white'
                        }`}
                      >
                        {!isUnlocked ? <Lock className="w-4 h-4" /> : mIdx + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-base">{module.title}</h3>
                          {!isUnlocked && (
                            <span className="text-[10px] font-mono uppercase bg-slate-200 text-slate-700 px-2 py-0.5 border border-slate-300 font-semibold">
                              Locked · Complete Previous Quiz with ≥8/10
                            </span>
                          )}
                          {isPassed && (
                            <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 border border-emerald-300 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Passed ({quizState.score}/10)
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                          <span>{module.duration}</span>
                          <span aria-hidden="true">·</span>
                          <span>{completedSubCount} of {subList.length} Subtopics Completed</span>
                          <span aria-hidden="true">·</span>
                          <span>10-Question Quiz: {isPassed ? `Passed (${quizState.score}/10)` : hasAttempted ? `Score ${quizState.score}/10 (Retake required)` : 'Not Taken'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      {isUnlocked && (
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </div>

                  {/* Module Expanded Content */}
                  {isUnlocked && isOpen && (
                    <div className="p-6 sm:p-8 space-y-8 bg-white">
                      {/* Module Overview Notes */}
                      <div className="p-5 bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>Module Summary & Core Notes</span>
                        </div>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                          {module.notes}
                        </p>
                      </div>

                      {/* Video Lecture */}
                      {module.videoUrl && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                            <Video className="w-4 h-4 text-blue-600" />
                            <span>Guided Lecture & Architecture Demonstration</span>
                          </div>
                          <div className="relative aspect-video max-w-3xl overflow-hidden bg-slate-900 border border-slate-200">
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

                      {/* Step-by-Step Subtopics with Explanatory Notes */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
                            Step-by-Step Subtopics (Click to Read In-Depth Explanatory Notes)
                          </div>
                          <span className="text-xs font-mono text-slate-500">
                            {completedSubCount} / {subList.length} Finished
                          </span>
                        </div>

                        <div className="space-y-2">
                          {subList.map((st, sIdx) => {
                            const isDone = Boolean(subtopicProgress[`${selectedCourse.id}_${st.id}`]);
                            return (
                              <div
                                key={st.id}
                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border transition-colors ${
                                  isDone
                                    ? 'bg-emerald-50/30 border-emerald-200'
                                    : 'bg-white border-slate-200 hover:border-blue-600'
                                }`}
                              >
                                <div
                                  className="flex items-start space-x-3 cursor-pointer flex-1"
                                  onClick={() => setActiveSubtopicModal({
                                    module,
                                    subtopic: st,
                                    subtopicIndex: sIdx,
                                    moduleIndex: mIdx
                                  })}
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleSubtopic(selectedCourse.id, st.id);
                                    }}
                                    className="mt-0.5 text-slate-600 hover:text-blue-600 transition-colors shrink-0"
                                    title="Mark completed"
                                  >
                                    {isDone ? (
                                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                                    ) : (
                                      <Square className="w-5 h-5 text-slate-400" />
                                    )}
                                  </button>

                                  <div className="space-y-0.5">
                                    <div className="flex items-center space-x-2">
                                      <span className={`text-sm font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                        {st.title}
                                      </span>
                                      <span className="text-[11px] font-mono text-blue-600 underline cursor-pointer">
                                        Read Notes
                                      </span>
                                    </div>
                                    <div className="text-xs font-mono text-slate-500">
                                      Duration: {st.duration} · Type: {st.type}
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3 sm:mt-0 flex items-center space-x-2 shrink-0">
                                  <button
                                    onClick={() => setActiveSubtopicModal({
                                      module,
                                      subtopic: st,
                                      subtopicIndex: sIdx,
                                      moduleIndex: mIdx
                                    })}
                                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-medium border border-slate-300 uppercase tracking-wider transition-colors"
                                  >
                                    Open Subtopic Notes
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Official End-of-Module 10-Question Multiple Choice Quiz */}
                      <div className="pt-4 border-t border-slate-200">
                        <div className={`p-6 border space-y-4 ${
                          isPassed
                            ? 'bg-emerald-50/40 border-emerald-300'
                            : hasAttempted
                            ? 'bg-amber-50/40 border-amber-300'
                            : 'bg-slate-50 border-slate-300'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-200/80">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
                                <Award className="w-4 h-4 text-blue-700" />
                                <span>End-of-Module Competency Quiz (10 Questions)</span>
                              </div>
                              <p className="text-xs text-slate-600 font-normal">
                                Assessment Rule: You must score at least <strong>8 out of 10 (80%)</strong> to complete this module and unlock the next step.
                              </p>
                            </div>

                            <div className="flex items-center space-x-3 shrink-0">
                              {isPassed ? (
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>PASSED: {quizState.score} / 10 (80% Required Met)</span>
                                </span>
                              ) : hasAttempted ? (
                                <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold flex items-center gap-1.5">
                                  <AlertCircle className="w-4 h-4 text-amber-600" />
                                  <span>SCORE: {quizState.score} / 10 (8 Required — Retake)</span>
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-slate-200 text-slate-700 border border-slate-300 text-xs font-mono">
                                  Not Yet Taken
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="text-xs text-slate-600 font-mono">
                              Total Questions: 10 Multiple Choice · Passing Benchmark: 8 / 10 (80%)
                            </div>

                            <button
                              onClick={() => handleStartQuiz(selectedCourse, module, mIdx)}
                              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider font-mono transition-colors flex items-center justify-center space-x-2 ${
                                isPassed
                                  ? 'bg-slate-900 hover:bg-slate-800 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              <Award className="w-4 h-4" />
                              <span>{hasAttempted ? 'Retake 10-Question Quiz' : 'Start 10-Question Quiz'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Completion & Verified Certificate Request */}
        {en && (
          <div className="bg-white border border-slate-300 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-blue-700 tracking-wider">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Verified Cryptographic Credential</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Course Certificate & Skill Passport Issuance
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal">
                Credentials require verified completion of all modules with scores of at least 8/10 on every end-of-module assessment quiz. Issued with SHA-256 seal and QR verification.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {en.certificateRequested && (
                <button
                  onClick={() => setViewCertModal({
                    id: en.certificateId || `HUB-RW-${Math.floor(10000 + Math.random() * 90000)}`,
                    courseTitle: selectedCourse.title,
                    learnerName: user?.fullName || user?.name || user?.email,
                    issuedDate: en.completedAt || new Date().toISOString().split('T')[0]
                  })}
                  className="px-5 py-3.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold uppercase tracking-wider font-mono transition-colors flex items-center space-x-2 shadow-xs"
                >
                  <Award className="w-4 h-4" />
                  <span>View Landscape Certificate</span>
                </button>
              )}

              <button
                onClick={() => handleRequestCertificate(selectedCourse)}
                disabled={requestingCert || !fullyCompleted}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider font-mono whitespace-nowrap transition-colors"
              >
                {!fullyCompleted
                  ? 'Complete All Quizzes with ≥8/10'
                  : requestingCert
                  ? 'Generating Credential...'
                  : en.certificateRequested
                  ? 'Re-issue Certificate'
                  : 'Request Verified Certificate'}
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* MODAL: SUBTOPIC EXPLANATORY NOTES VIEWER  */}
        {/* ========================================== */}
        {activeSubtopicModal && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white border border-slate-300 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl">
              <button
                onClick={() => setActiveSubtopicModal(null)}
                className="absolute top-5 right-5 text-slate-500 hover:text-slate-900 p-2 bg-slate-100 border border-slate-200 transition-colors"
                aria-label="Close notes modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 border-b border-slate-200 pb-4 pr-10">
                <span className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
                  {activeSubtopicModal.module.title}
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  {activeSubtopicModal.subtopic.title}
                </h3>
                <div className="text-xs font-mono text-slate-500 pt-1">
                  Duration: {activeSubtopicModal.subtopic.duration} · Type: {activeSubtopicModal.subtopic.type}
                </div>
              </div>

              {/* Structured Notes Content */}
              {activeSubtopicModal.subtopic.notes ? (
                <div className="space-y-6 text-sm text-slate-700 font-normal">
                  {/* Overview */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider">
                      1. Topic Overview & Context
                    </h4>
                    <p className="leading-relaxed bg-slate-50 p-4 border border-slate-200 text-xs sm:text-sm">
                      {activeSubtopicModal.subtopic.notes.overview}
                    </p>
                  </div>

                  {/* Core Concepts */}
                  {activeSubtopicModal.subtopic.notes.coreConcepts && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider">
                        2. Fundamental Concepts & Principles
                      </h4>
                      <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
                        {activeSubtopicModal.subtopic.notes.coreConcepts.map((c, idx) => (
                          <li key={idx} className="leading-relaxed">{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Practical Code or Case Example */}
                  {activeSubtopicModal.subtopic.notes.practicalExample && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase text-slate-900 tracking-wider">
                        <Code2 className="w-4 h-4 text-blue-600" />
                        <span>3. Practical Implementation Example</span>
                      </div>
                      <pre className="p-4 bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                        {activeSubtopicModal.subtopic.notes.practicalExample}
                      </pre>
                    </div>
                  )}

                  {/* Rwandan & Local Industry Context */}
                  {activeSubtopicModal.subtopic.notes.rwandanContext && (
                    <div className="p-4 bg-blue-50/60 border border-blue-200 space-y-1">
                      <span className="text-xs font-mono font-bold uppercase text-blue-900 tracking-wider block">
                        4. Rwandan Sector & Economic Alignment
                      </span>
                      <p className="text-xs text-blue-950 leading-relaxed font-normal">
                        {activeSubtopicModal.subtopic.notes.rwandanContext}
                      </p>
                    </div>
                  )}

                  {/* Key Takeaways */}
                  {activeSubtopicModal.subtopic.notes.keyTakeaways && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider">
                        5. Key Takeaways & Best Practices
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600 font-mono">
                        {activeSubtopicModal.subtopic.notes.keyTakeaways.map((t, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  Comprehensive notes for this subtopic are currently being synchronized from the curriculum server.
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    handleToggleSubtopic(selectedCourse.id, activeSubtopicModal.subtopic.id);
                  }}
                  className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider border transition-colors ${
                    subtopicProgress[`${selectedCourse.id}_${activeSubtopicModal.subtopic.id}`]
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {subtopicProgress[`${selectedCourse.id}_${activeSubtopicModal.subtopic.id}`]
                    ? '✓ Marked as Completed'
                    : 'Mark as Completed'}
                </button>

                <button
                  onClick={() => setActiveSubtopicModal(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-medium uppercase tracking-wider transition-colors"
                >
                  Close Notes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* MODAL: 10-QUESTION MULTIPLE CHOICE QUIZ    */}
        {/* ========================================== */}
        {activeQuizModal && (
          <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
            <div className="bg-white border border-slate-300 w-full max-w-4xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl font-sans">
              <button
                onClick={() => setActiveQuizModal(null)}
                className="absolute top-5 right-5 text-slate-500 hover:text-slate-900 p-2 bg-slate-100 border border-slate-200 transition-colors"
                aria-label="Close quiz modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Quiz Header */}
              <div className="space-y-1.5 border-b border-slate-200 pb-4 pr-10">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Module Competency Evaluation · 10 Questions</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {activeQuizModal.module.title}
                </h3>
                <p className="text-xs text-slate-600 font-mono">
                  Passing Standard: Score at least <strong>8 out of 10 (80%)</strong> to pass and unlock the next module.
                </p>
              </div>

              {/* Results Banner (if submitted) */}
              {activeQuizModal.submitted && (
                <div className={`p-6 border space-y-2 ${
                  activeQuizModal.passed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="flex items-center space-x-3">
                    {activeQuizModal.passed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                    )}
                    <div>
                      <h4 className="text-lg font-bold">
                        {activeQuizModal.passed
                          ? `Passed with Distinction: ${activeQuizModal.score} / 10 (${activeQuizModal.score * 10}%)`
                          : `Score: ${activeQuizModal.score} / 10 (${activeQuizModal.score * 10}%) — Score of ≥ 8 Required`}
                      </h4>
                      <p className="text-xs leading-relaxed font-normal mt-0.5">
                        {activeQuizModal.passed
                          ? 'Congratulations! You have satisfied the verification benchmark (≥8/10). The next module in this course is now unlocked.'
                          : 'You must achieve a score of at least 8/10 to unlock the next module. Please review the detailed explanations below and retake the quiz.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 10 Multiple-Choice Questions Form */}
              <div className="space-y-8">
                {(activeQuizModal.module.quiz || []).map((q, qIdx) => {
                  const selectedAnswer = activeQuizModal.answers[qIdx];
                  const isSubmitted = activeQuizModal.submitted;
                  const isCorrect = selectedAnswer === q.correctAnswer;

                  return (
                    <div
                      key={q.id || qIdx}
                      className={`p-6 border space-y-4 ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-50/30 border-emerald-300'
                            : 'bg-rose-50/30 border-rose-300'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start space-x-3">
                          <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                            {qIdx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {q.question}
                          </h4>
                        </div>

                        {isSubmitted && (
                          <span className={`px-2 py-0.5 text-xs font-mono font-bold uppercase shrink-0 border ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border-rose-300'
                          }`}>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        )}
                      </div>

                      {/* 4 Multiple-Choice Options */}
                      <div className="grid grid-cols-1 gap-2 pt-1 pl-9">
                        {q.options.map((option, optIdx) => {
                          const isOptionSelected = selectedAnswer === optIdx;
                          const isOptionCorrect = optIdx === q.correctAnswer;

                          let optionStyles = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
                          if (isSubmitted) {
                            if (isOptionCorrect) {
                              optionStyles = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold';
                            } else if (isOptionSelected && !isCorrect) {
                              optionStyles = 'border-rose-400 bg-rose-50 text-rose-900';
                            } else {
                              optionStyles = 'border-slate-200 bg-slate-100 text-slate-400 opacity-60';
                            }
                          } else if (isOptionSelected) {
                            optionStyles = 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold';
                          }

                          return (
                            <label
                              key={optIdx}
                              className={`flex items-center space-x-3 p-3 border cursor-pointer text-xs transition-colors ${optionStyles}`}
                            >
                              <input
                                type="radio"
                                name={`question_${qIdx}`}
                                value={optIdx}
                                disabled={isSubmitted}
                                checked={isOptionSelected}
                                onChange={() => {
                                  if (!isSubmitted) {
                                    setActiveQuizModal({
                                      ...activeQuizModal,
                                      answers: {
                                        ...activeQuizModal.answers,
                                        [qIdx]: optIdx
                                      }
                                    });
                                  }
                                }}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="flex-1 leading-relaxed">{option}</span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Answer Explanation (Visible after submit) */}
                      {isSubmitted && q.explanation && (
                        <div className="mt-3 p-3 bg-white border border-slate-200 text-xs text-slate-700 space-y-1 ml-9">
                          <span className="font-mono uppercase font-bold text-slate-900 text-[11px] block">
                            Rationale & Explanation:
                          </span>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Submit & Retake Actions */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-600">
                  {activeQuizModal.submitted ? (
                    <span>
                      Score: <strong>{activeQuizModal.score} / 10</strong> ({activeQuizModal.passed ? '✓ Passing benchmark met' : '⚠ Retake required to advance'})
                    </span>
                  ) : (
                    <span>
                      Answered {Object.keys(activeQuizModal.answers).length} of 10 questions
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  {activeQuizModal.submitted ? (
                    <>
                      {!activeQuizModal.passed && (
                        <button
                          onClick={() => {
                            setActiveQuizModal({
                              ...activeQuizModal,
                              answers: {},
                              submitted: false
                            });
                          }}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Retake Quiz</span>
                        </button>
                      )}
                      <button
                        onClick={() => setActiveQuizModal(null)}
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider font-medium transition-colors"
                      >
                        Close & Continue
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(activeQuizModal.answers).length < 10}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center space-x-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>Submit 10-Question Quiz for Evaluation</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: ALL COURSES CATALOG (IBM DESIGN)
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
      {/* IBM Carbon Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">Curriculum Catalog & Module Tracking</span>
      </nav>

      {/* Enterprise Header */}
      <div className="bg-white border border-slate-200 p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-blue-700 font-mono tracking-wider uppercase font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>National Technical Curriculum</span>
              <span aria-hidden="true">·</span>
              <span>NISR Labour Evidence Aligned</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              {t('courses_title', 'Curriculum Catalog & Module Mastery')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t('courses_desc', 'Structured engineering and data pathways with in-depth subtopic notes, guided lectures, and mandatory 10-question multiple-choice quizzes with strict 8/10 mastery advancement gating.')}
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('courses_search_placeholder', 'Search courses, skills, or topics...')}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 text-xs font-normal text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Quick Filter Counts */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-1">
          <span>Showing {filteredCourses.length} Verified Courses</span>
          <span aria-hidden="true">·</span>
          <span>10-Question Quiz at each Module End</span>
          <span aria-hidden="true">·</span>
          <span>Passing Benchmark: ≥ 8 / 10</span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const en = userEnrollment(course.id);
          const prog = calculateCourseProgress(course);
          const isDone = isCourseFullyCompleted(course);

          return (
            <div
              key={course.id}
              className="bg-white border border-slate-200 flex flex-col justify-between hover:border-blue-600 transition-colors shadow-xs"
            >
              <div>
                <div className="relative h-48 bg-slate-900 border-b border-slate-200">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-mono px-2.5 py-1 uppercase tracking-wider border border-slate-700">
                    {course.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>{course.difficulty}</span>
                    <span>{course.duration}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedCourse(course)}
                    className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                  >
                    {course.title}
                  </h3>

                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-normal">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4 border-t border-slate-100 mt-4">
                {en && (
                  <div className="space-y-1.5 pt-3">
                    <div className="flex justify-between text-xs font-mono text-slate-600">
                      <span>Progression</span>
                      <span className="font-bold tabular-nums text-slate-900">{prog}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 overflow-hidden border border-slate-200">
                      <div className="bg-blue-600 h-1.5" style={{ width: `${prog}%` }}></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs font-mono text-slate-500">
                    <span className="font-bold tabular-nums text-slate-800">{course.enrolled}</span> Enrolled
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider font-mono transition-colors"
                  >
                    {en ? 'Continue Course' : 'View Curriculum'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Landscape Certificate Modal */}
      {viewCertModal && (
        <CertificateModal
          certificate={viewCertModal}
          user={user}
          onClose={() => setViewCertModal(null)}
        />
      )}
    </div>
  );
}
