import React from 'react';
import { useDrop } from 'react-dnd';
import { Card } from 'antd';
import TaskCard from './TaskCard';

const KanbanColumn = ({ title, tasks, status, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`kanban-column ${isOver ? 'is-over' : ''}`}
    >
      <h3 className="column-title">{title}</h3>
      <div className="tasks-container">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
