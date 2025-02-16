import React, { createContext, useContext, useState, useEffect } from "react";
import tasksData from "../data/tasks";

// Create the context
const UserContext = createContext();

// Utility function to calculate distance between coordinates
const calculateDistance = (coord1, coord2) => {
  if (!coord1 || !coord2) return 0;

  const R = 6371; // Earth's radius in km
  const dLat = (coord2[0] - coord1[0]) * (Math.PI / 180);
  const dLon = (coord2[1] - coord1[1]) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1[0] * (Math.PI / 180)) *
      Math.cos(coord2[0] * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const UserProvider = ({ children }) => {
  // Try to load user data from localStorage
  const loadUserFromStorage = () => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return {
      username: "",
      isLoggedIn: false,
      tasks: [],
      lastLocation: [43.549455, -79.66391],
      totalDistance: 0,
      points: 0,
      completion: 0,
      visitedLocations: [],
    };
  };

  const [user, setUser] = useState(loadUserFromStorage);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  // Calculate points based on various factors
  const calculatePoints = (completedTasks, totalDistance, visitedLocations) => {
    const taskPoints = completedTasks.length * 100;
    const distancePoints = Math.floor(totalDistance * 10);
    const locationPoints = visitedLocations.length * 50;
    return taskPoints + distancePoints + locationPoints;
  };

  // Update user location and recalculate distance
  const updateUserLocation = (newLocation) => {
    setUser((prevUser) => {
      const distance = calculateDistance(prevUser.lastLocation, newLocation);
      const newTotalDistance = prevUser.totalDistance + distance;

      return {
        ...prevUser,
        lastLocation: newLocation,
        totalDistance: newTotalDistance,
        points: calculatePoints(
          prevUser.tasks.filter((t) => t.isCompleted),
          newTotalDistance,
          prevUser.visitedLocations
        ),
      };
    });
  };

  const setPercentage = (score) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        completion: score,
      };
    });
  };

  // Handle task completion
  const completeTask = (taskId) => {
    setUser((prevUser) => {
      const updatedTasks = prevUser.tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true } : task
      );

      return {
        ...prevUser,
        tasks: updatedTasks,
        points: calculatePoints(
          updatedTasks.filter((t) => t.isCompleted),
          prevUser.totalDistance,
          prevUser.visitedLocations
        ),
      };
    });
  };

  // Add a visited location
  const addVisitedLocation = (location) => {
    setUser((prevUser) => {
      const newVisitedLocations = [...prevUser.visitedLocations, location];
      return {
        ...prevUser,
        visitedLocations: newVisitedLocations,
        points: calculatePoints(
          prevUser.tasks.filter((t) => t.isCompleted),
          prevUser.totalDistance,
          newVisitedLocations
        ),
      };
    });
  };

  // Handle user login
  const login = (username) => {
    setUser((prevUser) => ({
      ...prevUser,
      username,
      isLoggedIn: true,
      tasks: tasksData, // Initialize with tasks from your data
    }));
  };

  // Handle user logout
  const logout = () => {
    localStorage.removeItem("userData"); // Clear the stored user data
    setUser({
      username: "",
      isLoggedIn: false,
      tasks: [],
      lastLocation: null,
      totalDistance: 0,
      points: 0,
      completion: 0,
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
    setPercentage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
