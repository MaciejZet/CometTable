import React, { useState } from 'react';
import KanbanView from './KanbanView';
import ListView from './ListView';
import CalendarView from './CalendarView';
import GanttView from './GanttView';
import SprintView from './SprintView';
import TaskCardView from './TaskCardView';
import './styles/TaskPage.css';

const TaskPage = () => {
  const [currentView, setCurrentView] = useState('kanban');

  const renderView = () => {
    switch(currentView) {
      case 'kanban': return <KanbanView />;
      case 'list': return <ListView />;
      case 'calendar': return <CalendarView />;
      case 'gantt': return <GanttView />;
      case 'sprint': return <SprintView />;
      case 'card': return <TaskCardView />;
      default: return <KanbanView />;
    }
  };

  return (
    <div className="task-page">
      <div className="view-controls">
        <div className="view-switcher">
          <button 
            className={`view-option ${currentView === 'kanban' ? 'active' : ''}`}
            onClick={() => setCurrentView('kanban')}
          >
            <i className="fas fa-columns"></i>
            <span>Kanban</span>
          </button>
          <button 
            className={`view-option ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            <i className="fas fa-list"></i>
            <span>Lista</span>
          </button>
          <button 
            className={`view-option ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => setCurrentView('calendar')}
          >
            <i className="fas fa-calendar"></i>
            <span>Kalendarz</span>
          </button>
          <button 
            className={`view-option ${currentView === 'gantt' ? 'active' : ''}`}
            onClick={() => setCurrentView('gantt')}
          >
            <i className="fas fa-chart-bar"></i>
            <span>Gantt</span>
          </button>
          <button 
            className={`view-option ${currentView === 'sprint' ? 'active' : ''}`}
            onClick={() => setCurrentView('sprint')}
          >
            <i className="fas fa-running"></i>
            <span>Sprint</span>
          </button>
          <button 
            className={`view-option ${currentView === 'card' ? 'active' : ''}`}
            onClick={() => setCurrentView('card')}
          >
            <i className="fas fa-th-large"></i>
            <span>Karty</span>
          </button>
        </div>
      </div>
      <div className="view-content">
        {renderView()}
      </div>
    </div>
  );
};

export default TaskPage;
