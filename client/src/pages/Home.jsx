// deerhacks-iv/client/src/pages/Home.jsx
import React, { useState } from "react";
// import TaskToggleButtonTest from "../components/TaskToggleButtonTest"; // Import the test component
import NavBar from "../components/NavBar.jsx";
import Map from "../components/Map.jsx";
import RegisterForm from "../components/RegisterForm.jsx"; // Import RegisterForm
import LoginForm from "../components/LoginForm.jsx";   // Import LoginForm

export default function Home() {
  return (
    <main>
      <Map />
      <NavBar className="navbar-overlay" />

      {/* Add Login and Register Forms below NavBar and Map */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
        <RegisterForm />  {/* Render Register Form */}
        <LoginForm />     {/* Render Login Form */}
      </div>
    </main>
  );
}