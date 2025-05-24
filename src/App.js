import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './pages/Login';
import Intro from './pages/Intro';
import Admin from './pages/Admin';
import Education from './pages/Education'; 
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminProjecPanel from './components/AdminProjectPanel';
import Messages from './components/Messages';
import Skills from './components/Skills';
import './styles/Navbar.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const App = () => {

   useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div>
      <Router>
        
          <Nav />
          <Routes>
            
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Intro />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/education" element={<Education />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-project-panel" element={<AdminProjecPanel />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/skills" element={<Skills />} />

          </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;