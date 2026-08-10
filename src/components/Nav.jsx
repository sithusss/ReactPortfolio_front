import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass =
    'font-mono text-xs uppercase tracking-[0.2em] text-slate-300 transition duration-300 hover:text-indigo-400 pb-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full';

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/70 shadow-lg shadow-slate-950/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className={navLinkClass}>Home</Link>
          <Link to="/education" className={navLinkClass}>Education</Link>
          <Link to="/research" className={navLinkClass}>Research</Link>
          <Link to="/projects" className={navLinkClass}>Projects</Link>
          <Link to="/contact" className={navLinkClass}>Contact</Link>
        </div>

        {/* Desktop Login */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-indigo-300 transition duration-300 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="text-xl text-slate-300 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`overflow-hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl transition-[max-height] duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-2 px-6 py-4">
          <Link to="/" className="py-2 font-mono text-xs uppercase tracking-[0.15em] text-slate-300 hover:text-indigo-400" onClick={closeMenu}>Home</Link>
          <Link to="/education" className="py-2 font-mono text-xs uppercase tracking-[0.15em] text-slate-300 hover:text-indigo-400" onClick={closeMenu}>Education</Link>
          <Link to="/research" className="py-2 font-mono text-xs uppercase tracking-[0.15em] text-slate-300 hover:text-indigo-400" onClick={closeMenu}>Research</Link>
          <Link to="/projects" className="py-2 font-mono text-xs uppercase tracking-[0.15em] text-slate-300 hover:text-indigo-400" onClick={closeMenu}>Projects</Link>
          <Link to="/contact" className="py-2 font-mono text-xs uppercase tracking-[0.15em] text-slate-300 hover:text-indigo-400" onClick={closeMenu}>Contact</Link>
          <Link to="/login" className="mt-2 rounded-lg border border-indigo-500/40 bg-indigo-500/10 py-2.5 text-center font-mono text-xs uppercase tracking-[0.15em] text-indigo-300" onClick={closeMenu}>Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;