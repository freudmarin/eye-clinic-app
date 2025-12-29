import { useState } from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../data/services.json';
import './Services.css';

// SVG Icons for services
const serviceIcons = {
  'comprehensive-eye-exam': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  'contact-lens-fitting': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <circle cx="12" cy="12" r="1"></circle>
    </svg>
  ),
  'pediatric-eye-care': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="5"></circle>
      <path d="M20 21a8 8 0 1 0-16 0"></path>
    </svg>
  ),
  'glaucoma-screening': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
    </svg>
  ),
  'diabetic-eye-exam': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
  ),
  'dry-eye-treatment': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
    </svg>
  )
};

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Get unique categories (for demo, we'll create some)
const categories = ['All', 'Exams', 'Specialty Care', 'Treatment'];

const getCategoryForService = (slug) => {
  if (slug.includes('exam') || slug.includes('screening')) return 'Exams';
  if (slug.includes('pediatric') || slug.includes('diabetic')) return 'Specialty Care';
  return 'Treatment';
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServices = activeCategory === 'All' 
    ? servicesData 
    : servicesData.filter(s => getCategoryForService(s.slug) === activeCategory);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero__container">
          <span className="services-hero__badge">Comprehensive Care</span>
          <h1 className="services-hero__title">Our Services</h1>
          <p className="services-hero__description">
            From routine eye exams to specialized treatments, we provide comprehensive 
            eye care services tailored to your unique needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-content">
        <div className="services-content__container">
          {/* Filter Chips */}
          <div className="services-filter">
            <span className="services-filter__label">Filter by category:</span>
            <div className="services-filter__chips">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-chip ${activeCategory === category ? 'filter-chip--active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.map((service) => (
              <article key={service.id} className="service-card">
                <div className="service-card__icon">
                  {serviceIcons[service.slug] || serviceIcons['comprehensive-eye-exam']}
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.shortDescription}</p>
                <div className="service-card__meta">
                  <span className="service-card__duration">
                    <ClockIcon />
                    {service.duration}
                  </span>
                  <span className="service-card__price">{service.price}</span>
                </div>
                <Link to={`/services/${service.slug}`} className="service-card__link">
                  Learn More
                  <ArrowRightIcon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="services-cta__container">
          <h2 className="services-cta__title">Not sure which service you need?</h2>
          <p className="services-cta__description">
            Contact us for a consultation and we'll help you determine the best care for your eyes.
          </p>
          <div className="services-cta__actions">
            <Link to="/appointment" className="btn btn--primary btn--lg">
              Book a Consultation
            </Link>
            <Link to="/contact" className="btn btn--outline-white btn--lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
