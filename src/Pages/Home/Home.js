import React from "react";
import "./Home.css";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from  "../../Component/Footer/Footer"
import { useNavigate } from "react-router-dom";
import Steps from "../../Component/Steps/Steps";
import { Detail } from "../../Component/Detail/Detail";
import { FaGithub, FaLinkedin } from "react-icons/fa"; 
import rohan from '../../assest/rohan.PNG';
import shashank from '../../assest/shashank.jpg';
import sunav from '../../assest/sunav.jpg';
import hero from '../../assest/hero.png';
import personalized from '../../assest/personalized.png'
import secure from '../../assest/secure.png'
import professional from '../../assest/professional.png'
import service from '../../assest/schedule.png'
import accept from '../../assest/accept.png'
import timelogo from '../../assest/time logo.jpg'
import modification from '../../assest/modification.png'
import contact from '../../assest/contact.png'

const teamMembers = [
  {
    name: "ML developer",
    image: rohan,
    github: "https://github.com/Rotavirus22",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    name: "Backend developer",
    image: shashank,
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
{
  name: "Frontend Developer",
  image: sunav,
  github: "https://github.com/sapkotas",
  linkedin: "https://linkedin.com/in/janesmith",
},
];

const Home = () => {
  
  const navigate = useNavigate();
  return (
<>
{/* navbar container  */}
<Navbar/> 

<div className="overall-container">
<div className="home-container">
      {/* Existing Hero Section */}
      <div className="text-container">
        <span className="main-heading">
        <h1 className="main-heading">Mental<p></p><p style={{color:"red"}}>Wellness</p> <span> Begins Here</span></h1>
        </span>
        <p className="sub-text">
          Discover a supportive environment where your mental health journey
          starts. We provide the tools, guidance, and care needed to <nurt></nurt>ure
          your mind, helping you achieve lasting peace and balance. Your path
          to emotional wellbeing begins with us, right here.
        </p>
        <div class="dashboard-button-container">
  <button class="dashboard-button" onClick={()=>navigate("/overview/dashboard")}> visit your Dashboard</button>
</div>

      </div>
        <div className="images-container">
        <img src={hero} alt="Mental Wellness" className="main-image" />
      </div>
</div>

{/* hero section part 2 */}
<Steps/>

{/* detail container */}
<Detail/>

{/* about us container*/}
<div className="about-us-container" id="about">
    <h1 className="about-us-heading">Meet Our Team</h1>
    <div className="team-grid">
      {teamMembers.map((member, index) => (
        <div className="team-member" key={index}>
          <div className="image-container">
            <img src={member.image} alt={member.name} className="team-image" />
            <div className="overlay">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <FaGithub className="icon github-icon" />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <FaLinkedin className="icon linkedin-icon" />
              </a>
            </div>
          </div>
          <h3 className="team-name">{member.name}</h3>
        </div>
      ))}
    </div>
  </div>

{/* service conatiner  */}
<div className="service-container">
<div className="service" id ="service">
      <h1>Our <span style={{color:"red"}}>Services</span></h1>
      <p>
        Welcome to <b> Inner peace </b> These Terms of Service govern your use of
        our website,and any related services provided by us and if you are not <b>logged in,</b> you cannot access most of the feature.
      </p>
  <h3> <img src={accept} alt="accept"className="logo-service-img" /> Acceptance of Terms</h3>
    <p>
      By accessing our website, you agree to be bound by these Terms of
      Service and all applicable laws and regulations. If you do not agree
      with any of these terms, you are prohibited from using or accessing our
      website and services.
   </p>
  <h3> <img src={personalized} alt="personalized" className="logo-service-img" /> Personalized Care</h3>
    <p>
      We offer customized treatment plans designed to support your
      individual mental health journey.
    </p>
  <h3> <img src={professional} alt="professional"className="logo-service-img" /> Qualified Therapists</h3>
    <p>
      Our experienced and licensed therapists use proven therapeutic
      approaches.
    </p>
   <h3> <img src={secure} alt="Confidential & Secure"className="logo-service-img" /> Confidential & Secure</h3>
      <p>
        Your privacy is our priority. We provide a safe, non-judgmental
        space for you to explore.
      </p>
    <h3> <img src={timelogo} alt="Therapy on your schedule"className="logo-service-img"/> Therapy on Your Schedule</h3>
      <p>
        You can prioritize your mental health without disrupting your
        routine.
      </p>
    <h3> <img src={service} alt="Therapy on your schedule"className="logo-service-img" /> Services</h3>
      <p>
        Our mental health assistant  website provides the following services to our
        customers:
      </p>
      <ul>
        <ul> <img src={accept} alt="accept"className="logo-service-imgg" /> Journal writing</ul>
        <ul><img src={accept} alt="accept"className="logo-service-imgg" /> Verify mental health conditon</ul>
        <ul><img src={accept} alt="accept"className="logo-service-imgg" /> Individual therapy</ul>
        <ul><img src={accept} alt="accept"className="logo-service-imgg" /> Personal coaching</ul>
        <ul><img src={accept} alt="accept"className="logo-service-imgg" /> secure and no leakage of your information</ul>
        <ul><img src={accept} alt="accept"className="logo-service-imgg" /> Exclusive discounts and promotions for registered users</ul>
      </ul>
    <h3> <img src={modification} alt="modification of terms"className="logo-service-img" /> Modification of Terms</h3>
      <p>
        We reserve the right to modify these Terms of Service at any time
        without prior notice. Any changes to these Terms of Service will be
        effective immediately upon posting. Your continued use of our website
        and services following the posting of changes constitutes your
        acceptance of such changes.
      </p>
    <h3> <img src={contact} alt="contact us"className="logo-service-img" /> Contact Us</h3>
      <p>
        If you have any questions about these Terms of Service, please <span className="contact-us" onClick={(e) => { e.preventDefault();  window.location.href = "/contact"; }}>contact </span> 
        us.
      </p>
    </div>
</div>


</div>

{/* footer container  */}
<Footer/>
</>
  );
};

export default Home;
