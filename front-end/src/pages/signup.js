"use client";
import React, { useState } from 'react';
import RegisterModal from '../components/Auth/RegisterModal';
import LoginModal from '../components/Auth/LoginModal';

const Signup = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <RegisterModal isOpen={!showLogin} onClose={() => {}} onSwitchToLogin={() => setShowLogin(true)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onSwitchToRegister={() => setShowLogin(false)} />
    </>
  );
};

export default Signup; 