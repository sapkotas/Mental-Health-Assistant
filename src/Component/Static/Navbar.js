import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create a separate CSS file for the navbar styles


function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">Mehea</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="#">Our works</Link></li>
        </ul>

        <Link to ="/login"><button className="btn demo-btn">Login</button></Link>
      </nav>
    </header>
  );
}

export default Navbar;
