import React from "react";
import DoctorSidebar from "../DoctorSidebar/DoctorSidebar";
import DoctorChatList from "./DoctorChatList";
import DoctorChat from "./DoctorChat";
import "./DoctorChatPage.css"

const DoctorChatPage = () => {


  return (
    <>
    <div className= "chatpage-container">
      <DoctorSidebar/>
      <DoctorChatList/>
      <div className="chat-chat">
      <DoctorChat/>
      </div>
      </div>

    
      </>
  );
};


export default DoctorChatPage;
