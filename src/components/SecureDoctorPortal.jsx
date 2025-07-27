import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import DoctorLogin from './DoctorLogin.jsx';
import DoctorPortal from './DoctorPortal.jsx';

const SecureDoctorPortal = ({ onTogglePortal }) => {
  const { isAuthenticated, isDoctor, user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(!isAuthenticated || !isDoctor);

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    setShowLogin(true);
  };

  // Show login screen if not authenticated or not a doctor
  if (showLogin || !isAuthenticated || !isDoctor) {
    return <DoctorLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Show doctor portal with logout functionality
  return (
    <div>
      {/* Header with logout */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome, {user?.name || 'Doctor'}
              </h1>
              {user?.specialization && (
                <span className="ml-2 text-sm text-gray-500">
                  • {user.specialization}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {user?.loginType && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {user.loginType === 'pin' ? 'PIN Access' : 'Full Access'}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
              <button
                onClick={onTogglePortal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Doctor Portal Content */}
      <DoctorPortal onTogglePortal={onTogglePortal} />
    </div>
  );
};

export default SecureDoctorPortal;
