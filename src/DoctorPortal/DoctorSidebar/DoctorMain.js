import React, { useEffect, useState } from "react";
import "./DoctorMain.css";
import { useNavigate } from "react-router-dom";
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
    console.log("Access token:", token); // Debugging token
    if (!token) {
      setSnackbarMessage("Access token is missing. Redirecting to login.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File input triggered:", e.target.files);

    if (selectedFile) {
      console.log("Selected file type:", selectedFile.type);
      console.log("Selected file size:", selectedFile.size);

      // Only allow PDF files
      if (selectedFile.type !== "application/pdf") {
        setSnackbarMessage("Only PDF files are allowed.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      setFile(selectedFile); // Store the selected file
      console.log("Selected file:", selectedFile);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setSnackbarMessage("Please select a file to upload.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

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

      // Show success message and clear the file input
      setSnackbarMessage(data.message || "Document uploaded successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setFile(null); // Reset file state
      document.getElementById("file").value = ""; // Clear the input field
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
      <div className="upload-container">
        <h2>Upload Document</h2>
        <form onSubmit={handleFileUpload} className="upload-form">
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
