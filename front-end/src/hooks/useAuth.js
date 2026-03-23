import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { tokenStorage } from '../services/storage';

// ✅ Create context
const AuthContext = createContext();

// ✅ Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(tokenStorage.getToken());
  const [loading, setLoading] = useState(true);

  // ✅ Lấy thông tin người dùng khi có token
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          const data = await authService.getMe();
          setUser({
            ...data,
            displayName: data.full_name || data.email,
          });
        } catch {
          setUser(null);
          tokenStorage.removeToken();
          setToken(null);
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, [token]);

  // ✅ Login thường
  const login = async (credentials) => {
    const res = await authService.login(credentials);
    if (res.access_token) {
      tokenStorage.setToken(res.access_token);
      setToken(res.access_token);
      if (res.user) {
        setUser({
          ...res.user,
          displayName: res.user.full_name || res.user.email,
        });
      }
      return { success: true };
    }
    return res;
  };

  // ✅ Register
  const register = async (data) => {
    return await authService.register(data);
  };

  // ✅ Logout
  const logout = () => {
    tokenStorage.removeToken();
    setToken(null);
    setUser(null);
  };

  // ✅ Xác thực OTP email khi đăng ký
  const verifyEmailOtp = async (email, otp) => {
    const res = await authService.verifyEmail({ email, otp });
    if (res.access_token) {
      tokenStorage.setToken(res.access_token);
      setToken(res.access_token);
      return { success: true };
    }
    return res;
  };

  // ✅ Gửi lại OTP xác thực
  const resendVerificationOtp = async (email) => {
    return await authService.resendVerification(email);
  };

  // ✅ Gửi OTP đăng nhập
  const sendLoginOtp = async (email) => {
    return await authService.sendLoginOtp(email);
  };

  // ✅ Xác thực OTP đăng nhập
  const verifyLoginOtp = async (email, otp) => {
    const res = await authService.verifyLoginOtp({ email, otp });
    if (res.access_token) {
      tokenStorage.setToken(res.access_token);
      setToken(res.access_token);
      return { success: true };
    }
    return res;
  };

  // ✅ Gửi lại OTP đăng nhập
  const resendLoginOtp = async (email) => {
    return await authService.resendLoginOtp(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        register,
        verifyEmailOtp,
        resendVerificationOtp,
        sendLoginOtp,
        verifyLoginOtp,
        resendLoginOtp,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook để dùng ở bất kỳ đâu
export function useAuth() {
  return useContext(AuthContext);
}
