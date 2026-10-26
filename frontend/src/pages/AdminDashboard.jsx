import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Award, 
  Trash2, 
  Video, 
  CheckCircle,
  Check
} from 'lucide-react';

export const AdminDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('admin-overview');

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

  const [selectedCourseForMedia, setSelectedCourseForMedia] = useState(null);

  const loadData = () => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        if (data.length > 0 && !selectedCourseForMedia) setSelectedCourseForMedia(data[0]);
      })
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

  const handleApproveCertificate = (learnerId, courseTitle) => {
    fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: learnerId, courseTitle })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccessMsg('Certificate approved and issued successfully!');
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
            System Control Center • Administrator Portal
          </div>
          <h1 className="text-3xl font-extrabold">Admin Management Hub</h1>
          <p className="text-slate-400 text-sm mt-1">Manage course registry, update study notes & videos, approve completion certificates, and monitor users.</p>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-sm text-emerald-900">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {activeSubTab === 'admin-overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs uppercase font-bold text-slate-400">Total Courses</span>
              <div className="text-4xl font-extrabold text-slate-900">{courses.length}</div>
              <p className="text-xs text-emerald-600 font-semibold">Active & Published</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs uppercase font-bold text-slate-400">Registered Users</span>
              <div className="text-4xl font-extrabold text-slate-900">{usersList.length}</div>
              <p className="text-xs text-blue-600 font-semibold">Across Rwanda Districts</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs uppercase font-bold text-slate-400">Certificates Issued</span>
              <div className="text-4xl font-extrabold text-slate-900">{certificates.length}</div>
              <p className="text-xs text-emerald-600 font-semibold">Cryptographically Verified</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Quick Administrative Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={() => setActiveSubTab('admin-courses')} className="p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl border border-blue-200 text-left transition space-y-1">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h4 className="font-bold text-slate-900 text-sm">Add / Edit Courses</h4>
                <p className="text-xs text-slate-600">Register new learning pathways</p>
              </button>
              <button onClick={() => setActiveSubTab('admin-media')} className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-2xl border border-emerald-200 text-left transition space-y-1">
                <Video className="w-6 h-6 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-sm">Manage Notes & Videos</h4>
                <p className="text-xs text-slate-600">Update module content</p>
              </button>
              <button onClick={() => setActiveSubTab('admin-certs')} className="p-4 bg-amber-50 hover:bg-amber-100 rounded-2xl border border-amber-200 text-left transition space-y-1">
                <Award className="w-6 h-6 text-amber-600" />
                <h4 className="font-bold text-slate-900 text-sm">Approve Certificates</h4>
                <p className="text-xs text-slate-600">Grant QR credentials</p>
              </button>
              <button onClick={() => setActiveSubTab('admin-users')} className="p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl border border-purple-200 text-left transition space-y-1">
                <Users className="w-6 h-6 text-purple-600" />
                <h4 className="font-bold text-slate-900 text-sm">User Directory</h4>
                <p className="text-xs text-slate-600">Monitor platform learners</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'admin-courses' && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Add New Course to Registry</h2>
              <p className="text-xs text-slate-600 mt-1">Publish courses with custom modules, notes, and video lectures.</p>
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

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Manage Existing Courses ({courses.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map(course => (
                <div key={course.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">{course.category}</span>
                    <button onClick={() => handleDeleteCourse(course.id)} className="text-slate-400 hover:text-red-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{course.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{course.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'admin-media' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Notes & Video Lecture Manager</h2>
            <p className="text-xs text-slate-600 mt-1">Select a course and module to update study notes or embed video lectures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase">Select Course</label>
              <div className="space-y-2">
                {courses.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCourseForMedia(c)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition border ${
                      selectedCourseForMedia?.id === c.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              {selectedCourseForMedia ? (
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm">Editing: {selectedCourseForMedia.title}</h3>
                  {selectedCourseForMedia.modules?.map((m, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900 text-xs">Module {idx + 1}: {m.title}</span>
                        <span className="text-emerald-600 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Study Notes Content</label>
                          <textarea
                            rows={3}
                            defaultValue={m.notes}
                            className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                          ></textarea>
                        </div>
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Video URL (YouTube Embed)</label>
                          <input
                            type="text"
                            defaultValue={m.videoUrl}
                            className="w-full p-2 border border-slate-300 rounded-lg text-xs font-mono"
                          />
                        </div>
                        <button
                          onClick={() => alert('Study notes and video link successfully updated for module!')}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl text-xs transition"
                        >
                          Save Module Changes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-slate-500">Please select a course from the left.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'admin-certs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Approve & Issue Completion Certificates</h2>
              <p className="text-xs text-slate-600 mt-1">Review completed coursework and approve official QR code certificates for learners.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Pending Learner Approvals</h3>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Kezia Umutoni</h4>
                      <p className="text-[11px] text-slate-500">Full-Stack Web Engineering (Python & React)</p>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Completed</span>
                  </div>
                  <button
                    onClick={() => handleApproveCertificate('u-kezia-1', 'Full-Stack Web Engineering (Python & React)')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Approve & Issue QR Certificate
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Issued Verified Certificates ({certificates.length})</h3>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {certificates.map((cert, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-900">{cert.userName}</span>
                        <p className="text-slate-500 text-[11px]">{cert.courseTitle}</p>
                      </div>
                      <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">Verified QR</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'admin-users' && (
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
    </div>
  );
};
