import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/VlogoBackGround.png';
import instagram_icon from '../Assets/instagram_icon.png';
import github_icon from '../Assets/githublogo.png';
import LinkedIn_icon from '../Assets/social-linkedinlogo.png';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="Velour Logo" />
        <p>Velour</p>
      </div>
      <ul className="footer-link">
        <li>
          <a href="https://www.linkedin.com/in/alihammoud2005/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/Alihammoud122018" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="/about" rel="noopener noreferrer">
            About Me
          </a>
        </li>
        <li>
          <a href="/contact" rel="noopener noreferrer">
            Contact
          </a>
        </li>
      </ul>
      <div className="footer-socials-icons">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com/alihammoud961/" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://github.com/Alihammoud122018" target="_blank" rel="noopener noreferrer">
            <img src={github_icon} alt="GitHub" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.linkedin.com/in/alihammoud2005/" target="_blank" rel="noopener noreferrer">
            <img src={LinkedIn_icon} alt="LinkedIn" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 All Rights Reserved</p>
      </div>
    </div>
  );
};
