import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatList.css";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

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

  useEffect(() => {
    fetchChats();
  }, []);

  const handleChatClick = (chat) => {
    navigate("/chat", {
      state: {
        doctor: {
          userId: userId,
          fullName: chat.name,
        },
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
          {chats.map((chat, index) => (
            <li
              key={index}
              className="chat-item"
              onClick={() => handleChatClick(chat)}
            >
              <div className="chat-info">
                <h3 className="chat-name">{chat.name || "Unknown User"}</h3>
                <p className="chat-last-message">
                  {chat.lastMessage || "No messages yet"}
                </p>
              </div>
              <div className="chat-meta">
                <p className="chat-timestamp">
                  {chat.timestamp
                    ? new Date(chat.timestamp.seconds * 1000).toLocaleString()
                    : "Unknown time"}
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
