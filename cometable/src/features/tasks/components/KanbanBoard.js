// src/features/tasks/components/KanbanBoard.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, Input, Button, Dropdown, Menu } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import KanbanColumn from './KanbanColumn';
import { useTasks } from '../store/TaskContext';
import './styles/KanbanBoard.css';

const KanbanBoard = () => {
  const { kanbanTasks, updateTaskStatus } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priority: null,
    assignee: null
  });

  const handleDrop = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  const filterMenu = (
    <Menu>
      <Menu.SubMenu title="Priorytet">
        <Menu.Item>Wysoki</Menu.Item>
        <Menu.Item>Średni</Menu.Item>
        <Menu.Item>Niski</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Przypisane do">
        {/* Lista użytkowników */}
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-controls">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Szukaj zadań..."
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Dropdown overlay={filterMenu}>
          <Button icon={<FilterOutlined />}>Filtry</Button>
        </Dropdown>
      </div>
      <div className="kanban-board">
        <KanbanColumn
          title="Do zrobienia"
          tasks={kanbanTasks.todo}
          status="todo"
          onDrop={handleDrop}
        />
        <KanbanColumn
          title="W trakcie"
          tasks={kanbanTasks.inProgress}
          status="inProgress"
          onDrop={handleDrop}
        />
        <KanbanColumn
          title="Zakończone"
          tasks={kanbanTasks.done}
          status="done"
          onDrop={handleDrop}
        />
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
