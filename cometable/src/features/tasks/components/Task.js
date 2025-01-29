// src/features/tasks/components/Task.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, column }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, column },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragRef} className={`kanban-task ${isDragging ? 'dragging' : ''}`}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
