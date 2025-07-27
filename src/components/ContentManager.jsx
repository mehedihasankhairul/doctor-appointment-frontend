import { useState } from "react";
import ContentUpload from "./ContentUpload";
import ContentDisplay from "./ContentDisplay";

const ContentManager = ({ isDoctor = false }) => {
  const [contents, setContents] = useState([
    // Sample content for demonstration
    {
      id: "1",
      title: "Understanding Heart Disease Prevention",
      description: "Learn about the key factors that contribute to heart disease and how you can prevent them through lifestyle changes and regular check-ups.",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      platform: "youtube",
      category: "education",
      tags: ["heart", "prevention", "health", "lifestyle"],
      isPublished: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "2",
      title: "Patient Success Story - Recovery Journey",
      description: "Watch how our patient recovered from a major cardiac procedure and returned to an active lifestyle with our comprehensive care program.",
      url: "https://www.facebook.com/watch/video/123456789",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2Fvideo%2F123456789&show_text=0&width=560",
      platform: "facebook",
      category: "testimonial",
      tags: ["recovery", "success", "patient", "cardiac"],
      isPublished: true,
      createdAt: "2024-01-10T14:30:00Z",
      updatedAt: "2024-01-10T14:30:00Z"
    },
    {
      id: "3",
      title: "5 Daily Tips for Heart Health",
      description: "Simple daily habits that can significantly improve your cardiovascular health. Easy to follow tips that you can start implementing today.",
      url: "https://www.youtube.com/watch?v=example123",
      embedUrl: "https://www.youtube.com/embed/example123",
      platform: "youtube",
      category: "tips",
      tags: ["daily", "tips", "heart", "health", "lifestyle"],
      isPublished: false,
      createdAt: "2024-01-05T09:15:00Z",
      updatedAt: "2024-01-05T09:15:00Z"
    }
  ]);

  const [activeTab, setActiveTab] = useState(isDoctor ? 'upload' : 'display');
  const [editingContent, setEditingContent] = useState(null);

  const handleContentSave = (contentData) => {
    if (editingContent) {
      // Update existing content
      setContents(prev => 
        prev.map(content => 
          content.id === editingContent.id 
            ? { ...contentData, id: editingContent.id }
            : content
        )
      );
      setEditingContent(null);
    } else {
      // Add new content
      setContents(prev => [...prev, contentData]);
    }
    
    // Switch to display tab after saving
    setActiveTab('display');
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setActiveTab('upload');
  };

  const handleDelete = (contentId) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContents(prev => prev.filter(content => content.id !== contentId));
    }
  };

  const handleTogglePublish = (contentId) => {
    setContents(prev => 
      prev.map(content => 
        content.id === contentId 
          ? { ...content, isPublished: !content.isPublished, updatedAt: new Date().toISOString() }
          : content
      )
    );
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

        {activeTab === 'display' && (
          <ContentDisplay
            contents={displayContents}
            onEdit={isDoctor ? handleEdit : undefined}
            onDelete={isDoctor ? handleDelete : undefined}
            onTogglePublish={isDoctor ? handleTogglePublish : undefined}
            isDoctor={isDoctor}
          />
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
