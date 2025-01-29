// src/components/layout/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <Link 
          to="/dashboard" 
          className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/tasks" 
          className={`menu-item ${location.pathname.includes('/tasks') ? 'active' : ''}`}
        >
          <i className="fas fa-tasks"></i>
          <span>Zadania</span>
        </Link>

        <Link 
          to="/crm/leads" 
          className={`menu-item ${location.pathname.includes('/crm/leads') ? 'active' : ''}`}
        >
          <i className="fas fa-user-friends"></i>
          <span>Leady</span>
        </Link>

        <Link 
          to="/erp/inventory" 
          className={`menu-item ${location.pathname.includes('/erp/inventory') ? 'active' : ''}`}
        >
          <i className="fas fa-warehouse"></i>
          <span>Magazyn</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
