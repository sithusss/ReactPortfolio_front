import React, { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaPaperPlane } from "react-icons/fa";

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

  const inputClass = 
    "w-full border-b border-slate-800 bg-transparent py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition duration-300";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white grid grid-cols-1 md:grid-cols-2">
      {/* Left: Info Section */}
      <div className="flex flex-col justify-center border-r border-slate-900 bg-slate-900/40 px-8 py-20 md:px-16" data-aos="fade-right">
        <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">Get in touch</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl">Contact Info</h1>

        <div className="mt-12 space-y-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-indigo-400">
              <FaMapMarkerAlt />
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Kandy, <br />Central Province, <br /> Sri Lanka. <br /> 20000
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-indigo-400">
              <FaPhoneAlt />
            </div>
            <p className="text-sm text-slate-300">+94 703 757 159</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-indigo-400">
              <FaEnvelope />
            </div>
            <p className="text-sm text-slate-300">sithumanisandali@gmail.com</p>
          </div>
        </div>

        <div className="mt-12 flex gap-4 text-lg">
          {[
            { href: "https://www.linkedin.com/in/sandali-liyanage/", icon: <FaLinkedin /> },
            { href: "https://github.com/sithusss/", icon: <FaGithub /> },
            { href: "https://web.facebook.com/profile.php?id=61563900005379&sk=about", icon: <FaFacebook /> },
            { href: "https://www.instagram.com/sithumanisandali/", icon: <FaInstagram /> }
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-slate-400 transition duration-300 hover:border-indigo-500 hover:text-indigo-400"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center bg-slate-950 px-8 py-20 md:px-16" data-aos="fade-left">
        <div className="w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 backdrop-blur-md shadow-xl md:p-10">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">Message</span>
          <h2 className="mt-2 text-2xl font-bold text-white">Send Me A Message</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-indigo-500" />
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className={inputClass}
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className={inputClass}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={4}
              className={inputClass}
            />
            <button
              type="submit"
              className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 py-3 font-mono text-xs uppercase tracking-widest text-white transition duration-300 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
            >
              Send Message <FaPaperPlane className="text-[10px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;