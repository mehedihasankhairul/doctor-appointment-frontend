import { useState, useMemo } from "react";
import ContentCard from "./ContentCard";

const ContentDisplay = ({ contents, onEdit, onDelete, onTogglePublish, isDoctor = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['all', 'general', 'education', 'tips', 'procedure', 'testimonial', 'announcement'];
  const platforms = ['all', 'youtube', 'facebook'];
  const statuses = ['all', 'published', 'draft'];

  const filteredAndSortedContent = useMemo(() => {
    let filtered = contents.filter(content => {
      const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = filterCategory === 'all' || content.category === filterCategory;
      const matchesPlatform = filterPlatform === 'all' || content.platform === filterPlatform;
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'published' && content.isPublished) ||
                           (filterStatus === 'draft' && !content.isPublished);

      return matchesSearch && matchesCategory && matchesPlatform && matchesStatus;
    });

    // Sort content
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'platform':
          return a.platform.localeCompare(b.platform);
        default:
          return 0;
      }
    });

    return filtered;
  }, [contents, searchTerm, filterCategory, filterPlatform, filterStatus, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
    setFilterPlatform('all');
    setFilterStatus('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">
          {isDoctor ? 'Content Management' : 'Shared Content'}
        </h2>
        <div className="text-sm text-gray-600">
          {filteredAndSortedContent.length} of {contents.length} items
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, description, or tags..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          {isDoctor && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="category">Category</option>
              <option value="platform">Platform</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Content Grid */}
      {filteredAndSortedContent.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📱</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            {contents.length === 0 ? 'No content available' : 'No matching content found'}
          </h3>
          <p className="text-gray-500">
            {contents.length === 0 
              ? 'Start by uploading some content to share with your patients.'
              : 'Try adjusting your search or filter criteria.'}
          </p>
          {contents.length === 0 && isDoctor && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Upload Content
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedContent.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePublish={onTogglePublish}
              isDoctor={isDoctor}
            />
          ))}
        </div>
      )}

      {/* Content Statistics */}
      {isDoctor && contents.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {contents.length}
              </div>
              <div className="text-sm text-gray-600">Total Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {contents.filter(c => c.isPublished).length}
              </div>
              <div className="text-sm text-gray-600">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {contents.filter(c => c.platform === 'youtube').length}
              </div>
              <div className="text-sm text-gray-600">YouTube</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {contents.filter(c => c.platform === 'facebook').length}
              </div>
              <div className="text-sm text-gray-600">Facebook</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
