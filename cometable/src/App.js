// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './features/auth/pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/*"
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
