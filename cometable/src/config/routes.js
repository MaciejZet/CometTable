// src/config/routes.js
import React from 'react';
import HomePage from '../pages/HomePage';
import LeadsPage from '../features/crm/pages/LeadsPage';
import InventoryPage from '../features/erp/pages/InventoryPage';
import DashboardPage from '../pages/DashboardPage';
import KanbanPage from '../features/tasks/pages/KanbanPage';

const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/crm/leads',
    element: <LeadsPage />
  },
  {
    path: '/erp/inventory',
    element: <InventoryPage />
  },
  {
    path: '/tasks/kanban',
    element: <KanbanPage />,
  },
];

export default routes;
