import React from 'react';
import './UserDashboard.css'; // Ensure you link the CSS file for styling
import Navbar from '../Component/Static/Navbar';
import PieChart from './PieChart';
import LineChart from './LineChart';

 const UserDashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <h1>M-care</h1>
        </div>
        <ul className="menu">
          <li>Overview</li>
          <li>Profile</li>
          <li>Doctors</li>
          <li>History</li>
          <li>Settings</li>
        </ul>
        <div className="mobile-app-promo">
          <h3>Get Mobile App</h3>
          <button className="app-button">Download</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="user-info">
            {/* <span>Emma Kwan</span> */}
          </div>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Patients</h3>
            <span>980</span>
          </div>
          <div className="card">
            <h3>Available Staff</h3>
            <span>150</span>
          </div>
          <div className="card">
            <h3>Avg Treat. Costs</h3>
            <span>Rs 2,536</span>
          </div>
          <div className="card">
            <h3>Available Doctors</h3>
            <span>12</span>
          </div>
        </div>

        <div className="dashboard-graphs">
            <div className="placeholder-graph"><LineChart/>
            </div>
          <div className="graph-card">
              <PieChart/>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};
export default  UserDashboard;
