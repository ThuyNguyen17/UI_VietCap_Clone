import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const ProfileStatus = () => {
  const { user, loading } = useAuth();
  if (loading || !user) return null;
  const percent = user.profile_completion || 0;
  return (
    <div>
      <label>Profile Completion:</label>
      <div style={{ background: '#eee', borderRadius: 4, height: 16, width: 200 }}>
        <div style={{ background: '#4caf50', width: `${percent}%`, height: '100%', borderRadius: 4 }} />
      </div>
      <span>{percent}%</span>
    </div>
  );
};

export default ProfileStatus; 