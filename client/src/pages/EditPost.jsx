import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useAPI';
import { postService } from '../services/api';
import PostForm from '../components/Post/PostForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { data, loading: postLoading, error: postError } = useApi(
    () => postService.getPost(id)
  );

  const handleSubmit = async (postData) => {
    setLoading(true);
    setError('');
    
    try {
      await postService.updatePost(data.data._id, postData);
      navigate(`/posts/${data.data.slug}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (postLoading) return <LoadingSpinner />;
  if (postError) return <ErrorMessage message={postError} />;

  if (user?.id !== data?.data?.author?._id && user?.role !== 'admin') {
    return <ErrorMessage message="You are not authorized to edit this post" />;
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>Edit Post</h1>
          <p style={{ color: '#666' }}>Update your post content and information</p>
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
          initialData={data?.data}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditPost;