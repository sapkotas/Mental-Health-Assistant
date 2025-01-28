import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSucess.css"; 

const PaymentSuccess = ({ loading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        navigate("/history");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, navigate]);

  return (
    <div className="payment-success-container">
      {loading ? (
        <div>
          <h2 className="payment-loading">Processing your payment...</h2>
          <div className="spinner"></div>
        </div>
      ) : (
        <h2 className="payment-message">Payment Successful! Redirecting...</h2>
      )}
    </div>
  );
};

export default PaymentSuccess;
