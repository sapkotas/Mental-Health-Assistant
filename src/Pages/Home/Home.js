import React from "react";
import "./Home.css";
import hero from "../../assest/hero.jpg"
import Navbar from "../../Component/Navbar/Navbar";
import Footer from  "../../Component/Footer/Footer"
import { useNavigate } from "react-router-dom";
import Steps from "../../Component/Steps/Steps";
import { Detail } from "../../Component/Detail/Detail";
import { Appointment } from "../../Component/Appointment/Appointment";

const Home = () => {
  const navigate = useNavigate();
  return (
<>
{/* navbar container  */}
<Navbar/> 
{/* home container */}
<div className="home-container">
      {/* Existing Hero Section */}
      <div className="text-container">
        <h1 className="main-heading">Mental Wellness Begins Here</h1>
        <p className="sub-textt">
          Discover a supportive environment where your mental health journey
          starts. We provide the tools, guidance, and care needed to nurture
          your mind, helping you achieve lasting peace and balance. Your path
          to emotional wellbeing begins with us, right here.
        </p>
        <button className="dashboard-button" onClick={() => navigate("/overview/dashboard")}>Visit your dashboard</button>
      </div>
        <div className="image-container">
        <img src={hero} alt="Mental Wellness" className="main-image" />
      </div>
</div>

{/* Why Choose Us Section */}
{/* <Choose/>       */}

{/* hero section part 2 */}
<Steps/>

{/* detail container */}
<Detail/>

{/* appointment container  */}
<Appointment/>

{/* footer container  */}
<Footer/>

</>
  );
};

export default Home;
