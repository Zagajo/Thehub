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
  Share2
} from 'lucide-react';
import { api } from '../services/api.js';

export default function CourseDetail({ user, onEnrollCourse, onOpenAiTutor, lowBandwidth }) {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await api.getCourseBySlug(slug);
        if (res.success) {
          setCourse(res.data);
          // Set first lesson active
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
    return <div className="p-12 text-center text-xs text-slate-500">Loading course syllabus...</div>;
  }

  if (!course) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <h3 className="font-bold text-slate-800 text-sm">Course not found</h3>
        <Link to="/courses" className="mt-3 inline-block text-xs text-blue-600 font-bold">
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

  const handleDownloadCheatSheet = () => {
    const textContent = `THE HUB RWANDA - LESSON SUMMARY CHEAT SHEET\nCourse: ${course.title}\nSector: ${course.nisrSector}\nCategory: ${course.category}\n\nCore Principles:\n- Master fundamental tools with local economic data.\n- Prepare for verified assessment testing.\n- Aligned with official Rwanda NISR Labour Market Indicators.\n\nModules:\n${course.syllabus?.map(m => `- ${m.module}\n  ${m.lessons.map(l => `* ${l.title} (${l.duration})`).join('\n  ')}`).join('\n\n')}\n\nGenerated for Low-Bandwidth Study. https://thehub.rw`;
    
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${course.slug}-cheat-sheet.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-16">
      <Link to="/courses" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-blue-700">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {course.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-slate-300">
              Sector: {course.nisrSector}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{course.title}</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{course.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{course.duration}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white">{course.rating}</span>
            </span>
            <span className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>{course.lessonsCount} Structured Lessons</span>
            </span>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {isEnrolled ? (
              <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enrolled & Ready</span>
              </span>
            ) : (
              <button
                onClick={() => onEnrollCourse(course)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md"
              >
                Enroll in Program
              </button>
            )}

            <button
              onClick={() => onOpenAiTutor(course)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition"
            >
              <Bot className="w-4 h-4 text-blue-400" />
              <span>Ask AI Coach</span>
            </button>

            {/* Low-Bandwidth Cheat Sheet Downloader */}
            <button
              onClick={handleDownloadCheatSheet}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition"
              title="Download compressed plain-text summary for offline study without data usage"
            >
              <Download className="w-4 h-4" />
              <span>Download Cheat-Sheet (Offline)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Syllabus and Active Lesson Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Syllabus Navigation Column */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <h3 className="font-extrabold text-slate-900 text-sm mb-3">Course Modules & Lessons</h3>

            <div className="space-y-4">
              {course.syllabus?.map((mod, modIdx) => (
                <div key={modIdx} className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    {mod.module}
                  </h4>
                  <div className="space-y-1">
                    {mod.lessons?.map((les) => {
                      const isCurrent = activeLesson?.id === les.id;
                      const isDone = completedLessons.includes(les.id) || les.completed;
                      return (
                        <button
                          key={les.id}
                          onClick={() => setActiveLesson(les)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition ${
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
                          <span className={`text-[10px] ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                            {les.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/assessments"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-2 transition"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Take Course Assessment</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Lesson Interactive Reader Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Active Lesson</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {activeLesson?.title || 'Select a lesson from syllabus'}
                </h2>
              </div>

              {activeLesson && (
                <button
                  onClick={() => toggleLessonComplete(activeLesson.id)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    completedLessons.includes(activeLesson.id)
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
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

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs text-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Practical Exercise Concept & Formula:
                </span>
                <p className="text-blue-900 font-bold">
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
                className="inline-flex items-center space-x-2 text-xs font-bold text-blue-700 hover:underline"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Coach about this lesson</span>
              </button>

              <Link
                to="/assessments"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition"
              >
                Proceed to Practical Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
