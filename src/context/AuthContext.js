import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://13.202.211.89';
const AuthContext = createContext(null);

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add interceptor to refresh token if needed
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          // No refresh token available, need to login again
          return Promise.reject(error);
        }
        
        // Try to refresh the token
        const response = await axios.post(`${API_BASE_URL}/api/v1/refresh/`, {
          refresh: refreshToken
        });
        
        // Save the new access token
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, need to login again
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
        
        // Don't use window.location.href to avoid full page reload
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Get user data
          const response = await apiClient.get('/api/v1/user/');
          setUser(response.data);
          setError(null);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Clear invalid tokens
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_data');
          setError('Session expired. Please login again.');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      // Call login API
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/`, {
        username: credentials.username,
        password: credentials.password
      });
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', response.data.access);
      // Check if refresh token is included in the response
      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }
      
      // Fetch user data
      const userResponse = await apiClient.get('/api/v1/user/');
      setUser(userResponse.data);
      
      return true;
    } catch (error) {
      // Enhanced error handling
      console.error('Login error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      // Get the most specific error message available
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.detail || 
                          error.message || 
                          'Login failed';
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Note: There's no signup endpoint in the API docs, so this might not work
  // You'll need to discuss with your backend team to implement this
  const signup = async (userData) => {
    // Set error message for now
    setError('Signup functionality is not available in the current API');
    throw new Error('Signup functionality is not available in the current API');
    
    // If signup endpoint is added later, you can use this code:
    /*
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/api/v1/register/`, userData);
      return response.data;
    } catch (error) {
      console.error('Signup error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.detail || 
                          error.message || 
                          'Signup failed';
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
    */
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setError(null);
  };

  // File upload function
  const uploadFile = async (file) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post('/api/v1/file/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('File upload error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.detail || 
                          error.message || 
                          'File upload failed';
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Get user files
  const getUserFiles = async () => {
    try {
      setError(null);
      const response = await apiClient.get('/api/v1/file/');
      return response.data;
    } catch (error) {
      console.error('Error fetching files details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.detail || 
                          error.message || 
                          'Failed to fetch files';
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Generate upload token
  const generateUploadToken = async (files) => {
    try {
      setError(null);
      const response = await apiClient.post('/api/v1/file/upload_token/', { files });
      return response.data;
    } catch (error) {
      console.error('Error generating upload token:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.detail || 
                          error.message || 
                          'Failed to generate upload token';
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Add user files
  const addUserFiles = async (data) => {
    try {
      setError(null);
      const response = await apiClient.post('/api/v1/file/add-user-files/', data);
      return response.data;
    } catch (error) {
      console.error('Error adding user files:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.detail || 
                          error.message || 
                          'Failed to add user files';
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup,
      loading,
      error,
      uploadFile,
      getUserFiles,
      generateUploadToken,
      addUserFiles,
      apiClient
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default apiClient;