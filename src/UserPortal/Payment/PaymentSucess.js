import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Fetching `doctorId` and `userId` from query params or state
  const doctorId = queryParams.get("doctorId");
  const userId = queryParams.get("userId");

  useEffect(() => {
    if (userId && doctorId) {
      // Simulate a loading effect for user experience
      setTimeout(() => {
        setLoading(false); // Update loading state
        alert("Payment successful! Redirecting to your chat...");
        navigate("/chat", { state: { userId, doctorId } });
      }, 2000); // Wait 2 seconds before redirecting
    } else {
      alert("Invalid payment details. Redirecting...");
      navigate("/payment-failure"); // Redirect on invalid details
    }
  }, [userId, doctorId, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {loading ? (
        <h2>Processing your payment...</h2>
      ) : (
        <h2>Payment Successful! Redirecting...</h2>
      )}
    </div>
  );
};

export default PaymentSuccess;
