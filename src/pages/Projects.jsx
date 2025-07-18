import React, { useEffect, useState } from 'react';
import '../styles/Projects.css';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import backgroundImage1 from '../assets/images/bg2.jpg';
import backgroundImage2 from '../assets/images/bg4.jpg';

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
    <div className="projects-wrapper">
      <div className="projects-container">
        <h1>P R O J E C T S </h1>
        <img src={backgroundImage2} alt="Person Bottom Left" className="decorative-image bottom-left" />
        <img src={backgroundImage1} alt="Person Top Right" className="decorative-image top-right" />
        <div className="projects-box-container">
          {Array.isArray(projects) && projects.map((project, index) => {
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
                      src={`${process.env.REACT_APP_API_BASE_URL}${project.media}`}
                      controls
                      className="project-media"
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}${project.media}`}
                      alt={project.name}
                      className="project-media"
                    />
                  )
                )}

                {/* Project Details */}
                <h3>{project.name}</h3>
                <p className="projects-meta">{project.period} | {project.category}</p>
                <p className="project-tech">{project.technologies}</p>
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
    </div>
  );
};

export default Projects;