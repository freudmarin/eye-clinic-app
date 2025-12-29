import { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import './Contact.css';

/* SVG Icons */
const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const contactInfo = [
  {
    icon: <MapPinIcon />,
    title: 'Location',
    lines: ['123 Main Street, Suite 100', 'Anytown, ST 12345'],
    color: 'primary'
  },
  {
    icon: <PhoneIcon />,
    title: 'Phone',
    lines: ['(555) 123-4567', 'Mon-Fri: 9 AM - 6 PM', 'Sat: 9 AM - 3 PM'],
    highlight: '(555) 123-4567',
    color: 'teal'
  },
  {
    icon: <MailIcon />,
    title: 'Email',
    lines: ['info@clearsighteyeclinic.com', "We'll respond within 24 hours"],
    highlight: 'info@clearsighteyeclinic.com',
    color: 'accent'
  },
  {
    icon: <AlertTriangleIcon />,
    title: 'Emergency',
    lines: ['For eye emergencies, call:', '(555) 911-EYES', 'Available 24/7'],
    highlight: '(555) 911-EYES',
    color: 'warning'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatusMessage({ type: 'error', text: 'Please fix all errors before submitting.' });
      return;
    }
    
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            status: 'unread'
          }
        ]);

      if (error) throw error;

      setStatusMessage({ 
        type: 'success', 
        text: 'Message sent successfully! We will get back to you within 24 hours.' 
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatusMessage({ 
        type: 'error', 
        text: 'Failed to send message. Please try again or call us directly.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero__container">
          <span className="contact-hero__badge">
            <SendIcon />
            Get In Touch
          </span>
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__description">
            Have questions? We're here to help. Reach out and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="contact-content">
        <div className="contact-content__container">
          {/* Contact Info Cards */}
          <div className="contact-info">
            <div className="contact-info__grid">
              {contactInfo.map((item, index) => (
                <div key={index} className={`contact-info__card contact-info__card--${item.color}`}>
                  <div className="contact-info__icon">{item.icon}</div>
                  <h3 className="contact-info__title">{item.title}</h3>
                  <div className="contact-info__lines">
                    {item.lines.map((line, i) => (
                      <p 
                        key={i} 
                        className={line === item.highlight ? 'contact-info__highlight' : ''}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__header">
                <h2 className="contact-form__title">Send us a Message</h2>
                <p className="contact-form__subtitle">Fill out the form below and we'll respond as soon as possible.</p>
              </div>
              
              {statusMessage.text && (
                <div className={`contact-message contact-message--${statusMessage.type}`} role="alert">
                  {statusMessage.type === 'success' ? <CheckCircleIcon /> : <AlertCircleIcon />}
                  {statusMessage.text}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  placeholder="Enter your full name"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <span id="name-error" className="form-error">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email <span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    placeholder="you@example.com"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && <span id="email-error" className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone <span className="optional">(Optional)</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject <span className="required">*</span></label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`form-select ${errors.subject ? 'form-input--error' : ''}`}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  aria-invalid={errors.subject ? 'true' : 'false'}
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Appointment Question">Appointment Question</option>
                  <option value="Insurance">Insurance Question</option>
                  <option value="Billing">Billing Question</option>
                  <option value="Products">Product Inquiry</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && <span id="subject-error" className="form-error">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message <span className="required">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="How can we help you?"
                  className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  aria-invalid={errors.message ? 'true' : 'false'}
                />
                {errors.message && <span id="message-error" className="form-error">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-form__submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <SendIcon />
                    Send Message
                  </>
                )}
              </button>

              <p className="contact-form__note">
                <span>*</span> Required fields. We'll respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
