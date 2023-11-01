import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import ReactStars from "react-rating-stars-component";

const SongRatingForm = ({ setSongs }) => {
    const { user } = useUser();

    // Default state
    const defaultNewSong = { username: user, artist: '', song: '', rating: 0 };
    const [newSong, setNewSong] = useState(defaultNewSong);

    const ratingChanged = (newRating) => {
        setNewSong({ ...newSong, rating: newRating });
    };


    const handleCreate = async () => {
        // Check if all fields are filled
        if (newSong.artist == '' || newSong.song == '' || newSong.rating == 0) {
            alert("All fields must be filled");
            return;
        }

        // Check for duplicate song on the server side.
        const songsRes = await axios.get('http://localhost/homework3/Controller/RestApi/Ratings/Read_ratings.php');
        const existingRating = songsRes.data.body.find((s) => s.artist === newSong.artist && s.song === newSong.song);
        if (existingRating) {
            alert('This song has already been rated!');
            return;
        }

        const response = await axios.post(`http://localhost/homework3/Controller/RestApi/Ratings/create-rating.php`, newSong);
        console.log(response.data);
        // fetching the new Song List
        const res = await axios.get(`http://localhost/homework3/Controller/RestApi/Ratings/Read_ratings.php`);
        setSongs(res.data.body || []) // update songs list

        // Reset the form
        setNewSong(defaultNewSong);
    };



    return (
        <div>
            <h2>Create Song Rating</h2>
            <form>
                <input type="text" placeholder="Artist" value={newSong.artist} onChange={e => setNewSong({ ...newSong, artist: e.target.value })} />
                <input type="text" placeholder="Song" value={newSong.song} onChange={e => setNewSong({ ...newSong, song: e.target.value })} />

                <ReactStars
                    count={5}
                    value={newSong.rating}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />

                <button type="button" onClick={handleCreate}>Create</button>
            </form>
        </div>
    );
};

export default SongRatingForm;