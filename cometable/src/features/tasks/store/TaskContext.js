// src/features/tasks/store/TaskContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { taskService } from '../../../services/taskService';
import { projectService } from '../../../services/projectService';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState(null);

  // Pobierz projekty i zadania
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, tasksData] = await Promise.all([
          projectService.getAllProjects(),
          taskService.getAllTasks()
        ]);
        console.log("tasksData:", tasksData);
        let finalTasks = tasksData;
        if (!Array.isArray(finalTasks)) {
          finalTasks = finalTasks.tasks || [];
        }
        setProjects(projectsData);
        setTasks(finalTasks);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshTasks = useCallback(async () => {
    setLoading(true);
    try {
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, updates);
      setTasks(currentTasks => 
        currentTasks.map(task => 
          task._id === taskId ? { ...task, ...updatedTask } : task
        )
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, newStatus);
      setTasks(currentTasks => 
        currentTasks.map(task => 
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const createNewTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask({
        ...taskData,
        status: 'todo',
        priority: 'MEDIUM'
      });
      setTasks(currentTasks => [...currentTasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, newStatus);
      setTasks(currentTasks => 
        currentTasks.map(task => 
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const bulkUpdateTasks = async (taskIds, updates) => {
    try {
      await Promise.all(taskIds.map(id => taskService.updateTask(id, updates)));
      await refreshTasks();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const bulkDeleteTasks = async (taskIds) => {
    try {
      await Promise.all(taskIds.map(id => taskService.deleteTask(id)));
      setTasks(currentTasks => currentTasks.filter(task => !taskIds.includes(task._id)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Funkcje pomocnicze do różnych widoków
  const getFilteredTasks = () => {
    if (!selectedProject) return tasks;
    return tasks.filter(task => task.project === selectedProject);
  };

  const getKanbanTasks = () => {
    const filteredTasks = getFilteredTasks();
    return {
      todo: filteredTasks.filter(task => task.status === 'todo'),
      inProgress: filteredTasks.filter(task => task.status === 'inProgress'),
      done: filteredTasks.filter(task => task.status === 'done')
    };
  };

  const getListTasks = () => {
    return getFilteredTasks();
  };

  const getCalendarTasks = () => {
    return getFilteredTasks().map(task => ({
      id: task._id,
      title: task.title,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      project: task.project,
      priority: task.priority
    }));
  };

  const getClickUpStyleList = () => {
    // Przykład grupowania zadań wg priorytetów
    const grouped = tasks.reduce((acc, task) => {
      const key = task.priority || 'OTHER';
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});
    return grouped;
  };

  return (
    <TaskContext.Provider value={{
      tasks: getFilteredTasks(),
      kanbanTasks: getKanbanTasks(),
      listTasks: getListTasks(),
      calendarTasks: getCalendarTasks(),
      getClickUpStyleList,
      projects,
      selectedProject,
      setSelectedProject,
      loading,
      error,
      refreshTasks,
      updateTask,
      updateTaskStatus,
      createNewTask,
      moveTask,
      bulkUpdateTasks,
      bulkDeleteTasks,
      groupBy,
      setGroupBy
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
