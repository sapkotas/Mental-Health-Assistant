import React, { useState, useEffect } from "react";

import './DoctorDetails.css'
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";

const DoctorDetails = () => {
  const location = useLocation();
  const { doctor } = location.state || {};  // Get the doctor data passed through location.state
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Check login status

  useEffect(() => {
    // Check if user is logged in by checking token in local storage
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleConsultClick = () => {
    if (!isLoggedIn) {
      alert("You need to log in to book a consultation.");
      navigate("/login");
      return;
    }
    // Logic for booking a consultation or navigating to booking page
    console.log(`Booking consultation with Dr. ${doctor?.fullName}`);
  };

  if (!doctor) {
    return <div>No doctor data found.</div>;  // If no doctor data is found, show an error
  }

  return (
<>
    <div className="doctor-details-container">
    <Sidebar/>
    <div className="doctor-details">
      <div className="doctor-details-left">
        <div className="doctor-image">
          <img
            src={doctor.profileImage || "default-image.jpg"}  // Fallback if no image is provided
            alt={doctor.fullName}
            className="doctor-profile-img"
          />
        </div>
      </div>
      <div className="doctor-details-right">
        <h1>{doctor.fullName}</h1>
        <p><strong>Name:</strong> {doctor.fullName}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>payment:</strong> {doctor.subscriptionFee}</p>
        <div className="doctor-details-description">
          <p><strong>About:My name is {doctor.fullName}.I am a specialist in Therapy having experince more than 2 years.Try consulting me</strong></p>
          <p>{doctor.description}</p>
        </div>

        <button
          className="consult-now-button"
          onClick={handleConsultClick}
        >
          Try Consultation
        </button>
      </div>
    </div>
    </div>
    </>
  );
};

export default DoctorDetails;
