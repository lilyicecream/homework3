import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import UpdateComponent from './UpdateComponent';
import DeleteComponent from './DeleteComponent';

const DataDisplay = ({ songs, setSongs }) => { // Get songs and setSongs from props
    const { user } = useUser();

    const [mode, setMode] = useState('display'); // Can be 'display', 'update', or 'delete'
    const [selectedSong, setSelectedSong] = useState(null); // Selected song to be updated or deleted

    const updateSong = async (songId, songUpdate) => {
        await axios.post(`http://localhost/homework3/Controller/RestApi/Ratings/update.php`, {
            id: songId,
            username: user,
            artist: songUpdate.artist,
            song: songUpdate.song,
            rating: songUpdate.rating,
        });
        // After the update, fetch the data again to refresh the list
        const res = await axios.get(`http://localhost/homework3/Controller/RestApi/Ratings/Read_ratings.php`);
        setSongs(res.data.body || []) // update songs list
        setMode('display');
    }

    const deleteSong = async (song) => {
        await axios.delete(`http://localhost/homework3/Controller/RestApi/Ratings/delete.php?song=${song}`);
        // After the delete, fetch the data again to refresh the list
        const res = await axios.get(`http://localhost/homework3/Controller/RestApi/Ratings/Read_ratings.php`);
        setSongs(res.data.body || []) // update songs list
        setMode('display');
    }

    const handleUpdate = (song) => {
        setSelectedSong(song);
        setMode('update');
    }

    const handleDelete = (song) => {
        setSelectedSong(song);
        setMode('delete');
    }

    return (
        <div>
            <div className="upper-cont">
                <p style={{ float: "left" }}>You are logged in as user: <b>{user}</b></p>
            </div>
            <h2>Data from API</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mode === 'display' ?
                        songs?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.song}</td>
                                <td>{item.artist}</td>
                                <td>
                                    {Array.from({ length: item.rating }).map((_, i) => '⭐️')}
                                </td>
                                <td>
                                    {user === item.username &&
                                        <>
                                            <button onClick={() => handleUpdate(item)}>Update</button>
                                            <button onClick={() => handleDelete(item)}>Delete</button>
                                        </>
                                    }
                                </td>
                            </tr>
                        ))
                        : mode === 'update' ?
                            <tr><UpdateComponent songDetails={selectedSong} updateSong={updateSong} /></tr>
                            :
                            <tr><DeleteComponent songDetails={selectedSong} deleteSong={deleteSong} /></tr>
                    }
                </tbody>
            </table>
        </div>
    );
};



export default DataDisplay;
