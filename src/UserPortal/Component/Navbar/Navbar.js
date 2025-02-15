import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import innerpeace from '../../../assest/innerpeace.png';
import user from '../../../assest/user.png';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';  // Import useLocation here
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Get location hook
  const role = localStorage.getItem("role");

  // Get profile based on role
  const getprofile = () => {
    if (role === "user") {
      navigate("/profile");
    } else if (role === "doctor") {
      navigate("/doctorprofile");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      alert("Role not defined. Please log in.");
    }
  };

  const { chat } = location.state || {}; // Ensure chat is passed correctly
  const receiverId = chat?.id;
  const userId = localStorage.getItem("userId");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about').scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#service"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('service').scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              Service
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              Contact

            </a>
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
                onClick={toggleMenu}
              />
              {menuOpen && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={getprofile}
                  >
                    <FaUser /> Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="discover-button"
              onClick={() => navigate('/login')}
            >
              Discover Calm
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
