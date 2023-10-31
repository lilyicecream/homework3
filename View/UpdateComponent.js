import React, { useState } from 'react';

const UpdateComponent = ({ songDetails, updateSong }) => {
    const [updatedSong, setUpdatedSong] = useState(songDetails.song);
    const [updatedArtist, setUpdatedArtist] = useState(songDetails.artist);
    const [updatedRating, setUpdatedRating] = useState(songDetails.rating);

    const handleUpdate = () => {
        updateSong(songDetails.id, { song: updatedSong, artist: updatedArtist, rating: updatedRating });
    }

    return (
        <div>
            <input type="text" value={updatedSong} onChange={(e) => setUpdatedSong(e.target.value)} />
            <input type="text" value={updatedArtist} onChange={(e) => setUpdatedArtist(e.target.value)} />
            <input type="text" value={updatedRating} onChange={(e) => setUpdatedRating(e.target.value)} />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default UpdateComponent;