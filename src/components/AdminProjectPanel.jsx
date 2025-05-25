import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/projectPanel.css';

export default function AdminProjectPanel() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    technologies: '',
    period: '',
    description: '',
    githubLink: '',
    liveLink: '',
    media: null
  });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'media') {
      setFormData({ ...formData, media: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) projectData.append(key, value);
    });

    try {
      await axios.post('http://localhost:5000/api/projects', projectData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Project added successfully!');
      setFormData({
        category: '',
        name: '',
        technologies: '',
        period: '',
        description: '',
        githubLink: '',
        liveLink: '',
        media: null
      });
      fetchProjects();
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding project.');
    }
  };

  const handleEditClick = (project) => {
    setFormData({
      category: project.category || '',
      name: project.name || '',
      technologies: project.technologies || '',
      period: project.period || '',
      description: project.description || '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      media: null
    });
    setEditingId(project._id);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) updatedData.append(key, value);
    });

    try {
      await axios.put(`http://localhost:5000/api/projects/${editingId}`, updatedData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFormData({
        category: '',
        name: '',
        technologies: '',
        period: '',
        description: '',
        githubLink: '',
        liveLink: '',
        media: null
      });
      setShowModal(false);
      setEditingId(null);
      fetchProjects();
      alert('Project updated successfully!');
    } catch (err) {
      console.error('Error:', err);
      alert('Error updating project.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const categoryOptions = [
    'Web-frontend Development',
    'Mobile Development',
    'Web-fullstack Development',
    'AI/ML',
    'UI/UX Design',
    'QA Testing',
  ];
  
  const BASE_URL = 'http://localhost:5000';

  return (
    <div className="projects">
      <h2 className="admin-title">🛠️ Project Management Panel</h2>

      <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
        <div className="form-grid">
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select a Category</option>
            {categoryOptions.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          {['name', 'technologies', 'period', 'description', 'githubLink', 'liveLink'].map((field) => field === 'description' ? (
              <textarea
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                required
                rows={4} 
              />
            ) :(
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required={['name', 'technologies', 'period'].includes(field)}
            />
          ))}
          <input type="file" name="media" accept="image/*,video/*" onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn">Add Project</button>
      </form>

      <div className="admin-table-container">
        <h3 className="table-title">📋 Project List</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Name</th>
              <th>Technologies</th>
              <th>Period</th>
              <th>Description</th>
              <th>GitHub</th>
              <th>Live</th>
              <th>Media</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((proj) => (
                <tr key={proj._id}>
                  <td>{proj.projectId}</td>
                  <td>{proj.category}</td>
                  <td>{proj.name}</td>
                  <td>{proj.technologies}</td>
                  <td>{proj.period}</td>
                  <td>{proj.description}</td>
                  <td><a href={proj.githubLink} target="_blank" rel="noreferrer">GitHub</a></td>
                  <td><a href={proj.liveLink} target="_blank" rel="noreferrer">Live</a></td>
                  <td>
                    {proj.media && (proj.media.endsWith('.mp4') || proj.media.endsWith('.webm')) ? (
                      <video src={`${BASE_URL}${proj.media}`} width="100" controls />
                    ) : (
                      <img src={`${BASE_URL}${proj.media}`} width="100" alt="project" />
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(proj)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(proj._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="10" className="no-data">No projects found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for editing */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Project</h3>
            <form onSubmit={handleUpdate} className="modal-form" encType="multipart/form-data">
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select a Category</option>
                {categoryOptions.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              {['name', 'technologies', 'period', 'description', 'githubLink', 'liveLink'].map((field) => field === 'description' ? (
              <textarea
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                required
                rows={4} 
              />
            ) :(
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required={['name', 'technologies', 'period'].includes(field)}
                />
              ))}
              <input type="file" name="media" accept="image/*,video/*" onChange={handleChange} />
              <div className="modal-actions">
                <button type="submit" className="submit-btn">Update</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
