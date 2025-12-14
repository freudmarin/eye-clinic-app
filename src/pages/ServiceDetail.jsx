import { useParams, Link, Navigate } from 'react-router-dom';
import servicesData from '../data/services.json';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="service-detail">
      <Link to="/services" className="back-link">
        <span className="back-arrow">←</span> Back to Services
      </Link>
      
      <div className="hero-section">
        <div className="container">
          <h1>{service.title}</h1>
          <p className="hero-description">{service.shortDescription}</p>
          <div className="hero-meta">
            <div className="meta-badge">
              <span className="meta-icon">⏱️</span>
              <div>
                <div className="meta-label">Duration</div>
                <div className="meta-value">{service.duration}</div>
              </div>
            </div>
            <div className="meta-badge">
              <span className="meta-icon">💰</span>
              <div>
                <div className="meta-label">Price</div>
                <div className="meta-value">{service.price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="content-wrapper">
          <section className="overview-section">
            <h2>Overview</h2>
            <p className="overview-text">{service.description}</p>
          </section>

          <section className="features-section">
            <h2>What's Included</h2>
            <div className="features-grid">
              {service.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <span className="check-icon">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="cta-box">
          <div className="cta-content">
            <h3>Ready to schedule this service?</h3>
            <p>Book your appointment online or contact us at <strong>(555) 123-4567</strong></p>
            <Link to="/appointment" className="btn btn-primary">Book Appointment Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
