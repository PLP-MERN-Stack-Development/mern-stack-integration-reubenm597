import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/api';
import PostForm from '../components/Post/PostForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (postData) => {
    setLoading(true);
    setError('');
    
    try {
      await postService.createPost(postData);
      navigate('/posts');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>Create New Post</h1>
          <p style={{ color: '#666' }}>Share your thoughts and ideas with the community</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '2rem',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <PostForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreatePost;