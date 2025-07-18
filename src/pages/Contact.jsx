import React, { useState } from "react";
import axios from "axios";
import "../styles/Contact.css";
import backgroundImage1 from '../assets/images/bg1.png';

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/contact`, formData);
      alert("Message sent!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }
  };

  return (
    <div className="contact-container">
      {/* Left Side */}
      <div className="contact-left" data-aos="fade-right">
        <img src={backgroundImage1} alt="Person Top Right" className="decorative-image4 top-right" />
        <h1>C O N T A C T &nbsp; I N F O</h1>

        <div className="info-item" data-aos="fade-up" data-aos-delay="100">
          <FaMapMarkerAlt className="icon" />
          <p> Kandy, <br />Central Province, <br /> Sri Lanka. <br /> 20000</p>
        </div>

        <div className="info-item" data-aos="fade-up" data-aos-delay="300">
          <FaPhoneAlt className="icon" />
          <p>+94 703 757 159</p>
        </div>

        <div className="info-item" data-aos="fade-up" data-aos-delay="400">
          <FaEnvelope className="icon" />
          <p>sithumanisandali@gmail.com</p>
        </div>

        <div className="social-icons" data-aos="fade-up" data-aos-delay="500">
          <a href="https://www.linkedin.com/in/sandali-liyanage/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://github.com/sithusss/" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://web.facebook.com/profile.php?id=61563900005379&sk=about" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://www.instagram.com/sithumanisandali/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>

      {/* Right Side */}
      <div className="contact-right" data-aos="fade-left">
        <h2>Send Me A Message</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>

  );
};

export default ContactPage;
