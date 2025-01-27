import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, doctor } = location.state || {}; // Destructure `user` and `doctor` from location.state

  const userId = user?.id; // Extract `userId` from `user` object
  const doctorId = doctor?.id; // Extract `doctorId` from `doctor` object

  useEffect(() => {
    if (userId && doctorId) {
      // Simulate a small loading time for user experience
      setTimeout(() => {
        alert("Payment successful! Redirecting to your chat...");
        navigate("/chat", { state: { userId, doctor } }); // Pass `userId` and `doctor` to the chat page
      }, 2000); // Wait 2 seconds before redirecting (for user to see success message)
    } else {
      alert("Invalid payment details. Redirecting...");
      navigate("/payment-failure"); // Redirect to failure page if details are invalid
    }
  }, [userId, doctorId, navigate]);

  return (
    <div>
      {loading ? (
        <h2>Processing your payment...</h2>
      ) : (
        <h2>Payment Successful! Redirecting...</h2>
      )}
    </div>
  );
};

export default PaymentSuccess;
