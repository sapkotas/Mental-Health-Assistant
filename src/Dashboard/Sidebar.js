import React from 'react';
import './Sidebar.css';
import { FaUser, FaClipboardList, FaMapMarkerAlt, FaHospital, FaUserMd, FaHistory, FaCog, FaHome } from 'react-icons/fa';
import innerpeace from '../../src/assest/innerpeace.png'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="sidebar-dashboard">
      <aside className="sidebar">
      <div className="logo">
          <img src={innerpeace} alt="Inner Peace Logo" className="logo-image" onClick={()=>navigate("/")}/>
          <span className="logo-text" onClick={()=>navigate("/")}>Inner Peace</span>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={()=>navigate("/")}>
              <FaHome/>Home
            </li>
            <li>
              <FaClipboardList /> Overview
            </li>
            <li>
              <FaUser /> Profile
            </li>
            <li>
              <FaUserMd /> Doctors
            </li>
            <li>
              <FaHistory /> History
            </li>
            <li>
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
