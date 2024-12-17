import React from 'react';

import AdminSidebar from './Sidebar/AdminSidebar.js';
import Footer from '../../UserPortal/Component/Footer/Footer.js';

const AdminDashboard = () => {
  // Get the access token from localStorage
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken)

  return (
    <>
      <div className="dashboard-container">
        <AdminSidebar />
        <div className="main-content">
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
