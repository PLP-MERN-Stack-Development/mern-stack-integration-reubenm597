import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/posts?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <Link to="/" style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#007bff',
            textDecoration: 'none'
          }}>
            MERN Blog
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</Link>
            <Link to="/posts" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>All Posts</Link>
            
            {user && (
              <Link to="/create-post" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                Write Post
              </Link>
            )}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '25px',
                  marginRight: '0.5rem',
                  width: '200px'
                }}
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#666' }}>Hello, {user.username}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;