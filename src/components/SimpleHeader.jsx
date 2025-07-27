const SimpleHeader = ({ title = "Cardiology and Medicine Appointment", showBack = false, onBack }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Back button on mobile */}
          {showBack && (
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
          
          {/* Title/Logo */}
          <div className={`${showBack ? '' : 'flex-1'} text-center`}>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {title}
            </h1>
          </div>
          
          {/* Spacer for alignment when back button exists */}
          {showBack && <div className="w-16"></div>}
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
