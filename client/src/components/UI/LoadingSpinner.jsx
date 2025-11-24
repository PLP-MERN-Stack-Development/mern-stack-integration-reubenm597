import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const spinnerStyle = {
    small: { width: '20px', height: '20px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '4px' },
    large: { width: '60px', height: '60px', borderWidth: '6px' }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: spinnerStyle[size].width,
        height: spinnerStyle[size].height,
        border: `${spinnerStyle[size].borderWidth} solid #f3f3f3`,
        borderTop: `${spinnerStyle[size].borderWidth} solid #007bff`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>
      {text && <p style={{ color: '#666', fontSize: '0.9rem' }}>{text}</p>}
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;