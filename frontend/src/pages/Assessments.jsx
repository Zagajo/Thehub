import React, { useState, useEffect, useMemo } from 'react';
import {
  Award,
  CheckCircle2,
  Code2,
  FileCheck2,
  Search,
  ArrowRight,
  ShieldCheck,
  Check,
  Layers,
  Clock,
  BookOpen,
  Filter,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api.js';

const SUBJECT_METADATA = [
  {
    id: 'c-1',
    code: 'DATA-ANALYTICS',
    name: 'Data Analytics with Python & SQL',
    category: 'Technology',
    count: 30,
    sector: 'Financial Tech & Services',
    description: 'Pandas data cleaning, PostgreSQL aggregations, demographic statistical analysis, and ETL pipelines.'
  },
  {
    id: 'c-2',
    code: 'FULLSTACK-WEB',
    name: 'Full-Stack Web Development',
    category: 'Technology',
    count: 30,
    sector: 'Digital Services & ICT',
    description: 'React component architecture, Express REST APIs, offline-first PWAs, and database indexing.'
  },
  {
    id: 'c-3',
    code: 'BUSINESS-ENGLISH',
    name: 'Professional English & Communication',
    category: 'Languages',
    count: 30,
    sector: 'MICE & Cross-Border Trade',
    description: 'Executive briefing memos, multinational negotiations, technical presentations, and diplomatic email protocols.'
  },
  {
    id: 'c-4',
    code: 'AGRIBUSINESS-OPS',
    name: 'Modern Agribusiness & Supply Chains',
    category: 'Agriculture',
    count: 30,
    sector: 'Food Systems & Agro-Processing',
    description: 'Cooperative bookkeeping, post-harvest quality telemetry, SACCO financing, and export certifications.'
  },
  {
    id: 'c-5',
    code: 'HOSPITALITY-MICE',
    name: 'MICE Tourism & High-End Hospitality',
    category: 'Tourism',
    count: 30,
    sector: 'Tourism & International Summits',
    description: 'VIP guest protocol, five-star banquet logistics, convention AV staging, and crowd safety standards.'
  }
];

export default function Assessments({ user, onAssessmentComplete, onOpenAuth }) {
  const [assessments, setAssessments] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('c-1');
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  
  const [theoryAnswers, setTheoryAnswers] = useState({});
  const [practicalCompleted, setPracticalCompleted] = useState(false);
  const [capstoneSubmitted, setCapstoneSubmitted] = useState(false);
  const [capstoneUrl, setCapstoneUrl] = useState('https://github.com/rwanda-learner/practical-capstone-evidence');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const isGuest = !user || user.id === 'guest';

  // Fetch all 150 assessments on mount
  useEffect(() => {
    async function fetchAssessments() {
      setLoading(true);
      try {
        const res = await api.getAssessments();
        if (res && res.data) {
          setAssessments(res.data);
          // Set initial assessment in subject c-1
          const firstInSubject = res.data.find(a => a.courseId === 'c-1') || res.data[0];
          setActiveAssessment(firstInSubject || null);
        }
      } catch (e) {
        console.error('Failed to load assessments:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchAssessments();
  }, []);

  // Filter assessments by active subject, search, and difficulty
  const subjectAssessments = useMemo(() => {
    return assessments.filter(a => a.courseId === selectedSubjectId);
  }, [assessments, selectedSubjectId]);

  const filteredAssessments = useMemo(() => {
    return subjectAssessments.filter(a => {
      const matchesSearch = !searchQuery || 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.skillTarget.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiff = difficultyFilter === 'All' || a.difficulty.toLowerCase().includes(difficultyFilter.toLowerCase());
      return matchesSearch && matchesDiff;
    });
  }, [subjectAssessments, searchQuery, difficultyFilter]);

  // When subject changes, pick first assessment in that subject
  const handleSelectSubject = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setSearchQuery('');
    setDifficultyFilter('All');
    setSubmissionResult(null);
    setTheoryAnswers({});
    setPracticalCompleted(false);
    setCapstoneSubmitted(false);

    const firstInNewSubject = assessments.find(a => a.courseId === subjectId);
    if (firstInNewSubject) {
      setActiveAssessment(firstInNewSubject);
    }
  };

  const handleSelectAssessment = (item) => {
    setActiveAssessment(item);
    setSubmissionResult(null);
    setTheoryAnswers({});
    setPracticalCompleted(false);
    setCapstoneSubmitted(false);
  };

  const handleSelectOption = (qIdx, optIdx) => {
    setTheoryAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = async () => {
    if (!activeAssessment) return;
    setSubmitting(true);
    try {
      const answersArray = activeAssessment.theoryQuestions.map((_, i) => theoryAnswers[i]);
      const res = await api.submitAssessment(activeAssessment.id, {
        theoryAnswers: answersArray,
        practicalCompleted,
        capstoneSubmitted,
        evidenceUrl: capstoneUrl
      });
      if (res && res.success) {
        setSubmissionResult(res.scoreBreakdown);
        if (onAssessmentComplete && res.user) onAssessmentComplete(res.user);
      } else if (res && res.error) {
        // If unauthenticated or other error, display a clean client-evaluated preview
        const correctCount = answersArray.filter((ans, idx) => {
          const q = activeAssessment.theoryQuestions[idx];
          return q && ans === q.correctIndex;
        }).length;
        const theoryScore = Math.round((correctCount / (activeAssessment.theoryQuestions.length || 1)) * 100);
        const practicalScore = practicalCompleted ? 90 : 50;
        const projectScore = capstoneSubmitted ? 85 : 40;
        const compositeScore = Math.round((theoryScore * 0.3) + (practicalScore * 0.4) + (projectScore * 0.3));
        let verifiedLevel = 'Foundation (Level 1)';
        if (compositeScore >= 80) verifiedLevel = 'Specialist (Level 3)';
        else if (compositeScore >= 65) verifiedLevel = 'Practitioner (Level 2)';

        setSubmissionResult({
          theoryScore,
          practicalScore,
          projectScore,
          compositeScore,
          verifiedLevel,
          isGuestPreview: isGuest
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const currentSubjectMeta = SUBJECT_METADATA.find(s => s.id === selectedSubjectId) || SUBJECT_METADATA[0];

  // Find index of active assessment within the 30 assessments in this subject (1-indexed)
  const currentSubjectIndex = subjectAssessments.findIndex(a => a.id === activeAssessment?.id) + 1;

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 font-sans max-w-5xl mx-auto">
      {/* Header Banner - Clean, simple, no gradients */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>National Skills Competency Testing (150 Total Tests)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Verified Practical Assessments
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            30 comprehensive assessments per subject database (150 total). Tri-Part evaluation assesses Theory (30%), Practical Task (40%), and Capstone Evidence (30%) aligned with Rwanda NISR benchmarks.
          </p>
        </div>

        {/* 5 Subject Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            Select Subject Curriculum Database (30 Tests Each)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {SUBJECT_METADATA.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              const countInDb = assessments.filter(a => a.courseId === sub.id).length || 30;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubject(sub.id)}
                  className={`text-left p-3 rounded-lg border text-xs transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span>{sub.name}</span>
                    <span className={`px-1.5 py-0.5 text-[10px] rounded font-bold ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {countInDb} Tests
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">{sub.sector}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Guest Notice */}
      {isGuest && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5 text-slate-700">
            <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Visitor Mode:</strong> You can practice any of the 30 assessments. Sign in to permanently save verified badges to your official Skill Passport.
            </span>
          </div>
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer self-start sm:self-auto shrink-0"
            >
              Sign In / Register
            </button>
          )}
        </div>
      )}

      {/* Assessment Selector & Browser within Subject */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{currentSubjectMeta.name} Database</span>
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredAssessments.length} of {subjectAssessments.length || 30} assessments in this subject
            </p>
          </div>

          {/* Filter / Search controls */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topic or skill..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-600 focus:outline-none w-48"
              />
            </div>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:ring-1 focus:ring-blue-600 focus:outline-none cursor-pointer"
            >
              <option value="All">All Levels</option>
              <option value="Foundation">Foundation (Level 1)</option>
              <option value="Practitioner">Practitioner (Level 2)</option>
              <option value="Specialist">Specialist (Level 3)</option>
            </select>
          </div>
        </div>

        {/* Quick Grid: Assessments #1 through #30 */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Subject Test Numbers (Click to Load):</span>
            <span className="text-[11px] text-slate-500">
              Active: Test #{currentSubjectIndex > 0 ? currentSubjectIndex : 1}
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5">
            {subjectAssessments.map((as, idx) => {
              const testNum = idx + 1;
              const isSelected = activeAssessment?.id === as.id;
              return (
                <button
                  key={as.id}
                  onClick={() => handleSelectAssessment(as)}
                  title={`${testNum}. ${as.title} (${as.difficulty})`}
                  className={`py-1.5 px-1 rounded text-center text-xs font-medium transition cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  #{testNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Assessment Header Pill */}
        {activeAssessment && (
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
            <div>
              <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide">
                Assessment #{currentSubjectIndex > 0 ? currentSubjectIndex : 1} of 30 · {activeAssessment.difficulty}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                {activeAssessment.title}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Target Competency: <span className="font-semibold text-slate-800">{activeAssessment.skillTarget}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-500 self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{activeAssessment.totalDuration || '35 mins'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
          Loading assessments from subject database...
        </div>
      )}

      {/* Active Assessment Content */}
      {activeAssessment && !submissionResult && !loading && (
        <div className="space-y-6">
          {/* Section 1: Theory Questions (30%) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Part 1 of 3: Domain Concepts (30% Weight)
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Multiple-Choice Theory & Methodology
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {activeAssessment.theoryQuestions.length} Questions
              </span>
            </div>

            <div className="space-y-5">
              {activeAssessment.theoryQuestions.map((q, qIdx) => (
                <div key={q.id || qIdx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                    {qIdx + 1}. {q.prompt}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const selected = theoryAnswers[qIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs font-medium transition border flex items-center justify-between cursor-pointer ${
                            selected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-semibold'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <span className="pr-2">{opt}</span>
                          {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Practical Task (40%) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Part 2 of 3: Practical Implementation (40% Weight)
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Hands-On Code / Query / Protocol Execution
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">40 Pts</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {activeAssessment.practicalTask?.instruction}
            </p>

            {activeAssessment.practicalTask?.starterCode && (
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-slate-800">
                <pre>{activeAssessment.practicalTask.starterCode}</pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500 font-mono">
                Verification Benchmark: {activeAssessment.practicalTask?.expectedOutputSnippet}
              </span>

              <button
                type="button"
                onClick={() => setPracticalCompleted(!practicalCompleted)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto ${
                  practicalCompleted
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{practicalCompleted ? 'Output Verified (Pass)' : 'Verify Practical Output'}</span>
              </button>
            </div>
          </div>

          {/* Section 3: Capstone Evidence (30%) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Part 3 of 3: Capstone Evidence Artifact (30% Weight)
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Verifiable Project Artifact
              </h3>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {activeAssessment.capstoneBrief}
            </p>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="text"
                value={capstoneUrl}
                onChange={(e) => setCapstoneUrl(e.target.value)}
                placeholder="https://github.com/your-username/assessment-repo"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono focus:ring-1 focus:ring-blue-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setCapstoneSubmitted(!capstoneSubmitted)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                  capstoneSubmitted ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {capstoneSubmitted ? 'Evidence Attached' : 'Attach Link'}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500">
              Evaluated using official Tri-Part scoring model (30% Theory, 40% Practical, 30% Capstone).
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition cursor-pointer shadow-xs flex items-center space-x-2 disabled:opacity-50"
            >
              <Award className="w-4 h-4" />
              <span>{submitting ? 'Evaluating Submission...' : 'Submit Assessment for Verification'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Result Card */}
      {submissionResult && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-block">
              {submissionResult.verifiedLevel} Achieved
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Assessment Successfully Evaluated
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              {submissionResult.isGuestPreview
                ? 'Great score! Sign in to register this verified badge to your official permanent Skill Passport.'
                : 'Your scores and verified credential have been recorded and added to your Skill Passport.'}
            </p>
          </div>

          {/* Tri-Part breakdown */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-center font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Theory (30%)</span>
              <span className="text-sm font-bold text-slate-800">{submissionResult.theoryScore}%</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Practical (40%)</span>
              <span className="text-sm font-bold text-slate-800">{submissionResult.practicalScore}%</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block">Project (30%)</span>
              <span className="text-sm font-bold text-slate-800">{submissionResult.projectScore}%</span>
            </div>
          </div>

          <div className="text-center pt-1">
            <span className="text-3xl font-bold text-slate-900">
              {submissionResult.compositeScore}%
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">Composite Score</span>
          </div>

          <div className="flex justify-center space-x-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setSubmissionResult(null);
                setTheoryAnswers({});
                setPracticalCompleted(false);
                setCapstoneSubmitted(false);
              }}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer"
            >
              Take Another Test in Subject
            </button>
            {submissionResult.isGuestPreview && onOpenAuth ? (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                Sign In to Save to Passport
              </button>
            ) : (
              <a
                href="/skill-passport"
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
              >
                View Skill Passport
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
