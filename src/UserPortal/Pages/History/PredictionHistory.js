import React, { useEffect, useState } from 'react';
import './PredictionHistory.css'; // Import the CSS file

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://mental-health-assistant-backend.onrender.com/api/pred/history';
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setError('Access token not found');
      setLoading(false);
      return;
    }

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setPredictions(data.predictions);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching prediction history:', error);
      setError('Error fetching prediction history');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="history-container">
      <div className="history-content">
        <h3 className="history-title">Prediction History</h3>
        <table className="payment-table">
          <thead>
            <tr>
              <th>Prediction</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {predictions.length === 0 ? (
                <tr>
                  <td colSpan="6">No prediction found.</td>
                </tr>
              ):(

            predictions.map(prediction => (
              <tr key={prediction.id}>
                <td>{prediction.prediction}</td>
                <td>{new Date(prediction.timestamp).toLocaleString()}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PredictionHistory;
