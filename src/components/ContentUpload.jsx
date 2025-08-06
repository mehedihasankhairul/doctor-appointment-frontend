import { useState } from "react";

const ContentUpload = ({ onContentSave, existingContent = null }) => {
  const [contentData, setContentData] = useState({
    title: existingContent?.title || '',
    url: existingContent?.url || '',
    description: existingContent?.description || '',
    platform: existingContent?.platform || 'youtube',
    category: existingContent?.category || 'general',
    tags: existingContent?.tags || [],
    isPublished: existingContent?.isPublished || false
  });

  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const validateFacebookUrl = (url) => {
    const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/;
    return facebookRegex.test(url);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  const getFacebookEmbedUrl = (url) => {
    if (!url) return '';
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !contentData.tags.includes(newTag.trim())) {
      setContentData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setContentData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!contentData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!contentData.url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      if (contentData.platform === 'youtube' && !validateYouTubeUrl(contentData.url)) {
        newErrors.url = 'Please enter a valid YouTube URL';
      } else if (contentData.platform === 'facebook' && !validateFacebookUrl(contentData.url)) {
        newErrors.url = 'Please enter a valid Facebook URL';
      }
    }

    if (!contentData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const embedUrl = contentData.platform === 'youtube' 
        ? getYouTubeEmbedUrl(contentData.url)
        : getFacebookEmbedUrl(contentData.url);

      const contentToSave = {
        ...contentData,
        embedUrl,
        id: existingContent?.id || Date.now().toString(),
        createdAt: existingContent?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await onContentSave(contentToSave);
      
      // Reset form if creating new content
      if (!existingContent) {
        setContentData({
          title: '',
          url: '',
          description: '',
          platform: 'youtube',
          category: 'general',
          tags: [],
          isPublished: false
        });
      }
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {existingContent ? 'Edit Content' : 'Upload New Content'}
      </h2>
      
      {/* Information notice for new content uploads */}
      {!existingContent && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Creating New Content</h3>
              <div className="mt-1 text-sm text-amber-700">
                <p>Please note: Due to current server limitations, creating brand new content may not work reliably.</p>
                <p className="mt-1">For best results, consider editing existing content instead using the "Manage Content" tab.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={contentData.title}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter content title..."
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="platform"
                value="youtube"
                checked={contentData.platform === 'youtube'}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-red-600">📺 YouTube</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="platform"
                value="facebook"
                checked={contentData.platform === 'facebook'}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-blue-600">📘 Facebook</span>
            </label>
          </div>
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {contentData.platform === 'youtube' ? 'YouTube URL' : 'Facebook URL'} *
          </label>
          <input
            type="url"
            name="url"
            value={contentData.url}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.url ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={contentData.platform === 'youtube' 
              ? 'https://www.youtube.com/watch?v=...' 
              : 'https://www.facebook.com/...'}
          />
          {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={contentData.description}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your content..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={contentData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="general">General</option>
            <option value="education">Education</option>
            <option value="tips">Health Tips</option>
            <option value="procedure">Procedures</option>
            <option value="testimonial">Testimonials</option>
            <option value="announcement">Announcements</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {contentData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add tag..."
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>

        {/* Published Status */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isPublished"
              checked={contentData.isPublished}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Publish immediately
            </span>
          </label>
        </div>

        {/* Preview */}
        {contentData.url && (contentData.platform === 'youtube' ? validateYouTubeUrl(contentData.url) : validateFacebookUrl(contentData.url)) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                {contentData.platform === 'youtube' ? (
                  <iframe
                    src={getYouTubeEmbedUrl(contentData.url)}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                    title="YouTube Preview"
                  />
                ) : (
                  <iframe
                    src={getFacebookEmbedUrl(contentData.url)}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                    title="Facebook Preview"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? 'Saving...' : existingContent ? 'Update Content' : 'Save Content'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentUpload;
