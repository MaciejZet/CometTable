// src/components/layout/MainLayout.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import DashboardPage from '../../pages/DashboardPage';
import TaskPage from '../../features/tasks/pages/TaskPage';

const MainLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks/*" element={<TaskPage />} />
            {/* Inne trasy */}
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;