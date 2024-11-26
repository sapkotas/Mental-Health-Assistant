import React from 'react'
import './Appointment.css'
import therapistt from '../../assest/therapistt.jpg';
import { FaBell } from "react-icons/fa";



export const Appointment = () => {
  return (
    <div className="appointment-us-container">
    <div className="appointment-left">
      <img src={therapistt} alt="Therapist" className="therapist-image" />
      <div className="appointment-alert">
        <FaBell className="alert-icon" />
        <div>
          <p>You have an appointment meeting</p>
          <p><strong>With Dr. Elaenee at 9:00 AM</strong></p>
        </div>
      </div>
    </div>

    <div className="appointment-right">
      <h4 className="section-tag">SCHEDULE</h4>
      <h2>Arrange Your Therapy Appointment Now, Begin Healing.</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
        tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </p>
      <form className="appointment-form">
        <div className="form-row">
          <input type="text" placeholder="Name" className="form-input" />
          <input type="text" placeholder="Company" className="form-input" />
        </div>
        <div className="form-row">
          <input type="text" placeholder="Phone" className="form-input" />
          <input type="email" placeholder="Email" className="form-input" />
        </div>
        <div className="form-row">
          <input type="date" className="form-input" />
          <input type="time" className="form-input" />
        </div>
        <input type="text" placeholder="Subject" className="form-input" />
        <textarea placeholder="Message" className="form-textarea"></textarea>
        <button type="submit" className="form-button">
          <FaBell /> Book An Appointment
        </button>
      </form>
    </div>
  </div>
  )
}
