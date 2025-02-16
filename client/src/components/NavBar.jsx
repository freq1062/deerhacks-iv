import React from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useUser } from '../context/UserContext';

export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200" style={{ zIndex: 1000 }}>
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
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
        <div className="flex items-center gap-4" style={{ position: 'relative' }}>
          <div className="text-sm font-medium">
            Score: {user.points || 0}
          </div>
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
}