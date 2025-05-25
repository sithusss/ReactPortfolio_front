import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Education.css';
import backgroundImage1 from '../assets/images/bg5.jpg';
import backgroundImage2 from '../assets/images/bg6.jpg';
import {FaExternalLinkAlt } from 'react-icons/fa';

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/education');
        setEducationData(res.data);
      } catch (err) {
        console.error('Failed to fetch education data:', err);
      }
    };

    fetchEducation();
    AOS.init({ duration: 1000 });
  }, []);

  const groupByCategory = (educationList) => {
    const grouped = {};
    educationList.forEach(edu => {
      const category = edu.category || 'Uncategorized';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(edu);
    });
    return grouped;
  };

  const groupedData = groupByCategory(educationData);

  const toggleReadMore = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="edu-container">
      <h1>E D U C A T I O N</h1>

      <img src={backgroundImage2} alt="Person Bottom Left" className="decorative-image3 bottom-left" />
      <img src={backgroundImage1} alt="Person Top Right" className="decorative-image3 top-right" />

      {Object.keys(groupedData).map((category) => {
        const items = groupedData[category];
        const isExpanded = expandedCategories[category];
        const visibleItems = isExpanded ? items : items.slice(0, 3);

        return (
          <section key={category}>
            <h2>{category}</h2>
            <div className="edu-box-container">
              {visibleItems.map((item, index) => (
                <div
                  className="edu-box"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h3>{item.name}</h3>
                  <p className="edu-meta">{item.period} | {item.institute}</p>
                  <p className="edu-description">{item.description}</p>
                  <div className="links">
                    <a href={item.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`link-icon ${!item.link ? 'disabled' : ''}`}
                      onClick={e => !item.link && e.preventDefault()}>                            
                    <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
                
              ))}
            </div>

            {items.length > 3 && (
              <div className="read-more" onClick={() => toggleReadMore(category)}>
                {isExpanded ? 'Show Less...' : 'Read More...'}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Education;
