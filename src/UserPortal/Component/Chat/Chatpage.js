import React from "react";
import Chat from "../Chat/Chat"; 
import Sidebar from "../../Dashboard/Sidebar";
import './Chatpage.css';
import ChatList from "./ChatList";

const ChatPage = () => {
  return (
    <>
      <div className="chatpage-container">
      <Sidebar />
        <div className="chatlist">
          <ChatList /> 
        </div>
        <div className="chat-chat">
          <Chat /> 
        </div>
      </div>
    </>
  );
};

export default ChatPage;
