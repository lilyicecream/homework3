import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataDisplay from './DataDisplay';
import Register from './Registration';
import SongRatingForm from './SongRatingForm';
import Login from './Login';

import './App.css';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);
  const [songs, setSongs] = useState([]);

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

  useEffect(() => {
    axios.get(`http://localhost/homework3/Controller/RestApi/Ratings/Read_ratings.php`)
      .then(({ data }) => setSongs(data.body || []))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header>
        <h1 className="title">Hardcore Music App</h1>
      </header>
      <main>
        {loggedIn ? (
          <div className="data-and-form">
            <DataDisplay songs={songs} setSongs={setSongs} />
            <SongRatingForm setSongs={setSongs} songs={songs} />
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <div className="auth-form">
            {currentForm === "login" ? (
              <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
            ) : (
              <Register onFormSwitch={toggleForm} onRegister={handleRegister} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;





