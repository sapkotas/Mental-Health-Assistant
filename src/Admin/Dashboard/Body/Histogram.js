import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { probability: "0.0", frequency: 160 },
  { probability: "1.0", frequency: 220 }
];

const HistogramGraph = () => {
  return (
    <div style={{ width: "72%", height: 300 }}>
      <h3 style={{ textAlign: "center" }}>Histogram of Predicted Probabilities</h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="probability" label={{ value: "Predicted probability of treatment", position: "bottom", dy: 10 }} />
          <YAxis label={{ value: "Frequency", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="frequency" fill="#4682B4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramGraph;
