import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const DataDisplay = () => {
    const [data, setData] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        axios.get('http://localhost/homework3/Controller/RestApi/User/read.php')
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
            <ul>
                {data?.map((item, index) => (
                    <li key={index}>{item.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default DataDisplay;