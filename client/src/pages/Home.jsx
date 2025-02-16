import React from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Map from "../components/Map.jsx";
import { PathProvider } from "../components/PathProvider.jsx";
import { useUser } from "../context/UserContext.jsx";
import RealPG_logo from "../assets/RealPG_logo.png";
import Login_BG from "../assets/Login_BG.jpg";

export default function Home() {
  const { user } = useUser();

  return (
    <div style={styles.container}>
      {!user.isLoggedIn ? (
        <div style={styles.authContainer}>
          <img style={styles.logo} src={RealPG_logo}></img>
          {/* <h2 style={styles.title}>Real-Playing Game</h2> */}
          <div style={styles.formsContainer}>
            <LoginForm />
            <RegisterForm />
          </div>
        </div>
      ) : (
        <>
          <div style={styles.mapWrapper}>
            <PathProvider>
              <Map />
            </PathProvider>
          </div>
        </>
      )}
    </div>
  );
}
const styles = {
  logo: {
    width: "150px",
    height: "150px",
    marginBottom: "1rem",
  },
  container: {
    width: "100%",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  authContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${Login_BG})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: "10px",
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
