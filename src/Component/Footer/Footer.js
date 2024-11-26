import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Logo and Newsletter Section */}
        <div className="footer-newsletter">
          <h2 className="footer-logo">Inner Peace</h2>
          <p>Join Our Newsletter</p>
          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="newsletter-input"
            />
            <button className="newsletter-btn">
              <i className="fa fa-envelope"></i> Sign Up
            </button>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              <li>Individual Therapy</li>
              <li>Group Counseling</li>
              <li>Mindfulness & Meditation</li>
              <li>Stress Management</li>
              <li>Relationship Counseling</li>
              <li>Anxiety & Depression</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Quick Link</h3>
            <ul>
              <li>Mental Health Resources</li>
              <li>Support Groups</li>
              <li>Crisis Hotline</li>
              <li>Self-Care Tips</li>
              <li>Therapist Directory</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Leadership</li>
              <li>Careers</li>
              <li>Partner</li>
              <li>Legal Notice</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li>Help Center</li>
              <li>FAQ</li>
              <li>Contact Us</li>
              <li>Community</li>
              <li>Customer Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>
          Copyright © 2024 InnerPeace, All rights reserved. Powered by
          MoxCreative.
        </p>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin-in"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
