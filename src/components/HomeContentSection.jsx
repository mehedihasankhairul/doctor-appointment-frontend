import { useState } from "react";
import { useContent } from '../contexts/ContentContext.jsx';

const HomeContentSection = ({ onBookAppointment }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Use ContentContext for real-time data synchronization
  const { content, loading, error, forceRefresh } = useContent();

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

  // Fallback sample content (for when API fails)
  const getSampleContent = () => [
    {
      id: "1",
      title: "Understanding Heart Disease Prevention",
      description: "Learn about the key factors that contribute to heart disease and how you can prevent them through lifestyle changes.",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      platform: "youtube",
      category: "education",
      tags: ["heart", "prevention", "health", "lifestyle"]
    },
    {
      id: "2",
      title: "Patient Success Story - Recovery Journey",
      description: "Watch how our patient recovered from a major cardiac procedure and returned to an active lifestyle.",
      url: "https://www.facebook.com/watch/video/123456789",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2Fvideo%2F123456789&show_text=0&width=560",
      platform: "facebook",
      category: "testimonial",
      tags: ["recovery", "success", "patient", "cardiac"]
    },
    {
      id: "3",
      title: "5 Daily Tips for Heart Health",
      description: "Simple daily habits that can significantly improve your cardiovascular health. Easy to follow tips that you can start today.",
      url: "https://www.youtube.com/watch?v=example123",
      embedUrl: "https://www.youtube.com/embed/example123",
      platform: "youtube",
      category: "tips",
      tags: ["daily", "tips", "heart", "health", "lifestyle"]
    },
    {
      id: "4",
      title: "What to Expect During Your First Visit",
      description: "A comprehensive guide to your first cardiovascular consultation and what tests you might need.",
      url: "https://www.youtube.com/watch?v=example456",
      embedUrl: "https://www.youtube.com/embed/example456",
      platform: "youtube",
      category: "procedure",
      tags: ["consultation", "first visit", "tests", "preparation"]
    },
    {
      id: "5",
      title: "Nutrition for Heart Health",
      description: "Expert advice on heart-healthy eating habits and foods that support cardiovascular wellness.",
      url: "https://www.facebook.com/watch/video/789012345",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2Fvideo%2F789012345&show_text=0&width=560",
      platform: "facebook",
      category: "education",
      tags: ["nutrition", "diet", "heart", "wellness"]
    },
    {
      id: "6",
      title: "Exercise Guidelines for Heart Patients",
      description: "Safe and effective exercise recommendations for people with cardiovascular conditions.",
      url: "https://www.youtube.com/watch?v=example789",
      embedUrl: "https://www.youtube.com/embed/example789",
      platform: "youtube",
      category: "tips",
      tags: ["exercise", "cardio", "safety", "guidelines"]
    }
  ];

  // ==========================================
  // CONFIGURATION
  // ==========================================
  const filterCategories = [
    { id: 'all', label: 'All Content', gradient: 'from-purple-500 to-pink-500' },
    { id: 'education', label: 'Education', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'tips', label: 'Tips', gradient: 'from-green-500 to-emerald-500' },
    { id: 'testimonial', label: 'Success Stories', gradient: 'from-yellow-500 to-orange-500' },
    { id: 'procedure', label: 'Procedures', gradient: 'from-indigo-500 to-purple-500' }
  ];

  // ==========================================
  // COMPUTED VALUES
  // ==========================================
  const displayedContent = activeFilter === 'all' 
    ? content 
    : content.filter(item => item.category === activeFilter);

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
  const getCategoryGradient = (category) => {
    const gradients = {
      education: 'bg-gradient-to-r from-blue-400 to-cyan-400',
      tips: 'bg-gradient-to-r from-green-400 to-emerald-400',
      procedure: 'bg-gradient-to-r from-purple-400 to-indigo-400',
      testimonial: 'bg-gradient-to-r from-yellow-400 to-orange-400',
      general: 'bg-gradient-to-r from-gray-400 to-slate-400'
    };
    return gradients[category] || gradients.general;
  };

  const getPlatformIcon = (platform) => {
    return platform === 'youtube' ? '📺' : '📘';
  };

  const getPlatformColor = (platform) => {
    return platform === 'youtube' ? 'text-red-600' : 'text-blue-600';
  };

  // ==========================================
  // SUB-COMPONENTS
  // ==========================================
  const AnimatedBackground = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* Main decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-40 right-16 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-48 right-12 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-18 animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-8 animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      {/* Additional decorative shapes */}
      <div className="absolute top-32 right-1/3 w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 transform rotate-45 opacity-12 animate-pulse" style={{ animationDelay: '5s' }}></div>
      <div className="absolute bottom-40 left-1/3 w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 transform rotate-12 opacity-15 animate-pulse" style={{ animationDelay: '6s' }}></div>
    </div>
  );

  const SectionHeader = () => (
    <div className="text-center mb-12">
      <h2 className="text-4xl sm:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Educational Content
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Explore our collection of educational videos, health tips, and patient success stories 
        to learn more about cardiovascular health and wellness.
      </p>
    </div>
  );

  const CategoryFilters = () => (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filterCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveFilter(category.id)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
            activeFilter === category.id
              ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
              : 'bg-white/80 text-gray-700 hover:bg-white shadow-md hover:shadow-lg backdrop-blur-sm'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );

  const ContentCard = ({ content }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`text-lg ${getPlatformColor(content.platform)}`}>
              {getPlatformIcon(content.platform)}
            </span>
            <span className={`px-3 py-1 text-xs rounded-full text-white ${getCategoryGradient(content.category)}`}>
              {content.category}
            </span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {content.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {content.description}
        </p>
      </div>

      {/* Video Embed */}
      <div className="aspect-[16/9] bg-gray-100 relative">
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

      {/* Card Footer */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {content.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {content.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{content.tags.length - 3} more
            </span>
          )}
        </div>

        {/* External Link */}
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          <span className="mr-1">🔗</span>
          View on {content.platform === 'youtube' ? 'YouTube' : 'Facebook'}
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );

  const CallToAction = () => (
    <div className="text-center mt-16">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Take Control of Your Heart Health?
          </span>
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Schedule a consultation with our experienced cardiologists to discuss your health goals 
          and create a personalized treatment plan.
        </p>
        <button
          onClick={onBookAppointment}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Book Your Appointment
        </button>
      </div>
    </div>
  );

  // ==========================================
  // MAIN COMPONENT RENDER
  // ==========================================
  return (
    <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-cyan-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />
        <CategoryFilters />
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-gray-600">Loading content...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="text-amber-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-amber-800 mb-2">Content Loading Issue</h3>
              <p className="text-amber-700 mb-4">{error}</p>
              <button
                onClick={forceRefresh}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Content Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedContent.length > 0 ? (
              displayedContent.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v11a1 1 0 001 1h4a1 1 0 001-1V6H9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Content Available</h3>
                <p className="text-gray-600">No published content is available for this category at the moment.</p>
              </div>
            )}
          </div>
        )}

        <CallToAction />
      </div>
    </div>
  );
};

export default HomeContentSection;
