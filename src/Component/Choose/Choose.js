import React from 'react'
import './Choose.css'

import iconi from "../../assest/iconi.png"
import icon1 from "../../assest/icon1.png"
import icon2 from "../../assest/icon2.png"
import icon3 from "../../assest/icon3.png"
import icon5 from "../../assest/icon5.png"
import iocn6 from "../../assest/iocn6.png"
import icon7 from "../../assest/icon7.png"

const Choose = () => {
  return (
    <div className="why-choose-us">
        <img src={iconi} alt="icon" className="icon" />
        <h2 className="section-heading">Why Choose Us</h2>
        <div className="features-container">
          <div className="feature">
            <img src={icon3} alt="Personalized Care" />
            <h3>Personalized Care</h3>
            <p>
              We offer customized treatment plans designed to support your
              individual mental health journey.
            </p>
          </div>
          <div className="feature">
            <img src={icon2} alt="Qualified Therapists" />
            <h3>Qualified Therapists</h3>
            <p>
              Our experienced and licensed therapists use proven therapeutic
              approaches.
            </p>
          </div>
          <div className="feature">
            <img src={icon1} alt="Confidential & Secure" />
            <h3>Confidential & Secure</h3>
            <p>
              Your privacy is our priority. We provide a safe, non-judgmental
              space for you to explore.
            </p>
          </div>
          <div className="feature">
            <img src={icon5} alt="Flexible Therapy Options" />
            <h3>Flexible Therapy Options</h3>
            <p>
              With both in-person and virtual therapy sessions, we make it easy
              to access.
            </p>
          </div>
          <div className="feature">
            <img src={iocn6} alt="Holistic Approach" />
            <h3>Holistic Approach</h3>
            <p>
              We offer customized treatment plans designed to support your
              individual mental health journey.
            </p>
          </div>
          <div className="feature">
            <img src={icon7} alt="Therapy on Your Schedule" />
            <h3>Therapy on Your Schedule</h3>
            <p>
              You can prioritize your mental health without disrupting your
              routine.
            </p>
          </div>
        </div>
      </div>
  )
}

export default Choose