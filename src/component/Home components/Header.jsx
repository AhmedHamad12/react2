import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from '../auth/rigsterform';
import LoginForm from '../auth/LoginForm';
import BackArrow from '../icons/Arrow';

const Header = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleShowRegister = () => setShowRegisterModal(true);
  const handleCloseRegister = () => setShowRegisterModal(false);

  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <>
      <header>
        <div className="inner-header">
          <div className="logo">Corefit</div>
          <nav>
            {location.pathname === '/' ? (
              <>
                <button className="login-button" onClick={handleShowLogin}>Login</button>
                <button className="register-button" onClick={handleShowRegister}>Register Now</button>
              </>
            ) : (
              <>
              <button className="logout-button" onClick={handleLogout}>Log Out</button>
              <a href="/home"><BackArrow/></a>
              </>
            )}
          </nav>
        </div>
      </header>

      <RegisterForm showModal={showRegisterModal} handleClose={handleCloseRegister} />
      <LoginForm showModal={showLoginModal} handleClose={handleCloseLogin} />
    </>
  );
};

export default Header;
