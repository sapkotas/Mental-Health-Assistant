import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import './LineChart.css'; // Importing the above CSS

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LineChart = () => {
  const [chartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Patients',
        data: [40, 55, 60, 45, 70, 90, 20, 80, 15,  30, 50, 60],
        borderColor: '#7b61ff', // Professional color tone
        backgroundColor: 'rgba(123, 97, 255, 0.1)', // Soft background for the area under the curve
        tension: 1, // Smooth curved lines
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#7b61ff',
        pointRadius: 6, // Bigger point size
        pointHoverRadius: 8, // Slightly larger hover radius
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Keeping it minimal
      },
      tooltip: {
        backgroundColor: '#ffffff', // Clean tooltip styling
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#eeeeee',
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 18,
        },
        titleFont: {
          family: "'Inter', sans-serif",
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#777777', // Subtle tick marks
          font: {
            family: "'Inter', sans-serif",
            size: 14,
          },
        },
        grid: {
          drawBorder: false,
          display: false, // Removing x-axis grid lines for a cleaner look
        },
      },
      y: {
        ticks: {
          color: '#777777',
          font: {
            family: "'Inter', sans-serif",
            size: 14,
          },
        },
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)', // Subtle grid lines
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3, // Slightly thicker line
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div className="chart-card">
      <h3>Patients Over Time</h3>
      <div className="line-chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
