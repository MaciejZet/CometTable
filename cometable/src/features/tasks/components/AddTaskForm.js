// src/features/tasks/components/AddTaskForm.js
import React, { useState } from 'react';
import { useTasks } from '../store/TaskContext';

const AddTaskForm = ({ column }) => {
  const { addTask } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Math.random(), // W rzeczywistości tu można użyć np. UUID lub ID z backendu
      title: formData.title,
      description: formData.description,
    };
    addTask(column, newTask);
    setFormData({ title: '', description: '' }); // Resetowanie formularza
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        name="title"
        type="text"
        onChange={handleChange}
        value={formData.title}
        placeholder="Tytuł zadania"
      />
      <textarea
        name="description"
        onChange={handleChange}
        value={formData.description}
        placeholder="Opis zadania"
      />
      <button type="submit">Dodaj zadanie</button>
    </form>
  );
};

export default AddTaskForm;
