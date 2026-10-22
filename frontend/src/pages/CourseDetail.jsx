import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Star,
  CheckCircle2,
  Circle,
  FileText,
  Download,
  Bot,
  Award,
  BookOpen,
  Share2,
  UserPlus,
  LogIn
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { api } from '../services/api.js';

export default function CourseDetail({
  user,
  onEnrollCourse,
  onLoginToEnroll,
  onOpenAiTutor,
  lowBandwidth
}) {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Module Assessment State
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [unlockedModuleLevel, setUnlockedModuleLevel] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const isGuest = !user || user.id === 'guest';

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await api.getCourseBySlug(slug);
        if (res.success) {
          setCourse(res.data);
          const firstLesson = res.data.syllabus?.[0]?.lessons?.[0];
          setActiveLesson(firstLesson || null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [slug]);

  if (loading) {
    return <div className="p-12 text-center text-xs text-slate-500 font-sans">Loading course syllabus...</div>;
  }

  if (!course) {
    return (
      <div className="p-12 text-center bg-white rounded-lg border border-slate-200 font-sans">
        <h3 className="font-bold text-slate-800 text-sm">Course not found</h3>
        <Link to="/courses" className="mt-3 inline-block text-xs text-blue-600 font-bold hover:underline">
          Return to course directory
        </Link>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourses?.includes(course.id);

  const toggleLessonComplete = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const allLessonIds = [];
  course.syllabus?.forEach(mod => {
    mod.lessons?.forEach(les => {
      allLessonIds.push(les.id);
    });
  });
  const allLessonsChecked = allLessonIds.length > 0 && allLessonIds.every(id => completedLessons.includes(id));

  const isModuleComplete = (mod) => {
    return mod.lessons?.every(les => completedLessons.includes(les.id));
  };

  const handleOpenModuleAssessment = (modIndex) => {
    setCurrentModuleIndex(modIndex);
    const questions = [];
    for (let i = 1; i <= 20; i++) {
      questions.push({
        id: i,
        question: `Question ${i}: Regarding ${course.title} (Module ${modIndex + 1}), what is the primary standard and methodology applied according to Rwanda NISR benchmarks?`,
        options: [
          `Option A: Empirical data validation and statistical provenance`,
          `Option B: Approximate estimation without documentation`,
          `Option C: Manual estimation using unverified local samples`,
          `Option D: Theoretical extrapolation without district granularity`
        ],
        correctIndex: 0
      });
    }
    setQuizQuestions(questions);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setShowAssessmentModal(true);
  };

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score >= 17) {
      if (currentModuleIndex >= unlockedModuleLevel) {
        setUnlockedModuleLevel(currentModuleIndex + 1);
      }
    }
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("The Hub Rwanda — Course Cheat Sheet", 20, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Course: ${course.title}`, 20, 30);
    doc.text(`Sector: ${course.nisrSector || 'National Strategic Sector'}`, 20, 37);
    doc.text(`Category: ${course.category} | Difficulty: ${course.difficulty}`, 20, 44);

    let y = 58;
    doc.setFont("helvetica", "bold");
    doc.text("Core Modules & Lesson Syllabus:", 20, y);
    y += 8;

    course.syllabus?.forEach((mod, idx) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${idx + 1}. ${mod.module}`, 20, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      mod.lessons?.forEach(les => {
        doc.text(`   • ${les.title} (${les.duration})`, 25, y);
        y += 6;
        if (y > 270) { doc.addPage(); y = 20; }
      });
      y += 4;
    });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Generated by The Hub Rwanda — Data-Informed Skills Platform (NISR Aligned)", 20, 285);

    doc.save(`${course.slug}-cheat-sheet.pdf`);
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      <Link to="/courses" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-blue-700">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-white rounded-lg p-6 sm:p-10 relative overflow-hidden border border-slate-200 shadow-xs">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
              {course.category}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              Sector: {course.nisrSector}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">{course.title}</h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{course.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 font-mono">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{course.duration}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-900">{course.rating}</span>
            </span>
            <span className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{course.lessonsCount} Structured Lessons</span>
            </span>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {isEnrolled ? (
              <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enrolled & Active</span>
              </span>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onEnrollCourse(course)}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  {isGuest && <UserPlus className="w-4 h-4" />}
                  <span>{isGuest ? 'Enroll (Create Account)' : 'Enroll in Program'}</span>
                </button>
                {isGuest && (
                  <button
                    onClick={() => onLoginToEnroll ? onLoginToEnroll(course) : onEnrollCourse(course)}
                    className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-slate-500" />
                    <span>Have Account? Log In & Enroll</span>
                  </button>
                )}
              </div>
            )}

            <button
              onClick={() => onOpenAiTutor(course)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition cursor-pointer"
            >
              <Bot className="w-4 h-4 text-blue-600" />
              <span>Ask AI Coach</span>
            </button>

            {/* PDF Cheat Sheet Downloader */}
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold transition cursor-pointer"
              title="Download professional PDF summary for offline study"
            >
              <Download className="w-4 h-4 text-amber-700" />
              <span>Download PDF Cheat-Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Syllabus and Active Lesson Reader */}
      <div className="flex flex-col gap-8">
        {/* Syllabus Navigation Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-xs">
            <h3 className="font-extrabold text-slate-900 text-sm mb-3">Course Modules & Lessons</h3>

            <div className="space-y-4">
              {course.syllabus?.map((mod, modIdx) => {
                const modCompleted = isModuleComplete(mod);
                return (
                  <div key={modIdx} className="space-y-2 flex flex-col flex-wrap p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide font-mono">
                        {mod.module}
                      </h4>
                      {modCompleted && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                          Module Lessons Checked ✓
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {mod.lessons?.map((les) => {
                        const isCurrent = activeLesson?.id === les.id;
                        const isDone = completedLessons.includes(les.id) || les.completed;
                        return (
                          <button
                            key={les.id}
                            onClick={() => setActiveLesson(les)}
                            className={`w-full text-left p-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition cursor-pointer ${
                              isCurrent
                                ? 'bg-blue-600 text-white shadow-xs font-bold'
                                : 'hover:bg-slate-100 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {isDone ? (
                                <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                              ) : (
                                <Circle className={`w-4 h-4 ${isCurrent ? 'text-white/60' : 'text-slate-400'}`} />
                              )}
                              <span className="truncate">{les.title}</span>
                            </div>
                            <span className={`text-[10px] font-mono ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                              {les.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* End-Module Assessment (20 MCQs) — Appears when all lessons in this module are checked */}
                    {modCompleted && (
                      <div className="pt-2">
                        <button
                          onClick={() => handleOpenModuleAssessment(modIdx)}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer shadow-2xs"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-300" />
                          <span>Take End-Module Assessment (20 MCQs • Pass &ge; 17)</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              {allLessonsChecked ? (
                <Link
                  to="/assessments"
                  className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-2 transition cursor-pointer shadow-xs"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Take Final Course Assessment</span>
                </Link>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs text-slate-500">
                  <p className="font-semibold text-slate-700">Final Assessment Locked</p>
                  <p className="text-[11px] mt-0.5">Check off all course module lessons above to unlock the final certification exam.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lesson Interactive Reader Area */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 font-mono">Active Lesson</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {activeLesson?.title || 'Select a lesson from syllabus'}
                </h2>
              </div>

              {activeLesson && (
                <button
                  onClick={() => toggleLessonComplete(activeLesson.id)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    completedLessons.includes(activeLesson.id)
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {completedLessons.includes(activeLesson.id) ? 'Completed' : 'Mark Complete'}
                  </span>
                </button>
              )}
            </div>

            {/* Lesson Reader Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Welcome to this unit on <strong>{activeLesson?.title}</strong>. This curriculum uses real data pipelines and economic standards from the <em>National Institute of Statistics of Rwanda</em>.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Practical Exercise Concept & Formula:
                </span>
                <p className="text-blue-700 font-bold">
                  Target_Indicator = Aggregate_Measure(Dataset, Filter="NISR_Priority_Sector")
                </p>
                <p className="text-slate-600">
                  Ensure all column mappings validate against the Rwanda Statistical Standards handbook before calculating provincial indicators.
                </p>
              </div>

              <h4 className="font-bold text-slate-900 pt-2">Key Takeaways for Workplace Delivery:</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Understand the definition of labour force participation (ages 16-30 for youth cohort in Rwanda).</li>
                <li>Design applications with resilient fallbacks for intermittent connectivity.</li>
                <li>Always ground empirical claims in published statistical provenance.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onOpenAiTutor(course)}
                className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Coach about this lesson</span>
              </button>

              <Link
                to="/assessments"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
              >
                Proceed to Practical Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 20-Question End-Module Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
                  End-Module Assessment (20 Multiple Choice Questions)
                </span>
                <h3 className="text-xl font-black mt-0.5">
                  {course.syllabus?.[currentModuleIndex]?.module || 'Module Assessment'}
                </h3>
                <span className="text-xs text-slate-300">Passing Threshold: 17 / 20 correct required to advance</span>
              </div>
              <button
                onClick={() => setShowAssessmentModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
              {!quizSubmitted ? (
                <div className="space-y-6">
                  {quizQuestions.map((q, qIdx) => (
                    <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <p className="font-bold text-slate-900 text-sm">
                        {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <label key={optIdx} className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-slate-200 hover:bg-blue-50 cursor-pointer transition">
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              checked={quizAnswers[qIdx] === optIdx}
                              onChange={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                              className="text-blue-600"
                            />
                            <span className="text-xs text-slate-800 font-medium">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition shadow-xs cursor-pointer"
                  >
                    Submit Assessment ({Object.keys(quizAnswers).length} / {quizQuestions.length} Answered)
                  </button>
                </div>
              ) : (
                <div className="space-y-6 text-center py-6">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-black ${
                    quizScore >= 17 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {quizScore}/20
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {quizScore >= 17 ? 'Module Assessment Passed!' : 'Assessment Not Passed'}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      {quizScore >= 17
                        ? `Congratulations! You scored ${quizScore}/20. You have successfully met the >=17 threshold and advanced to the next module.`
                        : `You scored ${quizScore}/20. A score of 17 or higher is required to advance. Please review the lesson notes and retake the assessment.`}
                    </p>
                  </div>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => setShowAssessmentModal(false)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      {quizScore >= 17 ? 'Continue Learning' : 'Review & Retake'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
