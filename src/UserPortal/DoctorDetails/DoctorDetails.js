import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import './DoctorDetails.css';

const DoctorDetails = () => {
  const location = useLocation();
  const { doctor, } = location.state || {}; // Get the doctor data passed through location.state
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check login status

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

    // Navigate to the chat page and pass the doctor's details
    navigate("/chat", {
      state: {
        doctor, 
        user: {
          id: userId,
          token: localStorage.getItem("accessToken"), 
        },
      },
    });
  };

  if (!doctor) {
    return <div>No doctor data found.</div>; // If no doctor data is found, show an error
  }

  return (
    <>
      <div className="doctor-details-container">
        <Sidebar />
        <div className="doctor-details">
          <div className="doctor-details-left">
            <div className="doctor-image">
              <img
                src="https://cdn.vectorstock.com/i/1000v/36/61/doctor-logo-icon-design-vector-15613661.jpg"
                alt={doctor.fullName}
                className="doctor-profile-img"
              />
            </div>
          </div>
          <div className="doctor-details-right">
            <p><strong>Name:</strong> {doctor.fullName}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Payment:</strong> {doctor.subscriptionFee}</p>
            <div className="doctor-details-description">
              <p><strong>About:</strong> My name is {doctor.fullName}. I am a specialist in Therapy with more than 2 years of experience. Try consulting me!</p>
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
