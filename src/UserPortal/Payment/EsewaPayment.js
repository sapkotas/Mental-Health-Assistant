// src/PaymentForm.js
import React, { useState } from "react";
import axios from "axios";

const EsewaPayment = () => {
  const [formData, setFormData] = useState({
    amount: "",
    productName: "",
    transactionId: "",
    method: "esewa",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successUrl, setSuccessUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessUrl("");

    try {
      const response = await axios.post("http://localhost:3000/api/checkout-session", formData);
      const result = response.data;

      // Handle success based on the payment method
      if (formData.method === "esewa") {
        setSuccessUrl(result.esewaConfig.success_url);
      } else if (formData.method === "khalti") {
        window.location.href = result.khaltiPaymentUrl; // Redirect to Khalti payment URL
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ddd" }}>
      <h1>Payment</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successUrl && (
        <p style={{ color: "green" }}>
          Payment initiated successfully! Go to: <a href={successUrl}>{successUrl}</a>
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="amount">Amount (NPR):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="transactionId">Transaction ID:</label>
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="method">Payment Method:</label>
          <select
            id="method"
            name="method"
            value={formData.method}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="esewa">eSewa</option>
          </select>
        </div>
        <button type="submit" disabled={loading} style={{ padding: "10px 20px", cursor: "pointer" }}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default EsewaPayment;
