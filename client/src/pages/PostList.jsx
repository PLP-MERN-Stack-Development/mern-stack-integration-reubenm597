import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApi } from '../hooks/useAPI';
import { postService, categoryService } from '../services/api';
import PostCard from '../components/Post/PostCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  const { data: categories } = useApi(() => categoryService.getAllCategories());
  
  const { data, loading, error } = useApi(
    () => {
      if (searchQuery) {
        return postService.searchPosts(searchQuery);
      }
      return postService.getAllPosts(page, 9, category);
    },
    [page, category, searchQuery]
  );

  useEffect(() => {
    const currentCategory = searchParams.get('category');
    const currentSearch = searchParams.get('search');
    
    if (currentCategory) setCategory(currentCategory);
    if (currentSearch) setSearchQuery(currentSearch);
  }, [searchParams]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setSearchQuery('');
    setSearchParams(newCategory ? { category: newCategory } : {});
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setCategory('');
    setSearchParams(query ? { search: query } : {});
  };

  const clearFilters = () => {
    setCategory('');
    setSearchQuery('');
    setPage(1);
    setSearchParams({});
  };

  const totalPages = data?.pagination?.pages || 1;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             category ? `Category: ${categories?.data?.find(c => c.slug === category)?.name || category}` : 
             'All Posts'}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            Discover the latest stories and insights from our community
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleCategoryChange('')}
              style={{
                padding: '0.5rem 1rem',
                border: `1px solid ${!category ? '#007bff' : '#ddd'}`,
                backgroundColor: !category ? '#007bff' : 'white',
                color: !category ? 'white' : '#333',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              All
            </button>
            {categories?.data?.map(cat => (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat.slug)}
                style={{
                  padding: '0.5rem 1rem',
                  border: `1px solid ${category === cat.slug ? '#007bff' : '#ddd'}`,
                  backgroundColor: category === cat.slug ? '#007bff' : 'white',
                  color: category === cat.slug ? 'white' : '#333',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                width: '250px'
              }}
            />
            {(category || searchQuery) && (
              <button onClick={clearFilters} style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {data?.data?.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {data?.data?.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ marginBottom: '1rem' }}>No posts found</h3>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                  Try adjusting your search or filters
                </p>
                <button onClick={clearFilters} style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Clear Filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '3rem',
                padding: '1rem'
              }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    opacity: page === 1 ? 0.5 : 1
                  }}
                >
                  Previous
                </button>
                
                <span style={{ color: '#666', fontWeight: '500' }}>
                  Page {page} of {totalPages}
                </span>
                
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    cursor: page === totalPages ? 'not-allowed' : 'pointer',
                    opacity: page === totalPages ? 0.5 : 1
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostList;