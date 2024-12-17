import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Doctor.css";
import Sidebar from "../../Dashboard/Sidebar";

export const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchDoctors = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("You must be logged in to view the list of doctors.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://mental-health-assistant-backend.onrender.com/api/users/doctors",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.doctors && data.doctors.length > 0) {
          setDoctors(data.doctors);
        } else {
          setError("No doctors data found.");
        }
        setError(""); // Clear error if successful
      } catch (err) {
        console.error("Error fetching doctors:", err.message);
        setError("Failed to load the list of doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorClick = (doctor) => {
    navigate("/doctor-details", { state: { doctor } }); // Navigate to doctor details page
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Display error message
  }

  return (
    <div className="doctor-container">
      <Sidebar />
      <div className="doctor-content">
        <h1>Doctors List</h1>
        <div className="doctor-list">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="doctor-card"
                onClick={() => handleDoctorClick(doctor)}
              >
                <img
                  src="https://cdn.vectorstock.com/i/1000v/36/61/doctor-logo-icon-design-vector-15613661.jpg"
                  alt={`${doctor.fullName}'s profile`}
                  className="doctor-logo"
                />
                <h3>{doctor.fullName}</h3>
              </div>
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
