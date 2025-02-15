import React, { useState, useEffect } from "react";
import "./AdminBody.css"; // Import the CSS file
import HistogramGraph from "./Histogram";

const AdminBody = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading effect for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const data = {
    accuracy: 0.7937,
    nullAccuracy: { 0: 197, 1: 181 },
    percentageOnes: 0.4788,
    percentageZeros: 0.5212,
    classificationAccuracy: 0.7937,
    classificationError: 0.2063,
    falsePositiveRate: 0.2893,
    precision: 0.7373,
    aucScore: -0.6694,
    meanSquaredError: 0.2063,
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* First Row: Model Accuracy & Additional Metrics */}
      <div className="row">
        {/* Model Accuracy Metrics */}
        <div className="metrics-box">
          <h2>Model Accuracy Metrics</h2>
          <p><strong>Accuracy:</strong> {data.accuracy.toFixed(4)}</p>
          <p><strong>Null Accuracy:</strong> 0s: {data.nullAccuracy[0]}, 1s: {data.nullAccuracy[1]}</p>
          <p><strong>Percentage of Ones:</strong> {(data.percentageOnes * 100).toFixed(2)}%</p>
          <p><strong>Percentage of Zeros:</strong> {(data.percentageZeros * 100).toFixed(2)}%</p>
        </div>

        {/* Additional Metrics */}
        <div className="metrics-box">
          <h2>Additional Metrics</h2>
          <p><strong>Classification Accuracy:</strong> {data.classificationAccuracy.toFixed(4)}</p>
          <p><strong>Classification Error:</strong> {data.classificationError.toFixed(4)}</p>
          <p><strong>False Positive Rate:</strong> {data.falsePositiveRate.toFixed(4)}</p>
          <p><strong>Precision:</strong> {data.precision.toFixed(4)}</p>
          <p><strong>AUC Score:</strong> {data.aucScore.toFixed(4)}</p>
          <p><strong>Mean Squared Error (MSE):</strong> {data.meanSquaredError.toFixed(4)}</p>
        </div>
      </div>

      {/* Second Row: Confusion Matrix & Histogram */}
      <div className="row">
        {/* Confusion Matrix */}
        <div className="metrics-box confusion-matrix-container">
          <h2>Confusion Matrix</h2>
          <div className="confusion-matrix">
            <div className="cm-0-0">140</div>
            <div className="cm-0-1">57</div>
            <div className="cm-1-0">21</div>
            <div className="cm-1-1">160</div>
          </div>
          <p className="legend"><strong>Actual vs Predicted</strong></p>
        </div>

        {/* Histogram Graph */}
        <div className="histogram-box">
          <HistogramGraph />
        </div>
      </div>
    </div>
  );    
};

export default AdminBody;
