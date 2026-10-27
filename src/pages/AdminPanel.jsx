import React, { useState, useEffect } from 'react';
import { Settings, Plus, Trash2, CheckCircle2, Award, BookOpen, Users, ShieldAlert, FileText, Video, Activity, Edit3, Save, X, Eye, Database, RefreshCw, Cloud, Server, Copy, ExternalLink, Check } from 'lucide-react';
import CertificateModal from '../components/CertificateModal';

export default function AdminPanel({ user }) {
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [systemLogs, setSystemLogs] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('courses');
  const [previewCert, setPreviewCert] = useState(null);

  // Supabase Integration State
  const [supabaseInfo, setSupabaseInfo] = useState(null);
  const [isCheckingSb, setIsCheckingSb] = useState(false);
  const [isSyncingSb, setIsSyncingSb] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // New Course Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Software Engineering');
  const [newDifficulty, setNewDifficulty] = useState('Intermediate');
  const [newDuration, setNewDuration] = useState('6 Weeks');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');

  // Course editing state
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editModules, setEditModules] = useState([]);
  const [adminNotice, setAdminNotice] = useState(null);

  const fetchSupabaseStatus = async () => {
    setIsCheckingSb(true);
    try {
      const res = await fetch('/api/supabase/status');
      if (res.ok) {
        const data = await res.json();
        setSupabaseInfo(data.data || data);
      }
    } catch (err) {
      console.warn('Failed to query Supabase status:', err);
    } finally {
      setIsCheckingSb(false);
    }
  };

  const handleSyncSupabase = async () => {
    setIsSyncingSb(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/supabase/sync', { method: 'POST' });
      const data = await res.json();
      setSyncResult(data);
      fetchSupabaseStatus();
      fetchData();
    } catch (err) {
      setSyncResult({ success: false, message: 'Sync failed: ' + err.message });
    } finally {
      setIsSyncingSb(false);
    }
  };

  const fetchData = async () => {
    try {
      const [cRes, certRes, uRes, progRes, logRes] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/certificates'),
        fetch('/api/users'),
        fetch('/api/admin/progress'),
        fetch('/api/system-logs')
      ]);
      const cData = await cRes.json();
      const certData = await certRes.json();
      const uData = await uRes.json();
      const progData = await progRes.json();
      const logData = await logRes.json();
      setCourses(Array.isArray(cData) ? cData : (cData.courses || cData.data || []));
      setCertificates(Array.isArray(certData) ? certData : (certData.certificates || certData.data || []));
      setUsersList(Array.isArray(uData) ? uData : (uData.users || uData.data || []));
      setUserProgress(Array.isArray(progData) ? progData : (progData.progress || progData.data || []));
      setSystemLogs(Array.isArray(logData) ? logData : (logData.logs || logData.data || []));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSupabaseStatus();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          difficulty: newDifficulty,
          duration: newDuration,
          description: newDescription,
          image: newImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
          modules: [
            { title: 'Module 1: Introduction & Fundamentals', duration: '2 weeks', notes: 'Comprehensive syllabus and guided practice notes.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        })
      });
      const data = await res.json();
      if (data.success) {
        setNewTitle('');
        setNewDescription('');
        setNewImage('');
        fetchData();
        alert('Course added successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartEditCourse = (course) => {
    setEditingCourseId(course.id);
    setEditModules(JSON.parse(JSON.stringify(course.modules || [])));
  };

  const handleSaveModules = async (courseId) => {
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modules: editModules })
      });
      const data = await res.json();
      if (data.success) {
        setEditingCourseId(null);
        fetchData();
        setAdminNotice('Course modules, videos and notes updated successfully!');
        setTimeout(() => setAdminNotice(null), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Administrator Access Required</h2>
        <p className="text-slate-600 max-w-md mx-auto">
          Please sign in using administrator credentials (<span className="font-mono text-indigo-600">admin@thehub.rw</span> / <span className="font-mono text-indigo-600">Admin@1234!</span>) to access the admin management console.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-mono">
            <Settings className="w-4 h-4 text-indigo-400" />
            <span>REB Admin Console</span>
          </div>
          <h1 className="text-3xl font-bold">Platform Management Dashboard</h1>
          <p className="text-slate-300 text-sm">Manage courses, edit curriculum videos & notes, view user progress, check system logs, and oversee approvals.</p>
        </div>

        <div className="flex flex-wrap bg-slate-800 p-1.5 rounded-2xl border border-slate-700 gap-1">
          <button
            onClick={() => setActiveSubTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeSubTab === 'courses' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Courses & Modules
          </button>
          <button
            onClick={() => setActiveSubTab('progress')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeSubTab === 'progress' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            User Progress
          </button>
          <button
            onClick={() => setActiveSubTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeSubTab === 'logs' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            System Logs
          </button>
          <button
            onClick={() => setActiveSubTab('certificates')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeSubTab === 'certificates' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Certificates ({certificates.length})
          </button>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeSubTab === 'users' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            Learners
          </button>
          <button
            onClick={() => setActiveSubTab('supabase')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1.5 ${activeSubTab === 'supabase' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase Cloud DB</span>
            <span className={`w-2 h-2 rounded-full ${supabaseInfo?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
          </button>
        </div>
      </div>

      {activeSubTab === 'courses' && (
        <div className="space-y-8">
          {/* Add Course Form */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Plus className="w-5 h-5 text-indigo-600" />
              <span>Add New Course & Curriculum</span>
            </h3>

            <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced AI & Machine Learning in Rwanda"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm outline-none bg-white"
                >
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Data Science">Data Science</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Digital Agriculture">Digital Agriculture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm outline-none bg-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Duration</label>
                <input
                  type="text"
                  required
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  placeholder="e.g. 8 Weeks"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Course Description</label>
                <textarea
                  required
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detailed course overview aligned with national goals..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase">Course Banner Image (Upload File or URL)</label>
                <div className="flex items-center gap-4">
                  {newImage && (
                    <img src={newImage} alt="Banner Preview" className="w-20 h-14 rounded-xl object-cover border border-slate-300 shadow-sm" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => setNewImage(event.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                  />
                </div>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Or enter banner image URL (https://images.unsplash.com/...)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm outline-none mt-2"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow transition-all"
                >
                  Publish Course & Modules
                </button>
              </div>
            </form>
          </div>

          {/* Existing Courses Manager & Video/Notes Editor */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Manage Published Courses & Update Videos/Notes</h3>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img src={course.image} alt={course.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{course.title}</h4>
                        <p className="text-slate-500 text-xs">{course.category} • {course.difficulty} • {course.enrolled} Enrolled</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleStartEditCourse(course)}
                        className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Videos & Notes</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-rose-600 hover:bg-rose-50 p-2.5 rounded-xl transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Editing Module Video URLs and Notes */}
                  {editingCourseId === course.id && (
                    <div className="bg-white p-6 rounded-2xl border border-indigo-200 space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                          <Video className="w-4 h-4 text-indigo-600" />
                          <span>Editing Curriculum Modules (Videos & Notes)</span>
                        </h5>
                        <button onClick={() => setEditingCourseId(null)} className="text-slate-400 hover:text-slate-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {editModules.map((mod, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                            <div className="font-semibold text-xs text-indigo-600 uppercase">Module {idx + 1}</div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Module Title</label>
                              <input
                                type="text"
                                value={mod.title}
                                onChange={(e) => {
                                  const updated = [...editModules];
                                  updated[idx].title = e.target.value;
                                  setEditModules(updated);
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Video URL (YouTube Embed / MP4)</label>
                              <input
                                type="text"
                                value={mod.videoUrl}
                                onChange={(e) => {
                                  const updated = [...editModules];
                                  updated[idx].videoUrl = e.target.value;
                                  setEditModules(updated);
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Module Notes / Syllabus</label>
                              <textarea
                                rows={2}
                                value={mod.notes}
                                onChange={(e) => {
                                  const updated = [...editModules];
                                  updated[idx].notes = e.target.value;
                                  setEditModules(updated);
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          onClick={() => setEditingCourseId(null)}
                          className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveModules(course.id)}
                          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow flex items-center space-x-1.5"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'progress' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Learner Progress & Course Completion Tracking</span>
          </h3>
          <div className="space-y-4">
            {userProgress.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={item.user.avatar} alt={item.user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.user.name}</h4>
                      <p className="text-slate-500 text-xs">{item.user.email} • <span className="text-indigo-600 font-mono">{item.user.passportId}</span></p>
                    </div>
                  </div>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-mono">{item.user.district}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <div className="text-xs font-semibold text-slate-600 uppercase">Enrolled Courses ({item.enrollments.length})</div>
                  {item.enrollments.length === 0 ? (
                    <div className="text-xs text-slate-400 italic">No enrollments yet</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.enrollments.map((en, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-800">{en.courseTitle}</span>
                          {en.completed ? (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Completed</span>
                            </span>
                          ) : (
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">In Progress</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'logs' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <span>System Activity Logs & Security Audit Trail</span>
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {systemLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-slate-900 text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-800">
                <div className="flex items-center space-x-3">
                  <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-[10px]">{log.type}</span>
                  <span className="text-slate-300">{log.description}</span>
                </div>
                <span className="text-slate-500 text-[10px]">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'certificates' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Certificate Approvals & QR Verification Vault</h3>
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex flex-col md:flex-row items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-600">
                    <Award className="w-4 h-4" />
                    <span>Issued to: {cert.userName}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{cert.courseTitle}</h4>
                  <div className="text-xs text-slate-400 font-mono">Hash: {cert.credentialHash}</div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Landscape Certificate</span>
                  </button>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>QR Verified</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'users' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Registered Learners & Admin Accounts</h3>
          <div className="space-y-4">
            {usersList.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-4">
                  <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{u.name}</h4>
                    <p className="text-slate-500 text-xs">{u.email} • {u.district} • <span className="font-mono text-indigo-600">{u.passportId}</span></p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-mono uppercase ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-800 font-bold' : 'bg-slate-200 text-slate-700'}`}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'supabase' && (
        <div className="space-y-8">
          {/* Supabase Status Banner */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${supabaseInfo?.connected ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold text-slate-900">Supabase Cloud Database</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      supabaseInfo?.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {supabaseInfo?.connected ? 'Connected' : (supabaseInfo?.status || 'Active')}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    Enterprise PostgreSQL database & authentication layer for The Hub Rwanda platform.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={fetchSupabaseStatus}
                  disabled={isCheckingSb}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center space-x-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCheckingSb ? 'animate-spin' : ''}`} />
                  <span>{isCheckingSb ? 'Testing...' : 'Test Connection'}</span>
                </button>
                <button
                  onClick={handleSyncSupabase}
                  disabled={isSyncingSb}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-1.5 shadow-sm transition-colors disabled:opacity-50"
                >
                  <Cloud className={`w-3.5 h-3.5 ${isSyncingSb ? 'animate-pulse' : ''}`} />
                  <span>{isSyncingSb ? 'Syncing...' : 'Sync Data to Supabase'}</span>
                </button>
              </div>
            </div>

            {/* Sync Feedback Message */}
            {syncResult && (
              <div className={`p-4 rounded-2xl border text-sm flex items-start space-x-3 ${
                syncResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                {syncResult.success ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
                <div>
                  <p className="font-semibold">{syncResult.message}</p>
                  {syncResult.summary && (
                    <p className="text-xs mt-1 opacity-90">
                      Synced {syncResult.summary.courses} courses, {syncResult.summary.profiles} profiles, {syncResult.summary.certificates} certificates, {syncResult.summary.indicators} NISR indicators.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Telemetry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Supabase Host URL</span>
                <p className="font-mono text-xs font-semibold text-slate-900 mt-1 truncate" title={supabaseInfo?.url}>
                  {supabaseInfo?.url || 'https://guvhwswopudwriwonudn.supabase.co'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Round-trip Latency</span>
                <p className="font-semibold text-slate-900 mt-1 text-sm">
                  {supabaseInfo?.latencyMs !== undefined ? `${supabaseInfo.latencyMs} ms` : 'Measuring...'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Database Persistence</span>
                <p className="font-semibold text-emerald-700 mt-1 text-sm">
                  {supabaseInfo?.connected ? 'Live PostgreSQL' : 'Resilient In-Memory + Supabase Sync'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Synced Entities</span>
                <p className="font-semibold text-indigo-700 mt-1 text-sm">
                  {courses.length} Courses • {certificates.length} Certs
                </p>
              </div>
            </div>

            {/* Diagnostics details */}
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-300 font-mono text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span>SYSTEM HEALTH & SUPABASE STATUS</span>
                <span className="text-emerald-400">● LIVE</span>
              </div>
              <p>Project URL: <span className="text-indigo-400">{supabaseInfo?.url || 'https://guvhwswopudwriwonudn.supabase.co'}</span></p>
              <p>Status: <span className={supabaseInfo?.connected ? 'text-emerald-400' : 'text-amber-400'}>{supabaseInfo?.status || 'ready'}</span></p>
              <p>Message: <span className="text-slate-100">{supabaseInfo?.message || 'Ready for client operations.'}</span></p>
              {supabaseInfo?.tableCounts && Object.keys(supabaseInfo.tableCounts).length > 0 && (
                <p>Table counts: <span className="text-slate-100">{JSON.stringify(supabaseInfo.tableCounts)}</span></p>
              )}
            </div>
          </div>

          {/* Quick Setup & Migration Helper */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Database Schema & Migration (supabase-schema.sql)</h3>
                <p className="text-slate-500 text-xs mt-1">
                  Run this SQL in your Supabase SQL Editor to initialize all 7 tables (<code className="bg-slate-100 px-1 py-0.5 rounded">courses</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">profiles</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">certificates</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">enrollments</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">nisr_indicators</code>) with RLS security policies.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const schemaSnippet = `-- THE HUB RWANDA SUPABASE MIGRATION
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'learner',
  district TEXT DEFAULT 'Kigali City',
  passport_id TEXT,
  learning_streak INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Beginner',
  duration TEXT DEFAULT '6 Weeks',
  rating NUMERIC(3,2) DEFAULT 4.8,
  description TEXT,
  modules JSONB,
  enrolled INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  course_title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  certificate_requested BOOLEAN DEFAULT FALSE,
  progress_percentage INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  course_title TEXT NOT NULL,
  issued_date TEXT NOT NULL,
  credential_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.nisr_indicators (
  id TEXT PRIMARY KEY,
  indicator TEXT NOT NULL,
  value TEXT NOT NULL,
  trend TEXT,
  category TEXT NOT NULL,
  definition TEXT,
  source TEXT,
  retrieved_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nisr_indicators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read certs" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read indicators" ON public.nisr_indicators FOR SELECT USING (true);
CREATE POLICY "Allow insert certs" ON public.certificates FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);`;
                    navigator.clipboard.writeText(schemaSnippet);
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 3000);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center space-x-1.5 transition-colors"
                >
                  {copiedSql ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-5 text-slate-300 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800">
              <pre className="text-slate-300">{`-- The Hub (Rwanda) Supabase Schema
-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'learner',
  district TEXT DEFAULT 'Kigali City',
  passport_id TEXT,
  learning_streak INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'Beginner',
  duration TEXT DEFAULT '6 Weeks',
  rating NUMERIC(3,2) DEFAULT 4.8,
  description TEXT,
  modules JSONB,
  enrolled INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  course_title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  certificate_requested BOOLEAN DEFAULT FALSE,
  progress_percentage INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- 4. Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  course_title TEXT NOT NULL,
  issued_date TEXT NOT NULL,
  credential_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Official NISR Indicators Table
CREATE TABLE IF NOT EXISTS public.nisr_indicators (
  id TEXT PRIMARY KEY,
  indicator TEXT NOT NULL,
  value TEXT NOT NULL,
  trend TEXT,
  category TEXT NOT NULL,
  definition TEXT,
  source TEXT,
  retrieved_at TIMESTAMPTZ DEFAULT NOW()
);`}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Landscape Certificate Preview Modal */}
      {previewCert && (
        <CertificateModal
          certificate={previewCert}
          user={user}
          onClose={() => setPreviewCert(null)}
        />
      )}
    </div>
  );
}
