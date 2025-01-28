import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../Chat/Chat"; 
import Sidebar from "../../Dashboard/Sidebar";
import './Chatpage.css';
import ChatList from "./ChatList";

const ChatPage = () => {
  const location = useLocation();
  const { doctor, user } = location.state || {}; 

  if (!doctor || !user) {
    return <div>Error: Missing doctor or user information.</div>;
  }

  console.log(user.fullName);



  return (
    <>
      <div className="chatpage-container">
        <Sidebar />
        <ChatList/> 
        <div className="chat-chat">
          <Chat/> 
        </div>
      </div>
 
    </>
  );
};

export default ChatPage;
