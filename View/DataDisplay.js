import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import UpdateComponent from './UpdateComponent';
import DeleteComponent from './DeleteComponent';

const DataDisplay = () => {
    const [data, setData] = useState([]);
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
        const updatedData = [...data];
        const updatedSongIndex = updatedData.findIndex(item => item.id === songId);
        updatedData[updatedSongIndex] = { ...songUpdate, id: songId, username: user }; // include id and username
        setData(updatedData);
        setMode('display');

        // const updatedData = [...data];
        // const updatedSongIndex = updatedData.findIndex(item => item.id === songId);
        // updatedData[updatedSongIndex] = songUpdate;
        // setData(updatedData);
        // setMode('display');
    }

    const deleteSong = async (song) => {
        await axios.delete(`http://localhost/homework3/Controller/RestApi/Ratings/delete.php?song=${song}`);
        setData(data.filter(item => item.song !== song));
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


    useEffect(() => {
        axios.get('http://localhost/homework3/Controller/RestApi/Ratings/Read_ratings.php')
            .then((response) => {
                console.log(response.data);
                setData(response.data.body || []);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setData([]);
            });

    }, []);

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
                        data?.map((item, index) => (
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
