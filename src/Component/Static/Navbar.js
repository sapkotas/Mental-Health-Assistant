import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
   
    const authData = localStorage.getItem('authToken');
    if (authData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
   
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">Mehea</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="#">Our Works</Link></li>
        </ul>

        {isLoggedIn ? (
          <button className="btn demo-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login"><button className="btn demo-btn">Login</button></Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
