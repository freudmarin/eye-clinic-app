import { Link } from 'react-router-dom';
import servicesData from '../data/services.json';
import './Services.css';

export default function Services() {
  return (
    <div className="services-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Services</h1>
          <p>Comprehensive eye care tailored to your needs</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <h3>{service.title}</h3>
              <p className="service-description">{service.shortDescription}</p>
              <div className="service-details">
                <span className="service-duration">⏱️ {service.duration}</span>
                <span className="service-price">{service.price}</span>
              </div>
              <Link to={`/services/${service.slug}`} className="btn btn-outline">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
