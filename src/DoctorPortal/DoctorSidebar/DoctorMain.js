import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios"; // For making HTTP requests

const DoctorMain = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" or "error"

  // Check if user is logged in when the component loads
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Access Token:", token); // Log the token
    if (!token) {
      console.error("Access token is missing. Redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle closing of the snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to upload the file
  const handleFileUpload = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setSnackbarMessage("Access token is missing. Please log in again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!file) {
      setSnackbarMessage("Please select a file to upload.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "https://mental-health-assistant-backend.onrender.com"}/api/doctor/UploadDoc`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        }
      );

      // If successful, show success message
      setSnackbarMessage(response.data.message || "File uploaded successfully.");
      setSnackbarSeverity("success");
      setFile(null); // Clear the file input after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
      setSnackbarMessage(
        error.response?.data?.message || "Failed to upload document."
      );
      setSnackbarSeverity("error");
    } finally {
      setIsUploading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <DoctorSidebar />
      <div className="upload-container">
        <h2>Upload Document</h2>
        <form onSubmit={handleFileUpload}>
          <div className="form-group">
            <label htmlFor="file">Select PDF file:</label>
            <input
              type="file"
              id="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>
          <button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default DoctorMain;
