import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">◉ nutri<em>scan</em></span>
            <p className="footer-tagline">AI-powered nutrition tracking</p>
          </div>
          
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#privacy">Privacy</a>
            <a href="https://github.com/masifmuhammad" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          
          <div className="footer-credit">
            <p>Built by <a href="https://github.com/masifmuhammad" target="_blank" rel="noopener noreferrer">Masif Muhammad</a></p>
            <p className="footer-tech">React • Node.js • TensorFlow.js</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

