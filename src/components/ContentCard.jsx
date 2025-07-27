import { useState } from "react";

const ContentCard = ({ content, onEdit, onDelete, onTogglePublish, isDoctor = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: 'bg-gray-100 text-gray-800',
      education: 'bg-blue-100 text-blue-800',
      tips: 'bg-green-100 text-green-800',
      procedure: 'bg-purple-100 text-purple-800',
      testimonial: 'bg-yellow-100 text-yellow-800',
      announcement: 'bg-red-100 text-red-800'
    };
    return colors[category] || colors.general;
  };

  const getPlatformIcon = (platform) => {
    return platform === 'youtube' ? '📺' : '📘';
  };

  const getPlatformColor = (platform) => {
    return platform === 'youtube' ? 'text-red-600' : 'text-blue-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-lg ${getPlatformColor(content.platform)}`}>
                {getPlatformIcon(content.platform)}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(content.category)}`}>
                {content.category}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                content.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {content.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {content.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {isExpanded ? content.description : `${content.description.substring(0, 100)}${content.description.length > 100 ? '...' : ''}`}
            </p>
            {content.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
          
          {/* Doctor Actions */}
          {isDoctor && (
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onTogglePublish(content.id)}
                className={`p-2 rounded-full ${
                  content.isPublished 
                    ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
                title={content.isPublished ? 'Unpublish' : 'Publish'}
              >
                {content.isPublished ? '👁️‍🗨️' : '👁️'}
              </button>
              <button
                onClick={() => onEdit(content)}
                className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(content.id)}
                className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Embed */}
      <div className="aspect-video bg-gray-100">
        {content.embedUrl && (
          <iframe
            src={content.embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            title={content.title}
          />
        )}
      </div>

      {/* Footer */}
      <div className="p-4">
        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {content.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Metadata */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            <span>Created: {formatDate(content.createdAt)}</span>
          </div>
          {content.updatedAt && content.updatedAt !== content.createdAt && (
            <div>
              <span>Updated: {formatDate(content.updatedAt)}</span>
            </div>
          )}
        </div>

        {/* External Link */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            <span className="mr-1">🔗</span>
            View on {content.platform === 'youtube' ? 'YouTube' : 'Facebook'}
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
