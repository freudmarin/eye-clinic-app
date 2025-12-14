import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">👁️</span>
          <span className="logo-text">ClearSight Eye Clinic</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/optical-shop" className="nav-link">Optical Shop</Link>
          <Link to="/doctors" className="nav-link">Our Doctors</Link>
          <Link to="/appointment" className="nav-link">Book Appointment</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/admin/login" className="nav-link admin-login-btn">Admin Login</Link>
        </nav>
      </div>
    </header>
  );
}
