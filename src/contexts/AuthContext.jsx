import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set token in API service if it exists
    if (token) {
      apiService.setAuthToken(token);
    }
    setLoading(false);
  }, [token]);

  const login = async (credentials) => {
    try {
      let response;
      
      // Check if it's doctor login (PIN or doctor email)
      if (credentials.loginType === 'pin' || credentials.loginType === 'password') {
        response = await apiService.doctorLogin(credentials);
      } else {
        response = await apiService.loginUser(credentials);
      }
      
      const { token: authToken, user: userData } = response;
      
      setToken(authToken);
      setUser(userData);
      localStorage.setItem('auth_token', authToken);
      apiService.setAuthToken(authToken);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    apiService.setAuthToken(null);
  };

  // For demo purposes, allow bypassing auth
  const loginAsDoctor = async () => {
    try {
      // Use the PIN to login with the backend
      const response = await apiService.doctorLogin({
        pin: '123456',
        loginType: 'pin'
      });
      
      const { token: authToken, user: userData } = response;
      
      setToken(authToken);
      setUser(userData);
      localStorage.setItem('auth_token', authToken);
      apiService.setAuthToken(authToken);
      
      console.log('✅ Doctor authenticated successfully:', userData);
    } catch (error) {
      console.error('❌ Doctor authentication failed:', error);
      // Fallback to mock for development
      const mockUser = {
        id: 'demo-doctor-id',
        name: 'Dr. Ganesh',
        email: 'doctor@drganeshcs.com',
        role: 'doctor'
      };
      setUser(mockUser);
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    loginAsDoctor,
    isAuthenticated: !!token,
    isDoctor: user?.role === 'doctor' || user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
