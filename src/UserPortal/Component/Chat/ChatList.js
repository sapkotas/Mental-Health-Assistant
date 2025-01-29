import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChatList.css";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [boldMessages, setBoldMessages] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor } = location.state || {};

  // Helper function to format timestamps
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown time";

    const seconds = timestamp.seconds || timestamp._seconds;
    if (seconds) return new Date(seconds * 1000).toLocaleString();

    if (timestamp.nanoseconds) {
      return new Date(timestamp.nanoseconds / 1e6).toLocaleString();
    }

    return "Invalid timestamp";
  };

  // Fetch chats from the backend API
  const fetchChats = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
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
      const fetchedChats = data.chats || [];

      setChats(fetchedChats);
      setBoldMessages(new Set(fetchedChats.map((chat) => chat.id))); // Mark all messages as bold
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError("Failed to fetch chats. Please try again later.");
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  // Fetch chats on mount
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Handle chat click
  const handleConsultClick = (chat) => {
    if (!localStorage.getItem("accessToken")) {
      alert("You need to log in to book a consultation.");
      navigate("/login");
      return;
    }

    // Remove bold formatting
    setBoldMessages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(chat.id);
      return newSet;
    });

    navigate("/chat", {
      state: {
        chat,
        doctor,
        user: {
          id: localStorage.getItem("userId"),
          token: localStorage.getItem("accessToken"),
        },
      },
    });
  };

  if (loading) return <p>Loading previous chats...</p>;
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
              onClick={() => handleConsultClick(chat)}
            >
              <div className="chat-info">
                <h3 className="chat-name">{chat.name || "Unknown User"}</h3>
                <p className={`chat-last-message ${boldMessages.has(chat.id) ? "bold" : ""}`}>
                  {chat.lastMessage || "No messages yet"}
                </p>
              </div>
              <div className="chat-meta">
                <p className="chat-timestamp">{formatTimestamp(chat.timestamp)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
