import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/projects`);
        setProjects(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <FaCode className="text-indigo-400 text-lg" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400">Selected Work</span>
        </div>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Projects</h1>
        <div className="mt-3 h-1 w-20 rounded-full bg-indigo-500" />

        {projects.length === 0 && (
          <p className="mt-12 text-sm text-slate-300">No projects found.</p>
        )}

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(projects) &&
            projects.map((project, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-xl transition duration-300 hover:-translate-y-1.5 hover:border-indigo-400 hover:shadow-indigo-950/40"
              >
                {project.media && (
                  <div className="aspect-video w-full overflow-hidden border-b border-slate-800 bg-slate-950">
                    {project.media.endsWith('.mp4') || project.media.endsWith('.webm') ? (
                      <video
                        src={`${process.env.REACT_APP_API_BASE_URL}${project.media}`}
                        controls
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}${project.media}`}
                        alt={project.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-indigo-300">{project.period}</span>
                    <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-indigo-300">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="mt-3 text-xl font-bold text-white group-hover:text-indigo-300 transition duration-300">
                    {project.name}
                  </h3>
                  
                  <p className="mt-2 font-mono text-xs text-indigo-400 font-semibold">{project.technologies}</p>
                  
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-200">
                    {project.description}
                  </p>

                  <div className="mt-6 flex items-center gap-4 border-t border-slate-800/80 pt-4">
                    <a
                      href={project.githubLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => !project.githubLink && e.preventDefault()}
                      className={`flex items-center gap-2 text-sm font-semibold transition duration-300 ${
                        project.githubLink ? 'text-slate-200 hover:text-indigo-300' : 'cursor-default text-slate-500'
                      }`}
                    >
                      <FaGithub className="text-lg" /> Code
                    </a>
                    <a
                      href={project.liveLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => !project.liveLink && e.preventDefault()}
                      className={`flex items-center gap-2 text-sm font-semibold transition duration-300 ${
                        project.liveLink ? 'text-slate-200 hover:text-indigo-300' : 'cursor-default text-slate-500'
                      }`}
                    >
                      <FaExternalLinkAlt className="text-sm" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;