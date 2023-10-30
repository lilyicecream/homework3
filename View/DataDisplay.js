import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const DataDisplay = () => {
    const [data, setData] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        axios.get('http://localhost/hw-test/Controller/RestApi/User/read.php')
            .then((response) => {
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
                        <th>Song Name</th>
                        <th>Artist</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.songName}</td>
                            <td>{item.artist}</td>
                            <td>
                                {/* Display stars here (not functional) */}
                                {Array(item.rating).fill('⭐️').join(' ')}
                            </td>
                            <td>
                                <button>Update</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



export default DataDisplay;