// deerhacks-iv/client/src/components/TaskToggleButtonTest.jsx
import React, { useState } from 'react';

const TaskToggleButtonTest = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div style={{ position: 'relative', height: '300px', width: '400px', border: '1px solid black' }}>
      {/* A simple container to visualize the component area */}
      <h3>Task Toggle Button Test</h3>

      <button onClick={toggleOverlay}>
        {isOverlayVisible ? 'Hide Tasks' : 'Show Tasks'}
      </button>

      {isOverlayVisible && (
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '20px',
          padding: '20px',
          backgroundColor: 'lightyellow',
          border: '1px solid orange',
        }}>
          <p>This is the Task Overlay Content!</p>
          <button onClick={toggleOverlay}>Close Overlay</button> {/* Close button inside overlay */}
        </div>
      )}
    </div>
  );
};

export default TaskToggleButtonTest;