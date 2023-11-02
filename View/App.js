import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DataDisplay from './DataDisplay';
import Register from './Registration';
import SongRatingForm from './SongRatingForm';
import Login from './Login';


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

  // Initial data fetching when component mounts
  useEffect(() => {
    axios.get(`http://localhost/homework3/Controller/RestApi/Ratings/Read_ratings.php`)
      .then(({ data }) => setSongs(data.body || []))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return (
    <div className="App">

      <h1 className="title">Hardcore Music App</h1>
      {loggedIn ? (
        <div className="data-and-form">
          <DataDisplay songs={songs} setSongs={setSongs} />
          <SongRatingForm setSongs={setSongs} songs={songs} />
          <button onClick={handleLogout} className="button logout-button">Logout</button>
        </div>
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
