import React, { useEffect, useState } from "react";
import "./Predict.css";
import axiosInstance from "../../axiosInstance";
import therapist from "../../assest/therapist.jpg"
import Footer from '../../Component/Footer/Footer'
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export const Predict = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/questions")
      .then((response) => {
        setQuestions(response.data);
        setResponses(new Array(response.data.length).fill(""));
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
      });
  }, []);

  const handleOptionChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrediction("");
    setError("");

    setLoadingMessage("Analyzing answers..."); 
    setTimeout(() => {
      setLoadingMessage("Predicting your condition...");
      setTimeout(() => {
        axiosInstance
          .post("/predict", { responses })
          .then((response) => {
            setLoadingMessage(""); 
            setPrediction(response.data.prediction); 
          })
          .catch((err) => {
            console.error("Error submitting responses:", err);
            setLoadingMessage("");
            setError("Failed to get a prediction. Please ensure all questions are answered.");
          });
      }, 1000); // Delay for "Predicting your condition..."
    }, 2000); // Delay for "Analyzing answers..."
  };

  return (
    <>
    <Navbar/>
    <div className="prediction-body"> 
  <div className="predict-container">
    <div className="questions-container">
      <h1>Mental Health Assessment</h1>
      {error && <div className="error-message">{error}</div>}
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
      {loadingMessage && <div className="loading-message">{loadingMessage}</div>}
      {prediction && (
        <div className="prediction-result">
          <h2>Prediction:</h2>
          <p>{prediction}</p>
          <p><button>Visit Doctor</button></p>
          <p><button onClick={()=>navigate("/")}>Visit home</button></p>
        </div>
      )}
    </div>
  </div>
  <Footer/>
</div>

    </>
  );
};
