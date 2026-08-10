import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaGraduationCap, FaFlask, FaProjectDiagram, FaTrash, FaPlusCircle } from 'react-icons/fa';

const AdminProjectPanel = () => {
  const [activeTab, setActiveTab] = useState('education');

  // Education State
  const [educationList, setEducationList] = useState([]);
  const [eduForm, setEduForm] = useState({
    institution: '',
    degree: '',
    period: '',
    description: '',
  });

  // Research State
  const [researchList, setResearchList] = useState([]);
  const [researchForm, setResearchForm] = useState({
    title: '',
    domain: '',
    publication: '',
    abstract: '',
    link: '',
    media: null,
  });

  // Project State
  const [projectList, setProjectList] = useState([]);
  const [projectForm, setProjectForm] = useState({
    name: '',
    category: '',
    period: '',
    technologies: '',
    description: '',
    githubLink: '',
    liveLink: '',
    media: null,
  });

  const fetchData = useCallback(async () => {
    try {
      if (activeTab === 'education') {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/education`);
        setEducationList(Array.isArray(res.data) ? res.data : []);
      } else if (activeTab === 'research') {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/research`);
        setResearchList(Array.isArray(res.data) ? res.data : []);
      } else if (activeTab === 'projects') {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/projects`);
        setProjectList(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error(`Error fetching ${activeTab} data:`, err);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Submit Handlers
  const handleEduSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/education`, eduForm);
      setEduForm({ institution: '', degree: '', period: '', description: '' });
      fetchData();
    } catch (err) {
      console.error('Error saving education:', err);
    }
  };

  const handleResearchSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(researchForm).forEach((key) => {
      formData.append(key, researchForm[key]);
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/research`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResearchForm({ title: '', domain: '', publication: '', abstract: '', link: '', media: null });
      fetchData();
    } catch (err) {
      console.error('Error saving research:', err);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(projectForm).forEach((key) => {
      formData.append(key, projectForm[key]);
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/projects`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProjectForm({
        name: '', category: '', period: '', technologies: '', description: '', githubLink: '', liveLink: '', media: null
      });
      fetchData();
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  // Delete Handler
  const handleDelete = async (endpoint, id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/${endpoint}/${id}`);
      fetchData();
    } catch (err) {
      console.error(`Error deleting from ${endpoint}:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(54,162,235,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,122,89,0.12),transparent_26%),linear-gradient(180deg,#f7fbff_0%,#fffaf4_100%)] px-6 py-16 text-slate-900 selection:bg-indigo-500 selection:text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Manage portfolio entries across Education, Research, and Projects.</p>

        {/* Tab Navigation */}
        <div className="mt-8 flex flex-wrap gap-3 border-b border-slate-200 pb-4">
          {[
            { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
            { id: 'research', label: 'Research', icon: <FaFlask /> },
            { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25'
                  : 'border border-slate-200 bg-white/75 text-slate-700 hover:border-sky-300 hover:bg-sky-50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-10">
          {/* TAB 1: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-10">
              <form onSubmit={handleEduSubmit} className="w-full space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><FaPlusCircle className="text-sky-500" /> Add Education Entry</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={eduForm.institution}
                    onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                  <input
                    type="text"
                    placeholder="Degree / Qualification"
                    value={eduForm.degree}
                    onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Period (e.g. 2021 - Present)"
                  value={eduForm.period}
                  onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />

                <textarea
                  placeholder="Description / Key Highlights"
                  value={eduForm.description}
                  onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />

                <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sky-500/25 transition hover:opacity-95">
                  Save Education
                </button>
              </form>

              <div className="w-full space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Existing Education Records</h2>
                {educationList.map((item) => (
                  <div key={item._id || item.id} className="flex items-start justify-between rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-md shadow-slate-200/60 backdrop-blur">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{item.degree}</h3>
                      <p className="text-xs font-semibold text-sky-600">{item.institution} ({item.period})</p>
                      <p className="mt-2 text-xs text-slate-600">{item.description}</p>
                    </div>
                    <button onClick={() => handleDelete('education', item._id || item.id)} className="p-2 text-rose-500 hover:text-rose-600">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: RESEARCH */}
          {activeTab === 'research' && (
            <div className="space-y-10">
              <form onSubmit={handleResearchSubmit} className="w-full space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><FaPlusCircle className="text-sky-500" /> Add Research Paper</h2>
                
                <input
                  type="text"
                  placeholder="Paper Title"
                  value={researchForm.title}
                  onChange={(e) => setResearchForm({ ...researchForm, title: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Domain (e.g. Serverless / GRU / ML)"
                    value={researchForm.domain}
                    onChange={(e) => setResearchForm({ ...researchForm, domain: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                  <input
                    type="text"
                    placeholder="Publication / Venue / Status"
                    value={researchForm.publication}
                    onChange={(e) => setResearchForm({ ...researchForm, publication: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <input
                  type="url"
                  placeholder="Paper / Presentation Link"
                  value={researchForm.link}
                  onChange={(e) => setResearchForm({ ...researchForm, link: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />

                <textarea
                  placeholder="Abstract / Key Summary"
                  value={researchForm.abstract}
                  onChange={(e) => setResearchForm({ ...researchForm, abstract: e.target.value })}
                  rows={4}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Architecture Diagram / Cover Image</label>
                  <input
                    type="file"
                    onChange={(e) => setResearchForm({ ...researchForm, media: e.target.files[0] })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm"
                  />
                </div>

                <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sky-500/25 transition hover:opacity-95">
                  Save Research
                </button>
              </form>

              <div className="w-full space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Existing Research Publications</h2>
                {researchList.map((item) => (
                  <div key={item._id || item.id} className="flex items-start justify-between rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-md shadow-slate-200/60 backdrop-blur">
                    <div>
                      <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-sky-700">
                        {item.domain}
                      </span>
                      <h3 className="mt-2 text-base font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs font-semibold text-sky-600">{item.publication}</p>
                      <p className="mt-2 text-xs text-slate-600">{item.abstract}</p>
                    </div>
                    <button onClick={() => handleDelete('research', item._id || item.id)} className="p-2 text-rose-500 hover:text-rose-600">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-10">
              <form onSubmit={handleProjectSubmit} className="w-full space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><FaPlusCircle className="text-sky-500" /> Add Project Entry</h2>
                
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Category (e.g. Web / Mobile / AI)"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                  <input
                    type="text"
                    placeholder="Period"
                    value={projectForm.period}
                    onChange={(e) => setProjectForm({ ...projectForm, period: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Technologies Used"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="url"
                    placeholder="GitHub Repository URL"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                  <input
                    type="url"
                    placeholder="Live Demo URL"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <textarea
                  placeholder="Description"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={4}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Project Thumbnail / Video</label>
                  <input
                    type="file"
                    onChange={(e) => setProjectForm({ ...projectForm, media: e.target.files[0] })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm"
                  />
                </div>

                <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sky-500/25 transition hover:opacity-95">
                  Save Project
                </button>
              </form>

              <div className="w-full space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Existing Projects</h2>
                {projectList.map((item) => (
                  <div key={item._id || item.id} className="flex items-start justify-between rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-md shadow-slate-200/60 backdrop-blur">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                      <p className="text-xs font-semibold text-sky-600">{item.category} • {item.technologies}</p>
                      <p className="mt-2 text-xs text-slate-600">{item.description}</p>
                    </div>
                    <button onClick={() => handleDelete('projects', item._id || item.id)} className="p-2 text-rose-500 hover:text-rose-600">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjectPanel;