import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Snackbar } from "@mui/material"; // Import Snackbar
import Sidebar from "../Dashboard/Sidebar";
import "./DoctorDetails.css";

const DoctorDetails = () => {
  const location = useLocation();
  const { doctor } = location.state || {}; 
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);  
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleConsultClick = () => {
    if (!isLoggedIn) {
      alert("You need to log in to book a consultation.");
      navigate("/login");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    
    fetch("https://mental-health-assistant-backend.onrender.com/api/payment/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ doctorId: doctor.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "You are already subscribed to this doctor.") {
          // Allow consultation if subscribed
          navigate("/chat", {
            state: {
              doctor,
              user: {
                id: userId,
                token: accessToken,
              },
            },
          });
        } else {
          // Show snackbar if the user is not subscribed
          setSnackbarMessage("You need to subscribe before consulting this doctor.");
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Subscription check failed:", error);
        setSnackbarMessage("Failed to verify subscription. Please try again.");
        setOpenSnackbar(true);
      });
  };

  const handlePaymentClick = () => {
    const accessToken = localStorage.getItem("accessToken");  
    fetch("https://mental-health-assistant-backend.onrender.com/api/payment/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, 
      },
      body: JSON.stringify({ doctorId: doctor.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.paymentUrl && data.esewaConfig) {
          const esewaConfig = data.esewaConfig;
          const esewaParams = new URLSearchParams();
          esewaParams.append("amt", esewaConfig.amt);
          esewaParams.append("tAmt", esewaConfig.tAmt);
          esewaParams.append("txAmt", esewaConfig.txAmt);
          esewaParams.append("psc", esewaConfig.psc);
          esewaParams.append("pdc", esewaConfig.pdc);
          esewaParams.append("scd", esewaConfig.scd);
          esewaParams.append("pid", esewaConfig.pid);
          esewaParams.append("su", esewaConfig.su);
          esewaParams.append("fu", esewaConfig.fu);
    
          const paymentUrl = data.paymentUrl + "?" + esewaParams.toString();
    
          window.location.href = paymentUrl;
          setSnackbarMessage("Redirecting to eSewa for payment...");
          setOpenSnackbar(true);
        } else {
          setSnackbarMessage(data.message || "Something went wrong.");
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setSnackbarMessage("An error occurred while verifying subscription. Please try again.");
        setOpenSnackbar(true);
      });
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (!doctor) {
    return <div>No doctor data found.</div>;
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
            <button
              className="payment-now-button"
              onClick={handlePaymentClick}
            > 
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Snackbar component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        message={snackbarMessage}
      />
    </>
  );
};

export default DoctorDetails;
