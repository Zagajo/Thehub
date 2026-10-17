import React, { useState, useEffect } from 'react';
import { Search, BookOpen, UserPlus, LogIn } from 'lucide-react';
import CourseCard from '../components/CourseCard.jsx';
import { api } from '../services/api.js';

export default function Courses({
  user,
  onEnrollCourse,
  onLoginToEnroll,
  onOpenAuth,
  lowBandwidth
}) {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const isGuest = !user || user.id === 'guest';
  const isAdmin = user && user.role === 'admin';

  const categories = ['All', 'Technology', 'Business', 'Languages', 'Agriculture'];

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        const res = await api.getCourses({ category, difficulty, search });
        if (res && res.data) {
          setCourses(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [category, difficulty, search]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 font-sans">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Approved Curricula & Courses</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Accredited Courses & Programs
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Hands-on learning programs designed around real-world projects and National Institute of Statistics of Rwanda (NISR) workplace competencies.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by course title or skill (e.g. Python, SQL, English)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white transition"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Guidance for New Users (Strictly hidden for admin account) */}
      {isGuest && !isAdmin && (
        <div className="bg-slate-900 rounded-xl p-5 sm:p-6 text-white border border-slate-800 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <span className="text-xs font-semibold text-blue-400">
                Visitor Enrollment Guide
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                How to Enroll in Courses
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click <strong>Enroll Now</strong> on any course to create an account and immediately register for the course. If you already have an account, select <strong>Log In & Enroll</strong>.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => onOpenAuth && onOpenAuth('register')}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center space-x-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
              <button
                onClick={() => onOpenAuth && onOpenAuth('login')}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs transition flex items-center space-x-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-400" />
                <span>Log In</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">
          Loading learning programs...
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800 text-sm">No courses matching your filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the search query or selecting "All" categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={user?.enrolledCourses?.includes(course.id)}
              onEnrollClick={onEnrollCourse}
              onLoginToEnroll={onLoginToEnroll}
              isGuest={isGuest}
              lowBandwidth={lowBandwidth}
            />
          ))}
        </div>
      )}
    </div>
  );
}
