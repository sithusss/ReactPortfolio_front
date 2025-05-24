import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Education.css';

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
                </div>
              ))}
            </div>

            {items.length > 3 && (
              <div className="read-more" onClick={() => toggleReadMore(category)}>
                {isExpanded ? 'Show Less' : 'Read More'}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Education;
