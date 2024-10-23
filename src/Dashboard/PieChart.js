import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        label: 'Patients by Gender',
        data: [60, 30, 10], // Example data percentages
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 14,
          },
          color: '#4f4f4f',
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderWidth: 1,
        titleColor: '#333333',
        bodyColor: '#666666',
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 14,
        },
        titleFont: {
          family: "'Inter', sans-serif",
          size: 16,
        },
        padding: 10,
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div className="chart-card">
      <h3>Patients by Gender</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
