import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const ProfileView = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data.</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.full_name}</p>
      {user.profile_completion !== undefined && (
        <p><strong>Completion:</strong> {user.profile_completion}%</p>
      )}
    </div>
  );
};

export default ProfileView; 