import axios from 'axios';

// Tạo instance axios với base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn, logout user
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Gửi OTP
  sendOTP: async (email, type = 'login') => {
    try {
      const response = await api.post('/api/auth/send-otp', { email, type });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send OTP' };
    }
  },

  // Xác thực OTP
  verifyOTP: async (email, otp, type = 'login') => {
    try {
      const response = await api.post('/api/auth/verify-otp', { email, otp, type });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to verify OTP' };
    }
  },

  // Đăng nhập thông thường (nếu cần)
  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Đăng ký với OTP verification
  register: async (userData, verifiedOTP = null) => {
    try {
      const requestData = { ...userData };
      if (verifiedOTP) {
        requestData.verified_otp = verifiedOTP;
      }
      const response = await api.post('/api/auth/register', requestData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Gửi lại OTP
  resendOTP: async (email, type = 'login') => {
    try {
      const response = await api.post('/api/auth/resend-otp', { email, type });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to resend OTP' };
    }
  },
};

export default api; 