import React from 'react';
import { useTasks } from '../store/TaskContext';

const SprintView = () => {
  const { loading } = useTasks();
  
  return (
    <div className="calendar-view">
      <h2>Sprint Zadań</h2>
      {/* Implementacja kalendarza */}
    </div>
  );
};

export default  SprintView;