// src/config/routes.js
import React from 'react';
import HomePage from '../pages/HomePage'; // Wprowadź właściwy eksport
import LeadsPage from '../features/crm/pages/LeadsPage';
import InventoryPage from '../features/erp/pages/InventoryPage';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/crm/leads',
    element: <LeadsPage />,
  },
  {
    path: '/erp/inventory',
    element: <InventoryPage />,
  },
];

export default routes;
