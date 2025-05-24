import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaBars } from 'react-icons/fa';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Left Side Navigation */}
      <div className="navbar-left">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/education" className="nav-button">Education</Link>
        <Link to="/projects" className="nav-button">Projects</Link>
        <Link to="/contact" className="nav-button">Contact</Link>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <FaBars />
      </div>

      {/* Right Side Login */}
      <div className="navbar-right">
        <Link to="/login" className="login-button">Login</Link>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
        <Link to="/" className="nav-button" onClick={closeMenu}>Home</Link>
        <Link to="/education" className="nav-button" onClick={closeMenu}>Education</Link>
        <Link to="/projects" className="nav-button" onClick={closeMenu}>Projects</Link>
        <Link to="/contact" className="nav-button" onClick={closeMenu}>Contact</Link>
      </div>
    </nav>
  );
};

export default Nav;
