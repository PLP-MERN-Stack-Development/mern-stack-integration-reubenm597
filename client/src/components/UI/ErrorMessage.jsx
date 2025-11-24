import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      margin: '2rem 0'
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
      <p style={{ color: '#dc3545', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;