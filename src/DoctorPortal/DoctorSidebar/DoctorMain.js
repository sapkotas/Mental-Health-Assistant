import React, { useEffect, useState } from "react";
import './DoctorMain.css';
import { useNavigate } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const DoctorMain = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Access token:", token); // Log token for debugging
    if (!token) {
      setSnackbarMessage("Access token is missing. Redirecting to login.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first selected file
    console.log("File input triggered:", e.target.files); // Check the files object

    if (selectedFile) {
      console.log("Selected file type:", selectedFile.type); // Check file type
      console.log("Selected file size:", selectedFile.size); // Check file size

      // Only accept PDF files
      if (selectedFile.type !== "application/pdf") {
        setSnackbarMessage("Only PDF files are allowed.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      // Store the selected file
      setFile(selectedFile);
      console.log("Selected file:", selectedFile); // Log the file details
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
  
    // Ensure file is selected
    if (!file) {
      setSnackbarMessage("Please select a file to upload.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file); 
  
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setSnackbarMessage("Access token is missing. Please log in again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    setIsUploading(true); 
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "https://mental-health-assistant-backend.onrender.com"}/api/doctor/uploadDoc`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setSnackbarMessage(errorData.message || "Error occurred during file upload.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
  
      const data = await response.json();
      console.log("Upload successful:", data);
      setSnackbarMessage(data.message || "Document uploaded successfully.");
      setSnackbarSeverity("success");
      setFile(null); 
    } catch (error) {
      console.error("Upload failed:", error);
      setSnackbarMessage("An error occurred while uploading the document.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsUploading(false);
    }
  };
  
  

  return (
    <div className="doctor-main">
      <DoctorSidebar />
      <div className="upload-container">
        <h2>Upload Document</h2>
        <form onSubmit={handleFileUpload} className="upload-form">
          <div className="form-group">
            <label htmlFor="file">Select PDF file:</label>
            <input
              type="file"
              id="file"
              accept=".pdf" // Only allow PDF files
              onChange={handleFileChange} // Handle file selection
              disabled={isUploading} // Disable input when uploading
            />
          </div>
          <button type="submit" disabled={isUploading} className="upload-button">
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {/* Snackbar to show success or error messages */}
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
    </div>
  );
};

export default DoctorMain;
