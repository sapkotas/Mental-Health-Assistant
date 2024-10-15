import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import mediating from './mediating.png'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <Navbar/>

      {/* Main Content */}
      <main>
        {/* Section 1: Wellbeing and Mental Healthcare */}
        <section className="wellbeing-section">
          <div className="content">
            <h1>Wellbeing & mental healthcare</h1>
            <p>Have you ever wondered what it’s like to be working in a mental health environment?</p>
            <button className="btn">Request a demo</button>
          </div>
          <div className="image-section">
            <img src = {mediating} alt="person mediating" srcset=""/>
          </div>
        </section>

        {/* Section 2: Stress Levels */}
        <section className="stress-section">
          <h2>We are experiencing high levels of stress</h2>
          <div className="cards">
            <div className="card">
              <h3>Wellbeing and mental health due to stigma</h3>
              <p>Have you ever wondered what it’s like to be working in a mental health environment?</p>
              <button className="btn">Read more</button>
            </div>
            <div className="card">
              <h3>Set your Fitness Assistant Mr. Bolt</h3>
              <p>Stay Fit and Healthy</p>
              <button className="btn">Talk</button>
            </div>
          </div>
        </section>

        {/* Section 3: Programs */}
        <section className="program-section">
          <div className="program-card">
            <h3>Workout Challenge</h3>
            <p>Take Part in The Cardio Challenge, Invite Your Friends and Compete</p>
          </div>
          <div className="program-card">
            <h3>Traditional Employee Assistance Programs</h3>
            <p>Learn what it’s like to be in a mental health working environment.</p>
          </div>
        </section>
      </main>
      <b className='login-try'>To find more information please <Link to ="/login">Login!</Link></b>

      {/* Footer Section */}
      <footer>
        <p>ProNature &copy; 2024. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
