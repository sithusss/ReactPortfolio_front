import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Messages from '../components/Messages';
import { FaGraduationCap, FaFlask, FaProjectDiagram, FaTrash, FaPlusCircle } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('education');
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  // --- Education State ---
  const [educationList, setEducationList] = useState([]);
  const [eduForm, setEduForm] = useState({
    institution: '',
    degree: '',
    period: '',
    description: '',
  });

  // --- Research State ---
  const [researchList, setResearchList] = useState([]);
  const [researchForm, setResearchForm] = useState({
    title: '',
    domain: '',
    publication: '',
    abstract: '',
    link: '',
    media: null,
  });

  // --- Project State ---
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

  // Centralized Data Fetcher
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

  // --- Form Handlers ---
  const handleEduSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/education`, eduForm);
      setEduForm({ institution: '', degree: '', period: '', description: '' });
      alert('Education saved successfully!');
      fetchData();
    } catch (err) {
      console.error('Error saving education:', err);
      alert('Failed to save education.');
    }
  };

  const handleResearchSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(researchForm).forEach((key) => {
      if (researchForm[key] !== null) {
        formData.append(key, researchForm[key]);
      }
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/research`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResearchForm({ title: '', domain: '', publication: '', abstract: '', link: '', media: null });
      alert('Research paper saved successfully!');
      fetchData();
    } catch (err) {
      console.error('Error saving research:', err);
      alert('Failed to save research paper.');
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(projectForm).forEach((key) => {
      if (projectForm[key] !== null) {
        formData.append(key, projectForm[key]);
      }
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/projects`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProjectForm({
        name: '', category: '', period: '', technologies: '', description: '', githubLink: '', liveLink: '', media: null
      });
      alert('Project saved successfully!');
      fetchData();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to save project.');
    }
  };

  // --- Universal Delete Handler ---
  const handleDelete = async (endpoint, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${endpoint} entry?`)) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/${endpoint}/${id}`);
      fetchData();
    } catch (err) {
      console.error(`Error deleting from ${endpoint}:`, err);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none transition shadow-sm";

  return (
    <div className="relative min-h-screen bg-slate-100 px-6 py-16 text-slate-900 selection:bg-indigo-500 selection:text-white">
      <div className="mx-auto max-w-6xl">
        
        {/* Floating Messages Button */}
        <button
          onClick={() => setShowMessagesModal(true)}
          className="fixed right-6 top-24 z-30 flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 hover:scale-105"
          aria-label="View messages"
        >
          <FaMessage />
        </button>

        {/* Dashboard Header */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Manage all portfolio entries across Education, Research, and Projects.</p>

        {/* Tab Switcher */}
        <div className="mt-8 flex flex-wrap gap-3 border-b border-slate-300 pb-4">
          {[
            { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
            { id: 'research', label: 'Research', icon: <FaFlask /> },
            { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition duration-200 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'border border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:bg-slate-50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="mt-10">
          
          {/* TAB 1: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-10">
              <form onSubmit={handleEduSubmit} className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 space-y-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><FaPlusCircle className="text-indigo-600" /> Add Education Entry</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={eduForm.institution}
                    onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                    required
                    className={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Degree / Qualification"
                    value={eduForm.degree}
                    onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    required
                    className={inputStyle}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Period (e.g. 2021 - Present)"
                  value={eduForm.period}
                  onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                  required
                  className={inputStyle}
                />

                <textarea
                  placeholder="Description / Key Highlights"
                  value={eduForm.description}
                  onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                  rows={4}
                  className={inputStyle}
                />

                <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition">
                  Save Education
                </button>
              </form>

              <div className="w-full space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Existing Education Records</h2>
                {educationList.length > 0 ? (
                  educationList.map((item) => (
                    <div key={item._id || item.id} className="flex items-start justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{item.degree || item.name}</h3>
                        <p className="text-xs font-semibold text-indigo-600">{item.institution || item.institute} ({item.period})</p>
                        <p className="mt-2 text-xs text-slate-600">{item.description}</p>
                      </div>
                      <button onClick={() => handleDelete('education', item._id || item.id)} className="text-rose-500 hover:text-rose-700 p-2 transition">
                        <FaTrash />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No education records found.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: RESEARCH */}
          {activeTab === 'research' && (
            <div className="space-y-10">
              <form onSubmit={handleResearchSubmit} className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 space-y-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><FaPlusCircle className="text-indigo-600" /> Add Research Paper</h2>
                
                <input
                  type="text"
                  placeholder="Paper Title"
                  value={researchForm.title}
                  onChange={(e) => setResearchForm({ ...researchForm, title: e.target.value })}
                  required
                  className={inputStyle}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Domain (e.g. Serverless / GRU / ML)"
                    value={researchForm.domain}
                    onChange={(e) => setResearchForm({ ...researchForm, domain: e.target.value })}
                    required
                    className={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Publication / Venue / Status"
                    value={researchForm.publication}
                    onChange={(e) => setResearchForm({ ...researchForm, publication: e.target.value })}
                    className={inputStyle}
                  />
                </div>

                <input
                  type="url"
                  placeholder="Paper / Presentation Link"
                  value={researchForm.link}
                  onChange={(e) => setResearchForm({ ...researchForm, link: e.target.value })}
                  className={inputStyle}
                />

                <textarea
                  placeholder="Abstract / Key Summary"
                  value={researchForm.abstract}
                  onChange={(e) => setResearchForm({ ...researchForm, abstract: e.target.value })}
                  rows={4}
                  required
                  className={inputStyle}
                />

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Architecture Diagram / Cover Image</label>
                  <input
                    type="file"
                    onChange={(e) => setResearchForm({ ...researchForm, media: e.target.files[0] })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 shadow-sm"
                  />
                </div>

                <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition">
                  Save Research
                </button>
              </form>

              <div className="w-full space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Existing Research Publications</h2>
                {researchList.length > 0 ? (
                  researchList.map((item) => (
                    <div key={item._id || item.id} className="flex items-start justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
                      <div>
                        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-indigo-700">
                          {item.domain}
                        </span>
                        <h3 className="mt-2 text-base font-bold text-slate-900">{item.title}</h3>
                        <p className="text-xs font-semibold text-indigo-600">{item.publication}</p>
                        <p className="mt-2 text-xs text-slate-600">{item.abstract}</p>
                      </div>
                      <button onClick={() => handleDelete('research', item._id || item.id)} className="text-rose-500 hover:text-rose-700 p-2 transition">
                        <FaTrash />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No research entries found.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-10">
              <form onSubmit={handleProjectSubmit} className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 space-y-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><FaPlusCircle className="text-indigo-600" /> Add Project Entry</h2>
                
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  required
                  className={inputStyle}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Category (e.g. Web / Mobile / AI)"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    required
                    className={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Period"
                    value={projectForm.period}
                    onChange={(e) => setProjectForm({ ...projectForm, period: e.target.value })}
                    required
                    className={inputStyle}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Technologies Used"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  required
                  className={inputStyle}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="url"
                    placeholder="GitHub Repository URL"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    className={inputStyle}
                  />
                  <input
                    type="url"
                    placeholder="Live Demo URL"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                    className={inputStyle}
                  />
                </div>

                <textarea
                  placeholder="Description"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={4}
                  required
                  className={inputStyle}
                />

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Project Thumbnail / Video</label>
                  <input
                    type="file"
                    onChange={(e) => setProjectForm({ ...projectForm, media: e.target.files[0] })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 shadow-sm"
                  />
                </div>

                <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition">
                  Save Project
                </button>
              </form>

              <div className="w-full space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Existing Projects</h2>
                {projectList.length > 0 ? (
                  projectList.map((item) => (
                    <div key={item._id || item.id} className="flex items-start justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                        <p className="text-xs font-semibold text-indigo-600">{item.category} • {item.technologies}</p>
                        <p className="mt-2 text-xs text-slate-600">{item.description}</p>
                      </div>
                      <button onClick={() => handleDelete('projects', item._id || item.id)} className="text-rose-500 hover:text-rose-700 p-2 transition">
                        <FaTrash />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No projects found.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Messages Modal */}
        {showMessagesModal && <Messages onClose={() => setShowMessagesModal(false)} />}
      </div>
    </div>
  );
}