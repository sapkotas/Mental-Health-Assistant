import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../Chat/Chat"; 
import Sidebar from "../../Dashboard/Sidebar";
import './Chatpage.css';
import ChatList from "./ChatList";

const ChatPage = () => {
  const location = useLocation();
  const { doctor, user } = location.state || {}; 
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger refresh

  if (!doctor || !user) {
    return <div>Error: Missing doctor or user information.</div>;
  }

  console.log(user.fullName);

  // Function to trigger soft refresh
  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the refresh key
  };

  return (
    <>
      <div className="chatpage-container">
        <Sidebar />
        <ChatList key={refreshKey} /> {/* Pass refreshKey to trigger rerender */}
        <div className="chat-chat">
          <Chat key={refreshKey} receiverId={doctor.id} user={user} /> {/* Pass refreshKey */}
        </div>
      </div>
      <button onClick={handleRefresh} className="refresh-button">
        Refresh
      </button>
    </>
  );
};

export default ChatPage;
