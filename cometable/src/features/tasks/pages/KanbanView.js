// src/features/tasks/pages/KanbanView.js
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTasks } from '../store/TaskContext';
import KanbanColumn from '../components/KanbanColumn';
import '../styles/Task.css';

const KanbanView = () => {
  const { kanbanTasks, moveTask, loading } = useTasks();

  const handleDrop = (taskId, newStatus) => {
    moveTask(taskId, newStatus);
  };

  if (loading) return <div>Ładowanie...</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        <KanbanColumn
          title="Do zrobienia"
          tasks={kanbanTasks.todo}
          status="todo"
          onDrop={handleDrop}
        />
        <KanbanColumn
          title="W trakcie"
          tasks={kanbanTasks.inProgress}
          status="inProgress"
          onDrop={handleDrop}
        />
        <KanbanColumn
          title="Zakończone"
          tasks={kanbanTasks.done}
          status="done"
          onDrop={handleDrop}
        />
      </div>
    </DndProvider>
  );
};

export default KanbanView;
