import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log("Selected File:", e.target.files[0]);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setSnackbarMessage("Please select a file to upload.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setSnackbarMessage("Access token is missing. Please log in again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Key name for the file upload

    console.log("Token:", token);
    console.log("API URL:", process.env.REACT_APP_API_URL);
    console.log("File Sent in FormData:", file);

    setIsUploading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "https://mental-health-assistant-backend.onrender.com"}/api/doctor/UploadDoc`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSnackbarMessage(result.message || "File uploaded successfully.");
        setSnackbarSeverity("success");
        setFile(null); // Clear file input after success
      } else {
        setSnackbarMessage(result.message || "Failed to upload document.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setSnackbarMessage("An unexpected error occurred. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setIsUploading(false);
      setSnackbarOpen(true);
    }
  };

  return (
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
  );
}

export default UploadDocument;
