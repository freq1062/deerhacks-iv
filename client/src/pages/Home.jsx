// deerhacks-iv/client/src/pages/Home.jsx
import React from "react";
// import TaskToggleButtonTest from "../components/TaskToggleButtonTest"; // Import the test component
import Map from "../components/Map.jsx";

export default function Home() {
  return (
    <main>
      <div className="map-container">
        <Map />
      </div>
    </main>
  );
}
