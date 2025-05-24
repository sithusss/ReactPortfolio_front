import React, { useEffect, useState } from 'react';
import '../styles/Projects.css';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  const BASE_URL = 'http://localhost:5000'; // No need to hardcode `/uploads/` if full path is stored

  return (
    <div className="projects-container">
      <h1>P R O J E C T S </h1>
      <div className="projects-box-container">
        {projects.map((project, index) => {
          console.log("project.media:", project.media); // ✅ Log for debugging
          return (
            <div
              className="projects-box"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Media Preview */}
              {project.media && (
                project.media.endsWith('.mp4') || project.media.endsWith('.webm') ? (
                  <video
                    src={`${BASE_URL}${project.media}`}
                    controls
                    className="project-media"
                  />
                ) : (
                  <img
                    src={`${BASE_URL}${project.media}`}
                    alt={project.name}
                    className="project-media"
                  />
                )
              )}

              {/* Project Details */}
              <h3>{project.name}</h3>
              <p className="projects-meta">{project.period} | {project.category}</p>
              <p className="projects-description">{project.description}</p>

              {/* Links */}
              <div className="project-links">
                <a
                  href={project.githubLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`link-icon ${!project.githubLink ? 'disabled' : ''}`}
                  onClick={e => !project.githubLink && e.preventDefault()}
                >
                  <FaGithub />
                </a>
                <a
                  href={project.liveLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`link-icon ${!project.liveLink ? 'disabled' : ''}`}
                  onClick={e => !project.liveLink && e.preventDefault()}
                >
                  <FaExternalLinkAlt />
                </a>
              </div>
            </div>

          );
        })}
      </div>
    </div>
  );
};

export default Projects;
