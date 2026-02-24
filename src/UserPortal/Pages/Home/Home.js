import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaGithub, FaLinkedin } from "react-icons/fa"; 
// some components below 
import Navbar from '../../Component/Navbar/Navbar'
import Steps from "../../Component/Steps/Steps"
import { Detail } from "../../Component/Detail/Detail";
// images below 
import rohan from '../../../assest/rohan.jpg';
import hero from '../../../assest/hero.png';
import personalized from '../../../assest/personalized.png'
import secure from '../../../assest/secure.png'
import professional from '../../../assest/professional.png'
import service from '../../../assest/schedule.png'
import accept from '../../../assest/accept.png'
import modification from '../../../assest/modification.png'
import contact from '../../../assest/contact.png'
import Footer from "../../Component/Footer/Footer";
import { useUser } from "../../UserContext";

const teamMembers = [
  {
    name: "Developer",
    // image: rohan,
    github: "",
    linkedin: "",
  },
  {
    name: "Developer",
    // image: ,
    github: "",
    linkedin: "",
  },
{
  name: "Developer",
  // image: ,
  github: "",
  linkedin: "",
},
];


const Home = () => {
  const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { setUserId } = useUser(); // Using Context for global userId management
  const role = localStorage.getItem("role");
  const getrole =()=>{
    if (role === "user") {
      navigate("/overview/dashboard");
    } else if (role === "doctor") {
      navigate("/doctor/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      alert("Role not defined. Please log in.");
    }
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
     const fetchProfileData = async () => {
       const accessToken = localStorage.getItem("accessToken");
 
       if (!accessToken) {
         setError("You must be logged in to view the profile.");
         setLoading(false);
         return;
       }
 
       try {
         const response = await fetch(
           "https://mental-health-assistant-backend.onrender.com/api/users/dashboard",
           {
             method: "GET",
             headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
             },
           }
         );
 
         if (!response.ok) {
           throw new Error(
             `Failed to fetch: ${response.status} - ${response.statusText}`
           );
         }
 
         const data = await response.json();
         if (data.status === "success") {
           setProfileData(data.data);
           localStorage.setItem("user", JSON.stringify(data.data.user)); // Save full user object to localStorage
           localStorage.setItem("userId", data.data.user.userId);
           setUserId(data.data.user.userId);
           console.log("userid:",data.data.user.userId);
           setError("");
         } else {
           throw new Error(data.message || "Failed to fetch profile data.");
         }
       } catch (err) {
         console.error("Error fetching profile data:", err.message);
         setError("Failed to load profile data. Please try again.");
       } finally {
         setLoading(false);
       }
     };
 
     fetchProfileData();
   }, [setUserId]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Post form data to Formspree endpoint
    const response = await fetch("https://formspree.io/f/xgvepzjk", {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }),
    });

    if (response.ok) {
      setStatusMessage({
        message: "Your message has been sent successfully!",
        type: "success",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatusMessage({
        message: "Something went wrong, please try again.",
        type: "error",
      });
    }
  };
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
        <button className="dashboard-button"onClick={getrole}>Visit Your Dashboard</button>

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
        If you have any questions about these Terms of Service, please <span className="contact-us">contact </span> 
        us.
      </p>
    </div>
</div>

{/* contact us container  */}
<div className="contact-container" id="contact">
      <div className="contact-page">
        <div className="contact-wrapper"> {/* New wrapper for both containers */}
          <div className="contact-form">
            <h1>Send us a <span style={{color:'red'}}>message</span></h1>
            <p>
            Let's keep the conversation going! Share your thoughts or anything else that's on your mind. A quick message is all it takes!
            </p>
            <form onSubmit={handleSubmit} method="POST">
              <div className="form-field">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="name">Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="name">Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="name">Message:</label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-button">Send Message</button>
            </form>

            {statusMessage.message && (
              <p className={`status-message ${statusMessage.type}`}>
                {statusMessage.message}
              </p>
            )}
          </div>
          <div className="contact-image">
            {/* <img
              src={showingdirec}
              alt="Contact Us"
            /> */}
          </div>
        </div>
      </div>
</div>

</div>
{/* footer container  */}
<Footer/>
</>
  );
};

export default Home;
