import React, { useState } from 'react';
import './About.css';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import sunav from '../../assest/sunav.jpg'
import shashank from '../../assest/shashank.jpg'
import rohan from '../../assest/rohan.PNG'
const teamMembers = [
  { 
    name: 'Rohan Pokhrel', 
    role: 'Developer', 
    img: rohan, 
    description: 'Rohan ensures our operations run smoothly and efficiently.' 
  },
  { 
    name: 'Shashank Katwal', 
    role: 'Developer', 
    img: shashank, 
    description: 'Shashank is the visionary behind our company with over 80 years of experience.' 
  },
  { 
    name: 'Sunav Sapkota', 
    role: 'Developer', 
    img: sunav,
    description: 'Sunav is the thinker behind our technology and software.' 
  }
];

const About = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      <Navbar />
      <div className="about-us">
        <section className="hero"></section>

        <section className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              To build the system that gathers inputs on the basis of surveys filled by the 
              individuals and their statements regarding their current mental health.
            </p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>
              To build the system that helps the consulting psychiatrists to get patient 
              appointments which helps them as well and vice-versa.
            </p>
          </div>
        </section>

        <section className="values"></section>

        <section className="team">
          <h2>Team Work Makes the Dream Work</h2>
          <div className="team-members">
            {teamMembers.map(member => (
              <div 
                key={member.name} 
                className="team-member" 
                onClick={() => setSelectedMember(member)}
              >
                <img src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {selectedMember && (
          <div className="modal" onClick={() => setSelectedMember(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <span className="close" onClick={() => setSelectedMember(null)}>&times;</span>
              <img src={selectedMember.img} alt={selectedMember.name} />
              <h3>{selectedMember.name}</h3>
              <p>{selectedMember.role}</p>
              <p>{selectedMember.description}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default About;
