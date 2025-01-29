// src/components/ProjectSelector.js
import React from 'react';
import { useTasks } from '../features/tasks/store/TaskContext';

const ProjectSelector = () => {
  const { projects, selectedProject, setSelectedProject } = useTasks();

  return (
    <div className="project-selector">
      <button 
        className={!selectedProject ? 'active' : ''} 
        onClick={() => setSelectedProject(null)}
      >
        Wszystkie
      </button>
      {projects.map(project => (
        <button
          key={project._id}
          className={selectedProject === project._id ? 'active' : ''}
          onClick={() => setSelectedProject(project._id)}
          style={{ backgroundColor: project.color }}
        >
          {project.name}
        </button>
      ))}
    </div>
  );
};

export default ProjectSelector;
