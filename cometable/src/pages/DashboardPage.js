// src/pages/DashboardPage.js
import React from 'react';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Leady</h3>
          <p>Liczba aktywnych leadów: 0</p>
        </div>
        <div className="dashboard-card">
          <h3>Magazyn</h3>
          <p>Stan magazynowy: 0 produktów</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
