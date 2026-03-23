import api from './api';

// Auth API
export const authService = {
  register: async ({ email, password, full_name }) => {
    const res = await api.post('/api/auth/register', { email, password, full_name });
    return res.data;
  },

  login: async ({ email, password }) => {
    const res = await api.post('/api/auth/login', { email, password });
    return res.data;
  },

  sendOtp: async (email) => {
    const res = await api.post('/api/auth/otp/send', { email });
    return res.data;
  },

  verifyEmail: async ({ email, otp }) => {
    const res = await api.post('/api/auth/verify-email', { email, otp });
    return res.data;
  },

  resendVerification: async (email) => {
    const res = await api.post('/api/auth/resend-verification', { email });
    return res.data;
  },

  sendLoginOtp: async (email) => {
    const res = await api.post('/api/auth/otp/send', { email });
    return res.data;
  },

  verifyLoginOtp: async ({ email, otp }) => {
    const res = await api.post('/api/auth/otp/verify', { email, otp });
    return res.data;
  },

  resendLoginOtp: async (email) => {
    const res = await api.post('/api/auth/otp/resend', { email });
    return res.data;
  },

  getMe: async () => {
    const res = await api.get('/api/users/me');
    return res.data;
  },
};

// User profile API
export const userService = {
  getMe: async () => {
    const res = await api.get('/api/users/me');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await api.put('/api/profile', data);
    return res.data;
  }
};
