import React from 'react';
import { useTasks } from '../store/TaskContext';

const TaskCardView = () => {
  const { loading } = useTasks();
  
  return (
    <div className="calendar-view">
      <h2>Sprint Zadań</h2>
      {/* Implementacja kalendarza */}
    </div>
  );
};

export default  TaskCardView;