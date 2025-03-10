import React, { useState, useEffect } from 'react';
import './App.css';
import todoIcon from './64x64.png';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all | completed | pending

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      timeAdded: getCurrentTime(),
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="container" role="main">
      <header className="header">
        <img src={todoIcon} alt="To-Do App Icon" className="todo-icon" />
        <h1>The Tarnished’s Deeds</h1>
        <p className="subtitle">Organize your day and stay productive ✨</p>
      </header>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          aria-label="Task input"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Filter Tabs */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>
        <button onClick={() => setFilter("pending")} className={filter === "pending" ? "active" : ""}>Pending</button>
      </div>

      {/* Task Counters */}
      <div className="task-counters">
        <span>Total: {totalTasks}</span>
        <span>✔ Completed: {completedTasks}</span>
        <span>🕒 Pending: {pendingTasks}</span>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-info">
              <p className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </p>
              <p className="timestamp">Added on: {task.timeAdded}</p>
            </div>
            <div className="task-actions">
              <button
                onClick={() => toggleComplete(task.id)}
                className="complete-btn"
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


