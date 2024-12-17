import React from 'react'
import './Steps.css'
import { useNavigate } from 'react-router-dom';

const Steps = () => {
    const navigate = useNavigate();
    const steps = [
        { id: 1, icon: "📝", title: "Initial Assessment" },
        { id: 2, icon: "⚙️", title: "Continual Guidance" },
        { id: 3, icon: "📈", title: "Monitoring & Growth" },
      ];
  return (
    <div className="steps-section">
    <div className="steps-header">
      <h1 className='main-heading'>Step-by-Step Support for Your <span style={{color: "red"}}>Mental</span> Health Journey</h1>
      <p className='steps-subtext'>
      How are you feeling today? Are you experiencing any sort of discomfort? Take a moment to check in with yourself and prioritize your mental health. Remember, it's okay to not be okay, and seeking support is a sign of strength.
      </p>
      <div className='button-container'>
      <button className="condition-button" onClick={()=>navigate("/check_your_condition")}>Check your condition</button>
      </div>
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