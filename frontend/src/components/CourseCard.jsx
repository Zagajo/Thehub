import React from 'react';
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
              </span>
            ))}
          </div>
        </div>

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
