import React from "react";
import Router from "./components/router.jsx";
import { UserProvider } from "./context/UserContext";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
