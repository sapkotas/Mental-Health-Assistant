import React from "react";
import { useLocation } from "react-router-dom";
import Chat from "../Chat/Chat"; 
import Sidebar from "../../Dashboard/Sidebar";
import './Chatpage.css'

const ChatPage = () => {
  const location = useLocation();
  const { doctor, user } = location.state || {}; // Extract doctor and user details from state

  if (!doctor || !user) {
    return <div>Error: Missing doctor or user information.</div>;
  }

  return (
    <>
    <div className= "chatpage-container">
      <Sidebar/>
    <div className="chat-chat">
    <Chat receiverId={doctor.id} user={user} />
    </div>
    </div>
      </>
  );
};


export default ChatPage;
