import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../../config/supabaseClient';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (appointmentsError) throw appointmentsError;

      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;

      setAppointments(appointmentsData || []);
      setMessages(messagesData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please check your database configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      case 'unread': return 'status-unread';
      case 'read': return 'status-read';
      default: return 'status-default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);
      if (error) throw error;
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId ? { ...a, status: newStatus } : a
        )
      );
    } catch (err) {
      alert('Failed to update status.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome, {user?.email}</p>
            </div>
            <div className="header-actions">
              <Link to="/" className="btn btn-secondary">View Site</Link>
              <button onClick={handleSignOut} className="btn btn-outline">Sign Out</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{appointments.length}</h3>
              <p>Total Appointments</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{appointments.filter(a => a.status === 'pending').length}</h3>
              <p>Pending Appointments</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✉️</div>
            <div className="stat-info">
              <h3>{messages.length}</h3>
              <p>Total Messages</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📩</div>
            <div className="stat-info">
              <h3>{messages.filter(m => m.status === 'unread').length}</h3>
              <p>Unread Messages</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Appointments</h2>
            <button onClick={fetchData} className="btn-refresh">🔄 Refresh</button>
          </div>
          
          {appointments.length === 0 ? (
            <div className="empty-state">
              <p>No appointments yet</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Patient</th>
                    <th>Contact</th>
                    <th>Service</th>
                    <th>Doctor</th>
                    <th>Status</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 10).map((appointment) => (
                    <tr key={appointment.id}>
                      <td>
                        <strong>{appointment.appointment_date}</strong><br />
                        {appointment.appointment_time}
                      </td>
                      <td>{appointment.name}</td>
                      <td>
                        {appointment.email}<br />
                        {appointment.phone}
                      </td>
                      <td>{appointment.service}</td>
                      <td>{appointment.preferred_doctor || 'No preference'}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(appointment.status)}`} style={{ marginRight: 8 }}>
                          {appointment.status || 'pending'}
                        </span>
                        <select
                          value={appointment.status || 'pending'}
                          onChange={e => handleStatusChange(appointment.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>{formatDate(appointment.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Messages</h2>
          </div>
          
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>No messages yet</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Contact</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.slice(0, 10).map((message) => (
                    <tr key={message.id}>
                      <td>{message.name}</td>
                      <td>
                        {message.email}<br />
                        {message.phone}
                      </td>
                      <td>{message.subject}</td>
                      <td className="message-preview">
                        {message.message.substring(0, 100)}
                        {message.message.length > 100 && '...'}
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusColor(message.status)}`}>
                          {message.status || 'unread'}
                        </span>
                      </td>
                      <td>{formatDate(message.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
