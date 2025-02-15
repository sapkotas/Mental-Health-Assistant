import React from 'react';
import './Dashboard.css'
import Sidebar from './Sidebar.js'
import Body from './Body';
import Downbar from './Downbar.js';
import Footer from '../Component/Footer/Footer.js';

const Dashboard= () => {
  return (
    <>
    <div className="dashboard-container">
      <Sidebar></Sidebar>
      <div className="main-content">
        <Body />
        <Downbar />
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default Dashboard;
