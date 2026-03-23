// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Gửi OTP thông qua API
  const sendOTP = async (email, type = 'login') => {
    try {
      const response = await authAPI.sendOTP(email, type);
      return { 
        success: true, 
        message: response.message || 'OTP sent successfully',
        expiresIn: response.expires_in_minutes
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { 
        success: false, 
        message: error.detail || error.message || 'Failed to send OTP' 
      };
    }
  };

  // Xác thực OTP thông qua API
  const verifyOTP = async (email, otp, type = 'login') => {
    try {
      const response = await authAPI.verifyOTP(email, otp, type);
      
      // Nếu OTP hợp lệ và type là login, lưu token và thông tin user
      if (type === 'login' && response.access_token) {
        const userData = {
          email: response.user.email,
          full_name: response.user.full_name,
          token: response.access_token
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.access_token);
        
        return { 
          success: true, 
          message: 'OTP verified successfully',
          user: userData
        };
      }
      
      // Nếu type là register, chỉ verify OTP mà không login
      return { success: true, message: 'OTP verified successfully' };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { 
        success: false, 
        message: error.detail || error.message || 'Failed to verify OTP' 
      };
    }
  };

  // Đăng nhập thông thường (nếu cần)
  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.access_token) {
        const userData = {
          email: response.user.email,
          full_name: response.user.full_name,
          token: response.access_token
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.access_token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Đăng ký với OTP verification
  const register = async (userData, verifiedOTP = null) => {
    try {
      const response = await authAPI.register(userData, verifiedOTP);
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.detail || error.message || 'Registration failed' 
      };
    }
  };

  // Gửi lại OTP
  const resendOTP = async (email, type = 'login') => {
    try {
      const response = await authAPI.resendOTP(email, type);
      return { 
        success: true, 
        message: response.message || 'OTP resent successfully',
        expiresIn: response.expires_in_minutes
      };
    } catch (error) {
      console.error('Error resending OTP:', error);
      return { 
        success: false, 
        message: error.detail || error.message || 'Failed to resend OTP' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register,
      sendOTP,
      verifyOTP,
      resendOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
