import React from 'react';
import Navbar from '../Component/Static/Navbar.js'
import './Dashboard.css'
import Sidebar from './Sidebar.js'
import Body from './Body';
import Downbar from './Downbar.js';

const Dashboard= () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="dashboard-container">
      <Sidebar></Sidebar>
      <div className="main-content">
        <Body />
        <Downbar />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
