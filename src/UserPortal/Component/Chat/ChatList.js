import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './ChatList.css';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get doctor from location.state (passed from the previous page)
  const { doctor } = location.state || {}; // Destructure to get the doctor

  // Helper function to format the timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown time";

    // Check if the timestamp has seconds field (Firebase Timestamp)
    if (timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    }

    // Check if the timestamp has _seconds field
    if (timestamp._seconds) {
      const date = new Date(timestamp._seconds * 1000);
      return date.toLocaleString();
    }

    // Check for nanoseconds field
    if (timestamp.nanoseconds) {
      const date = new Date(timestamp.nanoseconds / 1000000); // Convert nanoseconds to ms
      return date.toLocaleString();
    }

    return "Invalid timestamp format"; // Return an error message if it's unrecognized
  };

  // Fetch chats from the backend API
  const fetchChats = async () => {
    try {
      setLoading(true);
      setError("");

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("You are not authorized. Please log in.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://mental-health-assistant-backend.onrender.com/api/chat/lastMessage",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to fetch chats.");
      }

      const data = await response.json();
      setChats(data.chats || []);
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError("Failed to fetch chats. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch chats when the component mounts
  useEffect(() => {
    fetchChats();
  }, []);

  // Handle the consultation click for a chat (initiate conversation)
  const handleConsultClick = (chat) => {
    const userId = localStorage.getItem("userId");
    const isLoggedIn = !!localStorage.getItem("accessToken");

    if (!isLoggedIn) {
      alert("You need to log in to book a consultation.");
      navigate("/login");
      return;
    }

    // Navigate to the chat page, passing the doctor and user info
    navigate("/chat", {
      state: {
        chat,
        doctor, 
        user: {
          id: userId,
          token: localStorage.getItem("accessToken"),
        },
      },
    });
  };

  if (loading) return <p>Loading chats...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="chat-list-container">
      <h2>Your Chats</h2>
      {chats.length === 0 ? (
        <p>No chats available.</p>
      ) : (
        <ul className="chat-list">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="chat-item"
              onClick={() => handleConsultClick(chat)} // Pass selected chat
            >
              <div className="chat-info">
                <h3 className="chat-name">{chat.name || "Unknown User"}</h3>
                <p className="chat-last-message">
                  {chat.lastMessage || "No messages yet"}
                </p>
              </div>
              <div className="chat-meta">
                <p className="chat-timestamp">
                  {formatTimestamp(chat.timestamp)} {/* Using timestamp format helper */}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
