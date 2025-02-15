// src/App.jsx
import React from 'react'
import TaskDisplay from './components/TaskDisplay'; // Import TaskDisplay component
import './App.css' // You might have an App.css file already

function App() {
  return (
    <>
      <h1>Welcome to the Task App!</h1>
      <TaskDisplay /> {/* Add the TaskDisplay component here */}
      {/* ... your map component and other application elements ... */}
    </>
  )
}

export default App