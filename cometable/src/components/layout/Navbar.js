// src/components/layout/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CometTable</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/crm/leads">CRM</Link>
        <Link to="/erp/inventory">ERP</Link>
        <button onClick={handleLogout} className="nav-button">
          Wyloguj
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
