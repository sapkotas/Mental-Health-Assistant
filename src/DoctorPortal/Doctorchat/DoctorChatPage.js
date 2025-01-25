import React from "react";
import { useLocation } from "react-router-dom";
import DoctorSidebar from '../DoctorSidebar/DoctorSidebar'
import DoctorChat from "./DoctorChat";
const ChatPage = () => {
  const location = useLocation();
  const { doctor, user } = location.state || {}; 
  if (!doctor || !user) {
    return <div>Error: Missing doctor or user information.</div>;
  }
  console.log(user.fullName)

  return (
    <>
    <div className= "chatpage-container">
      <DoctorSidebar/>
    <div className="chat-chat">
    <DoctorChat receiverId={user.id}/>
    </div>
    </div>
      </>
  );
};


export default ChatPage;
