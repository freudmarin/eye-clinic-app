import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

// SVG Icons
const EyeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-icon">
            <EyeIcon />
          </span>
          <span className="header__logo-text">
            <span className="header__logo-name">ClearSight</span>
            <span className="header__logo-tagline">Eye Clinic</span>
          </span>
        </Link>
        
        <button 
          className="header__menu-toggle"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`} id="main-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
            onClick={closeMenu}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            Services
          </NavLink>
          <NavLink 
            to="/optical-shop" 
            className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            Optical Shop
          </NavLink>
          <NavLink 
            to="/doctors" 
            className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            Our Doctors
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
          <NavLink 
            to="/admin/login" 
            className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            Admin
          </NavLink>
          <NavLink 
            to="/appointment" 
            className="header__nav-cta"
            onClick={closeMenu}
          >
            Book Appointment
          </NavLink>
        </nav>

        {isMenuOpen && <div className="header__overlay" onClick={closeMenu} aria-hidden="true" />}
      </div>
    </header>
  );
}
