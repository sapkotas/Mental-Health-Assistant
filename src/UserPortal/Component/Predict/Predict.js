import React, { useEffect, useState } from "react";
import "./Predict.css";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Footer from "../Footer/Footer";

export const Predict = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Timer logic
  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  // Fetch questions from backend on mount
  useEffect(() => {
    fetch("https://mental-health-assistant-ml.onrender.com/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setResponses(new Array(data.length).fill(""));
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
        setSnackbarOpen(true);
      });
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOptionChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrediction("");
    setError("");
    setElapsedTime(0);
    setTimerActive(true);
    setLoadingMessage("Analyzing answers...");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("You must be logged in to make a prediction.");
      setSnackbarOpen(true);
      setTimerActive(false);
      return;
    }

    fetch("https://mental-health-assistant-backend.onrender.com/api/pred/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ responses }),
    })
      .then(async (response) => {
        const responseBody = await response.json();
        console.log("Response status:", response.status, responseBody);
        if (!response.ok) {
          throw new Error(responseBody.message || `Failed with status ${response.status}`);
        }
        return responseBody;
      })
      .then((data) => {
        setTimerActive(false);
        setLoadingMessage("");
        setPrediction(data.prediction || "No prediction available.");
        setError("");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        setTimerActive(false);
        setLoadingMessage("");
        console.error("Error submitting responses:", err.message);
        setError( "Prediction is available tommorrow.");
        setSnackbarOpen(true);
      });
  };

  return (
    <>
      <div className="prediction-body">
        <div className="predict-container">
          <div className="questions-container">
            <h1>Mental Health Assessment</h1>
            <form onSubmit={handleSubmit}>
              {questions.map((question, index) => (
                <div key={question.id} className="question-block">
                  <h3>{question.question}</h3>
                  {question.options.map((option, optIndex) => (
                    <label key={optIndex} className="option-label">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={responses[index] === option}
                        onChange={() => handleOptionChange(index, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ))}
              <button type="submit" className="submit-button">
                Find Your Condition
              </button>
            </form>
            {loadingMessage && (
              <div className="loading-message">
                {loadingMessage} ({elapsedTime}s elapsed)
              </div>
            )}
            {prediction && (
              <div className="prediction-result">
                <h2>Prediction:</h2>
                <p>{prediction}</p>
                <div className="button-group">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/";
                    }}
                  >
                    Visit Home
                  </button>
                  <button onClick={() => navigate("/doctor")}>Visit Doctor</button>
                  <button onClick={() => navigate("/journal")}>Journal</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>

      {/* Snackbar for errors or success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={prediction ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {prediction || error}
        </Alert>
      </Snackbar>
    </>
  );
};
