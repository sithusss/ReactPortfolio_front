// ==== React Component: Messages.jsx ====
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Messages.css';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

const Messages = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [readMessages, setReadMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/contact');
        const unread = res.data.filter(msg => msg.status !== 'read');
        const read = res.data.filter(msg => msg.status === 'read');
        setMessages(unread);
        setReadMessages(read);
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };

    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/contact/${id}/read`);
      const updatedMsg = messages.find(msg => msg._id === id);
      if (updatedMsg) {
        updatedMsg.status = 'read';
        setMessages(prev => prev.filter(msg => msg._id !== id));
        setReadMessages(prev => [...prev, updatedMsg]);
      }
    } catch (err) {
      console.error('Error marking message as read', err);
    }
  };

  const handleDelete =async(id) => { 
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setReadMessages(prev => prev.filter(msg => msg._id !== id));
    } catch (err) {
      console.error('Error deleting message', err);
    }
   };

  return (
    <div className="modal-backdrop">
      <div className="messages-container modal">
        <div className="messages-actions">
          <button type="button" className="cancel-btn" onClick={onClose}><FaDeleteLeft /></button>
        </div>
        <h2>📩 Received Messages</h2>
        <table className="messages-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Created At</th>
              <th>Read</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleMarkAsRead(msg._id)} className="read-btn">
                    <FaEnvelopeOpenText />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>✅ Read Messages</h2>
        <table className="messages-table read">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Read At</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {readMessages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.updatedAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(msg._id)} className="delete-btn">
                    <FaDeleteLeft/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Messages;
