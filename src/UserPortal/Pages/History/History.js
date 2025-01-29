import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Dashboard/Sidebar';
import './History.css'; 
import PredictionHistory from './PredictionHistory';

const History = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Assuming you have the token stored in localStorage or useContext
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken)

  useEffect(() => {
    // Fetch payment data from API (replace with actual API endpoint)
    fetch('https://mental-health-assistant-backend.onrender.com/api/payment/history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPayments(data.payments);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching payment history:', error);
        setError('Failed to load payment history');
        setLoading(false);
      });
  }, [accessToken]);

  // Handle "Visit doctor" button click
  const handleVisitDoctor = (doctor, userId, doctorId, payment) => {
    navigate("/chat", {
      state: {
        doctor, 
        user: {
          id: payment.userId,
          
          token: localStorage.getItem("accessToken"), 
        },
        payment,
      },
    });
  };

  return (
    <div className="history-container">
      <Sidebar />
      <div className="history-content">
        <h1 className="history-title">Payment History</h1>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <table className="payment-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th>Visit</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="6">No payments found.</td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.doctorName}</td>
                    <td>${payment.amount}</td>
                    <td>
                      <span className={`status-${payment.paymentStatus.toLowerCase()}`}>
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td>{new Date(payment.timestamp).toLocaleString()}</td>
                    <td>
                      <button
                        className="view-details-btn"
                        onClick={() => handleVisitDoctor(payment.doctorName,payment.id,payment.doctorId,payment)}
                      >
                        Visit doctor
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
        <PredictionHistory />
      </div>
    </div>
  );
};

export default History;
