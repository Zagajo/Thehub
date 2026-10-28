import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  CheckCircle2,
  Lock,
  Award,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ChevronRight,
  RotateCcw,
  Check,
  X,
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import { technicalAssessments, PASSING_SCORE_PERCENTAGE } from '../data/assessmentsData';

export default function Assessments({ user, onOpenAuth, setActiveTab }) {
  const [assessments, setAssessments] = useState(technicalAssessments);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);
  const [catalogFilter, setCatalogFilter] = useState('enrolled'); // 'enrolled' | 'all'
  const [enrollToast, setEnrollToast] = useState(null);

  // Active assessment state
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'correct' | 'incorrect'

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    async function fetchData() {
      try {
        const [assessList, courseList, enList] = await Promise.all([
          api.getAssessments(),
          api.getCourses(),
          api.getEnrollments(user.id)
        ]);
        if (assessList && assessList.length > 0) {
          setAssessments(assessList);
        }
        setCourses(courseList || []);
        const loadedEnrollments = enList || [];
        setEnrollments(loadedEnrollments);

        // If user has zero enrollments, default filter to 'all' so they can see available courses to enroll in
        if (loadedEnrollments.length === 0) {
          setCatalogFilter('all');
        }
      } catch (err) {
        console.warn('Assessments data fetch warning, using fallback data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  // Set of enrolled course IDs
  const enrolledCourseIds = new Set(enrollments.map(e => e.courseId));
  const isEnrolledInCourse = (courseId) => enrolledCourseIds.has(courseId);

  // Filtered assessments
  const enrolledAssessments = assessments.filter(a => isEnrolledInCourse(a.courseId));
  const displayedAssessments = catalogFilter === 'enrolled' ? enrolledAssessments : assessments;

  const handleStartAssessment = (assessment) => {
    // Strict enforcement: Users can only access assessments of courses they enrolled in
    if (!isEnrolledInCourse(assessment.courseId)) {
      setEnrollToast(`You must be enrolled in "${assessment.title}" to take this assessment.`);
      setTimeout(() => setEnrollToast(null), 4000);
      return;
    }

    setSelectedAssessment(assessment);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setReviewFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnrollAndStart = async (assessment) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setEnrollingCourseId(assessment.courseId);
    try {
      const course = courses.find(c => c.id === assessment.courseId);
      const courseTitle = course ? course.title : assessment.title;
      const res = await api.enrollCourse(user.id, assessment.courseId, courseTitle);
      const updatedList = res.enrollments || [...enrollments, { userId: user.id, courseId: assessment.courseId, courseTitle }];
      setEnrollments(updatedList);
      setEnrollToast(`Enrolled in "${courseTitle}"! Assessment unlocked.`);
      setTimeout(() => setEnrollToast(null), 3000);

      // Start the assessment directly
      setSelectedAssessment(assessment);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setResult(null);
      setReviewFilter('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Enrollment error:', err);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const handleSelectOption = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (selectedAssessment && currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmitAssessment = async () => {
    if (!selectedAssessment) return;
    setSubmitting(true);
    try {
      const res = await api.submitAssessment(
        selectedAssessment.id,
        user ? user.id : 'guest',
        answers
      );
      setResult(res);

      // If passed, record into local Skill Passport cache for instant display
      if (res.passed && user) {
        const passportKey = `hub_passport_assessments_${user.id}`;
        const existing = JSON.parse(localStorage.getItem(passportKey) || '[]');
        const entry = {
          id: 'asmt-result-' + Date.now(),
          assessmentId: selectedAssessment.id,
          title: selectedAssessment.title,
          category: selectedAssessment.category,
          scorePercentage: res.percentage,
          correctCount: res.correctCount,
          totalQuestions: res.totalQuestions,
          passed: true,
          completedAt: new Date().toISOString()
        };
        existing.unshift(entry);
        localStorage.setItem(passportKey, JSON.stringify(existing));
      }
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (e) {
      console.error('Error submitting assessment:', e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setResult(null);
    setCurrentQuestionIndex(0);
    setReviewFilter('all');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 font-sans">
        <div className="w-12 h-12 bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border border-slate-300">
          <Lock className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
            Authentication Required
          </span>
          <h2 className="text-3xl font-light text-slate-900">
            Sign In to Access <span className="font-bold">Technical Assessments</span>
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Per national digital qualification standards, learners can only access assessments of courses they have actively enrolled in. Evaluations are graded against the official 80% pass mark.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors shadow-xs"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  // Active Assessment Question Flow View
  if (selectedAssessment) {
    // Guard check: verify user is enrolled in this course
    const enrolledInThis = isEnrolledInCourse(selectedAssessment.courseId);
    if (!enrolledInThis) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 font-sans">
          <div className="w-14 h-14 bg-amber-50 text-amber-700 border border-amber-300 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-amber-700 tracking-wider font-semibold">
              Course Enrollment Required
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Access Restricted to Enrolled Learners
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              Users can only access assessments of courses they have actively enrolled in. Enroll in <strong>{selectedAssessment.title}</strong> to unlock this 15-question diagnostic evaluation.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => handleEnrollAndStart(selectedAssessment)}
              disabled={enrollingCourseId === selectedAssessment.courseId}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>{enrollingCourseId === selectedAssessment.courseId ? 'Enrolling...' : 'Enroll in Course & Unlock'}</span>
            </button>
            <button
              onClick={() => setSelectedAssessment(null)}
              className="px-5 py-3 bg-white border border-slate-300 text-slate-700 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      );
    }

    const questions = selectedAssessment.questions || [];
    const totalQuestions = questions.length || 15;
    const currentQ = questions[currentQuestionIndex];
    const isCurrentAnswered = answers[currentQuestionIndex] !== undefined;
    const answeredCount = Object.keys(answers).length;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200 font-sans">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => setSelectedAssessment(null)}
            className="hover:text-blue-600 transition-colors"
          >
            Assessments
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-medium truncate">{selectedAssessment.title}</span>
        </nav>

        {/* Back and Title Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-blue-700 font-semibold tracking-wider">
                {selectedAssessment.category}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                ✓ Enrolled Learner Verified
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Pass Mark: 80% (12/15)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {selectedAssessment.title}
            </h1>
          </div>
          <button
            onClick={() => setSelectedAssessment(null)}
            className="px-3.5 py-1.5 bg-white border border-slate-300 text-slate-700 hover:text-blue-600 font-mono text-xs uppercase tracking-wider font-semibold transition-colors shrink-0"
          >
            ← Exit Assessment
          </button>
        </div>

        {/* RESULTS SCREEN (When Submitted) */}
        {result ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Grade Summary Banner */}
            <div
              className={`p-6 sm:p-8 border rounded-xl text-center space-y-4 ${
                result.passed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  {result.passed ? 'Benchmark Standard Met' : 'Benchmark Not Met'}
                </span>
                <div className="flex items-baseline justify-center gap-2">
                  <div
                    className={`text-5xl sm:text-6xl font-light font-mono tabular-nums font-bold ${
                      result.passed ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {result.percentage}%
                  </div>
                  <span className="text-sm font-mono text-slate-500">
                    ({result.correctCount} / {result.totalQuestions} Correct)
                  </span>
                </div>
              </div>

              <div className="max-w-xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border">
                  {result.passed ? (
                    <span className="bg-emerald-100 text-emerald-800 border-emerald-300 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> PASSED (≥80% Pass Mark)
                    </span>
                  ) : (
                    <span className="bg-rose-100 text-rose-800 border-rose-300 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> DID NOT MEET 80% PASS MARK
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {result.passed ? (
                    <>
                      Congratulations! Your score of <strong>{result.percentage}%</strong> meets or exceeds the required <strong>80% pass mark</strong> (minimum 12/15 questions). This diagnostic benchmark has been recorded to your Skill Passport.
                    </>
                  ) : (
                    <>
                      You scored <strong>{result.percentage}%</strong> ({result.correctCount} out of 15 questions correct). The national qualification benchmark requires at least <strong>80% (12 / 15 correct)</strong>. Review your answers below and retake the evaluation.
                    </>
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleRetake}
                  className="px-5 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>
                {result.passed && (
                  <button
                    onClick={() => {
                      if (setActiveTab) setActiveTab('passport');
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View in Skill Passport</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedAssessment(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  All Assessments
                </button>
              </div>
            </div>

            {/* Detailed Question Review Header with Filter */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Comprehensive Question Review & Grading Breakdown
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    All 15 questions graded with verified answers and explanations
                  </p>
                </div>
                {/* Filter buttons */}
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-md text-xs font-mono">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      reviewFilter === 'all'
                        ? 'bg-white text-slate-900 font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({result.totalQuestions})
                  </button>
                  <button
                    onClick={() => setReviewFilter('correct')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      reviewFilter === 'correct'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Correct ({result.correctCount})
                  </button>
                  <button
                    onClick={() => setReviewFilter('incorrect')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      reviewFilter === 'incorrect'
                        ? 'bg-rose-600 text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Incorrect ({result.totalQuestions - result.correctCount})
                  </button>
                </div>
              </div>

              {/* Review Question List */}
              <div className="space-y-4">
                {result.review
                  .filter((item) => {
                    if (reviewFilter === 'correct') return item.isCorrect;
                    if (reviewFilter === 'incorrect') return !item.isCorrect;
                    return true;
                  })
                  .map((item) => {
                    const originalQNum = item.questionId;
                    return (
                      <div
                        key={item.questionId}
                        className={`p-4 rounded-lg border text-xs space-y-3 transition-colors ${
                          item.isCorrect
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-rose-50/50 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                item.isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-600 text-white'
                              }`}
                            >
                              {item.isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                            </span>
                            <span className="font-mono font-bold text-slate-900">
                              Question {originalQNum} of 15
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {item.topic}
                            </span>
                          </div>
                          <span
                            className={`font-mono font-bold uppercase text-[10px] px-2 py-0.5 rounded border ${
                              item.isCorrect
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : 'bg-rose-100 text-rose-800 border-rose-300'
                            }`}
                          >
                            {item.isCorrect ? 'Correct' : 'Needs Review'}
                          </span>
                        </div>

                        <p className="text-slate-900 font-medium text-xs leading-relaxed">
                          {item.prompt}
                        </p>

                        {/* Options breakdown */}
                        <div className="space-y-1.5 pl-2 border-l-2 border-slate-200">
                          {item.options.map((opt, optIdx) => {
                            const isSelected = item.selectedOption === optIdx;
                            const isCorrectOpt = item.correctIndex === optIdx;
                            let style = 'bg-white border-slate-200 text-slate-700';
                            if (isCorrectOpt) {
                              style = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-semibold';
                            } else if (isSelected && !item.isCorrect) {
                              style = 'bg-rose-100 border-rose-300 text-rose-950 line-through';
                            }

                            return (
                              <div
                                key={optIdx}
                                className={`p-2 rounded border flex items-center justify-between text-xs ${style}`}
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono font-bold text-[11px] text-slate-500">
                                    {String.fromCharCode(65 + optIdx)}.
                                  </span>
                                  <span>{opt}</span>
                                </div>
                                <div className="shrink-0 pl-2">
                                  {isCorrectOpt && (
                                    <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300">
                                      Correct Answer
                                    </span>
                                  )}
                                  {isSelected && !isCorrectOpt && (
                                    <span className="text-[10px] font-mono uppercase text-rose-700 font-bold bg-white px-1.5 py-0.5 rounded border border-rose-300">
                                      Your Choice
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="p-3 bg-white border border-slate-200 rounded text-[11px] text-slate-700 space-y-1 leading-relaxed">
                          <div className="font-mono font-bold text-slate-900 flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                            <span>Technical Standard Explanation:</span>
                          </div>
                          <p>{item.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          /* STEP-BY-STEP QUESTION TRACKER AND INTERFACE */
          <div className="space-y-6">
            {/* Top Tracker: Question Counter, Progress Bar, and Number Grid */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-blue-700 text-sm">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600">
                    {answeredCount} of {totalQuestions} Answered
                  </span>
                </div>
                <div className="text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pass Threshold: 80% (12 / 15)</span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* 15-Question Number Navigation Grid */}
              <div className="pt-1">
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2">
                  Question Tracker (click number to jump):
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5">
                  {questions.map((_, idx) => {
                    const isCurrent = currentQuestionIndex === idx;
                    const isAnswered = answers[idx] !== undefined;

                    let btnClass = 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400';
                    if (isCurrent) {
                      btnClass = 'bg-blue-600 text-white font-bold border-blue-600 ring-2 ring-blue-300';
                    } else if (isAnswered) {
                      btnClass = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`h-8 rounded text-xs font-mono transition-all flex items-center justify-center border ${btnClass}`}
                        title={`Go to Question ${idx + 1} of 15 ${isAnswered ? '(Answered)' : '(Not answered)'}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Current Question Card */}
            {currentQ && (
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl space-y-6 shadow-2xs">
                {/* Question Topic & Header */}
                <div className="space-y-2 border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-blue-700 tracking-wider bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                      Question {currentQuestionIndex + 1} of 15 · {currentQ.topic}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {isCurrentAnswered ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Answered
                        </span>
                      ) : (
                        'Awaiting selection'
                      )}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug pt-1">
                    {currentQ.prompt}
                  </h2>
                </div>

                {/* 4 Radio Options */}
                <div className="space-y-3">
                  {currentQ.options.map((optionText, optIdx) => {
                    const isSelected = answers[currentQuestionIndex] === optIdx;
                    return (
                      <label
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`flex items-start space-x-3.5 p-4 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-600 ring-1 ring-blue-500 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          <input
                            type="radio"
                            name={`q_${currentQuestionIndex}`}
                            checked={isSelected}
                            onChange={() => handleSelectOption(optIdx)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 text-xs sm:text-sm text-slate-800 leading-relaxed">
                          <span className="font-mono font-bold text-slate-500 mr-2">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{optionText}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Navigation and Next/Submit Action Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="text-xs font-mono text-slate-500 order-last sm:order-none">
                    {answeredCount} / {totalQuestions} answered
                  </div>

                  {currentQuestionIndex < totalQuestions - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Next ({currentQuestionIndex + 2}/{totalQuestions})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitAssessment}
                      disabled={submitting}
                      className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Grading Answers...' : 'Submit & Grade Assessment'}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ASSESSMENTS CATALOG LISTING VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200 font-sans">
      {/* Toast Notification */}
      {enrollToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-lg shadow-xl border border-slate-700 text-xs font-mono flex items-center space-x-2 animate-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{enrollToast}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">The Hub</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-medium">Technical Assessments & Diagnostic Benchmarks</span>
      </nav>

      {/* Enterprise Header */}
      <div className="bg-white border border-slate-200 p-8 space-y-4 rounded-xl shadow-2xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-blue-700 font-mono tracking-wider uppercase font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>Benchmark Diagnostics</span>
            <span aria-hidden="true">·</span>
            <span>Rwanda Technical Standards</span>
            <span aria-hidden="true">·</span>
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              80% Pass Mark
            </span>
            <span aria-hidden="true">·</span>
            <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
              Enrollment Gated
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            Technical Assessments & <span className="font-bold">Diagnostics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Take structured 15-question technical diagnostic assessments with step-by-step navigation (1/15 to 15/15) and rigorous grading. <strong>Per platform policy, users can only access assessments of courses they have actively enrolled in.</strong> The pass mark is set to <strong>80% (12 / 15 correct)</strong>.
          </p>
        </div>
      </div>

      {/* Enrollment Notice & Catalog Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono">
          <button
            onClick={() => setCatalogFilter('enrolled')}
            className={`px-3.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              catalogFilter === 'enrolled'
                ? 'bg-blue-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>My Enrolled Course Assessments ({enrolledAssessments.length})</span>
          </button>
          <button
            onClick={() => setCatalogFilter('all')}
            className={`px-3.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              catalogFilter === 'all'
                ? 'bg-blue-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>All Catalog Diagnostics ({assessments.length})</span>
          </button>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Enrolled in <span className="font-bold text-slate-900">{enrolledCourseIds.size}</span> of {courses.length || assessments.length} courses
        </div>
      </div>

      {/* Empty State when 'enrolled' filter is selected and user has no enrollments */}
      {catalogFilter === 'enrolled' && enrolledAssessments.length === 0 && (
        <div className="bg-white border border-slate-200 p-10 rounded-xl text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 border border-amber-200 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              No Course Enrollments Found Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Users can only access assessments of courses they have enrolled in. Browse the full diagnostic catalog below to enroll in your first course and unlock its assessment.
            </p>
          </div>
          <button
            onClick={() => setCatalogFilter('all')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors rounded-md shadow-2xs"
          >
            Browse All Available Courses & Assessments
          </button>
        </div>
      )}

      {/* Assessment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedAssessments.map((assessment) => {
          const isEnrolled = isEnrolledInCourse(assessment.courseId);
          const course = courses.find(c => c.id === assessment.courseId);

          return (
            <div
              key={assessment.id}
              className={`bg-white border rounded-xl p-6 space-y-4 flex flex-col justify-between transition-all shadow-2xs ${
                isEnrolled
                  ? 'border-slate-200 hover:border-blue-600 hover:shadow-md'
                  : 'border-slate-200 bg-slate-50/60 opacity-95'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase text-blue-700 font-semibold tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {assessment.category}
                  </span>
                  {isEnrolled ? (
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Enrolled
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-600" /> Locked
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {assessment.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {assessment.description || `${assessment.questionsCount || 15} comprehensive technical questions tracked step-by-step with instant grading.`}
                </p>

                <div className="text-[11px] font-mono text-slate-500 pt-1 flex flex-wrap gap-2">
                  <span>{assessment.questionsCount || 15} Questions</span>
                  <span>·</span>
                  <span>{assessment.duration || '30 mins'}</span>
                  <span>·</span>
                  <span className="text-slate-700 font-semibold">Pass: 80% (12/15)</span>
                </div>

                {!isEnrolled && (
                  <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-md text-[11px] text-amber-900 leading-relaxed font-mono flex items-start gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Access locked. You can only access this assessment after enrolling in the course.
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-xs font-mono text-slate-500">
                  {isEnrolled ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-slate-400">Not enrolled</span>
                  )}
                </div>

                {isEnrolled ? (
                  <button
                    onClick={() => handleStartAssessment(assessment)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5 shadow-2xs rounded-md"
                  >
                    <span>Start (1/15)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnrollAndStart(assessment)}
                    disabled={enrollingCourseId === assessment.courseId}
                    className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5 shadow-2xs rounded-md"
                    title="Enroll in this course to unlock its 15-question diagnostic assessment"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{enrollingCourseId === assessment.courseId ? 'Enrolling...' : 'Enroll to Access'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
