import React from 'react';

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

const categories = [
  {
    label: '01 — Web / Mobile',
    logos: [
      { src: androidStudio, alt: 'Android Studio' },
      { src: react, alt: 'ReactJS' },
      { src: html, alt: 'HTML' },
      { src: css, alt: 'CSS' },
      { src: nodejs, alt: 'Node.js' },
    ],
  },
  {
    label: '02 — Languages',
    logos: [
      { src: python, alt: 'Python' },
      { src: java, alt: 'Java' },
      { src: javascript, alt: 'JavaScript' },
      { src: php, alt: 'PHP' },
      { src: c, alt: 'C' },
      { src: cpp, alt: 'C++' },
    ],
  },
  {
    label: '03 — AI & Databases',
    logos: [
      { src: mysql, alt: 'MySQL' },
      { src: sqlServer, alt: 'SQL Server' },
      { src: sqlite, alt: 'SQLite' },
      { src: mongodb, alt: 'MongoDB' },
      { src: tensorflow, alt: 'TensorFlow' },
      { src: keras, alt: 'Keras' },
      { src: numpy, alt: 'NumPy' },
      { src: pandas, alt: 'Pandas' },
    ],
  },
  {
    label: '04 — Tools',
    logos: [
      { src: git, alt: 'Git' },
      { src: github, alt: 'GitHub' },
      { src: trello, alt: 'Trello' },
      { src: clickup, alt: 'ClickUp' },
      { src: figma, alt: 'Figma' },
      { src: jira, alt: 'Jira' },
      { src: postman, alt: 'Postman' },
    ],
  },
];

const Skills = () => {
  return (
    <div data-aos="fade-up">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <div
            key={cat.label}
            data-aos="zoom-in"
            data-aos-delay={i * 100}
            className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-indigo-400"
          >
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400 mb-5">{cat.label}</h3>
            <div className="flex flex-wrap gap-4">
              {cat.logos.map((logo) => (
                <div key={logo.alt} className="group relative flex items-center justify-center rounded-xl border flex h-14 w-14 items-center justify-center rounded-lg bg-slate-50 p-1">
    
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.alt}
                  className="h-7 w-7 object-contain"
                />

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;