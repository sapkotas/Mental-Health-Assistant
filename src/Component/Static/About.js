import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function About() {
  return (
    <div className="about-container">
      {/* Header Section */}
        <Navbar/>

      {/* About Us Section */}
      <section className="about-section">
        <h1>About Us</h1>
        <p>At ProNature, we are committed to supporting mental health and wellbeing in professional environments. Our mission is to provide a safe, inclusive, and accessible platform for individuals to improve their mental health, fitness, and overall quality of life.</p>
        <h2>Our Guidelines</h2>
        <ul className="rules-list">
          <li>Confidentiality and Privacy: All user data is securely stored and handled with the utmost confidentiality.</li>
          <li>Professional Assistance: Our platform connects users with certified mental health professionals for personalized support.</li>
          <li>Inclusive Environment: We foster a non-judgmental, stigma-free space for users to express themselves and seek help.</li>
          <li>Regular Updates: Our content is regularly updated with the latest research and mental health trends.</li>
          <li>Community Support: Users are encouraged to participate in community challenges and support groups for collective wellbeing.</li>
          <li>Self-care Tools: We provide tools to help track mental and physical health, such as journaling, meditation, and fitness tracking.</li>
        </ul>
      </section>
 

      {/* Footer Section */}
      <footer>
        <p>Mehea &copy; 2024. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
