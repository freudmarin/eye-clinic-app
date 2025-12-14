import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Welcome to ClearSight Eye Clinic</h1>
          <p className="hero-subtitle">Comprehensive Eye Care for the Whole Family</p>
          <p className="hero-description">
            We provide state-of-the-art eye care services with a personal touch. 
            Our experienced team is dedicated to protecting and enhancing your sight.
          </p>
          <div className="hero-actions">
            <Link to="/appointment" className="btn btn-primary">Book an Appointment</Link>
            <Link to="/services" className="btn btn-secondary">View Our Services</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose ClearSight Eye Clinic?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Expert Doctors</h3>
              <p>Board-certified optometrists and ophthalmologists with years of experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Advanced Technology</h3>
              <p>State-of-the-art diagnostic and treatment equipment</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>Family-Friendly</h3>
              <p>Comprehensive care for patients of all ages</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏪</div>
              <h3>Optical Shop</h3>
              <p>Wide selection of frames, lenses, and contact lenses</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to See Clearly?</h2>
          <p>Schedule your comprehensive eye exam today</p>
          <p><Link to="/appointment" className="text-link">Schedule an appointment →</Link></p>
        </div>
      </section>
    </div>
  );
}
