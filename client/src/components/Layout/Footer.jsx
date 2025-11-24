import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>MERN Blog</h3>
            <p>A modern blog application built with the MERN stack</p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Home</Link>
              <Link to="/posts" style={{ color: '#ccc', textDecoration: 'none' }}>All Posts</Link>
              <Link to="/create-post" style={{ color: '#ccc', textDecoration: 'none' }}>Write Post</Link>
            </div>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid #555', 
          paddingTop: '1rem', 
          textAlign: 'center',
          color: '#ccc'
        }}>
          <p>&copy; 2024 MERN Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;