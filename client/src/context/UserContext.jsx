import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const UserContext = createContext();

// Utility function to calculate distance between coordinates
const calculateDistance = (coord1, coord2) => {
  if (!coord1 || !coord2) return 0;
  
  const R = 6371; // Earth's radius in km
  const dLat = (coord2.latitude - coord1.latitude) * (Math.PI/180);
  const dLon = (coord2.longitude - coord1.longitude) * (Math.PI/180);
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.cos(coord1.latitude * (Math.PI/180)) * Math.cos(coord2.latitude * (Math.PI/180)) * 
           Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    isLoggedIn: false,
    tasks: [],
    lastLocation: null,
    totalDistance: 0,
    points: 0,
    visitedLocations: [],
  });

  // Calculate points based on various factors
  const calculatePoints = (completedTasks, totalDistance, visitedLocations) => {
    const taskPoints = completedTasks.length * 100;
    const distancePoints = Math.floor(totalDistance * 10);
    const locationPoints = visitedLocations.length * 50;
    return taskPoints + distancePoints + locationPoints;
  };

  // Update user location and recalculate distance
  const updateUserLocation = (newLocation) => {
    setUser(prevUser => {
      const distance = calculateDistance(prevUser.lastLocation, newLocation);
      const newTotalDistance = prevUser.totalDistance + distance;
      
      return {
        ...prevUser,
        lastLocation: newLocation,
        totalDistance: newTotalDistance,
        points: calculatePoints(
          prevUser.tasks.filter(t => t.isCompleted),
          newTotalDistance,
          prevUser.visitedLocations
        )
      };
    });
  };

  // Handle task completion
  const completeTask = (taskId) => {
    setUser(prevUser => {
      const updatedTasks = prevUser.tasks.map(task => 
        task.id === taskId ? { ...task, isCompleted: true } : task
      );
      
      return {
        ...prevUser,
        tasks: updatedTasks,
        points: calculatePoints(
          updatedTasks.filter(t => t.isCompleted),
          prevUser.totalDistance,
          prevUser.visitedLocations
        )
      };
    });
  };

  // Add a visited location
  const addVisitedLocation = (location) => {
    setUser(prevUser => {
      const newVisitedLocations = [...prevUser.visitedLocations, location];
      return {
        ...prevUser,
        visitedLocations: newVisitedLocations,
        points: calculatePoints(
          prevUser.tasks.filter(t => t.isCompleted),
          prevUser.totalDistance,
          newVisitedLocations
        )
      };
    });
  };

  // Handle user login
  const login = (username) => {
    setUser(prevUser => ({
      ...prevUser,
      username,
      isLoggedIn: true,
      tasks: [], // Initialize with tasks from your data
    }));
  };

  // Handle user logout
  const logout = () => {
    setUser({
      username: '',
      isLoggedIn: false,
      tasks: [],
      lastLocation: null,
      totalDistance: 0,
      points: 0,
      visitedLocations: [],
    });
  };

  const value = {
    user,
    login,
    logout,
    updateUserLocation,
    completeTask,
    addVisitedLocation,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};