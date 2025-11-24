import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const CommentForm = ({ onSubmit, loading = false }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    if (!user) {
      setError('You must be logged in to comment');
      return;
    }

    onSubmit(content);
    setContent('');
    setError('');
  };

  if (!user) {
    return (
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '4px',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <p>Please <a href="/login" style={{ color: '#007bff' }}>login</a> to leave a comment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Add a Comment
        </label>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
          rows="4"
          placeholder="Share your thoughts..."
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${error ? '#dc3545' : '#ddd'}`,
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        {error && (
          <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {error}
          </span>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={loading || !content.trim()}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: (loading || !content.trim()) ? 0.6 : 1
        }}
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;