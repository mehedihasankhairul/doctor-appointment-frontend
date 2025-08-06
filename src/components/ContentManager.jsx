import { useState, useEffect } from "react";
import ContentUpload from "./ContentUpload";
import ContentDisplay from "./ContentDisplay";
import ApiTest from "./ApiTest";
import apiService from '../services/api.js';

const ContentManager = ({ isDoctor = false }) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState(isDoctor ? 'upload' : 'display');
  const [editingContent, setEditingContent] = useState(null);

  // Fetch content from API
  const fetchContent = async () => {
    try {
      setLoading(true);
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
        category: item.category,
        tags: item.tags,
        isPublished: item.is_published,
        isFeatured: item.is_featured,
        author: item.author?.full_name || 'Unknown',
        viewCount: item.view_count || 0,
        likeCount: item.like_count || 0,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedDate: item.published_date
      }));
      
      setContents(transformedContent);
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate embed URLs
  const getEmbedUrl = (url, contentType) => {
    if (contentType === 'youtube') {
      const videoId = extractYouTubeVideoId(url);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    return url;
  };

  // Extract YouTube video ID from URL
  const extractYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Load content on component mount
  useEffect(() => {
    fetchContent();
  }, []);

  const handleContentSave = async (contentData) => {
    try {
      if (editingContent) {
        // Update existing content via API
        const updatedContent = await apiService.updateContent(editingContent.id, {
          title: contentData.title,
          description: contentData.description,
          content_type: contentData.platform,
          content_url: contentData.url,
          thumbnail_url: contentData.thumbnailUrl,
          category: contentData.category,
          tags: contentData.tags,
          is_published: contentData.isPublished,
          is_featured: contentData.isFeatured
        });
        
        // Update local state with the returned data
        setContents(prev => 
          prev.map(content => 
            content.id === editingContent.id 
              ? {
                  ...contentData,
                  id: editingContent.id,
                  updatedAt: new Date().toISOString(),
                  author: content.author, // preserve author info
                  createdAt: content.createdAt,
                  viewCount: content.viewCount,
                  likeCount: content.likeCount
                }
              : content
          )
        );
        setEditingContent(null);
        
        // Show success message
        alert('Content updated successfully!');
      } else {
        // Try to create new content via API
        try {
          const newContent = await apiService.createContent({
            title: contentData.title,
            description: contentData.description,
            content_type: contentData.platform,
            content_url: contentData.url,
            thumbnail_url: contentData.thumbnailUrl,
            category: contentData.category,
            tags: contentData.tags,
            is_published: contentData.isPublished,
            is_featured: contentData.isFeatured
          });
          
          // Refresh content list
          await fetchContent();
          alert('Content created successfully!');
        } catch (createError) {
          console.error('Content creation failed:', createError);
          
          // Show user-friendly error message with guidance
          const errorMessage = `Unable to create new content at this time. 

This is a known issue with the current server configuration. 

As a workaround, you can:
1. Edit existing content using the "Manage Content" tab
2. Update any existing video by clicking the edit button
3. Contact the administrator to resolve the server issue

Would you like to go to the Manage Content tab to edit existing videos?`;
          
          if (window.confirm(errorMessage)) {
            setActiveTab('display');
          }
          return; // Don't switch tabs on error
        }
      }
      
      // Switch to display tab after saving
      setActiveTab('display');
    } catch (error) {
      console.error('Failed to save content:', error);
      
      // Show more detailed error message
      const isNetworkError = error.message?.includes('fetch');
      const errorMessage = isNetworkError 
        ? 'Network error: Please check your internet connection and try again.'
        : `Failed to save content: ${error.message || 'Unknown error occurred'}`;
      
      alert(errorMessage);
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setActiveTab('upload');
  };

  const handleDelete = async (contentId) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await apiService.deleteContent(contentId);
        setContents(prev => prev.filter(content => content.id !== contentId));
      } catch (error) {
        console.error('Failed to delete content:', error);
        alert('Failed to delete content. Please try again.');
      }
    }
  };

  const handleTogglePublish = async (contentId) => {
    try {
      const content = contents.find(c => c.id === contentId);
      if (!content) return;
      
      await apiService.updateContent(contentId, {
        is_published: !content.isPublished
      });
      
      setContents(prev => 
        prev.map(content => 
          content.id === contentId 
            ? { ...content, isPublished: !content.isPublished, updatedAt: new Date().toISOString() }
            : content
        )
      );
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      alert('Failed to update content. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingContent(null);
    setActiveTab('display');
  };

  // Filter content based on user type
  const displayContents = isDoctor ? contents : contents.filter(content => content.isPublished);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {isDoctor ? 'Content Management System' : 'Educational Content'}
          </h1>
          <p className="text-lg text-gray-600">
            {isDoctor 
              ? 'Manage and share educational content with your patients' 
              : 'Discover helpful health information and educational videos'}
          </p>
        </div>

        {/* Tab Navigation */}
        {isDoctor && (
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-md p-1">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                📤 {editingContent ? 'Edit Content' : 'Upload Content'}
              </button>
              <button
                onClick={() => setActiveTab('display')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'display'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                📋 Manage Content
              </button>
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'upload' && isDoctor && (
          <div className="max-w-4xl mx-auto">
            {editingContent && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-blue-800">Editing Content</h3>
                    <p className="text-sm text-blue-600">You are currently editing: "{editingContent.title}"</p>
                  </div>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Cancel Edit
                  </button>
                </div>
              </div>
            )}
            <ContentUpload
              onContentSave={handleContentSave}
              existingContent={editingContent}
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading content...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Content</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={fetchContent}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
            
            {/* Debug API Test */}
            <div className="mt-6">
              <ApiTest />
            </div>
          </div>
        )}

        {/* Content Display */}
        {!loading && !error && activeTab === 'display' && (
          <>
            {contents.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v11a1 1 0 001 1h4a1 1 0 001-1V6H9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Content Available</h3>
                  <p className="text-gray-600 mb-4">
                    {isDoctor 
                      ? 'You haven\'t created any content yet. Click "Upload Content" to get started.' 
                      : 'No published content is available at the moment.'}
                  </p>
                  {isDoctor && (
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Upload First Content
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <ContentDisplay
                contents={displayContents}
                onEdit={isDoctor ? handleEdit : undefined}
                onDelete={isDoctor ? handleDelete : undefined}
                onTogglePublish={isDoctor ? handleTogglePublish : undefined}
                isDoctor={isDoctor}
                loading={loading}
              />
            )}
          </>
        )}

        {/* Quick Stats for Doctor */}
        {isDoctor && activeTab === 'upload' && contents.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{contents.length}</div>
                  <div className="text-sm text-gray-600">Total Content</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {contents.filter(c => c.isPublished).length}
                  </div>
                  <div className="text-sm text-gray-600">Published</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600">
                    {contents.filter(c => c.platform === 'youtube').length}
                  </div>
                  <div className="text-sm text-gray-600">YouTube Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {contents.filter(c => c.platform === 'facebook').length}
                  </div>
                  <div className="text-sm text-gray-600">Facebook Posts</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManager;
