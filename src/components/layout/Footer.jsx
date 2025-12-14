import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="brand-header">
              <h3>👁️ ClearSight Eye Clinic</h3>
            </div>
            <p className="brand-description">Providing exceptional eye care services since 2010</p>
          </div>
          
          <div className="footer-section">
            <h4>📍 Contact</h4>
            <ul className="contact-list">
              <li>123 Main Street, Suite 100</li>
              <li><a href="tel:+15551234567">(555) 123-4567</a></li>
              <li><a href="mailto:info@clearsighteyeclinic.com">info@clearsighteyeclinic.com</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>🕐 Hours</h4>
            <ul className="hours-list">
              <li>
                <span className="day">Mon - Fri:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li>
                <span className="day">Saturday:</span>
                <span>9:00 AM - 3:00 PM</span>
              </li>
              <li>
                <span className="day">Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>🔗 Quick Links</h4>
            <ul className="quick-links">
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/appointment">Book Appointment</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} ClearSight Eye Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
