import { useState } from "react";

const Navbar = ({ activeSection, onSectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'profile', label: 'Profile', icon: '👨‍⚕️' },
    { id: 'appointment', label: 'Book Appointment', icon: '📅' }
  ];

  const handleNavClick = (sectionId) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
            
                <img
                className="h-12 w-12 rounded-full"
                  src="https://i.ibb.co/99hZPgzW/Whats-App-Image-2025-07-30-at-00-30-32-removebg-preview.png"
                  alt=""
                />
         
              <div className="flex flex-col px-1">
                <span className="text-xl font-bold text-white">Dr. Ganesh Chandra</span>
                <span className="text-xs text-blue-100">MEDICINE & CARDIOLOGY</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-white text-blue-600"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-100 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-blue-700 to-blue-800 border-t border-blue-500">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-white text-blue-600"
                    : "text-blue-100 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
