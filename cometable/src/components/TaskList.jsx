import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-meta">
            <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
            <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
