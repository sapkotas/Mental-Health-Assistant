import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import innerpeace from '../../assest/innerpeace.png';
import user from '../../assest/user.png'; 
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaClipboardList,FaUserMd, FaHistory, FaCog, FaHome, FaOutdent, FaSign, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  // State to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to toggle dropdown menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Ref for the user profile and dropdown to detect outside clicks
  const menuRef = useRef(null);

  // Simulate user login state from localStorage or API
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userLoggedIn);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // Event listener for clicks outside the menu
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle the dropdown menu on user logo click
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo">
          <img src={innerpeace} alt="Inner Peace Logo" className="logo-image" />
          <span className="logo-text">Inner Peace</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
        </ul>

        {/* Button Section */}
        <div className="nav-button">
          {isLoggedIn ? (
            <div className="user-profile" ref={menuRef}>
              <img
                src={user}
                alt="User Logo"
                className="user-logo"
                onClick={toggleMenu} // Toggle menu visibility on click
              />
  

              {menuOpen && (
                <div className="dropdown-menu">
                  <button className='dropdown-item' onClick={()=>navigate("/profile")}><FaUser/>  profile</button>
                  <button className="dropdown-item" onClick={handleLogout}><FaSignOutAlt/>  logout</button>
                  <button className="dropdown-item" onClick={()=>navigate("/settings")}><FaCog/>  settings</button>
                </div>
              )}


            </div>
          ) : (
            <button className="discover-button" onClick={() => navigate('/login')}>
              Discover Calm
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
