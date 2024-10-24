import React from 'react';
import './Sidebar.css';
import { FaUser, FaClipboardList, FaMapMarkerAlt, FaHospital, FaUserMd, FaHistory, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>H-care</h2>
        </div>

        <button className="register-btn">Register Now +</button>

        <nav className="sidebar-nav">
          <ul>
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
  );
};

export default Sidebar;
