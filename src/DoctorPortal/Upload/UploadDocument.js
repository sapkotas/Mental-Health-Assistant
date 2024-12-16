import React, { useState } from "react";
import axios from "axios";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please upload a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("authToken"); // Replace with your token retrieval method
      const response = await axios.post(
        "https://mental-health-assistant-backend.onrender.com/api/doctor/uploadDocument", // Replace with your backend endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add token for user authentication
          },
        }
      );

      setMessage(response.data.message); // Success message
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message); // Display server error message
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Documented</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Upload
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

// Basic Inline Styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UploadDocument;
