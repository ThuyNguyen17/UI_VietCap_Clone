import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import { BsPerson, BsEnvelope, BsPhone } from 'react-icons/bs';
import '../../assets/css/AuthModal.css';
import {authService } from '../../services/authService';
import OtpVerification from './OtpVerification';
import { tokenStorage } from '../../services/storage';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState('register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      const res = await authService.register({
        email: formData.email,
        password: formData.password,
        full_name: formData.name
      });
      if (res.user_id) {
        await authService.sendOtp(formData.email);
        setShowOtp(true);
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      setError('Registration error');
    }
    setLoading(false);
  };

  const handleOtpSuccess = () => {
    setError('Registration successful! Please login.');
    setTimeout(() => {
      setShowOtp(false);
      onSwitchToLogin();
    }, 1500);
  };

  const handleClose = () => {
    setStep('register');
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
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
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="modal-close" 
            onClick={handleClose} 
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>

          <div className="modal-header">
            <h2 id="modal-title">{showOtp ? 'Verify OTP' : 'Create Account'}</h2>
            <p className="modal-subtitle">
              {showOtp
                ? `Enter the OTP sent to ${formData.email}`
                : 'Join our platform today'}
            </p>
          </div>

          {error && (
            <div className={`message ${error.includes('successful') ? 'success-message' : 'error-message'}`}>
              {error}
            </div>
          )}

          {showOtp ? (
            <OtpVerification email={formData.email} onSuccess={handleOtpSuccess} />
          ) : (
            <form onSubmit={handleRegister} className="auth-form" noValidate>
              <div className="form-group">
                <div className="input-with-icon">
                  <BsPerson className="input-icon" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    aria-label="Full Name"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-with-icon">
                  <BsEnvelope className="input-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    aria-label="Email Address"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-with-icon">
                  <BsPhone className="input-icon" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    aria-label="Phone Number"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-with-icon">
                  <RiShieldKeyholeLine className="input-icon" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    aria-label="Password"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-with-icon">
                  <RiShieldKeyholeLine className="input-icon" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                    aria-label="Confirm Password"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
                aria-label="Register"
              >
                {loading ? 'Processing...' : 'Register'}
              </button>
              <div className="divider">
                <span className="divider-line"></span>
                <span className="divider-text">Or continue with</span>
                <span className="divider-line"></span>
              </div>
              <div className="social-login">
                <button 
                  type="button" 
                  className="social-btn google"
                  aria-label="Sign up with Google"
                >
                  <FcGoogle className="social-icon" />
                  <span>Google</span>
                </button>
              </div>
            </form>
          )}
          <div className="modal-footer">
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                className="link-button"
                onClick={onSwitchToLogin}
                aria-label="Switch to Login"
              >
                Login Now
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default RegisterModal;