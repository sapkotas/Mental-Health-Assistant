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



  return (
    <>
      <div className="chatpage-container">
        <Sidebar />
        <ChatList key={refreshKey} /> {/* Pass refreshKey to trigger rerender */}
        <div className="chat-chat">
          <Chat key={refreshKey} receiverId={doctor.id} user={user} /> {/* Pass refreshKey */}
        </div>
      </div>
 
    </>
  );
};

export default ChatPage;
