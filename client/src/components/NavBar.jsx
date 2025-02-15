import React, { useState } from "react";

export default function NavBar() {
  return (
    <div className="navbar">
      <a href="/">Map</a>
      <a href="/camera">Camera</a>
      <a href="/tasks">Tasks</a>
      <a href="/leaderboard">Leaderboard</a>
    </div>
  );
}
