// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components/layout';
import routes from './config/routes';

const App = () => {
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

export default App;
