// deerhacks-iv/client/src/pages/Home.jsx
import React, { useState } from "react";
// import TaskToggleButtonTest from "../components/TaskToggleButtonTest"; // Import the test component
import NavBar from "../components/NavBar.jsx";
import Map from "../components/Map.jsx";

export default function Home() {
  return (
    <main>
      <Map />
      <NavBar className="navbar-overlay" />
    </main>
  );
}
