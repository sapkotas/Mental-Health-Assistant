import React from 'react';
import './Navbar.css';
import innerpeace from '../../assest/innerpeace.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
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
          <li className="nav-item">
            <NavLink to="/service" activeClassName="active">
              Service
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" activeClassName="active">
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Button Section */}
        <div className="nav-button">
          <button className="discover-button">Discover Calm</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
