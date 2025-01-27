import React, { useEffect, useState } from "react";
import "./VerifyDoctor.css";
import AdminSidebar from "../Dashboard/Sidebar/AdminSidebar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const VerifyDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" }); // For Snackbar
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

        if (data.data && Array.isArray(data.data)) {
          setDoctors(data.data);
          setError("");
        } else {
          setDoctors([]);
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
        setSnackbar({ open: true, message: "You are not authorized. Please log in again.", severity: "error" });
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
      setSnackbar({ open: true, message: "Doctor verified successfully.", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: `Failed to verify doctor: ${err.message}`, severity: "error" });
    }
  };

  const handleReject = async (doctorId) => {
    try {
      const token = await getValidAccessToken();
      if (!token) {
        setSnackbar({ open: true, message: "You are not authorized. Please log in again.", severity: "error" });
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
      setSnackbar({ open: true, message: "Doctor rejected successfully.", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: `Failed to reject doctor: ${err.message}`, severity: "error" });
    }
  };

  const getValidAccessToken = async () => {
    let token = localStorage.getItem("accessToken");
    return token;
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) return <p>Loading pending doctors...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="verify-doctor-main">
      <AdminSidebar />
      <div className="verify-doctors-container">
        <h2>Pending Doctors</h2>
        {doctors.length === 0 ? (
          <p>No pending doctors available.</p>
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
                    <a href={doctor.documentUrl} download className="download-link">
                      Download Document
                    </a>
                  </td>
                  <td>
                    <button className="verify-button" onClick={() => handleVerify(doctor.id)}>
                      Verify
                    </button>
                    <button className="reject-button" onClick={() => handleReject(doctor.id)}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VerifyDoctor;
