import React from 'react';
import '../styles/Skills.css'; // Create and style as needed

// Example logo imports (adjust to your file structure)
import androidStudio from '../assets/logos/android-studio.png';
import react from '../assets/logos/react.png';
import html from '../assets/logos/html-5.png';
import css from '../assets/logos/css.png';
import python from '../assets/logos/python.png';
import java from '../assets/logos/java.png';
import javascript from '../assets/logos/java-script.png';
import php from '../assets/logos/php.png';
import c from '../assets/logos/c.png';
import cpp from '../assets/logos/c++.png';
import mysql from '../assets/logos/mysql.png';
import sqlServer from '../assets/logos/sql-server.png';
import sqlite from '../assets/logos/sqlite.png';
import mongodb from '../assets/logos/mongo.png';
import tensorflow from '../assets/logos/tensorflow.png';
import keras from '../assets/logos/keras.png';
import numpy from '../assets/logos/numpy.png';
import pandas from '../assets/logos/pandas.png';
import git from '../assets/logos/git.png';
import github from '../assets/logos/github.png';
import trello from '../assets/logos/trello.png';
import clickup from '../assets/logos/clickup.png';
import figma from '../assets/logos/figma.png';
import jira from '../assets/logos/jira.png';
import postman from '../assets/logos/postman.png';
import nodejs from '../assets/logos/node.png';


// ... (Import all others similarly)

const Skills = () => {
  return (
    <div className="skills-section" data-aos="fade-up">
      <div className="skills-grid">
        {/* Web/Mobile Development */}
        <div className="skill-category" data-aos="zoom-in" data-aos-delay="100">
          <h3>Web / Mobile Development</h3>
          <div className="logo-grid">
            <img src={androidStudio} alt="Android Studio" />
            <img src={react} alt="ReactJS" />
            <img src={html} alt="HTML" />
            <img src={css} alt="CSS" />
            <img src={nodejs} alt="Node.js" />
          </div>
        </div>

        {/* Programming Languages */}
        <div className="skill-category" data-aos="zoom-in" data-aos-delay="200">
          <h3>Programming Languages</h3>
          <div className="logo-grid">
            <img src={python} alt="Python" />
            <img src={java} alt="Java" />
            <img src={javascript} alt="JavaScript" />
            <img src={php} alt="PHP" />
            <img src={c} alt="C" />
            <img src={cpp} alt="C++" />
          </div>
        </div>

        {/* AI & Databases */}
        <div className="skill-category" data-aos="zoom-in" data-aos-delay="300">
          <h3>AI & Databases</h3>
          <div className="logo-grid">
            <img src={mysql} alt="MySQL" />
            <img src={sqlServer} alt="SQL Server" />
            <img src={sqlite} alt="SQLite" />
            <img src={mongodb} alt="MongoDB" />
            <img src={tensorflow} alt="TensorFlow" />
            <img src={keras} alt="Keras" />
            <img src={numpy} alt="NumPy" />
            <img src={pandas} alt="Pandas" />
            
          </div>
        </div>

        {/* Other Tools */}
        <div className="skill-category" data-aos="zoom-in" data-aos-delay="400">
          <h3>Other Tools</h3>
          <div className="logo-grid">
            <img src={git} alt="Git" />
            <img src={github} alt="GitHub" />
            <img src={trello} alt="Trello" />
            <img src={clickup} alt="ClickUp" />
            <img src={figma} alt="Figma" />
            <img src={jira} alt="Jira" />
            <img src={postman} alt="Postman" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
