import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const errorMessage = queryParams.get("error") || "Payment failed. Please try again.";
    alert(errorMessage);
    navigate("/retry-payment");  // You can create this route to retry payment
  }, [navigate, queryParams]);

  return (
    <div>
      <h1>Payment Failed</h1>
      <p>There was an issue with your payment. Please try again later.</p>
    </div>
  );
};

export default PaymentFailure;
