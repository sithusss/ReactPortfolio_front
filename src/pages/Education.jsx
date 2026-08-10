import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaExternalLinkAlt, FaGraduationCap } from 'react-icons/fa';

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/education`);
        setEducationData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch education data:', err);
        setEducationData([]);
      }
    };

    fetchEducation();
    AOS.init({ duration: 800, once: true });
  }, []);

  const groupByCategory = (educationList) => {
    const grouped = {};
    if (Array.isArray(educationList)) {
      educationList.forEach((edu) => {
        const category = edu.category || 'Uncategorized';
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(edu);
      });
    }
    return grouped;
  };

  const groupedData = groupByCategory(educationData);

  const toggleReadMore = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-indigo-400 text-lg" />
          <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">Background</span>
        </div>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Education</h1>
        <div className="mt-3 h-1 w-20 rounded-full bg-indigo-500" />

        {Object.keys(groupedData).length === 0 && (
          <p className="mt-12 text-sm text-slate-400">No education records found.</p>
        )}

        {Object.keys(groupedData).map((category) => {
          const items = groupedData[category];
          const isExpanded = expandedCategories[category];
          const visibleItems = isExpanded ? items : items.slice(0, 3);

          return (
            <section key={category} className="mt-16">
              <h2 className="text-2xl font-bold tracking-tight text-slate-200">{category}</h2>
              <div className="mt-6 divide-y divide-slate-800/80 rounded-2xl border border-slate-800/80 bg-slate-900/50 px-6 backdrop-blur-md shadow-xl">
                {visibleItems.map((item, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="grid grid-cols-1 gap-2 py-6 md:grid-cols-[160px_1fr_auto] md:items-start md:gap-6"
                  >
                    <span className="inline-block rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 font-mono text-xs font-semibold text-indigo-300 w-fit">
                      {item.period}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      <p className="mt-1 text-sm font-medium text-slate-400">{item.institute}</p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                        {item.description}
                      </p>
                    </div>
                    <a
                      href={item.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => !item.link && e.preventDefault()}
                      className={`mt-1 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide transition duration-300 ${
                        item.link ? 'text-indigo-400 hover:text-indigo-300' : 'cursor-default text-slate-600'
                      }`}
                    >
                      <span>Link</span>
                      <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  </div>
                ))}
              </div>

              {items.length > 3 && (
                <button
                  onClick={() => toggleReadMore(category)}
                  className="mt-6 font-mono text-xs uppercase tracking-widest text-indigo-400 hover:text-indigo-300"
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Education;