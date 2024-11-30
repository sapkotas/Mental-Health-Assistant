import React from 'react';
import './Sidebar.css';
import { FaUser, FaClipboardList,FaUserMd, FaHistory, FaCog, FaHome } from 'react-icons/fa';
import innerpeace from '../../src/assest/innerpeace.png'
import { NavLink, useNavigate } from 'react-router-dom';

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
            <li className="sidebar-items">
              <NavLink to="/overview/dashboard" activeClassName="active">
              <FaClipboardList /> Dashboard
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to ="/" activeClassName="active" >
              <FaHome/>Home
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to ="/profile" activeClassName="active">
              <FaUser /> Profile
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/doctor" activeClassName="active">
              <FaUserMd /> Doctors
              </NavLink>
            </li>
            <li className="sidebar-items">
              <NavLink to="/history" activeClassName="active">
              <FaHistory /> History
              </NavLink>
            </li>
          </ul>
        </nav>   
      </aside>
    </div>
    </>
  );
};

export default Sidebar;
