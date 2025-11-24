import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../../services/api';
import { useApi } from '../../hooks/useAPI';

const PostForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const navigate = useNavigate();
  const { data: categories } = useApi(() => categoryService.getAllCategories());
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featuredImage: '',
    isPublished: true,
    ...initialData
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData.tags && Array.isArray(initialData.tags)) {
      setFormData(prev => ({
        ...prev,
        tags: initialData.tags.join(', ')
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    onSubmit(submitData);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      errors.title = 'Title cannot be more than 100 characters';
    }
    
    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    
    if (formData.excerpt && formData.excerpt.length > 200) {
      errors.excerpt = 'Excerpt cannot be more than 200 characters';
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${errors.title ? '#dc3545' : '#ddd'}`,
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        {errors.title && (
          <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {errors.title}
          </span>
        )}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows="3"
          placeholder="Brief description of your post (optional)"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${errors.excerpt ? '#dc3545' : '#ddd'}`,
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        {errors.excerpt && (
          <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {errors.excerpt}
          </span>
        )}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Content *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="15"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${errors.content ? '#dc3545' : '#ddd'}`,
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        {errors.content && (
          <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {errors.content}
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.category ? '#dc3545' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          >
            <option value="">Select a category</option>
            {categories?.data?.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem' }}>
              {errors.category}
            </span>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Featured Image URL
          </label>
          <input
            type="text"
            name="featuredImage"
            value={formData.featuredImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Tags
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Separate tags with commas (tech, programming, web)"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
        />
        <label style={{ fontWeight: '600' }}>Publish immediately</label>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'flex-end',
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid #f0f0f0'
      }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Saving...' : (initialData._id ? 'Update Post' : 'Create Post')}
        </button>
      </div>
    </form>
  );
};

export default PostForm;