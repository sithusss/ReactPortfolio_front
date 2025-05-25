import React from 'react';
import '../styles/Intro.css';
import '../styles/KeyFrames.css';
import MyImage from'../assets/images/Sandali Liyanage.png';
import Karate from '../assets/images/karate.jpg';
import Announcing from '../assets/images/announcing.jpg';
import TechOne from '../assets/images/tech1.jpg';
import TechTwo from '../assets/images/tec2.jpg';
import LeadershipOne from '../assets/images/leader1.jpg';
import LeadershipTwo from '../assets/images/leader2.jpg';
import VolunteeringOne from '../assets/images/ieee.png';
import VolunteeringTwo from '../assets/images/Rotaract.png';
import backgroundImage1 from '../assets/images/bg3.png';
import Skills from '../components/Skills'; // Import the Skills component
import Img1 from '../assets/image-bar/img1.png';
import Img2 from '../assets/image-bar/img2.jpg';
import Img3 from '../assets/image-bar/img3.jpg';
import Img4 from '../assets/image-bar/img4.jpg';
import Img5 from '../assets/image-bar/img5.jpg';
import Img6 from '../assets/image-bar/img6.jpg';
import Img7 from '../assets/image-bar/img7.jpg';
import Img8 from '../assets/image-bar/img8.jpg';
import Img9 from '../assets/image-bar/img9.jpg';
import Img10 from '../assets/image-bar/img10.jpg';

const imageBarImages = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10];

// Initialize AOS (Animate On Scroll) library for animations

