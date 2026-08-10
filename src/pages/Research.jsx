import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFlask, FaExternalLinkAlt } from 'react-icons/fa';

const Research = () => {
  const [researchList, setResearchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/research`);
        setResearchList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch research items:', err);
        setResearchList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResearch();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading research papers...</div>;

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <FaFlask className="text-indigo-400 text-lg" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400">
            Academic &amp; Systems Work
          </span>
        </div>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Research</h1>
        <div className="mt-3 h-1 w-20 rounded-full bg-indigo-500" />

        {researchList.length === 0 && (
          <p className="mt-12 text-sm text-slate-300">No research papers found.</p>
        )}

        <div className="mt-14 space-y-8">
          {researchList.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-xl transition duration-300 hover:border-indigo-400 md:flex-row"
            >
              {item.media && (
                <div className="w-full border-b border-slate-800 bg-slate-950 md:w-2/5 md:border-b-0 md:border-r">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${item.media}`}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-xs font-semibold text-indigo-300">
                      {item.domain}
                    </span>
                    {item.publication && (
                      <span className="font-mono text-xs text-slate-300 font-semibold">{item.publication}</span>
                    )}
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-white group-hover:text-indigo-300 transition duration-300">
                    {item.title}
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-slate-200">
                    {item.abstract}
                  </p>
                </div>

                {item.link && (
                  <div className="mt-6 border-t border-slate-800/80 pt-4">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition duration-300"
                    >
                      <FaExternalLinkAlt /> View Paper / Repository
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Research;