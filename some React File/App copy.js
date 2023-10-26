import './App.css';
import React, { useState } from "react";
import DataDisplay from './DataDisplay';
import Register from './Registration';
import Login from './Login';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleRegister = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <div className="App">
      {loggedIn ? (
        <>
          <DataDisplay />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
        ) : (
          <Register onFormSwitch={toggleForm} onRegister={handleRegister} />
        )
      )}
    </div>
  );
}

export default App;
