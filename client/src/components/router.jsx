import React from "react";
import NavBar from "./NavBar";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Camera from "../pages/Camera";

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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
