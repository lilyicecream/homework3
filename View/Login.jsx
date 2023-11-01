import React from 'react';

const Login = ({ onFormSwitch, onLogin }) => {
  const buttonStyle = {
    backgroundColor: '#ff0000', // Red background
    color: '#fff',
    fontFamily: 'Times New Roman, Times, serif',
  };

  const registerButtonStyle = {
    ...buttonStyle,
    marginLeft: '10px',
  };

  const containerStyle = {
    border: '10px solid #ff0000', // Spiky red border
    padding: '20px', // Add some padding inside the border for spacing
    textAlign: 'center', // Center-align content within the border
  };

  const titleStyle = {
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: '2rem', // Adjust the font size as needed
  };

  return (
    <div style={containerStyle} className="login-container">
      <h2 style={titleStyle}>HARDCORE RATINGS</h2>
      <h2 style={{ fontFamily: 'Times New Roman, Times, serif' }}>Login</h2>
      <div className="input-container">
        <input type="text" style={{ fontFamily: 'Times New Roman, Times, serif' }} placeholder="Username" />
        <input type="password" style={{ fontFamily: 'Times New Roman, Times, serif' }} placeholder="Password" />
      </div>
      <button className="button" onClick={onLogin} style={buttonStyle}>
        Login
      </button>
      <button className="button" onClick={() => onFormSwitch('register')} style={registerButtonStyle}>
        Register
      </button>
    </div>
  );
};

export default Login;














