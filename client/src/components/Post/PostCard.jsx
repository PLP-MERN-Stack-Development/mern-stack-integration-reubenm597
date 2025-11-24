import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      {post.featuredImage && (
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img 
            src={`/uploads/${post.featuredImage}`} 
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      
      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '1rem',
          fontSize: '0.8rem',
          color: '#666'
        }}>
          <span style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '2px 8px', 
            borderRadius: '12px',
            fontSize: '0.7rem'
          }}>
            {post.category?.name}
          </span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
        
        <h3 style={{ marginBottom: '1rem' }}>
          <Link to={`/posts/${post.slug}`} style={{ 
            textDecoration: 'none', 
            color: '#333',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>
            {post.title}
          </Link>
        </h3>
        
        {post.excerpt && (
          <p style={{ 
            color: '#666', 
            fontStyle: 'italic',
            marginBottom: '1rem'
          }}>
            {post.excerpt}
          </p>
        )}
        
        <p style={{ color: '#555', marginBottom: '1rem', lineHeight: '1.6' }}>
          {truncateContent(post.content)}
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #f0f0f0',
          fontSize: '0.8rem',
          color: '#666'
        }}>
          <div>By {post.author?.username}</div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>👁️ {post.viewCount} views</span>
            <span>💬 {post.comments?.length || 0} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;