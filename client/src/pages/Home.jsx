// deerhacks-iv/client/src/pages/Home.jsx
import React, { useState } from "react";
// import TaskToggleButtonTest from "../components/TaskToggleButtonTest"; // Import the test component
import TaskDisplay from "../components/TaskDisplay.jsx";
import Map from "../components/Map.jsx";
import Region from "../components/Region.jsx";

export default function Home() {
  let [showTask, setShowTask] = useState(true);
  return (
    <main>
      {showTask && (
        <>
          <h1>Welcome to the Task App!</h1>
          <TaskDisplay />
        </>
      )}
      <Map />
    </main>
  );
}
