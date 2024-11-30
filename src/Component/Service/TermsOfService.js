import React, { useState } from "react";
import "./TermsOfService.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import personalized from '../../assest/personalized.png'
import secure from '../../assest/secure.png'
import professional from '../../assest/professional.png'
import schedule from '../../assest/schedule.png'
import accept from '../../assest/accept.png'


  const faqData = [
    {
        question: 'What is personalized care?',
        answer: 'Personalized care involves customized treatment plans tailored to your unique mental health needs. Our approach ensures that you receive the most effective and supportive care on your mental health journey.',
      },
      {
        question: 'What are the qualifications of your therapists?',
        answer: 'Our therapists are experienced and licensed professionals who use evidence-based therapeutic approaches to help you achieve emotional well-being. They are trained in various methods to address a wide range of mental health concerns.',
      },
      {
        question: 'How do I schedule therapy sessions?',
        answer: 'We offer flexible scheduling to ensure you can prioritize your mental health without disrupting your routine. You can book sessions online at times that work best for you.',
      },
      {
        question: 'What services do you offer?',
        answer: 'We provide a variety of mental health services including: journal writing, mental health condition verification, individual therapy, personal coaching, and more. We focus on offering support tailored to your needs.',
      },
      {
        question: 'How is my personal information protected?',
        answer: 'We take your privacy seriously. Our platform uses the highest standards of encryption and security protocols to ensure your personal and sensitive information is kept safe from unauthorized access or leakage.',
      },
      {
        question: 'Do you offer discounts for registered users?',
        answer: 'Yes, registered users can access exclusive discounts and promotions. Be sure to sign up and receive notifications on the latest deals and offers tailored just for you!',
      },
  ];
  




const TermsOfService = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
    <Navbar/>
    <div className="terms-of-service">
      <h1>Terms of Service</h1>
      <p>
        Welcome to <b> Inner peace </b> These Terms of Service govern your use of
        our website,and any related services provided
        by us.
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
    <h3> <img src={schedule} alt="Therapy on your schedule"className="logo-service-img" /> Therapy on Your Schedule</h3>
      <p>
        You can prioritize your mental health without disrupting your
        routine.
      </p>
    <h3>Services</h3>
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
    <h3>7. Modification of Terms</h3>
      <p>
        We reserve the right to modify these Terms of Service at any time
        without prior notice. Any changes to these Terms of Service will be
        effective immediately upon posting. Your continued use of our website
        and services following the posting of changes constitutes your
        acceptance of such changes.
      </p>
    <h3>8. Contact Us</h3>
      <p>
        If you have any questions about these Terms of Service, please contact
        us.
      </p>
    </div>

<div className="faq">
<h1>Frequently Asked Questions</h1>
<div className="faq-list">
  {faqData.map((item, index) => (
    <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
      <div className="faq-question" onClick={() => toggleQuestion(index)}>
        <h3>{item.question}</h3>
        <span>{activeIndex === index ? '-' : '+'}</span>
      </div>
      <div className="faq-answer" style={{ display: activeIndex === index ? 'block' : 'none' }}>
        <p>{item.answer}</p>
      </div>
    </div>
  ))}
</div>
</div>
<Footer/>
</>
  );
};

export default TermsOfService;
