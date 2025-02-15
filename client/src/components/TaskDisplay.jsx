// deerhacks-iv/client/src/components/TaskDisplay.jsx
import React, { useState } from 'react';
import tasksData from '../data/tasks'; // Import task data

const TaskDisplay = () => {
  // State to manage tasks (including completion status)
  const [tasks, setTasks] = useState(() => {
    // Initialize tasks state from tasksData, setting isCompleted to false if not present
    return tasksData.map(task => ({ ...task, isCompleted: task.isCompleted || false }));
  });

  // Function to handle task completion toggle
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted }; // Toggle isCompleted status
      }
      return task;
    });
    setTasks(updatedTasks); // Update the tasks state
  };

  return (
    <div style={taskDisplayStyles.container}>
      <h3 style={taskDisplayStyles.heading}>Current Tasks</h3>
      <ul style={taskDisplayStyles.taskList}>
        {tasks.map(task => (
          <li key={task.id} style={{
            ...taskDisplayStyles.taskItem,
            textDecoration: task.isCompleted ? 'line-through' : 'none', // Strikethrough for completed tasks
            opacity: task.isCompleted ? 0.7 : 1, // Fade out completed tasks
          }}>
            <label style={taskDisplayStyles.taskLabel}>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleTaskCompletion(task.id)}
                style={taskDisplayStyles.taskCheckbox}
              />
              <span>
                <strong>{task.locationName}:</strong> {task.description}
                <br />
                <small>Type: {task.taskType}</small>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles for TaskDisplay component
const taskDisplayStyles = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    maxWidth: '400px',
  },
  heading: {
    marginBottom: '15px',
    textAlign: 'center',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  taskLabel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 0,
    cursor: 'pointer',
  },
  taskCheckbox: {
    marginRight: '8px',
    cursor: 'pointer',
  },
};

export default TaskDisplay;