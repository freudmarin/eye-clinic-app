import { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import './Appointment.css';

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
    // Clear error for this field when user starts typing
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
      
      // Reset form
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
      <div className="container">
        <div className="page-header">
          <h1>Book an Appointment</h1>
          <p>Schedule your visit with our experienced team</p>
        </div>

        <div className="appointment-content">
          <div className="appointment-info">
            <h2>What to Expect</h2>
            <ul>
              <li>📋 Complete eye examination</li>
              <li>⏱️ Appointments typically last 45-60 minutes</li>
              <li>💳 Insurance accepted</li>
              <li>📞 Confirmation call within 24 hours</li>
            </ul>
            
            <div className="contact-box">
              <h3>Need Help?</h3>
              <p>Call us at <strong>(555) 123-4567</strong></p>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 3:00 PM</p>
            </div>
          </div>

          <form className="appointment-form" onSubmit={handleSubmit}>
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.date ? 'input-error' : ''}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="time">Preferred Time *</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={errors.time ? 'input-error' : ''}
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
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Type *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={errors.service ? 'input-error' : ''}
              >
                <option value="">Select a service</option>
                <option value="Comprehensive Eye Exam">Comprehensive Eye Exam</option>
                <option value="Contact Lens Fitting">Contact Lens Fitting</option>
                <option value="Pediatric Eye Care">Pediatric Eye Care</option>
                <option value="Glaucoma Screening">Glaucoma Screening</option>
                <option value="Diabetic Eye Exam">Diabetic Eye Exam</option>
                <option value="Dry Eye Treatment">Dry Eye Treatment</option>
              </select>
              {errors.service && <span className="error-message">{errors.service}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="doctor">Preferred Doctor (Optional)</label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
              >
                <option value="">No preference</option>
                <option value="Dr. Zara Smith">Dr. Sarah Mitchell</option>
                <option value="Dr. Adrian Wells">Dr. Michael Chen</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Any specific concerns or questions?"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
