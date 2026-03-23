import React, { useState } from 'react';
import LoginModal from '../components/Auth/LoginModal';
import RegisterModal from '../components/Auth/RegisterModal';

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <LoginModal isOpen={!showRegister} onClose={() => {}} onSwitchToRegister={() => setShowRegister(true)} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} onSwitchToLogin={() => setShowRegister(false)} />
    </>
  );
};

export default LoginPage; 