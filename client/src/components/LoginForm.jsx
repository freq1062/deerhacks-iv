// deerhacks-iv/client/src/components/LoginForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../context/UserContext';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('demouser');
  const [password, setPassword] = useState('demopassword');
  const [message, setMessage] = useState('');
  const { login } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');

    if (username === "demouser" && password === "demopassword") {
      login(username);
      setMessage('Login Successful');
      onLoginSuccess();
    } else {
      setMessage('Invalid username or password');
    }
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.heading}>Login</h2>
      {message && <p style={formStyles.message}>{message}</p>}
      <form onSubmit={handleLogin} style={formStyles.form}>
        <div style={formStyles.inputGroup}>
          <label style={formStyles.label} htmlFor="login-username">Username:</label>
          <input
            style={formStyles.input}
            type="text"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={formStyles.inputGroup}>
          <label style={formStyles.label} htmlFor="login-password">Password:</label>
          <input
            style={formStyles.input}
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={formStyles.button}>Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

const formStyles = { // Re-define formStyles here (or move to a separate styles file and import in both components)
    container: {
      maxWidth: '300px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    message: {
      textAlign: 'center',
      marginBottom: '15px',
      color: 'green', // Or red for errors, can be made dynamic
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      width: '100%',
      boxSizing: 'border-box', // Important to include padding in width
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#007bff', // Blue color for login
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };
  
export default LoginForm;