import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const { chat } = location.state || {};

  const receiverId = chat?.id;
  const userId = localStorage.getItem("userId");
  const messagesEndRef = useRef(null);

  // Fetch chat history from the backend
  const fetchChatHistory = async () => {
    if (!accessToken || !receiverId || !userId) {
      console.error("Access token or userId or receiverId is missing.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://mental-health-assistant-backend.onrender.com/api/chat/receive/${receiverId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        const normalizedMessages = (data.data || []).map((msg) => ({
          ...msg,
          timestamp: msg.timestamp && msg.timestamp._seconds
            ? new Date(msg.timestamp._seconds * 1000)
            : null,
        }));
        setMessages(normalizedMessages);
      } else {
        console.error("Failed to fetch messages:", data.message);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  // A version of fetchChatHistory without loading state
  const fetchChatHistoryWithoutLoading = async () => {
    if (!accessToken || !receiverId || !userId) {
      console.error("Access token or userId or receiverId is missing.");
      return;
    }

    try {
      const response = await fetch(
        `https://mental-health-assistant-backend.onrender.com/api/chat/receive/${receiverId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        const normalizedMessages = (data.data || []).map((msg) => ({
          ...msg,
          timestamp: msg.timestamp && msg.timestamp._seconds
            ? new Date(msg.timestamp._seconds * 1000)
            : null,
        }));
        setMessages(normalizedMessages);
      } else {
        console.error("Failed to fetch messages:", data.message);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Send a new message to the doctor
  const sendMessage = async () => {
    if (!accessToken || !receiverId || !userId) {
      console.error("Access token or userId or receiverId is missing.");
      return;
    }

    if (!newMessage.trim()) return;

    try {
      const response = await fetch(
        "https://mental-health-assistant-backend.onrender.com/api/chat/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            receiverId,
            senderId: userId,
            message: newMessage,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            senderId: userId,
            receiverId,
            message: newMessage,
            timestamp: new Date(),
          },
        ]);
        setNewMessage("");
      } else {
        console.error("Failed to send message:", data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (receiverId) {
      // Initial fetch when component mounts
      fetchChatHistory();

      // Fetch messages every 10 seconds
      const intervalId = setInterval(() => {
        fetchChatHistoryWithoutLoading();
      }, 6000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [receiverId]);

  // Scroll to the bottom of the chat every time messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with Dr. {chat?.name || "unknown"}</h2>
      </div>

      <div className="chat-history">
        {loading ? (
          <p>Loading...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet. Start a conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.senderId === userId ? "sent" : "received"
              }`}
            >
              <p>{msg.message}</p>
              <span className="timestamp">
                {msg.timestamp
                  ? msg.timestamp.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "N/A"}
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input"
        />
        <button onClick={sendMessage} className="send-button">
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
