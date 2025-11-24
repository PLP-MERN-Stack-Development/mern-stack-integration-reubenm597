import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Welcome to MERN Blog
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Discover amazing stories, technical insights, and creative ideas from our community.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/posts" className="btn btn-primary btn-large">
              Explore Posts
            </Link>
            <Link to="/create-post" className="btn btn-secondary btn-large">
              Write a Post
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
            Why Choose Our Blog?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>📝 Easy Writing</h3>
              <p>Create and publish your posts with our intuitive editor.</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>👥 Community</h3>
              <p>Engage with other writers and readers through comments.</p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>🔍 Discover</h3>
              <p>Find content that matters to you with powerful search.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#333', color: 'white', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Ready to Share Your Story?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Join our community of writers and start publishing today.
          </p>
          <Link to="/register" className="btn btn-primary btn-large">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;