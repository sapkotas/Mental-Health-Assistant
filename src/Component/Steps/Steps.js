import React from 'react'
import './Steps.css'
import { useNavigate } from 'react-router-dom';

const Steps = () => {
    const navigate = useNavigate();
    const steps = [
        { id: 1, icon: "📝", title: "Initial Assessment" },
        { id: 2, icon: "✈️", title: "Custom Plan" },
        { id: 3, icon: "⚙️", title: "Continual Guidance" },
        { id: 4, icon: "📈", title: "Monitoring & Growth" },
      ];
  return (
    <div className="steps-section">
    <div className="steps-header">
      <h6>How It Works</h6>
      <h2>Step-by-Step Support for Your Mental Health Journey</h2>
      <p>
        Habitant quis augue in feugiat aenean magnis neque primis pharetra odio sociosqu auctor quam integer lobortis eros nam volutpat ligula urna tincidunt adipiscing.
      </p>
      <button className="discover-button" onClick={()=>navigate("/check_your_condition")}>Check your condition</button>
    </div>

    <div className="steps-grid">
      {steps.map((step) => (
        <div className="step-card" key={step.id}>
          <div className="step-icon">{step.icon}</div>
          <h3>{`0${step.id}`}</h3>
          <p>{step.title}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Steps