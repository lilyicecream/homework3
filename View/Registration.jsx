import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const containerStyle = {
    border: '10px solid #ff0000',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Times New Roman, Times, serif',
  };

  const titleStyle = {
    fontSize: '2rem',
  };

  const inputStyle = {
    fontFamily: 'Times New Roman, Times, serif',
  };

  const buttonStyle = {
    backgroundColor: '#ff0000',
    color: '#fff',
    fontFamily: 'Times New Roman, Times, serif',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    margin: '10px 0', // Add vertical space above and below buttons
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '' || rePassword === '') {
      setError("All fields are required");
      return;
    }

    if (password.length < 10) {
      setError("Password must be at least 10 characters long");
      return;
    }

    if (password !== rePassword) {
      setError("Password doesn't match");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost/homework_3/Controller/RestApi/Register/register.php',
        {
          username,
          password,
          register: 'register',
        }
      );

      if (response.data.message === 'Register successful') {
        console.log('Register successful');
        props.onRegister();
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Error sending registration request:', error);
      setError('An error occurred');
    }
  };

  return (
    <div style={containerStyle} className="login-container">
      <h2 style={titleStyle}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username">Enter Username:</label>
          <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
          <label htmlFor="password">Enter Password:</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
          <label htmlFor="rePassword">Repeat Password:</label>
          <input type="password" name="rePassword" id="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} style={inputStyle} />
        </div>
        <div className="form-btn">
          <button className="button" type="submit" style={buttonStyle}>Register</button>
        </div>
      </form>
      {error && <div className="error" style={inputStyle}>{error}</div>}
      <button className="button" onClick={() => props.onFormSwitch('login')} style={buttonStyle}>Already have an account? Login here</button>
    </div>
  );
};

export default Register;