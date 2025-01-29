// src/services/projectService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const projectService = {
  getAllProjects: async () => {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  }
};
