// src/features/tasks/components/TaskDetailsModal.js
import React, { useState } from "react";

const TaskDetailsModal = ({ task, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Przekaż zaktualizowane dane zadania
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edytuj zadanie</h3>
        <form onSubmit={handleSubmit}>
          <label>Tytuł</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
          />
          <label>Opis</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit">Zapisz</button>
          <button onClick={onClose}>Anuluj</button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
