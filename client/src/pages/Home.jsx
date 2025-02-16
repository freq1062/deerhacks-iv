import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Map from "../components/Map.jsx";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div style={styles.container}>
      {!isLoggedIn ? (
        <div style={styles.authContainer}>
          <h1 style={styles.title}>Welcome to Location Discovery</h1>
          <div style={styles.formsContainer}>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <RegisterForm />
          </div>
        </div>
      ) : (
        <div style={styles.mapWrapper}>
          <Map />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  authContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  title: {
    marginBottom: '2rem',
    color: '#333',
    textAlign: 'center',
  },
  formsContainer: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
  },
  mapWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  }
};