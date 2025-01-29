import React, { useState, useEffect } from "react";
import DoctorSidebar from "../DoctorSidebar/DoctorSidebar";

// Create a PaymentHistory component
const DoctorHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await fetch(
          "https://mental-health-assistant-backend.onrender.com/api/payment/doctorHistory",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        if (data.status === "success") {
          setPaymentData(data.payments);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  return (
    <div className="history-container">
      <DoctorSidebar />
      <div className="history-content">
        <h2 className="history-title">Payment History</h2>
        {isLoading ? (
          <p className="loader">Loading...</p>
        ) : (
          <table className="payment-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((payment) => (
                <tr key={payment.transactionId}>
                  <td>{payment.userName}</td>
                  <td>{payment.amount}</td>
                  <td className={payment.paymentStatus === "success" ? "status-success" : "status-failure"}>
                    {payment.paymentStatus}
                  </td>
                  <td>
                    {new Date(payment.timestamp._seconds * 1000).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorHistory;
