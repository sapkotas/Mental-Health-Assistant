import React, { useEffect, useState } from "react";
import "./VerifyDoctor.css";
import AdminSidebar from "../Dashboard/Sidebar/AdminSidebar";

const VerifyDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const base = process.env.REACT_APP_API_URL || "https://mental-health-assistant-backend.onrender.com";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = await getValidAccessToken();

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

        // Check if data is valid and contains doctors
        if (data.data && Array.isArray(data.data)) {
          setDoctors(data.data);
          setError(""); // Clear error on successful fetch
        } else {
          setDoctors([]); // No doctors available
        }
      } catch (err) {
        console.error(err);
        setError("");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [base]);

  const handleVerify = async (doctorId) => {
    try {
      const token = await getValidAccessToken();
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

      setDoctors((prevDoctors) => prevDoctors.filter((doc) => doc.id !== doctorId));
      alert("Doctor verified successfully.");
    } catch (err) {
      console.error(err);
      alert(`Failed to verify doctor: ${err.message}`);
    }
  };

  const handleReject = async (doctorId) => {
    try {
      const token = await getValidAccessToken();
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
    <div className="verify-doctor-main">
      <AdminSidebar />
      <div className="verify-doctors-container">
        <h2>Pending Doctors</h2>
        {doctors.length === 0 ? (
          <p>No pending doctors available.</p> // Correctly handled empty state
        ) : (
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.fullName || "N/A"}</td>
                  <td>{doctor.email || "N/A"}</td>
                  <td>
                    <a
                      href={doctor.documentUrl}
                      download
                      className="download-link"
                    >
                      Download Document
                    </a>
                  </td>
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
    </div>
  );
};

export default VerifyDoctor;
