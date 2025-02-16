import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Trophy, Medal, Award } from 'lucide-react';

// Fake demo users data
const demoUsers = [
  { username: "AdventureSeeker", points: 750, tasksCompleted: 4, distanceTraveled: 4.2 },
  { username: "UrbanExplorer", points: 1200, tasksCompleted: 7, distanceTraveled: 8.5 },
  { username: "TravelBug", points: 450, tasksCompleted: 3, distanceTraveled: 2.1 },
  { username: "CityWanderer", points: 980, tasksCompleted: 5, distanceTraveled: 7.3 },
  { username: "GeoGuru", points: 1500, tasksCompleted: 8, distanceTraveled: 12.6 },
  { username: "PathFinder", points: 620, tasksCompleted: 4, distanceTraveled: 3.8 },
  { username: "LandmarkHunter", points: 1100, tasksCompleted: 6, distanceTraveled: 9.2 },
  { username: "StreetSmart", points: 830, tasksCompleted: 5, distanceTraveled: 5.7 },
  { username: "DiscoveryPro", points: 300, tasksCompleted: 2, distanceTraveled: 1.5 },
  { username: "MapMaster", points: 1350, tasksCompleted: 8, distanceTraveled: 10.9 }
];

const Leaderboard = () => {
  const { user } = useUser();
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  useEffect(() => {
    // Only add the actual user if they're logged in
    const allUsers = [...demoUsers];
    
    if (user.isLoggedIn) {
      // Create an entry for the current user
      const currentUser = {
        username: user.username,
        points: user.points,
        tasksCompleted: user.tasks?.filter(t => t.isCompleted)?.length || 0,
        distanceTraveled: user.totalDistance || 0,
        isCurrentUser: true // Flag to highlight the current user
      };
      
      allUsers.push(currentUser);
    }
    
    // Sort by points in descending order
    const sortedUsers = allUsers.sort((a, b) => b.points - a.points);
    
    // Add rank property
    const rankedUsers = sortedUsers.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
    
    setLeaderboardData(rankedUsers);
  }, [user]);
  
  // Function to render rank icon based on position
  const getRankIcon = (rank) => {
    switch(rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-amber-600" size={20} />;
      default:
        return <span className="w-5 text-center">{rank}</span>;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pb-20" style={{ maxWidth: '800px', minHeight: '100vh' }}>
      <h2 className="text-2xl font-bold mb-6 text-center">Leaderboard</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider w-12">
                Rank
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Player
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Points
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Tasks
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Distance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboardData.map((player) => (
              <tr 
                key={player.username}
                className={player.isCurrentUser ? 'bg-blue-50' : 'hover:bg-gray-50'}
              >
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {getRankIcon(player.rank)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {player.isCurrentUser && (
                      <Award className="text-blue-500 mr-2" size={16} />
                    )}
                    <span className="font-medium text-gray-900">{player.username}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center font-semibold">
                  {player.points.toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center text-gray-700">
                  {player.tasksCompleted}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center text-gray-700">
                  {player.distanceTraveled.toFixed(1)} km
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="mt-8 mb-20 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">How Points Are Calculated</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Each completed task: 100 points</li>
          <li>Each kilometer traveled: 10 points</li>
          <li>Each location discovered: 50 points</li>
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;