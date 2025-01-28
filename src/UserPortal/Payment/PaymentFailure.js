import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentFailure";

const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to home after rendering the component
    const timer = setTimeout(() => {
      navigate("/"); // Navigate to the home page
    }, 2000); // Wait for 2 seconds before redirecting

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="payment-failure-container">
      <h1 className="payment-failure-title">Payment Failed</h1>
      <p className="payment-failure-message">
        There was an issue with your payment. Redirecting to the home page...
      </p>
    </div>
  );
};

export default PaymentFailure;
