// src/components/TaskItem.js
import React from 'react';

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <div className="task-actions">
        <span className={task.completed ? 'status-complete' : 'status-incomplete'}>
          {task.completed ? 'Complete' : 'Incomplete'}
        </span>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
