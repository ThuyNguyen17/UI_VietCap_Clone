import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';
import '../../assets/css/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsRegisterModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-logo">
          <Link to="/">Stock AI</Link>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/market" className={location.pathname === '/market' ? 'active' : ''}>Market</Link></li>
          <li><Link to="/trade" className={location.pathname === '/trade' ? 'active' : ''}>Trade</Link></li>
          <li><Link to="/learn" className={location.pathname === '/learn' ? 'active' : ''}>Learn</Link></li>
          <li>
            <button 
              onClick={handleLoginClick}
              className={`nav-button ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </button>
          </li>
          <li>
            <button 
              onClick={handleRegisterClick}
              className={`nav-button ${location.pathname === '/signup' ? 'active' : ''}`}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onSwitchToRegister={handleSwitchToRegister}
      />

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Navbar;
