import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';

const ProfileEdit = () => {
  const { user, token, setUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await authService.updateProfile({ full_name: fullName }, token);
      setUser({ ...user, full_name: fullName });
      setMessage('Profile updated!');
    } catch (err) {
      setError(err.message || 'Update failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default ProfileEdit; 