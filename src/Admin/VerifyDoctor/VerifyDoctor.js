import React, { useEffect, useState } from "react";
import "./VerifyDoctor.css"; 

const VerifyDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const base = process.env.REACT_APP_API_URL || "https://mental-health-assistant-backend.onrender.com";

  useEffect(() => {
    // Fetch pending doctors on component mount
    const fetchDoctors = async () => {
      try {
        const token = await getValidAccessToken(); // Get a valid token

        if (!token) {
          setError("You are not authorized. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${base}/api/admin/pendingDoctors`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch pending doctors.");
        }

        const data = await response.json();
        setDoctors(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(`Failed to fetch pending doctors: ${err.message}`);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [base]);

  const handleVerify = async (doctorId) => {
    try {
      const token = await getValidAccessToken(); // Get a valid token
      if (!token) {
        setError("You are not authorized. Please log in again.");
        return;
      }

      const response = await fetch(`${base}/api/admin/verify-doctor/${doctorId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to verify doctor.");
      }

      // Functional update form of setDoctors to avoid direct mutation of state
      setDoctors((prevDoctors) => prevDoctors.filter((doc) => doc.id !== doctorId));
      alert("Doctor verified successfully.");
    } catch (err) {
      console.error(err);
      alert(`Failed to verify doctor: ${err.message}`);
    }
  };

  const handleReject = async (doctorId) => {
    try {
      const token = await getValidAccessToken(); // Get a valid token
      if (!token) {
        setError("You are not authorized. Please log in again.");
        return;
      }

      const response = await fetch(`${base}/api/admin/reject-doctor/${doctorId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject doctor.");
      }

      // Functional update form of setDoctors to avoid direct mutation of state
      setDoctors((prevDoctors) => prevDoctors.filter((doc) => doc.id !== doctorId));
      alert("Doctor rejected successfully.");
    } catch (err) {
      console.error(err);
      alert(`Failed to reject doctor: ${err.message}`);
    }
  };

  const getValidAccessToken = async () => {
    let token = localStorage.getItem("accessToken");
    return token;
  };



  if (loading) return <p>Loading pending doctors...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <div className="verify-doctors-container">
        <h2>Pending Doctors</h2>
        {doctors.length === 0 ? (
          <p>No pending doctors found.</p>
        ) : (
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.fullName || "N/A"}</td>
                  <td>{doctor.email || "N/A"}</td>
                  <td>
                    <button
                      className="verify-button"
                      onClick={() => handleVerify(doctor.id)}
                    >
                      Verify
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(doctor.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default VerifyDoctor;
