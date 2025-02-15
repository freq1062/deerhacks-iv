// deerhacks-iv/client/src/components/LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('demouser'); // Pre-fill demo username
  const [password, setPassword] = useState('demopassword'); // Pre-fill demo password
  const [message, setMessage] = useState('');

  const handleLogin = (e) => { // **handleLogin is now synchronous (no async/await)**
    e.preventDefault();
    setMessage('');

    // **Static Demo User Check - No fetch call needed**
    if (username === "demouser" && password === "demopassword") {
      setMessage('Demo Login Successful'); // Success message
      // In a real app, you'd handle session/token here and redirect
      // For this static demo, we just show a success message.
    } else {
      setMessage('Invalid username or password'); // Failure message
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