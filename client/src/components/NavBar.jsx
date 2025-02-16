import React from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

export default function NavBar() {
  // Mock user data for testing
  const mockUserData = {
    username: "demouser",
    tasks: [],
    totalDistance: 0,
    visitedLocations: []
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Map</Link>
          <Link to="/camera" className="text-gray-700 hover:text-gray-900">Camera</Link>
          <Link to="/tasks" className="text-gray-700 hover:text-gray-900">Tasks</Link>
          <Link to="/leaderboard" className="text-gray-700 hover:text-gray-900">Leaderboard</Link>
        </div>
        <ProfileMenu userData={mockUserData} />
      </div>
    </nav>
  );
}