import React, { useState } from "react";
import './ContactUs.css'; // Import your custom CSS for styling
import Footer from "../../Component/Footer/Footer";
import Navbar from "../../Component/Navbar/Navbar";
import showingdirec from '../../assest/showingdirec.png'

const ContactUs = () => {
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
      <Navbar />
      <div className="contact-container">
      <div className="contact-page">
        <div className="contact-wrapper"> {/* New wrapper for both containers */}
          <div className="contact-form">
            <h1>Send us a message</h1>
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
            <img
              src={showingdirec}
              alt="Contact Us"
            />
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
