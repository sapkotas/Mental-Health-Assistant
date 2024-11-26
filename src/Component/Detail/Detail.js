import React from 'react'
import './Detail.css'
import { FaChild, FaUser, FaUsers } from "react-icons/fa";
import therapist from '../../assest/therapist.jpg';


export const Detail = () => {
  return (
    <div className="detail-section">
    <div className="detail-content">
      <h4 className="detail-subtitle">Who We Are</h4>
      <h2 className="detail-title">Mental health is a human right, not a privilege.</h2>
      <p className="detail-description">
        Conubia integer etiam dictum eros praesent amet mollis. Maecenas fermentum dui molestie
        platea odio elementum aliquet ac dignissim. Eros mollis morbi per montes in.
      </p>
      <div className="services">
        <div className="service-item">
          <div className="service-icon">
            <FaChild />
          </div>
          <div>
            <h5>Children Therapy</h5>
            <p>
              Quam senectus potenti curae tincidunt praesent malesuada amet est ridiculus laoreet
              consectetur.
            </p>
          </div>
        </div>
        <div className="service-item">
          <div className="service-icon">
            <FaUser />
          </div>
          <div>
            <h5>Individual Coaching</h5>
            <p>
              Quam senectus potenti curae tincidunt praesent malesuada amet est ridiculus laoreet
              consectetur.
            </p>
          </div>
        </div>
        <div className="service-item">
          <div className="service-icon">
            <FaUsers />
          </div>
          <div>
            <h5>Group Therapy</h5>
            <p>
              Quam senectus potenti curae tincidunt praesent malesuada amet est ridiculus laoreet
              consectetur.
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
