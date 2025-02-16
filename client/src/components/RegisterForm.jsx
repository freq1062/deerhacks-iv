// deerhacks-iv/client/src/components/RegisterForm.jsx
import React from 'react'; // Removed useState import

const RegisterForm = () => { // Removed state variables and handleRegister function

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.heading}>Register</h2>
      <p style={formStyles.message}></p>
      <form style={formStyles.form}> {/* Removed onSubmit */}
        <div style={formStyles.inputGroup}>
          <label style={formStyles.label} htmlFor="register-username">Username:</label>
          <input
            style={formStyles.input}
            type="text"
            id="register-username"
            placeholder=""  // Placeholder text
            disabled  // Disable input
          />
        </div>
        <div style={formStyles.inputGroup}>
          <label style={formStyles.label} htmlFor="register-password">Password:</label>
          <input
            style={formStyles.input}
            type="password"
            id="register-password"
            placeholder="" // Placeholder text
            disabled // Disable input
          />
        </div>
        <button type="submit" style={formStyles.button} disabled>Register</button> {/* Disable Button */}
      </form>
    </div>
  );
};

const formStyles = {
    container: {
      width: '300px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    heading: {
      marginBottom: '1rem',
      textAlign: 'center',
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
      marginBottom: '1rem',
      marginRight: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
  };
  
export default RegisterForm;