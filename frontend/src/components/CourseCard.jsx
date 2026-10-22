import React from 'react';
<<<<<<< HEAD
import { Clock, BarChart, User, CheckCircle2, ArrowRight, Zap, Sparkles } from 'lucide-react';

export const CourseCard = ({ course, onSelectCourse, isEnrolled }) => {
  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'text-blue-700 bg-blue-100/90 border-blue-300';
      case 'Intermediate':
        return 'text-amber-800 bg-amber-100/90 border-amber-300';
      case 'Advanced':
        return 'text-red-700 bg-red-100/90 border-red-300 font-bold';
      default:
        return 'text-slate-700 bg-slate-200 border-slate-300';
    }
  };

  return (
    <div className="bg-slate-200/50 hover:bg-slate-200/90 border border-slate-300 hover:border-blue-500/60 rounded-2xl overflow-hidden flex flex-col justify-between group transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/10 transition-all duration-300 backdrop-blur-sm relative">
      {/* Futuristic top hairline accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-900 via-blue-600 to-red-600 opacity-60 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Real Thumbnail with smooth animated zoom */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-300">
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-80" />

          {/* Top category pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-lg bg-slate-900/85 backdrop-blur-md text-white border border-blue-400/30 shadow-sm">
              {course.category}
            </span>
          </div>

          {/* Difficulty & Time metrics */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white drop-shadow">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {course.estimated_hours}h duration
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border shadow-sm ${getDifficultyBadge(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2.5">
          <h3 className="text-sm font-extrabold text-blue-950 group-hover:text-blue-700 transition-colors leading-snug line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {course.short_description || course.description}
          </p>

          {/* Skills Gained Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-1">
            {course.skillsGained?.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-[10px] font-mono text-slate-700 bg-slate-300/70 group-hover:bg-blue-100/60 rounded-md border border-slate-300/80 transition-colors"
              >
                {skill}
=======
import { Link } from 'react-router-dom';
import { Clock, Star, ArrowRight, CheckCircle2, LogIn, UserPlus } from 'lucide-react';

export default function CourseCard({
  course,
  isEnrolled,
  onEnrollClick,
  onLoginToEnroll,
  isGuest = false,
  lowBandwidth
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col overflow-hidden group">
      {/* Thumbnail */}
      {!lowBandwidth ? (
        <div className="h-44 relative overflow-hidden bg-slate-100">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          <div className="absolute top-3 left-3 flex items-center space-x-1.5 text-[11px] font-medium text-slate-800 bg-white/95 border border-slate-200 px-2.5 py-0.5 rounded-md shadow-xs">
            <span>{course.category}</span>
            <span>·</span>
            <span className="font-semibold text-blue-700">{course.difficulty}</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <div className="flex items-center space-x-1 bg-slate-900/80 px-2 py-0.5 rounded shadow-xs">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-slate-300">({course.enrollmentCount})</span>
            </div>
            <div className="flex items-center space-x-1 bg-slate-900/80 px-2 py-0.5 rounded shadow-xs">
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{course.category}</span>
          <span className="text-xs text-slate-500">{course.duration}</span>
        </div>
      )}

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Sector Tag */}
          <div className="mb-2 text-xs font-medium text-blue-700">
            <span>Sector: {course.nisrSector}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition">
            {course.title}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {course.tagline || course.description}
          </p>

          {/* Key skills tags */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            {course.skillsGained?.slice(0, 3).map((skill, i) => (
              <span key={i} className="inline-flex items-center">
                {i > 0 && <span className="text-slate-300 mr-1.5">·</span>}
                <span className="font-medium text-slate-700">{skill}</span>
>>>>>>> bf53632cf4d649f83a661a098be828d1230469b5
              </span>
            ))}
          </div>
        </div>
<<<<<<< HEAD
      </div>

      {/* Footer and Interactive Action CTA */}
      <div className="p-4 pt-3 border-t border-slate-300/80 flex items-center justify-between text-xs bg-slate-200/30">
        <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
          <User className="w-3.5 h-3.5 text-blue-800" />
          <span className="truncate max-w-[105px] font-medium">{course.instructor_name}</span>
        </div>

        <button
          onClick={() => onSelectCourse(course)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all duration-200 active:scale-95 shadow-sm ${
            isEnrolled
              ? 'bg-blue-900/10 text-blue-900 border border-blue-700/30 hover:bg-blue-900/20'
              : 'bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white shadow-blue-950/20 hover:shadow-md'
          }`}
        >
          {isEnrolled ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <span>Select Course</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
=======

        {/* Card Footer Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <Link
              to={`/courses/${course.slug || course.id}`}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center space-x-1"
            >
              <span>View Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {isEnrolled ? (
              <Link
                to={`/courses/${course.slug || course.id}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Enrolled</span>
              </Link>
            ) : (
              <button
                onClick={() => onEnrollClick && onEnrollClick(course)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer flex items-center space-x-1"
                title={isGuest ? 'New user? Click to create account & enroll' : 'Enroll in course'}
              >
                {isGuest ? <UserPlus className="w-3.5 h-3.5" /> : null}
                <span>Enroll Now</span>
              </button>
            )}
          </div>

          {/* If user is guest and not enrolled: offer quick Log In & Enroll option */}
          {isGuest && !isEnrolled && (
            <div className="pt-2 border-t border-dashed border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Already registered?</span>
              <button
                onClick={() => onLoginToEnroll ? onLoginToEnroll(course) : onEnrollClick(course)}
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center space-x-1 cursor-pointer"
              >
                <LogIn className="w-3 h-3" />
                <span>Log In & Enroll</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
>>>>>>> bf53632cf4d649f83a661a098be828d1230469b5
