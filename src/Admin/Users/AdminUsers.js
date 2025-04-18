import React, { useEffect, useState } from "react";
import { useUser } from "../../UserPortal/UserContext";
import AdminSidebar from "../Dashboard/Sidebar/AdminSidebar";
import adminimage from '../../assest/adminimage.jpg'

export const AdminUsers = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { setUserId } = useUser();

  useEffect(() => {
    const fetchProfileData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("You must be logged in to view the profile.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://mental-health-assistant-backend.onrender.com/api/users/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        if (data.status === "success") {
          setProfileData(data.data);
          localStorage.setItem("user", JSON.stringify(data.data.user)); 
          localStorage.setItem("userId", data.data.user.userId); 
          setUserId(data.data.user.userId); // Store userId in Context
          setError("");
        } else {
          throw new Error(data.message || "Failed to fetch profile data.");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err.message);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [setUserId]);


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile, please wait...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  const { user } = profileData;


  return (
    <div className="profile-container">
      
      <AdminSidebar />
      <div className="profile-content">
        <div className="user-details">
        <div className="user-image">
            <img src={adminimage} alt="" srcset="" />
          </div>
          <h2>{user.fullName}</h2>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            {/* <strong>Id:</strong> {user.userId} */}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Privilege:</strong> Verify doctors
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt._seconds * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
