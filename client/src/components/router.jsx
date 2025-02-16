import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Camera from "../pages/Camera";
import NavBar from "./NavBar";
import TaskDisplay from "./TaskDisplay";
import Leaderboard from "./Leaderboard";

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Outlet />
        <NavBar />
      </>
    );
  };

  return (
    <BrowserRouter>
      <div style={{ width: '100%', height: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/tasks" element={<TaskDisplay />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}