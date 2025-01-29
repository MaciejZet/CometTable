// src/features/tasks/pages/KanbanPage.js
import React from 'react';
import KanbanBoard from '../components/KanbanBoard';

const KanbanPage = () => {
  return (
    <div className="kanban-page">
      <h1>Tablica Kanban</h1>
      <KanbanBoard />
    </div>
  );
};

export default KanbanPage;
