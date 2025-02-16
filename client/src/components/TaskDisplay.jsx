// deerhacks-iv/client/src/components/TaskDisplay.jsx
import React from 'react';
import { useUser } from '../context/UserContext';
import tasksData from '../data/tasks';

const TaskDisplay = () => {
  const { user, completeTask } = useUser();

  // Initialize tasks if they haven't been loaded yet
  React.useEffect(() => {
    if (user.tasks.length === 0 && user.isLoggedIn) {
      // In a real app, you might fetch tasks from an API here
      completeTask(tasksData);
    }
  }, [user.isLoggedIn]);

  const handleTaskCompletion = (taskId) => {
    completeTask(taskId);
  };

  return (
    <div style={taskDisplayStyles.container}>
      <h3 style={taskDisplayStyles.heading}>Current Tasks</h3>
      <div style={taskDisplayStyles.stats}>
        <p>Total Points: {user.points}</p>
        <p>Distance Traveled: {user.totalDistance.toFixed(1)} km</p>
        <p>Locations Found: {user.visitedLocations.length}</p>
      </div>
      <ul style={taskDisplayStyles.taskList}>
        {user.tasks.map(task => (
          <li key={task.id} style={{
            ...taskDisplayStyles.taskItem,
            textDecoration: task.isCompleted ? 'line-through' : 'none',
            opacity: task.isCompleted ? 0.7 : 1,
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
  stats: {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
  },
};

export default TaskDisplay;