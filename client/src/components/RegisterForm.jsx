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
      backgroundColor: '#28a745', // Green color
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };
  
export default RegisterForm;