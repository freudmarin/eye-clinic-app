import doctorsData from '../data/doctors.json';
import './Doctors.css';

export default function Doctors() {
  return (
    <div className="doctors-page">
      <div className="container">
        <div className="doctors-grid">
          {doctorsData.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-image">
                <img src={doctor.image} alt={doctor.name} />
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="doctor-specialization">{doctor.specialty}</p>
                <p className="doctor-bio">{doctor.bio}</p>
                <div className="doctor-contact">
                  <p className="doctor-phone"><strong>Phone:</strong> {doctor.phone}</p>
                  <p className="doctor-email"><strong>Email:</strong> <a href={`mailto:${doctor.email}`}>{doctor.email}</a></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
