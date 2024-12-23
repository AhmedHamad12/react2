// src/components/HeroSection.jsx
import React , { useState } from 'react';
import RegisterForm from '../auth/rigsterform';

const HeroSection = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleShowRegister = () => setShowRegisterModal(true);
  const handleCloseRegister = () => setShowRegisterModal(false);
  return (
    <>
    <section className="hero-section">
      <div className="hero-content">
        <p className="subheading">Summer Sales</p>
        <h3>People in Fashionable Sportswear</h3>
        <button className="shop-now-button"  onClick={handleShowRegister}>Shop Now</button>
      </div>
      <div className="hero-image">
        <img src="src\assets\Rectangle 3.svg" alt="People in Fashionable Sportswear" />
      </div>
    </section>
    <RegisterForm showModal={showRegisterModal} handleClose={handleCloseRegister} />
    </>
  );
  
};

export default HeroSection;
