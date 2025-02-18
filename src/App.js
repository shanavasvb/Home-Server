import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import FilesPage from './pages/FilesPage';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

// Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
  
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

const App = () => {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Router>
          {/* <Route path="/login" element={<Login />} />
            <Route path="/" element={ */}
              {/* <ProtectedRoute> */}
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/files" element={<FilesPage />} />
                    <Route path="/photos" element={<FilesPage type="photos" />} />
                    <Route path="/videos" element={<FilesPage type="videos" />} />
                  </Routes>
                </MainLayout>
              {/* </ProtectedRoute> */}
            {/* } /> */}
          {/* </Routes> */}
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;