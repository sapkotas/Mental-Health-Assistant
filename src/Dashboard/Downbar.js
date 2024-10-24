import React from 'react';
import './Downbar.css';
import { FaHeart, FaBrain, FaUserMd } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registering required elements
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Downbar = () => {
  // Line chart for 'Time Admitted'
  const timeAdmittedData = {
    labels: ['07 am', '08 am', '09 am', '10 am', '11 am', '12 pm'],
    datasets: [
      {
        label: 'Time Admitted',
        data: [60, 113, 80, 90, 70, 100],
        borderColor: '#FF7043',
        backgroundColor: 'rgba(255, 112, 67, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Line chart for 'Patients this month'
  const patientsThisMonthData = {
    labels: ['14', '15', '16', '17', '18', '19'],
    datasets: [
      {
        label: 'Patients this month',
        data: [190, 210, 180, 200, 232, 220],
        borderColor: '#7E57C2',
        backgroundColor: 'rgba(126, 87, 194, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart options to remove grid lines and optimize layout
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Removing grid lines
        },
      },
      y: {
        grid: {
          display: false, // Removing grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Keep the legend visible
        position: 'top',
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="downbar">
      <div className="downbar-lower">
        {/* Time Admitted chart */}
        <div className="chart-section">
          <h4>Time Admitted</h4>
          <Line data={timeAdmittedData} options={chartOptions} />
        </div>

        {/* Patients by Division */}
  <div className="division-section">
  <h4>Patients By Division</h4>
  <table className="division-table">
    <thead>
      <tr>
        <th>Division</th>
        <th>PT.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><FaHeart /> Cardiology</td>
        <td>247</td>
      </tr>
      <tr>
        <td><FaBrain /> Neurology</td>
        <td>164</td>
      </tr>
      <tr>
        <td><FaUserMd /> Surgery</td>
        <td>86</td>
      </tr>
    </tbody>
  </table>
</div>
        {/* Patients this month card */}
        <div className="patients-card">
          <h3>100</h3>
          <p>Patients this month</p>
          <Line data={patientsThisMonthData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Downbar;
