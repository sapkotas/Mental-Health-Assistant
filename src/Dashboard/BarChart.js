import React from 'react';
import './BarChart.css';

const BarChart = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    data: [40, 55, 60, 45, 70, 90, 20, 80, 15, 30, 50, 60],
  };

  const maxValue = Math.max(...chartData.data);

  return (
    <div className="bar-card">
      <h3>Monthly Patients Data</h3>
      <div className="bar-chart-container">
        <div className="bar-chart">
          {chartData.labels.map((label, index) => (
            <div key={index} className="bar-wrapper">
              <div
                className="bar"
                style={{
                  height: `${(chartData.data[index] / maxValue) * 100}%`,
                }}
              ></div>
              <span className="label">{label}</span>
              <span className="value">{chartData.data[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChart;
