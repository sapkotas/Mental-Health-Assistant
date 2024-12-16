import React from "react";

const KhaltiPayment = () => {
  const handlePayNow = async () => {
    try {
      // Make an API call to your backend to initiate the payment
      const response = await fetch("https://mental-health-assistant-backend.onrender.com/api/khalti/initiate", {
        method: "POST",
        body: JSON.stringify({
          doctorId: "DuPwSF3s3m4mBAdsXMme", // Send the doctor's ID
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status === "success") {
        // The response from the backend should contain the payment URL
        const paymentUrl = data.payment_url;

        // Open Khalti's payment portal in a new window
        window.open(paymentUrl, "_blank"); // Open in a new tab
      } else {
        alert("Error generating payment link. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Doctor Subscription Payment</h1>
      <button onClick={handlePayNow}>Pay Now</button>
    </div>
  );
};

export default KhaltiPayment;
