import React, { useState } from 'react';
import { User, MapPin, Award, ChevronDown, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  // Calculate statistics based on completed tasks
  const calculateStats = () => {
    const completedTasks = user.tasks?.filter(task => task.isCompleted) || [];
    const points = user.points || 0;
    const distance = user.totalDistance || 0;
    
    return {
      points,
      locationsFound: user.visitedLocations?.length || 0,
      distanceTraveled: distance,
    };
  };

  const stats = calculateStats();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" style={{ zIndex: 1000 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
        style={{ minWidth: '120px' }}
      >
        <User size={20} />
        <span>{user.username || 'Profile'}</span>
        <ChevronDown 
          size={16} 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-lg shadow-lg p-4"
          style={{ minWidth: '200px' }}
        >
          <div className="space-y-4">
            <div className="text-lg font-semibold border-b pb-2">
              {user.username || 'User Profile'}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Award className="text-yellow-500" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Points</div>
                  <div className="font-medium">{stats.points}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="text-blue-500" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Locations Found</div>
                  <div className="font-medium">{stats.locationsFound}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg 
                  className="text-green-500" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div>
                  <div className="text-sm text-gray-600">Distance Traveled</div>
                  <div className="font-medium">{stats.distanceTraveled.toFixed(1)} km</div>
                </div>
              </div>
            </div>

            {user.isLoggedIn && (
              <button
                onClick={handleLogout}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;