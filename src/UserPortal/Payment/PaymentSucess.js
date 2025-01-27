import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({ loading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Redirect to /doctor-details after a short delay
      const timer = setTimeout(() => {
        navigate("/doctor-details");
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [loading, navigate]);

  return (
    <div>
      {loading ? (
        <h2>Processing your payment...</h2>
      ) : (
        <h2>Payment Successful! Redirecting.....</h2>
      )}
    </div>
  );
};

export default PaymentSuccess;
