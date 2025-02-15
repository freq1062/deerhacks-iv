// deerhacks-iv/client/src/pages/Home.jsx
import React from "react";
import TaskToggleButtonTest from "../components/TaskToggleButtonTest"; // Import the test component

function Home() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1>Task Toggle Button Test Page</h1>
      <TaskToggleButtonTest /> {/* Render the TaskToggleButtonTest component */}
    </div>
  );
}

export default Home;