import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CourseCard({ course, isEnrolled, onEnrollClick, lowBandwidth }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Visual Header / Thumbnail (hidden or optimized in low-bandwidth mode) */}
      {!lowBandwidth ? (
        <div className="h-44 relative overflow-hidden bg-slate-900">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
              {course.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-600/90 backdrop-blur-md text-white">
              {course.difficulty}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold">{course.rating}</span>
              <span className="text-slate-300">({course.enrollmentCount})</span>
            </div>
            <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">{course.category}</span>
          <span className="text-xs text-slate-600">{course.duration}</span>
        </div>
      )}

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* NISR Sector Alignment Tag */}
          <div className="mb-2">
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60 inline-block">
              Sector: {course.nisrSector}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition">
            {course.title}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {course.tagline || course.description}
          </p>

          {/* Key skills tags */}
          <div className="mt-3 flex flex-wrap gap-1">
            {course.skillsGained?.slice(0, 3).map((skill, i) => (
              <span key={i} className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/courses/${course.slug || course.id}`}
            className="text-xs font-semibold text-slate-700 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>View Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {isEnrolled ? (
            <Link
              to={`/courses/${course.slug || course.id}`}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Enrolled</span>
            </Link>
          ) : (
            <button
              onClick={() => onEnrollClick(course)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs hover:shadow"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
