import { Link } from 'react-router-dom';
import doctorsData from '../data/doctors.json';
import './Doctors.css';

// SVG Icons
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default function Doctors() {
  return (
    <div className="doctors-page">
      {/* Hero Section */}
      <section className="doctors-hero">
        <div className="doctors-hero__container">
          <span className="doctors-hero__badge">Expert Care</span>
          <h1 className="doctors-hero__title">Meet Our Doctors</h1>
          <p className="doctors-hero__description">
            Our team of experienced eye care specialists is dedicated to providing 
            personalized care and the best possible outcomes for your vision health.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="doctors-content">
        <div className="doctors-content__container">
          <div className="doctors-grid">
            {doctorsData.map(doctor => (
              <article key={doctor.id} className="doctor-card">
                <div className="doctor-card__image-wrapper">
                  <img 
                    src={doctor.image} 
                    alt={`${doctor.name} - ${doctor.specialty}`}
                    className="doctor-card__image"
                  />
                  <div className="doctor-card__overlay">
                    <Link to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`} className="doctor-card__schedule-btn">
                      <CalendarIcon />
                      Schedule with {doctor.name.split(' ')[1]}
                    </Link>
                  </div>
                </div>
                <div className="doctor-card__content">
                  <h3 className="doctor-card__name">{doctor.name}</h3>
                  <p className="doctor-card__specialty">{doctor.specialty}</p>
                  <p className="doctor-card__bio">{doctor.bio}</p>
                  <div className="doctor-card__contact">
                    <a href={`tel:${doctor.phone}`} className="doctor-card__contact-item">
                      <PhoneIcon />
                      <span>{doctor.phone}</span>
                    </a>
                    <a href={`mailto:${doctor.email}`} className="doctor-card__contact-item">
                      <MailIcon />
                      <span>{doctor.email}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="doctors-cta">
        <div className="doctors-cta__container">
          <h2 className="doctors-cta__title">Ready to Schedule Your Visit?</h2>
          <p className="doctors-cta__description">
            Book an appointment with one of our specialists today.
          </p>
          <Link to="/appointment" className="btn btn--primary btn--lg">
            <CalendarIcon />
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
