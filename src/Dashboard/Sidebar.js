import React from 'react';
import './Sidebar.css';
import { FaUser, FaClipboardList,FaUserMd, FaHistory, FaCog, FaHome } from 'react-icons/fa';
import innerpeace from '../../src/assest/innerpeace.png'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="sidebar-dashboard">
      <aside className="sidebar">
      <div className="logo">
          <img src={innerpeace} alt="Inner Peace Logo" className="logo-image" onClick={()=>navigate("/")} style={{height:"45px" , width:"45px"}}/>
          <span className="logo-text" onClick={()=>navigate("/")} style={{fontSize:"1.3rem"}}>Inner Peace</span>
        </div>
        <nav className="sidebar-nav">
          <ul className='sidebar-links'>
            <li className="sidebar-items"onClick={()=>navigate("/")}>
              <FaHome/>Home
            </li>
            <li className="sidebar-items"onClick={()=>navigate("/overview/dashboard")}>
              <FaClipboardList /> Overview
            </li>
            <li className="sidebar-items" onClick={()=>navigate("/profile")}>
              <FaUser /> Profile
            </li>
            <li className="sidebar-items"onClick={()=>navigate("/doctor")}>
              <FaUserMd /> Doctors
            </li>
            <li className="sidebar-items"onClick={()=>navigate("/history")}>
              <FaHistory /> History
            </li>
            <li className="sidebar-items"onClick={()=>navigate("/settings")}>
              <FaCog /> Settings
            </li>
          </ul>
        </nav>   
      </aside>
    </div>
    </>
  );
};

export default Sidebar;
