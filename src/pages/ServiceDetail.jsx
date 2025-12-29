import { useParams, Link, Navigate } from 'react-router-dom';
import servicesData from '../data/services.json';
import './ServiceDetail.css';

// SVG Icons
const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="service-detail">
      {/* Hero Section */}
      <section className="service-detail__hero">
        <div className="service-detail__hero-container">
          <Link to="/services" className="service-detail__back">
            <ArrowLeftIcon />
            Back to Services
          </Link>
          <h1 className="service-detail__title">{service.title}</h1>
          <p className="service-detail__subtitle">{service.shortDescription}</p>
          
          <div className="service-detail__quick-facts">
            <div className="quick-fact">
              <div className="quick-fact__icon">
                <ClockIcon />
              </div>
              <div className="quick-fact__content">
                <span className="quick-fact__label">Duration</span>
                <span className="quick-fact__value">{service.duration}</span>
              </div>
            </div>
            <div className="quick-fact">
              <div className="quick-fact__icon">
                <DollarIcon />
              </div>
              <div className="quick-fact__content">
                <span className="quick-fact__label">Price</span>
                <span className="quick-fact__value">{service.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="service-detail__content">
        <div className="service-detail__content-container">
          <div className="service-detail__main">
            {/* Overview */}
            <div className="service-detail__section">
              <h2 className="service-detail__section-title">Overview</h2>
              <p className="service-detail__text">{service.description}</p>
            </div>

            {/* What's Included */}
            <div className="service-detail__section">
              <h2 className="service-detail__section-title">What's Included</h2>
              <ul className="service-detail__features">
                {service.features.map((feature, index) => (
                  <li key={index} className="service-detail__feature">
                    <span className="service-detail__feature-icon">
                      <CheckIcon />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="service-detail__sidebar">
            <div className="service-detail__cta-card">
              <h3 className="service-detail__cta-title">Ready to schedule?</h3>
              <p className="service-detail__cta-text">
                Book your appointment online or give us a call. We're here to help!
              </p>
              <Link to={`/appointment?service=${encodeURIComponent(service.title)}`} className="btn btn--primary btn--lg btn--full">
                <CalendarIcon />
                Book Appointment
              </Link>
              <div className="service-detail__cta-divider">
                <span>or</span>
              </div>
              <a href="tel:+15551234567" className="btn btn--outline btn--lg btn--full">
                <PhoneIcon />
                (555) 123-4567
              </a>
              <p className="service-detail__cta-note">
                We'll confirm your appointment within 24 hours
              </p>
            </div>

            {/* Hours Card */}
            <div className="service-detail__info-card">
              <h4 className="service-detail__info-title">Office Hours</h4>
              <ul className="service-detail__hours">
                <li><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></li>
                <li><span>Saturday</span><span>9:00 AM - 3:00 PM</span></li>
                <li><span>Sunday</span><span>Closed</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
