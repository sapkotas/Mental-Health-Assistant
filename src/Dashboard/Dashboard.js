import React from 'react';
import './Dashboard.css'
import Sidebar from './Sidebar.js'
import Body from './Body';
import Downbar from './Downbar.js';
import Footer from '../Component/Footer/Footer.js';
// import Navbar from '../Component/Static/Navbar/Navbar.js';

const Dashboard= () => {
  return (
    <>
    {/* <Navbar/> */}
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
