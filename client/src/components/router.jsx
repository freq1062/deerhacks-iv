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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/tasks" element={<TaskDisplay />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
