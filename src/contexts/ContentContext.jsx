import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api.js';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch content from API
  const fetchContent = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      
      const response = await apiService.getContent();
      
      // Transform API data to match component structure
      const transformedContent = response.content.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        url: item.content_url,
        embedUrl: getEmbedUrl(item.content_url, item.content_type),
        platform: item.content_type,
        category: item.category || 'general',
        tags: item.tags || [],
        isPublished: item.is_published,
        isFeatured: item.is_featured,
        author: item.author?.full_name || 'Unknown',
        viewCount: item.view_count || 0,
        likeCount: item.like_count || 0,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedDate: item.published_date
      })).filter(item => item.isPublished); // Only published content for public view
      
      setContent(transformedContent);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch content:', err);
      if (showLoading) {
        setError('Failed to load content.');
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Helper function to generate embed URLs
  const getEmbedUrl = (url, contentType) => {
    if (contentType === 'youtube') {
      const videoId = extractYouTubeVideoId(url);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } else if (contentType === 'facebook') {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
    }
    return url;
  };

  // Extract YouTube video ID from URL
  const extractYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Refresh content (for triggering updates from other components)
  const refreshContent = () => {
    fetchContent(false); // Silent refresh
  };

  // Force refresh with loading state
  const forceRefresh = () => {
    fetchContent(true);
  };

  // Load content on mount and set up periodic refresh
  useEffect(() => {
    fetchContent();
    
    // Set up periodic refresh every 60 seconds for real-time updates
    const refreshInterval = setInterval(() => {
      fetchContent(false); // Silent refresh
    }, 60000);
    
    // Cleanup interval on unmount
    return () => clearInterval(refreshInterval);
  }, []);

  // Listen for visibility change to refresh content when user comes back to tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // User came back to the tab, refresh content
        refreshContent();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const value = {
    content,
    loading,
    error,
    lastUpdated,
    fetchContent,
    refreshContent,
    forceRefresh
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
