// src/components/layout/MainLayout.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import routes from '../../config/routes';

const MainLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
