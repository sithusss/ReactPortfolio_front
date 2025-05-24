import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Education.css';
import '../styles/Admin.css'; // Assuming you have a CSS file for styling
import AdminProjectPanel from '../components/AdminProjectPanel';
import Messages from '../components/Messages'; // Import at the top
import { FaMessage } from 'react-icons/fa6';



export default function AdminPanel() {
const [educations, setEducations] = useState([]);
const [formData, setFormData] = useState({
category: '',
name: '',
institute: '',
period: '',
description: ''
});
const [editingId, setEditingId] = useState(null);
const [showModal, setShowModal] = useState(false);
const [showMessagesModal, setShowMessagesModal] = useState(false);


const fetchEducations = async () => {
try {
const res = await axios.get('http://localhost:5000/api/education');
setEducations(res.data);
} catch (err) {
console.error('Error fetching educations:', err);
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
// Only handle new education creation
await axios.post('http://localhost:5000/api/education', formData);

  // Reset form and refresh data
  setFormData({ 
    category: '', 
    name: '', 
    institute: '', 
    period: '', 
    description: '' 
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
    category:edu.category, 
    name:edu.name, 
    institute:edu.institute, 
    period: edu.period, 
    description: edu.description
    });
    setEditingId(edu._id);
    setShowModal(true);
};


const handleUpdate = async (e) => {
e.preventDefault();
try {
// Handle only updates
await axios.put(`http://localhost:5000/api/education/${editingId}`, formData);


  // Reset form and refresh data
  setFormData({ 
    category: '', 
    name: '', 
    institute: '', 
    period: '', 
    description: '' 
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
await axios.delete(`http://localhost:5000/api/education/${id}`);
fetchEducations();
} catch (err) {
console.error('Error deleting education:', err);
}
};

// Define the category options

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

          {['name', 'institute', 'period', 'description'].map((field) => (
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {educations.length > 0 ? (
              educations.map((edu) => (
                <tr key={edu._id}>
                  <td>{edu.eduId}</td>
                  <td>{edu.category}</td>
                  <td>{edu.name}</td>
                  <td>{edu.institute}</td>
                  <td>{edu.period}</td>
                  <td>{edu.description}</td>
                  <td>
                    <button onClick={() => handleEditClick(edu)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(edu._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="no-data">No data found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <div className='projets'>
      <AdminProjectPanel />
    </div>
    

    {/* Modal for editing */}
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
            {['name', 'institute', 'period', 'description'].map((field) => (
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
