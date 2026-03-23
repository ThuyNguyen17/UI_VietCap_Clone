import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { authService } from '../../services/authService';
import OtpVerification from './OtpVerification';
import { tokenStorage } from '../../services/storage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/css/AuthModal.css';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email || !password) {
      setError('Please enter email and password');
      setLoading(false);
      return;
    }
    try {
      const res = await login({ email, password });
      if (res.success) {
        onClose();
        navigate('/home');
      } else if (res.requires_verification) {
        await authService.sendOtp(email);
        setShowOtp(true);
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError('Login error');
    }
    setLoading(false);
  };

  const handleOtpSuccess = () => {
    onClose();
    navigate('/home');
  };

  const handleClose = () => {
    setStep('login');
    setEmail('');
    setPassword('');
    setError('');
    setShowOtp(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={handleClose}>
            <IoClose size={24} />
          </button>
          <div className="modal-header">
            <h2>{showOtp ? 'Verify OTP' : 'Login'}</h2>
            <p className="modal-subtitle">
              {showOtp
                ? `Enter the OTP sent to ${email}`
                : 'Login to access the system'}
            </p>
          </div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          {showOtp ? (
            <OtpVerification email={email} onSuccess={handleOtpSuccess} />
          ) : (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="auth-button primary"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Login'}
              </button>
            </form>
          )}
          <div className="modal-footer">
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                className="link-button"
                onClick={onSwitchToRegister}
              >
                Register now
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default LoginModal; 