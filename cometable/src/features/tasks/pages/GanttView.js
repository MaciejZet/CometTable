import React from 'react';
import { useTasks } from '../store/TaskContext';

const GanttView = () => {
  const { loading } = useTasks();
  
  return (
    <div className="calendar-view">
      <h2>Gantt Chart Zadań</h2>
      {/* Implementacja kalendarza */}
    </div>
  );
};

export default  GanttView;