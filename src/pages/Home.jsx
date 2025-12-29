import { Link } from 'react-router-dom';
import './Home.css';

// SVG Icons
const UserMdIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
    <path d="M12 11v4"></path>
    <path d="M10 13h4"></path>
  </svg>
);

const MicroscopeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 18h8"></path>
    <path d="M3 22h18"></path>
    <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
    <path d="M9 14h2"></path>
    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
  </svg>
);

const UsersIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const GlassesIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="6" cy="15" r="4"></circle>
    <circle cx="18" cy="15" r="4"></circle>
    <path d="M14 15a2 2 0 0 0-4 0"></path>
    <path d="M2.5 13.5L2 12"></path>
    <path d="M21.5 13.5L22 12"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const features = [
  {
    icon: <UserMdIcon />,
    title: 'Expert Doctors',
    description: 'Board-certified optometrists and ophthalmologists with decades of combined experience.'
  },
  {
    icon: <MicroscopeIcon />,
    title: 'Advanced Technology',
    description: 'State-of-the-art diagnostic and treatment equipment for precise care.'
  },
  {
    icon: <UsersIcon />,
    title: 'Family-Friendly',
    description: 'Comprehensive care for patients of all ages, from children to seniors.'
  },
  {
    icon: <GlassesIcon />,
    title: 'Optical Shop',
    description: 'Wide selection of designer frames, lenses, and contact lenses.'
  }
];

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '25K+', label: 'Patients Served' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '6', label: 'Specialist Doctors' }
];

const testimonials = [
  {
    quote: "The team at ClearSight made my experience comfortable and stress-free. My new glasses are perfect!",
    author: "Sarah M.",
    rating: 5
  },
  {
    quote: "Dr. Smith caught an issue early that other doctors missed. I'm grateful for their thorough approach.",
    author: "James L.",
    rating: 5
  },
  {
    quote: "Best eye clinic in town! The staff is friendly and the technology they use is impressive.",
    author: "Maria K.",
    rating: 5
  }
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <span className="hero__badge">Trusted Eye Care Since 2010</span>
            <h1 className="hero__title">
              Your Vision, <br />
              <span className="hero__title-accent">Our Passion</span>
            </h1>
            <p className="hero__description">
              Experience world-class eye care with our team of specialists. 
              We combine advanced technology with personalized attention to protect 
              and enhance your precious gift of sight.
            </p>
            <ul className="hero__features">
              <li><CheckCircleIcon /> Comprehensive eye exams</li>
              <li><CheckCircleIcon /> Same-day appointments available</li>
              <li><CheckCircleIcon /> Most insurance accepted</li>
            </ul>
            <div className="hero__actions">
              <Link to="/appointment" className="btn btn--primary btn--lg">
                Book an Appointment
                <ArrowRightIcon />
              </Link>
              <Link to="/services" className="btn btn--outline btn--lg">
                View Our Services
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-container">
              <img 
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80" 
                alt="Eye doctor examining a patient with modern equipment"
                className="hero__image"
              />
              <div className="hero__image-accent"></div>
            </div>
            <div className="hero__floating-card">
              <div className="hero__floating-icon">
                <CheckCircleIcon />
              </div>
              <div>
                <p className="hero__floating-title">Trusted by Thousands</p>
                <p className="hero__floating-subtitle">25,000+ happy patients</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__bg-shape"></div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats__container">
          {stats.map((stat, index) => (
            <div key={index} className="stats__item">
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="features__container">
          <div className="features__header">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Excellence in Eye Care</h2>
            <p className="section-description">
              We're committed to providing the highest quality eye care with a patient-first approach.
            </p>
          </div>
          <div className="features__grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-card__icon">
                  {feature.icon}
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section">
        <div className="testimonials__container">
          <div className="testimonials__header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our Patients Say</h2>
          </div>
          <div className="testimonials__grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-card__rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <blockquote className="testimonial-card__quote">
                  "{testimonial.quote}"
                </blockquote>
                <p className="testimonial-card__author">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="cta__container">
          <div className="cta__content">
            <h2 className="cta__title">Ready to See Clearly?</h2>
            <p className="cta__description">
              Schedule your comprehensive eye exam today and take the first step toward better vision.
            </p>
            <div className="cta__actions">
              <Link to="/appointment" className="btn btn--white btn--lg">
                Schedule an Appointment
                <ArrowRightIcon />
              </Link>
              <p className="cta__phone">
                Or call us at <a href="tel:+15551234567">(555) 123-4567</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
