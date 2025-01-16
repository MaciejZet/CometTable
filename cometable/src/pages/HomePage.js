// src/pages/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Witaj w CometTable</h1>
      <div className="home-content">
        <p>System zarządzania dla Twojej firmy</p>
        <div className="features">
          <div className="feature-card">
            <h3>CRM</h3>
            <p>Zarządzaj relacjami z klientami</p>
          </div>
          <div className="feature-card">
            <h3>ERP</h3>
            <p>Kontroluj zasoby przedsiębiorstwa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
