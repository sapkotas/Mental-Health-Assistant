import React from 'react';
import { FaUser, FaClipboardList, FaUserMd, FaHistory, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import innerpeace from '../../../assest/innerpeace.png'

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        // Optional: Call the logout endpoint if available
        await fetch(`${process.env.REACT_APP_API_URL || 'https://mental-health-assistant-backend.onrender.com'}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
      localStorage.removeItem('role');

    }

    // Clear tokens and other user data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');


    // Redirect to login or home page
    navigate('/login');
  };

  return (
    <>
      <div className="sidebar-dashboard">
        <aside className="sidebar">
          <div className="logo">
            <img
              src={innerpeace}
              alt="Inner Peace Logo"
              className="logo-image"
              style={{ height: '45px', width: '45px' }}
            />
            <span className="logo-text" style={{ fontSize: '1.3rem' }}>Inner Peace</span>
          </div>
          <nav className="sidebar-nav">
            <ul className="sidebar-links">
              <li className="sidebar-items">
                <NavLink to="/admin/dashboard" activeClassName="active">
                  <FaClipboardList /> Dashboard
                </NavLink>
              </li>
              <li className="sidebar-items">
                <NavLink to="/admin/user" activeClassName="active">
                  <FaUser /> Profile
                </NavLink>
              </li>
              <li className="sidebar-items">
                <NavLink to="/admin/doctor" activeClassName="active">
                  <FaUserMd /> Doctors
                </NavLink>
              </li>
              <li className="sidebar-items">
                <NavLink to="/login" activeClassName="active" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default AdminSidebar;
