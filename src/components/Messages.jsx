import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

const Messages = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [readMessages, setReadMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/contact`);
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
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/contact/${id}/read`);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/contact/${id}`);
      setReadMessages(prev => prev.filter(msg => msg._id !== id));
    } catch (err) {
      console.error('Error deleting message', err);
    }
  };

  const thClass = "px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-indigo-400";
  const tdClass = "px-4 py-3 text-sm text-slate-300 align-top";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4">
      <div className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl text-slate-100">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-lg text-slate-400 transition hover:text-white"
            aria-label="Close"
          >
            <FaDeleteLeft />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-white">Received Messages</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full border-collapse">
            <thead className="border-b border-slate-800 bg-slate-900">
              <tr>
                <th className={thClass}>Name</th>
                <th className={thClass}>Email</th>
                <th className={thClass}>Message</th>
                <th className={thClass}>Created At</th>
                <th className={thClass}>Read</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {messages.map((msg) => (
                <tr key={msg._id}>
                  <td className={tdClass}>{msg.name}</td>
                  <td className={tdClass}>{msg.email}</td>
                  <td className={tdClass}>{msg.message}</td>
                  <td className={tdClass}>{new Date(msg.createdAt).toLocaleString()}</td>
                  <td className={tdClass}>
                    <button
                      onClick={() => handleMarkAsRead(msg._id)}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <FaEnvelopeOpenText />
                    </button>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr><td colSpan="5" className="px-4 py-6 text-center text-sm text-slate-500">No unread messages</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-white">Read Messages</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full border-collapse">
            <thead className="border-b border-slate-800 bg-slate-900">
              <tr>
                <th className={thClass}>Name</th>
                <th className={thClass}>Email</th>
                <th className={thClass}>Message</th>
                <th className={thClass}>Read At</th>
                <th className={thClass}>Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {readMessages.map((msg) => (
                <tr key={msg._id}>
                  <td className={tdClass}>{msg.name}</td>
                  <td className={tdClass}>{msg.email}</td>
                  <td className={tdClass}>{msg.message}</td>
                  <td className={tdClass}>{new Date(msg.updatedAt).toLocaleString()}</td>
                  <td className={tdClass}>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <FaDeleteLeft />
                    </button>
                  </td>
                </tr>
              ))}
              {readMessages.length === 0 && (
                <tr><td colSpan="5" className="px-4 py-6 text-center text-sm text-slate-500">No read messages</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Messages;