import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';

const OtpVerification = ({ email, onSuccess }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { verifyEmailOtp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await verifyEmailOtp(email, otp);
      if (res.success) {
        if (onSuccess) onSuccess();
      } else {
        setError(res.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Verification failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enter OTP sent to {email}</h3>
      <input
        type="text"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
      />
      <button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default OtpVerification; 