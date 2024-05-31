import React, { useState, useEffect } from 'react';
import './ToDoListApp.css';

const ToDoListApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [filter, setFilter] = useState('all'); // Options: all, active, completed

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleDateChange = (e) => {
    setTaskDate(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '' && taskDate.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: taskInput, date: taskDate, completed: false }]);
      setTaskInput('');
      setTaskDate('');
    }
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    }
    return true; // 'all' filter
  });

  return (
    <div className="todo-list-container">
      <h1 className="title">To-Do List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Enter task..."
          className="task-input"
        />
        <input
          type="date"
          value={taskDate}
          onChange={handleDateChange}
          className="date-input"
        />
        <button type="submit" className="add-button">Add Task</button>
      </form>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span className="task-text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <span className="task-date">
              {task.date}
            </span>
            <button onClick={() => handleRemoveTask(task.id)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoListApp;
