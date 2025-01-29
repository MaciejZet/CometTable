import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, Tag, Tooltip } from 'antd';
import { CalendarOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import '../styles/Task.css';

const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="task-card" size="small">
        <div className="task-card-header">
          <h4>{task.title}</h4>
          {task.priority === 'HIGH' && (
            <Tooltip title="Wysoki priorytet">
              <ExclamationCircleFilled className="priority-icon" />
            </Tooltip>
          )}
        </div>
        <p>{task.description}</p>
        <div className="task-card-footer">
          {task.dueDate && (
            <span className="due-date">
              <CalendarOutlined /> {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          <div className="task-labels">
            {task.labels?.map(label => (
              <Tag key={label} size="small">{label}</Tag>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
