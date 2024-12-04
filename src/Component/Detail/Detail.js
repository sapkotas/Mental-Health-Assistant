 import React from 'react'
import './Detail.css'
import { FaChild, FaComment, FaUser} from "react-icons/fa";
import therapist from '../../assest/therapist.jpg';
import { useNavigate } from 'react-router-dom';


export const Detail = () => {
  const navigate = useNavigate();
  return (
    <div className="detail-section">
    <div className="detail-content">
      <h1 className="detail-title"> <span style={{color:"red"}}>Mental</span> health is a human right, not a privilege.</h1>
      <p className="detail-description">
      It's time to break the stigma surrounding mental health. Everyone deserves access to quality mental healthcare. Let's work together to create a world where mental health is valued and supported.
      </p>
      <div className="services">
        <div className="service-item">
          <div className="service-icon" onClick={()=>navigate("/journal")}>
            <FaComment />
          </div>
          <div>
            <h5>Journal Writing</h5>
            <p>
            Reflect on a time when you felt truly understood. How did that person make you feel? What did they say or do? What can you learn from this experience to better connect with others?
            </p>
          </div>
        </div>
        <div className="service-item">
          <div className="service-icon">
            <FaChild />
          </div>
          <div>
            <h5>Individual Therapy</h5>
            <p>
            Consider individual therapy if you're struggling with personal challenges, seeking self-improvement, or managing mental health conditions.
            </p>
          </div>
        </div>
        <div className="service-item">
          <div className="service-icon">
            <FaUser />
          </div>
          <div>
            <h5>Personal Coaching</h5>
            <p>
            Ready to unlock your full potential? A personal coach can help you navigate your condition, achieve your goals, and live a more fulfilling life.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="detail-image">
      <img src={therapist} alt="Professional therapist" />
    </div>
  </div>

  )
}
