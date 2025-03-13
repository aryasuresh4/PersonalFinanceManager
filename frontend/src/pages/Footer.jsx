import React from "react";
import '../Styles/Footer.css'; // Import the CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We help you track, budget, and save money with ease. Manage your expenses like a pro.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@Spendly.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        {/* Social Media */}
        {/* <div className="social">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
        </div> */}

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 Spendly. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
