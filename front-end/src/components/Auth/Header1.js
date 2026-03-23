import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ onLogin, onRegister }) => {
  const { user, logout, token } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#222', color: '#fff' }}>
      <h1>StockVision</h1>
      <nav>
        {token && user ? (
          <>
            <span style={{ marginRight: 16 }}>Welcome, {user.email}</span>
            <button onClick={logout} style={{ background: '#fff', color: '#222', border: 'none', padding: '6px 12px', borderRadius: 4 }}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={onLogin} style={{ marginRight: 8, background: '#fff', color: '#222', border: 'none', padding: '6px 12px', borderRadius: 4 }}>Login</button>
            <button onClick={onRegister} style={{ background: '#fff', color: '#222', border: 'none', padding: '6px 12px', borderRadius: 4 }}>Register</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header; 