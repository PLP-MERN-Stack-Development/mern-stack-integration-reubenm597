import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useAPI';
import { postService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import CommentForm from '../components/Post/CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [commentLoading, setCommentLoading] = useState(false);
  
  const { data, loading, error, refetch } = useApi(() => postService.getPost(id));

  const handleAddComment = async (content) => {
    setCommentLoading(true);
    try {
      await postService.addComment(data.data._id, { content });
      await refetch();
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(data.data._id);
        navigate('/posts');
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const post = data?.data;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <article style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          {post.featuredImage && (
            <div style={{ height: '400px', overflow: 'hidden' }}>
              <img 
                src={`/uploads/${post.featuredImage}`} 
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
          
          <header style={{ padding: '2rem', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '1rem',
              fontSize: '0.9rem',
              color: '#666',
              flexWrap: 'wrap'
            }}>
              <span style={{ 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '12px',
                fontSize: '0.8rem'
              }}>
                {post.category?.name}
              </span>
              <span>{formatDate(post.createdAt)}</span>
              <span>👁️ {post.viewCount} views</span>
            </div>
            
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.3' }}>
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
                {post.excerpt}
              </p>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ color: '#666' }}>
                By {post.author?.username}
              </div>
            </div>
          </header>

          <div style={{ padding: '2rem' }}>
            <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
            />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div style={{ padding: '0 2rem 2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ 
                  backgroundColor: '#f8f9fa',
                  color: '#666',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  border: '1px solid #e9ecef'
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <footer style={{ 
            padding: '1rem 2rem', 
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#f8f9fa'
          }}>
            {(user?.id === post.author?._id || user?.role === 'admin') && (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => navigate(`/edit-post/${post._id}`)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Edit Post
                </button>
                <button 
                  onClick={handleDeletePost}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete Post
                </button>
              </div>
            )}
          </footer>
        </article>

        <section style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>
            Comments ({post.comments?.length || 0})
          </h3>
          
          <CommentForm 
            onSubmit={handleAddComment}
            loading={commentLoading}
          />
          
          <div>
            {post.comments?.map(comment => (
              <div key={comment._id} style={{
                padding: '1rem',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <strong>{comment.user?.username}</strong>
                  <span style={{ color: '#666', fontSize: '0.8rem' }}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <div style={{ color: '#333' }}>
                  {comment.content}
                </div>
              </div>
            ))}
            
            {(!post.comments || post.comments.length === 0) && (
              <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetail;