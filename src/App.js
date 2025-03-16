import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import FilesPage from './pages/FilesPage';
import Login from './pages/Login';
// import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Layout/ProtectedRoute';

const App = () => {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            
            {/* Protected routes */}
            <Route
               path="/"
               element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
             />
            <Route
               path="/files"
               element={
                <ProtectedRoute>
                  <MainLayout>
                    <FilesPage />
                  </MainLayout>
                </ProtectedRoute>
              }
             />
            <Route
               path="/photos"
               element={
                <ProtectedRoute>
                  <MainLayout>
                    <FilesPage type="photos" />
                  </MainLayout>
                </ProtectedRoute>
              }
             />
            <Route
               path="/videos"
               element={
                <ProtectedRoute>
                  <MainLayout>
                    <FilesPage type="videos" />
                  </MainLayout>
                </ProtectedRoute>
              }
             />
            
            {/* Redirect any unknown routes to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;