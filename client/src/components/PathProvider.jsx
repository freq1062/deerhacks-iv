import React, { createContext, useState, useContext } from "react";

const PathContext = createContext();

export const usePaths = () => useContext(PathContext);

export const PathProvider = ({ children }) => {
  const [visitedLines, setVisitedLines] = useState([]);
  const [visitedPoints, setVisitedPoints] = useState([]);
  const [unexploredLines, setUnexploredLines] = useState([]);

  return (
    <PathContext.Provider
      value={{
        visitedLines,
        setVisitedLines,
        visitedPoints,
        setVisitedPoints,
        unexploredLines,
        setUnexploredLines,
      }}
    >
      {children}
    </PathContext.Provider>
  );
};
