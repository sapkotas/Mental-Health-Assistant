import React from 'react';
import './Body.css'
import { FaBed, FaUsers, FaMoneyBill,  FaUserMd } from 'react-icons/fa';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Body = () => {
  // Data for bar chart
  const barData = {
    labels: ['Shrawan', 'Bhadra', 'Ashoj', 'Khartik', 'Mangsir', 'Poush'],
    datasets: [
      {
        label: 'Healthy',
        backgroundColor: '#00C49F',
        borderColor: '#00C49F',
        borderWidth: 1,
        hoverBackgroundColor: '#00E5B0',
        data: [1, 2, 5,4,6,9],
      },
      {
        label: 'Unhealthy',
        backgroundColor: '#7E57C2',
        borderColor: '#7E57C2',
        borderWidth: 1,
        hoverBackgroundColor: '#9E75E2',
        data: [3, 2, 8, 3, 7,6],
      },
    ],
  };

  // Data for gender chart (Doughnut)
  const genderData = {
    labels: ['Female', 'Male', 'Other'],
    datasets: [
      {
        data: [8, 5, 2],
        backgroundColor: ['#FF6384', '#36A2EB','#FFCE56'],

        hoverBackgroundColor: ['#FF85A0', '#68B4F4','#FFD67E'],

      },
    ],
  };

  // Data for patients (Doughnut)
  const patientData = {
    labels: ['Healthy', 'Unhealthy'],
    datasets: [
      {
        data: [10, 5],
        backgroundColor: ['#00C49F', '#7E57C2'],
        hoverBackgroundColor: ['#00E5B0', '#9E75E2'],
      },
    ],
  };

  return (
    // <div className="body">
    //   <header className="body-header">
    //     <input type="text" placeholder="Search..." className="search-bar" />
    //     <div className="profile">
    //       <img src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png" alt="Emma Kwan" className="profile-pic" />
    //       <span>Emma Kwan</span>
    //     </div>
    //   </header>
    <> 

      <div className="body-overview">
        <div className="overview-card">
          <FaBed className="icon" />
          <div>
            <h3>15</h3>
            <p>Total Patients</p>
          </div>
        </div>
        <div className="overview-card">
          <FaUsers className="icon" />
          <div>
            <h3>10</h3>
            <p>Available Staff</p>
          </div>
        </div>
        <div className="overview-card">
          <FaMoneyBill className="icon" />
          <div>
            <h3>Rs 2,000</h3>
            <p>Avg Treat. Costs</p>
          </div>
        </div>
        <div className="overview-card">
          <FaUserMd className="icon" />
          <div>
            <h3>10</h3>
            <p>Available Doctor</p>
          </div>
        </div>
      </div>

      <div className="body-charts">
        <div className="chart-section">
          <h4>Healthy vs. Unhealthy</h4>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
   
        <div className="chart-pie-section">
          <h4>Patients by Gender</h4>
          <Doughnut data={genderData} />
          
        </div>
        <div className="chart-pie-section">
          <h4>Patients Overview</h4>
          <Doughnut data={patientData} />
        </div>
      </div>
    </>
  );
};

export default Body;
