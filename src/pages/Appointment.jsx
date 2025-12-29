import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import './Appointment.css';
import { useLocation } from 'react-router-dom';
import doctorsData from '../data/doctors.json';
import servicesData from '../data/services.json';

/* SVG Icons */
const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const expectations = [
  { icon: <ClipboardIcon />, text: 'Complete eye examination' },
  { icon: <ClockIcon />, text: 'Appointments typically last 45-60 minutes' },
  { icon: <CreditCardIcon />, text: 'Insurance accepted' },
  { icon: <PhoneIcon />, text: 'Confirmation call within 24 hours' },
];

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    doctor: '',
    notes: ''
  });

  const location = useLocation();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const doctorParam = params.get('doctor');
      const serviceParam = params.get('service');
      setFormData(prev => ({
        ...prev,
        ...(doctorParam ? { doctor: doctorParam } : {}),
        ...(serviceParam ? { service: serviceParam } : {})
      }));
    } catch (err) {
      // ignore malformed query
    }
  }, [location.search]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    if (!formData.service) newErrors.service = 'Please select a service';
    
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
      setMessage({ type: 'error', text: 'Please fix all errors before submitting.' });
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            appointment_date: formData.date,
            appointment_time: formData.time,
            service: formData.service,
            preferred_doctor: formData.doctor,
            notes: formData.notes,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setMessage({ 
        type: 'success', 
        text: 'Appointment request submitted successfully! We will contact you soon to confirm.' 
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        doctor: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to submit appointment. Please try again or call us directly.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-page">
      {/* Hero Section */}
      <section className="appointment-hero">
        <div className="appointment-hero__container">
          <span className="appointment-hero__badge">
            <CalendarIcon />
            Easy Online Booking
          </span>
          <h1 className="appointment-hero__title">Book an Appointment</h1>
          <p className="appointment-hero__description">
            Schedule your visit with our experienced team of eye care professionals
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="appointment-content">
        <div className="appointment-content__container">
          {/* Sidebar */}
          <aside className="appointment-sidebar">
            <div className="appointment-sidebar__card">
              <h2 className="appointment-sidebar__title">What to Expect</h2>
              <ul className="appointment-sidebar__list">
                {expectations.map((item, index) => (
                  <li key={index} className="appointment-sidebar__item">
                    <span className="appointment-sidebar__icon">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="appointment-sidebar__contact">
              <h3 className="appointment-sidebar__contact-title">Need Help?</h3>
              <p className="appointment-sidebar__phone">
                <PhoneIcon />
                <a href="tel:5551234567">(555) 123-4567</a>
              </p>
              <div className="appointment-sidebar__hours">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 3:00 PM</p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="appointment-form-wrapper">
            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="appointment-form__header">
                <h2 className="appointment-form__title">Schedule Your Visit</h2>
                <p className="appointment-form__subtitle">Fill out the form below and we'll confirm your appointment within 24 hours.</p>
              </div>

              {message.text && (
                <div className={`appointment-message appointment-message--${message.type}`} role="alert">
                  {message.type === 'success' ? <CheckCircleIcon /> : <AlertCircleIcon />}
                  {message.text}
                </div>
              )}

              {/* Personal Info Section */}
              <fieldset className="form-fieldset">
                <legend className="form-legend">Personal Information</legend>
                
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
                    <label htmlFor="phone" className="form-label">Phone <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                      placeholder="(555) 000-0000"
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      aria-invalid={errors.phone ? 'true' : 'false'}
                    />
                    {errors.phone && <span id="phone-error" className="form-error">{errors.phone}</span>}
                  </div>
                </div>
              </fieldset>

              {/* Appointment Details Section */}
              <fieldset className="form-fieldset">
                <legend className="form-legend">Appointment Details</legend>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date" className="form-label">Preferred Date <span className="required">*</span></label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`form-input ${errors.date ? 'form-input--error' : ''}`}
                      aria-describedby={errors.date ? 'date-error' : undefined}
                      aria-invalid={errors.date ? 'true' : 'false'}
                    />
                    {errors.date && <span id="date-error" className="form-error">{errors.date}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="time" className="form-label">Preferred Time <span className="required">*</span></label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`form-select ${errors.time ? 'form-input--error' : ''}`}
                      aria-describedby={errors.time ? 'time-error' : undefined}
                      aria-invalid={errors.time ? 'true' : 'false'}
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                    {errors.time && <span id="time-error" className="form-error">{errors.time}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service" className="form-label">Service Type <span className="required">*</span></label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`form-select ${errors.service ? 'form-input--error' : ''}`}
                    aria-describedby={errors.service ? 'service-error' : undefined}
                    aria-invalid={errors.service ? 'true' : 'false'}
                  >
                    <option value="">Select a service</option>
                    {servicesData && servicesData.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                  {errors.service && <span id="service-error" className="form-error">{errors.service}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="doctor" className="form-label">Preferred Doctor <span className="optional">(Optional)</span></label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">No preference</option>
                    {doctorsData && doctorsData.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </fieldset>

              {/* Additional Notes Section */}
              <fieldset className="form-fieldset">
                <legend className="form-legend">Additional Information</legend>
                
                <div className="form-group">
                  <label htmlFor="notes" className="form-label">Notes <span className="optional">(Optional)</span></label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    className="form-textarea"
                    placeholder="Any specific concerns, questions, or accessibility needs?"
                  />
                </div>
              </fieldset>

              <button type="submit" className="appointment-form__submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  'Book Appointment'
                )}
              </button>

              <p className="appointment-form__note">
                <span>*</span> Required fields. We'll confirm your appointment within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
