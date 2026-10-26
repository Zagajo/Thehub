import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  FileText, 
  Video, 
  CheckCircle,
  Award
} from 'lucide-react';

export const AdminDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('courses');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Software Engineering');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [duration, setDuration] = useState('6 Weeks');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleNotes, setModuleNotes] = useState('');
  const [moduleVideo, setModuleVideo] = useState('');
  const [modules, setModules] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  const [selectedUserForCert, setSelectedUserForCert] = useState('');
  const [certCourseTitle, setCertCourseTitle] = useState('');

  const loadData = () => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(console.error);

    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsersList(data))
      .catch(console.error);

    fetch('/api/certificates')
      .then(res => res.json())
      .then(data => setCertificates(data))
      .catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddModule = () => {
    if (!moduleTitle) return;
    setModules([...modules, { title: moduleTitle, duration: '2 weeks', notes: moduleNotes, videoUrl: moduleVideo }]);
    setModuleTitle('');
    setModuleNotes('');
    setModuleVideo('');
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!title) return;

    fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        category,
        difficulty,
        duration,
        description,
        image: image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        modules: modules.length > 0 ? modules : [{ title: 'Module 1: Introduction', duration: '2 weeks', notes: 'Intro notes', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }]
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccessMsg('Course successfully created & published!');
          setTitle('');
          setDescription('');
          setImage('');
          setModules([]);
          loadData();
          setTimeout(() => setSuccessMsg(''), 4000);
        }
      });
  };

  const handleDeleteCourse = (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    fetch(`/api/courses/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => loadData());
  };

  const handleGrantCertificate = (e) => {
    e.preventDefault();
    if (!selectedUserForCert || !certCourseTitle) return;

    fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedUserForCert, courseTitle: certCourseTitle })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccessMsg('Official verified certificate granted successfully!');
          loadData();
          setTimeout(() => setSuccessMsg(''), 4000);
        }
      });
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto bg-white rounded-2xl p-8 border border-slate-200">
        <ShieldCheck className="w-12 h-12 text-red-600 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Admin Access Required</h2>
        <p className="text-xs text-slate-600">Please sign in with the Administrator demo account (admin@thehub.rw) to access management tools.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 border border-blue-400/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            System Control Center • Administrator
          </div>
          <h1 className="text-3xl font-extrabold">Admin Management Panel</h1>
          <p className="text-slate-400 text-sm mt-1">Manage courses, upload study notes and videos, monitor users, and grant official certificates.</p>
        </div>
        <div className="flex gap-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveSubTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeSubTab === 'courses' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
          >
            Courses ({courses.length})
          </button>
          <button
            onClick={() => setActiveSubTab('addcourse')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeSubTab === 'addcourse' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
          >
            + Add Course/Notes
          </button>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeSubTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
          >
            Users ({usersList.length})
          </button>
          <button
            onClick={() => setActiveSubTab('certificates')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeSubTab === 'certificates' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
          >
            Certificates ({certificates.length})
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-sm text-emerald-900">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {activeSubTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">All Registered Courses, Notes & Videos</h2>
            <button
              onClick={() => setActiveSubTab('addcourse')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> Add New Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">{course.category}</span>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-slate-400 hover:text-red-600 p-1 transition"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{course.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{course.description}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block">Modules, Notes & Videos ({course.modules?.length || 0}):</span>
                  {course.modules?.map((m, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-1 last:border-0">
                      <span className="font-medium">{m.title}</span>
                      <div className="flex gap-2">
                        <span className="text-blue-600 flex items-center gap-1"><FileText className="w-3 h-3" /> Notes</span>
                        <span className="text-emerald-600 flex items-center gap-1"><Video className="w-3 h-3" /> Video</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'addcourse' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Add New Course, Study Notes & Video</h2>
            <p className="text-xs text-slate-600 mt-1">Publish courses to the platform registry with embedded notes and video links.</p>
          </div>

          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Data Science in Python"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Business & Digital">Business & Digital</option>
                  <option value="Agriculture & Tech">Agriculture & Tech</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
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
                  placeholder="6 Weeks"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Cover Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Course Description</label>
              <textarea
                rows={3}
                required
                placeholder="Comprehensive overview of what learners will master..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-4">
              <span className="font-bold text-slate-800 text-sm block">Add Study Notes & Videos to Modules</span>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Module Title (e.g. Module 1: Introduction)"
                  value={moduleTitle}
                  onChange={e => setModuleTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Study Notes text content for learners..."
                  value={moduleNotes}
                  onChange={e => setModuleNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
                ></textarea>
                <input
                  type="text"
                  placeholder="Study Video URL (e.g. https://www.youtube.com/embed/...)"
                  value={moduleVideo}
                  onChange={e => setModuleVideo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddModule}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl text-xs transition"
                >
                  + Add Module to Course
                </button>
              </div>

              {modules.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-700 block">Added Modules ({modules.length}):</span>
                  {modules.map((m, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-900">{m.title}</span>
                        <p className="text-slate-500 line-clamp-1">{m.notes}</p>
                      </div>
                      <span className="text-emerald-600 font-semibold">Ready</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow transition text-sm"
            >
              Publish Course to System Registry
            </button>
          </form>
        </div>
      )}

      {activeSubTab === 'users' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Registered Platform Users ({usersList.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="p-3 rounded-l-lg">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 rounded-r-lg">Passport ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((u, i) => (
                  <tr key={i}>
                    <td className="p-3 flex items-center gap-2 font-bold text-slate-900">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                      {u.name}
                    </td>
                    <td className="p-3 text-slate-600">{u.email}</td>
                    <td className="p-3 text-slate-600">{u.district}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-600">{u.passportId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'certificates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Grant Official Verified Certificate</h2>
              <p className="text-xs text-slate-600 mt-1">Issue tamper-evident cryptographic skill certificates to successful learners.</p>
            </div>

            <form onSubmit={handleGrantCertificate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Learner</label>
                <select
                  value={selectedUserForCert}
                  onChange={e => setSelectedUserForCert(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="">-- Choose Learner --</option>
                  {usersList.filter(u => u.role !== 'admin').map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Course Title</label>
                <select
                  value={certCourseTitle}
                  onChange={e => setCertCourseTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="">-- Choose Course --</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow transition text-sm flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" /> Grant Verified Certificate
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Issued Certificates ({certificates.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded">Verified Credential</span>
                    <span className="text-xs text-slate-500">{cert.issuedDate}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{cert.courseTitle}</h4>
                  <p className="text-xs text-slate-600">Awarded to: <span className="font-semibold">{cert.userName}</span></p>
                  <div className="text-[10px] font-mono text-blue-600">{cert.credentialHash}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
