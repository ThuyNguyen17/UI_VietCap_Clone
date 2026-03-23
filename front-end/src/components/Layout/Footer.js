import React from 'react';
import '../../assets/css/Footer.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>StockAI</h3>
            <p>Advanced AI technology for smart investors</p>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaEnvelope /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/chart">Chart</Link></li>
              <li><Link to="/team">Experts</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contact</h4>
            <p><FaEnvelope /> info@stockai.com</p>
            <p>123 Finance Street, District 1, Ho Chi Minh City</p>
            
            <div className="newsletter">
              <h4>Subscribe to our newsletter</h4>
              <form>
                <input type="email" placeholder="Your email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} StockAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
