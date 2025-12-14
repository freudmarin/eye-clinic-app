import doctorsData from '../data/doctors.json';
import './Doctors.css';

export default function Doctors() {
  return (
    <div className="doctors-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Doctors</h1>
          <p>Meet our experienced team of eye care professionals</p>
        </div>

        <div className="doctors-grid">
          {doctorsData.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-image">
                <img src={doctor.image} alt={doctor.name} />
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="doctor-title">{doctor.title}</p>
                <p className="doctor-specialization">{doctor.specialization}</p>
                
                <p className="doctor-bio">{doctor.bio}</p>
                
                <div className="doctor-details">
                  <div className="detail-section">
                    <h4>Education</h4>
                    <ul>
                      {doctor.education.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Languages</h4>
                    <p>{doctor.languages.join(', ')}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Availability</h4>
                    <p>{doctor.availability.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
