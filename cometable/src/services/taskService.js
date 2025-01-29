// src/services/taskService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const taskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      if (!response.data) throw new Error('No data received');
      return Array.isArray(response.data) ? response.data : response.data.tasks || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  },

  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}/status`, { 
        status 
      });
      return response.data;
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  },

  updateTask: async (taskId, taskData) => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId) => {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
  }
};
