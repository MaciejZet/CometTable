// src/components/layout/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/crm/leads">Leady</Link>
        <Link to="/crm/clients">Klienci</Link>
        <Link to="/erp/inventory">Magazyn</Link>
        <Link to="/erp/orders">Zamówienia</Link>
      </div>
    </div>
  );
};

export default Sidebar;
