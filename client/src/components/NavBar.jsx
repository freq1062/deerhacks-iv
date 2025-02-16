import React from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useUser } from "../context/UserContext";

export default function NavBar() {
  const { user } = useUser();
  // Mock user data for testing
  const mockUserData = {
    username: "demouser",
    tasks: [],
    totalDistance: 0,
    visitedLocations: [],
  };

  // Conditionally render the navbar, ensuring it's not displayed on the login page
  if (!user.isLoggedIn) {
    return null; // This hides the navbar when the user is not logged in
  }

  return (
    <nav
      className="nav"
      style={{ zIndex: 1000, border: "1px solid black" }}
      id="navbar"
    >
      <div className="profile-menu">
        <div className="flex gap-4">
          <Link to="/" className="link">
            Map
          </Link>
          <Link to="/camera" className="link">
            Camera
          </Link>
          <Link to="/tasks" className="link">
            Tasks
          </Link>
          <Link to="/leaderboard" className="link">
            Leaderboard
          </Link>
        </div>
        <div className="user-info">
          <ProfileMenu userData={mockUserData} />
          <p>Percent Walked: {user.completion}%</p>
        </div>
      </div>
    </nav>
  );
}
