import React from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Map from "../components/Map.jsx";
import { PathProvider } from "../components/PathProvider.jsx";
import { useUser } from "../context/UserContext.jsx";

export default function Home() {
  const { user } = useUser();

  return (
    <div style={styles.container}>
      {!user.isLoggedIn ? (
        <div style={styles.authContainer}>
          <h1 style={styles.title}>Real Playing Game</h1>
          <div style={styles.formsContainer}>
            <LoginForm />
            <RegisterForm />
          </div>
        </div>
      ) : (
        <div style={styles.mapWrapper}>
          <PathProvider>
            <Map />
          </PathProvider>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  authContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  title: {
    marginBottom: "2rem",
    color: "#333",
    textAlign: "center",
  },
  formsContainer: {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "1200px",
  },
  mapWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
};
