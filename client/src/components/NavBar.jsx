// deerhacks-iv\client\src\components\NavBar.jsx
import React, { useState } from 'react';
import TaskDisplay from './TaskDisplay'; // Import TaskDisplay

const NavBar = () => {
  const [isTaskOverlayOpen, setIsTaskOverlayOpen] = useState(false);

  const toggleTaskOverlay = () => {
    setIsTaskOverlayOpen(!isTaskOverlayOpen);
  };

  return (
    <nav style={navbarStyle}>
      <div style={navBrandStyle}>Your App Name</div> {/* Keep your brand/logo here */}
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <button style={navButtonStyle} onClick={toggleTaskOverlay}>
            Tasks
          </button>
        </li>
        {/* Add other navigation items here if you have them */}
      </ul>

      {isTaskOverlayOpen && (
        <div style={taskOverlayStyle} onClick={toggleTaskOverlay}> {/* Close overlay on background click */}
          <div style={taskOverlayContentStyle} onClick={(e) => e.stopPropagation()}> {/* Prevent background click when clicking content */}
            <TaskDisplay />
            <button style={closeButtonStyle} onClick={toggleTaskOverlay}>
              Close Tasks
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Styles (You can move these to a separate CSS file later, e.g., NavBar.css and import it)
const navbarStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navBrandStyle = {
  fontSize: '1.5em',
  fontWeight: 'bold',
};

const navListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
};

const navItemStyle = {
  marginLeft: '20px',
};

const navButtonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  fontSize: '1em',
  cursor: 'pointer',
  padding: '8px 12px',
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
};

const taskOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  cursor: 'pointer', // Added cursor pointer to background to indicate clickable
};

const taskOverlayContentStyle = { // Style for the content within the overlay
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  cursor: 'default', // Default cursor for content area
};


const closeButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  padding: '10px 15px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default NavBar; // Make sure to export NavBar, not Navbar