const Intro = () => {
  React.useEffect(() => {
    const AOS = require('aos');
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="intro-container">
      {/* Image Section */}
      <div className="image-section" data-aos="fade-right">
        <img
          src= {MyImage} // Replace with your image URL
          alt="Profile-image"
          className="profile-image"
        />
      </div>
      <img src={backgroundImage1} alt="Person Top Right" className="decorative-image1 top-right" />
      {/* Initial Details Section */}
      <div className="details-section" data-aos="fade-left">
        <h1 className="name">Sandali Liyanage</h1>
        <p className="role">Software Developer | Tech Enthusiast</p>
        <p className="description">
        Hi, I'm Sandali Liyanage, an IT undergraduate passionate about technology, innovation, and problem-solving. With a strong foundation in full-stack development, AI/ML, and Android development. Beyond coding, I’m a dynamic leader, an active volunteer, and a passionate public speaker. I’m excited to leverage my skills and experience to create innovative solutions that make a positive impact on the world.
        </p>
        {/*
          <p className='description'>Soft Skills</p>
          <p className='description'>Leadership & Team Management</p>
          <p className='description'>Problem-Solving & Critical Thinking</p>
          <p className='description'>Public Speaking & Communication</p>
          <p className='description'>Adaptability & Quick Learning</p>
          <p className='description'>Mentorship & Collaboration</p>
          */}


      </div>

      {/* What I Do Section */}
      <div className="what-i-do-section" data-aos="fade-up">
        <h2>W H A T  &nbsp;C A N &nbsp; I &nbsp; D O</h2>
        
        <div className="what-i-do-content">
          {/* Tech Background Section */}
          <div className="category" data-aos="zoom-in" data-aos-delay="100">
            <h3>Tech Background</h3>
            <div className="image-group">
                <img
                  src={TechOne} // Replace with your image URL
                  alt="Tech 1"
                  className="sub-image"
                />
                <img
                  src={TechTwo} // Replace with your image URL
                  alt="Tech 2"
                  className="sub-image"
                />
            </div>
            <div className="sub-content">
              <p>
                I am an IT undegradute who actively participate in hackathons and coding competitions including
                Codegoda by Agoda and, completing learning paths on IT . My expertise lies in:
              
              <ul>
                <li><strong> Web Full-Stack Development</strong></li>
                <li><strong>AI/ML</strong> </li>
                <li><strong>Android Development</strong></li>
                <li><strong>UI/UX design</strong></li>
              </ul>
              </p>
             
            </div>
          </div>
          
          {/* Leadership Section */}
          <div className="category" data-aos="zoom-in" data-aos-delay="200">
            <h3>Leadership</h3>
              <div className="image-group">
                <img
                  src={LeadershipOne} // Replace with your image URL
                  alt="Leadership 1"
                  className="sub-image"
                />
                <img
                  src={LeadershipTwo} // Replace with your image URL
                  alt="Leadership 2"
                  className="sub-image"
                />
              </div>
            <div className="sub-content">
              <p>I believe in leading by example and fostering collaboration. My leadership experience includes:
                <ul>
                  <li><strong>Assistant Secretary of Charter Excom</strong> – Rotaract Club of Rajarata University</li>
                  <li><strong>Founding Chairperson</strong> – IEEE WIE Student Branch Affinity Group of RUSL</li>
                  <li><strong>Senior Prefect</strong> – School Prefect Guild</li>
                  <li><strong>Starter President</strong> – School Debating Unit</li>
                </ul>
                </p>
              
            </div>
          </div>
          
          {/* Volunteering Section */}
          <div className="category" data-aos="zoom-in" data-aos-delay="300">
            <h3>Volunteering</h3>
              <div className="image-group">
                <img
                  src={VolunteeringOne} // Replace with your image URL
                  alt="Volunteering 1"
                  className="sub-image"
                />
                <img
                  src={VolunteeringTwo} // Replace with your image URL
                  alt="Volunteering 2"
                  className="sub-image"
                />
              </div>
            <div className="sub-content">
              <p>
            Giving back to the community is close to my heart. I actively contribute to various organizations, including:
              <ul>
                <li><strong>IEEE & IEEE WIE</strong> – Promoting STEM education and women in tech</li>
                <li><strong>Rotaract</strong> – Engaging in social service and youth empowerment programs</li>
                <li><strong>Volunteer Teacher</strong> – Teaching Mathematics and IT to underprivileged students</li>
                <li><strong>SEDSSL & SEDSOUSL</strong> – Former member, contributing to student development initiatives</li>
              </ul>
              </p>
              
            </div>
          </div>
          
          {/* Other Activities Section */}
          <div className="category" data-aos="zoom-in" data-aos-delay="400">
            <h3>Other Activities</h3>
              <div className="image-group">
                <img
                  src={Karate}// Replace with your image URL
                  alt="Other Activities 1"
                  className="sub-image"
                />
                <img
                  src={Announcing} // Replace with your image URL
                  alt="Other Activities 2"
                  className="sub-image"
                />
              </div>
            <div className="sub-content">
            <p>Beyond tech and leadership, I have a passion for public speaking, debating, and physical fitness.
              <ul>
                <li><strong>Public Speaker & Announcer</strong> – Hosted tech events and university programs and School progams</li>
                <li><strong>Program Presenter</strong> – Conducted various events and, former child Radio Presenter of SLBC</li>
                <li><strong>Debater</strong> – Former debate team member of School and, Starter President of the School Debating Unit</li>
                <li><strong>Karate Player</strong> – Disciplined in martial arts, embracing perseverance and self-control</li>
                <li><strong>Former Cadet</strong> – National Cadet Corps Sri Lanka, instilling discipline and resilience</li>
              </ul>
              </p>
              
            </div>
          </div>
        </div>
      </div>

      {/* skills section Section */}
      <div className="what-i-do-section" data-aos="fade-up">
        <h2>S K I L L S</h2>
        <div className="skills-content">
          <Skills />
        </div>
        
      </div>
              {/* Animated Image Bar Section */}
        <div className="image-bar-section" data-aos="fade-up">
          <h2>M O R E &nbsp; A B O U T &nbsp; M E</h2>
          <div className="image-bar">
            <div className="image-track">
              {[...imageBarImages, ...imageBarImages].map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`img${index + 1}`}
                  className="bar-image"
                />
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Intro;
