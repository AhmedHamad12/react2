import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="left">
      <div className="logo">Corefit</div>
        <p>Dummy text about the brand.</p>
      </div>
      <div className="center">
        <h3>Contact Us</h3>
        <p>Phone: +18 245 756 6552 56853</p>
        <p>Email: Corefit@example.com</p>
        <div className="socials" id="test">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} className="social-icon" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} className="social-icon" />
      </a>
      <a href="mailto:example@gmail.com">
        <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
      </a>
    </div>
      </div>
      <div className="right">
        <h3>Services</h3>
        <p>Dummy text for services.</p>
      </div>
    </footer>
  );
};

export default Footer;

