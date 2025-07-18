import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Education.css';
import '../styles/Admin.css';
import AdminProjectPanel from '../components/AdminProjectPanel';
import Messages from '../components/Messages';
import { FaMessage } from 'react-icons/fa6';

export default function AdminPanel() {
  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    institute: '',
    period: '',
    description: '',
    link: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  const fetchEducations = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/education`);
      setEducations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching educations:', err);
      setEducations([]);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/education`, formData);
      setFormData({
        category: '',
        name: '',
        institute: '',
        period: '',
        description: '',
        link: ''
      });
      fetchEducations();
      alert('Education added successfully!');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert(`Add failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEditClick = (edu) => {
    setFormData({
      category: edu.category,
      name: edu.name,
      institute: edu.institute,
      period: edu.period,
      description: edu.description,
      link: edu.link
    });
    setEditingId(edu._id);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/education/${editingId}`, formData);
      setFormData({
        category: '',
        name: '',
        institute: '',
        period: '',
        description: '',
        link: ''
      });
      setShowModal(false);
      setEditingId(null);
      fetchEducations();
      alert('Education updated successfully!');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert(`Update failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/education/${id}`);
      fetchEducations();
    } catch (err) {
      console.error('Error deleting education:', err);
    }
  };

  const categoryOptions = [
    'Higher Education',
    'Education',
    'Courses & Certifications'
  ];

  return (
    <div className='main-body'>
      <button onClick={() => setShowMessagesModal(true)} className="messages-btn"><FaMessage /></button>
      <div className="admin-main-container">
        <div className="education">
          <h2 className="admin-title">🎓 Education Management Panel</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <h3 className="form-title">{editingId ? 'Edit Education' : 'Add New Education'}</h3>
            <div className="form-grid">
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select a Category</option>
                {categoryOptions.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              {['name', 'institute', 'period', 'description', 'link'].map((field) => field === 'description' ? (
                <textarea
                  key={field}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              ) : (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              ))}
            </div>
            <button type="submit" className="submit-btn">
              {editingId ? 'Update' : 'Add'} Education
            </button>
          </form>
          <div className="admin-table-container">
            <h3 className="table-title">📋 Education List</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Institute</th>
                  <th>Period</th>
                  <th>Description</th>
                  <th>Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(educations) && educations.length > 0 ? (
                  educations.map((edu) => (
                    <tr key={edu._id}>
                      <td>{edu.eduId}</td>
                      <td>{edu.category}</td>
                      <td>{edu.name}</td>
                      <td>{edu.institute}</td>
                      <td>{edu.period}</td>
                      <td>{edu.description}</td>
                      <td>{edu.link}</td>
                      <td>
                        <button onClick={() => handleEditClick(edu)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(edu._id)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8" className="no-data">No data found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className='projets'>
          <AdminProjectPanel />
        </div>
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Edit Education</h3>
              <form onSubmit={handleUpdate} className="modal-form">
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select a Category</option>
                  {categoryOptions.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
                {['name', 'institute', 'period', 'description', 'link'].map((field) => field === 'description' ? (
                  <textarea
                    key={field}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    rows={4}
                  />
                ) : (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                ))}
                <div className="modal-actions">
                  <button type="submit" className="submit-btn">Update</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showMessagesModal && (
          <Messages onClose={() => setShowMessagesModal(false)} />
        )}
      </div>
    </div>
  );
}