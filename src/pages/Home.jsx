import React from 'react';
import {
  BookOpen,
  Award,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Users,
  Layers,
  Sparkles,
  ExternalLink,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Home({ setActiveTab, user, onOpenAuth }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-12 pb-24 bg-slate-50 text-slate-900 min-h-screen font-sans">
      {/* IBM Carbon Enterprise Hero */}
      <section className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
            <span className="text-blue-700 font-semibold">{t('hero_kicker', 'National Skills Platform · NISR Labour Evidence Aligned')}</span>
            <span aria-hidden="true">·</span>
            <span>Mastery Gated Curriculum</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-900">
                {t('hero_title', 'The Hub')} <span className="font-bold text-blue-900">{t('hero_title_highlight', 'Enterprise Learning')}</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
                {t('hero_desc', 'A data-informed technical training and credentialing platform engineered around official National Institute of Statistics of Rwanda (NISR) labour demand. Features in-depth subtopic notes, mandatory 10-question module mastery quizzes, deterministic career paths, and bilingual peer study circles.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('courses')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <span>{t('btn_explore_curriculum', 'Explore Curriculum')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('paths')}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <span>{t('btn_career_paths', 'Career Pathways')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* IBM Carbon Style Metric Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveTab('courses')}
            className="bg-white border border-slate-200 p-6 space-y-3 hover:border-blue-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-500 font-mono text-xs">
              <span className="uppercase tracking-wider">{t('metric_curriculum', 'Modular Curriculum')}</span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-light text-slate-900 font-mono tabular-nums">10 Q / Mod</div>
            <div className="text-xs text-slate-500 font-mono">{t('metric_curriculum_sub', 'End-of-Module Quiz (≥8/10 to advance)')}</div>
          </div>

          <div
            onClick={() => setActiveTab('paths')}
            className="bg-white border border-slate-200 p-6 space-y-3 hover:border-blue-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-500 font-mono text-xs">
              <span className="uppercase tracking-wider">{t('metric_paths', 'Career Paths')}</span>
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-light text-slate-900 font-mono tabular-nums">Deterministic</div>
            <div className="text-xs text-slate-500 font-mono">{t('metric_paths_sub', 'Skill gap analysis & capstone briefs')}</div>
          </div>

          <div
            onClick={() => setActiveTab('peer-matching')}
            className="bg-white border border-slate-200 p-6 space-y-3 hover:border-blue-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-500 font-mono text-xs">
              <span className="uppercase tracking-wider">{t('metric_connect', 'Connect Pillar')}</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-light text-slate-900 font-mono tabular-nums">40 Min</div>
            <div className="text-xs text-slate-500 font-mono">{t('metric_connect_sub', 'Structured bilingual study sessions')}</div>
          </div>

          <div
            onClick={() => setActiveTab('nisr')}
            className="bg-white border border-slate-200 p-6 space-y-3 hover:border-blue-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-500 font-mono text-xs">
              <span className="uppercase tracking-wider">{t('metric_nisr', 'NISR LFS')}</span>
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-light text-slate-900 font-mono tabular-nums">38.6%</div>
            <div className="text-xs text-slate-500 font-mono">{t('metric_nisr_sub', 'Services sector employment share')}</div>
          </div>
        </div>
      </section>

      {/* Core Platform Capabilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
              Platform Architecture
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Enterprise Capability Pillars
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">The Hub Rwanda System</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => setActiveTab('courses')}
            className="bg-white border border-slate-200 p-8 space-y-4 hover:border-blue-600 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-8 h-8 bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Subtopic Explanatory Notes & Module Mastery Quizzes
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Every course module includes dedicated subtopics with deep conceptual notes, practical code examples, and local economic context. Completion requires scoring at least 8/10 on the end-of-module assessment before unlocking subsequent modules.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-1.5 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider">
              <span>View Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setActiveTab('paths')}
            className="bg-white border border-slate-200 p-8 space-y-4 hover:border-blue-600 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-8 h-8 bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Data-Informed Learning Pathways
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Deterministic career tracks aligned with NISR national labour statistics. Compare your assessed profile against target benchmarks, identify critical gaps, and execute evaluated capstone projects.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-1.5 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider">
              <span>Explore Pathways</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setActiveTab('peer-matching')}
            className="bg-white border border-slate-200 p-8 space-y-4 hover:border-blue-600 transition-colors cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-8 h-8 bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Peer Learning & Language Exchange
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Connect with Rwandan peers for structured 40-minute bilingual language exchanges (Technical English & Kinyarwanda) and join curated cohort study circles across engineering domains.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center space-x-1.5 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider">
              <span>Find Study Partner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Phase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-blue-700 tracking-wider font-semibold">
              Learner Lifecycle
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Verified Progression Workflow
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Standard Operating Protocol</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 space-y-3">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Stage 01</div>
            <h4 className="text-sm font-bold text-slate-900">Identity & National Passport</h4>
            <p className="text-slate-600 text-xs font-normal leading-relaxed">
              Register with district credentials to generate your unique cryptographic Hub Passport ID (e.g. HUB-RW-88392).
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-3">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Stage 02</div>
            <h4 className="text-sm font-bold text-slate-900">Study Subtopics & Lectures</h4>
            <p className="text-slate-600 text-xs font-normal leading-relaxed">
              Engage with explanatory conceptual notes, real-world Rwandan case examples, and video lecture demonstrations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-3">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Stage 03</div>
            <h4 className="text-sm font-bold text-slate-900">Mastery Quizzes (≥8/10)</h4>
            <p className="text-slate-600 text-xs font-normal leading-relaxed">
              Complete the 10-question evaluation at the end of each module. Achieving at least 8/10 unlocks the next progression stage.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-3">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Stage 04</div>
            <h4 className="text-sm font-bold text-slate-900">SHA-256 Verified Credentials</h4>
            <p className="text-slate-600 text-xs font-normal leading-relaxed">
              Upon passing all course modules, generate your cryptographic certificate with scannable QR verification and employer matching.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
